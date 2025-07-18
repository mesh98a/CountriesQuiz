import * as THREE from 'three';
import { getFlagMaterial } from './flags.js';

// Game state variables
let score = 0;
let targetCountry = null;
let targetIso = null;
let guessedIsoCodes = new Set();  // Correctly guessed countries
let usedIsoCodes = new Set();     // Countries already attempted (correct or not)
let worldRef = null;
let validCountries = [];          // Filtered countries based on selected continents

// Initializes and starts a new game round
export function setupGame(world, features, selectedContinents) {
    worldRef = world;
    score = 0;
    guessedIsoCodes.clear();
    usedIsoCodes.clear();

    const countryEl = document.getElementById('country');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');
    const skipButton = document.getElementById('skipBtn');

    // Filter countries by selected continents and presence of ISO code
    validCountries = features.filter(
        f => f.properties.iso_a2_eh &&
            selectedContinents.has(f.properties.continent)
    );

    // Pick a random country that hasn't been used yet
    function pickRandomCountry() {
        const countries = validCountries.filter(
            f => !usedIsoCodes.has(f.properties.iso_a2_eh)
        );

        if (countries.length === 0) {
            // All countries guessed
            countryEl.textContent = "🎉 Guessed all countries!";
            targetCountry = null;
            return;
        }

        targetCountry = countries[Math.floor(Math.random() * countries.length)];
        targetIso = targetCountry.properties.iso_a2_eh;
        countryEl.textContent = targetCountry.properties.name.toUpperCase();
    }

    // Handle polygon (country) click on the globe
    world.onPolygonClick((clickedFeature) => {
        if (!targetCountry) return;

        const selectedIso = clickedFeature.properties.iso_a2_eh;

        if (clickedFeature.properties.name === targetCountry.properties.name) {
            // Correct guess
            score += 5;
            showPointsChange(5);
            guessedIsoCodes.add(selectedIso);
            usedIsoCodes.add(selectedIso);
            showFeedback('✅ Correct!');
            updateFlags(world);
            pickRandomCountry();
        } else {
            // Wrong guess
            const deduction = Math.min(score, 10);
            score -= deduction;
            showPointsChange(-deduction);
            showFeedback('❌ Wrong!');
        }

        scoreEl.textContent = `🏆 Score: ${score}`;
    });

    // Handle skip button click
    skipButton.addEventListener('click', () => {
        feedbackEl.textContent = 'Skipped country';
        feedbackEl.classList.add('show');
        // Skipped country is NOT added to usedIsoCodes (can appear again)
        pickRandomCountry();
        setTimeout(() => {
            feedbackEl.classList.remove('show');
        }, 1200);
    });

    pickRandomCountry(); 
}

// Show feedback message (Correct / Wrong / Skipped)
function showFeedback(message) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = message;
    feedbackEl.classList.add('show');

    setTimeout(() => {
        feedbackEl.classList.remove('show');
    }, 1500);
}

// Update flag display on countries that have been correctly guessed
function updateFlags(world) {
    world.polygonCapMaterial(({ properties }) => {
        const code = properties.iso_a2_eh;
        return guessedIsoCodes.has(code)
            ? getFlagMaterial(code) // Show country flag
            : new THREE.MeshBasicMaterial({
                color: 'rgba(0, 200, 167, 0.5)' 
            });
    });
}

// Reset all game data and visuals
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

// Display visual points animation (+5 or -10)
function showPointsChange(amount) {
    const el = document.getElementById('pointsChange');
    if (!el) return;

    el.textContent = (amount > 0 ? `+${amount}` : `${amount}`);
    el.classList.remove('positive', 'negative', 'show');

    // Trigger reflow to restart CSS animation
    void el.offsetWidth;

    el.classList.add(amount > 0 ? 'positive' : 'negative', 'show');

    setTimeout(() => {
        el.classList.remove('show');
    }, 800);
}
