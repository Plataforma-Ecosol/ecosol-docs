// Gera o PDF da Especificação dos Requisitos (AV2) da Plataforma Ecosol a partir
// dos arquivos .md desta pasta, no padrão visual da documentação técnica do
// Projeto Integrador (capa, cabeçalho e rodapé do template do IFRJ).
//
// Uso, na raiz do repositório:
//   npm install --no-save markdown-it@14 playwright
//   npx playwright install chromium
//   node docs/especificacao-requisitos/fonte/gerar_pdf.js
const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const { chromium } = require("playwright");

const PASTA = path.join(__dirname, "..");
const SAIDA = path.join(PASTA, "Especificacao_Requisitos_Plataforma_Ecosol.pdf");
const REPOSITORIO = "https://github.com/Plataforma-Ecosol/ecosol-docs";
const DOC_TECNICA = `${REPOSITORIO}/blob/main/docs/documentacao-tecnica/Documentacao_Tecnica_Plataforma_Ecosol.pdf`;
const LOGO = fs.readFileSync(path.join(__dirname, "logo-ifrj.png")).toString("base64");

// ---- Paleta do template (a mesma de docs/documentacao-tecnica/fonte) ------------
const AZUL_ORIENTACAO = "#1E487C";  // texto do cabeçalho das tabelas
const AZUL_SUBTITULO = "#4F81BD";   // nome da solução na capa
const AZUL_CONTROLE = "#365F91";    // títulos da capa
const AZUL_LINK = "#1155CC";
const VERDE_CAPA = "#D9EAD3";       // rótulos das fichas e da capa
const CINZA_CAB = "#D9D9D9";        // cabeçalho das tabelas

// ---- Capa ------------------------------------------------------------------------------
const CAPA = {
  equipe: "Não se aplica (equipe sem nome definido)",
  integrantes: ["Jean de Pinho Macedo", "Vinícius Pontes Braga", "Pietro Gomes Borges"],
  entrega: "AV2: especificação detalhada dos requisitos",
  base: `Requisitos da seção 1.3 da <a href="${DOC_TECNICA}">documentação técnica</a>, versão 1.3`,
  semestre: "2026.2",
};

// Seções do PDF, na ordem: [arquivo, título, âncora]
const SECOES = [
  ["README.md", "Apresentação", "apresentacao"],
  ["revisao-dos-requisitos.md", "Revisão dos requisitos", "revisao-dos-requisitos"],
  ["historias-de-usuario.md", "Histórias de usuário", "historias-de-usuario"],
  ["casos-de-uso.md", "Casos de uso", "casos-de-uso"],
  ["requisitos-nao-funcionais.md", "Requisitos não funcionais", "requisitos-nao-funcionais"],
  ["matriz-de-rastreabilidade.md", "Matriz de rastreabilidade", "matriz-de-rastreabilidade"],
];
const ANCORA = Object.fromEntries(SECOES.map(([arquivo, , ancora]) => [arquivo, ancora]));

const md = new MarkdownIt({ html: true });

// Links entre os .md viram links internos do PDF; os demais apontam para o GitHub.
function ajustarLinks(html) {
  return html.replace(/href="([^"]+)"/g, (original, alvo) => {
    if (/^(https?:|mailto:|#)/.test(alvo)) return original;
    const [arquivo, fragmento] = alvo.split("#");
    if (arquivo.endsWith(".md")) return `href="#${fragmento || ANCORA[path.basename(arquivo)]}"`;
    if (arquivo.endsWith("Documentacao_Tecnica_Plataforma_Ecosol.pdf")) return `href="${DOC_TECNICA}"`;
    return `href="${REPOSITORIO}/blob/main/docs/especificacao-requisitos/${arquivo}"`;
  });
}

function secao([arquivo, titulo, ancora]) {
  let html = md.render(fs.readFileSync(path.join(PASTA, arquivo), "utf8"));
  html = html.replace(/<h1>[\s\S]*?<\/h1>/, `<h1 class="secao" id="${ancora}">${titulo}</h1>`);
  return `<section class="${ancora}">${ajustarLinks(html)}</section>`;
}

// A tabela de documentos do README vira o quadro de conteúdo da capa. Os links
// já chegam aqui convertidos em âncoras internas (#secao); a linha do próprio
// PDF fica de fora.
function separarTabelaDoReadme(html) {
  const tabela = html.match(/<table>[\s\S]*?<\/table>/)[0];
  const linhas = [...tabela.matchAll(/<tr>\s*<td><a href="([^"]+)">([^<]+)<\/a><\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/g)]
    .filter(([, alvo]) => alvo.startsWith("#"))
    .map(([, alvo, nome, descricao]) => {
      const numero = SECOES.findIndex(([, , ancora]) => `#${ancora}` === alvo) + 1;
      return `<tr><td><a href="${alvo}">${numero}. ${nome}</a></td><td>${descricao}</td></tr>`;
    });
  linhas.unshift(`<tr><td><a href="#apresentacao">1. Apresentação</a></td><td>Objetivo, cobertura, convenções e manutenção da especificação</td></tr>`);
  return { html: html.replace(tabela, ""), conteudo: linhas.join("\n") };
}

function capa(conteudo) {
  const hoje = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo" }).format(new Date());
  const linha = (rotulo, valor) => `<tr><th>${rotulo}</th><td>${valor}</td></tr>`;
  return `<section class="capa">
  <p class="titulo">ESPECIFICAÇÃO DOS REQUISITOS DO PROJETO<br>INTEGRADOR DE ENGENHARIA DE SOFTWARE</p>
  <p class="solucao">Plataforma Ecosol</p>
  <p class="rede">Rede de Economia Solidária de Niterói</p>
  <table class="identificacao">
    ${linha("Equipe", CAPA.equipe)}
    ${linha("Integrantes", CAPA.integrantes.join("<br>"))}
    ${linha("Atividade/entrega", CAPA.entrega)}
    ${linha("Base", CAPA.base)}
    ${linha("Repositório", `<a href="${REPOSITORIO}/tree/main/docs/especificacao-requisitos">${REPOSITORIO}</a><br>(pasta docs/especificacao-requisitos)`)}
    ${linha("Semestre", CAPA.semestre)}
    ${linha("Data", hoje)}
  </table>
  <p class="titulo-azul">CONTEÚDO DO DOCUMENTO</p>
  <table class="conteudo"><thead><tr><th>Seção</th><th>Conteúdo</th></tr></thead><tbody>${conteudo}</tbody></table>
</section>`;
}

const CSS = `
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; counter-reset: secao; font-family: Arial, "Liberation Sans", Helvetica, sans-serif; font-size: 10.5pt; line-height: 1.32; color: #000; }
p { margin: 0 0 6pt; text-align: justify; }
a { color: ${AZUL_LINK}; text-decoration: none; }
code { font-family: Consolas, "Liberation Mono", monospace; font-size: 0.88em; background: #F2F2F2; padding: 0 2pt; border-radius: 2pt; }
h1, h2, h3 { font-family: Calibri, Carlito, "Liberation Sans", sans-serif; font-weight: bold; color: #000; break-after: avoid; }
h1.secao { font-size: 13pt; text-transform: uppercase; margin: 0 0 8pt; break-before: page; counter-reset: sub; }
h1.secao::before { counter-increment: secao; content: counter(secao) ". "; }
h2 { font-size: 12pt; margin: 14pt 0 6pt; }
h2::before { counter-increment: sub; content: counter(secao) "." counter(sub) " "; }
h3 { font-size: 11.5pt; margin: 14pt 0 5pt; }
ul, ol { margin: 0 0 6pt; padding-left: 16pt; }
li { margin: 1pt 0; }
li > ul { margin: 1pt 0 3pt; }
p:has(+ ul), p:has(+ ol) { break-after: avoid; }
table { width: 100%; border-collapse: collapse; margin: 6pt 0 10pt; font-size: 9.5pt; line-height: 1.25; }
th, td { border: 0.6pt solid #000; padding: 3pt 5pt; vertical-align: top; text-align: left; }
thead th { background: ${CINZA_CAB}; color: ${AZUL_ORIENTACAO}; }
tr { break-inside: avoid; }

/* fichas das histórias e dos casos de uso */
.historias-de-usuario h3 + table, .casos-de-uso h2 + table { break-inside: avoid; break-before: avoid; }
.historias-de-usuario h3 + table thead th, .casos-de-uso h2 + table thead th { background: ${VERDE_CAPA}; color: #000; }
.historias-de-usuario h3 + table td:first-child, .casos-de-uso h2 + table td:first-child { background: ${VERDE_CAPA}; width: 26%; }
.historias-de-usuario ul > li { break-inside: avoid; }

/* larguras das tabelas largas */
.historias-de-usuario > table:first-of-type th:nth-child(1) { width: 12%; }
.historias-de-usuario > table:first-of-type th:nth-child(3) { width: 24%; }
.requisitos-nao-funcionais th:nth-child(1), .matriz-de-rastreabilidade th:nth-child(1) { width: 11%; }
.requisitos-nao-funcionais table:first-of-type th:nth-child(2) { width: 47%; }
.requisitos-nao-funcionais table:last-of-type th:nth-child(2) { width: 37%; }
.requisitos-nao-funcionais table:last-of-type th:nth-child(4) { width: 19%; }
.matriz-de-rastreabilidade th:nth-child(2) { width: 30%; }
.matriz-de-rastreabilidade th:nth-child(3) { width: 13%; }

/* capa */
.capa .titulo { font-size: 18pt; font-weight: bold; text-align: center; line-height: 1.25; margin: 28pt 0 12pt; }
.capa .solucao { font-size: 17pt; color: ${AZUL_SUBTITULO}; text-align: center; margin: 0; }
.capa .rede { font-size: 13pt; color: ${AZUL_SUBTITULO}; text-align: center; margin: 0 0 24pt; }
.capa table { font-size: 10pt; }
.capa table.identificacao th { background: ${VERDE_CAPA}; width: 34%; }
.capa .titulo-azul { font-family: Calibri, Carlito, sans-serif; font-size: 13pt; font-weight: bold; color: ${AZUL_CONTROLE}; text-align: left; margin: 24pt 0 4pt; }
.capa table.conteudo thead th { background: ${VERDE_CAPA}; color: #000; }
.capa table.conteudo td:first-child { width: 34%; }
`;

const CABECALHO = `<div style="width:100%;box-sizing:border-box;padding:0.25in 0.75in 0;display:flex;justify-content:space-between;align-items:flex-start;font-family:Arial,'Liberation Sans',sans-serif;font-size:9pt;color:#000;">
  <img src="data:image/png;base64,${LOGO}" style="height:0.5in">
  <div style="text-align:right;line-height:1.25;">CURSO DE BACHARELADO EM ENGENHARIA DA COMPUTAÇÃO<br>ENGENHARIA DE SOFTWARE</div>
</div>`;
const RODAPE = `<div style="width:100%;box-sizing:border-box;padding:0 0.75in 0.25in;text-align:center;font-family:Arial,'Liberation Sans',sans-serif;font-size:8pt;color:#000;">
  Engenharia de Software – Projeto Integrador | Especificação dos Requisitos do Projeto <span style="color:${AZUL_LINK};">Plataforma Ecosol</span> | <span class="pageNumber"></span>/<span class="totalPages"></span>
</div>`;

async function main() {
  const partes = SECOES.map(secao);
  const { html: apresentacao, conteudo } = separarTabelaDoReadme(partes[0]);
  partes[0] = apresentacao;
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Especificação dos Requisitos – Plataforma Ecosol</title><style>${CSS}</style></head>
<body>${capa(conteudo)}${partes.join("\n")}</body></html>`;

  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();
  await pagina.setContent(html, { waitUntil: "load" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.pdf({
    path: SAIDA,
    format: "Letter",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: CABECALHO,
    footerTemplate: RODAPE,
    margin: { top: "1in", bottom: "0.7in", left: "0.75in", right: "0.75in" },
    outline: true,
    tagged: true,
  });
  await navegador.close();
  console.log(`PDF gerado: ${path.relative(process.cwd(), SAIDA)}`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
