# 05 — Derivadas Parciais

> Ementa: *"derivadas parciais."*

Modelos reais dependem de **várias variáveis** (vários pesos/features). A derivada parcial generaliza a derivada para funções de múltiplas variáveis.

## 1. Definição

Para $f(x, y)$, a derivada parcial em relação a $x$ trata $y$ como **constante**:

$$\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h, y) - f(x, y)}{h}$$

Analogamente, $\dfrac{\partial f}{\partial y}$ trata $x$ como constante.

Notações: $\dfrac{\partial f}{\partial x} = f_x = \partial_x f$.

## 2. Exemplo

$f(x, y) = x^2 y + 3y^2$.

$$\frac{\partial f}{\partial x} = 2xy \qquad (\text{$y$ constante})$$
$$\frac{\partial f}{\partial y} = x^2 + 6y \qquad (\text{$x$ constante})$$

## 3. Gradiente

O **gradiente** reúne todas as derivadas parciais em um vetor:

$$\nabla f = \left( \frac{\partial f}{\partial x},\ \frac{\partial f}{\partial y} \right)$$

- Aponta na direção de **maior crescimento** da função.
- Sua norma é a taxa máxima de variação.
- É o objeto central do **gradiente descendente** em várias variáveis:

$$\mathbf{x}_{k+1} = \mathbf{x}_k - \eta \, \nabla f(\mathbf{x}_k)$$

## 4. Derivadas parciais de segunda ordem e Hessiana

$$f_{xx},\ f_{yy},\ f_{xy} = f_{yx} \ (\text{Teorema de Schwarz, se contínuas})$$

A **matriz Hessiana** organiza as segundas derivadas:

$$H = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$$

Usada para classificar pontos críticos em várias variáveis (mínimo, máximo ou **sela**).

## 5. Regra da cadeia multivariável

Se $z = f(x, y)$ com $x = x(t)$, $y = y(t)$:

$$\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$$

## 6. Laboratório (Python)

```python
import sympy as sp

x, y = sp.symbols('x y')
f = x**2 * y + 3*y**2

fx = sp.diff(f, x)        # 2*x*y
fy = sp.diff(f, y)        # x**2 + 6*y
grad = [fx, fy]
print(grad)

# Gradiente avaliado no ponto (1, 2)
print([g.subs({x:1, y:2}) for g in grad])    # [4, 13]

# Hessiana
H = sp.hessian(f, (x, y))
print(H)
```

Gradiente numérico com NumPy:

```python
import numpy as np

def f(v):
    x, y = v
    return x**2 * y + 3*y**2

def grad_num(f, v, h=1e-6):
    v = np.array(v, dtype=float)
    g = np.zeros_like(v)
    for i in range(len(v)):
        e = np.zeros_like(v); e[i] = h
        g[i] = (f(v + e) - f(v - e)) / (2*h)
    return g

print(grad_num(f, [1, 2]))    # ≈ [4. 13.]
```

## 7. Conexão com Ciência de Dados

- A **função de perda** de um modelo depende de muitos parâmetros $\theta_1, \dots, \theta_n$. O treinamento usa o gradiente $\nabla_\theta J$.
- Cada derivada parcial diz **quanto cada peso** contribui para o erro.
- Pontos de **sela** (comuns em redes profundas) são detectados via Hessiana.

## 8. Exercícios

1. Calcule $f_x$ e $f_y$ de $f(x,y) = e^{xy} + x^2$.
2. Escreva o gradiente de $f(x,y) = x^2 + y^2$ e avalie em $(3, 4)$.
3. Calcule a Hessiana de $f(x,y) = x^3 + y^3 - 3xy$ e classifique os pontos críticos.

➡️ Próximo: [`06-aplicacoes-negocio.md`](06-aplicacoes-negocio.md)
