# 12 — Aplicações em Ciência de Dados: Probabilidade

> Ementa: *"Aplicações em problemas de Ciência de dados, utilizando software para programação."*
> Objetivo: *"Aplicar a integração para a compreensão e obtenção das equações das distribuições de probabilidades."*

Este documento fecha o curso unindo **integração** e **probabilidade contínua** — o coração da Ciência de Dados.

## 1. Função densidade de probabilidade (FDP)

Uma variável aleatória contínua $X$ é descrita por uma **densidade** $f(x)$ que satisfaz:

$$f(x) \ge 0 \qquad\text{e}\qquad \int_{-\infty}^{\infty} f(x)\,dx = 1$$

A probabilidade é **área sob a curva** (doc 09):

$$P(a \le X \le b) = \int_a^b f(x)\,dx$$

> Em variáveis contínuas, $P(X = x) = 0$. Só intervalos têm probabilidade > 0.

## 2. Função de distribuição acumulada (FDA)

$$F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt$$

Pelo TFC (doc 08): $F'(x) = f(x)$. **Derivar a acumulada dá a densidade; integrar a densidade dá a acumulada.**

## 3. Esperança e variância (via integral)

$$E[X] = \int_{-\infty}^{\infty} x\,f(x)\,dx \qquad \text{(média)}$$

$$\text{Var}(X) = \int_{-\infty}^{\infty} (x - \mu)^2 f(x)\,dx = E[X^2] - \mu^2$$

## 4. Distribuição Uniforme em $[a,b]$

$$f(x) = \frac{1}{b-a}, \quad a \le x \le b$$

$$E[X] = \frac{a+b}{2} \qquad (\text{calculado integrando } x \cdot f(x))$$

## 5. Distribuição Exponencial (taxa $\lambda$)

$$f(x) = \lambda e^{-\lambda x}, \quad x \ge 0$$

Verificação de que integra 1, e esperança (por partes — doc 11):

$$\int_0^\infty \lambda e^{-\lambda x}\,dx = 1, \qquad E[X] = \int_0^\infty x\,\lambda e^{-\lambda x}\,dx = \frac{1}{\lambda}$$

Modela **tempo entre eventos** (chegadas, falhas, requisições).

## 6. Distribuição Normal (Gaussiana)

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

A integral não tem primitiva elementar → usa-se **integração numérica** ou a função `erf`. É a distribuição mais importante em estatística (Teorema Central do Limite).

## 7. Laboratório (Python)

```python
import sympy as sp

x, lam = sp.symbols('x lambda', positive=True)

# Exponencial: integra 1 e esperança = 1/lambda
f = lam*sp.exp(-lam*x)
print(sp.integrate(f, (x, 0, sp.oo)))           # 1
print(sp.integrate(x*f, (x, 0, sp.oo)))         # 1/lambda  (por partes)

# Normal padrão: P(-1 <= X <= 1)
from scipy.stats import norm
print(norm.cdf(1) - norm.cdf(-1))               # ≈ 0.6827 (regra 68%)
```

Verificando $P(a \le X \le b)$ por integração numérica:

```python
from scipy.integrate import quad
import numpy as np

def normal(x, mu=0, sigma=1):
    return 1/(sigma*np.sqrt(2*np.pi)) * np.exp(-(x-mu)**2/(2*sigma**2))

p, _ = quad(normal, -1, 1)
print(p)     # ≈ 0.6827
```

## 8. Por que isso fundamenta a tomada de decisão

| Pergunta de negócio | Ferramenta |
|---------------------|------------|
| "Qual a chance de a entrega atrasar mais de 2 dias?" | $\int$ da densidade do tempo de entrega |
| "Qual o tempo médio entre falhas do servidor?" | $E[X]$ da exponencial |
| "Quantos % dos clientes gastam entre R\$50 e R\$100?" | área sob a densidade de gastos |
| "Esse valor é um outlier?" | cauda da normal ($P(X > x)$) |

A integração transforma um **modelo de densidade** em **probabilidades concretas** que orientam decisões — exatamente o objetivo de aprendizagem do curso.

## 9. Exercícios

1. Mostre que $f(x) = 3x^2$ em $[0,1]$ é uma densidade válida e calcule $P(X \le 0{,}5)$.
2. Para a uniforme em $[2, 10]$, calcule $E[X]$ e $P(4 \le X \le 7)$.
3. Para a exponencial com $\lambda = 0{,}5$, calcule $P(X > 3)$.
4. Use Python para calcular $P(\mu - 2\sigma \le X \le \mu + 2\sigma)$ na normal (deve dar ≈ 95%).
5. Deduza $E[X] = 1/\lambda$ da exponencial usando integração por partes (doc 11).

---

🎓 **Fim do guia.** Você percorreu toda a ementa: da definição de derivada à aplicação de integrais em distribuições de probabilidade para Ciência de Dados. Volte ao [índice](README.md).
