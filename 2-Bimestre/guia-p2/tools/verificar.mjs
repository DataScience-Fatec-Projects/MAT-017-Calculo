#!/usr/bin/env node
/*
 * Verifica o conteúdo do guia:
 *   1. estrutura de cada item (campos obrigatórios, ids únicos, regras válidas);
 *   2. a resposta final de cada item, comparando com a derivada NUMÉRICA de `f`;
 *   3. (opcional) se todo o LaTeX compila no KaTeX — defina KATEX_PATH apontando
 *      para a pasta do pacote katex (ex.: .../node_modules/katex).
 *
 * Uso:  node tools/verificar.mjs                 (todos os arquivos de data/)
 *       node tools/verificar.mjs data/t006.js    (só os arquivos indicados)
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const arquivos = args.length
  ? args.map((a) => path.resolve(process.cwd(), a))
  : fs.readdirSync(path.join(raiz, "data")).filter((f) => f.endsWith(".js")).map((f) => path.join(raiz, "data", f));

let katex = null;
if (process.env.KATEX_PATH) {
  katex = createRequire(import.meta.url)(process.env.KATEX_PATH);
}

const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(raiz, "js", "registro.js"), "utf8"), ctx, { filename: "registro.js" });
for (const arq of arquivos) {
  try {
    vm.runInContext(fs.readFileSync(arq, "utf8"), ctx, { filename: path.basename(arq) });
  } catch (e) {
    console.error(`ERRO ao carregar ${path.basename(arq)}: ${e.message}`);
    process.exit(1);
  }
}
const GUIA = ctx.GUIA;

const erros = [];
const avisos = [];
let itensOk = 0;

const AMOSTRAS = [-2.3, -1.7, -0.9, -0.45, 0.35, 0.8, 1.3, 1.9, 2.6, 3.4];
const REGRAS = new Set(Object.keys(GUIA.regras));
const CAMPOS_ITEM = ["id", "pergunta", "f", "resp", "ordem", "gabarito", "regras", "intro", "passos", "cuidado", "conferir"];
const CAMPOS_PASSO = ["titulo", "normal", "mais", "detalhe"];

function d1(F, x) {
  const h = 1e-5 * Math.max(1, Math.abs(x));
  return (F(x + h) - F(x - h)) / (2 * h);
}
function d2(F, x) {
  const h = 1e-3 * Math.max(1, Math.abs(x));
  return (F(x + h) - 2 * F(x) + F(x - h)) / (h * h);
}
const ok = (v) => Number.isFinite(v) && Math.abs(v) < 1e6;

function compara(nome, F, alvo, ordem, pts, tol) {
  const D = ordem === 2 ? d2 : d1;
  let validos = 0;
  for (const x of pts) {
    let num, esp;
    try {
      num = D(F, x);
      esp = alvo(x);
    } catch (e) {
      return `${nome}: exceção ao avaliar (${e.message})`;
    }
    if (!ok(num) || !ok(esp) || !ok(F(x))) continue;
    validos++;
    const escala = Math.max(1, Math.abs(esp));
    if (Math.abs(num - esp) > tol * escala) {
      return `${nome}: em x=${x} a derivada numérica dá ${num.toPrecision(8)} mas a resposta dá ${esp.toPrecision(8)}`;
    }
  }
  if (validos < 3) return `${nome}: só ${validos} pontos válidos para testar (use o campo "amostras")`;
  return null;
}

function textos(obj, caminho, saida) {
  if (typeof obj === "string") saida.push([caminho, obj]);
  else if (Array.isArray(obj)) obj.forEach((v, i) => textos(v, `${caminho}[${i}]`, saida));
  else if (obj && typeof obj === "object")
    for (const [k, v] of Object.entries(obj)) {
      if (k === "f" || k === "resp" || k === "resp1") continue;
      textos(v, `${caminho}.${k}`, saida);
    }
  return saida;
}

function checaTexto(onde, s) {
  const semDisplay = s.replace(/\$\$[\s\S]+?\$\$/g, "");
  const cifroes = (semDisplay.match(/\$/g) || []).length;
  if (cifroes % 2) erros.push(`${onde}: número ímpar de "$" (math desbalanceado)`);
  for (const tag of ["b", "i", "em", "strong", "ul", "ol", "li", "p", "span"]) {
    const abre = (s.match(new RegExp(`<${tag}(\\s[^>]*)?>`, "g")) || []).length;
    const fecha = (s.match(new RegExp(`</${tag}>`, "g")) || []).length;
    if (abre !== fecha) erros.push(`${onde}: tag <${tag}> desbalanceada (${abre} abre / ${fecha} fecha)`);
  }
  if (!katex) return;
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let m;
  while ((m = re.exec(s))) {
    const tex = m[1] ?? m[2];
    try {
      katex.renderToString(tex, { throwOnError: true, displayMode: !!m[1], macros: { ...GUIA.macros } });
    } catch (e) {
      erros.push(`${onde}: LaTeX inválido "${tex.slice(0, 60)}" → ${e.message.split("\n")[0]}`);
    }
  }
}

if (GUIA.formulario) {
  for (const s of GUIA.formulario.secoes) checaTexto(`formulario/${s.id}`, s.html);
}

const idsGrupo = new Set();
for (const g of GUIA.grupos) {
  const gnome = g.id;
  if (idsGrupo.has(g.id)) erros.push(`grupo ${g.id} duplicado`);
  idsGrupo.add(g.id);
  for (const campo of ["id", "ordem", "tarefa", "material", "titulo", "resumo", "exercicios"])
    if (g[campo] === undefined) erros.push(`${gnome}: falta "${campo}"`);
  for (const [onde, s] of textos({ titulo: g.titulo, resumo: g.resumo }, gnome, [])) checaTexto(onde, s);

  const idsEx = new Set();
  for (const ex of g.exercicios || []) {
    const enome = `${gnome}/${ex.id}`;
    if (idsEx.has(ex.id)) erros.push(`${enome}: id de exercício duplicado`);
    idsEx.add(ex.id);
    for (const campo of ["id", "numero", "enunciado", "itens"])
      if (ex[campo] === undefined) erros.push(`${enome}: falta "${campo}"`);
    for (const [onde, s] of textos({ enunciado: ex.enunciado, obs: ex.obs }, enome, [])) checaTexto(onde, s);

    const idsIt = new Set();
    for (const it of ex.itens || []) {
      const inome = `${enome}/${it.id}`;
      if (idsIt.has(it.id)) erros.push(`${inome}: id de item duplicado`);
      idsIt.add(it.id);
      checaItem(it, inome);
    }
  }
}

// ------------------------------------------------------------ simulado
let totalSim = 0;
if (GUIA.simulado) {
  const S = GUIA.simulado;
  let soma = 0;
  for (const q of S.questoes) {
    const qnome = `simulado/${q.id}`;
    for (const campo of ["id", "numero", "pontos", "tema", "enunciado", "itens"])
      if (q[campo] === undefined) erros.push(`${qnome}: falta "${campo}"`);
    checaTexto(`${qnome}.enunciado`, q.enunciado);
    let somaQ = 0;
    for (const it of q.itens) {
      const inome = `${qnome}/${it.id}`;
      totalSim++;
      if (typeof it.pontos !== "number") erros.push(`${inome}: falta "pontos"`);
      if (!it.fonte || !it.fonte.url || !it.fonte.nome || !it.fonte.item) erros.push(`${inome}: falta a referência (fonte.nome/url/item)`);
      somaQ += it.pontos || 0;
      checaItem(it, inome);
    }
    if (Math.abs(somaQ - q.pontos) > 1e-9) erros.push(`${qnome}: itens somam ${somaQ}, mas a questão vale ${q.pontos}`);
    soma += q.pontos;
  }
  if (Math.abs(soma - S.total) > 1e-9) erros.push(`simulado: questões somam ${soma}, mas o total é ${S.total}`);
}

const total = GUIA.grupos.reduce((s, g) => s + (g.exercicios || []).reduce((t, e) => t + (e.itens || []).length, 0), 0) + totalSim;
for (const a of avisos) console.log("aviso: " + a);
for (const e of erros) console.log("ERRO:  " + e);
console.log(`\n${itensOk}/${total} itens OK${totalSim ? ` (inclui ${totalSim} do simulado)` : ""}${katex ? " (LaTeX verificado)" : " (LaTeX NÃO verificado — defina KATEX_PATH)"}; ${erros.length} erro(s).`);
process.exit(erros.length ? 1 : 0);

// ------------------------------------------------------------ item
function checaItem(it, inome) {
      const antes = erros.length;
      for (const campo of CAMPOS_ITEM) if (it[campo] === undefined || it[campo] === "") erros.push(`${inome}: falta "${campo}"`);
      if (!Array.isArray(it.passos) || it.passos.length < 2) erros.push(`${inome}: precisa de pelo menos 2 passos`);
      (it.passos || []).forEach((p, i) => {
        for (const campo of CAMPOS_PASSO) if (!p[campo]) erros.push(`${inome}: passo ${i + 1} sem "${campo}"`);
      });
      for (const r of it.regras || []) if (!REGRAS.has(r)) erros.push(`${inome}: regra desconhecida "${r}"`);
      if (![1, 2].includes(it.ordem)) erros.push(`${inome}: "ordem" deve ser 1 ou 2`);

      for (const [onde, s] of textos(it, inome, [])) checaTexto(onde, s);

      // checagem numérica
      try {
        const F = GUIA.compilar(it.f);
        const A = GUIA.compilar(it.resp);
        const tol = it.ordem === 2 ? 1e-3 : 1e-4;
        let falha;
        if (typeof it.ponto === "number") {
          falha = compara(`${inome} (ponto ${it.ponto})`, F, () => A(it.ponto), it.ordem, [it.ponto], tol);
          if (falha && falha.includes("pontos válidos")) {
            const num = (it.ordem === 2 ? d2 : d1)(F, it.ponto);
            const esp = A(it.ponto);
            falha = Math.abs(num - esp) <= tol * Math.max(1, Math.abs(esp)) ? null : `${inome}: em x=${it.ponto} numérico ${num} ≠ resposta ${esp}`;
          }
        } else {
          falha = compara(inome, F, A, it.ordem, it.amostras || AMOSTRAS, tol);
        }
        if (falha) erros.push(falha);
        if (it.resp1) {
          const f1 = compara(`${inome} (resp1)`, F, GUIA.compilar(it.resp1), 1, it.amostras || AMOSTRAS, 1e-4);
          if (f1) erros.push(f1);
        }
      } catch (e) {
        erros.push(`${inome}: expressão JS inválida em f/resp (${e.message})`);
      }
      if (erros.length === antes) itensOk++;
}
