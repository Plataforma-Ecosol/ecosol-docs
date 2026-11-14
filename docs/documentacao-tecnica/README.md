# Documentação Técnica do Projeto Integrador (Engenharia de Software)

Documento único e incremental da Plataforma Ecosol, no template do IFRJ Campus Niterói.

| Arquivo | O que é |
| --- | --- |
| `Documentacao_Tecnica_Plataforma_Ecosol.docx` | Versão editável (registre cada mudança na tabela de controle de versões) |
| `Documentacao_Tecnica_Plataforma_Ecosol.pdf` | Versão para entrega |
| `diagramas/` | C4 níveis 1 e 2 (diagrams.net), diagrama de classes e modelo lógico (Graphviz) |
| `fonte/` | Scripts que geram o modelo lógico a partir dos models do Django |

## Diagramas C4 (diagrams.net)

Os diagramas de contexto (`c4-nivel1-contexto`) e de contêineres (`c4-nivel2-conteineres`) são editados no [diagrams.net](https://app.diagrams.net), com a biblioteca C4.

- `.drawio`: arquivo editável. Abra em **Arquivo → Abrir de → Este dispositivo** ou **Abrir de → GitHub**.
- `.drawio.png`: imagem usada na documentação e na Wiki. Ela guarda o diagrama dentro de si, então também abre editável no diagrams.net.

Ao alterar um diagrama, salve o `.drawio` e exporte de novo o `.drawio.png` (**Arquivo → Exportar como → PNG**, com "Incluir uma cópia do meu diagrama" marcado e zoom de 200%). Depois troque a figura no `.docx` e gere o PDF.

## Diagrama de classes e modelo lógico (Graphviz)

Precisa do Graphviz (`dot`/`neato`).

```bash
cd diagramas
dot -Tsvg diagrama-classes.dot -o diagrama-classes.svg
```

O modelo lógico sai dos models reais do backend (rode a partir de um clone do `ecosol-backend` com as dependências instaladas):

```bash
python fonte/schema.py /caminho/ecosol-backend > schema.json
python fonte/gerar_modelo_logico.py schema.json diagramas/modelo-logico.dot fixo
neato -n2 -Tsvg diagramas/modelo-logico.dot -o diagramas/modelo-logico.svg
```

Ao mudar um model, atualize o diagrama de classes (`diagrama-classes.dot`) e regenere o modelo lógico.
