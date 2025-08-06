import pandas as pd, json, zipfile, os, pathlib

src = pathlib.Path('pks.csv.zip')
out_dir = pathlib.Path('data/pks')
out_dir.mkdir(parents=True, exist_ok=True)

with zipfile.ZipFile(src) as z:
    df = pd.read_csv(z.open('pks.csv'))

df['ligne'] = df['CODE_LIGNE'].astype(str).str.zfill(6)

for ligne, grp in df.groupby('ligne'):
    subset = grp[['PK', 'LATITUDE', 'LONGITUDE']].to_dict('records')
    (out_dir / f'{ligne}.json').write_text(
        json.dumps(subset, separators=(',', ':'))
    )

# petite index rapide
index = {
    l: {
        'minLat': g.LATITUDE.min(), 'maxLat': g.LATITUDE.max(),
        'minLon': g.LONGITUDE.min(), 'maxLon': g.LONGITUDE.max()
    }
    for l, g in df.groupby('ligne')
}
(out_dir / 'index.json').write_text(json.dumps(index, separators=(',', ':')))

