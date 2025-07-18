import Globe from 'globe.gl';
import * as THREE from 'three';
import { setupGame } from './gamelogic.js';
import './style.css';
import getStarfield from './getStarfield.js';
import { getFullMap } from './map.js';
import { getSelectedContinents, updateSelectedContinentsFromForm } from './options.js';

let geoJsonData = null;
let world;

document.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globeViz');

    world = Globe()(globeContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .polygonCapColor(() => 'rgba(0, 200, 167, 0.5)')
        .polygonSideColor(() => 'rgba(0, 55, 100, 0.2)')
        .polygonStrokeColor(() => '#111')
        .polygonAltitude(0.01);

    const starfield = getStarfield({ numStars: 5000 });
    world.scene().add(starfield);

    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);

    function resizeGlobe() {
        const width = globeContainer.clientWidth;
        const height = globeContainer.clientHeight;
        world.width(width);
        world.height(height);
    }

    fetch('custom.geo.json')
        .then(res => res.json())
        .then(data => {
            geoJsonData = data.features;
            world.polygonsData(geoJsonData);
        });

    const continentForm = document.getElementById('continentForm');
    continentForm.addEventListener('change', () => {
        updateSelectedContinentsFromForm(continentForm);
    });

    document.getElementById('playBtn')?.addEventListener('click', () => {
        showSection('game');
        if (geoJsonData) {
            setupGame(world, geoJsonData, new Set(getSelectedContinents()));
        }
    });

    document.getElementById('optionsBtn')?.addEventListener('click', () => showSection('options'));

    document.getElementById('learnBtn')?.addEventListener('click', () => {
        showSection('learn');
        getFullMap(world, geoJsonData);
    });

    document.getElementById('playBackBtn')?.addEventListener('click', () => {
        resetGame();
        showSection('main-menu');
    });

    document.getElementById('learnBackBtn')?.addEventListener('click', () => {
        resetGlobeColors();
        showSection('main-menu');
    });

    document.getElementById('saveExitBtn')?.addEventListener('click', () => showSection('main-menu'));

    // Show/hide UI sections
    function showSection(sectionId) {
        ['main-menu', 'game', 'options', 'learn'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        const section = document.getElementById(sectionId);
        if (section) section.style.display = 'flex';

        const playBackBtn = document.getElementById('playBackBtn');
        if (playBackBtn) {
            playBackBtn.style.display = sectionId === 'main-menu' ? 'none' : 'block';
        }
    }

    // Clear game UI + reset globe
    function resetGame() {
        document.getElementById('country').textContent = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('score').textContent = '🏆 Score: 0';
        resetGlobeColors();
    }

    function resetGlobeColors() {
        if (!world) return;

        world.polygonCapMaterial(() =>
            new THREE.MeshBasicMaterial({ color: 'rgba(0, 200, 167, 0.5)' })
        );
    }
});
