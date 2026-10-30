export function updateSettingsFooter(footer) {
    const momsOn = localStorage.getItem('moms') === 'true';
    const region = localStorage.getItem('region') || 'east';

    let momsText = 'ex. moms';
    if (momsOn) {
        momsText = 'inkl. moms';
    }

    let regionText = 'Øst Danmark';
    if (region === 'west') {
        regionText = 'Vest Danmark';
    }

    footer.innerHTML = `
        <p>Priserne er <span class="footer-highlight">${momsText}</span> og afgifter</p>
        <p>Du vises lige nu priserne for <span class="footer-highlight">${regionText}</span></p>
    `;
}

export function createSettingsFooter() {
    const footer = document.createElement('div');
    footer.className = 'settings-footer';

    updateSettingsFooter(footer);

    return (footer);
}