// 更全面的移动设备检测函数
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // 检查常见移动设备标识
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
    
    // 检查Chrome移动版特有标识
    const isChromeMobile = /Chrome\/[.0-9]* Mobile|CriOS\/[.0-9]*/i.test(userAgent);
    
    // 检查屏幕尺寸和触摸支持
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const smallScreen = window.innerWidth <= 768 && window.innerHeight <= 1024;
    
    // 综合考虑多种因素，排除Chrome移动版
    return (isMobile || (hasTouch && smallScreen)) && !isChromeMobile;
}

// 只在非移动设备上启用反调试功能
if (!isMobileDevice()) {
    // 调试器检测
    (function() {
        var callbacks = [],
            timeLimit = 50,
            open = false;

        var interval = setInterval(loop, 1);

        function loop() {
            var startTime = new Date();
            debugger;
            if (new Date() - startTime > timeLimit) {
                if (!open) {
                    callbacks.forEach(function(fn) {
                        fn.call(null);
                    });
                }
                open = true;
                window.stop();
                document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>请勿使用开发者工具</h1>";
            } else {
                open = false;
            }
        }

        // 暴露公共方法
        window.antiDebug = {
            addListener: function(fn) {
                callbacks.push(fn);
            },
            cancleListenr: function(fn) {
                callbacks = callbacks.filter(function(v) {
                    return v !== fn;
                });
            },
            destroy: function() {
                clearInterval(interval);
            }
        };
    })();

    // 添加默认监听器 - 刷新页面
    window.antiDebug.addListener(function() {
        window.location.reload();
    });

    // 控制台打开检测
    function checkDevTools() {
        let num = 0;
        let devtools = new Date();
        devtools.toString = function() {
            num++;
            if (num > 1) {
                document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>请勿使用开发者工具</h1>";
                window.location.href = "about:blank";
            }
        };
        console.log('%c', devtools);
    }

    // 每5秒检查一次
    setInterval(checkDevTools, 5000);

    // 快捷键禁用
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (e.keyCode === 123 ||
            (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) ||
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            e.returnValue = false;
            document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>请勿使用开发者工具</h1>";
            return false;
        }
    });
}