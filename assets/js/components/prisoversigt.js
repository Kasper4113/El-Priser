function formatClockLabel(isoString) {
    let date = new Date(isoString);
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    let label = `${hours}.${minutes}`;
    return (label);
}

export function createPriceOverview({ prices = [] } = {}) {
    let wrapper = document.createElement('div');
    wrapper.className = 'overview-list';

    if (prices.length === 0) {
        let emptyRow = document.createElement('div');
        emptyRow.className = 'overview-empty';
        emptyRow.textContent = 'Ingen priser fundet';
        wrapper.appendChild(emptyRow);
        return (wrapper);
    }

    prices.forEach((item) => {
        let row = document.createElement('div');
        row.className = 'overview-row';

        let time = document.createElement('div');
        time.className = 'overview-time';
        time.textContent = `kl. ${formatClockLabel(item.time_start)}`;

        let price = document.createElement('div');
        price.className = 'overview-price';
        price.textContent = `${item.DKK_per_kWh.toFixed(3)} kr`;

        row.append(time, price);
        wrapper.appendChild(row);
    });

    return (wrapper);
}