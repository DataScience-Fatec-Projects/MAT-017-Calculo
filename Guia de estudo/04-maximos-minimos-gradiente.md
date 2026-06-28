# 04 — Máximos, Mínimos e Gradiente Descendente/Ascendente

> Ementa: *"valor máximo e mínimo de uma função para resolução de gradientes ascendente e descendente."*

Este é o elo direto entre o Cálculo e o **Machine Learning**: treinar um modelo é **minimizar** uma função de perda.

## 1. Pontos críticos

Um ponto $x = c$ é **crítico** se $f'(c) = 0$ ou $f'(c)$ não existe. Máximos e mínimos locais ocorrem em pontos críticos.

## 2. Teste da primeira derivada

Analisando o sinal de $f'$ ao redor de $c$:

- $f'$ passa de **$+$ para $-$** → **máximo** local.
- $f'$ passa de **$-$ para $+$** → **mínimo** local.
- não muda de sinal → nem máx nem mín (ponto de inflexão horizontal).

## 3. Teste da segunda derivada

Se $f'(c) = 0$:

$$f''(c) > 0 \implies \text{mínimo local (concavidade para cima} \cup)$$
$$f''(c) < 0 \implies \text{máximo local (concavidade para baixo} \cap)$$
$$f''(c) = 0 \implies \text{inconclusivo}$$

## 4. Exemplo resolvido

$f(x) = x^3 - 3x$.

1. $f'(x) = 3x^2 - 3 = 0 \Rightarrow x = \pm 1$.
2. $f''(x) = 6x$.
   - $f''(1) = 6 > 0$ → **mínimo** local em $x=1$, $f(1) = -2$.
   - $f''(-1) = -6 < 0$ → **máximo** local em $x=-1$, $f(-1) = 2$.

## 5. Otimização (máx/mín global em intervalo fechado)

Em $[a,b]$, avalie $f$ nos **pontos críticos internos** e nos **extremos** $a$ e $b$; o maior valor é o máximo global, o menor é o mínimo global.

## 6. Gradiente Descendente

Para encontrar o mínimo **iterativamente** (essencial quando não há solução fechada), caminhamos na direção **oposta** à derivada/gradiente:

$$x_{k+1} = x_k - \eta \, f'(x_k)$$

- $\eta$ = **taxa de aprendizado** (learning rate).
- A derivada aponta para onde a função **cresce**; por isso descemos no sentido $-f'$.
- **Gradiente ascendente** (maximização): $x_{k+1} = x_k + \eta f'(x_k)$.

Em várias variáveis (doc 05), substitui-se $f'$ pelo **gradiente** $\nabla f$.

### Implementação (1 variável)

```python
def gradiente_descendente(f_linha, x0, eta=0.1, passos=50):
    x = x0
    for _ in range(passos):
        x = x - eta * f_linha(x)
    return x

# Minimizar f(x) = (x-3)^2  -> f'(x) = 2(x-3); mínimo em x = 3
f_linha = lambda x: 2*(x - 3)
print(gradiente_descendente(f_linha, x0=0.0))   # ≈ 3.0
```

> **Atenção ao $\eta$:** muito pequeno → converge devagar; muito grande → diverge (oscila e "explode").

## 7. Laboratório com SymPy (pontos críticos)

```python
import sympy as sp
x = sp.symbols('x')
f = x**3 - 3*x

criticos = sp.solve(sp.diff(f, x), x)        # [-1, 1]
f2 = sp.diff(f, x, 2)
for c in criticos:
    tipo = "mínimo" if f2.subs(x, c) > 0 else "máximo"
    print(c, tipo, f.subs(x, c))
```

## 8. Conexão com Ciência de Dados

- **Regressão linear**: minimizar o erro quadrático $J(\theta)$ — função convexa, um único mínimo global.
- **Redes neurais**: gradiente descendente + regra da cadeia (doc 03) = *backpropagation*.
- **Concavidade** (2ª derivada / Hessiana) indica se o ponto é mínimo, máximo ou sela.

## 9. Exercícios

1. Ache e classifique os extremos de $f(x) = x^4 - 8x^2$.
2. Encontre o máximo e o mínimo global de $f(x) = x^2 - 4x$ em $[0, 3]$.
3. Implemente gradiente descendente para $f(x) = (x-5)^2 + 2$ e mostre que converge para $x=5$.
4. Experimente $\eta = 1.1$ no exercício 3 e explique o que acontece.

➡️ Próximo: [`05-derivadas-parciais.md`](05-derivadas-parciais.md)
