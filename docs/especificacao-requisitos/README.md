# Especificação dos requisitos

Especificação detalhada dos requisitos da Plataforma Ecosol, feita na AV2 do Projeto Integrador de Engenharia de Software. Ela parte dos requisitos funcionais (RF), dos não funcionais (RNF) e das regras de negócio (RN) da seção 1.3 da [documentação técnica](../documentacao-tecnica/Documentacao_Tecnica_Plataforma_Ecosol.pdf), mantém os mesmos códigos e orienta a implementação e os testes da aplicação.

| Documento | Conteúdo |
| --- | --- |
| [Revisão dos requisitos](revisao-dos-requisitos.md) | Requisitos ajustados antes da especificação e o motivo de cada ajuste, prioridade do MVP e pendências |
| [Histórias de usuário](historias-de-usuario.md) | HU01 a HU23, com critérios de aceitação no formato Dado / Quando / Então |
| [Casos de uso](casos-de-uso.md) | UC01 a UC03, para os fluxos com mais interações e exceções |
| [Requisitos não funcionais](requisitos-nao-funcionais.md) | Condição de verificação de cada RNF, com os requisitos transversais à parte |
| [Matriz de rastreabilidade](matriz-de-rastreabilidade.md) | Ligação entre cada requisito, as histórias, os casos de uso e a verificação |
| [Especificação em PDF](Especificacao_Requisitos_Plataforma_Ecosol.pdf) | Os documentos acima reunidos em um só arquivo, no padrão visual da documentação técnica, para a entrega |

## Cobertura

Os 60 requisitos da documentação técnica (22 RF, 24 RNF e 14 RN) estão cobertos: cada RF e cada RN está em pelo menos uma história de usuário, e cada RNF tem uma condição de verificação. RF01 a RF19 formam o MVP, já entregue. RF20 a RF22 (HU21 a HU23) entraram na versão 1.3 da documentação técnica e serão implementados na Sprint 3 (Release 3), conforme o [Plano do Projeto](https://github.com/Plataforma-Ecosol/ecosol-docs/wiki/Plano-do-Projeto).

## Convenções

- **Perfis:** o visitante do portal (Público Geral, sem login), o membro da equipe da Casa Paul Singer (Administrador, com acesso à área administrativa) e, na HU20, quem desenvolve um cliente da API.
- **Critérios de aceitação:** cenários no formato **Dado / Quando / Então**, em que **E** continua o passo anterior. Cada história tem também cenários alternativos e inválidos.
- **Exemplos:** nomes de coletivos, bairros e datas são fictícios, como os dados do ambiente de homologação.
- **Base:** os critérios de HU01 a HU20 foram conferidos com a branch `staging` do backend e do frontend em novembro de 2026. O que o sistema ainda não atende está nas [pendências da revisão](revisao-dos-requisitos.md#pendencias). HU21 a HU23 descrevem funcionalidades planejadas e serão conferidas ao fim da Sprint 3.

## Como manter

Ao mudar um requisito, atualize a seção 1.3 da documentação técnica (com uma linha nova no controle de versões), as histórias e os casos de uso afetados e a matriz de rastreabilidade. Depois, gere o PDF de novo com `node docs/especificacao-requisitos/fonte/gerar_pdf.js`; as dependências estão no início do script.
