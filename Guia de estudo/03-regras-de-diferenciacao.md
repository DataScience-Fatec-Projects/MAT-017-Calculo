# 03 — Regras de Diferenciação

> Ementa: *"regras de diferenciação."*

Derivar pela definição (limite) é trabalhoso. As **regras** permitem derivar rapidamente.

## 1. Regras básicas

| Regra | Fórmula |
|-------|---------|
| Constante | $\dfrac{d}{dx}(c) = 0$ |
| Potência | $\dfrac{d}{dx}(x^n) = n\,x^{n-1}$ |
| Múltiplo constante | $\dfrac{d}{dx}(c\,f) = c\,f'$ |
| Soma/diferença | $(f \pm g)' = f' \pm g'$ |

## 2. Produto e quociente

$$\textbf{Produto:}\quad (f \cdot g)' = f'\,g + f\,g'$$

$$\textbf{Quociente:}\quad \left(\frac{f}{g}\right)' = \frac{f'\,g - f\,g'}{g^2}$$

## 3. Regra da cadeia (composição)

A mais importante para Ciência de Dados — é a base do **backpropagation**.

$$\big(f(g(x))\big)' = f'(g(x)) \cdot g'(x)$$

Ou, em notação de Leibniz, com $y = f(u)$ e $u = g(x)$:

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

**Exemplo:** $y = (3x^2 + 1)^5$. Com $u = 3x^2+1$: $\frac{dy}{dx} = 5u^4 \cdot 6x = 30x(3x^2+1)^4$.

## 4. Derivadas das funções elementares

| $f(x)$ | $f'(x)$ |
|--------|---------|
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $1/x$ |
| $\log_a x$ | $1/(x \ln a)$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |

### Derivada da sigmoide (muito usada em ML)

$$\sigma(x) = \frac{1}{1+e^{-x}} \implies \sigma'(x) = \sigma(x)\,(1 - \sigma(x))$$

Propriedade elegante: a derivada se expressa em função da própria saída.

## 5. Derivadas de ordem superior

$$f''(x) = \frac{d}{dx}f'(x), \qquad f'''(x), \ \dots$$

A segunda derivada indica **concavidade** (doc 04).

## 6. Exemplos resolvidos

1. $f(x) = 4x^3 - 2x + 7 \Rightarrow f'(x) = 12x^2 - 2$
2. $f(x) = x^2 e^x \Rightarrow f'(x) = 2x e^x + x^2 e^x = e^x(x^2 + 2x)$ (produto)
3. $f(x) = \dfrac{x}{x+1} \Rightarrow f'(x) = \dfrac{1\cdot(x+1) - x\cdot 1}{(x+1)^2} = \dfrac{1}{(x+1)^2}$ (quociente)
4. $f(x) = \ln(x^2+1) \Rightarrow f'(x) = \dfrac{2x}{x^2+1}$ (cadeia)

## 7. Laboratório (Python)

```python
import sympy as sp
x = sp.symbols('x')

print(sp.diff(4*x**3 - 2*x + 7, x))         # 12*x**2 - 2
print(sp.diff(x**2 * sp.exp(x), x))         # produto
print(sp.diff(x/(x+1), x))                  # quociente
print(sp.diff(sp.log(x**2 + 1), x))         # cadeia

# Segunda derivada
print(sp.diff(x**4, x, 2))                  # 12*x**2

# Sigmoide
sig = 1/(1 + sp.exp(-x))
print(sp.simplify(sp.diff(sig, x)))         # = sig*(1-sig)
```

## 8. Exercícios

1. Derive $f(x) = (2x - 1)^4$.
2. Derive $f(x) = \dfrac{e^x}{x}$.
3. Derive $f(x) = \sin(3x^2)$.
4. Mostre que $\sigma'(x) = \sigma(x)(1-\sigma(x))$.
5. Calcule $f''(x)$ para $f(x) = x^3 - 6x$.

➡️ Próximo: [`04-maximos-minimos-gradiente.md`](04-maximos-minimos-gradiente.md)
