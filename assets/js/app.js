import { initNavigation } from './components/navigation.js';
import { createSettingsButton } from './components/tandhjul.js';
import { loadPage, loadDesktop } from './controller.js';

const app = document.querySelector('#app');

// Skal være samme tal som @media (min-width: 1200px) i style.css
const desktopQuery = window.matchMedia('(min-width: 1200px)');

let currentPage = 'ligeNu';

const nav = initNavigation((pageId) => {
    currentPage = pageId;
    renderPage();
});

const mainArea = document.createElement('div');
mainArea.className = 'main-area';
mainArea.appendChild(createSettingsButton());

const pageContainer = document.createElement('div');
pageContainer.className = 'page-container';
mainArea.appendChild(pageContainer);

// Viser én side på mobil/tablet og alle tre på desktop
async function renderPage() {
    let page;

    if (desktopQuery.matches) {
        page = await loadDesktop();
    } else {
        page = await loadPage(currentPage);
    }

    pageContainer.replaceChildren(page);
}

app.appendChild(nav);
app.appendChild(mainArea);
renderPage();

// Tegner siden igen, når vinduet krydser 1200px
desktopQuery.addEventListener('change', renderPage);

// Service worker kører kun på den rigtige side, ikke på Live Server
let isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

if ('serviceWorker' in navigator && !isLocal) {
    navigator.serviceWorker.register('./sw.js');
}