## 挂绳小猫咪

制作一个盛放内容的盒子，在`[BlogRoot]/node_modules/hexo-theme-butterfly/layout/includes/head.pug`(如果是`git clone` 安装在`[BlogRoot]/themes/butterfly/layout/includes/head.pug`)最后一行加入如下代码：

```
//- 挂绳小猫咪
#myscoll
```

1. 其实随便放在哪里都行，只要能加载出来就行
2. 在`[BlogRoot]/node_modules/hexo-theme-butterfly/source/js`文件夹下新建一个`cat.js`，将以下代码复制到文件中。

```js
if (document.body.clientWidth > 992) {
    function getBasicInfo() {
        /* 窗口高度 */
        var ViewH = $(window).height();
        /* document高度 */
        var DocH = $("body")[0].scrollHeight;
        /* 滚动的高度 */
        var ScrollTop = $(window).scrollTop();
        /* 可滚动的高度 */
        var S_V = DocH - ViewH;
        var Band_H = ScrollTop / (DocH - ViewH) * 100;
        return {
            ViewH: ViewH,
            DocH: DocH,
            ScrollTop: ScrollTop,
            Band_H: Band_H,
            S_V: S_V
        }
    };
    function show(basicInfo) {
        if (basicInfo.ScrollTop > 0.001) {
            $(".neko").css('display', 'block');
        } else {
            $(".neko").css('display', 'none');
        }
    }
    (function ($) {
        $.fn.nekoScroll = function (option) {
            var defaultSetting = {
                top: '0',
                scroWidth: 6 + 'px',
                z_index: 9999,
                zoom: 0.9,
                borderRadius: 5 + 'px',
                right: 60 + 'px',
                // 这里可以换为你喜欢的图片，例如我就换为了雪人，但是要抠图
                nekoImg: "https://bu.dusays.com/2022/07/20/62d812db74be9.png",
                hoverMsg: "喵喵喵~",
                color: "#6f42c1",
                during: 500,
                blog_body: "body",
            };
            var setting = $.extend(defaultSetting, option);
            var getThis = this.prop("className") !== "" ? "." + this.prop("className") : this.prop("id") !== "" ? "#" +
                this.prop("id") : this.prop("nodeName");
            if ($(".neko").length == 0) {
                this.after("<div class=\"neko\" id=" + setting.nekoname + " data-msg=\"" + setting.hoverMsg + "\"></div>");
            }
            let basicInfo = getBasicInfo();
            $(getThis)
                .css({
                    'position': 'fixed',
                    'width': setting.scroWidth,
                    'top': setting.top,
                    'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                    'z-index': setting.z_index,
                    'background-color': setting.bgcolor,
                    "border-radius": setting.borderRadius,
                    'right': setting.right,
                    'background-image': 'url(' + setting.scImg + ')',
                    'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                    'background-size': 'contain'
                });
            $("#" + setting.nekoname)
                .css({
                    'position': 'fixed',
                    'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                    'z-index': setting.z_index * 10,
                    'right': setting.right,
                    'background-image': 'url(' + setting.nekoImg + ')',
                });
            show(getBasicInfo());
            $(window)
                .scroll(function () {
                    let basicInfo = getBasicInfo();
                    show(basicInfo);
                    $(getThis)
                        .css({
                            'position': 'fixed',
                            'width': setting.scroWidth,
                            'top': setting.top,
                            'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                            'z-index': setting.z_index,
                            'background-color': setting.bgcolor,
                            "border-radius": setting.borderRadius,
                            'right': setting.right,
                            'background-image': 'url(' + setting.scImg + ')',
                            'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                            'background-size': 'contain'
                        });
                    $("#" + setting.nekoname)
                        .css({
                            'position': 'fixed',
                            'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                            'z-index': setting.z_index * 10,
                            'right': setting.right,
                            'background-image': 'url(' + setting.nekoImg + ')',
                        });
                    if (basicInfo.ScrollTop == basicInfo.S_V) {
                        $("#" + setting.nekoname)
                            .addClass("showMsg")
                    } else {
                        $("#" + setting.nekoname)
                            .removeClass("showMsg");
                        $("#" + setting.nekoname)
                            .attr("data-msg", setting.hoverMsg);
                    }
                });
            this.click(function (e) {
                btf.scrollToDest(0, 500)
            });
            $("#" + setting.nekoname)
                .click(function () {
                    btf.scrollToDest(0, 500)
                });
            return this;
        }
    })(jQuery);

    $(document).ready(function () {
        //部分自定义
        $("#myscoll").nekoScroll({
            bgcolor: 'rgb(0 0 0 / .5)', //背景颜色，没有绳子背景图片时有效
            borderRadius: '2em',
            zoom: 0.9
        }
        );
        //自定义（去掉以下注释，并注释掉其他的查看效果）
        /*
        $("#myscoll").nekoScroll({
            nekoname:'neko1', //nekoname，相当于id
            nekoImg:'img/猫咪.png', //neko的背景图片
            scImg:"img/绳1.png", //绳子的背景图片
            bgcolor:'#1e90ff', //背景颜色，没有绳子背景图片时有效
            zoom:0.9, //绳子长度的缩放值
            hoverMsg:'你好~喵', //鼠标浮动到neko上方的对话框信息
            right:'100px', //距离页面右边的距离
            fontFamily:'楷体', //对话框字体
            fontSize:'14px', //对话框字体的大小
            color:'#1e90ff', //对话框字体颜色
            scroWidth:'8px', //绳子的宽度
            z_index:100, //不用解释了吧
            during:1200, //从顶部到底部滑动的时长
        });
        */
    })
}
```

在`[BlogRoot]/node_modules/hexo-theme-butterfly/source/css`文件夹下新建一个`cat.css`，将以下代码复制到文件中。当然你也可以选择不新建 css 文件，复制代码到`custom.css`也行，总之有地方引入就行。

```css

body::-webkit-scrollbar {
    width: 0;
}

.neko {
    width: 64px;
    height: 64px;
    background-image: url("https://bu.dusays.com/2022/07/20/62d812db74be9.png");
    position: absolute;
    right: 32px;
    background-repeat: no-repeat;
    background-size: contain;
    transform: translateX(50%);
    cursor: pointer;
    font-family: tzy;
    font-weight: 600;
    font-size: 16px;
    color: #6f42c1;
    display: none;
}

.neko::after {
    display: none;
    width: 100px;
    height: 100px;
    background-image: url("https://bu.dusays.com/2022/07/20/62d812d95e6f5.png");
    background-size: contain;
    z-index: 9999;
    position: absolute;
    right: 50%;
    text-align: center;
    line-height: 100px;
    top: -115%;

}

.neko.showMsg::after {
    content: attr(data-msg);
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

.neko:hover::after {
    content: attr(data-msg);
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

.neko.fontColor::after {
    color: #333;
}

/**
 * @description: 滚动条样式  跟猫二选一
 */
@media screen and (max-width:992px) {
    ::-webkit-scrollbar {
        width: 8px !important;
        height: 8px !important
    }

    ::-webkit-scrollbar-track {
        border-radius: 2em;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgb(255 255 255 / .3);
        background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent);
        border-radius: 2em
    }

    ::-webkit-scrollbar-corner {
        background-color: transparent
    }
}
```

在主题配置文件`_config.butterfly.yml`中引入`cat.js`和`cat.css`，当然还有在bottom的最前面引入`jQuery`，因为`cat.js`的语法依赖`jQuery`。

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/cat.css">
  bottom:
    - <script defer src="https://npm.elemecdn.com/jquery@latest/dist/jquery.min.js"></script>
    - <script defer data-pjax src="/js/cat.js"></script>
```

**最后重新编译运行即可看见效果。**

```bash
hexo cl; hexo s
```