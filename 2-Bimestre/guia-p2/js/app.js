/*
 * Guia P2 · Cálculo — aplicação (abas, conversa passo a passo, simulado, progresso).
 */
(function () {
  "use strict";

  const PROMPT = "Me ajude a resolver essa atividade passo-a-passo:";
  const NIVEIS = {
    1: { nome: "Normal", curto: "Normal", desc: "Passos curtos até a resposta." },
    2: { nome: "Normal + infos", curto: "+ Infos", desc: "Acrescenta o porquê de cada passo e o erro mais comum." },
    3: { nome: "Detalhado", curto: "Detalhado", desc: "Acrescenta todas as contas intermediárias e como conferir." },
  };
  const ESTILO_GRUPO = {
    t006: { c: "var(--blue)", t: "xⁿ" },
    "t007-m3": { c: "var(--green)", t: "f·g" },
    "t007-m4": { c: "var(--orange)", t: "f∘g" },
    t008: { c: "var(--purple)", t: "f″" },
  };
  const COR_Q = ["var(--blue)", "var(--green)", "var(--orange)", "var(--purple)", "var(--teal)", "var(--pink)"];
  const ICO = {
    chev: '<svg class="chev" viewBox="0 0 8 14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    voltar: '<svg viewBox="0 0 12 20" aria-hidden="true"><path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor"/><path d="M4.5 8.2l2.3 2.3 4.7-4.9" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    link: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5H2.5v7h7v-2M7 1.5h3.5V5M10.5 1.5 5.5 6.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    relogio: '<svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="15.5" r="9"/><path d="M14 10.5v5l3 3M11 3.5h6"/></svg>',
    relogioPeq: '<svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="14" cy="15.5" r="9"/><path d="M14 10.5v5l3 3M11 3.5h6"/></svg>',
    conversa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5c0-3.9 3.6-7 8-7s8 3.1 8 7-3.6 7-8 7c-1 0-2-.2-2.9-.5L5 19.5l1.2-3.3A6.6 6.6 0 0 1 4 11.5z"/></svg>',
  };

  // ------------------------------------------------------------ armazenamento
  const store = {
    get(k, padrao) {
      try {
        const v = localStorage.getItem("guiaP2:" + k);
        return v === null ? padrao : JSON.parse(v);
      } catch (e) {
        return padrao;
      }
    },
    set(k, v) {
      try { localStorage.setItem("guiaP2:" + k, JSON.stringify(v)); } catch (e) { /* sem storage: segue sem salvar */ }
    },
  };

  const estado = {
    nivel: [1, 2, 3].includes(store.get("nivel", 1)) ? store.get("nivel", 1) : 1,
    feitos: new Set(store.get("feitos", [])),
    rev: new Map(), // chave -> { passos, resposta } (o que já foi revelado nesta visita)
    conversas: [],
    grafico: null,
    rota: null,
    timer: null,
  };

  // ------------------------------------------------------------ índice
  const lista = [];
  const porChave = new Map();
  for (const g of GUIA.grupos) {
    for (const ex of g.exercicios) {
      for (const it of ex.itens) {
        const ref = { g, ex, it, chave: `${g.id}/${ex.id}/${it.id}`, i: lista.length };
        lista.push(ref);
        porChave.set(ref.chave, ref);
      }
    }
  }
  const totalItens = lista.length;
  const feitosDe = (refs) => refs.filter((r) => estado.feitos.has(r.chave)).length;
  const itensDoGrupo = (g) => lista.filter((r) => r.g === g);
  const nomeEx = (ex) => (typeof ex.numero === "number" ? `Exercício ${ex.numero}` : ex.numero);

  // ------------------------------------------------------------ utilidades
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const main = $("#conteudo");
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const textoPuro = (s) => String(s || "").replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const fmtNum = (n) => (Math.round(n * 10) / 10).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
  const fmtPts = (n) => `${fmtNum(n)} ${n === 1 ? "pt" : "pts"}`;
  const reduzMov = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cacheTex = new Map();
  function tex(s) {
    if (!s) return "";
    return String(s).replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (m, bloco, inline) => {
      const fonte = bloco !== undefined ? bloco : inline;
      const display = bloco !== undefined;
      const chave = (display ? "D" : "I") + fonte;
      if (cacheTex.has(chave)) return cacheTex.get(chave);
      let html;
      if (window.katex) {
        try {
          html = katex.renderToString(fonte, { displayMode: display, throwOnError: false, macros: { ...GUIA.macros } });
        } catch (e) {
          html = `<code>${esc(fonte)}</code>`;
        }
      } else {
        html = `<code>${esc(fonte)}</code>`;
      }
      cacheTex.set(chave, html);
      return html;
    });
  }

  // ------------------------------------------------------------ componentes
  function cabecalho({ voltar, sobre, titulo, sub }) {
    return `<header class="cabecalho">
      ${voltar ? `<a class="voltar" href="${voltar.href}">${ICO.voltar}${esc(voltar.txt)}</a>` : ""}
      ${sobre ? `<div class="sobretitulo">${sobre}</div>` : ""}
      <h1 class="titulo-grande">${titulo}</h1>
      ${sub ? `<p class="subtitulo">${sub}</p>` : ""}
    </header>`;
  }

  function seletorNivel() {
    return `<div class="seg-nivel">
      <div class="seg" role="radiogroup" aria-label="Nível de detalhe da explicação">
        ${[1, 2, 3].map((n) => `<button role="radio" data-nivel="${n}" aria-checked="${n === estado.nivel}" title="${NIVEIS[n].nome}: ${NIVEIS[n].desc} (tecla ${n})">${NIVEIS[n].curto}</button>`).join("")}
      </div>
      <p class="seg-nivel-desc" data-nivel-desc>${NIVEIS[estado.nivel].nome}: ${NIVEIS[estado.nivel].desc}</p>
    </div>`;
  }

  function anel(frac, centro, { grande = false, cor } = {}) {
    const r = 42;
    const C = 2 * Math.PI * r;
    const f = Math.max(0, Math.min(1, frac));
    return `<div class="anel ${grande ? "grande" : ""}" ${cor ? `style="--c:${cor}"` : ""}>
      <svg viewBox="0 0 100 100" aria-hidden="true"><circle class="fundo" cx="50" cy="50" r="${r}"/><circle class="valor" cx="50" cy="50" r="${r}" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${(C * (1 - f)).toFixed(2)}" ${f <= 0 ? 'style="opacity:0"' : ""}/></svg>
      <div class="centro"><span>${centro}</span></div>
    </div>`;
  }

  function chip(g, ex, it, ativa) {
    const k = `${g.id}/${ex.id}/${it.id}`;
    const cls = [estado.feitos.has(k) ? "feito" : "", ativa === k ? "ativo" : ""].join(" ");
    return `<a class="chip ${cls}" href="#/${k}" aria-label="${esc(nomeEx(ex))}, item ${esc(it.id)}" ${ativa === k ? 'aria-current="page"' : ""}>${esc(it.id)}</a>`;
  }

  function linhaGrupo(g) {
    const refs = itensDoGrupo(g);
    const st = ESTILO_GRUPO[g.id] || { c: "var(--blue)", t: "f′" };
    return `<a class="linha" href="#/${g.id}">
      <span class="ico" style="--c:${st.c}">${st.t}</span>
      <span class="linha-txt"><b>${esc(g.tarefa)}</b><small>${tex(g.titulo)}</small></span>
      <span class="linha-det">${feitosDe(refs)}/${refs.length}</span>${ICO.chev}
    </a>`;
  }

  function linhaItem(r, comOrigem) {
    const feito = estado.feitos.has(r.chave);
    return `<a class="linha" href="#/${r.chave}">
      <span class="letra ${feito ? "feito" : ""}" aria-label="${feito ? "entendido" : "item " + esc(r.it.id)}">${feito ? "✓" : esc(r.it.id)}</span>
      <span class="linha-txt q">${comOrigem ? `<small>${esc(r.g.tarefa)} · ${esc(nomeEx(r.ex))} ${esc(r.it.id)})</small>` : ""}<span>${tex(r.it.pergunta)}</span></span>
      ${ICO.chev}
    </a>`;
  }

  function tagsRegras(ativa) {
    const cont = {};
    for (const r of lista) for (const t of r.it.regras || []) cont[t] = (cont[t] || 0) + 1;
    return Object.keys(GUIA.regras)
      .filter((t) => cont[t])
      .map((t) => `<a class="tag" href="#/regra/${t}" ${t === ativa ? 'aria-current="page"' : ""}>${esc(GUIA.regras[t])} <span class="n">${cont[t]}</span></a>`)
      .join("");
  }

  function marcarAba(aba) {
    document.querySelectorAll("[data-aba]").forEach((a) => {
      if (a.dataset.aba === aba) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function destruirGrafico() {
    if (estado.grafico) { estado.grafico.destruir(); estado.grafico = null; }
  }

  // ------------------------------------------------------------ conversa (revela só quando o aluno toca)
  const cartaoInt = (cls, rot, conteudo) => `<div class="cartao-int ${cls}"><div class="rot">${rot}</div>${tex(conteudo)}</div>`;

  function criarConversa(raiz, item, chave, { fixo = true, correcao = false, aoMudar } = {}) {
    if (!estado.rev.has(chave)) estado.rev.set(chave, { passos: 0, resposta: false });
    const rev = estado.rev.get(chave);
    const total = item.passos.length;
    raiz.innerHTML = `<div class="bolhas" aria-live="polite"></div><div class="compositor ${fixo ? "fixo" : ""}"></div>`;
    const bolhas = $(".bolhas", raiz);
    const comp = $(".compositor", raiz);
    let digitando = false;

    function htmlBolhas() {
      const n = estado.nivel;
      const b = [];
      if (rev.passos > 0) b.push(`<div class="bolha ele"><div>${tex(item.intro)}</div></div>`);
      item.passos.slice(0, rev.passos).forEach((p, i) => {
        b.push(`<div class="bolha ele">
          <div class="p-rot">Passo ${i + 1} de ${total}</div>
          <div class="p-tit">${tex(p.titulo)}</div>
          <div>${tex(p.normal)}</div>
          ${n >= 2 && p.mais ? cartaoInt("porque", "Por quê?", p.mais) : ""}
          ${n >= 3 && p.detalhe ? cartaoInt("conta", "Conta completa", p.detalhe) : ""}
        </div>`);
      });
      if (rev.resposta) {
        const completo = rev.passos >= total;
        b.push(`<div class="bolha ele">
          <div class="r-rot">${ICO.check} Resposta</div>
          <div class="r-caixa">${tex(item.gabarito)}</div>
          ${completo && n >= 2 && item.cuidado ? cartaoInt("cuidado", "Cuidado — erro comum", item.cuidado) : ""}
          ${completo && n >= 3 && item.conferir ? cartaoInt("conferir", "Como conferir", item.conferir) : ""}
          ${item.obs ? cartaoInt("obs", "Observação", item.obs) : ""}
        </div>`);
      }
      if (digitando) b.push(`<div class="bolha ele digitando" role="status" aria-label="digitando"><i></i><i></i><i></i></div>`);
      if (b.length) b[b.length - 1] = b[b.length - 1].replace('class="bolha ele', 'class="bolha ele cauda');
      return b.join("");
    }

    function htmlComp() {
      if (digitando) return "";
      const bt = (acao, txt, cls = "") => `<button class="pilula ${cls}" data-acao="${acao}">${txt}</button>`;
      if (rev.passos === 0) {
        if (correcao && !rev.resposta) return bt("resposta", "Ver resposta", "prim") + bt("proximo", "Passo a passo") + bt("tudo", "Resolução completa");
        return bt("proximo", "Passo a passo", "prim") + bt("tudo", "Resolução completa") + (rev.resposta ? "" : bt("resposta", "Só a resposta"));
      }
      if (rev.passos < total)
        return bt("proximo", `Próximo passo · ${rev.passos + 1}/${total}`, "prim") + bt("tudo", "Ver tudo") + (rev.resposta ? "" : bt("resposta", "Só a resposta"));
      return bt("zerar", "Esconder e tentar de novo", "cinza");
    }

    function render() {
      bolhas.innerHTML = htmlBolhas();
      comp.innerHTML = htmlComp();
      if (aoMudar) aoMudar(rev);
    }

    function rolarPara(el) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const topo = 70;
      const base = innerHeight - (fixo ? comp.offsetHeight + 90 : 20);
      if (r.top >= topo && r.bottom <= base) return;
      el.scrollIntoView({ block: r.height > base - topo ? "start" : "end", behavior: reduzMov() ? "auto" : "smooth" });
    }

    function agir(acao) {
      if (digitando) return;
      if (acao === "zerar") { rev.passos = 0; rev.resposta = false; render(); return; }
      const passosAntes = rev.passos;
      const aplicar = () => {
        if (acao === "proximo") rev.passos = Math.min(total, rev.passos + 1);
        if (acao === "tudo") rev.passos = total;
        if (acao === "resposta") rev.resposta = true;
        if (rev.passos >= total) rev.resposta = true;
      };
      const fim = () => {
        render();
        const alvo = acao === "resposta" ? bolhas.lastElementChild : bolhas.children[passosAntes === 0 ? 0 : passosAntes + 1];
        rolarPara(alvo);
      };
      if (reduzMov()) { aplicar(); fim(); return; }
      digitando = true;
      render();
      rolarPara(bolhas.lastElementChild);
      setTimeout(() => { digitando = false; aplicar(); fim(); }, 420);
    }

    comp.addEventListener("click", (e) => {
      const b = e.target.closest("[data-acao]");
      if (b) agir(b.dataset.acao);
    });
    render();
    const api = { render, agir, rev };
    estado.conversas.push(api);
    return api;
  }

  function mudarNivel(n) {
    if (n === estado.nivel) return;
    estado.nivel = n;
    store.set("nivel", n);
    document.querySelectorAll(".seg-nivel [data-nivel]").forEach((b) => b.setAttribute("aria-checked", String(+b.dataset.nivel === n)));
    document.querySelectorAll("[data-nivel-desc]").forEach((p) => (p.textContent = `${NIVEIS[n].nome}: ${NIVEIS[n].desc}`));
    estado.conversas.forEach((c) => c.render());
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".seg-nivel [data-nivel]");
    if (b) mudarNivel(+b.dataset.nivel);
  });

  // ------------------------------------------------------------ páginas: início
  function coletarAvisos() {
    const avisos = [];
    for (const g of GUIA.grupos)
      for (const ex of g.exercicios) {
        if (ex.obs) avisos.push({ href: `#/${g.id}/${ex.id}/${ex.itens[0].id}`, rot: `${g.tarefa} · ${nomeEx(ex)}`, obs: ex.obs });
        for (const it of ex.itens)
          if (it.obs) avisos.push({ href: `#/${g.id}/${ex.id}/${it.id}`, rot: `${g.tarefa} · ${nomeEx(ex)} ${it.id})`, obs: it.obs });
      }
    return avisos;
  }

  function paginaInicio() {
    marcarAba("inicio");
    const feitos = feitosDe(lista);
    const pct = totalItens ? feitos / totalItens : 0;
    const ultimo = porChave.get(store.get("ultimo", ""));
    const continuar = ultimo || lista.find((r) => !estado.feitos.has(r.chave)) || lista[0];
    const S = GUIA.simulado;
    const sim = store.get("simUltimo", null);
    const avisos = coletarAvisos();
    const nivelLinha = (n, cor) => `<div class="linha"><span class="ico" style="--c:${cor}">${n}</span><span class="linha-txt"><b>${NIVEIS[n].nome}</b><small>${NIVEIS[n].desc}</small></span></div>`;

    main.innerHTML = `<div class="pagina">
      ${cabecalho({ sobre: "Cálculo · MAT-017 · 2º bimestre", titulo: "Guia P2", sub: "As atividades do bimestre resolvidas passo a passo, como numa conversa com uma IA — e um simulado no formato da prova." })}

      <section class="cartao sombra progresso">
        ${anel(pct, `${Math.round(pct * 100)}%`)}
        <div class="progresso-txt">
          <b>Seu progresso</b>
          <span>${feitos} de ${totalItens} itens marcados como entendidos</span>
          <div class="botoes" style="margin-top:10px"><a class="btn peq" href="#/${continuar.chave}">${ultimo ? "Continuar" : "Começar"}</a></div>
        </div>
      </section>

      ${S ? `<a class="promo" href="#/simulado">
        <span class="ico-grande">${ICO.relogio}</span>
        <span><b>${esc(S.titulo)}</b><span>${S.questoes.length} questões · ${S.total} pontos${sim ? ` · última nota ${fmtNum(sim.nota)}/${sim.total}` : " · questões de listas de universidades"}</span></span>
        ${ICO.chev}
      </a>` : ""}

      <section class="grupo">
        <h2 class="grupo-rot">Atividades</h2>
        <div class="lista com-ico">${GUIA.grupos.map(linhaGrupo).join("")}</div>
      </section>

      <section class="grupo">
        <h2 class="grupo-rot">Como funciona</h2>
        <div class="lista com-ico">
          <div class="linha"><span class="ico" style="--c:var(--teal)">${ICO.conversa}</span><span class="linha-txt"><b>Você pede, o tutor responde</b><small>Cada item abre como uma conversa. A resolução e a resposta só aparecem quando você toca.</small></span></div>
          ${nivelLinha(1, "var(--blue)")}
          ${nivelLinha(2, "var(--indigo)")}
          ${nivelLinha(3, "var(--purple)")}
        </div>
        <p class="grupo-nota">No computador: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> mudam o nível, <kbd>N</kbd> mostra o próximo passo e <kbd>←</kbd> <kbd>→</kbd> trocam de item.</p>
      </section>

      <section class="grupo">
        <h2 class="grupo-rot">Treinar por regra</h2>
        <div class="tags">${tagsRegras()}</div>
      </section>

      ${avisos.length ? `<details class="grupo">
        <summary class="grupo-rot">Avisos sobre o material do professor (contém respostas)</summary>
        <div class="lista">${avisos.map((a) => `<a class="linha" href="${a.href}"><span class="linha-txt"><b>${esc(a.rot)}</b><small class="aviso-linha">${tex(a.obs)}</small></span>${ICO.chev}</a>`).join("")}</div>
      </details>` : ""}

      <p class="rodape">Baseado nos Materiais 003, 004 e 005 de MAT-017 (FATEC) e na lista de tarefas do 2º bimestre.<br>As respostas foram conferidas numericamente — mesmo assim, confira com o material oficial.</p>
    </div>`;
  }

  // ------------------------------------------------------------ páginas: tarefas, grupo, regra, formulário
  function paginaTarefas() {
    marcarAba("tarefas");
    main.innerHTML = `<div class="pagina">
      ${cabecalho({ titulo: "Tarefas", sub: "Todos os itens do 2º bimestre. Toque numa letra para abrir a conversa." })}
      ${GUIA.grupos.map((g) => `<section class="grupo">
        <h2 class="grupo-rot">${esc(g.tarefa)} · ${esc(g.material)}</h2>
        <div class="lista">
          ${linhaGrupo(g)}
          ${g.exercicios.map((ex) => `<div class="linha coluna">
            <span class="linha-txt"><b>${esc(nomeEx(ex))}</b><small>${tex(ex.enunciado)}</small></span>
            <div class="chips">${ex.itens.map((it) => chip(g, ex, it)).join("")}</div>
          </div>`).join("")}
        </div>
      </section>`).join("")}
    </div>`;
  }

  function paginaGrupo(g) {
    marcarAba("tarefas");
    main.innerHTML = `<div class="pagina">
      ${cabecalho({ voltar: { href: "#/tarefas", txt: "Tarefas" }, sobre: `${esc(g.tarefa)} · ${esc(g.material)}`, titulo: tex(g.titulo) })}
      <section class="cartao"><div class="cartao-rot">O que essa tarefa treina</div>${tex(g.resumo)}</section>
      ${g.exercicios.map((ex) => `<section class="grupo">
        <h2 class="grupo-rot">${esc(nomeEx(ex))}</h2>
        <p class="grupo-sub">${tex(ex.enunciado)}</p>
        ${ex.obs ? `<div class="chat-aviso" style="margin:0 0 10px">${tex(ex.obs)}</div>` : ""}
        <div class="lista com-ico">${ex.itens.map((it) => linhaItem(porChave.get(`${g.id}/${ex.id}/${it.id}`))).join("")}</div>
      </section>`).join("")}
    </div>`;
  }

  function paginaRegra(tag) {
    marcarAba("tarefas");
    const refs = lista.filter((r) => (r.it.regras || []).includes(tag));
    main.innerHTML = `<div class="pagina">
      ${cabecalho({ voltar: { href: "#/", txt: "Início" }, sobre: "Treinar por regra", titulo: esc(GUIA.regras[tag] || tag), sub: `${refs.length} itens usam essa regra.` })}
      <div class="tags" style="margin:10px 0 18px">${tagsRegras(tag)}</div>
      <div class="lista com-ico">${refs.map((r) => linhaItem(r, true)).join("") || `<div class="linha">Nenhum item.</div>`}</div>
    </div>`;
  }

  function paginaFormulario() {
    marcarAba("formulario");
    const F = GUIA.formulario;
    main.innerHTML = `<div class="pagina">
      ${cabecalho({ titulo: "Formulário", sub: "Só o que aparece nos materiais do bimestre. Bom ponto de partida para a sua folha de consulta." })}
      ${F ? F.secoes.map((s) => `<section class="grupo" id="f-${s.id}">
        <h2 class="grupo-rot">${esc(s.titulo)} · ${esc(s.fonte)}</h2>
        <div class="cartao" style="margin:0">${tex(s.html)}</div>
      </section>`).join("") : `<p>Formulário não carregado.</p>`}
    </div>`;
  }

  // ------------------------------------------------------------ página do item
  const rotuloRef = (r, g) => `${r.g === g ? "" : r.g.tarefa + " · "}${nomeEx(r.ex)} ${r.it.id})`;

  function paginaItem(ref) {
    marcarAba("tarefas");
    const { g, ex, it } = ref;
    store.set("ultimo", ref.chave);
    const ant = lista[ref.i - 1];
    const prox = lista[ref.i + 1];
    const feito = estado.feitos.has(ref.chave);

    main.innerHTML = `<div class="pagina">
      ${cabecalho({ voltar: { href: `#/${g.id}`, txt: g.tarefa }, sobre: `${esc(g.material)} · ${esc(nomeEx(ex))}`, titulo: `${esc(nomeEx(ex))} · item ${esc(it.id)}` })}
      <div class="chips" id="chips-item" aria-label="Itens deste exercício">${ex.itens.map((i2) => chip(g, ex, i2, ref.chave)).join("")}</div>
      ${seletorNivel()}
      <div class="chat">
        <div class="chat-meta">${esc(g.tarefa)} · ${esc(g.material)}</div>
        <div class="bolha eu cauda">
          <div class="eu-prompt">${esc(PROMPT)}</div>
          <div class="eu-questao">${tex(ex.enunciado)}<br><b>${esc(it.id)})</b> ${tex(it.pergunta)}</div>
        </div>
        <div class="recibo"><button id="btn-copiar" title="Copia a pergunta para colar em outra IA">Copiar pergunta</button></div>
        ${ex.obs ? `<div class="chat-aviso">${tex(ex.obs)}</div>` : ""}
        <p class="chat-nota" id="dica">Tente resolver no papel antes. Quando quiser, peça ajuda nos botões abaixo — nada aparece sem você tocar.</p>
        <div id="conversa"></div>
      </div>

      <section class="grupo">
        <div class="lista">
          <label class="linha"><span class="linha-txt"><b>Entendi este item</b><small>Fica salvo neste navegador</small></span><input type="checkbox" class="switch" id="sw-feito" ${feito ? "checked" : ""}></label>
          <button class="linha" id="btn-grafico" disabled aria-expanded="false"><span class="linha-txt"><b>Gráfico de f e da derivada</b><small id="grafico-sub">Libera depois que a resposta aparecer</small></span>${ICO.chev}</button>
        </div>
        <div class="grafico" id="grafico" hidden></div>
      </section>

      <div class="tags">${(it.regras || []).map((t) => `<a class="tag" href="#/regra/${t}">${esc(GUIA.regras[t] || t)}</a>`).join("")}</div>

      <nav class="navegacao" aria-label="Itens vizinhos">
        ${ant ? `<a class="btn cinza" href="#/${ant.chave}" rel="prev">‹ <span>${esc(rotuloRef(ant, g))}</span></a>` : "<span></span>"}
        ${prox ? `<a class="btn tint" href="#/${prox.chave}" rel="next"><span>${esc(rotuloRef(prox, g))}</span> ›</a>` : `<a class="btn tint" href="#/simulado">Fazer o simulado ›</a>`}
      </nav>
    </div>`;

    const graficoEl = $("#grafico");
    const btnG = $("#btn-grafico");
    const fecharGrafico = () => { graficoEl.hidden = true; btnG.setAttribute("aria-expanded", "false"); destruirGrafico(); graficoEl.innerHTML = ""; };
    criarConversa($("#conversa"), it, ref.chave, {
      fixo: true,
      aoMudar: (rev) => {
        $("#dica").hidden = rev.passos > 0 || rev.resposta;
        btnG.disabled = !rev.resposta;
        $("#grafico-sub").textContent = !rev.resposta
          ? "Libera depois que a resposta aparecer"
          : typeof it.ponto === "number" ? "Mostra a reta tangente no ponto pedido" : it.ordem === 2 ? "Mostra f, f′ e f″ juntas" : "Mostra f e f′ juntas";
        if (!rev.resposta && !graficoEl.hidden) fecharGrafico();
      },
    });
    btnG.addEventListener("click", () => {
      if (!graficoEl.hidden) return fecharGrafico();
      graficoEl.hidden = false;
      btnG.setAttribute("aria-expanded", "true");
      if (GUIA.criarGrafico) estado.grafico = GUIA.criarGrafico(graficoEl, it);
    });
    $("#sw-feito").addEventListener("change", (e) => {
      if (e.target.checked) estado.feitos.add(ref.chave);
      else estado.feitos.delete(ref.chave);
      store.set("feitos", [...estado.feitos]);
      $("#chips-item").innerHTML = ex.itens.map((i2) => chip(g, ex, i2, ref.chave)).join("");
    });
    $("#btn-copiar").addEventListener("click", (e) => {
      const texto = `${PROMPT}\n${textoPuro(ex.enunciado)}\n${it.id}) ${textoPuro(it.pergunta)}`;
      const ok = () => { e.target.textContent = "Copiado ✓"; setTimeout(() => (e.target.textContent = "Copiar pergunta"), 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(texto).then(ok, () => prompt("Copie a pergunta:", texto));
      else prompt("Copie a pergunta:", texto);
    });
  }

  // ------------------------------------------------------------ simulado
  const simLer = () => store.get("simulado", { fase: "inicio" });
  const simSalvar = (s) => store.set("simulado", s);
  const simChave = (q, it) => `sim/${q.id}/${it.id}`;
  const decorrido = (s) => (s.acumulado || 0) + (s.rodando ? Date.now() - (s.desde || Date.now()) : 0);
  const rotItem = (q, it) => (q.itens.length > 1 ? `<b>${esc(it.id)})</b> ` : "");

  function fmtTempo(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    const dd = (n) => String(n).padStart(2, "0");
    return h ? `${h}:${dd(m)}:${dd(s)}` : `${dd(m)}:${dd(s)}`;
  }
  const fmtMin = (ms) => { const m = Math.round(ms / 60000); return m < 1 ? "menos de 1 min" : `${m} min`; };

  function refHtml(it) {
    const f = it.fonte;
    if (!f) return "";
    return `<a class="ref" href="${esc(f.url)}" target="_blank" rel="noopener">${ICO.link}<span>Fonte: ${esc(f.nome)} — ${esc(f.item)}</span></a>`;
  }

  function secaoFontes(S) {
    const ajustes = [];
    S.questoes.forEach((q) => q.itens.forEach((it) => {
      if (it.fonte && /\(/.test(it.fonte.item)) ajustes.push(`Questão ${q.numero}${q.itens.length > 1 ? " " + it.id : ""}: ${it.fonte.item}`);
    }));
    return `<section class="grupo">
      <h2 class="grupo-rot">Referências</h2>
      <div class="lista">${(S.fontes || []).map((f) => `<a class="linha" href="${esc(f.url)}" target="_blank" rel="noopener"><span class="linha-txt"><b>${esc(f.nome)}</b><small>${esc(f.autor)}</small></span>${ICO.chev}</a>`).join("")}</div>
      <p class="grupo-nota">Enunciados e gabaritos vêm das fontes acima${ajustes.length ? ` (${esc(ajustes.join("; "))})` : ""}. As explicações passo a passo são do guia.</p>
    </section>`;
  }

  function limparRevSim(S) {
    S.questoes.forEach((q) => q.itens.forEach((it) => estado.rev.delete(simChave(q, it))));
  }

  function paginaSimulado() {
    marcarAba("simulado");
    clearInterval(estado.timer);
    estado.conversas = [];
    const S = GUIA.simulado;
    if (!S) {
      main.innerHTML = `<div class="pagina">${cabecalho({ titulo: "Simulado" })}<p>Simulado não carregado.</p></div>`;
      return;
    }
    const s = simLer();
    if (s.fase === "prova") simProva(S, s);
    else if (s.fase === "correcao") simCorrecao(S, s);
    else simInicio(S);
  }

  function simInicio(S) {
    const ult = store.get("simUltimo", null);
    main.innerHTML = `<div class="pagina">
      ${cabecalho({ sobre: "Treino no formato da prova", titulo: esc(S.titulo), sub: `${S.questoes.length} questões valendo ${S.total} pontos, com a mesma distribuição da P1. As questões foram tiradas de listas de exercícios publicadas — a fonte aparece em cada item.` })}

      <section class="grupo">
        <h2 class="grupo-rot">Estrutura da prova</h2>
        <div class="lista com-ico">
          ${S.questoes.map((q, i) => `<div class="linha">
            <span class="ico" style="--c:${COR_Q[i % COR_Q.length]}">${q.numero}</span>
            <span class="linha-txt"><b>Questão ${q.numero}${q.itens.length > 1 ? ` · itens ${q.itens.map((x) => x.id).join(" e ")}` : ""}</b><small>${esc(q.tema)}</small></span>
            <span class="linha-det">${fmtPts(q.pontos)}</span>
          </div>`).join("")}
          <div class="linha"><span class="ico" style="--c:#8e8e93">Σ</span><span class="linha-txt"><b>Total</b></span><span class="linha-det"><b>${fmtPts(S.total)}</b></span></div>
        </div>
      </section>

      <section class="grupo">
        <h2 class="grupo-rot">Como fazer</h2>
        <div class="cartao" style="margin:0">
          <ol class="lista-num">
            <li>Separe papel e caneta e resolva sem olhar o guia.</li>
            <li>O cronômetro começa quando você tocar em <b>Começar</b> (dá para pausar).</li>
            <li>No fim, toque em <b>Entregar e corrigir</b>: abra a resposta de cada item, compare com a sua e marque <b>Acertei</b>, <b>Meio certo</b> ou <b>Errei</b>.</li>
            <li>Errou? Abra o passo a passo do item, no nível que preferir.</li>
          </ol>
        </div>
        ${ult ? `<p class="grupo-nota">Última tentativa: <b>${fmtNum(ult.nota)} de ${ult.total}</b> em ${new Date(ult.data).toLocaleDateString("pt-BR")} · ${fmtMin(ult.tempo)}.</p>` : ""}
      </section>

      <div class="botoes">
        <button class="btn bloco" id="sim-comecar">Começar simulado</button>
        <button class="btn tint bloco" id="sim-imprimir">Imprimir a prova</button>
      </div>
      ${secaoFontes(S)}
    </div>`;
    $("#sim-comecar").addEventListener("click", () => {
      limparRevSim(S);
      simSalvar({ fase: "prova", acumulado: 0, rodando: true, desde: Date.now(), notas: {} });
      paginaSimulado();
      window.scrollTo(0, 0);
    });
    $("#sim-imprimir").addEventListener("click", () => imprimirSimulado(S));
  }

  function simProva(S) {
    main.innerHTML = `<div class="pagina">
      ${cabecalho({ sobre: "Simulado em andamento", titulo: esc(S.titulo), sub: `Resolva no papel. Valendo ${fmtPts(S.total)}.` })}
      <div class="cronometro" role="timer">
        ${ICO.relogioPeq}
        <span class="tempo" id="sim-tempo">00:00</span>
        <button class="pilula cinza" id="sim-pausa">Pausar</button>
      </div>
      ${S.questoes.map((q) => `<section class="questao">
        <div class="q-cab"><span class="q-num">Questão ${q.numero}</span><span class="pts">${fmtPts(q.pontos)}</span></div>
        <div class="q-enun">${tex(q.enunciado)}</div>
        ${q.itens.map((it) => `<div class="q-item">
          <div class="q-item-cab"><div class="q-item-txt">${rotItem(q, it)}${tex(it.pergunta)}</div>${q.itens.length > 1 ? `<span class="q-pts">${fmtPts(it.pontos)}</span>` : ""}</div>
          ${refHtml(it)}
        </div>`).join("")}
      </section>`).join("")}
      <div class="botoes">
        <button class="btn bloco" id="sim-entregar">Entregar e corrigir</button>
        <button class="btn vermelho bloco" id="sim-cancelar">Cancelar simulado</button>
      </div>
    </div>`;

    const atualizar = () => {
      const el = $("#sim-tempo");
      if (!el) return;
      const at = simLer();
      el.textContent = fmtTempo(decorrido(at));
      el.classList.toggle("pausado", !at.rodando);
      $("#sim-pausa").textContent = at.rodando ? "Pausar" : "Continuar";
    };
    atualizar();
    estado.timer = setInterval(atualizar, 1000);

    $("#sim-pausa").addEventListener("click", () => {
      const at = simLer();
      if (at.rodando) { at.acumulado = decorrido(at); at.rodando = false; }
      else { at.rodando = true; at.desde = Date.now(); }
      simSalvar(at);
      atualizar();
    });
    $("#sim-entregar").addEventListener("click", () => {
      if (!confirm("Entregar o simulado e começar a correção?")) return;
      const at = simLer();
      at.acumulado = decorrido(at);
      at.rodando = false;
      at.fase = "correcao";
      at.notas = at.notas || {};
      simSalvar(at);
      paginaSimulado();
      window.scrollTo(0, 0);
    });
    $("#sim-cancelar").addEventListener("click", () => {
      if (!confirm("Cancelar o simulado? O tempo será zerado.")) return;
      simSalvar({ fase: "inicio" });
      paginaSimulado();
      window.scrollTo(0, 0);
    });
  }

  function simCorrecao(S, s) {
    main.innerHTML = `<div class="pagina">
      ${cabecalho({ sobre: "Correção", titulo: esc(S.titulo), sub: `Tempo de prova: ${fmtMin(s.acumulado || 0)}. Abra a resposta de cada item, compare com a sua e marque como foi.` })}
      <section class="cartao sombra placar" id="placar" aria-live="polite"></section>
      ${seletorNivel()}
      ${S.questoes.map((q) => `<section class="questao">
        <div class="q-cab"><span class="q-num">Questão ${q.numero}</span><span class="pts">${fmtPts(q.pontos)}</span></div>
        <div class="q-tema">${esc(q.tema)}${q.relacionada ? ` · <a href="${q.relacionada.href}">revisar ${esc(q.relacionada.rotulo)}</a>` : ""}</div>
        <div class="q-enun">${tex(q.enunciado)}</div>
        ${q.itens.map((it) => {
          const k = simChave(q, it);
          return `<div class="q-item" data-k="${k}">
            <div class="q-item-cab"><div class="q-item-txt">${rotItem(q, it)}${tex(it.pergunta)}</div><span class="q-pts">${fmtPts(it.pontos)}</span></div>
            ${refHtml(it)}
            <div class="chat"><div class="sim-conv"></div></div>
            <div class="nota-item">
              <div class="seg" role="radiogroup" aria-label="Como foi o item">
                ${[["0", "Errei"], ["0.5", "Meio certo"], ["1", "Acertei"]].map(([v, t]) => `<button role="radio" data-nota="${v}" aria-checked="${s.notas && s.notas[k] === +v}">${t}</button>`).join("")}
              </div>
              <span class="ganho"></span>
            </div>
          </div>`;
        }).join("")}
      </section>`).join("")}
      <div class="botoes">
        <button class="btn bloco" id="sim-refazer">Refazer simulado</button>
        <button class="btn tint bloco" id="sim-imprimir">Imprimir a prova</button>
      </div>
      ${secaoFontes(S)}
    </div>`;

    const itemPor = new Map();
    S.questoes.forEach((q) => q.itens.forEach((it) => itemPor.set(simChave(q, it), it)));

    function atualizarPlacar() {
      const at = simLer();
      let pts = 0, corrigidos = 0;
      itemPor.forEach((it, k) => {
        const v = at.notas ? at.notas[k] : undefined;
        const el = document.querySelector(`.q-item[data-k="${k}"] .ganho`);
        if (v !== undefined) { corrigidos++; pts += v * it.pontos; }
        if (el) el.textContent = v === undefined ? "" : `${fmtNum(v * it.pontos)}/${fmtNum(it.pontos)}`;
      });
      const pronto = corrigidos === itemPor.size;
      const frac = pts / S.total;
      const cor = !pronto ? "var(--blue)" : frac >= 0.75 ? "var(--green)" : frac >= 0.5 ? "var(--orange)" : "var(--red)";
      const msg = !pronto
        ? `${corrigidos} de ${itemPor.size} itens corrigidos. Abra a resposta para liberar a nota de cada item.`
        : frac >= 0.75 ? "Mandou bem! Revise só o que escorregou." : frac >= 0.5 ? "Quase lá — revise os itens que errou no nível Detalhado." : "Vale revisar as tarefas no nível Detalhado e tentar de novo.";
      $("#placar").innerHTML = `${anel(frac, `${fmtNum(pts)}<small>de ${S.total}</small>`, { grande: true, cor })}
        <div class="placar-txt"><b>${pronto ? "Nota final" : "Nota parcial"}: ${fmtNum(pts)}</b><span>${msg}</span></div>`;
      if (pronto) store.set("simUltimo", { nota: pts, total: S.total, data: Date.now(), tempo: at.acumulado || 0 });
    }

    document.querySelectorAll(".q-item[data-k]").forEach((el) => {
      const k = el.dataset.k;
      const it = itemPor.get(k);
      const botoes = el.querySelectorAll("[data-nota]");
      criarConversa($(".sim-conv", el), it, k, {
        fixo: false,
        correcao: true,
        aoMudar: (rev) => {
          const at = simLer();
          const liberado = rev.resposta || (at.notas && at.notas[k] !== undefined);
          botoes.forEach((b) => { b.disabled = !liberado; });
        },
      });
      botoes.forEach((b) => b.addEventListener("click", () => {
        const at = simLer();
        at.notas = at.notas || {};
        at.notas[k] = +b.dataset.nota;
        simSalvar(at);
        botoes.forEach((x) => x.setAttribute("aria-checked", String(x === b)));
        atualizarPlacar();
      }));
    });
    atualizarPlacar();

    $("#sim-refazer").addEventListener("click", () => {
      if (!confirm("Refazer o simulado do zero?")) return;
      limparRevSim(S);
      simSalvar({ fase: "inicio" });
      paginaSimulado();
      window.scrollTo(0, 0);
    });
    $("#sim-imprimir").addEventListener("click", () => imprimirSimulado(S));
  }

  function imprimirSimulado(S) {
    const el = $("#impressao");
    el.innerHTML = `
      <div class="cab"><div><h1>${esc(S.titulo)} — Cálculo (MAT-017)</h1><div>Valor: ${fmtPts(S.total)}</div></div><div>Nome: ______________________________<br><br>Data: ____/____/______</div></div>
      ${S.questoes.map((q) => `<div class="iq">
        <h2>Questão ${q.numero} (${fmtPts(q.pontos)})</h2>
        <div>${tex(q.enunciado)}</div>
        ${q.itens.map((it) => `<div class="ii">${rotItem(q, it)}${tex(it.pergunta)}${q.itens.length > 1 ? ` <i>(${fmtPts(it.pontos)})</i>` : ""}<div class="espaco"></div></div>`).join("")}
      </div>`).join("")}
      <div class="refs"><b>Referências</b><br>${(S.fontes || []).map((f) => `${esc(f.nome)} — ${esc(f.autor)}. ${esc(f.url)}`).join("<br>")}</div>`;
    document.body.classList.add("imprimindo");
    const fim = () => {
      document.body.classList.remove("imprimindo");
      window.removeEventListener("afterprint", fim);
    };
    window.addEventListener("afterprint", fim);
    window.print();
  }

  // ------------------------------------------------------------ tema
  $("#btn-tema").addEventListener("click", () => {
    const raiz = document.documentElement;
    const escuroAgora = raiz.dataset.theme ? raiz.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    raiz.dataset.theme = escuroAgora ? "light" : "dark";
    try { localStorage.setItem("guiaP2:tema", raiz.dataset.theme); } catch (e) { /* ok */ }
    if (estado.grafico) estado.grafico.redesenhar();
  });

  // ------------------------------------------------------------ roteador
  function lerRota() {
    const p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    if (!p.length) return { tipo: "inicio" };
    if (["tarefas", "formulario", "simulado"].includes(p[0])) return { tipo: p[0] };
    if (p[0] === "regra" && p[1]) return { tipo: "regra", tag: p[1] };
    const grupo = GUIA.grupos.find((g) => g.id === p[0]);
    if (!grupo) return { tipo: "inicio" };
    if (p.length >= 3 && porChave.has(p.slice(0, 3).join("/"))) return { tipo: "item", grupo, chave: p.slice(0, 3).join("/") };
    if (p.length === 2) {
      const ex = grupo.exercicios.find((e) => e.id === p[1]);
      if (ex) return { tipo: "item", grupo, chave: `${grupo.id}/${ex.id}/${ex.itens[0].id}` };
    }
    return { tipo: "grupo", grupo };
  }

  function rotear() {
    const rota = lerRota();
    estado.rota = rota;
    estado.conversas = [];
    clearInterval(estado.timer);
    estado.timer = null;
    destruirGrafico();

    if (rota.tipo === "inicio") { paginaInicio(); document.title = "Guia P2 · Cálculo"; }
    else if (rota.tipo === "tarefas") { paginaTarefas(); document.title = "Tarefas · Guia P2"; }
    else if (rota.tipo === "formulario") { paginaFormulario(); document.title = "Formulário · Guia P2"; }
    else if (rota.tipo === "simulado") { paginaSimulado(); document.title = "Simulado · Guia P2"; }
    else if (rota.tipo === "regra") { paginaRegra(rota.tag); document.title = `${GUIA.regras[rota.tag] || rota.tag} · Guia P2`; }
    else if (rota.tipo === "grupo") { paginaGrupo(rota.grupo); document.title = `${rota.grupo.tarefa} · Guia P2`; }
    else {
      const ref = porChave.get(rota.chave);
      paginaItem(ref);
      document.title = `${ref.g.tarefa} · ${nomeEx(ref.ex)} ${ref.it.id}) · Guia P2`;
    }
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", rotear);

  // ------------------------------------------------------------ teclado
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const alvo = e.target;
    const campoTexto = alvo && alvo.tagName === "INPUT" && !["checkbox", "radio", "button"].includes(alvo.type);
    if (alvo && (campoTexto || alvo.tagName === "TEXTAREA" || alvo.isContentEditable)) return;
    if (e.key === "1" || e.key === "2" || e.key === "3") { mudarNivel(+e.key); return; }
    if (estado.rota && estado.rota.tipo === "item") {
      const ref = porChave.get(estado.rota.chave);
      if ((e.key === "n" || e.key === "N") && estado.conversas[0]) estado.conversas[0].agir("proximo");
      if (e.key === "ArrowRight" && lista[ref.i + 1]) location.hash = "#/" + lista[ref.i + 1].chave;
      if (e.key === "ArrowLeft" && lista[ref.i - 1]) location.hash = "#/" + lista[ref.i - 1].chave;
    }
  });

  if (!GUIA.grupos.length) {
    main.innerHTML = `<div class="pagina"><p>Nenhum conteúdo foi carregado. Verifique os arquivos em <code>data/</code>.</p></div>`;
    return;
  }
  rotear();
})();
