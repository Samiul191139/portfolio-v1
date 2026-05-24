function changeImage(button, change) {
    let carousel = button.parentNode;
    let imgs = carousel.querySelectorAll('img');
    let activeIndex = [...imgs].findIndex((img) => img.classList.contains('active'));

    imgs[activeIndex].classList.remove('active');

    let newIndex = (activeIndex + change + imgs.length) % imgs.length;

    imgs[newIndex].classList.add('transitioning');
    imgs[newIndex].style.opacity = 0;
    imgs[newIndex].style.display = 'block';

    setTimeout(() => {
        imgs[newIndex].classList.add('active');
        imgs[newIndex].classList.remove('transitioning');
        imgs[newIndex].style.opacity = 1;
        imgs[activeIndex].style.display = 'none';
    }, 20);
}

document.querySelectorAll(".btn.see-images").forEach((button) => {
    button.addEventListener("click", () => {
        const carousel = button.parentNode.previousElementSibling;
        const isExpanded = carousel.classList.toggle("expanded");
        button.textContent = isExpanded ? "Hide Images" : "Project Images";

        if (isExpanded) {
            carousel.querySelectorAll('img[data-src]').forEach((img) => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const themeIcon = document.getElementById('theme-icon');
    const root = document.documentElement;
    const themes = ['light', 'dark', 'red'];

    function getActiveTheme() {
        if (root.classList.contains('red-mode')) return 'red';
        if (root.classList.contains('dark-mode')) return 'dark';
        return 'light';
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else if (theme === 'red') {
            themeIcon.innerHTML = '<i class="fa-solid fa-palette"></i>';
        } else {
            themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    function applyTheme(theme) {
        root.classList.remove('dark-mode', 'red-mode');
        if (theme === 'dark') {
            root.classList.add('dark-mode');
        } else if (theme === 'red') {
            root.classList.add('red-mode');
        }
        updateThemeIcon(theme);
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    const currentTheme = themes.includes(savedTheme) ? savedTheme : 'light';
    applyTheme(currentTheme);

    if (themeIcon) {
        themeIcon.addEventListener('click', function() {
            const currentIndex = themes.indexOf(getActiveTheme());
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            root.classList.add('switching');
            applyTheme(nextTheme);
            setTimeout(() => root.classList.remove('switching'), 800);
        });
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
