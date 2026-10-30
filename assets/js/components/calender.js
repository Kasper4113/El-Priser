// Laver datoen om til tekst, fx 30102026
function formatDateLabel(date) {
    let formatter = new Intl.DateTimeFormat('da-DK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    let label = formatter.format(date).replaceAll('.', '');
    return (label);
}

// Laver datoen om til "2026-10-30", som <input type="date"> kræver
function toInputValue(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    let text = `${year}-${month}-${day}`;
    return (text);
}

export function createCalendar({ selectedDate = new Date(), onDateChange = () => {} } = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'calendar-wrap';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-button';

    const dateText = document.createElement('span');
    dateText.className = 'calendar-date';
    dateText.textContent = formatDateLabel(selectedDate);

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined calendar-icon';
    icon.textContent = 'calendar_month';

    button.appendChild(dateText);
    button.appendChild(icon);

    const input = document.createElement('input');
    input.type = 'date';
    input.className = 'calendar-input';
    input.value = toInputValue(selectedDate); // ændret: bruger vores egen funktion

    button.addEventListener('click', () => {
        input.showPicker ? input.showPicker() : input.click();
    });

    input.addEventListener('change', () => {
        if (!input.value) return;
        const nextDate = new Date(`${input.value}T12:00:00`);
        dateText.textContent = formatDateLabel(nextDate);
        onDateChange(nextDate);
    });

    wrap.appendChild(button);
    wrap.appendChild(input);
    return wrap;
}