"""Gera o .dot do modelo lógico relacional a partir do schema.json
(introspecção dos models do Django, ver schema.py)."""
import json
import sys

schema = json.load(open(sys.argv[1]))
saida = sys.argv[2]

AZUL = "#1E487C"
tabelas = {}
for t in schema:
    tabelas[t["table"]] = t["cols"]
    for m in t["m2m"]:
        if m["through"].startswith("rede_usuario_"):
            continue  # tabelas de grupos/permissões do Django: fora do diagrama
        tabelas[m["through"]] = [
            {"name": c, "type": tp, "null": False, "pk": c == "id", "unique": False,
             "fk": fk, "on_delete": "CASCADE" if fk else None, "index": False}
            for c, tp, fk in m["cols"]
        ]

ordem = ["rede_pessoa", "rede_coletivo", "rede_coletivosluganterior", "rede_pontodeinteresse",
         "rede_coletivo_categorias", "rede_imagemevento", "rede_categoria", "rede_evento",
         "rede_usuario"]


def tipo(t):
    return (t.replace("timestamp with time zone", "timestamptz")
             .replace("numeric(12, 2)", "numeric(12,2)").replace("numeric(9, 6)", "numeric(9,6)"))


linhas = [
    "// Modelo lógico relacional — Plataforma Ecosol (PostgreSQL). Gerado de rede/models via introspecção.",
    "digraph ModeloLogico {",
    '  graph [rankdir=LR, fontname="Arial", nodesep=0.3, ranksep=0.9, pad=0.3, bgcolor="white",',
    '         ];',
    '  node [shape=plaintext, fontname="Arial", fontsize=10];',
    '  edge [fontname="Arial", fontsize=9, color="#333333", arrowhead=none, arrowtail=none, dir=both];',
]
for nome in ordem:
    cols = tabelas[nome]
    rows = [f'<tr><td colspan="3" bgcolor="#D9E2F3" align="center"><b>{nome}</b></td></tr>']
    for c in cols:
        marca = []
        if c["pk"]:
            marca.append("PK")
        if c["fk"]:
            marca.append("FK")
        if c["unique"]:
            marca.append("UQ")
        chave = ", ".join(marca)
        nomecol = f'<u>{c["name"]}</u>' if c["pk"] else c["name"]
        # Colunas sem marcação são NOT NULL; só as anuláveis levam "NULL".
        tp = tipo(c["type"]) + (" NULL" if c["null"] else "")
        rows.append(
            f'<tr><td align="left" port="{c["name"]}">{(f"<font color=\"{AZUL}\"><b>{chave}</b></font>" if chave else " ")}</td>'
            f'<td align="left">{nomecol}</td><td align="left" port="{c["name"]}_e"><font color="#555555">{tp}</font></td></tr>'
        )
    tabela = (f'<table border="1" cellborder="0" cellspacing="0" cellpadding="1" color="{AZUL}">'
              + "".join(rows) + "</table>")
    linhas.append(f"  {nome} [label=<{tabela}>];")

# Para o layout da esquerda para a direita, o Coletivo fica no centro: as tabelas
# que apontam para ele pela direita têm a aresta desenhada ao contrário (só visual).
REVERSO = {("rede_coletivosluganterior", "coletivo_id"), ("rede_pontodeinteresse", "coletivo_id"),
           ("rede_coletivo_categorias", "coletivo_id")}
for nome in ordem:
    for c in tabelas[nome]:
        if c["fk"]:
            um = "teeodot" if c["null"] else "teetee"
            regra = c["on_delete"].replace("_", " ")
            if (nome, c["name"]) in REVERSO:
                linhas.append(f'  {c["fk"]}:id_e:e -> {nome}:{c["name"]}:w '
                              f'[arrowtail={um}, arrowhead=crowodot, label="  {regra}  ", weight=0];')
            else:
                linhas.append(f'  {nome}:{c["name"]}_e:e -> {c["fk"]}:id:w '
                              f'[arrowtail=crowodot, arrowhead={um}, label="  {regra}  ", weight=0];')
linhas += [
    "  {rank=same; rede_coletivosluganterior; rede_pontodeinteresse; rede_coletivo_categorias; rede_imagemevento;}",
    "  {rank=same; rede_categoria; rede_evento; rede_usuario;}",
    "  rede_pessoa -> rede_coletivo [style=invis, weight=10];",
]
linhas.append("}")
open(saida, "w").write("\n".join(linhas) + "\n")


# --- Posições fixas (neato -n2) ------------------------------------------------
# O dot não alinha bem as tabelas altas; aqui as colunas são montadas à mão a partir
# do tamanho real de cada tabela (medido com `dot -Tplain`).
if len(sys.argv) > 3:
    import subprocess
    plain = subprocess.run(["dot", "-Tplain", saida], capture_output=True, text=True).stdout
    tam = {}
    for ln in plain.splitlines():
        p = ln.split()
        if p and p[0] == "node":
            tam[p[1]] = (float(p[4]) * 72, float(p[5]) * 72)  # pontos
    GAP_X, GAP_Y = 80, 28
    colunas = [
        ["rede_pessoa"],
        ["rede_coletivo"],
        ["rede_coletivosluganterior", "rede_pontodeinteresse", "rede_coletivo_categorias", "rede_imagemevento"],
        ["rede_usuario", "rede_categoria", "rede_evento"],
    ]
    pos = {}
    x = 0
    topo = 0
    for col in colunas:
        larg = max(tam[n][0] for n in col)
        y = topo
        for n in col:
            w, h = tam[n]
            pos[n] = (x + larg / 2, y - h / 2)
            y -= h + GAP_Y
        x += larg + GAP_X
    # Alinha Categoria com a tabela de junção e Evento com ImagemEvento, sem sobrepor.
    def topo_de(n): return pos[n][1] + tam[n][1] / 2
    def coloca_topo(n, t): pos[n] = (pos[n][0], t - tam[n][1] / 2)
    coloca_topo("rede_categoria", max(topo_de("rede_coletivo_categorias"),
                                     topo_de("rede_usuario") - tam["rede_usuario"][1] - GAP_Y))
    coloca_topo("rede_evento", min(topo_de("rede_imagemevento"),
                                  topo_de("rede_categoria") - tam["rede_categoria"][1] - GAP_Y))
    txt = open(saida).read()
    for n, (px, py) in pos.items():
        txt = txt.replace(f"  {n} [label=", f'  {n} [pos="{px:.0f},{py:.0f}!", label=', 1)
    txt = txt.replace("  rede_pessoa -> rede_coletivo [style=invis, weight=10];\n", "")
    txt = txt.replace('graph [rankdir=LR,', 'graph [splines=true, outputorder=edgesfirst,')
    open(saida, "w").write(txt)
