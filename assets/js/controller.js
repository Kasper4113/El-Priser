// CONTROLLER: henter data fra modellen og giver det til viewene.

import { fetchDayPrices, findCurrentPrice, getPricesUntilNow, newestFirst, getLowHigh } from './model.js';
import { createOversigtPage } from './pages/oversigt.js';
import { createLigeNuPage } from './pages/ligeNu.js';
import { createHistorikPage, updateHistorikList } from './pages/historik.js';
import { createDesktopPage } from './desktop/desktop.js';
import { createFooter } from './components/footer.js';

const mobileCount = 8;   // antal priser i listerne på mobil og tablet
const desktopCount = 8;  // kan ændre mængden på desktop

// Giver en tom liste hvis hentningen fejler, så siden ikke går i stykker
async function loadPrices(date) {
    let prices = [];

    try {
        prices = await fetchDayPrices(date);
    } catch (error) {
        console.warn('Priser kunne ikke hentes:', error);
    }

    return (prices);
}

async function buildOversigt(count) {
    let prices = await loadPrices(new Date());
    let latest = newestFirst(getPricesUntilNow(prices), count);
    let { low, high } = getLowHigh(latest);

    let page = createOversigtPage({ prices: latest, low, high });
    return (page);
}

async function buildLigeNu() {
    let prices = await loadPrices(new Date());
    let current = findCurrentPrice(prices);

    let page = createLigeNuPage({ current });
    return (page);
}

async function buildHistorik(count) {
    let prices = await loadPrices(new Date());

    let page = createHistorikPage({
        prices: newestFirst(prices, count),
        onDateChange: async (date) => {
            let newPrices = await loadPrices(date);
            updateHistorikList(page, newestFirst(newPrices, count));
        }
    });

    return (page);
}

const builders = {
    oversigt: buildOversigt,
    ligeNu: buildLigeNu,
    historik: buildHistorik
};

// Lægger indholdet og footeren i hver sin plads i en fælles kasse
function addFooter(content) {
    let wrapper = document.createElement('div');
    wrapper.className = 'page-wrapper';
    wrapper.append(content, createFooter());

    return (wrapper);
}

// Mobil og tablet: én side ad gangen. Navigationen kalder denne med fx 'oversigt'
export async function loadPage(pageId) {
    let build = builders[pageId] || builders.ligeNu;
    let page = await build(mobileCount);

    return (addFooter(page));
}

// Desktop: alle 3 sider på én gang
export async function loadDesktop() {
    // Promise.all henter alle tre sider samtidig i stedet for efter hinanden
    let [ligeNu, oversigt, historik] = await Promise.all([
        buildLigeNu(),
        buildOversigt(desktopCount),
        buildHistorik(desktopCount)
    ]);

    let desktop = createDesktopPage({ ligeNu, oversigt, historik });
    return (addFooter(desktop));
}