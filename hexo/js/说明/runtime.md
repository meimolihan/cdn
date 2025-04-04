套用外部CDN： https://www.jsdelivr.com/

**<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/img/墨不凡-搬砖中.svg>**  

**<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/img/墨不凡-休闲中.svg>**

**<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/js/runtime.js>**

个人CDN：https://vercel.com/

**<https://cdn.meimolihan.eu.org/hexo/img/墨不凡-搬砖中.svg>**  

**<https://cdn.meimolihan.eu.org/hexo/img/墨不凡-休闲中.svg>**

**<https://cdn.meimolihan.eu.org/hexo/js/runtime.js>**

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
/* 页脚计时器 start */
var now = new Date();
function createtime() {
    // 当前时间
    now.setTime(now.getTime() + 1000);
    var start = new Date("01/01/2025 00:00:00"); // 旅行者1号开始计算的时间
    var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
    var unit = (dis / 149600000).toFixed(6);  // 天文单位
    // 网站诞生时间
    var grt = new Date("08/09/2022 00:00:00");
    var days = (now - grt) / 1e3 / 60 / 60 / 24,
        dnum = Math.floor(days),
        hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours);
    1 == String(hnum).length && (hnum = "0" + hnum);
    var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes);
    1 == String(mnum).length && (mnum = "0" + mnum);
    var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds);
    1 == String(snum).length && (snum = "0" + snum);
    let currentTimeHtml = "";
    (currentTimeHtml =
        hnum < 18 && hnum >= 9
            ? `<img class='boardsign' src='https://cdn.meimolihan.eu.org/hexo/img/墨不凡-搬砖中.svg' title='什么时候能够实现财富自由呀~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
            : `<img class='boardsign' src='https://cdn.meimolihan.eu.org/hexo/img/墨不凡-休闲中.svg' title='下班了就该开开心心地玩耍~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
    createtime();
}, 1000);

/*页脚计时器 end */
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
inject:
  head:
    # 注入自定义css
  bottom:
  	# 注入自定义js
    - <script src="https://cdn.meimolihan.eu.org/hexo/js/runtime.js"></script> # 脚页徽标
```



**重启项目即可看到效果：**

```bash
hexo cl; hexo s
```