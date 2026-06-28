# 02 — Diferenciabilidade e Continuidade

> Ementa: *"diferenciabilidade e continuidade."*

## 1. Relação fundamental

> **Teorema:** Se $f$ é **diferenciável** em $x = a$, então $f$ é **contínua** em $x = a$.

A recíproca é **falsa**: uma função pode ser contínua mas **não** diferenciável.

```
diferenciável  ⟹  contínua
contínua       ⟹̸  diferenciável   (nem sempre)
```

## 2. Quando a derivada NÃO existe

| Caso | Exemplo | Por quê |
|------|---------|---------|
| **Bico / quina** | $f(x) = \lvert x \rvert$ em $x=0$ | derivadas laterais diferentes ($-1$ vs $+1$) |
| **Tangente vertical** | $f(x) = \sqrt[3]{x}$ em $x=0$ | inclinação $\to \infty$ |
| **Descontinuidade** | função degrau em $x=0$ | nem contínua é |

### Derivadas laterais

$$f'_-(a) = \lim_{h \to 0^-}\frac{f(a+h)-f(a)}{h}, \qquad f'_+(a) = \lim_{h \to 0^+}\frac{f(a+h)-f(a)}{h}$$

$f$ é diferenciável em $a$ **se, e somente se**, $f'_-(a) = f'_+(a)$ (e ambas existem finitas).

## 3. Exemplo: $f(x) = |x|$

$$f'_-(0) = -1, \qquad f'_+(0) = +1 \implies \text{não diferenciável em } 0.$$

Mas $f$ é contínua em $0$, pois $\lim_{x\to 0}|x| = 0 = f(0)$.

## 4. Por que isso importa em Ciência de Dados

- A função **ReLU** $f(x)=\max(0,x)$ tem um bico em $0$ (igual a $|x|$ à direita). Na prática, define-se a "subderivada" como $0$ nesse ponto.
- Algoritmos de **gradiente descendente** (doc 04) exigem que a função de perda seja diferenciável (ou ao menos quase em todo ponto) para calcular o gradiente.
- Perdas como **MAE** (erro absoluto médio) têm bico; **MSE** (erro quadrático) é suave — daí a preferência por MSE quando se quer gradiente bem comportado.

## 5. Laboratório (Python)

```python
import sympy as sp

x = sp.symbols('x', real=True)

# |x| não é diferenciável em 0: derivadas laterais distintas
f = sp.Abs(x)
print(sp.limit(sp.diff(f, x), x, 0, '-'))   # -1
print(sp.limit(sp.diff(f, x), x, 0, '+'))   # +1

# raiz cúbica: tangente vertical em 0 (derivada -> oo)
g = sp.cbrt(x)
print(sp.limit(sp.diff(g, x), x, 0))        # oo
```

## 6. Exercícios

1. A função $f(x) = \begin{cases} x^2 & x \le 1 \\ 2x - 1 & x > 1 \end{cases}$ é contínua em $x=1$? É diferenciável?
2. Dê um exemplo de função contínua em toda a reta mas não diferenciável em dois pontos.
3. Explique por que a continuidade não garante a diferenciabilidade, usando $|x|$.

➡️ Próximo: [`03-regras-de-diferenciacao.md`](03-regras-de-diferenciacao.md)
