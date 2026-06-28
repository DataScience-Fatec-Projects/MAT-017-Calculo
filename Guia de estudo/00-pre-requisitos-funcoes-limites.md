# 00 — Pré-requisitos: Funções, Limites e Continuidade

> Base indispensável para entender derivadas e integrais. Se a derivada é "taxa de variação instantânea", ela só faz sentido sobre a ideia de **limite**.

## 1. Funções

Uma função $f: A \to B$ associa a cada $x \in A$ (domínio) **um único** $y = f(x) \in B$.

Funções frequentes no curso:

| Tipo | Forma | Uso típico |
|------|-------|------------|
| Polinomial | $f(x) = a_n x^n + \dots + a_0$ | custo, receita |
| Exponencial | $f(x) = a \cdot e^{kx}$ | crescimento, decaimento |
| Logarítmica | $f(x) = \ln x$ | log-verossimilhança, escalas |
| Racional | $f(x) = \frac{p(x)}{q(x)}$ | taxas, médias |
| Sigmoide | $\sigma(x) = \frac{1}{1+e^{-x}}$ | classificação (ML) |

## 2. Limite

O limite descreve o valor para o qual $f(x)$ tende quando $x$ se aproxima de $a$:

$$\lim_{x \to a} f(x) = L$$

significa que $f(x)$ fica arbitrariamente perto de $L$ quando $x$ se aproxima de $a$ (por ambos os lados).

**Propriedades** (quando os limites existem):

$$\lim (f \pm g) = \lim f \pm \lim g \qquad \lim (f \cdot g) = \lim f \cdot \lim g \qquad \lim \frac{f}{g} = \frac{\lim f}{\lim g}\ (\lim g \neq 0)$$

**Exemplo:**

$$\lim_{x \to 2} (3x^2 - 1) = 3(2)^2 - 1 = 11$$

**Indeterminação $\frac{0}{0}$** — fatore e simplifique:

$$\lim_{x \to 3} \frac{x^2 - 9}{x - 3} = \lim_{x \to 3} \frac{(x-3)(x+3)}{x-3} = \lim_{x\to 3}(x+3) = 6$$

## 3. Continuidade

$f$ é **contínua** em $x = a$ quando:

1. $f(a)$ existe;
2. $\lim_{x \to a} f(x)$ existe;
3. $\lim_{x \to a} f(x) = f(a)$.

Intuição: dá para desenhar o gráfico **sem tirar o lápis do papel**.

## 4. Laboratório (Python)

```python
import sympy as sp

x = sp.symbols('x')
expr = (x**2 - 9) / (x - 3)

print(sp.limit(expr, x, 3))           # 6
print(sp.limit(sp.sin(x)/x, x, 0))    # 1  (limite fundamental)
```

## 5. Exercícios

1. Calcule $\lim_{x \to 1} \frac{x^2 - 1}{x - 1}$.
2. A função $f(x) = \frac{1}{x}$ é contínua em $x = 0$? Justifique.
3. Verifique o limite fundamental $\lim_{x\to 0} \frac{\sin x}{x} = 1$ numericamente em Python.

➡️ Próximo: [`01-derivadas-definicao.md`](01-derivadas-definicao.md)
