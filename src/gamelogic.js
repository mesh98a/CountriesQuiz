import * as THREE from 'three';
import { getFlagMaterial } from './flags.js';

let score = 0;
let targetCountry = null;
let targetIso = null;
let guessedIsoCodes = new Set();
let usedIsoCodes = new Set();
let worldRef = null;
let validCountries = [];

export function setupGame(world, features, selectedContinents) {
    worldRef = world;
    score = 0;
    guessedIsoCodes.clear();
    usedIsoCodes.clear();

    const countryEl = document.getElementById('country');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');
    const skipButton = document.getElementById('skipBtn');

    validCountries = features.filter(
        f => f.properties.iso_a2_eh &&
            selectedContinents.has(f.properties.continent)
    );

    function pickRandomCountry() {
        const countries = validCountries.filter(
            f => !usedIsoCodes.has(f.properties.iso_a2_eh)
        );

        if (countries.length === 0) {
            countryEl.textContent = "🎉 Guessed all countries!";
            targetCountry = null;
            return;
        }

        targetCountry = countries[Math.floor(Math.random() * countries.length)];
        targetIso = targetCountry.properties.iso_a2_eh;
        countryEl.textContent = targetCountry.properties.name.toUpperCase();
    }

    world.onPolygonClick((clickedFeature) => {
        if (!targetCountry) return;

        const selectedIso = clickedFeature.properties.iso_a2_eh;

        if (clickedFeature.properties.name === targetCountry.properties.name) {
            score += 5;
            showPointsChange(5);
            guessedIsoCodes.add(selectedIso);
            usedIsoCodes.add(selectedIso);
            showFeedback('✅ Correct!');
            updateFlags(world);
            pickRandomCountry();
        } else {
            const deduction = Math.min(score, 10);
            score -= deduction;
            showPointsChange(-deduction);
            showFeedback('❌ Wrong!');
        }

        scoreEl.textContent = `🏆 Score: ${score}`;
    });

    skipButton.addEventListener('click', () => {
        feedbackEl.textContent = 'Skipped country';
        feedbackEl.classList.add('show');
        // Skipped country NOT added to usedIsoCodes
        pickRandomCountry();
        setTimeout(() => {
            feedbackEl.classList.remove('show');
        }, 1200);
    });

    pickRandomCountry();
}

function showFeedback(message) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = message;
    feedbackEl.classList.add('show');

    setTimeout(() => {
        feedbackEl.classList.remove('show');
    }, 1500);
}

function updateFlags(world) {
    world.polygonCapMaterial(({ properties }) => {
        const code = properties.iso_a2_eh;
        return guessedIsoCodes.has(code)
            ? getFlagMaterial(code)
            : new THREE.MeshBasicMaterial({
                color: 'rgba(0, 200, 167, 0.5)'
            });
    });
}

export function resetGame() {
    score = 0;
    targetCountry = null;
    targetIso = null;
    guessedIsoCodes.clear();
    usedIsoCodes.clear();

    const countryEl = document.getElementById('country');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');

    if (countryEl) countryEl.textContent = 'COUNTRY';
    if (scoreEl) scoreEl.textContent = '🏆 Score: 0';
    if (feedbackEl) feedbackEl.textContent = '';

    if (worldRef) {
        worldRef.polygonCapMaterial(() =>
            new THREE.MeshBasicMaterial({
                color: 'rgba(0, 200, 167, 0.5)'
            })
        );
    }
}

function showPointsChange(amount) {
  const el = document.getElementById('pointsChange');
  if (!el) return;

  el.textContent = (amount > 0 ? `+${amount}` : `${amount}`);
  el.classList.remove('positive', 'negative', 'show');

  void el.offsetWidth;

  el.classList.add(amount > 0 ? 'positive' : 'negative', 'show');

  setTimeout(() => {
    el.classList.remove('show');
  }, 800);
}