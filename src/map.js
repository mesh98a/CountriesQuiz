import { getFlagMaterial } from './flags.js';
import { tooltip } from './tooltip.js';

// Displays the full world map with flag textures and tooltip info on hover.
export function getFullMap(world, features) {
  // Set polygon data and apply flag textures to each country
  world
    .polygonsData(features)
    .polygonCapMaterial(({ properties }) => {
      const isoCode = properties.iso_a2_eh;
      return getFlagMaterial(isoCode);
    });

  const label = document.getElementById('countryLabel');
  
  // Position the tooltip label near the mouse cursor
  document.addEventListener('mousemove', (e) => {
    label.style.left = `${e.clientX + 15}px`;
    label.style.top = `${e.clientY + 15}px`;
  });

  // Show country info on hover
  world.onPolygonHover((hoverD) => {
    if (hoverD) {
      const isoCode = hoverD.properties.iso_a2_eh;
      const countryData = tooltip.find(c => c.iso2 === isoCode);
      // Show detailed info if data is available
      if (countryData) {
        label.style.display = 'block';
        label.innerHTML = `
        <strong>${countryData.name}</strong><br/>
        Capital: ${countryData.capital}<br/>
        Population: ${Number(countryData.population).toLocaleString()}<br/>
        Area: ${Number(countryData.area).toLocaleString()} km²
      `;
      } else {
        label.style.display = 'block';
        label.textContent = hoverD.properties.name.toUpperCase();
      }
    } else {
      label.style.display = 'none';
      label.textContent = '';
    }
  });
}