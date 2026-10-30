function formatTime(isoString) {
    let date = new Date(isoString);
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    let text = `${hours}.${minutes}`;
    return (text);
}

export function createPriceNow({ current = null, label = 'ELPRISEN LIGE NU' } = {}) {
    // Ingen pris? Så viser vi en streg i stedet for et falsk tal
    let priceText = '–';
    let timeText = '';

    if (current) {
        priceText = current.DKK_per_kWh.toFixed(3);
        timeText = `${formatTime(current.time_start)} - ${formatTime(current.time_end)}`;
    }

    let section = document.createElement('section');
    section.className = 'price-now-section';

    section.innerHTML = `
        <h1 class="price-now-title">${label}</h1>
        <div class="price-ring-wrap">
            <img src="./assets/img/Cirkle-rings.svg" alt="Cirkle rings" class="price-ring">
            <div class="price-ring-center">
                <div class="price-number-line">
                    <span class="price-value">${priceText}</span>
                    <span class="price-currency">KR</span>
                </div>
                <div class="price-unit">PR. KWH</div>
            </div>
        </div>
        <div class="price-time">${timeText}</div>
    `;

    return (section);
}