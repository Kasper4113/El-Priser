// MODEL: henter og regner på data. Ingen HTML her.

export function getRegionCode() {
    let region = localStorage.getItem('region');
    let code = 'DK2';

    if (region === 'west') {
        code = 'DK1';
    }

    return (code);
}

export async function fetchDayPrices(date = new Date()) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let region = getRegionCode();
    let url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${region}.json`;

    let response = await fetch(url);

    if (!response.ok) {
        throw new Error('Kunne ikke hente priser');
    }

    let prices = await response.json();
    return (prices);
}

// Prisen der gælder lige nu (undefined hvis der ikke er en)
export function findCurrentPrice(prices) {
    let now = new Date();

    let match = prices.find((entry) => {
        return now >= new Date(entry.time_start) && now < new Date(entry.time_end);
    });

    return (match);
}

// Kun priser der er startet (ingen fremtidige)
export function getPricesUntilNow(prices) {
    let now = new Date();

    let started = prices.filter((entry) => new Date(entry.time_start) <= now);
    return (started);
}

// Nyeste først, og kun de første "count" stykker
export function newestFirst(prices, count = 8) {
    let sorted = prices
        .slice() // kopi, så vi ikke ændrer originalen
        .sort((a, b) => new Date(b.time_start) - new Date(a.time_start))
        .slice(0, count);

    return (sorted);
}

export function getLowHigh(prices) {
    let result = { low: 0, high: 0 };

    if (prices.length > 0) {
        let values = prices.map((entry) => entry.DKK_per_kWh);
        result = { low: Math.min(...values), high: Math.max(...values) };
    }

    return (result);
}