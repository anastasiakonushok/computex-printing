import $ from "jquery";
$(function () {
    // Fancybox initialization
    Fancybox.bind("[data-fancybox]", {});

    //Бургер меню

    $(document).ready(function () {
        $(".burger").click(function () {
            $(".burger").toggleClass("burger-menu-active");
            $(".header").toggleClass("show");
            $("body").toggleClass("body-lock");
        });

        // Удаляем классы после перехода по ссылке
        $(".header a").click(function () {
            $(".burger").removeClass("burger-menu-active");
            $(".header").removeClass("show");
            $("body").removeClass("body-lock");
        });
    });

    // AOS.init();
    ymaps.ready(init);
    function init() {
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [52.432650, 31.005505],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 17,
            controls: ['zoomControl']
        });
        myMap.behaviors.disable('scrollZoom');
        var zoomControl = myMap.controls.get('zoomControl');
        zoomControl.options.set({
            size: 'small' // или 'large' для больших кнопок
        });

        var myPlacemark = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [52.432650, 31.005505]
            }
        },
            {
                // preset: 'twirl#redIcon',
                iconImageSize: [80, 120],
                iconColor: '#FF4C00'// Желтый цвет отметки (в формате HEX)
            });
        myMap.geoObjects.add(myPlacemark);
    }

    $(document).ready(function () {
        $(function () {
            //BEGIN
            $(".accordion__title").on("click", function (e) {
                e.preventDefault();
                var $this = $(this);

                if (!$this.hasClass("show-accordion")) {
                    $(".accordion__body").slideUp(400);
                    $(".accordion__title").removeClass("show-accordion");
                }

                $this.toggleClass("show-accordion");
                $this.next().slideToggle();
            });
            //END
        });
    });
    //scroll-top
    $(function () {
        $(".button-up").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 800);
            return false;
        });
    });




});



gsap.registerPlugin(ScrollTrigger);

// Создаем timeline для последовательной анимации
const tl = gsap.timeline();
if (window.innerWidth > 1024) {
    // Анимация для закрашивания фона
    tl.to(".background", {
        duration: 2,
        width: "100%",
        ease: "expo.inOut"
    });

    // Анимация появления текста по буквам после закрашивания фона
    tl.from(".hero__title span", {
        duration: 1.5,
        opacity: 0,
        y: -50,
        ease: "expo.out",
        stagger: 0.1 // Задержка между появлением каждой буквы
    }, "-=1.5") // Запуск анимации текста спустя 1.5 сек от начала анимации фона

    // Анимация для h1 после появления заголовка
    tl.from(".hero h1", {
        duration: 2,
        opacity: 0,
        y: 50,
        ease: "expo.out",
        delay: 0.3
    }, "-=1.5"); // Запуск анимации h1 спустя 1 сек после старта появления букв

    // Анимация для секции "Наши Преимущества"
    gsap.from(".section-about__text h2", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
            trigger: ".section-about",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".section-about__text p", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
        scrollTrigger: {
            trigger: ".section-about",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".main-button-dark", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "expo.out",
        delay: 0.8,
        scrollTrigger: {
            trigger: ".section-about",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Анимация для списка li с использованием stagger
    gsap.from(".section-about__info li", {
        opacity: 0,
        x: 100, // Появление справа
        duration: 1,
        ease: "expo.out",
        stagger: 0.5, // Задержка между анимациями элементов
        scrollTrigger: {
            trigger: ".section-about__info",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });


    // Анимация для списка li с использованием stagger
    gsap.from(".accordion", {
        opacity: 0,
        x: 100, // Появление справа
        duration: 1,
        ease: "expo.out",
        stagger: 0.5, // Задержка между анимациями элементов
        scrollTrigger: {
            trigger: ".accordion-wrapp",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Анимация для header, который появляется сверху
    gsap.from("header", {
        y: -100, // Начальная позиция выше экрана
        opacity: 0, // Начальная прозрачность
        duration: 1, // Длительность анимации
        ease: "expo.out", // Плавная анимация
    });


    gsap.to(".section-hero__img", {
        width: "100%", // Увеличение ширины до 100%
        ease: "power1.out", // Плавное изменение
        scrollTrigger: {
            trigger: ".section-plus", // Триггер для активации анимации
            start: "top 90%", // Анимация запускается, когда секция на 80% видна
            end: "top 10%", // Анимация заканчивается, когда секция на 20% видна
            scrub: true, // Плавная анимация, синхронизированная со скроллом
            toggleActions: "play none none none", // Поведение при прокрутке
        }
    });
}

