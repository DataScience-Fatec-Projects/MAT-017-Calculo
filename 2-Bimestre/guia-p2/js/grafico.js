/*
 * Gráfico interativo (canvas) de f e da derivada pedida no item.
 * Arraste para mover; botões para zoom; passe o mouse/dedo para ler valores.
 */
(function () {
  "use strict";

  const css = (el, nome) => getComputedStyle(el).getPropertyValue(nome).trim();
  const fmt = (v) => {
    if (!Number.isFinite(v)) return "—";
    const a = Math.abs(v);
    if (a !== 0 && (a < 1e-3 || a >= 1e5)) return v.toExponential(2);
    return (+v.toFixed(3)).toString();
  };

  function passoBonito(intervalo, alvo) {
    const bruto = intervalo / alvo;
    const pot = Math.pow(10, Math.floor(Math.log10(bruto)));
    const n = bruto / pot;
    return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * pot;
  }

  function seguro(fn) {
    return (x) => {
      try {
        const y = fn(x);
        return typeof y === "number" ? y : NaN;
      } catch (e) {
        return NaN;
      }
    };
  }

  GUIA.criarGrafico = function (container, item) {
    const variavel = /\bt\b/.test(item.f) && !/\bx\b/.test(item.f) ? "t" : "x";
    const F = seguro(GUIA.compilar(item.f));
    const curvas = [{ fn: F, cor: "--curva-f", rotulo: "f", traco: [] }];
    let tangente = null;

    if (typeof item.ponto === "number") {
      const m = seguro(GUIA.compilar(item.resp))(item.ponto);
      const p = item.ponto;
      const fp = F(p);
      tangente = { p, fp, m };
      curvas.push({ fn: (x) => fp + m * (x - p), cor: "--curva-d", rotulo: `reta tangente em ${variavel} = ${p} (inclinação ${fmt(m)})`, traco: [6, 4] });
    } else {
      if (item.ordem === 2 && item.resp1) {
        curvas.push({ fn: seguro(GUIA.compilar(item.resp1)), cor: "--ink-3", rotulo: "f′ (1ª derivada)", traco: [5, 4] });
      }
      curvas.push({ fn: seguro(GUIA.compilar(item.resp)), cor: "--curva-d", rotulo: item.ordem === 2 ? "f″ (2ª derivada)" : "f′ (derivada)", traco: [] });
    }

    // ----- janela inicial
    let x0 = -4, x1 = 4;
    if (tangente && (tangente.p < -3 || tangente.p > 3)) {
      x0 = tangente.p - 4;
      x1 = tangente.p + 4;
    } else {
      let neg = 0, negValidos = 0;
      for (let i = 1; i <= 40; i++) {
        neg++;
        if (Number.isFinite(F(-4 * i / 40))) negValidos++;
      }
      if (negValidos / neg < 0.1) { x0 = -0.6; x1 = 6; }
    }

    function faixaY(a, b) {
      const vals = [];
      for (const c of curvas) {
        for (let i = 0; i <= 300; i++) {
          const y = c.fn(a + (b - a) * i / 300);
          if (Number.isFinite(y)) vals.push(y);
        }
      }
      if (!vals.length) return [-5, 5];
      vals.sort((p, q) => p - q);
      let lo = vals[Math.floor(vals.length * 0.04)];
      let hi = vals[Math.ceil(vals.length * 0.96) - 1];
      if (lo > 0 && lo < (hi - lo) * 0.6) lo = 0;
      if (hi < 0 && -hi < (hi - lo) * 0.6) hi = 0;
      if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
      const pad = (hi - lo) * 0.12;
      return [lo - pad, hi + pad];
    }

    let [y0, y1] = faixaY(x0, x1);
    const inicial = { x0, x1, y0, y1 };

    // ----- DOM
    container.innerHTML = `
      <canvas role="img" aria-label="Gráfico de f e da derivada"></canvas>
      <div class="legenda">
        ${curvas.map((c) => `<span><i style="background:var(${c.cor})"></i>${c.rotulo}</span>`).join("")}
        <span class="leitura" aria-live="off"></span>
      </div>
      <div class="botoes" style="margin-top:8px">
        <button class="btn pequeno" data-z="0.6" aria-label="Aproximar">＋ zoom</button>
        <button class="btn pequeno" data-z="1.6" aria-label="Afastar">－ zoom</button>
        <button class="btn pequeno" data-z="0" aria-label="Voltar à visão inicial">⟲ resetar</button>
      </div>`;
    const canvas = container.querySelector("canvas");
    const leitura = container.querySelector(".leitura");
    const ctx = canvas.getContext("2d");
    let mouse = null;

    function desenhar() {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const X = (x) => ((x - x0) / (x1 - x0)) * W;
      const Y = (y) => H - ((y - y0) / (y1 - y0)) * H;
      const ink3 = css(canvas, "--ink-3");
      const linha = css(canvas, "--line");

      // grade + rótulos
      ctx.font = "11px " + css(document.body, "--fonte-mono");
      ctx.lineWidth = 1;
      const sx = passoBonito(x1 - x0, 8), sy = passoBonito(y1 - y0, 6);
      ctx.strokeStyle = linha;
      ctx.fillStyle = ink3;
      ctx.beginPath();
      for (let gx = Math.ceil(x0 / sx) * sx; gx <= x1; gx += sx) { ctx.moveTo(X(gx) + 0.5, 0); ctx.lineTo(X(gx) + 0.5, H); }
      for (let gy = Math.ceil(y0 / sy) * sy; gy <= y1; gy += sy) { ctx.moveTo(0, Y(gy) + 0.5); ctx.lineTo(W, Y(gy) + 0.5); }
      ctx.stroke();

      // eixos
      ctx.strokeStyle = ink3;
      ctx.beginPath();
      const ax = Math.min(Math.max(Y(0), 0), H), ay = Math.min(Math.max(X(0), 0), W);
      ctx.moveTo(0, ax + 0.5); ctx.lineTo(W, ax + 0.5);
      ctx.moveTo(ay + 0.5, 0); ctx.lineTo(ay + 0.5, H);
      ctx.stroke();
      ctx.textBaseline = "top";
      for (let gx = Math.ceil(x0 / sx) * sx; gx <= x1; gx += sx) {
        if (Math.abs(gx) < sx / 2) continue;
        ctx.fillText(fmt(gx), X(gx) + 3, Math.min(ax + 3, H - 14));
      }
      ctx.textBaseline = "bottom";
      for (let gy = Math.ceil(y0 / sy) * sy; gy <= y1; gy += sy) {
        if (Math.abs(gy) < sy / 2) continue;
        ctx.fillText(fmt(gy), Math.min(ay + 4, W - 40), Y(gy) - 2);
      }
      ctx.fillText(variavel, W - 12, ax - 2);

      // curvas
      const N = Math.max(400, Math.round(W * 1.5));
      const faixa = y1 - y0;
      for (const c of curvas) {
        ctx.strokeStyle = css(canvas, c.cor);
        ctx.lineWidth = c.cor === "--ink-3" ? 1.5 : 2.4;
        ctx.setLineDash(c.traco);
        ctx.beginPath();
        let caneta = false, yAnt = NaN;
        for (let i = 0; i <= N; i++) {
          const x = x0 + ((x1 - x0) * i) / N;
          const y = c.fn(x);
          const valido = Number.isFinite(y) && Math.abs(y - (y0 + y1) / 2) < faixa * 20;
          if (!valido || (caneta && Math.abs(y - yAnt) > faixa * 1.5)) {
            caneta = false;
            if (!valido) { yAnt = NaN; continue; }
          }
          if (caneta) ctx.lineTo(X(x), Y(y));
          else { ctx.moveTo(X(x), Y(y)); caneta = true; }
          yAnt = y;
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      if (tangente && Number.isFinite(tangente.fp)) {
        ctx.fillStyle = css(canvas, "--curva-d");
        ctx.beginPath();
        ctx.arc(X(tangente.p), Y(tangente.fp), 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // leitura no ponteiro
      if (mouse) {
        const x = x0 + (mouse / W) * (x1 - x0);
        ctx.strokeStyle = ink3;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(mouse + 0.5, 0); ctx.lineTo(mouse + 0.5, H); ctx.stroke();
        ctx.setLineDash([]);
        const partes = [`${variavel}=${fmt(x)}`];
        curvas.forEach((c, i) => {
          const y = c.fn(x);
          if (Number.isFinite(y)) {
            ctx.fillStyle = css(canvas, c.cor);
            ctx.beginPath(); ctx.arc(X(x), Y(y), 3.5, 0, Math.PI * 2); ctx.fill();
          }
          const nome = i === 0 ? "f" : tangente ? "reta" : c.rotulo.split(" ")[0];
          partes.push(`${nome}=${fmt(y)}`);
        });
        leitura.textContent = partes.join("  ");
      } else {
        leitura.textContent = "arraste para mover";
      }
    }

    // ----- interação
    let arrasto = null;
    canvas.addEventListener("pointerdown", (e) => {
      canvas.setPointerCapture(e.pointerId);
      arrasto = { x: e.clientX, y: e.clientY, x0, x1, y0, y1 };
    });
    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse = e.clientX - r.left;
      if (arrasto) {
        const dx = ((e.clientX - arrasto.x) / r.width) * (arrasto.x1 - arrasto.x0);
        const dy = ((e.clientY - arrasto.y) / r.height) * (arrasto.y1 - arrasto.y0);
        x0 = arrasto.x0 - dx; x1 = arrasto.x1 - dx;
        y0 = arrasto.y0 + dy; y1 = arrasto.y1 + dy;
      }
      desenhar();
    });
    const solta = () => { arrasto = null; };
    canvas.addEventListener("pointerup", solta);
    canvas.addEventListener("pointercancel", solta);
    canvas.addEventListener("pointerleave", () => { if (!arrasto) { mouse = null; desenhar(); } });
    container.querySelectorAll("[data-z]").forEach((b) =>
      b.addEventListener("click", () => {
        const z = +b.dataset.z;
        if (!z) ({ x0, x1, y0, y1 } = inicial);
        else {
          const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
          x0 = cx - ((cx - x0) * z); x1 = cx + ((x1 - cx) * z);
          y0 = cy - ((cy - y0) * z); y1 = cy + ((y1 - cy) * z);
        }
        desenhar();
      })
    );

    const ro = new ResizeObserver(() => desenhar());
    ro.observe(canvas);
    desenhar();
    return { redesenhar: desenhar, destruir: () => ro.disconnect() };
  };
})();
