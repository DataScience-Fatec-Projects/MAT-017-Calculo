# 11 — Integração por Partes

> Ementa: *"integração por partes."*

## 1. A fórmula

Vem da regra do produto da derivação. Se $u = u(x)$ e $v = v(x)$:

$$\boxed{\int u\,dv = u\,v - \int v\,du}$$

A ideia: troca-se uma integral difícil $\int u\,dv$ por outra mais simples $\int v\,du$.

## 2. Como escolher $u$ e $dv$ — regra **LIATE**

Escolha $u$ na ordem de prioridade (o que vier primeiro vira $u$):

| Letra | Tipo de função | Exemplo |
|-------|----------------|---------|
| **L** | Logarítmica | $\ln x$ |
| **I** | Inversa trigonométrica | $\arctan x$ |
| **A** | Algébrica (polinômio) | $x,\ x^2$ |
| **T** | Trigonométrica | $\sin x,\ \cos x$ |
| **E** | Exponencial | $e^x$ |

O restante (com o $dx$) vira $dv$.

## 3. Exemplo clássico

$$\int x\,e^x\,dx$$

LIATE: $x$ (Algébrica) vem antes de $e^x$ (Exponencial) → $u = x$, $dv = e^x dx$.

- $u = x \Rightarrow du = dx$
- $dv = e^x dx \Rightarrow v = e^x$

$$\int x e^x dx = x e^x - \int e^x\,dx = x e^x - e^x + C = e^x(x - 1) + C$$

## 4. Exemplo com logaritmo

$$\int \ln x\,dx$$

$u = \ln x$, $dv = dx$ → $du = \frac{1}{x}dx$, $v = x$:

$$\int \ln x\,dx = x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - x + C$$

## 5. Aplicação repetida

$\int x^2 e^x dx$ exige aplicar por partes **duas vezes** (reduzindo o grau do polinômio a cada passo):

$$\int x^2 e^x dx = x^2 e^x - 2\int x e^x dx = x^2 e^x - 2(xe^x - e^x) + C = e^x(x^2 - 2x + 2) + C$$

## 6. Caso "circular" (volta para a integral original)

Em $\int e^x \sin x\,dx$, após duas aplicações a integral original reaparece; isola-se algebricamente:

$$\int e^x \sin x\,dx = \frac{e^x(\sin x - \cos x)}{2} + C$$

## 7. Laboratório (Python)

```python
import sympy as sp
x = sp.symbols('x')

print(sp.integrate(x*sp.exp(x), x))            # exp(x)*(x - 1)
print(sp.integrate(sp.log(x), x))              # x*log(x) - x
print(sp.integrate(x**2*sp.exp(x), x))         # exp(x)*(x**2 - 2*x + 2)
print(sp.integrate(sp.exp(x)*sp.sin(x), x))    # caso circular
```

## 8. Conexão com Ciência de Dados

Integração por partes aparece no cálculo de **valores esperados** de distribuições contínuas, por exemplo a esperança da distribuição exponencial:

$$E[X] = \int_0^\infty x\,\lambda e^{-\lambda x}\,dx = \frac{1}{\lambda}$$

(resolvida exatamente por partes — ver doc 12).

## 9. Exercícios

1. $\displaystyle\int x\cos x\,dx$
2. $\displaystyle\int x^2 \ln x\,dx$
3. $\displaystyle\int x e^{-x}\,dx$
4. $\displaystyle\int \arctan x\,dx$
5. Calcule $\displaystyle\int_0^\infty x e^{-x}\,dx$ e confirme que vale $1$.

➡️ Próximo: [`12-aplicacoes-ciencia-de-dados.md`](12-aplicacoes-ciencia-de-dados.md)
