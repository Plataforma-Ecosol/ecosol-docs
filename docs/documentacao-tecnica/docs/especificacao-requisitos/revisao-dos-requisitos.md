# Revisão dos requisitos

Antes da especificação, os requisitos da seção 1.3 da [documentação técnica](../documentacao-tecnica/Documentacao_Tecnica_Plataforma_Ecosol.pdf) foram revisados quanto à clareza, à consistência e à viabilidade, comparando o texto da AV1 com o comportamento implementado na branch `staging` do backend e do frontend. Os códigos foram mantidos, para preservar a rastreabilidade.

Dez requisitos tiveram o texto ajustado: RF01, RF04, RF07, RF09, RF14, RF15, RF16, RF18, RN10 e RN11. Os textos revisados já estão na documentação técnica, versão 1.1; os demais 47 requisitos continuam como na AV1.

## Requisitos ajustados

### RF01

- **Texto na AV1:** O software deve permitir que qualquer visitante, sem login, veja a página inicial com a apresentação da rede, os totais de coletivos, pontos no mapa e próximos eventos, alguns coletivos em destaque e os próximos eventos.
- **Problema:** “Alguns coletivos em destaque” não dizia quais coletivos aparecem (não existe campo de destaque no cadastro), e “próximos eventos” aparecia duas vezes sem dizer quantos eventos a página lista.
- **Texto revisado:** O software deve permitir que qualquer visitante, sem login, veja a página inicial com a apresentação da rede, os totais de coletivos ativos, pontos no mapa e próximos eventos, seis coletivos em destaque (os primeiros coletivos ativos em ordem alfabética) e os três próximos eventos.

### RF04

- **Texto na AV1:** O software deve permitir que o visitante filtre os coletivos por uma ou mais categorias e por bairro, combinando os filtros com a busca, e mantenha busca, filtros e página no endereço (URL), para que a listagem possa ser compartilhada.
- **Problema:** Não dizia como várias categorias se combinam, o que muda o resultado da busca, nem quantas categorias a API aceita.
- **Texto revisado:** O software deve permitir que o visitante filtre os coletivos por uma ou mais categorias (até 10, combinadas com “e”: o coletivo precisa estar em todas as escolhidas) e por bairro, combinando os filtros com a busca, e mantenha busca, filtros e página no endereço (URL), para que a listagem possa ser compartilhada.

### RF07

- **Texto na AV1:** O software deve permitir que o visitante consulte a agenda de eventos da ES, separada em “próximos” e “já aconteceram”, com busca e filtros por período e por bairro.
- **Problema:** “Filtros por período” se confundia com “próximos” e “já aconteceram”, que também são um recorte de período.
- **Texto revisado:** O software deve permitir que o visitante consulte a agenda de eventos da ES, separada nas abas “próximos” e “já aconteceram”, com busca por texto e filtros por intervalo de datas e por bairro.

### RF09

- **Texto na AV1:** O software deve exibir em um mapa interativo os pontos de interesse da ES (órgãos da ES, lojas físicas e feiras do Circuito Araribóia), com os dados do ponto ao clicar nele, e uma lista dos mesmos pontos.
- **Problema:** O mapa permite filtrar os pontos por tipo, mas o requisito não citava o filtro.
- **Texto revisado:** O software deve exibir em um mapa interativo os pontos de interesse da ES (órgãos da ES, lojas físicas e feiras do Circuito Araribóia), com os dados do ponto ao clicar nele, uma lista dos mesmos pontos e um filtro por tipo de ponto.

### RF14

- **Texto na AV1:** O software deve permitir que a equipe cadastre, edite e exclua categorias, mostrando quantos coletivos há em cada uma.
- **Problema:** Faltava a consulta, presente nos demais cadastros (RF12 e RF13), e não estava claro o que acontece ao excluir uma categoria em uso.
- **Texto revisado:** O software deve permitir que a equipe cadastre, consulte, edite e exclua categorias, mostrando quantos coletivos há em cada uma. Excluir uma categoria apenas a desvincula dos coletivos, que continuam cadastrados.

### RF15

- **Texto na AV1:** O software deve permitir que a equipe cadastre, edite e exclua eventos, com uma galeria de imagens ordenada.
- **Problema:** Faltava a consulta, presente nos demais cadastros (RF12 e RF13).
- **Texto revisado:** O software deve permitir que a equipe cadastre, consulte, edite e exclua eventos, com uma galeria de imagens ordenada.

### RF16

- **Texto na AV1:** O software deve permitir que a equipe cadastre, edite e exclua pontos de interesse, com tipo, latitude e longitude, endereço, imagem de capa e vínculo opcional com um coletivo.
- **Problema:** Faltava a consulta, presente nos demais cadastros (RF12 e RF13).
- **Texto revisado:** O software deve permitir que a equipe cadastre, consulte, edite e exclua pontos de interesse, com tipo, latitude e longitude, endereço, imagem de capa e vínculo opcional com um coletivo.

### RF18

- **Texto na AV1:** O software deve permitir que a equipe gerencie as contas de usuário da área administrativa e as suas permissões.
- **Problema:** “Gerenciar as permissões” parecia prometer permissões por papel, que a seção 1.2 deixa fora do MVP.
- **Texto revisado:** O software deve permitir que a equipe gerencie as contas de usuário da área administrativa (criar, editar, desativar e trocar a senha), usando as permissões e os grupos nativos do Django Admin. Permissões por papel ficam fora do MVP.

### RN10

- **Texto na AV1:** A data de fim de um evento, quando informada, não pode ser anterior à data de início. Um evento continua entre os “próximos” enquanto ainda não terminou. (RF07, RF15)
- **Problema:** Não dizia em que aba fica um evento sem data de fim, caso em que “enquanto ainda não terminou” não tem como ser calculado.
- **Texto revisado:** A data de fim de um evento, quando informada, não pode ser anterior à data de início. Um evento continua entre os “próximos” enquanto ainda não terminou; sem data de fim, ele passa para “já aconteceram” assim que começa. (RF07, RF15)

### RN11

- **Texto na AV1:** A foto do coletivo tem no máximo 5 MB e só é publicada com a autorização de uso de imagem das pessoas que aparecem nela. (RF12)
- **Problema:** Não dizia quem verifica a autorização de uso de imagem: o sistema não tem como checá-la.
- **Texto revisado:** A foto do coletivo tem no máximo 5 MB, limite verificado pelo sistema. A autorização de uso de imagem das pessoas que aparecem na foto é verificada pela equipe antes do envio, e não pelo sistema, como na RN01. (RF12)

## Prioridade do MVP

Os 19 requisitos funcionais compõem o MVP, que já está publicado em homologação, e todos têm prioridade alta: a plataforma só cumpre o objetivo de dar visibilidade à rede com o portal, a área administrativa e a API funcionando juntos. As regras de negócio e os requisitos não funcionais acompanham os requisitos funcionais a que se ligam, como mostra a [matriz de rastreabilidade](matriz-de-rastreabilidade.md). Os itens de evolução da seção 1.2 da documentação técnica (e-mail de confirmação, formação em ES, aptidão do coletivo e página pública de privacidade) ainda não são requisitos e não foram especificados.

## <a id="pendencias"></a>Pendências

A conferência dos critérios com o código encontrou dois pontos que não mudam os requisitos, mas precisam de ação da equipe:

1. **Mensagem do evento com fim antes do início (HU15 e UC03).** A área administrativa já recusa o cadastro (RN10), mas mostra a mensagem genérica da restrição do banco: `Restrição "evento_data_fim_apos_inicio" foi violada.` O critério pede uma mensagem que explique a regra. Para atendê-lo, basta definir a mensagem de erro (`violation_error_message`) da restrição no model `Evento` do backend.
2. **Imagem de capa dos pontos de interesse (RF09 e RF16).** A imagem é cadastrada na área administrativa, mas o portal não a mostra no mapa nem na lista. A equipe precisa decidir se ela passa a aparecer nos dados do ponto ou se o campo sai do cadastro; por enquanto, a HU09 não a exige.
