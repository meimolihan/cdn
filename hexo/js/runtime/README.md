**<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/js/runtimehexo/js/runtime/墨不凡-搬砖中.svg>**  

**<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/js/runtimehexo/js/runtime/墨不凡-休闲中.svg>**

**<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/js/runtime/runtime.js>**

## 页脚徽标和计时器

安装插件
```bash
npm install hexo-butterfly-footer-beautify --save
```

在主题配置文件`_config.butterfly.yml`中添加配置项
```yaml
  # footer_beautify
# 页脚计时器：[Native JS Timer](https://akilar.top/posts/b941af/)
# 页脚徽标：[Add Github Badge](https://akilar.top/posts/e87ad7f8/)
footer_beautify:
  enable:
    timer: true # 计时器开关
    bdage: true # 徽标开关
  priority: 5 #过滤器优先权
  enable_page: all # 应用页面
  exclude:
    # - /posts/
    # - /about/
  layout: # 挂载容器类型
    type: id
    name: footer-wrap
    index: 0
  # 计时器部分配置项
  runtime_js: /js/runtime.js
  runtime_css: /css/runtime.css
  # 徽标部分配置项
  swiperpara: 0 #若非0，则开启轮播功能，每行徽标个数
  bdageitem:
    - link: https://hexo.io/ #徽标指向网站链接
      shields: https://img.shields.io/badge/Frame-Hexo-blue?style=flat&logo=hexo #徽标API
      message: 博客框架为Hexo_v7.1.0 #徽标提示语
    - link: https://butterfly.js.org/
      shields: https://img.shields.io/badge/Theme-Butterfly-6513df?style=flat&logo=bitdefender
      message: 主题版本Butterfly_v5.3.5
    - link: https://www.jsdelivr.com/
      shields: https://img.shields.io/badge/CDN-jsDelivr-orange?style=flat&logo=jsDelivr
      message: 本站使用JsDelivr为静态资源提供CDN加速
    - link: https://github.com/
      shields: https://img.shields.io/badge/Source-Github-d021d6?style=flat&logo=GitHub
      message: 本站项目由Github托管
```

创建 `博客根目录/source/js/runtime.js`
```js
var now = new Date();

function createtime() {
    var t = new Date("01/01/2025 00:00:00");
    now.setTime(now.getTime() + 250);

    var e = (now - t) / 1e3 / 60 / 60 / 24;
    var a = Math.floor(e);

    var n = (now - t) / 1e3 / 60 / 60 - 24 * a;
    var r = Math.floor(n);
    if (String(r).length === 1) {
        r = "0" + r;
    }

    var s = (now - t) / 1e3 / 60 - 1440 * a - 60 * r;
    var i = Math.floor(s);
    if (String(i).length === 1) {
        i = "0" + i;
    }

    var o = (now - t) / 1e3 - 86400 * a - 3600 * r - 60 * i;
    var l = Math.round(o);
    if (String(l).length === 1) {
        l = "0" + l;
    }

    let g = "";
    if (r < 18 && r >= 9) {
        g = `<img class='boardsign' src='https://file.meimolihan.eu.org/svg/凡凡-搬砖中.svg' title=''><span class='textTip'> <br> 本站已运行： ${a} 天</span><span id='runtime'> ${r} 小时 ${i} 分 ${l} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`;
    } else {
        g = `<img class='boardsign' src='https://file.meimolihan.eu.org/svg/凡凡-休闲中.svg' title=''><span class='textTip'> <br> 本站已运行： ${a} 天</span><span id='runtime'> ${r} 小时 ${i} 分 ${l} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`;
    }

    if (document.getElementById("workboard")) {
        document.getElementById("workboard").innerHTML = g;
    }
}

setInterval(() => {
    createtime();
}, 250);
```

创建 `博客根目录/source/css/runtime.css`
```css
div#runtime {
    width: 180px;
    margin: auto;
    color: #fff;
    padding-inline: 5px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.7);
}

#workboard {
    font-size: 12px;
}

[data-theme="dark"] div#runtime {
    color: #28b4c8;
    box-shadow: 0 0 5px rgba(28, 69, 218, 0.71);
    animation: flashlight 1s linear infinite alternate;
}

#ghbdages .github-badge img {
    height: 20px;
}

@-moz-keyframes flashlight {
    from {
        box-shadow: 0 0 5px #1478d2;
    }
    to {
        box-shadow: 0 0 2px #1478d2;
    }
}

@-webkit-keyframes flashlight {
    from {
        box-shadow: 0 0 5px #1478d2;
    }
    to {
        box-shadow: 0 0 2px #1478d2;
    }
}

@-o-keyframes flashlight {
    from {
        box-shadow: 0 0 5px #1478d2;
    }
    to {
        box-shadow: 0 0 2px #1478d2;
    }
}

@keyframes flashlight {
    from {
        box-shadow: 0 0 5px #1478d2;
    }
    to {
        box-shadow: 0 0 2px #1478d2;
    }
}    
```

在主题配置文件 `[BlogRoot]\_config.butterfly.yml` 文件中的引用

```yaml
```



**重启项目即可看到效果：**

```bash
hexo cl; hexo s
```