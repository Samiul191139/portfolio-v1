function changeImage(button, change) {
    let carousel = button.parentNode;
    let imgs = carousel.querySelectorAll('img');
    let activeIndex = [...imgs].findIndex((img) => img.classList.contains('active'));

    // Remove active class
    imgs[activeIndex].classList.remove('active');

    // Calculate the new index
    let newIndex = (activeIndex + change + imgs.length) % imgs.length;

    // Prepare the new image for entry
    imgs[newIndex].classList.add('transitioning');
    imgs[newIndex].style.opacity = 0;
    imgs[newIndex].style.display = 'block';

    setTimeout(() => {
        // Transition the new image into view
        imgs[newIndex].classList.add('active');
        imgs[newIndex].classList.remove('transitioning');
        imgs[newIndex].style.opacity = 1;

        // Hide the old image
        imgs[activeIndex].style.display = 'none';
    }, 20); // Small timeout to ensure the transition kicks in
    }



    document.querySelectorAll(".btn.see-images").forEach((button) => {
        button.addEventListener("click", () => {
            const carousel = button.parentNode.previousElementSibling; // Select the carousel element
            const isExpanded = carousel.classList.toggle("expanded");
            button.textContent = isExpanded ? "Hide Images" : "Project Images";
        });
    });


    document.addEventListener("DOMContentLoaded", function() {
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        // Check the current theme from localStorage
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

        themeIcon.addEventListener('click', function() {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.add('dark-mode');
                themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });

        const mobileMenu = document.getElementById('mobile-menu');
        const navList = document.querySelector('.nav-list');

        mobileMenu.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    });
    // document.addEventListener("DOMContentLoaded", function() {
    //     const themeIcon = document.getElementById('theme-icon');
    //     const body = document.body;

    //     // Check the current theme from localStorage
    //     const currentTheme = localStorage.getItem('theme') || 'light';
    //     if (currentTheme === 'dark') {
    //         body.classList.add('dark-mode');
    //         themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
    //     } else {
    //         themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
    //     }

    //     themeIcon.addEventListener('click', function() {
    //         if (body.classList.contains('dark-mode')) {
    //             body.classList.remove('dark-mode');
    //             themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
    //             localStorage.setItem('theme', 'light');
    //         } else {
    //             body.classList.add('dark-mode');
    //             themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
    //             localStorage.setItem('theme', 'dark');
    //         }
    //     });

        // const mobileMenu = document.getElementById('mobile-menu');
        // const navList = document.querySelector('.nav-list');

        // mobileMenu.addEventListener('click', function() {
        //     navList.classList.toggle('active');
        // });

        // Scroll to Top Button
        const scrollTopBtn = document.getElementById('scrollTopBtn');

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