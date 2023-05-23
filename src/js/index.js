document.addEventListener('DOMContentLoaded', function () {

    // Lazy-load for map

    if (document.querySelector(".map-container")) {
        let map_container = document.querySelectorAll(".map-container");
        let map_section = document.querySelectorAll(".map");
        let options_map = {
            once: true,//запуск один раз, и удаление наблюдателя сразу
            passive: true,
            capture: true
        };
        
        let map_loaded = [];
        map_section.forEach((el, i) => {
            map_loaded.push(false);
        });

        map_section.forEach((element, i) => {
            let map_block = element.querySelector('[data-map-lazy]');
            if (map_block.getAttribute("id") === "noScrollMapLoading") {
                if (!map_loaded[i] ) {
                    map_loaded[i] = true;
                    map_block.setAttribute('src', map_block.getAttribute('data-src'));
                    map_block.removeAttribute('data_src');
                }

            }
        });

        function startLazyMap() {
            let windowCenter = window.innerHeight + window.scrollY;
            map_section.forEach((element, i) => {
                let scrollOffset = element.offsetTop + (element.offsetHeight / 5);
                if (windowCenter >= scrollOffset) {
                    if (!map_loaded[i]) {
                        let map_block = element.querySelector('[data-map-lazy]');
                        map_loaded[i] = true;
                        map_block.setAttribute('src', map_block.getAttribute('data-src'));
                        map_block.removeAttribute('data_src');
                    }
                }
                
            });
        }
    }

    // Input mask

    $(".phoneMask").mask('+7 (999) 999-99-99', {placeholder: '+7 (___) ___-__-__'});
    
    const scrollEvent = () => {
        if (document.querySelector(".map-container")) {
            startLazyMap();
        }
        if (document.querySelector(".parallax__item")) {
            parallax();
        }
    }
    if (document.scrollHeight === document.offsetHeight) {
        window.addEventListener("scroll", scrollEvent);
    } else {
        scrollEvent();
    }


    // burger menu

    if (window.innerWidth <= 1090) {
        const menuBody = document.querySelector(".header__menu");
        const menuBtn = document.querySelector(".header__burger");
        const menuLinks = document.querySelectorAll(".header-menu__link");

        document.body.append(menuBody);

        menuBtn.addEventListener("click", () => {
            document.body.classList.toggle("lock");
            menuBtn.classList.toggle("active");
            menuBody.classList.toggle("active");
        });

        menuLinks.forEach(element => {
            element.addEventListener("click", () => {
                document.body.classList.toggle("lock");
                menuBtn.classList.toggle("active");
                menuBody.classList.toggle("active");
            })
        });
    }

    if (window.innerWidth <= 768) {
        const menuBody = document.querySelector(".header__menu");
        const menuPhone = document.querySelector(".header-contacts__phone");

        menuBody.append(menuPhone);
    }
});