'use strict';
$(document).ready(function () {
    new WOW().init();

    $(".slider-items").slick({
        dots: true,
        autoplaySpeed: 700,
        speed: 1000,
        pauseOnHover: true,
        arrows: false,
    });

    $('.reviews-slider-items').slick({
        arrows: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        nextArrow: $('#reviews-slick-next'),
        prevArrow: $('#reviews-slick-prev'),
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 821,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });

    function toMenuScroll() {
        $('html, body').animate({
            scrollTop: $('#menu-container').offset().top
        }, 200);
    }

    $('#main-btn-one').click(toMenuScroll);

    function toOrderScroll() {
        $('html, body').animate({
            scrollTop: $('#order-container').offset().top
        }, 200);
    }

    $('#main-btn-two').click(toOrderScroll);

    $('#go-reservation').click(toOrderScroll);
    $('#go-menu').click(toMenuScroll);
    $('#go-slider').click(function () {
        $('html, body').animate({
            scrollTop: $('#slider').offset().top
        }, 200);
    });
    $('#go-footer').click(function () {
        $('html, body').animate({
            scrollTop: $('#footer').offset().top
        }, 200);
    });
    $('#go-reviews').click(function () {
        $('html, body').animate({
            scrollTop: $('#reviews').offset().top
        }, 200);
    });

    const miniPopup = $('.mini-popup');
    const inputTime = $('.time');

    $('.arrow-down').click(function () {
        inputTime.css('background-color', '#fff');
        inputTime.css('border-radius', '5px 5px 0 0');
        miniPopup.show();
    });

    const booked = $('.booked');

    booked.on("mouseover", function () {
        $(this).css({
            'background-color': 'transparent',
            'border': '1px solid #969696'
        });
    });

    const timeItem = $('.time-item');

    timeItem.on("mouseover", function () {
        if ($(this).hasClass('booked')) {
        } else {
            inputTime.val($(this).text())
        }
    });

    timeItem.on("click", function () {
        miniPopup.hide();
        inputTime.css('background-color', 'transparent');
        inputTime.css('border-radius', '5px');
    });

    $(".number-input").mask("+7 (999) 999-99-99");

    const inputName = $('.name');
    const inputNumber = $('.number-input');

    $('#order-button').on('click', function () {
        inputName.next().hide();
        inputNumber.next().hide();
        inputTime.next().hide();

        let box = false;

        if (!inputName.val()) {
            inputName.next().show();
            box = true;
        }
        if (inputNumber.val().length === 0) {
            inputNumber.next().show();
            box = true;
        }
        if (!inputTime.val()) {
            inputTime.next().show();
            box = true;
        }

        if (box) {
            return;
        }

        const time = inputTime.val();

        const successRequest = true;

        if (successRequest) {
            $('.order-form').hide();
            $('.order-message').hide();

            const today = new Date();
            const isoDate = today.toISOString().slice(0, 10);
            $('.data-day').text(isoDate)
            $('.data-time').text(time)
            $('.mini-popup-320').show();
        } else {
            alert('Ошибка запроса')
        }
    });

    $('#popup-close').on('click', function () {
        $('.mini-popup-320').hide()
        $('.order-form').show();
        $('.order-message').show();
        inputTime.val('');
        inputNumber.val('');
        inputName.val('');
    });

    const burgerClose = $('#burger-close');
    const burgerPopup = $('.burger-popup');
    const burger = $('.burger');
    burger.on('click', function () {
        burgerPopup.show();
    });

    burgerClose.on('click', function () {
        burgerPopup.hide();
    });
});