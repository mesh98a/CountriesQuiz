export function setupGame(world, features) {
    let score = 0;
    let targetCountry = null;

    const questionEl = document.getElementById('question');
    const scoreEl = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');
    const skipButton = document.getElementById('skipBtn');

    function pickRandomCountry() {
        targetCountry = features[Math.floor(Math.random() * features.length)];
        console.log("Neues Ziel:", targetCountry.properties.name);
        questionEl.textContent = targetCountry.properties.name.toUpperCase();
    }
    let selectedCountryName = null;

    world.onPolygonClick((clickedFeature) => {
        if (!targetCountry) return;
        selectedCountryName = clickedFeature.properties.name;
        updateGlobeColors(world, selectedCountryName);
        if (clickedFeature.properties.name === targetCountry.properties.name) {
            score++;
            feedbackEl.textContent = '✅ Correct!';
            setTimeout(() => {
                feedbackEl.textContent = '';
                pickRandomCountry();
                selectedCountryName = null
                updateGlobeColors(world, selectedCountryName);
            }, 1500);
        } else {
            feedbackEl.textContent = '❌ Wrong!';
        }

        scoreEl.textContent = `Score: ${score}`;
        setTimeout(() => {
            feedbackEl.textContent = '';
        }, 1500);
    });
    skipButton.addEventListener('click', () => {
        feedbackEl.textContent = '⏭️ Übersprungen!';
        setTimeout(() => {
            feedbackEl.textContent = '';
            pickRandomCountry();
        }, 1000);
    });

    pickRandomCountry();
}
let currentlySelected = null;
function updateGlobeColors(world, currentlySelected) {

    /*   if (clickedName === currentlySelected) {
          currentlySelected = null;
      } else {А
          currentlySelected = clickedName;
      } */
    world
        .polygonCapColor(({ properties }) =>
            properties.name === currentlySelected ? 'orange' : 'rgba(0, 200, 167, 0.5)'
        )
        .polygonAltitude(({ properties }) =>
            properties.name === currentlySelected ? 0.03 : 0.01
        );

}