'use strict';

$(function () {

    setTimeout(function () {
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);

    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    var withcer = 'The Witcher 3'.split('');

    var loader = $('#brand');

    var randomTimeout;
    var loaderText = '';
    var tries = 0;

    (function random() {

        var randomText = '';

        for (var i = 0; i < withcer.length - loaderText.length; i++)
            randomText += characters[Math.floor(Math.random() * characters.length)];

        loader.text(loaderText + randomText);

        if (++tries == 5) {
            tries = 0;
            loaderText += withcer[loaderText.length];
        }

        if (loaderText == 'The Witcher 3') {
            clearTimeout(randomTimeout);
            loader.text(loaderText);
            afterGenerated();
            return;
        }

        randomTimeout = setTimeout(random, 1000 / 25.5);
    })();

    function afterGenerated() {
        console.log('generated');
        loader.addClass('shrink');

        setTimeout(afterBrand, 750);
    }

    function afterBrand() {
        $('#java-years').text(new Date().getFullYear() - 2008 + 1);

        $('.not-visible').removeClass('not-visible').addClass('visible');

        var navToggler = $('#nav-toggle');
        var navMask = $('#nav-mask');
        var navMenu = $('#nav-menu');
        var navMenuLinks = navMenu.find('a');
        var navOpenClass = 'open';

        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var numberOfParticles = .00005 * (windowWidth * windowHeight);

        var leavedPage;

        var togglerFunction = function () {
            if (navToggler.hasClass(navOpenClass)) {
                navToggler.removeClass(navOpenClass);
                navMask.removeClass(navOpenClass);
                navMenu.removeClass(navOpenClass);

            } else {
                navToggler.addClass(navOpenClass);
                navMask.addClass(navOpenClass);
                navMenu.addClass(navOpenClass);
            }
        };
        navToggler.click(togglerFunction);
        navMask.click(togglerFunction);
        navMenuLinks.click(togglerFunction);

        $('#fullpage').fullpage({
            anchors: ['home', 'yennifer', 'ciri', 'geralt','triss'],
            menu: '#nav-menu',
            sectionSelector: '.page',
            scrollOverflow: true,
            easing: 'easeInExpo',
            css3: false,
            scrollingSpeed: 1000,
            navigation: true,
            afterLoad: function (anchorLink) {
                if (leavedPage != undefined) {
                    leavedPage.find('.animated').removeClass('viewable');
                }
                leavedPage = $('#' + anchorLink + '-page');
                leavedPage.find('.animated').addClass('viewable');
            },
            afterRender: function () {
                scrollToAnchor();
            }
        });

        function scrollToAnchor() {
            //getting the anchor link in the URL and deleting the `#`
            var value = window.location.hash.replace('#', '').split('/');
            var section = value[0];

            if (section) {  //if theres any #
                $.fn.fullpage.silentMoveTo(section);
            }
        }

        //-------------------------particles
        $(window).click(function (e) {
            window.pJS_GUI.particles.array.push(new window.pJS_GUI.fn.particle(
                {value: '#fff'},
                100,
                {x: e.pageX, y: e.pageY}
            ));
        });

        var timeOut;

        function addParticle() {
            if (window.pJS_GUI.particles.array.length > numberOfParticles) {
                clearTimeout(timeOut);
                return;
            }

            window.pJS_GUI.particles.array.push(new window.pJS_GUI.fn.particle(
                {value: '#fff'},
                100
            ));

            timeOut = setTimeout(addParticle, 60);
        }

        function afterParticlesLoaded() {
            console.log('callback - particles.js config loaded');
            window.pJS_GUI = window.pJSDom[0].pJS;

            addParticle();
        }

        particlesJS.load('particles', 'assets/particles.json', afterParticlesLoaded);
    }
});
