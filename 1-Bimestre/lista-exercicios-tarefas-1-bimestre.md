# Lista de Exercícios — 1º Bimestre (MAT-017 Cálculo)

Lista montada a partir de `Material-Professor/tarefas_1_Bimestre.txt`, com os **mesmos exercícios** dos materiais do professor:

- **Material 001 — Números Reais** (`Material 001 CALC 2S2020.pdf`)
- **Material 002 — Funções de uma Variável Real a Valores Reais** (`Material 002 CALC CD 2S2024.pdf`)

Para cada tarefa está indicado **o que ela representa no material** (conceito treinado, exemplo do professor que serve de modelo e onde isso reaparece no curso). O gabarito do professor está no fim, para conferir só depois de resolver.

> **Observação sobre o arquivo de tarefas:** a linha "Tarefa 005" aparece duplicada e não há "Tarefa 004". A Tarefa 005 não indica o material, mas só o Material 002 tem um Exercício 4 com itens de a) a h), então ela se refere ao **Material 002**.
>
> **Letras:** os materiais pulam a letra **k** (a, b, ..., j, l, m, ...). A numeração original foi mantida.

---

## Mapa geral: tarefa → exercício → conteúdo

| Tarefa | Material | Exercício (itens) | Conceito do material | Modelo no material | Onde reaparece no curso |
|---|---|---|---|---|---|
| 001 | 001 | Ex. 1 (a–f) | Inequações de 1º grau em ℝ | Exemplo 1 | Domínio de funções; condições de existência |
| 001 | 001 | Ex. 2 (a–h) | Estudo de sinal (afim, produto, quociente) | Exemplos 2 e 3 | Sinal de f′ → crescimento/decrescimento, máximos e mínimos |
| 002 | 001 | Ex. 3 (a–g) | Inequações produto e quociente (quadro de sinais) | Exemplos 4 e 5 | Domínio com raiz de fração; sinal da derivada |
| 002 | 001 | Ex. 6 (a–e) | Fatoração do 2º grau pelas raízes | — (Bhaskara / soma e produto) | Simplificar quocientes; achar zeros de f e f′ |
| 002 | 001 | Ex. 7 (a–e) | Inequações de 2º grau | Ex. 6 + quadro de sinais | Sinal de f″ (concavidade); domínio |
| 003 | 001 | Ex. 5 (a–o) | Simplificação de expressões racionais; quocientes com (x−p) e h | Ex. 4 (identidades xⁿ−aⁿ) | **É a conta da definição de derivada** (limite do quociente de diferença) |
| 005 | 002 | Ex. 2 (a–h) | Quociente de diferença [f(x)−f(p)]/(x−p) | Exemplo 4 | Taxa de variação média → derivada f′(p) |
| 005 | 002 | Ex. 4 (a–h) | Domínio de funções (fração, raiz par, raiz de fração) | Exemplos 2 e 5 | Continuidade; onde f e f′ existem |

---

## Tarefa 001 — Material 001 — Inequações de 1º grau e estudo de sinal

**O que representa no material:** é a parte "Números Reais": ordem em ℝ, resolução de inequações simples e a ferramenta central de todo o bimestre, o **estudo de sinal** de uma expressão (onde ela é positiva, negativa, zero ou não está definida). Os **Exemplos 1, 2 e 3** do Material 001 são o modelo direto:

- Exemplo 1: resolva $5x + 3 < 2x + 7$ → inequação de 1º grau.
- Exemplo 2: estude o sinal de $x - 3$ → sinal de uma expressão afim.
- Exemplo 3: estude o sinal de $\dfrac{x+3}{x-2}$ → sinal de um quociente (quadro de sinais, ponto onde não está definida).

### Exercício 1 — Resolva a inequação (itens a–f)

**Treina:** isolar $x$ usando as propriedades de ordem (somar/subtrair mantém o sinal; multiplicar ou dividir por número **negativo inverte** o sinal); escrever a solução como intervalo ou conjunto.

- a) $3x + 3 < x + 6$
- b) $x - 3 > 3x + 1$
- c) $2x - 1 \ge 5x + 3$
- d) $x + 3 \le 6x - 2$
- e) $1 - 3x > 0$
- f) $2x + 1 \ge 3x$

### Exercício 2 — Estude o sinal da expressão (itens a–h)

**Treina:** para expressão afim $ax+b$: achar a raiz e usar o sinal de $a$; para produto e quociente: montar o **quadro de sinais** com a raiz de cada fator e multiplicar os sinais; indicar onde a expressão é **zero** (raiz do numerador) e onde **não está definida** (raiz do denominador).

**Formato de resposta do material:** "$E(x) > 0$ para ...; $E(x) < 0$ para ...; $E(x) = 0$ para ...; a expressão não está definida para ...".

- a) $3x - 1$
- b) $3 - x$
- c) $2 - 3x$
- d) $5x + 1$
- e) $\dfrac{x-1}{x-2}$
- f) $(2x+1)(x-2)$
- g) $\dfrac{2-3x}{x+2}$
- h) $\dfrac{2-x}{3-x}$

---

## Tarefa 002 — Material 001 — Inequações produto/quociente, fatoração e inequações de 2º grau

**O que representa no material:** junta o estudo de sinal (Tarefa 001) com álgebra do 2º grau. Os **Exemplos 4 e 5** do Material 001 são o modelo das inequações com $x$ no denominador:

- Exemplo 4: $\dfrac{2x+1}{x-4} < 0$ → inequação quociente já com zero de um lado: quadro de sinais direto.
- Exemplo 5: $\dfrac{3x-1}{x+2} \ge 5$ → **não** se multiplica em cruz; passa o 5 para a esquerda, reduz ao mesmo denominador e só então faz o quadro de sinais.

### Exercício 3 — Resolva a inequação (itens a–g)

**Treina:** inequações-produto e inequações-quociente pelo quadro de sinais. Atenção aos casos com $\ge$ e $\le$: a raiz do **numerador** entra na solução (bola fechada), a raiz do **denominador** nunca entra (bola aberta).

- a) $\dfrac{2x-1}{x+1} < 0$
- b) $\dfrac{1-x}{3-x} \ge 0$
- c) $\dfrac{x-2}{3x+1} > 0$
- d) $(2x-1)(x+3) < 0$
- e) $\dfrac{3x-2}{2-x} \le 0$
- f) $x(2x-1) \ge 0$
- g) $(x-2)(x+2) > 0$

### Exercício 6 — Fatore o polinômio de 2º grau dado, por meio de suas raízes (itens a–e)

**Treina:** achar as raízes (Bhaskara, soma e produto ou fator comum) e escrever $ax^2+bx+c = a(x-x_1)(x-x_2)$; reconhecer raiz dupla (trinômio quadrado perfeito) e o caso $c = 0$ (fator comum $x$). É o passo que transforma um trinômio em produto, para poder usar o quadro de sinais no Exercício 7 e cancelar fatores no Exercício 5.

- a) $x^2 - 3x + 2$
- b) $x^2 - x - 2$
- c) $x^2 - 2x + 1$
- d) $x^2 - 6x + 9$
- e) $2x^2 - 3x$

### Exercício 7 — Resolva a inequação (itens a–e)

**Treina:** inequações de 2º grau. Dois caminhos equivalentes: (1) fatorar (Ex. 6) e fazer o quadro de sinais (Ex. 3); (2) usar a parábola: com $a > 0$ e duas raízes, o trinômio é negativo **entre** as raízes e positivo **fora** delas.

- a) $x^2 - 3x + 2 < 0$
- b) $x^2 - 5x + 6 \ge 0$
- c) $x^2 - 3x > 0$
- d) $x^2 - 9 < 0$
- e) $x^2 - x - 2 \ge 0$

---

## Tarefa 003 — Material 001 — Simplificação de expressões (Exercício 5 completo)

**O que representa no material:** o Exercício 5 é a ponte entre álgebra e Cálculo. Cada item é um quociente que dá "0/0" se substituirmos direto (por exemplo, $x = 1$ em $\frac{x^2-1}{x-1}$, ou $h = 0$ nos itens l–o). A tarefa é **fatorar e cancelar** o fator problemático usando as identidades do **Exercício 4** ($x^n - a^n = (x-a)(\dots)$) e a redução ao mesmo denominador. Os itens **l), m), n), o)** são exatamente $\dfrac{f(x+h)-f(x)}{h}$ para $f(x) = x^2$, $f(x) = 1/x$ e $f(x) = x^3$: é a conta que define a **derivada** no próximo tema.

### Exercício 5 — Simplifique (itens a–o)

**Treina:** diferença de quadrados e de cubos; $x^4 - p^4 = (x-p)(x^3 + px^2 + p^2x + p^3)$; somar frações com $\frac{1}{x}$ e $\frac{1}{x^2}$; expandir $(x+h)^2$ e $(x+h)^3$; cancelar $(x-p)$ ou $h$.

- a) $\dfrac{x^2-1}{x-1}$
- b) $\dfrac{x^3-8}{x^2-4}$
- c) $\dfrac{4x^2-9}{2x-3}$
- d) $\dfrac{\frac{1}{x}-1}{x-1}$
- e) $\dfrac{\frac{1}{x^2}-1}{x-1}$
- f) $\dfrac{\frac{1}{x^2}-\frac{1}{9}}{x-3}$
- g) $\dfrac{\frac{1}{x}-\frac{1}{5}}{x-5}$
- h) $\dfrac{\frac{1}{x}-\frac{1}{p}}{x-p}$
- i) $\dfrac{\frac{1}{x^2}-\frac{1}{p^2}}{x-p}$
- j) $\dfrac{x^4-p^4}{x-p}$
- l) $\dfrac{(x+h)^2-x^2}{h}$
- m) $\dfrac{\frac{1}{x+h}-\frac{1}{x}}{h}$
- n) $\dfrac{(x+h)^3-x^3}{h}$
- o) $\dfrac{(x+h)^2-(x-h)^2}{h}$

---

## Tarefa 005 — Material 002 — Quociente de diferença e domínio de funções

**O que representa no material:** o Material 002 define função $f: A \to B$, gráfico $G_f = \{(x, f(x)) \mid x \in A\}$, domínio e imagem. Os exercícios pedidos treinam as duas habilidades centrais:

- **Exemplo 4** (modelo do Ex. 2): para $f(x) = 2x^2 - 5x + 1$, calcular $\dfrac{f(a+h)-f(a)}{h}$; o material chama isso de **quociente da diferença**. É a taxa de variação média de $f$, o coeficiente angular da reta secante; a derivada será o seu limite.
- **Exemplos 2 e 5** (modelo do Ex. 4): esboçar gráficos básicos ($2x-1$, $x^2$, $\sqrt{x}$, $1/x$) e determinar o domínio de $\sqrt{x+2}$, $\dfrac{1}{x^2-x}$ e $\dfrac{1}{\sqrt{x+2}}$.

### Exercício 2 — Simplifique $\dfrac{f(x)-f(p)}{x-p}$ ($x \ne p$), sendo dados (itens a–h)

**Treina:** calcular $f(p)$ substituindo; montar o quociente; fatorar o numerador ($x^2 - p^2$, $x^3 - p^3$, ...) e cancelar $(x-p)$. Note que para $f$ afim o resultado é constante (o coeficiente angular) e para $f$ constante o resultado é 0.

- a) $f(x) = x^2$ e $p = 1$
- b) $f(x) = x^2$ e $p = -1$
- c) $f(x) = x^2$ e $p$ qualquer
- d) $f(x) = 2x + 1$ e $p = 2$
- e) $f(x) = 2x + 1$ e $p = -1$
- f) $f(x) = 5$ e $p = 2$
- g) $f(x) = x^3$ e $p = 2$
- h) $f(x) = x^3$ e $p = -2$

### Exercício 4 — Determine o domínio (itens a–h)

**Treina:** condições de existência em ℝ: denominador $\ne 0$; radicando de raiz de índice **par** $\ge 0$; raiz par no denominador → radicando $> 0$. Os itens g) e h) exigem o **quadro de sinais** do Material 001 para o radicando fracionário. Resposta no formato $\{x \in \mathbb{R} \mid \dots\}$.

- a) $f(x) = \dfrac{1}{x-1}$
- b) $y = \dfrac{x}{x^2-1}$
- c) $g(x) = \dfrac{2x}{x^2+1}$
- d) $y = \dfrac{x}{x+2}$
- e) $h(x) = \sqrt{x+2}$
- f) $g(x) = \dfrac{x+1}{x^2+x}$
- g) $y = \sqrt{\dfrac{x-1}{x+1}}$
- h) $y = \sqrt[4]{\dfrac{x}{x+3}}$

---

## Extras (mesmo conteúdo, não pedidos nas tarefas)

Itens dos mesmos exercícios que ficaram fora das tarefas. Servem como prova simulada: são do mesmo tipo e têm gabarito do professor.

**Material 001**

- Ex. 2 (estudo de sinal): i) $(2x-1)(3-2x)$; j) $x(x-3)$; l) $x(x^2+3)$; m) $(2x-1)(x^2+1)$
- Ex. 3 (inequações): h) $\dfrac{2x-1}{x-3} > 5$; i) $\dfrac{x}{2x-3} \le 3$; j) $\dfrac{x-1}{2-x} < 1$; l) $x(2x-1)(x+1) > 0$; m) $(2x-1)(x-3) > 0$; n) $(2x-3)(x^2+1) < 0$; o) $\dfrac{x-3}{x^2+1} < 0$
- Ex. 4 (verifique as identidades, desenvolvendo o lado direito): a) $x^2 - a^2 = (x-a)(x+a)$; b) $x^3 - a^3 = (x-a)(x^2 + ax + a^2)$; c) $x^4 - a^4 = (x-a)(x^3 + ax^2 + a^2x + a^3)$; d) $x^5 - a^5 = (x-a)(x^4 + ax^3 + a^2x^2 + a^3x + a^4)$; e) $x^n - a^n = (x-a)(x^{n-1} + ax^{n-2} + a^2x^{n-3} + \dots + a^{n-2}x + a^{n-1})$, $n \ne 0$ natural
- Ex. 6 (fatore): f) $2x^2 - 3x + 1$; g) $x^2 - 25$; h) $3x^2 + x - 2$; i) $4x^2 - 9$; j) $2x^2 - 5x$
- Ex. 7 (inequações de 2º grau): f) $3x^2 + x - 2 > 0$; g) $x^2 - 4x + 4 > 0$; h) $3x^2 - x \le 0$; i) $4x^2 - 4x + 1 < 0$; j) $4x^2 - 4x + 1 \le 0$

**Material 002**

- Ex. 1 (calcule): a) $f(-1)$ e $f(\tfrac12)$ sendo $f(x) = -x^2 + 2x$; b) $g(0)$, $g(2)$ e $g(\sqrt2)$ sendo $g(x) = \dfrac{x}{x^2-1}$; c) $\dfrac{f(a+b)-f(a-b)}{ab}$ sendo $f(x) = x^2$ e $ab \ne 0$; d) $\dfrac{f(a+b)-f(a-b)}{ab}$ sendo $f(x) = 3x+1$ e $ab \ne 0$
- Ex. 2 (quociente de diferença), itens restantes: i) $f(x) = x^3$, $p$ qualquer; j) $f(x) = \frac1x$, $p = 1$; l) $f(x) = \frac1x$, $p = 2$; m) $f(x) = x^2 - 3x$, $p = -2$; n) $f(x) = \frac{1}{x^2}$, $p = 3$; o) $f(x) = \frac{1}{x^2}$, $p = -3$; p) $f(x) = \frac1x$, $p \ne 0$; q) $f(x) = \frac{1}{x^2}$, $p \ne 0$
- Ex. 3 (simplifique $\dfrac{f(x+h)-f(x)}{h}$, $h \ne 0$): a) $2x+1$; b) $3x-8$; c) $-2x+4$; d) $x^2$; e) $x^2+3x$; f) $-x^2+5$; g) $x^2-2x$; h) $x^2-2x+3$; i) $-2x^2+3$; j) $2x^2+x+1$; l) $x^3$; m) $x^3+2x$; n) $x^3+x^2-x$; o) $5$; p) $\frac1x$; q) $2x^3-x$; r) $\frac{1}{x^2}$; s) $\frac{1}{x+2}$

---

## Gabarito (respostas do material do professor)

### Material 001

**Ex. 1** — a) $x < \frac32$; b) $x < -2$; c) $x \le -\frac43$; d) $x \ge 1$; e) $x < \frac13$; f) $x \le 1$

**Ex. 2**

- a) $3x-1 > 0$ para $x > \frac13$; $< 0$ para $x < \frac13$; $= 0$ para $x = \frac13$
- b) $3-x > 0$ para $x < 3$; $< 0$ para $x > 3$; $= 0$ para $x = 3$
- c) $2-3x > 0$ para $x < \frac23$; $< 0$ para $x > \frac23$; $= 0$ para $x = \frac23$
- d) $5x+1 > 0$ para $x > -\frac15$; $< 0$ para $x < -\frac15$; $= 0$ para $x = -\frac15$
- e) $\frac{x-1}{x-2} > 0$ para $x < 1$ ou $x > 2$; $< 0$ para $1 < x < 2$; $= 0$ para $x = 1$; não está definida para $x = 2$
- f) $(2x+1)(x-2) > 0$ para $x < -\frac12$ ou $x > 2$; $< 0$ para $-\frac12 < x < 2$; $= 0$ para $x = -\frac12$ ou $x = 2$
- g) $\frac{2-3x}{x+2} > 0$ para $-2 < x < \frac23$; $< 0$ para $x < -2$ ou $x > \frac23$; $= 0$ para $x = \frac23$; não está definida para $x = -2$
- h) $\frac{2-x}{3-x} > 0$ para $x < 2$ ou $x > 3$; $< 0$ para $2 < x < 3$; $= 0$ para $x = 2$; não está definida para $x = 3$
- i) $(2x-1)(3-2x) < 0$ para $x < \frac12$ ou $x > \frac32$; $> 0$ para $\frac12 < x < \frac32$; $= 0$ para $x = \frac12$ ou $x = \frac32$
- j) $x(x-3) > 0$ para $x < 0$ ou $x > 3$; $< 0$ para $0 < x < 3$; $= 0$ para $x = 0$ ou $x = 3$
- l) $x(x^2+3) > 0$ para $x > 0$; $< 0$ para $x < 0$; $= 0$ para $x = 0$
- m) $(2x-1)(x^2+1) > 0$ para $x > \frac12$; $< 0$ para $x < \frac12$; $= 0$ para $x = \frac12$

> No PDF, o gabarito do Ex. 2 traz também respostas "l)" e "m)" para as expressões $x(x-1)(2x+3)$ e $(x-1)(1+x)(2-3x)$, que **não** estão na lista de exercícios (o gabarito foi copiado de um livro com mais itens). As respostas dos itens l) e m) da lista são as marcadas "n)" e "o)" no PDF, reproduzidas acima.

**Ex. 3** — a) $-1 < x < \frac12$; b) $x \le 1$ ou $x > 3$; c) $x < -\frac13$ ou $x > 2$; d) $-3 < x < \frac12$; e) $x \le \frac23$ ou $x > 2$; f) $x \le 0$ ou $x \ge \frac12$; g) $x < -2$ ou $x > 2$; h) $3 < x < \frac{14}{3}$; i) $x < \frac32$ ou $x \ge \frac95$; j) $x < \frac32$ ou $x > 2$; l) $-1 < x < 0$ ou $x > \frac12$; m) $x < \frac12$ ou $x > 3$; n) $x < \frac32$; o) $x < 3$

**Ex. 5** — a) $x+1$; b) $\dfrac{x^2+2x+4}{x+2}$; c) $2x-3$; d) $-\dfrac{1}{x}$; e) $-\dfrac{x+1}{x^2}$; f) $-\dfrac{x+3}{9x^2}$; g) $-\dfrac{1}{5x}$; h) $-\dfrac{1}{xp}$; i) $-\dfrac{x+p}{x^2p^2}$; j) $x^3 + px^2 + p^2x + p^3$; l) $2x+h$; m) $-\dfrac{1}{x(x+h)}$; n) $3x^2 + 3xh + h^2$; o) $4x$

**Ex. 6** — a) $(x-1)(x-2)$; b) $(x+1)(x-2)$; c) $(x-1)^2$; d) $(x-3)^2$; e) $x(2x-3)$; f) $(x-1)(2x-1)$; g) $(x-5)(x+5)$; h) $(x+1)(3x-2)$; i) $(2x-3)(2x+3)$; j) $x(2x-5)$

**Ex. 7** — a) $1 < x < 2$; b) $x \le 2$ ou $x \ge 3$; c) $x < 0$ ou $x > 3$; d) $-3 < x < 3$; e) $x \le -1$ ou $x \ge 2$; f) $x < -1$ ou $x > \frac23$; g) $x \ne 2$; h) $0 \le x \le \frac13$; i) não admite solução; j) $x = \frac12$

### Material 002

**Ex. 1** — a) $-3$ e $\frac34$; b) $0$, $\frac23$ e $\sqrt2$; c) $4$; d) $\dfrac{6}{a}$

**Ex. 2** — a) $x+1$; b) $x-1$; c) $x+p$; d) $2$; e) $2$; f) $0$; g) $x^2+2x+4$; h) $x^2-2x+4$; i) $x^2+px+p^2$; j) $-\dfrac1x$; l) $-\dfrac{1}{2x}$; m) $x-5$; n) $-\dfrac{x+3}{9x^2}$; o) $-\dfrac{x-3}{9x^2}$; p) $-\dfrac{1}{xp}$; q) $-\dfrac{x+p}{x^2p^2}$

**Ex. 3** — a) $2$; b) $3$; c) $-2$; d) $2x+h$; e) $2x+3+h$; f) $-2x-h$; g) $2x-2+h$; h) $2x-2+h$; i) $-4x-2h$; j) $4x+1+2h$; l) $3x^2+3xh+h^2$; m) $3x^2+2+3xh+h^2$; n) $3x^2+2x-1+3xh+h+h^2$; o) $0$; p) $-\dfrac{1}{x(x+h)}$; q) $6x^2-1+6xh+2h^2$; r) $-\dfrac{2x+h}{x^2(x+h)^2}$; s) $-\dfrac{1}{(x+2)(x+2+h)}$

**Ex. 4** — a) $\{x \in \mathbb{R} \mid x \ne 1\}$; b) $\{x \in \mathbb{R} \mid x \ne -1 \text{ e } x \ne 1\}$; c) $\mathbb{R}$; d) $\{x \in \mathbb{R} \mid x \ne -2\}$; e) $\{x \in \mathbb{R} \mid x \ge -2\}$; f) $\{x \in \mathbb{R} \mid x \ne 0 \text{ e } x \ne -1\}$; g) $\{x \in \mathbb{R} \mid x < -1 \text{ ou } x \ge 1\}$; h) $\{x \in \mathbb{R} \mid x < -3 \text{ ou } x \ge 0\}$
