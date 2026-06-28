# 01 — Derivadas: Definição

> Ementa: *"Derivadas: definição, derivada de uma função."*

## 1. Ideia central

A derivada mede a **taxa de variação instantânea** de uma função — quão rápido $y$ muda quando $x$ muda. Geometricamente, é a **inclinação da reta tangente** ao gráfico em um ponto.

## 2. Definição formal (limite do quociente de Newton)

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

O quociente $\dfrac{f(x+h)-f(x)}{h}$ é a inclinação da **reta secante**; ao fazer $h \to 0$, a secante vira **tangente**.

### Notações equivalentes

$$f'(x) \quad=\quad \frac{dy}{dx} \quad=\quad \frac{d}{dx}f(x) \quad=\quad \dot y \quad=\quad D_x f$$

## 3. Exemplo resolvido pela definição

Seja $f(x) = x^2$.

$$f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h} = \lim_{h \to 0} \frac{2xh + h^2}{h}$$

$$= \lim_{h \to 0} (2x + h) = 2x$$

Logo $f'(x) = 2x$. No ponto $x = 3$, a inclinação da tangente é $f'(3) = 6$.

## 4. Interpretações

| Contexto | $f(x)$ | $f'(x)$ significa |
|----------|--------|-------------------|
| Física | posição | velocidade |
| Negócio | custo total | custo **marginal** |
| Negócio | receita total | receita **marginal** |
| ML | função de perda | direção de ajuste dos pesos |

## 5. Reta tangente

A reta tangente em $x = a$:

$$y = f(a) + f'(a)\,(x - a)$$

**Exemplo:** $f(x)=x^2$ em $a=3$: $f(3)=9$, $f'(3)=6$ → $y = 9 + 6(x-3) = 6x - 9$.

## 6. Laboratório (Python)

```python
import sympy as sp

x, h = sp.symbols('x h')
f = x**2

# Derivada pela definição (limite)
deriv = sp.limit((f.subs(x, x+h) - f) / h, h, 0)
print(deriv)              # 2*x

# Conferindo com diff
print(sp.diff(f, x))      # 2*x

# Reta tangente em x = 3
a = 3
fa = f.subs(x, a)
fpa = sp.diff(f, x).subs(x, a)
print(sp.expand(fa + fpa*(x - a)))   # 6*x - 9
```

Aproximação numérica (diferença finita):

```python
def derivada_num(f, x, h=1e-6):
    return (f(x + h) - f(x - h)) / (2*h)   # diferença centrada

print(derivada_num(lambda x: x**2, 3))     # ≈ 6.0
```

## 7. Exercícios

1. Use a definição para mostrar que se $f(x) = 3x + 5$, então $f'(x) = 3$.
2. Use a definição para derivar $f(x) = x^3$.
3. Encontre a reta tangente a $f(x) = x^2 - 4x$ em $x = 1$.
4. Confirme os itens 1–3 com SymPy.

➡️ Próximo: [`02-diferenciabilidade-continuidade.md`](02-diferenciabilidade-continuidade.md)
