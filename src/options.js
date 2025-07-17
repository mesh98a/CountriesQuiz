const selectedContinents = new Set([
    'Africa', 'Asia', 'Europe',
    'North America', 'South America',
    'Oceania', 'Antarctica'
]);

export function getSelectedContinents() {
    return Array.from(selectedContinents);
}

export function setSelectedContinents(newSelection) {
    selectedContinents.clear();
    newSelection.forEach(continent => selectedContinents.add(continent));
}

export function updateSelectedContinentsFromForm(formElement) {
    const newSelection = Array.from(
        formElement.querySelectorAll('input[name="continent"]:checked')
    ).map(el => el.value);

    setSelectedContinents(newSelection);
}

