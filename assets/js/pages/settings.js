import { createSettingsFooter, updateSettingsFooter } from '../components/settingFooter.js';

function createToggle(labelText, storageKey, onChange) {
    const row = document.createElement('label');
    row.className = 'settings-row';

    const text = document.createElement('span');
    text.textContent = labelText;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'settings-switch';
    input.checked = localStorage.getItem(storageKey) === 'true';

    input.addEventListener('change', () => {
        localStorage.setItem(storageKey, input.checked);
        onChange();
    });

    row.appendChild(text);
    row.appendChild(input);
    return (row);
}

function createRegionRow(onChange) {
    const row = document.createElement('label');
    row.className = 'settings-row';

    const text = document.createElement('span');
    text.textContent = 'VÆLG REGION';

    const select = document.createElement('select');
    select.className = 'settings-select';

    const regions = [
        { value: 'east', name: 'REGION ØST' },
        { value: 'west', name: 'REGION VEST' }
    ];

    regions.forEach((region) => {
        const option = document.createElement('option');
        option.value = region.value;
        option.textContent = region.name;
        select.appendChild(option);
    });

    select.value = localStorage.getItem('region') || 'east';

    select.addEventListener('change', () => {
        localStorage.setItem('region', select.value);
        onChange();
    });

    row.appendChild(text);
    row.appendChild(select);
    return (row);
}

export function createSettings() {
    const wrapper = document.createElement('div');
    wrapper.className = 'settings-page';

    const content = document.createElement('div');
    content.className = 'settings-content';

    const footer = createSettingsFooter();

    const refreshFooter = () => {
        updateSettingsFooter(footer);
    };

    const title = document.createElement('h2');
    title.className = 'settings-title';
    title.textContent = 'INDSTILLINGER';

    content.appendChild(title);
    content.appendChild(createToggle('PRISER INKL. MOMS', 'moms', refreshFooter));
    content.appendChild(createToggle('LAVESTE PRIS ALARM', 'alarm', refreshFooter));
    content.appendChild(createRegionRow(refreshFooter));

    wrapper.appendChild(content);
    wrapper.appendChild(footer);

    return (wrapper);
}