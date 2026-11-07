# Guia P2 · Cálculo (MAT-017) — 2º bimestre

Site de estudo para a P2: cada atividade do 2º bimestre resolvida **passo a passo**, como se você tivesse perguntado a uma IA
*"Me ajude a resolver essa atividade passo-a-passo"*. Dá para escolher entre três níveis de explicação.

| Nível | O que mostra |
|---|---|
| **Normal** | passos curtos até a resposta |
| **Normal + infos** | + o *porquê* de cada passo (qual regra e por que ela serve) + o erro mais comum |
| **Detalhado** | + todas as contas intermediárias (expoentes, frações, sinais) + como conferir |

Nada da resolução aparece sozinho: o item abre só com a pergunta, e o aluno toca em **Passo a passo**, **Resolução completa**
ou **Só a resposta**. Visual inspirado no iOS (abas, listas agrupadas, balões estilo iMessage), com tema claro e escuro.

Também tem:
- **Simulado P2** (aba própria): 4 questões, 12 pontos com os pesos da P1 (Q1 a,b = 3 · Q2 = 2 · Q3 a,b = 4 · Q4 a,b = 3),
  questões e gabaritos tirados de listas publicadas (IME-USP e OpenStax), com a referência em cada item; cronômetro,
  versão para imprimir e correção com nota (Acertei / Meio certo / Errei);
- formulário só com o que caiu no bimestre, gráfico interativo de $f$ e da derivada (libera depois da resposta),
  progresso salvo no navegador ("Entendi"), filtro por regra e avisos sobre erros no gabarito do professor.

## O que está no guia

Mapeado de [`../Tarefas/tarefas_bimestre.txt`](../Tarefas/tarefas_bimestre.txt):

| Tarefa | Material | Exercícios | Assunto |
|---|---|---|---|
| 006 | 003 | Ex. 1 (a–c), Ex. 2 (a–f), Ex. 5 (d–f), Ex. 6 (a–d) | Tabela de derivadas: potências e raízes |
| 007 | 003 | Ex. 14 e Ex. 15 | Regras: soma, constante, produto, quociente |
| 007 | 004 | Ex. 1 completo | Regra da cadeia |
| 008 | 005 | Ex. 1 (a–f), Ex. 2 (a–i) | Notações e derivada de 2ª ordem |

## Abrir no computador

Não precisa instalar nada: abra o `index.html` no navegador (as fórmulas vêm do KaTeX via CDN, então precisa de internet).

## Publicar no GitHub Pages

O workflow [`.github/workflows/guia-p2-pages.yml`](../../.github/workflows/guia-p2-pages.yml) verifica o conteúdo e publica esta pasta.

1. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (uma vez só).
2. Faça push para `main` alterando algo em `2-Bimestre/guia-p2/` (ou rode o workflow manualmente em **Actions**).
3. O endereço fica `https://<organização-ou-usuário>.github.io/MAT-017-Calculo/`.

## Estrutura

```
guia-p2/
├── index.html
├── css/style.css
├── js/registro.js      # registro do conteúdo, macros do KaTeX e avaliador das expressões
├── js/app.js           # rotas, conversa em 3 níveis, progresso
├── js/grafico.js       # gráfico interativo (canvas)
├── data/formulario.js  # formulário (Materiais 003, 004, 005)
├── data/t006.js        # Tarefa 006
├── data/t007-m3.js     # Tarefa 007, parte 1 (Material 003)
├── data/t007-m4.js     # Tarefa 007, parte 2 (Material 004)
├── data/t008.js        # Tarefa 008
├── data/simulado.js    # Simulado P2 (12 pts, questões com referência)
└── tools/
    ├── verificar.mjs       # checa estrutura, respostas (derivada numérica) e LaTeX
    └── exemplo-grupo.js    # modelo para escrever conteúdo novo
```

Cada item tem `f` (a função) e `resp` (a resposta) como expressões JavaScript. O verificador compara `resp` com a derivada
**numérica** de `f` em vários pontos, então um gabarito errado é pego automaticamente.

```bash
cd 2-Bimestre/guia-p2
node tools/verificar.mjs                 # estrutura + respostas
KATEX_PATH=/caminho/node_modules/katex node tools/verificar.mjs   # + valida o LaTeX
```

Para corrigir ou acrescentar um item, edite o arquivo da tarefa em `data/` seguindo o modelo `tools/exemplo-grupo.js` e rode o verificador.
