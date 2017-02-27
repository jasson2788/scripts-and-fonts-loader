var LOADER = {
    load: function (params) {
        var cpt_scripts = 0, loaded = 0, max = params.scripts.length + params.fonts.length - 1;

        function __loaded() {
            if (++loaded === max) {
                __load_scripts(cpt_scripts);
            }
        }

        function __loaded_script() {
            ++cpt_scripts;
            __loaded();
        }

        function __load_scripts(i) {
            var element = document.createElement("script");
            if ('onreadystatechange' in element)
                element.onreadystatechange = function () {
                    if (element.readyState === 'loaded' || element.readyState === 'complete')
                        __loaded_script();
                };
            else if ('onload' in element)
                element.onload = __loaded_script;
            element.src = params.scripts[i];
            document.body.appendChild(element);
        }

        function __load_fonts(i) {
            var tester = document.createElement('span');
            tester.style.position = 'absolute';
            tester.style.top = '-9999px';
            tester.style.left = '-9999px';
            tester.style.visibility = 'hidden';
            tester.style.fontFamily = 'Comic Sans MS';
            tester.style.fontSize = '250px';

            tester.innerHTML = 'ASdkfdof&?$asd';
            document.body.appendChild(tester);
            var fallbackFontWidth = tester.offsetWidth;
            tester.style.fontFamily = params.fonts[i];

            setTimeout(function () {
                var interval = setInterval(function () {
                    if (fallbackFontWidth !== tester.offsetWidth) {
                        clearInterval(interval);
                        document.body.removeChild(tester);
                        __loaded();
                    }
                }, 50);
            }, 50);
        }

        function __load() {
            for (var i = 0; i < params.scripts.length - 1; i++)
                __load_scripts(i);
            for (var i = 0; i < params.fonts.length; i++)
                __load_fonts(i);
        }

        if (window.addEventListener)
            window.addEventListener('load', __load, false);
        else if (window.attachEvent)
            window.attachEvent('onload', __load);
    }
};
            