# Histórias de usuário

Histórias da Plataforma Ecosol agrupadas por módulo, com critérios de aceitação no formato Dado / Quando / Então. Os códigos de requisito são os da seção 1.3 da [documentação técnica](../documentacao-tecnica/Documentacao_Tecnica_Plataforma_Ecosol.pdf). Os fluxos mais complexos têm também um [caso de uso](casos-de-uso.md).

| História | Título | Requisitos funcionais |
| --- | --- | --- |
| [HU01](#hu01) | Ver a página inicial da rede | RF01 |
| [HU02](#hu02) | Listar os coletivos da rede | RF02 |
| [HU03](#hu03) | Buscar coletivos por texto | RF03 |
| [HU04](#hu04) | Filtrar coletivos e compartilhar a listagem | RF04 |
| [HU05](#hu05) | Ver o perfil público de um coletivo | RF05 |
| [HU06](#hu06) | Acessar um coletivo por um endereço antigo | RF06 |
| [HU07](#hu07) | Consultar a agenda de eventos | RF07 |
| [HU08](#hu08) | Ver a página de um evento | RF08 |
| [HU09](#hu09) | Ver o mapa dos pontos da Economia Solidária | RF09 |
| [HU10](#hu10) | Conhecer a Casa Paul Singer (“Saiba mais”) | RF10 |
| [HU11](#hu11) | Entrar e sair da área administrativa | RF11 |
| [HU12](#hu12) | Cadastrar e manter coletivos | RF12 |
| [HU13](#hu13) | Cadastrar e manter as pessoas dos coletivos | RF13 |
| [HU14](#hu14) | Manter categorias | RF14 |
| [HU15](#hu15) | Manter eventos e sua galeria | RF15 |
| [HU16](#hu16) | Manter pontos de interesse | RF16 |
| [HU17](#hu17) | Controlar o que fica público | RF17 |
| [HU18](#hu18) | Autorizar a exibição dos contatos de um coletivo | RF17 |
| [HU19](#hu19) | Gerenciar as contas da equipe | RF18 |
| [HU20](#hu20) | Consultar os dados da rede pela API pública | RF19 |

## Portal público

### <a id="hu01"></a>HU01 — Ver a página inicial da rede

| Identificador | HU01 |
| --- | --- |
| **Título** | Ver a página inicial da rede |
| **Descrição** | Como visitante do portal (sem login), quero ver na página inicial os números da rede, alguns coletivos e os próximos eventos, para ter uma visão rápida da Economia Solidária de Niterói e decidir o que explorar. |
| **Requisitos relacionados** | RF01, RN02, RN10, RNF07, RNF18, RNF20 |

**Critérios de aceitação:**

- **Cenário 1 — Página inicial completa**
  - **Dado** que existem coletivos, pontos de interesse e eventos ativos
  - **Quando** o visitante acessa a página inicial (`/`)
  - **Então** o sistema exibe a apresentação da rede, o total de coletivos ativos, de pontos no mapa e de próximos eventos, os seis primeiros coletivos ativos em ordem alfabética e os três próximos eventos, cada item com link para a sua página
- **Cenário 2 — Registros fora do ar**
  - **Dado** que um coletivo ou um evento está inativo
  - **Quando** a página inicial é carregada
  - **Então** ele não aparece nos destaques nem nos próximos eventos
  - **E** não entra nos totais
- **Cenário 3 — Evento em andamento**
  - **Dado** que uma feira começou ontem e termina amanhã
  - **Quando** o visitante acessa a página inicial hoje
  - **Então** a feira aparece entre os próximos eventos
- **Cenário 4 — Rede sem eventos próximos**
  - **Dado** que nenhum evento ativo está por vir ou em andamento
  - **Quando** o visitante acessa a página inicial
  - **Então** a seção de próximos eventos não aparece
  - **E** o total de próximos eventos não é exibido, pois os números iguais a zero ficam ocultos
- **Cenário 5 — Prévia ao compartilhar**
  - **Dado** que o endereço da página inicial é colado no WhatsApp ou em outra rede social
  - **Quando** a rede monta a prévia do link
  - **Então** a prévia mostra o título, a descrição e a imagem da plataforma

### <a id="hu02"></a>HU02 — Listar os coletivos da rede

| Identificador | HU02 |
| --- | --- |
| **Título** | Listar os coletivos da rede |
| **Descrição** | Como visitante do portal (sem login), quero navegar pela lista de coletivos ativos, para conhecer quem faz parte da rede. |
| **Requisitos relacionados** | RF02, RN02, RNF02, RNF04, RNF06, RNF07 |
| **Caso de uso** | [UC01](casos-de-uso.md#uc01) |

**Critérios de aceitação:**

- **Cenário 1 — Primeira página**
  - **Dado** que existem 45 coletivos ativos
  - **Quando** o visitante acessa `/coletivos`
  - **Então** o sistema exibe os 20 primeiros em ordem alfabética, cada um com nome, foto (ou as iniciais do nome, se não houver foto), categorias e bairro
  - **E** mostra o total de coletivos e os controles de paginação
- **Cenário 2 — Paginação sem perdas**
  - **Dado** que existem 45 coletivos ativos
  - **Quando** o visitante percorre as páginas 1, 2 e 3
  - **Então** vê 20, 20 e 5 coletivos, sem nenhum repetido e sem nenhum faltando
- **Cenário 3 — Coletivo fora do ar**
  - **Dado** que a equipe desativou um coletivo
  - **Quando** a listagem é carregada depois do tempo de cache (até 60 segundos)
  - **Então** o coletivo não aparece na lista nem na contagem

### <a id="hu03"></a>HU03 — Buscar coletivos por texto

| Identificador | HU03 |
| --- | --- |
| **Título** | Buscar coletivos por texto |
| **Descrição** | Como visitante do portal (sem login), quero buscar coletivos por uma palavra, para encontrar rapidamente o que procuro. |
| **Requisitos relacionados** | RF03, RN02, RNF06 |
| **Caso de uso** | [UC01](casos-de-uso.md#uc01) |

**Critérios de aceitação:**

- **Cenário 1 — Termo no nome ou na descrição**
  - **Dado** o coletivo ativo “Pão da Terra” e outro coletivo ativo cuja descrição menciona “pão de fermentação natural”
  - **Quando** o visitante busca “pão”
  - **Então** os dois aparecem no resultado
  - **E** coletivos sem o termo no nome nem na descrição não aparecem
- **Cenário 2 — Maiúsculas e minúsculas**
  - **Dado** o coletivo ativo “Pão da Terra”
  - **Quando** o visitante busca “TERRA”
  - **Então** o coletivo aparece, pois a busca não diferencia maiúsculas de minúsculas
- **Cenário 3 — Busca enquanto digita**
  - **Dado** o visitante na listagem de coletivos
  - **Quando** digita “pão” e para de digitar, sem apertar Enter
  - **Então** o resultado se atualiza sozinho
  - **E** o termo passa para o endereço da página (`?q=pão`)
- **Cenário 4 — Termo de uma letra**
  - **Dado** o visitante na listagem de coletivos
  - **Quando** digita só a letra “p”
  - **Então** a busca automática não é feita, e o sistema espera a segunda letra
- **Cenário 5 — Apagar a busca**
  - **Dado** uma listagem filtrada pelo termo “pão”
  - **Quando** o visitante apaga todo o termo
  - **Então** a listagem volta a mostrar todos os coletivos ativos
- **Cenário 6 — Nenhum resultado**
  - **Dado** que nenhum coletivo ativo contém o termo “xyzabc”
  - **Quando** o visitante faz a busca
  - **Então** o sistema exibe “Nenhum coletivo encontrado.”
  - **E** sugere tentar outro termo ou remover os filtros
- **Cenário 7 — Coletivo inativo**
  - **Dado** um coletivo inativo cujo nome contém o termo buscado
  - **Quando** o visitante faz a busca
  - **Então** o coletivo inativo não aparece

### <a id="hu04"></a>HU04 — Filtrar coletivos e compartilhar a listagem

| Identificador | HU04 |
| --- | --- |
| **Título** | Filtrar coletivos e compartilhar a listagem |
| **Descrição** | Como visitante do portal (sem login), quero filtrar os coletivos por categoria e bairro e compartilhar o endereço da listagem filtrada, para achar coletivos do tipo e do lugar que me interessam e mandar essa lista a outra pessoa. |
| **Requisitos relacionados** | RF04, RN14, RNF04, RNF20 |
| **Caso de uso** | [UC01](casos-de-uso.md#uc01) |

**Critérios de aceitação:**

- **Cenário 1 — Categoria e bairro**
  - **Dado** coletivos ativos de “Alimentação” no Fonseca e de “Artesanato” no Centro
  - **Quando** o visitante escolhe a categoria “Alimentação” e o bairro “Fonseca”
  - **Então** aparecem apenas coletivos de Alimentação localizados no Fonseca
- **Cenário 2 — Várias categorias (“e”)**
  - **Dado** um coletivo ativo em “Alimentação” e “Agroecologia” e outro só em “Alimentação”
  - **Quando** o visitante escolhe as duas categorias
  - **Então** aparece apenas o coletivo que está nas duas
- **Cenário 3 — Endereço compartilhável**
  - **Dado** que o visitante buscou “pão”, escolheu uma categoria e foi para a página 2
  - **Quando** copia o endereço e outra pessoa o abre em outro aparelho
  - **Então** ela vê a mesma busca, os mesmos filtros e a mesma página
- **Cenário 4 — Opções de filtro**
  - **Dado** que o bairro “Ingá” só tem coletivos inativos e que uma categoria não tem nenhum coletivo ativo
  - **Quando** o visitante abre o painel de filtros
  - **Então** nem “Ingá” nem essa categoria aparecem como opção
- **Cenário 5 — Categoria que deixou de existir**
  - **Dado** um link compartilhado com o filtro de uma categoria que a equipe excluiu
  - **Quando** o link é aberto
  - **Então** a listagem aparece vazia, com a mensagem de nenhum resultado, sem página de erro
- **Cenário 6 — Remover filtro**
  - **Dado** uma listagem com os filtros de categoria e de bairro ativos
  - **Quando** o visitante remove o filtro de bairro
  - **Então** o bairro sai do endereço e a lista passa a considerar só a categoria
- **Cenário 7 — Limpar tudo**
  - **Dado** uma busca por “pão” com uma categoria e um bairro ativos
  - **Quando** o visitante escolhe “Limpar tudo”, opção que aparece com dois filtros ou mais
  - **Então** categoria e bairro saem do endereço
  - **E** a busca por “pão” continua aplicada

### <a id="hu05"></a>HU05 — Ver o perfil público de um coletivo

| Identificador | HU05 |
| --- | --- |
| **Título** | Ver o perfil público de um coletivo |
| **Descrição** | Como visitante do portal (sem login), quero abrir a página de um coletivo, para saber o que ele faz, onde atua e como entrar em contato. |
| **Requisitos relacionados** | RF05, RN02, RN03, RN04, RN05, RNF17, RNF20, RNF24 |

**Critérios de aceitação:**

- **Cenário 1 — Perfil completo**
  - **Dado** o coletivo ativo com slug “sementes-do-vale”
  - **Quando** o visitante acessa `/coletivos/sementes-do-vale`
  - **Então** vê nome, foto com texto alternativo, categorias, descrição, bairro, site e os contatos autorizados
- **Cenário 2 — Só contatos autorizados**
  - **Dado** que o telefone do coletivo está autorizado e o e-mail e o Instagram não
  - **Quando** o perfil é exibido
  - **Então** só o telefone aparece
  - **E** o e-mail e o Instagram não aparecem na página nem na resposta da API, onde o campo é omitido e não enviado vazio
- **Cenário 3 — Dados internos protegidos**
  - **Dado** que o coletivo tem endereço completo, CNPJ, dados cadastrais e pessoas cadastradas
  - **Quando** o perfil é exibido
  - **Então** nenhum desses dados aparece: do endereço, só o bairro
- **Cenário 4 — Coletivo inativo ou inexistente**
  - **Dado** um coletivo inativo, ou um slug que nunca existiu
  - **Quando** o visitante acessa o endereço
  - **Então** o sistema exibe a página “Página não encontrada”, com status 404
- **Cenário 5 — Prévia ao compartilhar**
  - **Dado** o perfil de um coletivo ativo
  - **Quando** o endereço é compartilhado em uma rede social
  - **Então** a prévia mostra o nome do coletivo, o início da sua descrição (até 160 caracteres) e a imagem padrão de compartilhamento da plataforma, e não a foto do coletivo

### <a id="hu06"></a>HU06 — Acessar um coletivo por um endereço antigo

| Identificador | HU06 |
| --- | --- |
| **Título** | Acessar um coletivo por um endereço antigo |
| **Descrição** | Como visitante do portal (sem login) que recebeu um link antigo de um coletivo, quero ser levado ao endereço atual, para não perder o acesso ao perfil depois que a equipe trocar o slug. |
| **Requisitos relacionados** | RF06, RN02, RN07, RNF05 |
| **Caso de uso** | [UC02](casos-de-uso.md#uc02) |

**Critérios de aceitação:**

- **Cenário 1 — Redirecionamento no site**
  - **Dado** que a equipe trocou o slug “sementes-vale” por “sementes-do-vale”
  - **Quando** o visitante acessa `/coletivos/sementes-vale`
  - **Então** é redirecionado de forma permanente (308) para `/coletivos/sementes-do-vale` e vê o perfil
- **Cenário 2 — Redirecionamento na API**
  - **Dado** a mesma troca de slug
  - **Quando** um cliente consulta `/api/coletivos/sementes-vale/`
  - **Então** a API responde 301 apontando para `/api/coletivos/sementes-do-vale/`
- **Cenário 3 — Várias trocas**
  - **Dado** que o slug mudou de “a” para “b” e depois para “c”
  - **Quando** o visitante acessa o endereço com “a” ou com “b”
  - **Então** nos dois casos chega ao perfil em “c”
- **Cenário 4 — Coletivo inativo**
  - **Dado** que o coletivo do slug antigo foi desativado
  - **Quando** o visitante acessa o endereço antigo
  - **Então** recebe 404, sem redirecionamento

### <a id="hu07"></a>HU07 — Consultar a agenda de eventos

| Identificador | HU07 |
| --- | --- |
| **Título** | Consultar a agenda de eventos |
| **Descrição** | Como visitante do portal (sem login), quero ver os próximos eventos e os que já aconteceram, buscando e filtrando por datas e bairro, para descobrir feiras, encontros e formações de que posso participar. |
| **Requisitos relacionados** | RF07, RN02, RN10, RNF01, RNF04 |

**Critérios de aceitação:**

- **Cenário 1 — Aba padrão**
  - **Dado** eventos ativos futuros e passados
  - **Quando** o visitante acessa `/eventos`
  - **Então** a aba “Próximos” aparece selecionada, com os eventos que ainda não terminaram, do mais próximo ao mais distante
- **Cenário 2 — Já aconteceram**
  - **Dado** eventos ativos já encerrados
  - **Quando** o visitante escolhe a aba “Já aconteceram”
  - **Então** vê os eventos encerrados, do mais recente ao mais antigo
- **Cenário 3 — Evento em andamento**
  - **Dado** uma feira que começou ontem e termina amanhã
  - **Quando** o visitante consulta a agenda hoje
  - **Então** a feira está em “Próximos” e não está em “Já aconteceram”
- **Cenário 4 — Evento sem data de fim**
  - **Dado** um evento sem data de fim que começou há uma hora
  - **Quando** o visitante consulta a agenda
  - **Então** o evento está em “Já aconteceram”
- **Cenário 5 — Busca por texto**
  - **Dado** os eventos ativos “Feira Agroecológica” e “Roda de conversa sobre cooperativismo”
  - **Quando** o visitante busca “feira”
  - **Então** aparece só a feira, pois a busca considera título, descrição e local
- **Cenário 6 — Datas e bairro**
  - **Dado** que o visitante informa o intervalo de 01/12/2026 a 15/12/2026 e o bairro “Centro”
  - **Quando** aplica os filtros
  - **Então** vê apenas eventos do Centro que começam nesse intervalo, incluindo os do dia 15
- **Cenário 7 — Agenda vazia**
  - **Dado** que não há nenhum evento ativo por vir
  - **Quando** o visitante abre a aba “Próximos”, sem busca nem filtros
  - **Então** o sistema informa que não há eventos marcados por enquanto e sugere ver os que já aconteceram
- **Cenário 8 — Nenhum resultado para a busca**
  - **Dado** uma busca ou filtros que não correspondem a nenhum evento
  - **Quando** a agenda é exibida
  - **Então** o sistema informa que nada corresponde à busca e sugere outro termo ou remover os filtros

### <a id="hu08"></a>HU08 — Ver a página de um evento

| Identificador | HU08 |
| --- | --- |
| **Título** | Ver a página de um evento |
| **Descrição** | Como visitante do portal (sem login), quero abrir a página de um evento, para saber quando e onde ele acontece e como participar. |
| **Requisitos relacionados** | RF08, RN02, RNF01, RNF20, RNF24 |
| **Caso de uso** | [UC03](casos-de-uso.md#uc03) |

**Critérios de aceitação:**

- **Cenário 1 — Página completa**
  - **Dado** um evento ativo com galeria de três imagens
  - **Quando** o visitante acessa `/eventos/<slug>`
  - **Então** vê título, data e horário de início e de fim, local, bairro, descrição, link e as imagens na ordem definida pela equipe, cada uma com texto alternativo (a legenda, quando houver)
- **Cenário 2 — Campos opcionais vazios**
  - **Dado** um evento sem data de fim, sem link e sem imagens
  - **Quando** a página é exibida
  - **Então** esses blocos não aparecem, em vez de aparecerem vazios
- **Cenário 3 — Fuso horário**
  - **Dado** um evento marcado para 14h no horário de Brasília
  - **Quando** a página é exibida
  - **Então** o horário mostrado é 14h
- **Cenário 4 — Prévia ao compartilhar**
  - **Dado** um evento com galeria e outro sem imagens
  - **Quando** os endereços são compartilhados em uma rede social
  - **Então** a prévia do primeiro usa a primeira imagem da galeria
  - **E** a do segundo usa a imagem padrão de compartilhamento da plataforma
- **Cenário 5 — Evento inativo ou inexistente**
  - **Dado** um evento inativo, ou um slug que não existe
  - **Quando** o visitante acessa o endereço
  - **Então** o sistema exibe a página “Página não encontrada”, com status 404

### <a id="hu09"></a>HU09 — Ver o mapa dos pontos da Economia Solidária

| Identificador | HU09 |
| --- | --- |
| **Título** | Ver o mapa dos pontos da Economia Solidária |
| **Descrição** | Como visitante do portal (sem login), quero ver em um mapa onde ficam os órgãos da ES, as lojas físicas e as feiras do Circuito Araribóia, para conseguir chegar até eles. |
| **Requisitos relacionados** | RF09, RN02, RN05, RN13, RNF14, RNF18, RNF24 |

**Critérios de aceitação:**

- **Cenário 1 — Mapa e lista**
  - **Dado** pontos de interesse ativos
  - **Quando** o visitante acessa `/mapa`
  - **Então** cada ponto aparece como marcador no mapa
  - **E** os mesmos pontos aparecem em uma lista, com nome, tipo, endereço e descrição, utilizável sem o mapa e por teclado
- **Cenário 2 — Detalhe do ponto**
  - **Dado** um ponto do tipo “Feira do Circuito Arariboia”
  - **Quando** o visitante clica no marcador
  - **Então** vê o nome, o tipo e o endereço do ponto
- **Cenário 3 — Filtro por tipo**
  - **Dado** pontos ativos de mais de um tipo
  - **Quando** o visitante escolhe o tipo “Loja física”
  - **Então** o mapa e a lista mostram só as lojas físicas
  - **E** o tipo escolhido fica no endereço da página (`?tipo=loja_fisica`)
- **Cenário 4 — Vínculo com coletivo**
  - **Dado** um ponto vinculado a um coletivo ativo e outro vinculado a um coletivo inativo
  - **Quando** os pontos são exibidos
  - **Então** o primeiro mostra o link para o perfil do coletivo
  - **E** o segundo aparece sem vínculo, sem revelar o nome do coletivo inativo
- **Cenário 5 — Somente pontos ativos**
  - **Dado** um ponto de interesse inativo
  - **Quando** o mapa é carregado
  - **Então** o ponto não aparece no mapa nem na lista
- **Cenário 6 — Coletivos não vão ao mapa**
  - **Dado** um coletivo ativo sem ponto de interesse cadastrado
  - **Quando** o mapa é carregado
  - **Então** o coletivo não aparece, porque coletivos não têm coordenadas

### <a id="hu10"></a>HU10 — Conhecer a Casa Paul Singer (“Saiba mais”)

| Identificador | HU10 |
| --- | --- |
| **Título** | Conhecer a Casa Paul Singer (“Saiba mais”) |
| **Descrição** | Como visitante do portal (sem login), quero ler quem é a Casa Paul Singer e como falar com ela, para saber a quem recorrer sobre a rede. |
| **Requisitos relacionados** | RF10, RNF18, RNF19 |

**Critérios de aceitação:**

- **Cenário 1 — Apresentação e contatos**
  - **Dado** os dados de contato da Casa configurados no portal
  - **Quando** o visitante acessa “Saiba mais” pelo menu principal
  - **Então** vê a apresentação da Casa Paul Singer, o endereço com o link “Ver no mapa”, o horário de atendimento e os botões de contato configurados (telefone, e-mail, Instagram e Facebook)
- **Cenário 2 — Contato ausente**
  - **Dado** que o WhatsApp da Casa não está configurado
  - **Quando** a página é exibida
  - **Então** o botão de WhatsApp não aparece, em vez de aparecer sem destino

## Área administrativa

### <a id="hu11"></a>HU11 — Entrar e sair da área administrativa

| Identificador | HU11 |
| --- | --- |
| **Título** | Entrar e sair da área administrativa |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero entrar com usuário e senha e sair ao terminar, para manter os dados da rede e proteger o acesso quando deixo o computador. |
| **Requisitos relacionados** | RF11, RN09, RNF15, RNF16 |

**Critérios de aceitação:**

- **Cenário 1 — Login válido**
  - **Dado** que o membro tem conta ativa de equipe
  - **Quando** informa usuário e senha corretos em `/admin/`
  - **Então** entra no painel e vê apenas os cadastros permitidos pelas suas permissões
- **Cenário 2 — Credenciais inválidas**
  - **Dado** que o membro informa uma senha errada
  - **Quando** tenta entrar
  - **Então** o sistema recusa o acesso com uma mensagem que não indica qual dos dois campos está errado
- **Cenário 3 — Conta desativada**
  - **Dado** uma conta que foi desativada
  - **Quando** o dono tenta entrar, mesmo com a senha certa
  - **Então** o acesso é recusado
- **Cenário 4 — Sair**
  - **Dado** um membro com sessão aberta
  - **Quando** escolhe “Sair”
  - **Então** a sessão é encerrada
  - **E** qualquer página administrativa volta a pedir login
- **Cenário 5 — Acesso sem sessão**
  - **Dado** que não há sessão aberta
  - **Quando** alguém acessa diretamente `/admin/rede/coletivo/`
  - **Então** é levado à tela de login, sem ver nenhum dado

### <a id="hu12"></a>HU12 — Cadastrar e manter coletivos

| Identificador | HU12 |
| --- | --- |
| **Título** | Cadastrar e manter coletivos |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero cadastrar, consultar, editar e excluir coletivos, para manter o cadastro da rede atualizado depois de cada entrevista. |
| **Requisitos relacionados** | RF12, RN01, RN06, RN07, RN08, RN11, RNF23 |
| **Caso de uso** | [UC02](casos-de-uso.md#uc02) |

**Critérios de aceitação:**

- **Cenário 1 — Cadastro**
  - **Dado** que a equipe entrevistou e validou o coletivo (RN01, fora do sistema)
  - **Quando** o membro preenche nome, slug, categorias, descrição, bairro, contatos, dados cadastrais, endereço e observações e salva
  - **Então** o coletivo é gravado e aparece na listagem administrativa
- **Cenário 2 — Slug repetido**
  - **Dado** que já existe um coletivo com o slug “sementes-do-vale”
  - **Quando** o membro tenta salvar outro coletivo com esse slug
  - **Então** o sistema recusa e indica o erro no campo slug, sem gravar nada
- **Cenário 3 — Foto acima do limite**
  - **Dado** uma foto de 7 MB
  - **Quando** o membro tenta salvá-la no coletivo
  - **Então** o sistema recusa com a mensagem “A foto tem 7,0 MB. O limite é 5 MB.”
  - **E** uma foto de exatamente 5 MB é aceita
- **Cenário 4 — Excluir coletivo com pessoas**
  - **Dado** um coletivo com pessoas vinculadas
  - **Quando** o membro tenta excluí-lo
  - **Então** o sistema impede a exclusão e lista as pessoas que precisam sair antes
- **Cenário 5 — Situação não muda visibilidade**
  - **Dado** um coletivo ativo com situação “encerrado”
  - **Quando** o visitante acessa a listagem pública
  - **Então** o coletivo continua aparecendo, pois só o campo “ativo” decide a visibilidade
- **Cenário 6 — Consulta na listagem**
  - **Dado** vários coletivos cadastrados
  - **Quando** o membro busca por nome, descrição, bairro ou CNPJ, ou filtra por ativo, situação ou categoria
  - **Então** a listagem mostra só os coletivos correspondentes, com nome, bairro, situação, ativo e número de pessoas

### <a id="hu13"></a>HU13 — Cadastrar e manter as pessoas dos coletivos

| Identificador | HU13 |
| --- | --- |
| **Título** | Cadastrar e manter as pessoas dos coletivos |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero registrar as pessoas que compõem cada coletivo, incluindo o bloco socioeconômico e de identidade, para substituir a planilha sem expor esses dados. |
| **Requisitos relacionados** | RF13, RN04, RN06, RN12, RNF17, RNF23 |

**Critérios de aceitação:**

- **Cenário 1 — Cadastro vinculado**
  - **Dado** um coletivo cadastrado
  - **Quando** o membro cadastra uma pessoa com nome e esse coletivo
  - **Então** a pessoa é gravada e aparece, somente para leitura, na ficha do coletivo
- **Cenário 2 — Sem coletivo**
  - **Dado** o formulário de nova pessoa
  - **Quando** o membro tenta salvar sem escolher um coletivo
  - **Então** o sistema recusa, indicando que o coletivo é obrigatório
- **Cenário 3 — Listagem sem dados sensíveis**
  - **Dado** pessoas com cor/raça, identidade de gênero, orientação sexual, deficiência e renda preenchidas
  - **Quando** o membro abre a listagem de pessoas
  - **Então** vê apenas nome, coletivo e município, com filtros por coletivo e estado e busca por nome, nome social e CPF
  - **E** nenhum campo socioeconômico ou de identidade aparece como coluna, filtro ou busca
- **Cenário 4 — Nada público**
  - **Dado** qualquer pessoa cadastrada
  - **Quando** o portal ou a API pública são consultados
  - **Então** nenhum dado de pessoa aparece, o que é garantido por teste automatizado no CI
- **Cenário 5 — Troca de coletivo**
  - **Dado** uma pessoa vinculada ao coletivo A
  - **Quando** o membro altera o vínculo para o coletivo B e salva
  - **Então** a pessoa passa a pertencer só ao coletivo B

### <a id="hu14"></a>HU14 — Manter categorias

| Identificador | HU14 |
| --- | --- |
| **Título** | Manter categorias |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero criar, renomear e excluir categorias e ver quantos coletivos há em cada uma, para organizar a rede. |
| **Requisitos relacionados** | RF14, RN14 |

**Critérios de aceitação:**

- **Cenário 1 — Cadastro**
  - **Dado** que a categoria “Agroecologia” não existe
  - **Quando** o membro a cadastra com nome e slug
  - **Então** ela passa a estar disponível na ficha dos coletivos
- **Cenário 2 — Contagem**
  - **Dado** categorias com coletivos vinculados
  - **Quando** o membro abre a listagem de categorias
  - **Então** vê, em cada linha, quantos coletivos há na categoria
- **Cenário 3 — Slug repetido**
  - **Dado** uma categoria com o slug “alimentacao”
  - **Quando** o membro tenta cadastrar outra com o mesmo slug
  - **Então** o sistema recusa, sem gravar
- **Cenário 4 — Excluir categoria em uso**
  - **Dado** uma categoria com três coletivos
  - **Quando** o membro a exclui
  - **Então** os três coletivos continuam cadastrados, apenas sem essa categoria
- **Cenário 5 — Filtro público**
  - **Dado** uma categoria cujos coletivos estão todos inativos
  - **Quando** o visitante abre o painel de filtros do portal
  - **Então** essa categoria não aparece como opção

### <a id="hu15"></a>HU15 — Manter eventos e sua galeria

| Identificador | HU15 |
| --- | --- |
| **Título** | Manter eventos e sua galeria |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero cadastrar eventos com uma galeria de imagens ordenada, para divulgar a agenda da rede. |
| **Requisitos relacionados** | RF15, RN02, RN10 |
| **Caso de uso** | [UC03](casos-de-uso.md#uc03) |

**Critérios de aceitação:**

- **Cenário 1 — Cadastro**
  - **Dado** um evento futuro com título, slug, data e hora de início, local, bairro, descrição e link
  - **Quando** o membro salva o evento como ativo
  - **Então** ele aparece na aba “Próximos” da agenda
- **Cenário 2 — Fim antes do início**
  - **Dado** um evento com início em 10/12/2026 14h
  - **Quando** o membro informa fim em 10/12/2026 12h e salva
  - **Então** o sistema recusa, indicando que o fim não pode ser anterior ao início, e nada é gravado
- **Cenário 3 — Ordem da galeria**
  - **Dado** que o membro adiciona três imagens com as ordens 2, 1 e 3
  - **Quando** a página pública do evento é exibida
  - **Então** as imagens aparecem na ordem 1, 2 e 3
- **Cenário 4 — Exclusão**
  - **Dado** um evento com galeria
  - **Quando** o membro exclui o evento
  - **Então** as imagens da galeria são excluídas junto

### <a id="hu16"></a>HU16 — Manter pontos de interesse

| Identificador | HU16 |
| --- | --- |
| **Título** | Manter pontos de interesse |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero cadastrar os pontos da Economia Solidária com tipo e coordenadas, para que apareçam no mapa. |
| **Requisitos relacionados** | RF16, RN05, RN13 |

**Critérios de aceitação:**

- **Cenário 1 — Cadastro**
  - **Dado** um ponto com nome, tipo “loja física”, latitude `-22.90`, longitude `-43.11`, endereço e imagem de capa
  - **Quando** o membro salva o ponto como ativo
  - **Então** ele aparece no mapa público, na posição informada
- **Cenário 2 — Tipo restrito**
  - **Dado** o formulário de ponto de interesse
  - **Quando** o membro escolhe o tipo
  - **Então** só pode escolher entre “Órgão da Economia Solidária”, “Loja física” e “Feira do Circuito Arariboia”
- **Cenário 3 — Coordenadas inválidas**
  - **Dado** uma latitude 95 ou uma longitude -200
  - **Quando** o membro tenta salvar
  - **Então** o sistema recusa e indica, no campo, o limite violado (-90 a 90 para a latitude, -180 a 180 para a longitude)
- **Cenário 4 — Vínculo opcional**
  - **Dado** um ponto vinculado a um coletivo
  - **Quando** esse coletivo é excluído
  - **Então** o ponto continua cadastrado, sem vínculo
- **Cenário 5 — Consulta**
  - **Dado** vários pontos cadastrados
  - **Quando** o membro filtra por tipo ou ativo, ou busca por nome ou endereço
  - **Então** a listagem mostra só os pontos correspondentes

### <a id="hu17"></a>HU17 — Controlar o que fica público

| Identificador | HU17 |
| --- | --- |
| **Título** | Controlar o que fica público |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero ativar e desativar coletivos, eventos e pontos de interesse, para tirar um registro do ar sem perder os seus dados. |
| **Requisitos relacionados** | RF17, RN02, RN08, RN14, RNF07 |
| **Caso de uso** | [UC02](casos-de-uso.md#uc02) |

**Critérios de aceitação:**

- **Cenário 1 — Desativar coletivo**
  - **Dado** um coletivo ativo
  - **Quando** o membro o desativa
  - **Então**, passado o tempo de cache, ele some da listagem, da busca e dos destaques
  - **E** o seu perfil, inclusive por slugs antigos, responde 404
  - **E** o seu bairro e as suas categorias deixam de ser oferecidos nos filtros, se nenhum outro coletivo ativo os usar
  - **E** os seus dados continuam na área administrativa
- **Cenário 2 — Reativar**
  - **Dado** um coletivo inativo
  - **Quando** o membro o reativa
  - **Então** ele volta a aparecer no portal, no mesmo endereço
- **Cenário 3 — Evento e ponto**
  - **Dado** um evento e um ponto de interesse ativos
  - **Quando** o membro os desativa
  - **Então** o evento some da agenda e o ponto some do mapa
- **Cenário 4 — Público não vê inativos**
  - **Dado** coletivos inativos
  - **Quando** alguém consulta `/api/coletivos/?ativo=false`
  - **Então** a resposta traz apenas coletivos ativos, porque “ativo” não é um filtro público

### <a id="hu18"></a>HU18 — Autorizar a exibição dos contatos de um coletivo

| Identificador | HU18 |
| --- | --- |
| **Título** | Autorizar a exibição dos contatos de um coletivo |
| **Descrição** | Como membro da equipe da Casa Paul Singer, quero autorizar, contato a contato, o que pode ser exibido, para respeitar o consentimento de cada coletivo. |
| **Requisitos relacionados** | RF17, RN03, RNF17, RNF23 |
| **Caso de uso** | [UC02](casos-de-uso.md#uc02) |

**Critérios de aceitação:**

- **Cenário 1 — Padrão fechado**
  - **Dado** um coletivo recém-cadastrado com telefone, e-mail e Instagram
  - **Quando** o membro salva sem marcar nenhuma autorização
  - **Então** nenhum desses contatos aparece no portal nem na API
- **Cenário 2 — Autorização parcial**
  - **Dado** que o membro autoriza só o Instagram
  - **Quando** o perfil é consultado
  - **Então** só o Instagram aparece
  - **E** telefone e e-mail são omitidos da resposta da API
- **Cenário 3 — Retirar autorização**
  - **Dado** um telefone autorizado
  - **Quando** o membro retira a autorização
  - **Então**, passado o tempo de cache, o telefone deixa de aparecer no perfil

### <a id="hu19"></a>HU19 — Gerenciar as contas da equipe

| Identificador | HU19 |
| --- | --- |
| **Título** | Gerenciar as contas da equipe |
| **Descrição** | Como membro da equipe da Casa Paul Singer com permissão para administrar usuários, quero criar contas, ajustar permissões e desativar acessos, para controlar quem altera o cadastro da rede. |
| **Requisitos relacionados** | RF18, RN09, RNF16 |

**Critérios de aceitação:**

- **Cenário 1 — Criar conta**
  - **Dado** um novo membro da equipe
  - **Quando** o administrador cria a conta com usuário e senha
  - **Então** a conta é criada e a senha é guardada com hash, sem nunca ser exibida
- **Cenário 2 — Senha fraca**
  - **Dado** uma senha curta, só numérica ou parecida com o nome de usuário
  - **Quando** o administrador tenta salvá-la
  - **Então** o sistema recusa e explica a regra violada
- **Cenário 3 — Sem permissão**
  - **Dado** um membro sem permissão sobre usuários
  - **Quando** entra na área administrativa
  - **Então** a seção de usuários não aparece para ele
- **Cenário 4 — Desativar acesso**
  - **Dado** um membro que saiu da equipe
  - **Quando** o administrador desativa a conta
  - **Então** essa pessoa não consegue mais entrar
- **Cenário 5 — Sem autocadastro**
  - **Dado** um visitante do portal
  - **Quando** procura uma forma de criar conta
  - **Então** não encontra nenhuma: contas só são criadas pela equipe

## API pública

### <a id="hu20"></a>HU20 — Consultar os dados da rede pela API pública

| Identificador | HU20 |
| --- | --- |
| **Título** | Consultar os dados da rede pela API pública |
| **Descrição** | Como desenvolvedor de um cliente da plataforma (o portal ou um futuro aplicativo), quero consultar coletivos, eventos e pontos de interesse por uma API somente leitura, para montar telas sem acessar o banco de dados. |
| **Requisitos relacionados** | RF19, RN02, RN03, RN04, RN05, RN14, RNF01, RNF02, RNF04, RNF06, RNF15, RNF17 |

**Critérios de aceitação:**

- **Cenário 1 — Paginação**
  - **Dado** 150 coletivos ativos
  - **Quando** o cliente faz GET `/api/coletivos/`
  - **Então** recebe o envelope `count`, `next`, `previous` e `results`, com 20 itens
  - **E** com `page_size=500` recebe no máximo 100 itens
- **Cenário 2 — Busca, filtros e ordenação**
  - **Dado** coletivos ativos
  - **Quando** o cliente usa `q`, `categoria` (repetível), `bairro` e `ordering` (`nome` ou `-criado_em`)
  - **Então** recebe só os correspondentes, na ordem pedida, com empates resolvidos pelo id
- **Cenário 3 — Parâmetros de eventos**
  - **Dado** eventos ativos
  - **Quando** o cliente usa `periodo` (`proximos`, `passados` ou `todos`, o padrão), `de` e `ate` (`AAAA-MM-DD`) e `bairro`
  - **Então** recebe só os eventos correspondentes
- **Cenário 4 — Parâmetro inválido**
  - **Dado** uma consulta com `categoria=abc`, mais de 10 categorias, `periodo=ontem`, `de=15/08/2026` ou `tipo=padaria`
  - **Quando** o cliente faz a requisição
  - **Então** a API responde 400 com a mensagem do campo inválido
- **Cenário 5 — Opções de filtro**
  - **Dado** coletivos e eventos ativos e inativos
  - **Quando** o cliente consulta `/api/filtros/coletivos/` e `/api/filtros/eventos/`
  - **Então** recebe só categorias e bairros em uso por registros ativos
- **Cenário 6 — Somente leitura**
  - **Dado** qualquer rota da API pública
  - **Quando** o cliente envia POST, PUT, PATCH ou DELETE
  - **Então** a API recusa a requisição (405) e nada é alterado
- **Cenário 7 — Formato dos dados**
  - **Dado** qualquer resposta da API
  - **Quando** o cliente a lê
  - **Então** os dados estão em JSON, com chaves em snake_case e datas em ISO 8601 com fuso (ex.: `2026-12-05T14:00:00-03:00`)
  - **E** nenhuma resposta traz dados de pessoas, endereço completo, dados cadastrais ou contatos não autorizados
