import { createHighLowPrice } from '../components/highLowPrice.js';
import { createPriceOverview } from '../components/prisoversigt.js';

export function createOversigtPage({ prices = [], low = 0, high = 0 } = {}) {
    let section = document.createElement('section');
    section.className = 'page page--oversigt';

    let heading = document.createElement('h2');
    heading.className = 'page-title';
    heading.textContent = 'OVERSIGT';

    // append kan tage flere elementer på én gang
    section.append(
        heading,
        createHighLowPrice({ lowest: low, highest: high }),
        createPriceOverview({ prices })
    );

    return (section);
}