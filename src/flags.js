import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const flagTextures = {};

// Liste der Länder-Codes, die du brauchst (ISO A2)
const countryCodes = [
  'AL','AD','AM','AT','AZ','BY','BE','BA','BG','HR','CY','CZ','DK','EE','FI',
  'FR','GE','DE','GR','HU','IS','IE','IT','KZ','XK','LV','LI','LT','LU','MT',
  'MD','MC','ME','NL','MK','NO','PL','PT','RO','RU','SM','RS','SK','SI','ES',
  'SE','CH','TR','UA','GB','VA'
];

// Flaggen laden
countryCodes.forEach(code => {
  flagTextures[code] = loader.load(`flags/${code.toLowerCase()}.png`);
});


export function getFlagMaterial(countryCode) {
  const upperCode = countryCode?.toUpperCase();
  const texture = flagTextures[upperCode];

  if (texture) {
    return new THREE.MeshBasicMaterial({ map: texture });
  }

  // Fallback-Material (wenn keine Flagge vorhanden)
  return new THREE.MeshBasicMaterial({ color: 'rgba(0, 200, 167, 0.5)' });
}