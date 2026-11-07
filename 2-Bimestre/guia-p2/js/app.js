/*
 * Guia P2 · Cálculo — aplicação (roteamento por hash, renderização, progresso).
 */
(function () {
  "use strict";

  const PROMPT = "Me ajude a resolver essa atividade passo-a-passo:";
  const NIVEIS = {
    1: { nome: "Normal", desc: "passos curtos até a resposta" },
    2: { nome: "Normal + infos", desc: "acrescenta o porquê de cada passo e o erro mais comum" },
    3: { nome: "Detalhado", desc: "acrescenta todas as contas intermediárias e como conferir" },
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
    revelar: !!store.get("revelar", false),
    feitos: new Set(store.get("feitos", [])),
    revelados: new Map(), // chave do item -> nº de passos visíveis
    graficoAberto: new Set(), // itens com o gráfico aberto (sobrevive à troca de nível)
    grafico: null,
    rotaAtual: null,
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

  // ------------------------------------------------------------ LaTeX
  const cacheTex = new Map();
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
        html = display ? `<div><code>${esc(fonte)}</code></div>` : `<code>${esc(fonte)}</code>`;
      }
      cacheTex.set(chave, html);
      return html;
    });
  }

  const textoPuro = (s) => String(s || "").replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

  // ------------------------------------------------------------ elementos
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const main = $("#conteudo");
  const menuLista = $("#menu-lista");
  const menuProg = $("#menu-progresso");

  // ------------------------------------------------------------ topo: nível e tema
  function aplicarNivelBotoes() {
    document.querySelectorAll(".nivel button").forEach((b) => {
      b.setAttribute("aria-checked", String(+b.dataset.nivel === estado.nivel));
    });
  }
  function mudarNivel(n) {
    if (n === estado.nivel) return;
    estado.nivel = n;
    store.set("nivel", n);
    aplicarNivelBotoes();
    const balao = $("#balao-tutor");
    if (balao && estado.rotaAtual) {
      const ref = porChave.get(estado.rotaAtual);
      if (ref) desenharTutor(ref, balao);
    }
  }
  document.querySelectorAll(".nivel button").forEach((b) => b.addEventListener("click", () => mudarNivel(+b.dataset.nivel)));
  aplicarNivelBotoes();

  $("#btn-tema").addEventListener("click", () => {
    const raiz = document.documentElement;
    const escuroAgora = raiz.dataset.theme ? raiz.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    raiz.dataset.theme = escuroAgora ? "light" : "dark";
    try { localStorage.setItem("guiaP2:tema", raiz.dataset.theme); } catch (e) { /* ok */ }
    if (estado.grafico) estado.grafico.redesenhar();
  });

  // menu mobile
  const btnMenu = $("#btn-menu");
  const veu = $("#veu");
  function abrirMenu(abrir) {
    document.body.classList.toggle("menu-aberto", abrir);
    btnMenu.setAttribute("aria-expanded", String(abrir));
    veu.hidden = !abrir;
  }
  btnMenu.addEventListener("click", () => abrirMenu(!document.body.classList.contains("menu-aberto")));
  veu.addEventListener("click", () => abrirMenu(false));

  // ------------------------------------------------------------ menu lateral
  function desenharMenu(rota) {
    const feitos = estado.feitos.size ? lista.filter((r) => estado.feitos.has(r.chave)).length : 0;
    const pct = totalItens ? Math.round((feitos / totalItens) * 100) : 0;
    menuProg.innerHTML = `<div>Seu progresso: <b>${feitos}</b> de ${totalItens} itens</div><div class="barra"><i style="width:${pct}%"></i></div>`;

    const grupoAtivo = rota.tipo === "grupo" || rota.tipo === "item" ? rota.grupo : null;
    let html = `
      <li><a class="menu-link ${rota.tipo === "inicio" ? "ativo" : ""}" href="#/">Início</a></li>
      <li><a class="menu-link ${rota.tipo === "formulario" ? "ativo" : ""}" href="#/formulario">Formulário (o que cai)</a></li>
      <li class="menu-secao">Atividades</li>`;
    for (const g of GUIA.grupos) {
      const refs = itensDoGrupo(g);
      const aberto = grupoAtivo === g;
      html += `<li>
        <a class="menu-link ${aberto && rota.tipo === "grupo" ? "ativo" : ""}" href="#/${g.id}">
          <span>${esc(g.tarefa)}<span class="menu-grupo-sub">${tex(g.titulo)}</span></span>
          <span class="cont">${feitosDe(refs)}/${refs.length}</span>
        </a>`;
      if (aberto) {
        html += `<ul class="menu-ex">`;
        for (const ex of g.exercicios) {
          html += `<li><a class="menu-ex-titulo" href="#/${g.id}/${ex.id}/${ex.itens[0].id}">${esc(nomeEx(ex))} · ${esc(g.material)}</a><div class="chips">`;
          for (const it of ex.itens) {
            const chave = `${g.id}/${ex.id}/${it.id}`;
            const cls = [estado.feitos.has(chave) ? "feito" : "", rota.chave === chave ? "ativo" : ""].join(" ");
            html += `<a class="chip ${cls}" href="#/${chave}" aria-label="${esc(nomeEx(ex))} item ${esc(it.id)}">${esc(it.id)}</a>`;
          }
          html += `</div></li>`;
        }
        html += `</ul>`;
      }
      html += `</li>`;
    }
    menuLista.innerHTML = html;
  }

  // ------------------------------------------------------------ páginas
  function trilha(partes) {
    return `<nav class="trilha" aria-label="Você está em">${partes
      .map((p, i) => (p.href ? `<a href="${p.href}">${p.html}</a>` : `<span>${p.html}</span>`) + (i < partes.length - 1 ? `<span class="sep">›</span>` : ""))
      .join("")}</nav>`;
  }

  function contarRegras() {
    const cont = {};
    for (const r of lista) for (const tag of r.it.regras || []) cont[tag] = (cont[tag] || 0) + 1;
    return Object.keys(GUIA.regras).filter((t) => cont[t]).map((t) => ({ tag: t, n: cont[t] }));
  }

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
    const ultimo = porChave.get(store.get("ultimo", ""));
    const proximo = lista.find((r) => !estado.feitos.has(r.chave));
    const primeiro = lista[0];
    const avisos = coletarAvisos();

    main.innerHTML = `
      <section class="hero">
        <h1>Guia de estudo · P2 de Cálculo</h1>
        <p class="lead">Todas as atividades do 2º bimestre (Tarefas 006, 007 e 008 — derivadas) resolvidas como se você
        tivesse perguntado a uma IA: <b>“${esc(PROMPT.replace(":", ""))}”</b>. Escolha o nível de detalhe no topo e
        avance item por item.</p>
        <div class="botoes">
          ${primeiro ? `<a class="btn primario" href="#/${primeiro.chave}">Começar pela ${esc(primeiro.g.tarefa)}</a>` : ""}
          ${ultimo ? `<a class="btn" href="#/${ultimo.chave}">Voltar para onde parei (${esc(ultimo.g.tarefa)}, ${esc(nomeEx(ultimo.ex))} ${esc(ultimo.it.id)})</a>` : ""}
          ${proximo && estado.feitos.size ? `<a class="btn" href="#/${proximo.chave}">Próximo item não marcado</a>` : ""}
          <a class="btn" href="#/formulario">Abrir formulário</a>
        </div>
      </section>

      <section class="secao">
        <h2>Os três níveis de explicação</h2>
        <div class="niveis-explica">
          ${[1, 2, 3].map((n) => `<div class="cartao"><b>${n}. ${NIVEIS[n].nome}</b><p>${n === 1 ? "Passos curtos, direto até a resposta. Bom para revisar rápido." : n === 2 ? "Tudo do Normal + o <b>porquê</b> de cada passo (qual regra, por que ela serve) e o <b>erro mais comum</b>." : "Tudo acima + <b>todas as contas intermediárias</b> (expoentes, frações, sinais) e um jeito de <b>conferir</b> a resposta."}</p></div>`).join("")}
        </div>
        <p style="margin-top:12px;color:var(--ink-2);font-size:.93rem">${tex(`Dicas: marque <b>“Revelar um passo por vez”</b> para tentar
        cada passo antes de ver; use <b>Entendi</b> para registrar seu progresso (fica salvo neste navegador); abra o
        <b>gráfico</b> para ver $f$ e a derivada juntas. Atalhos: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> mudam o nível, <kbd>←</kbd> <kbd>→</kbd> trocam de item.`)}</p>
      </section>

      <section class="secao">
        <h2>Atividades do bimestre</h2>
        <div class="grade">
          ${GUIA.grupos.map((g) => {
            const refs = itensDoGrupo(g);
            const f = feitosDe(refs);
            return `<a class="cartao cartao-tarefa" href="#/${g.id}">
              <span class="etiqueta">${esc(g.tarefa)} · ${esc(g.material)}</span>
              <h3>${tex(g.titulo)}</h3>
              <span class="meta">${g.exercicios.map((ex) => esc(nomeEx(ex))).join(", ")} · ${refs.length} itens</span>
              <div class="barra"><i style="width:${refs.length ? Math.round((f / refs.length) * 100) : 0}%"></i></div>
              <span class="meta">${f} de ${refs.length} marcados como entendidos</span>
            </a>`;
          }).join("")}
        </div>
      </section>

      <section class="secao">
        <h2>Treinar por regra</h2>
        <div class="regras-chips">
          ${contarRegras().map(({ tag, n }) => `<a class="tag" href="#/regra/${tag}">${esc(GUIA.regras[tag])} <span class="n">${n}</span></a>`).join("")}
        </div>
      </section>

      ${avisos.length ? `<section class="secao">
        <h2>Avisos sobre o material do professor</h2>
        <ul class="lista-avisos">${avisos.map((a) => `<li><a href="${a.href}">${esc(a.rot)}</a> — ${tex(a.obs)}</li>`).join("")}</ul>
      </section>` : ""}

      <p class="secao" style="color:var(--ink-3);font-size:.85rem">Conteúdo baseado nos Materiais 003, 004 e 005 de MAT-017 (FATEC) e na lista de tarefas do 2º bimestre.
      As respostas finais foram conferidas numericamente; mesmo assim, confira com o material oficial.</p>`;
  }

  function paginaFormulario() {
    const F = GUIA.formulario;
    main.innerHTML = `
      ${trilha([{ href: "#/", html: "Início" }, { html: "Formulário" }])}
      <h1>Formulário</h1>
      <p style="color:var(--ink-2)">Só o que aparece nos materiais do bimestre. Bom ponto de partida para montar sua folha de consulta.</p>
      ${F ? F.secoes.map((s) => `<section class="cartao form-sec" id="f-${s.id}">
        <h2>${esc(s.titulo)} <span class="fonte">${esc(s.fonte)}</span></h2>
        ${tex(s.html)}
      </section>`).join("") : `<p class="vazio">Formulário não carregado.</p>`}`;
  }

  function itemLink(r, comOrigem) {
    const feito = estado.feitos.has(r.chave) ? "feito" : "";
    const origem = comOrigem ? `<span style="display:block;font-size:.75rem;color:var(--ink-3)">${esc(r.g.tarefa)} · ${esc(nomeEx(r.ex))}</span>` : "";
    return `<a class="item-link ${feito}" href="#/${r.chave}"><span class="letra">${esc(r.it.id)}</span><span class="q">${origem}${tex(r.it.pergunta)}</span></a>`;
  }

  function paginaGrupo(g) {
    main.innerHTML = `
      ${trilha([{ href: "#/", html: "Início" }, { html: esc(g.tarefa) }])}
      <h1>${esc(g.tarefa)} — ${tex(g.titulo)}</h1>
      <p style="color:var(--ink-3);margin-top:-4px">${esc(g.material)}</p>
      <div class="cartao resumo"><div class="caixa porque" style="margin:0"><div class="rot">O que essa tarefa treina</div>${tex(g.resumo)}</div></div>
      ${g.exercicios.map((ex) => `
        <section class="ex-bloco">
          <h3>${esc(nomeEx(ex))} <span class="enun">${tex(ex.enunciado)}</span></h3>
          ${ex.obs ? `<div class="caixa obs"><div class="rot">Sobre o material</div>${tex(ex.obs)}</div>` : ""}
          <div class="itens-tabela">${ex.itens.map((it) => itemLink(porChave.get(`${g.id}/${ex.id}/${it.id}`))).join("")}</div>
        </section>`).join("")}`;
  }

  function paginaRegra(tag) {
    const refs = lista.filter((r) => (r.it.regras || []).includes(tag));
    main.innerHTML = `
      ${trilha([{ href: "#/", html: "Início" }, { html: "Treinar por regra" }, { html: esc(GUIA.regras[tag] || tag) }])}
      <h1>Regra: ${esc(GUIA.regras[tag] || tag)}</h1>
      <p style="color:var(--ink-2)">${refs.length} itens usam essa regra.</p>
      <div class="regras-chips" style="margin-bottom:18px">${contarRegras().map(({ tag: t, n }) => `<a class="tag" href="#/regra/${t}" ${t === tag ? 'aria-current="page" style="border-color:var(--accent)"' : ""}>${esc(GUIA.regras[t])} <span class="n">${n}</span></a>`).join("")}</div>
      <div class="itens-tabela">${refs.map((r) => itemLink(r, true)).join("") || `<p class="vazio">Nenhum item.</p>`}</div>`;
  }

  // ------------------------------------------------------------ página do item (conversa)
  function caixa(cls, rotulo, conteudo) {
    return `<div class="caixa ${cls}"><div class="rot">${rotulo}</div>${tex(conteudo)}</div>`;
  }

  function desenharTutor(ref, balao) {
    const { it, ex } = ref;
    const n = estado.nivel;
    const total = it.passos.length;
    const visiveis = estado.revelar ? Math.min(estado.revelados.get(ref.chave) || 0, total) : total;
    const completo = visiveis >= total;

    let html = `<div class="nivel-info">Nível: <b>${NIVEIS[n].nome}</b> — ${NIVEIS[n].desc}.</div>`;
    if (ex.obs) html += caixa("obs", "Sobre o material", ex.obs);
    if (it.obs) html += caixa("obs", "Observação sobre este item", it.obs);
    html += `<div class="intro">${tex(it.intro)}</div>`;
    html += `<ol class="passos">`;
    it.passos.slice(0, visiveis).forEach((p) => {
      html += `<li class="passo"><h4>${tex(p.titulo)}</h4><div class="normal">${tex(p.normal)}</div>`;
      if (n >= 2 && p.mais) html += caixa("porque", "Por quê?", p.mais);
      if (n >= 3 && p.detalhe) html += caixa("conta", "Conta completa", p.detalhe);
      html += `</li>`;
    });
    html += `</ol>`;

    if (!completo) {
      html += `<p class="escondido-dica">${visiveis === 0 ? "Tente começar sozinho. Quando quiser, revele o primeiro passo." : "Tente fazer o próximo passo antes de clicar."}</p>
        <div class="revelar">
          <button class="btn primario pequeno" data-acao="proximo">${visiveis === 0 ? "Mostrar o 1º passo" : `Próximo passo (${visiveis + 1}/${total})`}</button>
          <button class="btn pequeno" data-acao="tudo">Mostrar tudo</button>
        </div>`;
    } else {
      if (n >= 2 && it.cuidado) html += caixa("cuidado", "Cuidado — erro comum", it.cuidado);
      if (n >= 3 && it.conferir) html += caixa("conferir", "Como conferir", it.conferir);
      html += `<div class="resposta" style="margin-top:14px"><div class="rot">Resposta</div>${tex(it.gabarito)}</div>`;
    }

    const feito = estado.feitos.has(ref.chave);
    html += `<div class="acoes-item">
        <button class="btn pequeno" data-acao="feito" aria-pressed="${feito}">${feito ? "✓ Entendi" : "Marcar como entendido"}</button>
        <button class="btn pequeno" data-acao="grafico" aria-expanded="false">Ver gráfico</button>
        <span class="tags">${(it.regras || []).map((t) => `<a class="tag" href="#/regra/${t}">${esc(GUIA.regras[t] || t)}</a>`).join("")}</span>
      </div>
      <div class="grafico" hidden></div>`;

    if (estado.grafico) { estado.grafico.destruir(); estado.grafico = null; }
    balao.innerHTML = html;

    balao.querySelector('[data-acao="feito"]').addEventListener("click", (e) => {
      if (estado.feitos.has(ref.chave)) estado.feitos.delete(ref.chave);
      else estado.feitos.add(ref.chave);
      store.set("feitos", [...estado.feitos]);
      const agora = estado.feitos.has(ref.chave);
      e.currentTarget.setAttribute("aria-pressed", String(agora));
      e.currentTarget.textContent = agora ? "✓ Entendi" : "Marcar como entendido";
      desenharMenu(estado.rota);
      desenharChipsItem(ref);
    });
    const btnG = balao.querySelector('[data-acao="grafico"]');
    const caixaG = balao.querySelector(".grafico");
    const mostrarGrafico = (abrir) => {
      caixaG.hidden = !abrir;
      btnG.setAttribute("aria-expanded", String(abrir));
      btnG.textContent = abrir ? "Esconder gráfico" : "Ver gráfico";
      if (abrir) estado.graficoAberto.add(ref.chave);
      else estado.graficoAberto.delete(ref.chave);
      if (abrir && !estado.grafico && GUIA.criarGrafico) estado.grafico = GUIA.criarGrafico(caixaG, it);
    };
    btnG.addEventListener("click", () => mostrarGrafico(caixaG.hidden));
    if (estado.graficoAberto.has(ref.chave)) mostrarGrafico(true);
    const prox = balao.querySelector('[data-acao="proximo"]');
    if (prox) {
      prox.addEventListener("click", () => {
        estado.revelados.set(ref.chave, visiveis + 1);
        desenharTutor(ref, balao);
        const passos = balao.querySelectorAll(".passo");
        const ultimo = passos[passos.length - 1];
        if (ultimo) ultimo.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
      balao.querySelector('[data-acao="tudo"]').addEventListener("click", () => {
        estado.revelados.set(ref.chave, total);
        desenharTutor(ref, balao);
      });
    }
  }

  function desenharChipsItem(ref) {
    const alvo = $("#chips-item");
    if (!alvo) return;
    alvo.innerHTML = ref.ex.itens
      .map((it) => {
        const chave = `${ref.g.id}/${ref.ex.id}/${it.id}`;
        const cls = [estado.feitos.has(chave) ? "feito" : "", chave === ref.chave ? "ativo" : ""].join(" ");
        return `<a class="chip ${cls}" href="#/${chave}" ${chave === ref.chave ? 'aria-current="page"' : ""}>${esc(it.id)}</a>`;
      })
      .join("");
  }

  function paginaItem(ref, animar) {
    const { g, ex, it } = ref;
    const ant = lista[ref.i - 1];
    const prox = lista[ref.i + 1];
    store.set("ultimo", ref.chave);

    main.innerHTML = `
      ${trilha([{ href: "#/", html: "Início" }, { href: `#/${g.id}`, html: esc(g.tarefa) }, { html: `${esc(nomeEx(ex))} · item ${esc(it.id)}` }])}
      <div class="item-topo">
        <div class="chips" id="chips-item" aria-label="Itens deste exercício"></div>
        <label class="modo"><input type="checkbox" id="modo-revelar" ${estado.revelar ? "checked" : ""}> Revelar um passo por vez</label>
      </div>
      <div class="conversa">
        <div class="msg msg-usuario">
          <div class="balao">
            <div class="prompt">${esc(PROMPT)}</div>
            <div class="questao">
              <span class="fonte">${esc(g.tarefa)} · ${esc(g.material)} · ${esc(nomeEx(ex))}</span>
              ${tex(ex.enunciado)}<br><b>${esc(it.id)})</b> ${tex(it.pergunta)}
            </div>
            <div class="acoes-msg"><button id="btn-copiar" title="Copia a pergunta para colar em outra IA">Copiar pergunta</button></div>
          </div>
        </div>
        <div class="msg msg-tutor">
          <div class="avatar" aria-hidden="true">∂</div>
          <div class="balao" id="balao-tutor" aria-live="polite"></div>
        </div>
      </div>
      <nav class="navegacao" aria-label="Itens vizinhos">
        ${ant ? `<a class="btn" href="#/${ant.chave}" rel="prev">← <span>${esc(ant.g === g ? "" : ant.g.tarefa + " · ")}${esc(nomeEx(ant.ex))} ${esc(ant.it.id)})</span></a>` : "<span></span>"}
        ${prox ? `<a class="btn primario" href="#/${prox.chave}" rel="next"><span>${esc(prox.g === g ? "" : prox.g.tarefa + " · ")}${esc(nomeEx(prox.ex))} ${esc(prox.it.id)})</span> →</a>` : `<a class="btn" href="#/">Fim! Voltar ao início</a>`}
      </nav>`;

    desenharChipsItem(ref);
    $("#modo-revelar").addEventListener("change", (e) => {
      estado.revelar = e.target.checked;
      store.set("revelar", estado.revelar);
      estado.revelados.clear();
      desenharTutor(ref, $("#balao-tutor"));
    });
    $("#btn-copiar").addEventListener("click", (e) => {
      const texto = `${PROMPT}\n${textoPuro(ex.enunciado)}\n${it.id}) ${textoPuro(it.pergunta)}`;
      const ok = () => { e.target.textContent = "Copiado!"; setTimeout(() => (e.target.textContent = "Copiar pergunta"), 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(texto).then(ok, () => prompt("Copie a pergunta:", texto));
      else prompt("Copie a pergunta:", texto);
    });

    const balao = $("#balao-tutor");
    const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (animar && !reduzir) {
      balao.innerHTML = `<span class="digitando" aria-label="digitando"><i></i><i></i><i></i></span>`;
      const chave = ref.chave;
      setTimeout(() => { if (estado.rotaAtual === chave) desenharTutor(ref, balao); }, 420);
    } else {
      desenharTutor(ref, balao);
    }
  }

  // ------------------------------------------------------------ roteador
  function lerRota() {
    const partes = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    if (!partes.length) return { tipo: "inicio" };
    if (partes[0] === "formulario") return { tipo: "formulario" };
    if (partes[0] === "regra" && partes[1]) return { tipo: "regra", tag: partes[1] };
    const grupo = GUIA.grupos.find((g) => g.id === partes[0]);
    if (!grupo) return { tipo: "inicio" };
    if (partes.length >= 3) {
      const chave = partes.slice(0, 3).join("/");
      if (porChave.has(chave)) return { tipo: "item", grupo, chave };
    }
    if (partes.length === 2) {
      const ex = grupo.exercicios.find((e) => e.id === partes[1]);
      if (ex) return { tipo: "item", grupo, chave: `${grupo.id}/${ex.id}/${ex.itens[0].id}` };
    }
    return { tipo: "grupo", grupo };
  }

  function rotear() {
    const rota = lerRota();
    estado.rota = rota;
    const mesmaPagina = rota.tipo === "item" && rota.chave === estado.rotaAtual;
    estado.rotaAtual = rota.tipo === "item" ? rota.chave : null;
    if (estado.grafico) { estado.grafico.destruir(); estado.grafico = null; }

    if (rota.tipo === "inicio") { paginaInicio(); document.title = "Guia P2 · Cálculo"; }
    else if (rota.tipo === "formulario") { paginaFormulario(); document.title = "Formulário · Guia P2"; }
    else if (rota.tipo === "regra") { paginaRegra(rota.tag); document.title = `Regra: ${GUIA.regras[rota.tag] || rota.tag} · Guia P2`; }
    else if (rota.tipo === "grupo") { paginaGrupo(rota.grupo); document.title = `${rota.grupo.tarefa} · Guia P2`; }
    else {
      const ref = porChave.get(rota.chave);
      paginaItem(ref, !mesmaPagina);
      document.title = `${ref.g.tarefa} · ${nomeEx(ref.ex)} ${ref.it.id}) · Guia P2`;
    }
    desenharMenu(rota);
    abrirMenu(false);
    if (!mesmaPagina) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
  }

  window.addEventListener("hashchange", rotear);

  // ------------------------------------------------------------ teclado
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const alvo = e.target;
    if (alvo && (alvo.tagName === "INPUT" || alvo.tagName === "TEXTAREA" || alvo.isContentEditable)) return;
    if (e.key === "1" || e.key === "2" || e.key === "3") { mudarNivel(+e.key); return; }
    if (estado.rota && estado.rota.tipo === "item") {
      const ref = porChave.get(estado.rota.chave);
      if (e.key === "ArrowRight" && lista[ref.i + 1]) location.hash = "#/" + lista[ref.i + 1].chave;
      if (e.key === "ArrowLeft" && lista[ref.i - 1]) location.hash = "#/" + lista[ref.i - 1].chave;
    }
  });

  if (!GUIA.grupos.length) {
    main.innerHTML = `<p class="aviso">Nenhum conteúdo foi carregado. Verifique os arquivos em <code>data/</code>.</p>`;
    return;
  }
  rotear();
})();
