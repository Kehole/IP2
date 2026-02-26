(function () {

    'use strict';



    var speed = 0.6;



    function setup() {

        var section = document.getElementById('intro');

        if (!section) return;



        var title1 = document.querySelector('.intro-title-1');

        var title2 = document.querySelector('.intro-title-2');

        var title3 = document.querySelector('.intro-title-3');



        var block1 = document.getElementById('intro-block-1');

        var block2 = document.getElementById('intro-block-2');

        var block3 = document.getElementById('intro-block-3');



        if (!title1 || !title2 || !title3 || !block1 || !block2 || !block3) return;



        var img1 = block1.querySelector('img');

        var img2 = block2.querySelector('img');

        var img3 = block3.querySelector('img');



        var titles = [title1, title2, title3];

        var baseTops = [0, 0, 0];

        var sectionTop = 0;

        var ready = false;



        function getTopInSection(el) {

            var top = 0;

            while (el && el !== section) {

                top += el.offsetTop;

                el = el.offsetParent;

            }

            return top;

        }



        function computeBase() {

            sectionTop = section.offsetTop;

            var titleH = title1.offsetHeight;



            var img1Top = getTopInSection(img1);

            var img1H = img1.offsetHeight;

            baseTops[0] = img1Top + img1H * 0.5;



            var img2Top = getTopInSection(img2);

            baseTops[1] = img2Top + (img2.offsetHeight / 2) - (titleH / 2) + 120;



            var img3Top = getTopInSection(img3);

            baseTops[2] = img3Top - titleH + 310;

        }



        function update() {

            if (!ready) return;



            var scrollY = window.pageYOffset || 0;

            var wh = window.innerHeight;



            for (var i = 0; i < 3; i++) {

                var titleDocY = sectionTop + baseTops[i];

                var enterScroll = Math.max(0, titleDocY - wh);

                var scrollSinceVisible = Math.max(0, scrollY - enterScroll);

                var lag = scrollSinceVisible * (1 - speed);

                titles[i].style.top = (baseTops[i] - lag) + 'px';

            }

        }



        var ticking = false;

        function onScroll() {

            if (!ticking) {

                requestAnimationFrame(function () {

                    update();

                    ticking = false;

                });

                ticking = true;

            }

        }



        function init() {

            computeBase();

            ready = true;

            update();

        }



        var imgs = [img1, img2, img3];

        var loaded = 0;

        function check() {

            loaded++;

            if (loaded >= 3) init();

        }

        imgs.forEach(function (im) {

            if (im.complete) check();

            else im.addEventListener('load', check);

        });



        window.addEventListener('scroll', onScroll, { passive: true });

        window.addEventListener('resize', function () {

            if (ready) {

                computeBase();

                update();

            }

        });

    }



    if (document.readyState === 'loading') {

        document.addEventListener('DOMContentLoaded', setup);

    } else {

        setup();

    }

})();

