import { createCalendar } from '../components/calender.js';
import { createPriceOverview } from '../components/prisoversigt.js';

function createList(prices) {
    let stack = document.createElement('div');
    stack.className = 'historik-stack';
    stack.appendChild(createPriceOverview({ prices }));

    return (stack);
}

export function createHistorikPage({ prices = [], onDateChange = () => {} } = {}) {
    let section = document.createElement('section');
    section.className = 'page page--historik';

    let heading = document.createElement('h2');
    heading.className = 'page-title';
    heading.textContent = 'HISTORIK';

    let calendar = createCalendar({ selectedDate: new Date(), onDateChange });

    let content = document.createElement('div');
    content.className = 'historik-content';
    content.appendChild(createList(prices));

    section.append(heading, calendar, content);
    return (section);
}

// Controlleren kalder den, når der er valgt en ny dato
export function updateHistorikList(section, prices) {
    let content = section.querySelector('.historik-content');
    content.replaceChildren(createList(prices));
}