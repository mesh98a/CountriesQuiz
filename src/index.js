import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import Globe from 'globe.gl';
import { setupGame } from './gamelogic.js';
import './style.css';
import getStarfield from './getStarfield.js';


// Globe initialisieren
const world = Globe()
    (document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .polygonCapColor(() => 'rgba(0, 200, 167, 0.5)')
    .polygonSideColor(() => 'rgba(0, 55, 100, 0.2)')
    .polygonStrokeColor(() => '#111')
    .polygonAltitude(0.01);

const starfield = getStarfield({ numStars: 1000 });
world.scene().add(starfield);
const globeContainer = document.getElementById('globeViz');


const menuDiv = document.getElementById('menu');
const gameDiv = document.getElementById('game');
const optionDiv = document.getElementById('options');
let geoJsonData = null;

document.getElementById('playBtn').addEventListener('click', () => {
    menuDiv.style.display = 'none';
    gameDiv.style.display = 'block';

    if (geoJsonData) {
        setupGame(world, geoJsonData); // Spiel erst hier starten
    } else {
        console.error("GeoJSON data not loaded yet.");
    }
})
document.getElementById('optionsBtn').addEventListener('click', () => {
    menuDiv.style.display = 'none';
    gameDiv.style.display = 'none';
})

document.getElementById('mapBtn').addEventListener('click', () => {
    menuDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    world.labelsData(countriesCentroids)  // Array von Punkten mit { lat, lng, label }
        .labelLat(d => d.lat)
        .labelLng(d => d.lng)
        .labelText(d => d.label)
        .labelSize(1)
        .labelColor(() => 'white');

})

document.getElementById('backBtn').addEventListener('click', () => {
    menuDiv.style.display = 'flex';
    gameDiv.style.display = 'none';
})
// GeoJSON laden
fetch('custom.geo.json')
    .then(res => res.json())
    .then(data => {
        geoJsonData = data.features
        world.polygonsData(geoJsonData);
    });

window.addEventListener('resize', () => {
    world.width([globeContainer.clientWidth]);
    world.height([globeContainer.clientHeight]);
});

// Tooltip
/* const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.background = 'rgba(0,0,0,0.7)';
tooltip.style.color = '#fff';
tooltip.style.padding = '5px';
tooltip.style.borderRadius = '4px';
tooltip.style.pointerEvents = 'none';
tooltip.style.display = 'none';
document.body.appendChild(tooltip); */
function getCentroid(feature) {
  const coords = feature.geometry.coordinates;
  // Achtung: je nach GeoJSON Typ (Polygon, MultiPolygon) ist das komplexer
  // Für einfache Polygone, z.B. erstes Polygon:
  let points = coords[0];
  let latSum = 0;
  let lngSum = 0;
  points.forEach(point => {
    lngSum += point[0];
    latSum += point[1];
  });
  return {
    lng: lngSum / points.length,
    lat: latSum / points.length,
  };
}