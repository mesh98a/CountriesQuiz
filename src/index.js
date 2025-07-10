import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import Globe from 'globe.gl';
import { setupGame } from './gamelogic.js';
import './style.css';
import getStarfield from './getStarfield.js';
import { getFullMap } from './map.js';


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
const backButton = document.getElementById('backBtn');
let geoJsonData = null;

document.getElementById('playBtn').addEventListener('click', () => {
    /*  menuDiv.style.display = 'none';
     gameDiv.style.display = 'block';
     backButton.style.display = 'block'; */
    showSection('game')

    if (geoJsonData) {
        setupGame(world, geoJsonData); // Spiel erst hier starten
    } else {
        console.error("GeoJSON data not loaded yet.");
    }
})
document.getElementById('optionsBtn').addEventListener('click', () => showSection('options'));

document.getElementById('mapBtn').addEventListener('click', () => {

    showSection('map');

    getFullMap(world,geoJsonData);

});

document.getElementById('backBtn').addEventListener('click', () => showSection('menu'));
/* document.getElementById('optionsBtn').addEventListener('click', () => {
    menuDiv.style.display = 'none';
    gameDiv.style.display = 'none';
    backButton.style.display = 'block';
})

document.getElementById('mapBtn').addEventListener('click', () => {
    menuDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    backButton.style.display = 'block';
    
}) */
/* document.getElementById('backBtn').addEventListener('click', () => {
    menuDiv.style.display = 'flex';
    gameDiv.style.display = 'none';
    backButton.style.display = 'none';
}) */
// GeoJSON laden
fetch('custom.geo.json')
    .then(res => res.json())
    .then(data => {
        geoJsonData = data.features
        world.polygonsData(geoJsonData);
    });

/* window.addEventListener('resize', () => {
    world.width([globeContainer.clientWidth]);
    world.height([globeContainer.clientHeight]);
}); */

function resizeGlobe() {
    const width = globeContainer.clientWidth;
    const height = globeContainer.clientHeight;
    world.width(width);
    world.height(height);
}
// Initial einmal setzen:
resizeGlobe();
// Dann bei jeder Fensteränderung
window.addEventListener('resize', resizeGlobe);


function showSection(sectionId) {

    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('map').style.display = 'none';

    document.getElementById(sectionId).style.display = 'flex';

    // Nur Menü zeigt keinen Zurück-Button
    if (sectionId === 'menu') {
        document.getElementById('backBtn').style.display = 'none';
    } else {
        document.getElementById('backBtn').style.display = 'block';
    }
}
/* function scaleApp() {
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = Math.min(scaleX, scaleY); // Seitenverhältnis beibehalten

  const app = document.getElementById('app');
  app.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', scaleApp);
scaleApp(); */