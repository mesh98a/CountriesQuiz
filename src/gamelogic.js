import * as THREE from 'three';
import { getFlagMaterial } from './flags.js';
export function setupGame(world, features) {
    let score = 0;
    let targetCountry = null;
    let targetIso = null;

    const questionEl = document.getElementById('question');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');
    const skipButton = document.getElementById('skipBtn');


    function pickRandomCountry() {
        const europeCountries = features.filter(
            f => f.properties.continent === 'Europe'
        );
        const remainingCountries = europeCountries.filter(
            f => !usedIsoCodes.has(f.properties.iso_a2_eh)
        );
        console.log(usedIsoCodes)

        if (remainingCountries.length === 0) {
            questionEl.textContent = "🎉 Alle Länder erraten!";
            targetCountry = null;
            return;
        }
        targetCountry = remainingCountries[Math.floor(Math.random() * remainingCountries.length)];
        targetIso = targetCountry.properties.iso_a2_eh
        //console.log("Neues Ziel:", targetCountry.properties.name);
        questionEl.textContent = targetCountry.properties.name.toUpperCase();
    }


    const guessedIsoCodes = new Set();
    const usedIsoCodes = new Set();

    let selectedCountryName = null;
    let selectedIso = null;

    world.onPolygonClick((clickedFeature) => {
        if (!targetCountry) return;
        selectedCountryName = clickedFeature.properties.name;
        selectedIso = clickedFeature.properties.iso_a2_eh;
        //updateGlobeColors(world, selectedCountryName);
        if (clickedFeature.properties.name === targetCountry.properties.name) {
            score++;
            feedbackEl.textContent = '✅ Correct!';
            guessedIsoCodes.add(selectedIso);
            usedIsoCodes.add(selectedIso);
            //selectedCountryName = null
            world.polygonCapMaterial(({ properties }) => {
                const code = properties.iso_a2_eh;
                return guessedIsoCodes.has(code)
                    ? getFlagMaterial(code)
                    : new THREE.MeshBasicMaterial({
                        color: 'rgba(0, 200, 167, 0.5)'
                    });
            });
             pickRandomCountry();
            //updateGlobeColors(world, selectedCountryName);

        } else {
            feedbackEl.textContent = '❌ Wrong!';
        }

        scoreEl.textContent = `Score: ${score}`;
    });


    skipButton.addEventListener('click', () => {
        feedbackEl.textContent = '⏭️ Übersprungen!';
        usedIsoCodes.add(targetIso);
        setTimeout(() => {
            feedbackEl.textContent = '';
            pickRandomCountry();
        }, 1000);
    });

    pickRandomCountry();
}

function updateGlobeColors(world, currentlySelected) {


    world
        .polygonCapColor(({ properties }) =>
            properties.name === currentlySelected ? 'orange' : 'rgba(0, 200, 167, 0.5)'
        )
        .polygonAltitude(({ properties }) =>
            properties.name === currentlySelected ? 0.03 : 0.01
        );

}