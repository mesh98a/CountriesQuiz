import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const flagTextures = {};

// ISO Alpha-2 country codes for which flag images exist
const countryCodes = [
  'AE', 'AF', 'AG', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BN', 'BO', 'BR',
  'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CY', 'CZ', 'DE', 'DJ', 'DK',
  'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FR', 'GA', 'GB', 'GE', 'GH', 'GL', 'GM', 'GN', 'GQ',
  'GR', 'GT', 'GW', 'GY', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IN', 'IQ', 'IR', 'IS', 'IT', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KM',
  'KP', 'KR', 'KW', 'KZ', 'LA', 'LB', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MD', 'ME', 'MG', 'MK', 'ML', 'MM',
  'MN', 'MR', 'MU', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NZ', 'OM', 'PA', 'PE', 'PG', 'PH',
  'PK', 'PL', 'PR', 'PS', 'PT', 'PY', 'QA', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SD', 'SE', 'SI', 'SK', 'SL', 'SN', 'SO', 'SR',
  'SS', 'SV', 'SY', 'SZ', 'TD', 'TG', 'TH', 'TJ', 'TL', 'TM', 'TN', 'TR', 'TT', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VE', 'VN',
  'VU', 'XK', 'YE', 'ZA', 'ZM', 'ZW'
];

// Load each country's flag image and store it in the flagTextures object
countryCodes.forEach(code => {
  flagTextures[code] = loader.load(`flags/${code.toLowerCase()}.png`);
});

//Returns a THREE.js material with the flag texture of the given country.
export function getFlagMaterial(countryCode) {
  const upperCode = countryCode?.toUpperCase();
  const texture = flagTextures[upperCode];

  if (texture) {
    return new THREE.MeshBasicMaterial({ map: texture });
  }

  return new THREE.MeshBasicMaterial({ color: 'rgba(0, 200, 167, 0.5)' });
}