// Set of currently selected continents (default: all)
const selectedContinents = new Set([
    'Africa', 'Asia', 'Europe',
    'North America', 'South America',
    'Oceania', 'Antarctica'
]);

//Returns an array of currently selected continents.
export function getSelectedContinents() {
    return Array.from(selectedContinents);
}

//Updates the selected continents with a new selection.
export function setSelectedContinents(newSelection) {
    selectedContinents.clear();
    newSelection.forEach(continent => selectedContinents.add(continent));
}

// Updates the selected continents based on form checkbox inputs.
export function updateSelectedContinentsFromForm(formElement) {
    const newSelection = Array.from(
        formElement.querySelectorAll('input[name="continent"]:checked')
    ).map(el => el.value);

    setSelectedContinents(newSelection);
}

