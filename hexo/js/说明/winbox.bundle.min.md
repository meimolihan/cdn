# 博客背景切换

**<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo-winbox/winbox.bundle.min.js>**

**<https://cdn.meimolihan.eu.org/hexo/js/winbox.bundle.min.js>**

---



**创建按钮**

> 自行选择在哪里添加，只需要调用`toggleWinbox`函数就可以

1. 引入到右下角方法

修改`博客根目录\butterfly\layout\includes\rightside.pug`
在众多when下面新增：

```diff
when 'comment'
    if commentsJsLoad
        a#to_comment(href="#post-comment" title=_p("rightside.scroll_to_comment"))
        i.fas.fa-comments
+ when 'bg'
+     button(type="button" title='切换背景' onclick="toggleWinbox()")
+         i.fas.fa-display
```

然后修改：

```diff
#rightside
  - const { enable, hide, show } = theme.rightside_item_order
  - const hideArray = enable ? hide && hide.split(',') : ['readmode','translate','darkmode','hideAside']
-  - const showArray = enable ? show && show.split(',') : ['toc','chat','comment']
+  - const showArray = enable ? show && show.split(',') : ['toc','chat','comment','bg']
```

> 以上是引入到 `右下角` 的方法

2. 引入到导航栏 `右上角` 方法

- 图标`#icon-a-zhaopiantupianxiangce`修改为自己的



```diff
    if theme.menu
      != partial('includes/header/menu_item', {}, {cache: true})
+      a.site-page.faa-parent.animated-hover(onclick='toggleWinbox()' title='切换壁纸')
+        svg.faa-tada.bizhi(aria-hidden="true", style="height:2em;width:2em")
+          use(xlink:href='#icon-a-zhaopiantupianxiangce')
```



**创建 `博客根目录/source/js/bizhi.js`**

```javascript
// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)')"></a>
    </div>
    
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)" class="imgbox" onclick="changeBg('url(https\://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)')"></a>
    </div>
    
    
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    </div>
    
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a> 
    </div>
`;
}

// 适应窗口大小
function winResize() {
    let box = document.querySelector('#changeBgBox')
    if (!box || box.classList.contains('min') || box.classList.contains('max')) return // 2023-02-10更新
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}
```



**创建 `博客根目录/source/css/bizhi.css`**



```css
/* 由于全屏会出bug，所以直接给他隐藏 */

.winbox {
    border-radius: 12px;
    overflow: hidden;
}

.wb-full {
    display: none;
}

.wb-min {
    background-position: center;
}

[data-theme='dark'] .wb-body,
[data-theme='dark'] #changeBgBox {
    background: #333 !important;
}

.bgbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pimgbox,
.imgbox,
.box {
    width: 166px;
    margin: 10px;
    background-size: cover
}

.pimgbox,
.imgbox {
    border-radius: 10px;
    overflow: hidden;
}

.pimgbox {
    height: 240px;
}

.imgbox {
    height: 95px;
}

.box {
    height: 100px;
}

@media screen and (max-width: 768px) {
    /* 背景 */
    .pimgbox,
    .imgbox,
    .box {
        height: 73px;
        width: 135px;
    }
    .pimgbox {
        height: 205px;
    }
    /* 2.0新增内容 */    
    .wb-min {
        display: none;
    }
    #changeBgBox .wb-body::-webkit-scrollbar {
        display: none;
    }
}
```


**引入 `bizhi.js和bizhi.css`**

```yaml
inject:
  head:
    # 注入自定义css
    - <link rel="stylesheet" href="/css/bizhi.css"> # 切换壁纸
  bottom:
  	# 注入自定义js
    - <script src="https://cdn.meimolihan.eu.org/hexo/js/winbox.bundle.min.js"></script> # 切换壁纸 1（必须在（切换壁纸 2）前面引入）
    - <script src="https://cdn.meimolihan.eu.org/hexo/js/bizhi.js"></script> # 切换壁纸 2
```


**重启项目即可看到效果：**

```bash
hexo cl; hexo s
```
