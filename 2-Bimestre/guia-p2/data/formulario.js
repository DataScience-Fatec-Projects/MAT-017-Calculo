/*
 * Formulário: só o que aparece nos Materiais 003, 004 e 005 (o que foi estudado no 2º bimestre).
 */
(() => {
  const R = String.raw;

  const linha = (f, d, nota = "") => R`<tr><td>$${f}$</td><td>$\Longrightarrow$</td><td>$${d}$</td><td>${nota}</td></tr>`;

  GUIA.registrarFormulario({
    secoes: [
      {
        id: "definicao",
        titulo: "Definição de derivada",
        fonte: "Material 003",
        html: R`
          <p>A derivada de $f$ em um número $a$ do domínio é</p>
          $$f'(a) = \lim_{x\to a}\dfrac{f(x)-f(a)}{x-a} \qquad\text{ou}\qquad f'(a) = \lim_{h\to 0}\dfrac{f(a+h)-f(a)}{h}$$
          <p>se o limite existir. Leituras da derivada: <b>geométrica</b> — coeficiente angular da reta tangente ao gráfico; <b>taxa de variação</b> — velocidade instantânea.</p>
          <p class="nota">Nos exercícios das tarefas não é preciso usar o limite: usamos a tabela e as regras abaixo.</p>`,
      },
      {
        id: "tabela",
        titulo: "Tabela de derivadas",
        fonte: "Material 003",
        html: R`
          <div class="tabela-wrap"><table class="tabela-deriv">
            <thead><tr><th>Função</th><th></th><th>Derivada</th><th></th></tr></thead>
            <tbody>
              ${linha(R`f(x) = a`, R`f'(x) = 0`, "a constante")}
              ${linha(R`f(x) = x^n`, R`f'(x) = n\,x^{n-1}`, "vale para n negativo e fracionário")}
              ${linha(R`f(x) = e^x`, R`f'(x) = e^x`)}
              ${linha(R`f(x) = \ln x`, R`f'(x) = \dfrac{1}{x}`)}
              ${linha(R`f(x) = \sen x`, R`f'(x) = \cos x`)}
              ${linha(R`f(x) = \cos x`, R`f'(x) = -\sen x`)}
              ${linha(R`f(x) = \tg x`, R`f'(x) = \sec^2 x`)}
              ${linha(R`f(x) = \cotg x`, R`f'(x) = -\cosec^2 x`)}
              ${linha(R`f(x) = \sec x`, R`f'(x) = \sec x\,\tg x`)}
              ${linha(R`f(x) = \cosec x`, R`f'(x) = -\cosec x\,\cotg x`)}
              ${linha(R`f(x) = \arcsen x`, R`f'(x) = \dfrac{1}{\sqrt{1-x^2}}`, R`$-1 < x < 1$ *`)}
              ${linha(R`f(x) = \arctg x`, R`f'(x) = \dfrac{1}{1+x^2}`)}
              ${linha(R`f(x) = a^x`, R`f'(x) = a^x \ln a`)}
            </tbody>
          </table></div>
          <p class="nota">* No material essa linha aparece como "arcsec x", mas a fórmula é a do <b>arco-seno</b>.</p>`,
      },
      {
        id: "regras",
        titulo: "Regras de derivação (Teorema 1)",
        fonte: "Material 003",
        html: R`
          <p>Se $f$ e $g$ são deriváveis em $x$ e $k$ é constante:</p>
          <div class="decisao">
            <div><b>i. Soma</b>$(f+g)'(x) = f'(x) + g'(x)$</div>
            <div><b>ii. Constante × função</b>$(kf)'(x) = k\,f'(x)$</div>
            <div><b>iii. Produto</b>$(f\cdot g)'(x) = f'(x)\,g(x) + f(x)\,g'(x)$</div>
            <div><b>iv. Quociente</b> ($g(x)\neq 0$)$$\left(\dfrac{f}{g}\right)'(x) = \dfrac{f'(x)\,g(x) - f(x)\,g'(x)}{[g(x)]^2}$$</div>
          </div>
          <p class="nota">Macete do quociente: "derivada de cima vezes a de baixo, <b>menos</b> a de cima vezes a derivada de baixo, sobre a de baixo ao quadrado".</p>`,
      },
      {
        id: "reescrita",
        titulo: "Reescritas que destravam a regra da potência",
        fonte: "Tarefas 006 e 007",
        html: R`
          <div class="decisao">
            <div><b>Fração → expoente negativo</b>$\dfrac{1}{x^n} = x^{-n}$ &nbsp; ex.: $\dfrac{1}{x^3} = x^{-3}$</div>
            <div><b>Raiz → expoente fracionário</b>$\sqrt[n]{x^m} = x^{m/n}$ &nbsp; ex.: $\sqrt{x} = x^{1/2}$</div>
            <div><b>Voltando ao formato do gabarito</b>$x^{-m/n} = \dfrac{1}{\sqrt[n]{x^m}}$ &nbsp; ex.: $x^{-4/5} = \dfrac{1}{\sqrt[5]{x^4}}$</div>
            <div><b>Expoente − 1</b>$\dfrac{1}{5} - 1 = -\dfrac{4}{5}$, &nbsp; $-3 - 1 = -4$</div>
          </div>`,
      },
      {
        id: "cadeia",
        titulo: "Regra da cadeia",
        fonte: "Material 004",
        html: R`
          <p>Se $g$ é derivável em $x$ e $f$ é derivável em $g(x)$, a composta $h(x) = f(g(x))$ é derivável e</p>
          $$h'(x) = f'(g(x))\cdot g'(x)$$
          <p>Em palavras: <b>derivada da de fora (com a de dentro intacta) × derivada da de dentro</b>. Com $u = g(x)$, a tabela vira:</p>
          <div class="tabela-wrap"><table class="tabela-deriv">
            <tbody>
              ${linha(R`u^n`, R`n\,u^{n-1}\cdot u'`)}
              ${linha(R`\sqrt{u}`, R`\dfrac{u'}{2\sqrt{u}}`)}
              ${linha(R`e^u`, R`e^u\cdot u'`)}
              ${linha(R`\ln u`, R`\dfrac{u'}{u}`)}
              ${linha(R`\sen u`, R`\cos u\cdot u'`)}
              ${linha(R`\cos u`, R`-\sen u\cdot u'`)}
              ${linha(R`\tg u`, R`\sec^2 u\cdot u'`)}
              ${linha(R`\sec u`, R`\sec u\,\tg u\cdot u'`)}
            </tbody>
          </table></div>
          <p class="nota">Exemplo do material: $h(x) = \sqrt{x^2+1}$ é $f(u) = \sqrt{u}$ com $u = x^2+1$.</p>`,
      },
      {
        id: "notacoes",
        titulo: "Notações e derivadas de ordem superior",
        fonte: "Material 005",
        html: R`
          <p>Em $y = f(x)$, $y$ é a <b>variável dependente</b> e $x$ a <b>independente</b>. Notação de Leibniz e outras:</p>
          $$\dfrac{dy}{dx} = \dfrac{df}{dx} = \dfrac{d}{dx}f(x) = f'(x) = y' = D_x f(x) \qquad\qquad \dfrac{dy}{dx}(2) = f'(2)$$
          <p>A derivada da derivada é a <b>segunda derivada</b>: $f'' = (f')'$. Em geral:</p>
          $$f' = \dfrac{df}{dx},\quad f'' = \dfrac{d^2f}{dx^2},\quad f''' = \dfrac{d^3f}{dx^3},\quad f^{(4)} = \dfrac{d^4f}{dx^4},\ \dots,\ f^{(n)} = \dfrac{d^nf}{dx^n}$$
          <p class="nota">Se a variável é $t$ (ex.: $y = \sen 5t$), troque $dx$ por $dt$: $\dfrac{dy}{dt}$, $\dfrac{d^2y}{dt^2}$.</p>`,
      },
      {
        id: "qual-regra",
        titulo: "Na prova: qual regra usar?",
        fonte: "resumo",
        html: R`
          <div class="decisao">
            <div><b>Tem + ou − separando termos?</b>Derive termo a termo (regra da soma). Constante multiplicando fica de fora.</div>
            <div><b>Tem raiz ou $x$ no denominador sozinho?</b>Reescreva como potência ($x^{1/n}$, $x^{-n}$) e use $nx^{n-1}$.</div>
            <div><b>Duas funções de $x$ multiplicadas?</b>Regra do produto: $f'g + fg'$.</div>
            <div><b>Divisão de duas funções de $x$?</b>Regra do quociente: $\dfrac{f'g - fg'}{g^2}$.</div>
            <div><b>Função dentro de função?</b>($\sen 4x$, $e^{x^2}$, $(\dots)^3$, $\sqrt{\dots}$, $\ln(\dots)$) → regra da cadeia.</div>
            <div><b>Pediu $f''$ ou $\dfrac{d^2y}{dx^2}$?</b>Derive, simplifique $y'$, e derive de novo.</div>
          </div>`,
      },
    ],
  });
})();
