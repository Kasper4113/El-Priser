import { createSettings } from '../pages/settings.js';

export function createSettingsButton() {
    const actions = document.createElement('div');
    actions.className = 'nav-actions';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'settings-toggle';
    button.setAttribute('aria-label', 'Åbn indstillinger');

    const icon = document.createElement('img');
    icon.src = './assets/img/icon_cog.svg';
    icon.alt = 'Indstillinger';
    icon.className = 'settings-icon';
    button.appendChild(icon);

    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.setAttribute('aria-hidden', 'true');

    const card = document.createElement('div');
    card.className = 'modal-card';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close-modal';
    closeButton.setAttribute('aria-label', 'Luk indstillinger');
    closeButton.textContent = '×';

    card.appendChild(closeButton);
    card.appendChild(createSettings());
    modal.appendChild(card);

    const openModal = () => {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };

    button.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    actions.appendChild(button);
    actions.appendChild(modal);
    return (actions);
}