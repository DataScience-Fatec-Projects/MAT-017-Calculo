# 08 — Integral Definida e Teorema do Valor Médio

> Ementa: *"integral definida, teorema do valor médio."*

## 1. Integral definida como limite de somas (Riemann)

A integral definida $\int_a^b f(x)\,dx$ é o limite das **somas de Riemann** — somamos áreas de retângulos cada vez mais finos sob a curva:

$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*)\,\Delta x, \qquad \Delta x = \frac{b-a}{n}$$

Resultado: um **número** (não uma família de funções). Geometricamente, a **área com sinal** entre a curva e o eixo $x$.

## 2. Teorema Fundamental do Cálculo (TFC)

Conecta derivada e integral — o resultado mais importante do curso.

**Parte 1:** se $F(x) = \int_a^x f(t)\,dt$, então $F'(x) = f(x)$.

**Parte 2 (cálculo prático):** se $F$ é uma antiderivada de $f$, então

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

**Exemplo:**

$$\int_0^2 x^2\,dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3} - 0 = \frac{8}{3}$$

## 3. Propriedades

$$\int_a^a f = 0 \qquad \int_a^b f = -\int_b^a f \qquad \int_a^b f = \int_a^c f + \int_c^b f$$

## 4. Teorema do Valor Médio para Integrais (TVM)

Se $f$ é contínua em $[a,b]$, existe $c \in [a,b]$ tal que:

$$\int_a^b f(x)\,dx = f(c)\,(b - a)$$

O **valor médio** de $f$ no intervalo é:

$$\bar f = \frac{1}{b-a}\int_a^b f(x)\,dx$$

Interpretação: $f(c)$ é a "altura média" — o retângulo de base $(b-a)$ e altura $\bar f$ tem a mesma área que a região sob a curva.

**Exemplo:** valor médio de $f(x) = x^2$ em $[0,2]$:

$$\bar f = \frac{1}{2-0}\int_0^2 x^2\,dx = \frac{1}{2}\cdot\frac{8}{3} = \frac{4}{3}$$

## 5. Aplicação em dados/negócio

- **Valor médio** de uma taxa contínua: demanda média, temperatura média, carga média de um servidor ao longo do dia.
- **Acúmulo**: dada uma taxa $r(t)$, o total acumulado entre $t=a$ e $t=b$ é $\int_a^b r(t)\,dt$ (ex.: total de vendas a partir da taxa de vendas).

## 6. Laboratório (Python)

```python
import sympy as sp
x = sp.symbols('x')

# Integral definida (TFC)
print(sp.integrate(x**2, (x, 0, 2)))        # 8/3

# Valor médio em [0, 2]
a, b = 0, 2
media = sp.integrate(x**2, (x, a, b)) / (b - a)
print(media)                                # 4/3
```

Integração numérica (quando não há primitiva fechada):

```python
from scipy.integrate import quad
import numpy as np

val, erro = quad(lambda x: np.exp(-x**2), 0, 1)
print(val)     # ≈ 0.7468
```

## 7. Exercícios

1. Calcule $\displaystyle\int_1^3 (2x + 1)\,dx$.
2. Calcule $\displaystyle\int_0^{\pi} \sin x\,dx$.
3. Encontre o valor médio de $f(x) = 3x^2$ em $[0, 2]$.
4. Use a soma de Riemann com $n = 4$ retângulos para estimar $\int_0^2 x^2 dx$ e compare com $8/3$.

➡️ Próximo: [`09-area-regiao-plano.md`](09-area-regiao-plano.md)
