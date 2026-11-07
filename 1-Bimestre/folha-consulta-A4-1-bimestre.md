# Folha de Consulta — 1º Bimestre (MAT-017 Cálculo)

Resumo do **Material 001 (Números Reais)** e do **Material 002 (Funções de uma variável real)** para copiar **à mão numa folha A4**.

**Como usar esta página:**

- Itens marcados com ★ são o núcleo: copie primeiro. O resto entra se sobrar espaço.
- Sugestão de layout: **frente** = seções 1 a 7 (Material 001), em duas colunas; **verso** = seções 8 a 12 (Material 002 + exemplos resolvidos).
- Se a prova permitir só um lado, corte as seções 1, 11 e 12 e mantenha as tabelas de resultados prontos (7 e 10).

---

## 1. Conjuntos numéricos e intervalos

$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$

| Notação | Significado |
|---|---|
| $(a, b)$ ou $]a, b[$ | $a < x < b$ (abertos) |
| $[a, b]$ | $a \le x \le b$ (fechados) |
| $[a, b)$ | $a \le x < b$ |
| $(-\infty, b]$ | $x \le b$ |
| $\{x \in \mathbb{R} \mid \dots\}$ | forma de conjunto (usada nas respostas de domínio) |
| $\mathbb{R}^* = \mathbb{R} \setminus \{0\}$ | reais sem o zero |

Infinito ($\pm\infty$) sempre com parêntese/aberto. "ou" = união ($\cup$); "e" = interseção ($\cap$).

---

## 2. ★ Inequações de 1º grau

Propriedades de ordem em $\mathbb{R}$:

- Somar ou subtrair o mesmo número dos dois lados: **mantém** o sinal.
- Multiplicar ou dividir por número **positivo**: mantém.
- Multiplicar ou dividir por número **negativo**: **INVERTE** ($<$ vira $>$, $\le$ vira $\ge$).

Exemplo 1 do material: $5x + 3 < 2x + 7 \Rightarrow 3x < 4 \Rightarrow x < \tfrac{4}{3}$.

Se o coeficiente de $x$ ficar negativo: $1 - 3x > 0 \Rightarrow -3x > -1 \Rightarrow x < \tfrac{1}{3}$ (dividiu por $-3$, inverteu).

---

## 3. ★ Estudo de sinal

**Expressão afim $ax + b$:** raiz $x_0 = -\dfrac{b}{a}$. À **direita** da raiz a expressão tem o **sinal de $a$**; à esquerda, o contrário. Na raiz, vale zero.

- $a > 0$ (ex.: $3x - 1$): $-$ antes de $x_0$, $+$ depois.
- $a < 0$ (ex.: $3 - x$, $2 - 3x$): $+$ antes de $x_0$, $-$ depois.

**Produto ou quociente de fatores:** monte o **quadro de sinais**.

1. Ache a raiz de cada fator e marque-as em ordem crescente na reta.
2. Uma linha por fator, com o sinal em cada intervalo (use a regra do sinal de $a$).
3. Última linha: multiplique os sinais coluna a coluna ($\frac{-}{-} = +$, $\frac{+}{-} = -$).
4. Raiz do **numerador** → a expressão vale **0**. Raiz do **denominador** → **não está definida** (∄).

Exemplo 3 do material, $\dfrac{x+3}{x-2}$ (raízes $-3$ e $2$):

| | $x < -3$ | $-3$ | $-3 < x < 2$ | $2$ | $x > 2$ |
|---|---|---|---|---|---|
| $x + 3$ | $-$ | $0$ | $+$ | $+$ | $+$ |
| $x - 2$ | $-$ | $-$ | $-$ | $0$ | $+$ |
| quociente | $+$ | $0$ | $-$ | ∄ | $+$ |

Resposta no formato do material: "$> 0$ para $x < -3$ ou $x > 2$; $< 0$ para $-3 < x < 2$; $= 0$ para $x = -3$; não está definida para $x = 2$".

**Fatores sempre positivos:** $x^2 + k$ com $k > 0$ (ex.: $x^2 + 1$, $x^2 + 3$) nunca zera e é sempre $+$: não muda o sinal do produto. Ex.: sinal de $x(x^2+3)$ = sinal de $x$.

---

## 4. ★ Inequações produto e quociente

**Nunca multiplique em cruz** por uma expressão com $x$ (não se sabe o sinal dela).

Passo a passo:

1. Passe tudo para o lado esquerdo, deixando **0** do lado direito.
2. Se houver frações, reduza ao **mesmo denominador** (não cancele o denominador!).
3. Fatore numerador e denominador em fatores de 1º grau (e $x^2 + k$).
4. Quadro de sinais; escolha os intervalos que satisfazem $>$, $<$, $\ge$ ou $\le$.
5. Com $\ge$ ou $\le$: **inclua** as raízes do numerador (bola fechada), **exclua** sempre as do denominador (bola aberta).

Exemplo 5 do material: $\dfrac{3x-1}{x+2} \ge 5 \Rightarrow \dfrac{3x-1}{x+2} - 5 \ge 0 \Rightarrow \dfrac{3x - 1 - 5x - 10}{x+2} \ge 0 \Rightarrow \dfrac{-2x - 11}{x+2} \ge 0$.

Raízes: $-\tfrac{11}{2}$ (numerador, entra) e $-2$ (denominador, não entra). Quadro: $+$ só em $-\tfrac{11}{2} \le x < -2$. **Solução:** $-\tfrac{11}{2} \le x < -2$.

Exemplo 4 do material: $\dfrac{2x+1}{x-4} < 0$: raízes $-\tfrac12$ e $4$; quociente negativo entre elas. **Solução:** $-\tfrac12 < x < 4$.

---

## 5. ★ Polinômio de 2º grau $ax^2 + bx + c$

- $\Delta = b^2 - 4ac$; raízes $x = \dfrac{-b \pm \sqrt{\Delta}}{2a}$.
- Soma e produto: $x_1 + x_2 = -\dfrac{b}{a}$, $\; x_1 x_2 = \dfrac{c}{a}$ (rápido quando $a = 1$: "dois números que somam $-b$ e multiplicam $c$").
- Sem termo $c$: fator comum $\;ax^2 + bx = x(ax + b)$. Sem termo $b$: diferença de quadrados $\;x^2 - k^2 = (x-k)(x+k)$.

**Fatoração pelas raízes:** $ax^2 + bx + c = a\,(x - x_1)(x - x_2)$. Não esqueça o $a$! Ex.: $2x^2 - 3x + 1$: raízes $1$ e $\tfrac12$ → $2(x-1)(x-\tfrac12) = (x-1)(2x-1)$.

**Sinal do trinômio (para inequações de 2º grau):**

| $\Delta$ | Sinal |
|---|---|
| $\Delta > 0$ (duas raízes) | **Fora** das raízes: sinal de $a$. **Entre** as raízes: sinal contrário a $a$. Zero nas raízes. |
| $\Delta = 0$ (raiz dupla, $a(x-x_1)^2$) | Sinal de $a$ em todo $x \ne x_1$; zero em $x_1$. |
| $\Delta < 0$ (sem raiz real) | Sempre o sinal de $a$; nunca zera. |

Consequências (Ex. 7 do material): $x^2 - 4x + 4 > 0 \Rightarrow (x-2)^2 > 0 \Rightarrow x \ne 2$. $\;4x^2 - 4x + 1 < 0 \Rightarrow (2x-1)^2 < 0$: **não admite solução**. $\;4x^2 - 4x + 1 \le 0 \Rightarrow x = \tfrac12$.

Regra prática com $a > 0$: "$< 0$ entre as raízes; $> 0$ fora". Ex.: $x^2 - 3x + 2 < 0 \Rightarrow (x-1)(x-2) < 0 \Rightarrow 1 < x < 2$.

---

## 6. Fatorações e produtos notáveis

- $(a \pm b)^2 = a^2 \pm 2ab + b^2$
- $(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$; $\;(a - b)^3 = a^3 - 3a^2 b + 3ab^2 - b^3$
- $a^2 - b^2 = (a - b)(a + b)$
- $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$; $\;a^3 + b^3 = (a + b)(a^2 - ab + b^2)$
- $x^4 - p^4 = (x - p)(x^3 + px^2 + p^2 x + p^3)$
- Geral (Ex. 4 do material): $x^n - a^n = (x - a)(x^{n-1} + a x^{n-2} + a^2 x^{n-3} + \dots + a^{n-2} x + a^{n-1})$
- Frações: $\dfrac{1}{x} - \dfrac{1}{p} = \dfrac{p - x}{xp} = -\dfrac{x - p}{xp}$; $\;\dfrac{1}{x^2} - \dfrac{1}{p^2} = \dfrac{p^2 - x^2}{x^2 p^2} = -\dfrac{(x-p)(x+p)}{x^2 p^2}$
- Atenção: $p - x = -(x - p)$ (é assim que aparece o sinal negativo nas respostas).

---

## 7. ★ Simplificação de quocientes (Ex. 5 do Material 001)

Receita: (1) fatorar o numerador ou reduzir ao mesmo denominador; (2) o fator $(x - p)$ ou $h$ **tem** de aparecer no numerador; (3) cancelar; (4) simplificar o que sobrou.

Exemplo: $\dfrac{x^3 - 8}{x^2 - 4} = \dfrac{(x-2)(x^2 + 2x + 4)}{(x-2)(x+2)} = \dfrac{x^2 + 2x + 4}{x + 2}$.

Exemplo: $\dfrac{\frac{1}{x+h} - \frac{1}{x}}{h} = \dfrac{\frac{x - (x+h)}{x(x+h)}}{h} = \dfrac{-h}{h\,x(x+h)} = -\dfrac{1}{x(x+h)}$.

**Resultados prontos:**

| Expressão | Simplificada |
|---|---|
| $\dfrac{x^2 - p^2}{x - p}$ | $x + p$ |
| $\dfrac{x^3 - p^3}{x - p}$ | $x^2 + px + p^2$ |
| $\dfrac{x^4 - p^4}{x - p}$ | $x^3 + px^2 + p^2 x + p^3$ |
| $\dfrac{\frac1x - \frac1p}{x - p}$ | $-\dfrac{1}{xp}$ |
| $\dfrac{\frac{1}{x^2} - \frac{1}{p^2}}{x - p}$ | $-\dfrac{x + p}{x^2 p^2}$ |
| $\dfrac{(x+h)^2 - x^2}{h}$ | $2x + h$ |
| $\dfrac{(x+h)^3 - x^3}{h}$ | $3x^2 + 3xh + h^2$ |
| $\dfrac{\frac{1}{x+h} - \frac1x}{h}$ | $-\dfrac{1}{x(x+h)}$ |
| $\dfrac{\frac{1}{(x+h)^2} - \frac{1}{x^2}}{h}$ | $-\dfrac{2x + h}{x^2 (x+h)^2}$ |
| $\dfrac{(x+h)^2 - (x-h)^2}{h}$ | $4x$ |

---

## 8. Funções (Material 002)

- Função $f: A \to B$, com $A, B \subset \mathbb{R}$: a cada $x \in A$ associa **um único** $f(x) \in B$.
- **Domínio** $D_f = A$ (valores de $x$ permitidos). **Imagem** $\mathrm{Im}_f = \{f(x) \mid x \in A\}$ (valores de $y$ atingidos).
- **Gráfico** $G_f = \{(x, f(x)) \mid x \in A\}$: no gráfico, $f(a)$ é a altura $y$ no ponto $x = a$; domínio = projeção no eixo $x$; imagem = projeção no eixo $y$.
- **Calcular $f(\text{algo})$:** troque **todo** $x$ por (algo), **entre parênteses**, depois desenvolva.

Exemplo 3 do material, $f(x) = -x^2 + 2x + 1$: $f(-1) = -1 - 2 + 1 = -2$; $\;f(a+2) = -(a+2)^2 + 2(a+2) + 1 = -a^2 - 2a + 1$; $\;f(p) = -p^2 + 2p + 1$; $\;f(\tfrac13) = -\tfrac19 + \tfrac23 + 1 = \tfrac{14}{9}$.

**Gráficos básicos (Exemplo 2):**

| Função | Gráfico | Domínio | Imagem |
|---|---|---|---|
| $f(x) = 2x - 1$ | reta (corta $y$ em $-1$, $x$ em $\tfrac12$) | $\mathbb{R}$ | $\mathbb{R}$ |
| $g(x) = x^2$ | parábola, vértice $(0,0)$, abre para cima | $\mathbb{R}$ | $[0, \infty)$ |
| $h(x) = \sqrt{x}$ | meia parábola deitada, começa em $(0,0)$ | $[0, \infty)$ | $[0, \infty)$ |
| $l(x) = \dfrac1x$ | hipérbole, ramos no 1º e 3º quadrantes | $\mathbb{R}^*$ | $\mathbb{R}^*$ |

---

## 9. ★ Domínio de uma função (condições de existência)

| Tipo | Condição |
|---|---|
| Polinômio | $D = \mathbb{R}$ |
| Fração $\dfrac{\dots}{g(x)}$ | $g(x) \ne 0$ |
| Raiz de índice **par** $\sqrt[2n]{g(x)}$ | $g(x) \ge 0$ |
| Raiz par no **denominador** $\dfrac{1}{\sqrt{g(x)}}$ | $g(x) > 0$ |
| Raiz de índice **ímpar** | qualquer real ($D = \mathbb{R}$ se $g$ polinômio) |
| Denominador que nunca zera ($x^2 + 1$) | $D = \mathbb{R}$ |

Várias condições ao mesmo tempo → **interseção** ("e"). Radicando fracionário → quadro de sinais (seção 3).

Exemplo 5 do material: $\sqrt{x+2}$: $x \ge -2$; $\;\dfrac{1}{x^2 - x} = \dfrac{1}{x(x-1)}$: $x \ne 0$ e $x \ne 1$; $\;\dfrac{1}{\sqrt{x+2}}$: $x > -2$.

Ex. 4g do material: $\sqrt{\dfrac{x-1}{x+1}}$: exige $\dfrac{x-1}{x+1} \ge 0$ e $x \ne -1$ → quadro → $D = \{x \in \mathbb{R} \mid x < -1 \text{ ou } x \ge 1\}$.

Escreva a resposta como $\{x \in \mathbb{R} \mid \dots\}$.

---

## 10. ★ Quociente de diferença (taxa de variação média)

Duas formas equivalentes (Exemplo 4 e Exercícios 2 e 3 do Material 002):

$$\frac{f(x) - f(p)}{x - p} \; (x \ne p) \qquad\qquad \frac{f(a+h) - f(a)}{h} \; (h \ne 0)$$

Significado: coeficiente angular da reta **secante** ao gráfico entre dois pontos; **variação média** de $f$. Quando $h \to 0$ (ou $x \to p$) vira a **derivada** $f'(p)$ (próximo tema).

Receita: (1) calcule $f(p)$ ou $f(a+h)$ trocando $x$ com parênteses; (2) subtraia e agrupe; (3) fatore para aparecer $(x-p)$ ou $h$; (4) cancele.

Exemplo 4 do material, $f(x) = 2x^2 - 5x + 1$:
$f(a+h) = 2(a+h)^2 - 5(a+h) + 1 = 2a^2 + 4ah + 2h^2 - 5a - 5h + 1$; subtraindo $f(a)$ sobra $4ah + 2h^2 - 5h$; dividindo por $h$: $\;4a + 2h - 5$.

**Resultados prontos:**

| $f(x)$ | $\dfrac{f(x) - f(p)}{x - p}$ | $\dfrac{f(x+h) - f(x)}{h}$ |
|---|---|---|
| $c$ (constante) | $0$ | $0$ |
| $mx + b$ | $m$ | $m$ |
| $x^2$ | $x + p$ | $2x + h$ |
| $x^3$ | $x^2 + px + p^2$ | $3x^2 + 3xh + h^2$ |
| $\dfrac1x$ | $-\dfrac{1}{xp}$ | $-\dfrac{1}{x(x+h)}$ |
| $\dfrac{1}{x^2}$ | $-\dfrac{x+p}{x^2 p^2}$ | $-\dfrac{2x+h}{x^2(x+h)^2}$ |
| $\dfrac{1}{x+2}$ | — | $-\dfrac{1}{(x+2)(x+2+h)}$ |

Para $f$ soma de termos (ex.: $x^2 - 3x$, $x^3 + 2x$), o quociente é a **soma** dos quocientes de cada termo (ex.: $x^2 - 3x$ com $p = -2$: $(x + p) - 3 = x - 2 - 3 = x - 5$).

---

## 11. Exemplos resolvidos do professor (compactos)

- **M001 Ex.1:** $5x + 3 < 2x + 7 \Rightarrow x < \tfrac43$.
- **M001 Ex.2:** $x - 3$: $> 0$ se $x > 3$; $< 0$ se $x < 3$; $= 0$ se $x = 3$.
- **M001 Ex.3:** $\dfrac{x+3}{x-2}$: $+$ para $x < -3$ ou $x > 2$; $-$ para $-3 < x < 2$; $0$ em $x = -3$; ∄ em $x = 2$.
- **M001 Ex.4:** $\dfrac{2x+1}{x-4} < 0 \Rightarrow -\tfrac12 < x < 4$.
- **M001 Ex.5:** $\dfrac{3x-1}{x+2} \ge 5 \Rightarrow \dfrac{-2x-11}{x+2} \ge 0 \Rightarrow -\tfrac{11}{2} \le x < -2$.
- **M002 Ex.3:** $f(x) = -x^2 + 2x + 1$: $f(-1) = -2$; $f(a+2) = -a^2 - 2a + 1$; $f(p) = -p^2 + 2p + 1$; $f(\tfrac13) = \tfrac{14}{9}$.
- **M002 Ex.4:** $f(x) = 2x^2 - 5x + 1 \Rightarrow \dfrac{f(a+h) - f(a)}{h} = 4a + 2h - 5$.
- **M002 Ex.5:** $D(\sqrt{x+2}) = [-2, \infty)$; $\;D\!\left(\dfrac{1}{x^2-x}\right) = \mathbb{R} \setminus \{0, 1\}$; $\;D\!\left(\dfrac{1}{\sqrt{x+2}}\right) = (-2, \infty)$.

---

## 12. Erros que custam ponto

1. Multiplicar em cruz uma inequação com $x$ no denominador.
2. Esquecer de **inverter** o sinal ao dividir por negativo.
3. Incluir a raiz do **denominador** na solução (nunca entra) ou esquecer a do numerador quando é $\ge$/$\le$.
4. $(a + b)^2 = a^2 + b^2$ (**errado**; falta $2ab$). Idem $(a+h)^3$: tem $3a^2h + 3ah^2$.
5. Substituir $x$ por $a + h$ sem parênteses: $-x^2$ vira $-(a+h)^2$, não $-a^2 + h^2$.
6. Esquecer o coeficiente $a$ na fatoração $a(x - x_1)(x - x_2)$.
7. Em $\Delta < 0$ com "$< 0$" e $a > 0$: **não admite solução** (não é "todo $\mathbb{R}$").
8. Confundir "ou" (união) com "e" (interseção) na resposta.
