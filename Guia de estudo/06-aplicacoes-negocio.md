# 06 — Aplicações do Cálculo em Problemas de Negócio

> Ementa: *"Aplicações do cálculo em problemas de negócio."*

A derivada é a ferramenta da **análise marginal** — o efeito de produzir/vender **uma unidade a mais**.

## 1. Funções econômicas básicas

| Função | Símbolo | Derivada (marginal) |
|--------|---------|---------------------|
| Custo total | $C(q)$ | Custo marginal $C'(q)$ |
| Receita total | $R(q) = p \cdot q$ | Receita marginal $R'(q)$ |
| Lucro | $L(q) = R(q) - C(q)$ | Lucro marginal $L'(q)$ |

onde $q$ = quantidade produzida/vendida.

## 2. Regra de ouro do lucro máximo

O lucro é máximo quando o **lucro marginal é zero**:

$$L'(q) = 0 \implies R'(q) = C'(q)$$

> **Receita marginal = Custo marginal.** Produzir além desse ponto custa mais do que rende.

Confirma-se o máximo com $L''(q) < 0$.

## 3. Exemplo resolvido

Custo: $C(q) = 0{,}1q^2 + 5q + 200$. Preço de venda: $p = 25$/unidade.

- Receita: $R(q) = 25q$.
- Lucro: $L(q) = 25q - (0{,}1q^2 + 5q + 200) = -0{,}1q^2 + 20q - 200$.
- $L'(q) = -0{,}2q + 20 = 0 \Rightarrow q = 100$ unidades.
- $L''(q) = -0{,}2 < 0$ → é máximo. ✅
- Lucro máximo: $L(100) = -0{,}1(100)^2 + 20(100) - 200 = 800$.

## 4. Elasticidade-preço da demanda

Mede a sensibilidade da demanda $q(p)$ a variações de preço:

$$E = \frac{dq}{dp}\cdot\frac{p}{q}$$

- $|E| > 1$: demanda **elástica** (baixar preço aumenta a receita).
- $|E| < 1$: demanda **inelástica** (subir preço aumenta a receita).

## 5. Custo médio mínimo

O custo médio $\bar C(q) = C(q)/q$ é mínimo onde $\bar C'(q) = 0$, o que ocorre quando **custo marginal = custo médio**: $C'(q) = \bar C(q)$.

## 6. Laboratório (Python)

```python
import sympy as sp

q = sp.symbols('q', positive=True)
C = 0.1*q**2 + 5*q + 200
R = 25*q
L = R - C

q_otimo = sp.solve(sp.diff(L, q), q)[0]
print("q ótimo:", q_otimo)                       # 100
print("lucro máximo:", L.subs(q, q_otimo))        # 800
print("2ª derivada:", sp.diff(L, q, 2))           # -0.2 (<0 => máximo)

# Custo marginal vs custo médio
Cmed = C/q
print("min custo médio em q =", sp.solve(sp.diff(Cmed, q), q))
```

## 7. Roteiro geral de otimização em negócio

1. Modele a grandeza a otimizar (lucro, custo, receita) como função de **uma** variável de decisão.
2. Derive e iguale a zero: pontos críticos.
3. Classifique com a 2ª derivada.
4. Verifique restrições (ex.: $q \ge 0$, capacidade máxima) e os extremos do intervalo.
5. Interprete o resultado em linguagem de negócio.

## 8. Exercícios

1. $C(q) = q^2 + 10q + 50$ e preço $p = 50$. Quantas unidades maximizam o lucro?
2. Uma demanda é $q(p) = 200 - 4p$. Calcule a elasticidade em $p = 20$ e diga se é elástica.
3. Encontre o nível de produção que minimiza o custo médio de $C(q) = 2q^2 + 8q + 128$.

➡️ Próximo módulo (Integrais): [`07-integrais-definicao.md`](07-integrais-definicao.md)
