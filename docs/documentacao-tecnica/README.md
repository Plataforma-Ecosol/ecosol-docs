# Documentação Técnica do Projeto Integrador (Engenharia de Software)

Documento único e incremental da Plataforma Ecosol, no template do IFRJ Campus Niterói.

| Arquivo | O que é |
| --- | --- |
| `Documentacao_Tecnica_Plataforma_Ecosol.docx` | Versão editável (registre cada mudança na tabela de controle de versões) |
| `Documentacao_Tecnica_Plataforma_Ecosol.pdf` | Versão para entrega |
| `diagramas/` | C4 níveis 1 e 2, diagrama de classes e modelo lógico (fonte `.dot`, `.svg` vetorial e `.png`) |
| `fonte/` | Scripts que geram o modelo lógico a partir dos models do Django e o `.docx` |

## Regenerar os diagramas

Precisa do Graphviz (`dot`/`neato`).

```bash
cd diagramas
dot -Tsvg c4-nivel1-contexto.dot -o c4-nivel1-contexto.svg
dot -Tsvg c4-nivel2-conteineres.dot -o c4-nivel2-conteineres.svg
dot -Tsvg diagrama-classes.dot -o diagrama-classes.svg
```

O modelo lógico sai dos models reais do backend (rode a partir de um clone do `ecosol-backend` com as dependências instaladas):

```bash
python fonte/schema.py /caminho/ecosol-backend > schema.json
python fonte/gerar_modelo_logico.py schema.json diagramas/modelo-logico.dot fixo
neato -n2 -Tsvg diagramas/modelo-logico.dot -o diagramas/modelo-logico.svg
```

Ao mudar um model, atualize o diagrama de classes (`diagrama-classes.dot`) e regenere o modelo lógico.
