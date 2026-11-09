import os, sys, json
sys.path.insert(0, sys.argv[1]); os.chdir(sys.argv[1])
os.environ.setdefault("DJANGO_SETTINGS_MODULE","config.settings")
os.environ["DJANGO_SECRET_KEY"]="x"; os.environ["DATABASE_URL"]="postgresql://u:p@127.0.0.1:5999/db"
import django; django.setup()
from django.apps import apps
from django.db import connection
out=[]
for m in apps.get_app_config("rede").get_models():
    t={"model":m.__name__,"table":m._meta.db_table,"cols":[],"m2m":[],"uniques":[],"checks":[]}
    for f in m._meta.local_fields:
        t["cols"].append({"name":f.column,"type":f.db_type(connection),"null":f.null,"pk":f.primary_key,"unique":f.unique and not f.primary_key,
            "fk": (f.related_model._meta.db_table if f.is_relation else None),"on_delete":(f.remote_field.on_delete.__name__ if f.is_relation else None),"index":f.db_index and not f.unique and not f.is_relation, "parent_link": getattr(f.remote_field,'parent_link',False) if f.is_relation else False})
    for f in m._meta.local_many_to_many:
        th=f.remote_field.through
        t["m2m"].append({"name":f.name,"through":th._meta.db_table,"cols":[(x.column,x.db_type(connection),x.related_model._meta.db_table if x.is_relation else None) for x in th._meta.local_fields]})
    for c in m._meta.constraints: t["checks"].append(c.name)
    out.append(t)
print(json.dumps(out,indent=1,ensure_ascii=False))
