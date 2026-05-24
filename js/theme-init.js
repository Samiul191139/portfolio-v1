(function () {
    var theme = localStorage.getItem('theme') || 'light';
    var root = document.documentElement;
    root.classList.remove('dark-mode', 'red-mode');
    if (theme === 'dark') {
        root.classList.add('dark-mode');
    } else if (theme === 'red') {
        root.classList.add('red-mode');
    }
})();
