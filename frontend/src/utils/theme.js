export const toggleTheme = (choice) => {
    const root = document.documentElement;
    if (choice) {
        root.setAttribute('data-theme', choice);
        localStorage.setItem('data-theme', choice);
    } else {
        root.removeAttribute('data-theme');
        localStorage.removeItem('data-theme');
    }
}