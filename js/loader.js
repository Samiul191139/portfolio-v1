(function () {
    var loader = document.getElementById('page-loader');
    if (!loader) {
        return;
    }

    var progress = loader.querySelector('.loader-progress');
    var pct = 0;
    var tick = setInterval(function () {
        pct = Math.min(pct + Math.random() * 18 + 8, 92);
        if (progress) {
            progress.style.width = pct + '%';
        }
    }, 120);

    function hideLoader() {
        clearInterval(tick);
        if (progress) {
            progress.style.width = '100%';
        }
        loader.classList.add('hidden');
        document.body.classList.remove('is-loading');
        setTimeout(function () {
            loader.remove();
        }, 500);
    }

    document.body.classList.add('is-loading');

    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 400);
    } else {
        window.addEventListener('load', function () {
            setTimeout(hideLoader, 350);
        });
    }
})();
