import cheapRuler from 'https://cdn.skypack.dev/cheap-ruler@4';

export async function nearestPK(lat, lon) {
  const lines = await import('./marginBox.js').then(m => m.matchingLines(lat, lon));
  if (!lines.length) return null;

  let best = null, bestDist = 1e9;
  for (const l of lines) {
    const pts = await (await fetch(`/data/pks/${l}.json`)).json();
    const ruler = cheapRuler(lat);
    for (let i = 1; i < pts.length; i++) {
      const proj = ruler.pointOnLine(
        [pts[i-1].lon, pts[i-1].lat],
        [pts[i].lon,   pts[i].lat],
        [lon, lat]
      );
      const dist = ruler.distance([lon, lat], proj.point);
      if (dist < bestDist) {
        bestDist = dist;
        const pk0 = pts[i-1].pk, pk1 = pts[i].pk;
        const ratio = proj.t;
        best = { ligne: l, pk: (pk0 + ratio * (pk1 - pk0)).toFixed(1), distance: dist };
      }
    }
  }
  return best;
}

