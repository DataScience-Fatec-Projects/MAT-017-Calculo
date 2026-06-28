# 09 — Área de uma Região no Plano

> Ementa: *"área de uma região no plano."*

## 1. Área entre uma curva e o eixo x

Se $f(x) \ge 0$ em $[a,b]$:

$$A = \int_a^b f(x)\,dx$$

Se $f(x) \le 0$, a integral é negativa; a **área** (sempre positiva) é $\int_a^b |f(x)|\,dx$. Quando $f$ troca de sinal, separe o intervalo nos zeros de $f$.

**Exemplo:** $\int_0^\pi \sin x\,dx = 2$, mas $\int_0^{2\pi}\sin x\,dx = 0$ — a área real é $4$ (somando os módulos).

## 2. Área entre duas curvas

Se $f(x) \ge g(x)$ em $[a,b]$:

$$A = \int_a^b \big[f(x) - g(x)\big]\,dx \qquad (\text{"de cima menos de baixo"})$$

### Passo a passo

1. Encontre as **interseções**: resolva $f(x) = g(x)$ → limites $a$ e $b$.
2. Determine qual curva está **por cima** no intervalo.
3. Integre a diferença.

**Exemplo:** área entre $f(x) = x$ e $g(x) = x^2$.

- Interseções: $x = x^2 \Rightarrow x = 0$ e $x = 1$.
- Em $(0,1)$, $x > x^2$, então $f$ está por cima.

$$A = \int_0^1 (x - x^2)\,dx = \left[\frac{x^2}{2} - \frac{x^3}{3}\right]_0^1 = \frac{1}{2} - \frac{1}{3} = \frac{1}{6}$$

## 3. Laboratório (Python)

```python
import sympy as sp
x = sp.symbols('x')

f, g = x, x**2
inter = sp.solve(sp.Eq(f, g), x)          # [0, 1]
a, b = inter
area = sp.integrate(f - g, (x, a, b))
print(area)                                # 1/6

# Área real quando há troca de sinal (use Abs)
print(sp.integrate(sp.Abs(sp.sin(x)), (x, 0, 2*sp.pi)))   # 4
```

Visualização:

```python
import numpy as np, matplotlib.pyplot as plt

xs = np.linspace(0, 1, 200)
plt.plot(xs, xs, label='f(x)=x')
plt.plot(xs, xs**2, label='g(x)=x²')
plt.fill_between(xs, xs, xs**2, alpha=0.3)
plt.legend(); plt.title('Área entre curvas = 1/6')
plt.show()
```

## 4. Conexão com Ciência de Dados

- A **área sob a curva** é a base de probabilidade contínua: $P(a \le X \le b) = \int_a^b f(x)\,dx$ (doc 12).
- Métrica **AUC-ROC** (avaliação de classificadores) é literalmente uma *Area Under the Curve*.
- **Integral de uma densidade** = probabilidade acumulada.

## 5. Exercícios

1. Calcule a área entre $y = 4 - x^2$ e o eixo $x$.
2. Calcule a área entre $y = x^2$ e $y = 2x$.
3. Calcule a área real de $f(x) = x^3$ em $[-1, 1]$ (cuidado com o sinal).
4. Esboce e calcule a área entre $y = \sqrt{x}$ e $y = x$ em $[0,1]$.

➡️ Próximo: [`10-tecnicas-de-integracao.md`](10-tecnicas-de-integracao.md)
