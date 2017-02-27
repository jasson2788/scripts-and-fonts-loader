var DEFAULT_SETTINGS = {default_lang: 'fr'};
var LOADER = {
    load: function (params) {
        var cpt_scripts = 0, loaded = 0, max = params.scripts.length + params.fonts.length - 1;

        (function () {
            function __woff2() {
                if (!("FontFace" in window))
                    return false;
                var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )', {});
                f.load()['catch'](function () {});
                return f.status === 'loading' || f.status === 'loaded';
            }

            function __woff() {
                if ((document.all && !document.addEventListener) || (!!window['operamini']) || (parseFloat(getAndroidVersion() < 4.4)))
                    return false;
                else
                    return true;
            }

            function __read_cookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ')
                        c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0)
                        return c.substring(nameEQ.length, c.length);
                }
                return null;
            }

            DEFAULT_SETTINGS.lang = __read_cookie(location.pathname + "lang") || DEFAULT_SETTINGS.default_lang;
            if (__woff2())
                DEFAULT_SETTINGS.type = "woff2";
            else if (__woff())
                DEFAULT_SETTINGS.type = "woff";
            else
                DEFAULT_SETTINGS.type = "ttf";
        })();

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
            var xml = new XMLHttpRequest(), element = document.createElement("script");
            xml.open('GET', params.scripts[i], true);
            xml.onreadystatechange = function () {
                if (xml.readyState === 4 && xml.status === 200) {
                    element.innerHTML = xml.responseText;
                    __loaded_script();
                }
            };
            xml.onprogress = function (e) {

            };
            xml.send(null);
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

