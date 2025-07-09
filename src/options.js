
export function filterGame(world, features) {

    document.getElementById('backBtn').addEventListener('click', () => {
        menuDiv.style.display = 'flex';
        gameDiv.style.display = 'none';
    })


    function filterFeaturesByContinent(features, continentName) {
    return features.filter(feature => 
        feature.properties.continent === continentName
    );
}
}
