import { getFlagMaterial } from './flags.js';

export function getFullMap(world, features) {
  world
    .polygonsData(features)
    .polygonCapMaterial(({ properties }) => {
      const isoCode = properties.iso_a2_eh;
      return getFlagMaterial(isoCode);
    });

  const label = document.getElementById('countryLabel');

  document.addEventListener('mousemove', (e) => {
    label.style.left = `${e.clientX + 15}px`;
    label.style.top = `${e.clientY + 15}px`;
  });

  world.onPolygonHover((hoverD) => {
    if (hoverD) {
      label.style.display = 'block';
      label.textContent = hoverD.properties.name.toUpperCase();
    } else {
      label.style.display = 'none';
      label.textContent = '';
    }
  });
}