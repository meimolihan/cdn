// 检测是否为移动设备（1.0.0）
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") ||
        (navigator.userAgent.indexOf('IEMobile') !== -1) ||
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobile/i.test(navigator.userAgent));
}

// 修复移动设备 Chrome 浏览器的控制台检测问题
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

    // 修复后的控制台打开检测
    function checkConsoleOpen() {
        // 检测 console 是否被修改
        if (console._commandLineAPI) {
            document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>请勿使用开发者工具</h1>";
            window.location.href = "about:blank";
        }
    }

    // 每5秒检查一次
    setInterval(checkConsoleOpen, 5000);

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
} else {
    // 移动设备上的特殊处理
    console.log("移动设备检测到，已禁用控制台检测");
}