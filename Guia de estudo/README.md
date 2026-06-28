# Guia de Estudo — MAT-017 Cálculo

Guia de estudo organizado segundo a **ementa** do componente MAT-017 (Cálculo Diferencial e Integral), com foco em aplicações de **negócio** e **Ciência de Dados**, conforme os Objetivos de Aprendizagem do curso.

> **Como usar:** estude na ordem numérica. Cada documento traz: a teoria essencial, fórmulas, exemplos resolvidos, conexão com Ciência de Dados / negócio e exercícios propostos. Os trechos de código usam **Python** (NumPy / SymPy / Matplotlib), alinhados à metodologia de "prática em laboratório".

---

## Objetivos de Aprendizagem (resumo da ementa)

- Obter a derivada de uma função por diferentes métodos.
- Obter a integral de uma função e eleger técnicas adequadas.
- Aplicar integração para compreender distribuições de probabilidade.
- Usar cálculo para fundamentar decisões em problemas de Ciência de Dados.

---

## Módulo 0 — Pré-requisitos

| # | Tópico | Documento |
|---|--------|-----------|
| 00 | Funções, limites e continuidade | [`00-pre-requisitos-funcoes-limites.md`](00-pre-requisitos-funcoes-limites.md) |

## Módulo 1 — Derivadas

| # | Tópico | Documento |
|---|--------|-----------|
| 01 | Definição de derivada | [`01-derivadas-definicao.md`](01-derivadas-definicao.md) |
| 02 | Diferenciabilidade e continuidade | [`02-diferenciabilidade-continuidade.md`](02-diferenciabilidade-continuidade.md) |
| 03 | Regras de diferenciação | [`03-regras-de-diferenciacao.md`](03-regras-de-diferenciacao.md) |
| 04 | Máximos, mínimos e gradiente descendente/ascendente | [`04-maximos-minimos-gradiente.md`](04-maximos-minimos-gradiente.md) |
| 05 | Derivadas parciais | [`05-derivadas-parciais.md`](05-derivadas-parciais.md) |
| 06 | Aplicações do cálculo em problemas de negócio | [`06-aplicacoes-negocio.md`](06-aplicacoes-negocio.md) |

## Módulo 2 — Integrais

| # | Tópico | Documento |
|---|--------|-----------|
| 07 | Integral: definição e integral indefinida | [`07-integrais-definicao.md`](07-integrais-definicao.md) |
| 08 | Integral definida e Teorema do Valor Médio | [`08-integral-definida-tvm.md`](08-integral-definida-tvm.md) |
| 09 | Área de uma região no plano | [`09-area-regiao-plano.md`](09-area-regiao-plano.md) |
| 10 | Técnicas de integração | [`10-tecnicas-de-integracao.md`](10-tecnicas-de-integracao.md) |
| 11 | Integração por partes | [`11-integracao-por-partes.md`](11-integracao-por-partes.md) |
| 12 | Aplicações em Ciência de Dados (probabilidade) | [`12-aplicacoes-ciencia-de-dados.md`](12-aplicacoes-ciencia-de-dados.md) |

---

## Ambiente de laboratório (Python)

```bash
pip install numpy scipy sympy matplotlib
```

Verificação rápida:

```python
import sympy as sp
x = sp.symbols('x')
print(sp.diff(x**2, x))        # 2*x
print(sp.integrate(2*x, x))    # x**2
```

---

## Bibliografia (do plano de ensino)

**Básica**
- BOYCE, W. E. *Equações diferenciais elementares e problemas de valores de contorno*. 10ª ed. Gen-LTC, 2015.
- LEITHOLD, L. *O Cálculo com Geometria Analítica*. Harbra, 1994.
- SWOKOWSKI, E. W. *Cálculo com geometria analítica*. Vol. 1 e 2. Makron, 1994.

**Complementar**
- EWEN, D.; TOPPER, M. A. *Cálculo Técnico*. Hermus, 2000.
- FLEMMING, D. M.; GONÇALVES, M. B. *Cálculo A*. Prentice Hall Brasil, 2007.
