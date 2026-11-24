# Matriz de rastreabilidade

Liga cada requisito da seção 1.3 da [documentação técnica](../documentacao-tecnica/Documentacao_Tecnica_Plataforma_Ecosol.pdf) às histórias de usuário e aos casos de uso que o especificam e à forma de verificação. O texto de cada requisito está na documentação técnica.

Na coluna de verificação, os arquivos `test_*.py` são suítes do ecosol-backend (pasta `tests/`) e os `*.test.ts(x)`, testes do ecosol-frontend (pasta `src/`).

## Requisitos funcionais

| Requisito | Histórias de usuário | Casos de uso | Verificação |
| --- | --- | --- | --- |
| **RF01** | [HU01](historias-de-usuario.md#hu01) | — | `componentes/NumerosDaRede.test.tsx`, `componentes/AberturaDaHome.test.tsx` |
| **RF02** | [HU02](historias-de-usuario.md#hu02) | [UC01](casos-de-uso.md#uc01) | `test_api_coletivos.py`, `componentes/Paginacao.test.tsx` |
| **RF03** | [HU03](historias-de-usuario.md#hu03) | [UC01](casos-de-uso.md#uc01) | `test_api_coletivos.py`, `componentes/FormularioDeBusca.test.tsx` |
| **RF04** | [HU04](historias-de-usuario.md#hu04) | [UC01](casos-de-uso.md#uc01) | `test_api_coletivos.py`, `test_api_filtros.py`, `lib/filtros.test.ts` |
| **RF05** | [HU05](historias-de-usuario.md#hu05) | — | `test_api_coletivos.py`, `componentes/PerfilDoColetivo.test.tsx` |
| **RF06** | [HU06](historias-de-usuario.md#hu06) | [UC02](casos-de-uso.md#uc02) | `test_slug_historico.py`, `app/coletivos/[slug]/page.test.tsx` |
| **RF07** | [HU07](historias-de-usuario.md#hu07) | [UC03](casos-de-uso.md#uc03) | `test_api_eventos.py`, `lib/filtros.test.ts`, `componentes/CartaoEvento.test.tsx` |
| **RF08** | [HU08](historias-de-usuario.md#hu08) | [UC03](casos-de-uso.md#uc03) | `test_api_eventos.py`, `lib/datas.test.ts` |
| **RF09** | [HU09](historias-de-usuario.md#hu09) | — | `test_api_pontos.py`, `componentes/ListaDePontos.test.tsx` |
| **RF10** | [HU10](historias-de-usuario.md#hu10), [HU22](historias-de-usuario.md#hu22) | — | `app/saiba-mais/page.test.tsx`, `lib/casa.test.ts` |
| **RF11** | [HU11](historias-de-usuario.md#hu11) | — | `test_admin.py`; teste manual de login e logout |
| **RF12** | [HU12](historias-de-usuario.md#hu12) | [UC02](casos-de-uso.md#uc02) | `test_admin.py`, `test_models.py`, `test_imagens_e_log.py` |
| **RF13** | [HU13](historias-de-usuario.md#hu13) | — | `test_admin.py`, `test_models.py` |
| **RF14** | [HU14](historias-de-usuario.md#hu14) | — | `test_admin.py` |
| **RF15** | [HU15](historias-de-usuario.md#hu15) | [UC03](casos-de-uso.md#uc03) | `test_admin.py`, `test_models.py` |
| **RF16** | [HU16](historias-de-usuario.md#hu16) | — | `test_admin.py`, `test_models.py` |
| **RF17** | [HU17](historias-de-usuario.md#hu17), [HU18](historias-de-usuario.md#hu18) | [UC02](casos-de-uso.md#uc02) | `test_api_coletivos.py`, `test_admin.py`, `lib/contatos.test.ts` |
| **RF18** | [HU19](historias-de-usuario.md#hu19) | — | `test_admin.py`, `test_identidade_admin.py`; teste manual |
| **RF19** | [HU20](historias-de-usuario.md#hu20) | — | `test_api_coletivos.py`, `test_api_eventos.py`, `test_api_pontos.py`, `test_api_filtros.py` |
| **RF20** | [HU21](historias-de-usuario.md#hu21) | — | A criar na Sprint 3: testes dos endpoints de agregados e da restrição de acesso (ecosol-backend #56 a #59) e testes da página de Relatório (ecosol-frontend #70) |
| **RF21** | [HU22](historias-de-usuario.md#hu22) | — | A criar na Sprint 3: testes das rotas e da navegação dos subgrupos (ecosol-frontend #72 a #76) |
| **RF22** | [HU23](historias-de-usuario.md#hu23) | — | A criar na Sprint 3: testes do modelo, do Admin e do endpoint público das seções (ecosol-backend #61 a #63) |

## Regras de negócio

| Requisito | Histórias de usuário | Casos de uso | Verificação |
| --- | --- | --- | --- |
| **RN01** | [HU12](historias-de-usuario.md#hu12) | [UC02](casos-de-uso.md#uc02) | Procedimento da equipe, fora do sistema |
| **RN02** | [HU01](historias-de-usuario.md#hu01), [HU02](historias-de-usuario.md#hu02), [HU03](historias-de-usuario.md#hu03), [HU05](historias-de-usuario.md#hu05), [HU06](historias-de-usuario.md#hu06), [HU07](historias-de-usuario.md#hu07), [HU08](historias-de-usuario.md#hu08), [HU09](historias-de-usuario.md#hu09), [HU15](historias-de-usuario.md#hu15), [HU17](historias-de-usuario.md#hu17), [HU20](historias-de-usuario.md#hu20) | [UC01](casos-de-uso.md#uc01), [UC03](casos-de-uso.md#uc03) | `test_api_coletivos.py`, `test_api_eventos.py`, `test_api_pontos.py` |
| **RN03** | [HU05](historias-de-usuario.md#hu05), [HU18](historias-de-usuario.md#hu18), [HU20](historias-de-usuario.md#hu20) | [UC02](casos-de-uso.md#uc02) | `test_api_coletivos.py`, `lib/contatos.test.ts` |
| **RN04** | [HU05](historias-de-usuario.md#hu05), [HU13](historias-de-usuario.md#hu13), [HU20](historias-de-usuario.md#hu20) | — | Regressão de LGPD nas suítes `test_api_*.py` |
| **RN05** | [HU05](historias-de-usuario.md#hu05), [HU09](historias-de-usuario.md#hu09), [HU16](historias-de-usuario.md#hu16), [HU20](historias-de-usuario.md#hu20) | — | `test_api_coletivos.py`, `test_api_pontos.py` |
| **RN06** | [HU12](historias-de-usuario.md#hu12), [HU13](historias-de-usuario.md#hu13) | [UC02](casos-de-uso.md#uc02) | `test_models.py`; teste manual da exclusão bloqueada |
| **RN07** | [HU06](historias-de-usuario.md#hu06), [HU12](historias-de-usuario.md#hu12) | [UC02](casos-de-uso.md#uc02) | `test_slug_historico.py` |
| **RN08** | [HU12](historias-de-usuario.md#hu12), [HU17](historias-de-usuario.md#hu17) | [UC02](casos-de-uso.md#uc02) | `test_models.py` |
| **RN09** | [HU11](historias-de-usuario.md#hu11), [HU19](historias-de-usuario.md#hu19) | — | Teste manual |
| **RN10** | [HU01](historias-de-usuario.md#hu01), [HU07](historias-de-usuario.md#hu07), [HU15](historias-de-usuario.md#hu15) | [UC03](casos-de-uso.md#uc03) | `test_api_eventos.py` (evento em andamento e sem data de fim); restrição `evento_data_fim_apos_inicio` no banco |
| **RN11** | [HU12](historias-de-usuario.md#hu12) | [UC02](casos-de-uso.md#uc02) | `test_models.py` (limite de 5 MB); procedimento da equipe (autorização de imagem) |
| **RN12** | [HU13](historias-de-usuario.md#hu13) | — | `test_admin.py` |
| **RN13** | [HU09](historias-de-usuario.md#hu09), [HU16](historias-de-usuario.md#hu16) | — | `test_models.py` (tipo), `test_api_pontos.py`; validadores do model (coordenadas) |
| **RN14** | [HU04](historias-de-usuario.md#hu04), [HU14](historias-de-usuario.md#hu14), [HU17](historias-de-usuario.md#hu17), [HU20](historias-de-usuario.md#hu20) | [UC01](casos-de-uso.md#uc01) | `test_api_filtros.py` |

## Requisitos não funcionais

A condição de verificação de cada um está em [Requisitos não funcionais](requisitos-nao-funcionais.md). Os transversais (RNF03, RNF08, RNF09, RNF10, RNF11, RNF12, RNF13, RNF21 e RNF22) não se ligam a uma história.

| Requisito | Histórias de usuário | Casos de uso | Verificação |
| --- | --- | --- | --- |
| **RNF01** | [HU07](historias-de-usuario.md#hu07), [HU08](historias-de-usuario.md#hu08), [HU20](historias-de-usuario.md#hu20) | — | `test_api_*.py` |
| **RNF02** | [HU02](historias-de-usuario.md#hu02), [HU20](historias-de-usuario.md#hu20) | [UC01](casos-de-uso.md#uc01) | `test_api_*.py` |
| **RNF03** | — | — | Inspeção em homologação e revisão de código: nenhum componente com `"use client"` importa `lib/api.ts` |
| **RNF04** | [HU02](historias-de-usuario.md#hu02), [HU04](historias-de-usuario.md#hu04), [HU07](historias-de-usuario.md#hu07), [HU20](historias-de-usuario.md#hu20) | [UC01](casos-de-uso.md#uc01) | `test_ordenacao_estavel.py` |
| **RNF05** | [HU06](historias-de-usuario.md#hu06) | [UC02](casos-de-uso.md#uc02) | `test_slug_historico.py` e `app/coletivos/[slug]/page.test.tsx` |
| **RNF06** | [HU02](historias-de-usuario.md#hu02), [HU03](historias-de-usuario.md#hu03), [HU20](historias-de-usuario.md#hu20) | [UC01](casos-de-uso.md#uc01) | Medição em homologação, pelo tempo total da requisição |
| **RNF07** | [HU01](historias-de-usuario.md#hu01), [HU02](historias-de-usuario.md#hu02), [HU17](historias-de-usuario.md#hu17) | [UC01](casos-de-uso.md#uc01) | Revisão de `lib/api.ts` e teste manual em homologação |
| **RNF08** | — | — | Deploy após o merge e conferência das variáveis de ambiente |
| **RNF09** | — | — | Regras de proteção das branches no GitHub e CI (GitHub Actions) |
| **RNF10** | — | — | Regras de proteção da `main` e histórico de commits |
| **RNF11** | — | — | Revisão de código nos PRs |
| **RNF12** | — | — | Teste manual de instalação |
| **RNF13** | — | — | Teste manual com o PostgreSQL do ambiente Docker |
| **RNF14** | [HU09](historias-de-usuario.md#hu09) | — | Teste manual a cada release |
| **RNF15** | [HU11](historias-de-usuario.md#hu11), [HU20](historias-de-usuario.md#hu20), [HU21](historias-de-usuario.md#hu21), [HU23](historias-de-usuario.md#hu23) | — | `test_api_*.py` e `test_admin.py` |
| **RNF16** | [HU11](historias-de-usuario.md#hu11), [HU19](historias-de-usuario.md#hu19), [HU21](historias-de-usuario.md#hu21), [HU23](historias-de-usuario.md#hu23) | — | `test_identidade_admin.py` (hash da senha) e inspeção do cookie no navegador |
| **RNF17** | [HU05](historias-de-usuario.md#hu05), [HU13](historias-de-usuario.md#hu13), [HU18](historias-de-usuario.md#hu18), [HU20](historias-de-usuario.md#hu20), [HU21](historias-de-usuario.md#hu21) | — | Regressão de LGPD nas suítes `test_api_*.py`, no CI |
| **RNF18** | [HU01](historias-de-usuario.md#hu01), [HU09](historias-de-usuario.md#hu09), [HU10](historias-de-usuario.md#hu10), [HU21](historias-de-usuario.md#hu21), [HU22](historias-de-usuario.md#hu22) | — | Teste manual em celular e no modo responsivo do navegador |
| **RNF19** | [HU10](historias-de-usuario.md#hu10), [HU22](historias-de-usuario.md#hu22) | — | `componentes/ui/paleta.test.ts`, `test_identidade_admin.py` e inspeção visual |
| **RNF20** | [HU01](historias-de-usuario.md#hu01), [HU04](historias-de-usuario.md#hu04), [HU05](historias-de-usuario.md#hu05), [HU08](historias-de-usuario.md#hu08), [HU22](historias-de-usuario.md#hu22) | — | `app/sitemap.test.ts`, `app/robots.test.ts`, `app/compartilhamento.test.ts` e depurador de prévia de link |
| **RNF21** | — | — | Inspeção dos repositórios |
| **RNF22** | — | — | Arquivo `LICENSE` de cada repositório |
| **RNF23** | [HU12](historias-de-usuario.md#hu12), [HU13](historias-de-usuario.md#hu13), [HU18](historias-de-usuario.md#hu18) | [UC02](casos-de-uso.md#uc02) | `test_admin.py` e página [Privacidade e LGPD](https://github.com/Plataforma-Ecosol/ecosol-docs/wiki/Privacidade-e-LGPD) da Wiki |
| **RNF24** | [HU05](historias-de-usuario.md#hu05), [HU08](historias-de-usuario.md#hu08), [HU09](historias-de-usuario.md#hu09) | — | Auditoria de acessibilidade (Lighthouse ou axe) e teste manual por teclado |
