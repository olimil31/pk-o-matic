// renvoie les lignes dont la box 2 km contient (lat, lon)
export async function matchingLines(lat, lon) {
  const index = await (await fetch('/data/pks/index.json')).json();
  const lines = [];
  for (const [l, box] of Object.entries(index)) {
    if (
      lat >= box.minLat - 0.02 && lat <= box.maxLat + 0.02 &&
      lon >= box.minLon - 0.02 && lon <= box.maxLon + 0.02
    ) {
      lines.push(l);
    }
  }
  return lines;
}

