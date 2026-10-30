import { createSettingsFooter } from './settingFooter.js';

export function createFooter() {
    let footer = createSettingsFooter();
    footer.classList.add('page-footer'); // en ekstra klasse til evt. placering på siderne

    return (footer);
}