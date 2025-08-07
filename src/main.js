import { nearestPK } from './geo/nearest.js';

navigator.geolocation.watchPosition(async pos => {
  const { latitude, longitude, speed } = pos.coords;
  const res = await nearestPK(latitude, longitude);
  document.getElementById('pk').textContent = res
    ? `${res.ligne} PK ${res.pk}`
    : 'Hors ligne SNCF';
  document.getElementById('speed').textContent = speed
    ? `${(speed * 3.6).toFixed(0)} km/h`
    : '';
}, null, { enableHighAccuracy: true, maximumAge: 5000 });
