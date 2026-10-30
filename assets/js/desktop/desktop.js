// VIEW: stiller de 3 sider ved siden af hinanden på desktop

export function createDesktopPage({ ligeNu, oversigt, historik }) {
    let grid = document.createElement('div');
    grid.className = 'desktop-grid';

    grid.append(ligeNu, oversigt, historik);
    return (grid);
}