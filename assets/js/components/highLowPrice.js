export function createHighLowPrice({
    lowest = 0,
    highest = 0,
    lowestLabel = 'LAVESTE PRIS',
    highestLabel = 'HØJESTE PRIS'
} = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = 'highlow-grid';

    const createCircleCard = ({ value, label, accentClass }) => {
        const card = document.createElement('div');
        card.className = 'highlow-card';

        const ring = document.createElement('div');
        ring.className = 'highlow-ring';
        ring.style.backgroundImage = "url('./assets/img/oversigt-cirkel.svg')";

        const valueWrap = document.createElement('div');
        valueWrap.className = `highlow-value ${accentClass}`;
        valueWrap.innerHTML = `
            <span>${Number(value).toFixed(3)}</span>
            <small>KR</small>
        `;

        const unit = document.createElement('div');
        unit.className = 'highlow-unit';
        unit.textContent = 'PR. KWH';

        ring.appendChild(valueWrap);
        ring.appendChild(unit);

        const title = document.createElement('div');
        title.className = 'highlow-title';
        title.textContent = label;

        card.appendChild(ring);
        card.appendChild(title);
        return card;
    };

    wrapper.appendChild(createCircleCard({ value: lowest, label: lowestLabel, accentClass: 'low' }));
    wrapper.appendChild(createCircleCard({ value: highest, label: highestLabel, accentClass: 'high' }));

    return wrapper;
}