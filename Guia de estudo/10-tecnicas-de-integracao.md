# 10 — Técnicas de Integração

> Ementa: *"técnicas de integração."* (Integração por partes tem doc próprio: [`11`](11-integracao-por-partes.md).)

Nem toda integral sai pelas regras básicas. As técnicas transformam a integral em algo conhecido.

## 1. Substituição (regra da cadeia ao contrário)

Quando o integrando contém uma função **e sua derivada**:

$$\int f(g(x))\,g'(x)\,dx = \int f(u)\,du, \qquad u = g(x),\ du = g'(x)\,dx$$

### Passo a passo

1. Escolha $u = g(x)$ (geralmente a parte "de dentro").
2. Calcule $du = g'(x)\,dx$.
3. Reescreva tudo em $u$, integre, volte para $x$.

**Exemplo:** $\displaystyle\int 2x\,(x^2+1)^5\,dx$. Seja $u = x^2+1 \Rightarrow du = 2x\,dx$:

$$\int u^5\,du = \frac{u^6}{6} + C = \frac{(x^2+1)^6}{6} + C$$

**Em integral definida**, troque também os limites:

$$\int_0^1 2x(x^2+1)^5\,dx \;\xrightarrow{u}\; \int_{1}^{2} u^5\,du = \left[\frac{u^6}{6}\right]_1^2 = \frac{64-1}{6} = \frac{63}{6}$$

## 2. Substituição com ajuste de constante

$$\int \cos(3x)\,dx \quad\Rightarrow\quad u = 3x,\ du = 3\,dx \Rightarrow \frac{1}{3}\int \cos u\,du = \frac{1}{3}\sin(3x) + C$$

## 3. Frações parciais (integrando racional)

Para $\int \frac{p(x)}{q(x)}\,dx$ com $\deg p < \deg q$, decomponha em frações simples.

**Exemplo:**

$$\frac{1}{(x)(x+1)} = \frac{1}{x} - \frac{1}{x+1} \implies \int \frac{dx}{x(x+1)} = \ln|x| - \ln|x+1| + C$$

## 4. Identidades trigonométricas

Reescreva potências usando identidades antes de integrar, ex.:

$$\int \sin^2 x\,dx = \int \frac{1 - \cos 2x}{2}\,dx = \frac{x}{2} - \frac{\sin 2x}{4} + C$$

## 5. Como escolher a técnica

```
Tem f(g(x))·g'(x)?           → Substituição
É produto de tipos diferentes (x·eˣ, x·ln x)? → Por partes (doc 11)
É fração de polinômios?      → Frações parciais (ou substituição)
Tem potências de sin/cos?    → Identidades trigonométricas
Nada disso / muito difícil?  → Numérico (scipy.quad)
```

## 6. Laboratório (Python)

```python
import sympy as sp
x = sp.symbols('x')

print(sp.integrate(2*x*(x**2+1)**5, x))      # substituição
print(sp.integrate(sp.cos(3*x), x))          # sin(3*x)/3
print(sp.integrate(1/(x*(x+1)), x))          # frações parciais
print(sp.integrate(sp.sin(x)**2, x))         # identidade trig

# Decomposição em frações parciais explícita
print(sp.apart(1/(x*(x+1)), x))              # 1/x - 1/(x+1)
```

## 7. Exercícios

1. $\displaystyle\int 3x^2(x^3 + 2)^4\,dx$ (substituição)
2. $\displaystyle\int \frac{x}{x^2+1}\,dx$
3. $\displaystyle\int e^{5x}\,dx$
4. $\displaystyle\int \frac{1}{x^2 - 1}\,dx$ (frações parciais)
5. $\displaystyle\int \cos^2 x\,dx$

➡️ Próximo: [`11-integracao-por-partes.md`](11-integracao-por-partes.md)
