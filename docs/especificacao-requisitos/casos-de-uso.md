# Casos de uso

Os casos de uso complementam as [histórias de usuário](historias-de-usuario.md) cujos fluxos têm várias interações e exceções relevantes: a busca com filtros combinados e endereço compartilhável, a manutenção do coletivo com o histórico de slug e a manutenção do evento com galeria.

| Caso de uso | Histórias de usuário |
| --- | --- |
| [UC01 — Buscar e filtrar coletivos](#uc01) | [HU02](historias-de-usuario.md#hu02), [HU03](historias-de-usuario.md#hu03), [HU04](historias-de-usuario.md#hu04) |
| [UC02 — Manter coletivo](#uc02) | [HU06](historias-de-usuario.md#hu06), [HU12](historias-de-usuario.md#hu12), [HU17](historias-de-usuario.md#hu17), [HU18](historias-de-usuario.md#hu18) |
| [UC03 — Manter evento com galeria](#uc03) | [HU08](historias-de-usuario.md#hu08), [HU15](historias-de-usuario.md#hu15) |

## <a id="uc01"></a>UC01 — Buscar e filtrar coletivos

| Identificador e nome | UC01 — Buscar e filtrar coletivos |
| --- | --- |
| **Objetivo** | Permitir que o visitante encontre coletivos ativos por texto, categoria e bairro, navegue pelos resultados e compartilhe a listagem pelo endereço. |
| **Ator(es)** | Visitante (principal). API pública da plataforma (secundário). |
| **Requisitos relacionados** | RF02, RF03, RF04, RN02, RN14, RNF02, RNF04, RNF06, RNF07 |
| **Histórias de usuário** | [HU02](historias-de-usuario.md#hu02), [HU03](historias-de-usuario.md#hu03), [HU04](historias-de-usuario.md#hu04) |

**Pré-condições:**

- Nenhuma: o portal é público e não exige login.

**Fluxo principal:**

1. O visitante acessa a página de coletivos (`/coletivos`).
2. O sistema exibe a primeira página com 20 coletivos ativos em ordem alfabética, o total de resultados, o campo de busca e o painel de filtros com as categorias e os bairros em uso por coletivos ativos.
3. O visitante digita um termo de busca.
4. Quando o visitante para de digitar (ou aperta Enter), o sistema registra o termo no endereço (parâmetro `q`), mantém os filtros já escolhidos e exibe, a partir da página 1, os coletivos ativos cujo nome ou descrição contêm o termo.
5. O visitante escolhe uma ou mais categorias e um bairro.
6. O sistema registra os filtros no endereço e exibe os coletivos que atendem à busca, a todas as categorias escolhidas e ao bairro, mostrando os filtros ativos.
7. O visitante avança para outra página de resultados.
8. O sistema mantém busca e filtros e exibe a página pedida, sem repetir nem omitir coletivos.
9. O visitante abre um coletivo e o caso de uso termina (o perfil é tratado na HU05).

**Fluxos alternativos:**

- **A1 — Acesso por link compartilhado (passo 1).** O visitante abre um endereço que já contém busca, filtros e página. O sistema aplica todos eles e exibe diretamente o resultado, seguindo do passo 8.
- **A2 — Remover filtros (passo 6).** O visitante remove um filtro ativo ou, quando há dois ou mais, escolhe “Limpar tudo”. O sistema retira os filtros do endereço, mantém a busca digitada e refaz a consulta.
- **A3 — Só filtros, sem busca (passo 3).** O visitante pula a busca e vai direto ao passo 5. O sistema aplica apenas os filtros.
- **A4 — Termo de uma letra (passo 3).** O sistema não faz a busca automática até o visitante digitar a segunda letra.
- **A5 — Apagar o termo (passo 3).** O visitante apaga todo o termo. O sistema volta a mostrar todos os coletivos ativos que atendem aos filtros escolhidos.

**Fluxos de exceção:**

- **E1 — Nenhum resultado (passos 4, 6).** O sistema exibe “Nenhum coletivo encontrado.” e sugere tentar outro termo ou remover os filtros, que continuam visíveis e podem ser removidos um a um.
- **E2 — Categoria que não existe mais (A1).** O link usa o id de uma categoria excluída. O sistema exibe a listagem vazia, como em E1, sem página de erro.
- **E3 — Parâmetro inválido no endereço (A1).** O endereço tem uma categoria não numérica ou mais de 10 categorias. A API responde 400, e o portal exibe a página “Não foi possível carregar esta página”, com a opção “Tentar de novo”, sem mostrar detalhes técnicos.
- **E4 — API indisponível (qualquer passo).** O portal exibe a mesma página de erro, com a opção “Tentar de novo”. O detalhe do erro fica só no log do servidor.

**Pós-condições:**

- Nenhum dado é alterado.
- O endereço da página representa a busca, os filtros e a página exibidos e pode ser compartilhado.

## <a id="uc02"></a>UC02 — Manter coletivo

| Identificador e nome | UC02 — Manter coletivo |
| --- | --- |
| **Objetivo** | Permitir que a equipe cadastre, edite, desative e exclua coletivos, controlando o que é público e preservando os endereços já divulgados. |
| **Ator(es)** | Membro da equipe da Casa Paul Singer (principal). |
| **Requisitos relacionados** | RF06, RF12, RF17, RN01, RN03, RN06, RN07, RN08, RN11, RNF05, RNF23 |
| **Histórias de usuário** | [HU06](historias-de-usuario.md#hu06), [HU12](historias-de-usuario.md#hu12), [HU17](historias-de-usuario.md#hu17), [HU18](historias-de-usuario.md#hu18) |

**Pré-condições:**

- O membro está autenticado na área administrativa e tem permissão sobre coletivos (HU11).
- Para um cadastro novo, a equipe já entrevistou o coletivo e verificou que ele tem pelo menos 3 pessoas de pelo menos duas famílias (RN01).

**Fluxo principal:**

1. O membro abre a seção Coletivos e escolhe “Adicionar”.
2. O sistema exibe o formulário em blocos: identificação pública, contatos e autorizações, dados cadastrais, endereço, controle (ativo, situação e categorias) e observações.
3. O membro preenche nome e slug (obrigatórios) e os demais dados, e pode enviar a foto com a sua descrição para leitores de tela.
4. O membro marca quais contatos podem ser exibidos; por padrão, nenhum está autorizado.
5. O membro salva.
6. O sistema valida os dados: slug único entre os coletivos, foto de até 5 MB e e-mail e site em formato válido.
7. O sistema grava o coletivo, registra a ação no histórico da área administrativa e exibe a confirmação.
8. Se o coletivo está ativo, o portal passa a exibi-lo, com os contatos autorizados, depois do tempo de cache.

**Fluxos alternativos:**

- **A1 — Editar (passo 1).** O membro abre um coletivo existente, altera os dados e salva. O fluxo segue do passo 6.
- **A2 — Trocar o slug (A1).** O membro altera o slug. Ao gravar, o sistema guarda o slug anterior no histórico do coletivo (exibido só para leitura) e o endereço antigo passa a redirecionar para o novo: 308 no site e 301 na API.
- **A3 — Reutilizar o slug antigo de outro coletivo (A2).** O slug escolhido já foi de outro coletivo. O sistema aceita, retira esse slug do histórico do outro coletivo e o endereço passa a abrir o coletivo atual, para que um slug nunca aponte para dois coletivos.
- **A4 — Desativar ou reativar (A1).** O membro desmarca ou marca “ativo”. O coletivo sai do portal ou volta a ele, e os dados são mantidos (HU17).
- **A5 — Excluir um coletivo sem pessoas (passo 1).** O membro escolhe excluir e confirma. O sistema remove o coletivo, os seus slugs antigos e as suas associações com categorias. Pontos de interesse vinculados continuam cadastrados, sem vínculo.

**Fluxos de exceção:**

- **E1 — Slug em uso (passo 6).** Outro coletivo já usa o slug. O sistema indica o erro no campo e não grava nada.
- **E2 — Foto acima de 5 MB (passo 6).** O sistema recusa com uma mensagem que informa o tamanho enviado, como “A foto tem 7,0 MB. O limite é 5 MB.”, e não grava nada.
- **E3 — Campo obrigatório vazio ou formato inválido (passo 6).** O sistema indica cada campo com problema e mantém o que foi digitado no formulário, exceto o arquivo da foto, que precisa ser escolhido de novo.
- **E4 — Excluir um coletivo com pessoas (A5).** O sistema mostra as pessoas vinculadas e impede a exclusão. O membro precisa antes mover essas pessoas para outro coletivo ou excluí-las.
- **E5 — Sessão expirada (passo 5).** O sistema leva o membro à tela de login e não grava a alteração.

**Pós-condições:**

- O coletivo fica gravado, alterado ou excluído conforme o fluxo seguido.
- A ação fica registrada no histórico da área administrativa.
- Os endereços já divulgados continuam funcionando, exceto quando o coletivo está inativo ou foi excluído.

## <a id="uc03"></a>UC03 — Manter evento com galeria

| Identificador e nome | UC03 — Manter evento com galeria |
| --- | --- |
| **Objetivo** | Permitir que a equipe cadastre e mantenha os eventos da agenda, com uma galeria de imagens em ordem definida. |
| **Ator(es)** | Membro da equipe da Casa Paul Singer (principal). |
| **Requisitos relacionados** | RF07, RF08, RF15, RN02, RN10 |
| **Histórias de usuário** | [HU08](historias-de-usuario.md#hu08), [HU15](historias-de-usuario.md#hu15) |

**Pré-condições:**

- O membro está autenticado na área administrativa e tem permissão sobre eventos (HU11).

**Fluxo principal:**

1. O membro abre a seção Eventos e escolhe “Adicionar”.
2. O membro preenche título, slug, data e hora de início e, se quiser, data e hora de fim, local, bairro, descrição e link, e marca o evento como ativo.
3. No bloco da galeria, o membro adiciona imagens, cada uma com legenda e número de ordem.
4. O membro salva.
5. O sistema valida os dados: slug único, fim igual ou posterior ao início e arquivos de imagem válidos.
6. O sistema grava o evento e as imagens e exibe a confirmação.
7. O evento aparece na aba “Próximos” da agenda até terminar e, depois, em “Já aconteceram”. A sua página mostra a galeria na ordem definida.

**Fluxos alternativos:**

- **A1 — Reordenar ou remover imagens (passo 3).** Ao editar o evento, o membro muda os números de ordem ou remove imagens e salva. A página pública passa a refletir a nova galeria.
- **A2 — Mudar as datas (passo 2).** O membro altera início ou fim. O evento muda de aba sozinho quando passa a estar, ou deixa de estar, em aberto.
- **A3 — Desativar (passo 2).** O membro desmarca “ativo”. O evento sai da agenda e a sua página responde 404.
- **A4 — Excluir (passo 1).** O membro exclui o evento e confirma. O sistema remove o evento e as imagens da galeria.
- **A5 — Trocar o slug de um evento já divulgado (passo 2).** O sistema aceita, mas o endereço antigo passa a responder 404: ao contrário dos coletivos (RN07), eventos não guardam histórico de slug, porque o link de um evento só circula enquanto ele é divulgado. Por isso, o slug deve ser definido antes da divulgação.

**Fluxos de exceção:**

- **E1 — Fim antes do início (passo 5).** O sistema recusa o cadastro e não grava nada. A mensagem deve explicar que o fim não pode ser anterior ao início (ver as [pendências da revisão](revisao-dos-requisitos.md#pendencias)).
- **E2 — Slug em uso (passo 5).** O sistema indica o erro no campo slug e não grava nada.
- **E3 — Arquivo que não é imagem (passo 5).** O sistema recusa o arquivo na linha da galeria correspondente.

**Pós-condições:**

- O evento e a sua galeria ficam gravados, alterados ou excluídos.
- A agenda pública reflete a mudança depois do tempo de cache.
