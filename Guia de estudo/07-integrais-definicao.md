# 07 — Integral: Definição e Integral Indefinida

> Ementa: *"Integrais: definição."*

A integração é a **operação inversa** da derivação — e também a ferramenta para **acumular** quantidades (áreas, totais, probabilidades).

## 1. Antiderivada (primitiva)

$F$ é uma **antiderivada** de $f$ se $F'(x) = f(x)$.

Como a derivada de uma constante é zero, há infinitas antiderivadas, diferindo por uma constante $C$:

$$\int f(x)\,dx = F(x) + C$$

Esta é a **integral indefinida**. O $C$ é a **constante de integração**.

**Exemplo:** $\int 2x\,dx = x^2 + C$, pois $\frac{d}{dx}(x^2 + C) = 2x$.

## 2. Regras básicas de integração

| Função | Integral |
|--------|----------|
| $x^n\ (n \neq -1)$ | $\dfrac{x^{n+1}}{n+1} + C$ |
| $\dfrac{1}{x}$ | $\ln\lvert x\rvert + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\dfrac{a^x}{\ln a} + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\sec^2 x$ | $\tan x + C$ |

### Linearidade

$$\int \big(a\,f(x) + b\,g(x)\big)\,dx = a\int f(x)\,dx + b\int g(x)\,dx$$

## 3. Exemplos resolvidos

1. $\displaystyle\int (3x^2 - 4x + 5)\,dx = x^3 - 2x^2 + 5x + C$
2. $\displaystyle\int \left(e^x + \frac{1}{x}\right)dx = e^x + \ln|x| + C$
3. $\displaystyle\int 6\sqrt{x}\,dx = \int 6x^{1/2}\,dx = 6 \cdot \frac{x^{3/2}}{3/2} + C = 4x^{3/2} + C$

## 4. Verificação: derive o resultado

Sempre confira **derivando** a primitiva — deve voltar ao integrando. É o melhor método de autocorreção.

## 5. Laboratório (Python)

```python
import sympy as sp
x = sp.symbols('x')

print(sp.integrate(3*x**2 - 4*x + 5, x))    # x**3 - 2*x**2 + 5*x
print(sp.integrate(sp.exp(x) + 1/x, x))     # exp(x) + log(x)
print(sp.integrate(6*sp.sqrt(x), x))        # 4*x**(3/2)

# Conferindo: derivar deve retornar o integrando
F = sp.integrate(3*x**2 - 4*x + 5, x)
print(sp.diff(F, x))                        # 3*x**2 - 4*x + 5
```

## 6. Exercícios

1. $\displaystyle\int (4x^3 - 6x + 1)\,dx$
2. $\displaystyle\int \left(\frac{2}{x} + 3e^x\right)dx$
3. $\displaystyle\int (5\cos x - \sin x)\,dx$
4. $\displaystyle\int \frac{x^2 + 1}{x}\,dx$ (dica: divida termo a termo)
5. Verifique cada resultado derivando.

➡️ Próximo: [`08-integral-definida-tvm.md`](08-integral-definida-tvm.md)
