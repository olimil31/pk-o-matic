// test immédiat
alert('Script chargé');
navigator.geolocation.getCurrentPosition(
  p => alert(`GPS OK : ${p.coords.latitude}, ${p.coords.longitude}`),
  e => alert(`GPS ERR : ${e.message}`)
);


console.clear(); console.log('v2');

alert('script chargé');   // 1er test
navigator.geolocation.watchPosition(async pos => {
  alert('GPS : ' + pos.coords.latitude + ', ' + pos.coords.longitude); // 2e test
  const res = await nearestPK(pos.coords.latitude, pos.coords.longitude);
  alert('PK résultat : ' + JSON.stringify(res));                       // 3e test
}, err => alert('GPS erreur : ' + err.message), { enableHighAccuracy: true });



import { nearestPK } from './geo/nearest.js';

const pkEl  = document.getElementById('pk');
const spdEl = document.getElementById('speed');

// petite div de debug visible sur mobile
const dbg = document.createElement('div');
dbg.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:#0008;color:lime;font-size:3vw;padding:2px;';
document.body.appendChild(dbg);

navigator.geolocation.watchPosition(async pos => {
  const { latitude, longitude, speed } = pos.coords;
  dbg.textContent = `GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

  try {
    const res = await nearestPK(latitude, longitude);
    dbg.textContent += ` | res=${JSON.stringify(res)}`;
    if (res) {
      pkEl.textContent  = `${res.ligne} PK ${res.pk}`;
      spdEl.textContent = speed ? `${(speed * 3.6).toFixed(0)} km/h` : '';
    } else {
      pkEl.textContent = 'Aucune voie';
    }
  } catch (e) {
    dbg.textContent += ` | ERR ${e.message}`;
  }
}, null, { enableHighAccuracy: true, maximumAge: 5000 });

