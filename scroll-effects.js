(function () {
    var blocks = document.querySelectorAll('.photo-block');
    var BASE_HEIGHT = 40;
    var BASE_TS_SIZE = 20;
    var BASE_POEM_SIZE = 18;

    function getScrollProgress(el, isLast) {
        if (isLast) return 1;
        var rect = el.getBoundingClientRect();
        var windowH = window.innerHeight;
        var start = 0;
        var end = -rect.height;
        var raw = (start - rect.top) / (start - end);
        return Math.min(1, Math.max(0, raw));
    }

    function update() {
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            var footer = block.querySelector('.block-footer');
            var ts = block.querySelector('.timestamp');
            var poem = block.querySelector('.poem-line');
            var isLast = (i === blocks.length - 1);
            var p = getScrollProgress(block, isLast);

            footer.style.height = (BASE_HEIGHT * (1 + 2 * p)) + 'px';
            ts.style.fontSize = (BASE_TS_SIZE * (1 + p * 0.5)) + 'px';
            poem.style.fontSize = BASE_POEM_SIZE + 'px';
            poem.style.opacity = p;
        }
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();
