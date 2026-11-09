# Como contribuir com a documentação

## Fluxo

1. Atualize a `main` e crie uma branch a partir dela, com prefixo `docs/`
   (ex.: `docs/sprint-4-review`).
2. Faça as alterações e os commits no padrão
   [Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português
   (ex.: `docs: atualizar requisitos após a Sprint 4`).
3. Abra um pull request para a `main`. O PR precisa do CI verde e da aprovação de
   outra pessoa da equipe.

## Documentação técnica

- A documentação é **única e incremental**. A cada entrega, registre uma linha nova na
  tabela "Controle de versões" do `.docx` e gere o PDF de novo.
- Requisitos, diagramas e decisões precisam continuar coerentes entre si. Se um model
  do backend mudar, atualize o diagrama de classes e gere de novo o modelo lógico
  (instruções em `docs/documentacao-tecnica/README.md`).
- Os diagramas ficam versionados como fonte (`.dot`), vetor (`.svg`) e imagem (`.png`).

## Wiki

A Wiki é editada pelo próprio GitHub ou clonando `Plataforma-Ecosol/ecosol-docs.wiki.git`. Ela não
passa por PR, então decisões importantes também devem ficar registradas aqui no
repositório.

## Atenção: repositório público

Não publique dados pessoais (pessoas dos coletivos, contatos da equipe da Casa Paul
Singer), senhas, chaves ou URLs de bancos. Issues e discussões internas ficam no
repositório privado `ecosol-gestao` e no [quadro](https://github.com/orgs/Plataforma-Ecosol/projects/1).
