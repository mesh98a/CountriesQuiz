import Globe from 'globe.gl';
import * as THREE from 'three';
import { setupGame } from './gamelogic.js';
import './style.css';
import getStarfield from './getStarfield.js';
import { getFullMap } from './map.js';
import { getSelectedContinents, updateSelectedContinentsFromForm } from './options.js';
import { XRButton } from 'three/addons/webxr/XRButton.js';

let geoJsonData = null;
let world;

document.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globeViz');

    // Initialize the 3D globe
    world = Globe()(globeContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .polygonCapColor(() => 'rgba(0, 200, 167, 0.5)')
        .polygonSideColor(() => 'rgba(0, 55, 100, 0.2)')
        .polygonStrokeColor(() => '#111')
        .polygonAltitude(0.01);

    // Add star background
    const starfield = getStarfield({ numStars: 5000 });
    world.scene().add(starfield);

    const renderer = world.renderer ? world.renderer() : null;
    if (renderer) {
        renderer.xr.enabled = true;

        try {
            const arBtn = XRButton.createButton(renderer, {
                // optionalFeatures erhöhen Kompatibilität mit AR-Geräten
                optionalFeatures: ['local-floor', 'bounded-floor', 'hit-test']
            });
            // Falls ein #controls Container existiert, dort anhängen, sonst ins Globe-Container
            const controlsContainer = document.getElementById('controls') || globeContainer;
            controlsContainer.appendChild(arBtn);
        } catch (err) {
            console.warn('AR button konnte nicht erstellt werden:', err);
        }

        // Renderer-Loop auf WebXR umstellen, damit AR-Sitzungen gerendert werden
        renderer.setAnimationLoop(() => {
            renderer.render(world.scene(), world.camera());
        });
    } else {
        console.warn('Renderer vom Globe-Objekt nicht erreichbar; AR-Button nicht angehängt.');
    }

    // Handle window resize
    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);

    function resizeGlobe() {
        const width = globeContainer.clientWidth;
        const height = globeContainer.clientHeight;
        world.width(width);
        world.height(height);
    }

    // Load custom GeoJSON data for countries
    fetch('custom.geo.json')
        .then(res => res.json())
        .then(data => {
            geoJsonData = data.features;
            world.polygonsData(geoJsonData);
        });

    // Listen for changes in the continent selection form
    const continentForm = document.getElementById('continentForm');
    continentForm.addEventListener('change', () => {
        updateSelectedContinentsFromForm(continentForm);
    });

    // Start the game
    document.getElementById('playBtn')?.addEventListener('click', () => {
        showSection('game');
        if (geoJsonData) {
            setupGame(world, geoJsonData, new Set(getSelectedContinents()));
        }
    });

    // Navigate to options screen
    document.getElementById('optionsBtn')?.addEventListener('click', () => showSection('options'));

    // Navigate to learning mode and show all flags
    document.getElementById('learnBtn')?.addEventListener('click', () => {
        showSection('learn');
        getFullMap(world, geoJsonData);
    });

    // Return from game to main menu
    document.getElementById('playBackBtn')?.addEventListener('click', () => {
        resetGame();
        showSection('main-menu');
    });

    // Return from learn mode to main menu
    document.getElementById('learnBackBtn')?.addEventListener('click', () => {
        resetGlobeColors();
        showSection('main-menu');
    });

    // Exit options and return to main menu
    document.getElementById('saveExitBtn')?.addEventListener('click', () => showSection('main-menu'));

    // Show one section and hide all others
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

    // Reset game UI and globe colors
    function resetGame() {
        document.getElementById('country').textContent = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('score').textContent = '🏆 Score: 0';
        resetGlobeColors();
    }

    // Reset all country colors on the globe to the default
    function resetGlobeColors() {
        if (!world) return;

        world.polygonCapMaterial(() =>
            new THREE.MeshBasicMaterial({ color: 'rgba(0, 200, 167, 0.5)' })
        );
    }
});
