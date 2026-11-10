# Requisitos não funcionais

Condição de verificação de cada requisito não funcional (RNF) da seção 1.3 da [documentação técnica](../documentacao-tecnica/Documentacao_Tecnica_Plataforma_Ecosol.pdf), onde está o texto de cada requisito. Os arquivos `test_*.py` ficam na pasta `tests/` do ecosol-backend, e os `*.test.ts(x)`, na pasta `src/` do ecosol-frontend; todos rodam no CI do repositório.

## Requisitos transversais

Valem para o sistema inteiro ou para o processo de desenvolvimento e não se ligam a uma funcionalidade específica, por isso ficam documentados só aqui.

| Requisito | Condição de verificação | Onde é verificado |
| --- | --- | --- |
| **RNF03** | Nenhum componente do navegador chama a API: com as ferramentas do navegador abertas, não há requisições ao domínio da API ao navegar pelo portal. | Inspeção em homologação e revisão de código: nenhum componente com `"use client"` importa `lib/api.ts` |
| **RNF08** | Um merge na `staging` publica a homologação, que usa banco e armazenamento próprios e só dados fictícios. | Deploy após o merge e conferência das variáveis de ambiente |
| **RNF09** | Um PR com um teste falhando não pode ser mesclado em `staging` nem em `main`. | Regras de proteção das branches no GitHub e CI (GitHub Actions) |
| **RNF10** | A `main` só recebe código por PR aprovado por outra pessoa; os commits seguem Conventional Commits. | Regras de proteção da `main` e histórico de commits |
| **RNF11** | Código, mensagens e documentação estão em português. | Revisão de código nos PRs |
| **RNF12** | Em uma máquina limpa com Docker, um único comando no ecosol-infra sobe banco, API e portal; `/health/` responde “ok” e o portal abre. | Teste manual de instalação |
| **RNF13** | Trocar a variável de conexão por outro PostgreSQL e rodar migrations e testes funciona sem alterar código. | Teste manual com o PostgreSQL do ambiente Docker |
| **RNF21** | Backend em Django e DRF, portal em Next.js com TypeScript, banco PostgreSQL. | Inspeção dos repositórios |
| **RNF22** | Todos os repositórios têm a licença GNU GPLv3. | Arquivo `LICENSE` de cada repositório |

## Requisitos ligados a funcionalidades

Também aparecem nos critérios de aceitação das histórias indicadas.

| Requisito | Condição de verificação | Onde é verificado | Histórias |
| --- | --- | --- | --- |
| **RNF01** | Toda resposta da API é JSON, com chaves em snake_case e datas e horas em ISO 8601 com fuso. | `test_api_*.py` | [HU07](historias-de-usuario.md#hu07), [HU08](historias-de-usuario.md#hu08), [HU20](historias-de-usuario.md#hu20) |
| **RNF02** | Listagens trazem `count`, `next`, `previous` e `results`; 20 itens por padrão; `page_size` acima de 100 é limitado a 100. | `test_api_*.py` | [HU02](historias-de-usuario.md#hu02), [HU20](historias-de-usuario.md#hu20) |
| **RNF04** | Percorrer todas as páginas de uma listagem com empates na ordenação não repete nem perde registros. | `test_ordenacao_estavel.py` | [HU02](historias-de-usuario.md#hu02), [HU04](historias-de-usuario.md#hu04), [HU07](historias-de-usuario.md#hu07), [HU20](historias-de-usuario.md#hu20) |
| **RNF05** | Slug antigo responde 301 na API e 308 no site, apontando para o endereço atual. | `test_slug_historico.py` e `app/coletivos/[slug]/page.test.tsx` | [HU06](historias-de-usuario.md#hu06) |
| **RNF06** | Listagens de 20 itens respondem em menos de 500 ms (mediana de 10 medições, descartando a primeira requisição após o servidor “acordar”). | Medição em homologação, pelo tempo total da requisição | [HU02](historias-de-usuario.md#hu02), [HU03](historias-de-usuario.md#hu03), [HU20](historias-de-usuario.md#hu20) |
| **RNF07** | Uma alteração na área administrativa aparece no portal em até 60 s nas listagens e em até 300 s nas páginas de detalhe. | Revisão de `lib/api.ts` e teste manual em homologação | [HU01](historias-de-usuario.md#hu01), [HU02](historias-de-usuario.md#hu02), [HU17](historias-de-usuario.md#hu17) |
| **RNF14** | As tarefas das HU01 a HU10 são concluídas nas versões atuais de Chrome, Firefox, Safari e Edge, em computador e celular. | Teste manual a cada release | [HU09](historias-de-usuario.md#hu09) |
| **RNF15** | Escrita na API retorna 405; área administrativa sem sessão leva ao login. | `test_api_*.py` e `test_admin.py` | [HU11](historias-de-usuario.md#hu11), [HU20](historias-de-usuario.md#hu20) |
| **RNF16** | Em homologação, o cookie de sessão tem HttpOnly e Secure; no banco, a senha aparece só como hash (`pbkdf2_sha256$…`). | `test_identidade_admin.py` (hash da senha) e inspeção do cookie no navegador | [HU11](historias-de-usuario.md#hu11), [HU19](historias-de-usuario.md#hu19) |
| **RNF17** | Nenhuma resposta pública contém dados de pessoas, endereço completo, dados cadastrais ou contatos não autorizados. | Regressão de LGPD nas suítes `test_api_*.py`, no CI | [HU05](historias-de-usuario.md#hu05), [HU13](historias-de-usuario.md#hu13), [HU18](historias-de-usuario.md#hu18), [HU20](historias-de-usuario.md#hu20) |
| **RNF18** | Em 360 px de largura, as páginas públicas não têm rolagem horizontal e as tarefas das HU01 a HU10 são concluídas. | Teste manual em celular e no modo responsivo do navegador | [HU01](historias-de-usuario.md#hu01), [HU09](historias-de-usuario.md#hu09), [HU10](historias-de-usuario.md#hu10) |
| **RNF19** | Portal e área administrativa usam #33469B, #BD9D55 e #F6F0DC e a logo da Casa Azul. | `componentes/ui/paleta.test.ts`, `test_identidade_admin.py` e inspeção visual | [HU10](historias-de-usuario.md#hu10) |
| **RNF20** | Páginas públicas renderizadas no servidor, com metadados e prévia de link; sitemap e robots válidos; homologação não indexável. | `app/sitemap.test.ts`, `app/robots.test.ts`, `app/compartilhamento.test.ts` e depurador de prévia de link | [HU01](historias-de-usuario.md#hu01), [HU04](historias-de-usuario.md#hu04), [HU05](historias-de-usuario.md#hu05), [HU08](historias-de-usuario.md#hu08) |
| **RNF23** | Campos sensíveis não são coluna, filtro nem busca na área administrativa; base legal, retenção e atendimento aos titulares documentados antes do primeiro dado real. | `test_admin.py` e página [Privacidade e LGPD](https://github.com/Plataforma-Ecosol/ecosol-docs/wiki/Privacidade-e-LGPD) da Wiki | [HU12](historias-de-usuario.md#hu12), [HU13](historias-de-usuario.md#hu13), [HU18](historias-de-usuario.md#hu18) |
| **RNF24** | Imagens têm texto alternativo, controles têm rótulo para leitor de tela e as páginas públicas são navegáveis por teclado. | Auditoria de acessibilidade (Lighthouse ou axe) e teste manual por teclado | [HU05](historias-de-usuario.md#hu05), [HU08](historias-de-usuario.md#hu08), [HU09](historias-de-usuario.md#hu09) |
