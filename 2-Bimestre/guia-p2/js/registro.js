/*
 * Registro central do conteúdo + utilidades compartilhadas
 * (usado pelo site no navegador e pelo script tools/verificar.mjs no Node).
 */
(function (global) {
  "use strict";

  const GUIA = global.GUIA || (global.GUIA = { grupos: [], formulario: null });

  GUIA.registrar = function (grupo) {
    GUIA.grupos.push(grupo);
    GUIA.grupos.sort((a, b) => a.ordem - b.ordem);
  };

  GUIA.registrarFormulario = function (formulario) {
    GUIA.formulario = formulario;
  };

  GUIA.registrarSimulado = function (simulado) {
    GUIA.simulado = simulado;
  };

  /* Macros KaTeX para a notação brasileira (sen, tg, cotg, cosec). */
  GUIA.macros = {
    "\\sen": "\\operatorname{sen}",
    "\\tg": "\\operatorname{tg}",
    "\\cotg": "\\operatorname{cotg}",
    "\\cosec": "\\operatorname{cosec}",
    "\\arcsen": "\\operatorname{arcsen}",
    "\\arctg": "\\operatorname{arctg}",
  };

  /* Rótulos das regras (tags usadas em cada item). */
  GUIA.regras = {
    potencia: "Potência",
    raiz: "Raiz",
    constante: "Constante",
    soma: "Soma",
    produto: "Produto",
    quociente: "Quociente",
    cadeia: "Cadeia",
    exponencial: "Exponencial",
    logaritmo: "Logaritmo",
    trigonometrica: "Trigonométrica",
    "segunda-ordem": "2ª ordem",
    notacao: "Notações",
    "valor-no-ponto": "Valor no ponto",
  };

  /* Funções disponíveis nas expressões `f` / `resp` dos itens. */
  const M = {
    sin: Math.sin, sen: Math.sin,
    cos: Math.cos,
    tan: Math.tan, tg: Math.tan,
    sec: (x) => 1 / Math.cos(x),
    csc: (x) => 1 / Math.sin(x), cosec: (x) => 1 / Math.sin(x),
    cot: (x) => Math.cos(x) / Math.sin(x), cotg: (x) => Math.cos(x) / Math.sin(x),
    exp: Math.exp,
    ln: Math.log, log: Math.log,
    sqrt: Math.sqrt,
    cbrt: Math.cbrt,
    // raiz n-ésima real (aceita x negativo quando n é ímpar)
    root: (x, n) => (x < 0 && Math.abs(n % 2) === 1 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n)),
    abs: Math.abs,
    pow: Math.pow,
    PI: Math.PI, pi: Math.PI,
    w: 1.7, // constante usada em "sen(wt)"
  };
  const nomes = Object.keys(M).join(",");

  GUIA.compilar = function (expr) {
    const fn = new Function("x", "t", "z", "M", "const {" + nomes + "} = M; return (" + expr + ");");
    return (v) => fn(v, v, v, M);
  };
})(typeof window !== "undefined" ? window : globalThis);
