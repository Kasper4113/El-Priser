import { createPriceNow } from '../components/priceNow.js';

export function createLigeNuPage({ current } = {}) {
    let page = document.createElement('main');
    page.className = 'page page--lige-nu';

    page.appendChild(createPriceNow({ current }));
    return (page);
}