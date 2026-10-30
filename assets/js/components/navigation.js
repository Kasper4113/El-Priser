const navItems = [
    { id: 'oversigt', label: 'Oversigt' },
    { id: 'ligeNu', label: 'Lige Nu' },
    { id: 'historik', label: 'Historik' }
];

export function initNavigation(onSelect = () => {}) {
    const nav = document.createElement('nav');
    nav.className = 'top-nav';
    nav.setAttribute('aria-label', 'Top navigation');

    const header = document.createElement('div');
    header.className = 'nav-header';

    const brandSlot = document.createElement('div');
    brandSlot.className = 'brand-slot';
    brandSlot.setAttribute('aria-label', 'Logo slot');

    const logo = document.createElement('img');
    logo.src = './assets/img/Group9.svg';
    logo.alt = 'Logo';
    logo.className = 'brand-logo';

    brandSlot.appendChild(logo);

    const list = document.createElement('ul');
    list.className = 'nav-list';

    navItems.forEach(({ id, label }, index) => {
        const item = document.createElement('li');
        item.className = 'nav-item';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'nav-button';
        button.textContent = label;
        button.dataset.page = id;

        if (index === 1) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            document.querySelectorAll('.nav-button').forEach((navButton) => {
                navButton.classList.toggle('active', navButton === button);
            });
            onSelect(id);
        });

        item.appendChild(button);
        list.appendChild(item);
    });

    const brandName = document.createElement('span');
    brandName.className = 'brand-name';
    brandName.textContent = 'ELPrisen.nu';

    header.append(brandSlot, brandName, list);
    nav.appendChild(header);

    return nav;
}
