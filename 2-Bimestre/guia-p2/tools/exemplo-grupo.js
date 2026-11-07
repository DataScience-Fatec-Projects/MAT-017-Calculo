/*
 * MODELO de arquivo de conteúdo (não é carregado pelo site).
 * Copie esta estrutura para data/<grupo>.js.
 * Regras de escrita:
 *  - todo texto usa R`...` (String.raw), então escreva LaTeX com UMA barra: R`$\dfrac{1}{x}$`
 *  - nunca escreva "${" nem crase dentro do texto
 *  - math inline: $...$   |  math em destaque: $$...$$
 *  - HTML simples permitido: <b>, <i>, <br>, <ul><li>
 *  - notação brasileira: \sen x, \cos x, \tg x, \cotg x, \sec x, \cosec x, \ln x
 */
(() => {
  const R = String.raw;
  GUIA.registrar({
    id: "exemplo",
    ordem: 99,
    tarefa: "Exemplo",
    material: "Material 003",
    titulo: R`Regra do quociente (Exemplo 6 do material)`,
    resumo: R`Quando a função é uma <b>divisão</b> de duas funções, use $\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$.`,
    exercicios: [
      {
        id: "exemplo6",
        numero: "Exemplo 6",
        enunciado: R`Calcule $f'(x)$ onde`,
        itens: [
          {
            id: "a",
            pergunta: R`$f(x) = \dfrac{2x+3}{x^2+1}$`,
            f: "(2*x+3)/(x**2+1)",
            resp: "(-2*x**2-6*x+2)/(x**2+1)**2",
            ordem: 1,
            gabarito: R`$f'(x) = \dfrac{-2x^2-6x+2}{(x^2+1)^2}$`,
            regras: ["quociente", "potencia"],
            intro: R`Claro! Aqui temos uma <b>divisão de duas funções</b>, então a ferramenta é a <b>regra do quociente</b>. Vamos por partes.`,
            passos: [
              {
                titulo: R`Separe numerador e denominador`,
                normal: R`Chame $u = 2x+3$ (em cima) e $v = x^2+1$ (embaixo).`,
                mais: R`Dar nome às partes evita confusão na hora de montar a fórmula: a regra do quociente usa as duas funções e as duas derivadas.`,
                detalhe: R`Antes de qualquer conta, escreva as peças separadas: $$u = 2x+3 \qquad v = x^2+1$$`,
              },
              {
                titulo: R`Derive cada parte`,
                normal: R`$u' = 2$ e $v' = 2x$.`,
                mais: R`Pela tabela: a derivada de $x^n$ é $nx^{n-1}$ e a derivada de uma constante é $0$.`,
                detalhe: R`$$u' = (2x)' + (3)' = 2\cdot 1 + 0 = 2$$ $$v' = (x^2)' + (1)' = 2x^{2-1} + 0 = 2x$$`,
              },
              {
                titulo: R`Monte a regra do quociente`,
                normal: R`$$f'(x) = \dfrac{u'v - uv'}{v^2} = \dfrac{2(x^2+1) - (2x+3)\cdot 2x}{(x^2+1)^2}$$`,
                mais: R`A ordem importa: <b>derivada de cima × de baixo MENOS de cima × derivada de baixo</b>, tudo sobre o de baixo ao quadrado.`,
                detalhe: R`Substituindo peça por peça: $u'v = 2\cdot(x^2+1)$ e $uv' = (2x+3)\cdot 2x$. O denominador é $v^2 = (x^2+1)^2$.`,
              },
              {
                titulo: R`Simplifique o numerador`,
                normal: R`$$2x^2 + 2 - 4x^2 - 6x = -2x^2 - 6x + 2$$`,
                mais: R`O denominador normalmente fica como $(x^2+1)^2$, sem expandir — é assim que o gabarito costuma aparecer.`,
                detalhe: R`$2(x^2+1) = 2x^2+2$ e $(2x+3)\cdot 2x = 4x^2+6x$. Então $$2x^2 + 2 - (4x^2 + 6x) = 2x^2 - 4x^2 - 6x + 2 = -2x^2 - 6x + 2$$ O sinal de menos vale para <b>os dois</b> termos do parêntese.`,
              },
            ],
            cuidado: R`Inverter a ordem do numerador ($uv' - u'v$) troca o sinal da resposta inteira.`,
            conferir: R`Teste em $x = 0$: pela resposta, $f'(0) = \dfrac{0 - 0 + 2}{(0+1)^2} = 2$. Pela fórmula montada no passo 3: $\dfrac{2\cdot 1 - 3\cdot 0}{1} = 2$. Bateu!`,
          },
        ],
      },
    ],
  });
})();
