## 今日诗词侧边栏小组件


[张洪Heo](https://blog.zhheo.com/p/2ed9d8dd.html) ，[今日诗词API](https://www.jinrishici.com/)

**创建组件**
主题新建`[BlogRoot]/themes/butterfly/layout/includes/widget/card_poem.pug`内容如下：

```pug
#card-poem.card-widget
    #poem_sentence
    #poem_info
        #poem_dynasty
        span.dot <!-- 插入一个元素 -->
        #poem_author
script(src='https://cdn.jsdelivr.net/npm/js-heo@1.0.11/poem/jinrishici.js', charset='utf-8')
script(type='text/javascript').
    jinrishici.load(function(result) {
        var sentence = document.querySelector("#poem_sentence")
        var author = document.querySelector("#poem_author")
        var dynasty = document.querySelector("#poem_dynasty")

        var sentenceText = result.data.content
        sentenceText = sentenceText.substr(0, sentenceText.length - 1);
        sentence.innerHTML = sentenceText
        dynasty.innerHTML = result.data.origin.dynasty
        author.innerHTML = result.data.origin.author + '《' + result.data.origin.title + '》'
    });
```

引入组件
在 `[BlogRoot]/themes/butterfly/layout/includes/widget/index.pug` 中你需要的位置添加以下内容：

```pug
!=partial('includes/widget/card_poem', {}, {cache: true})
```

填写示例，可以在俩个

```diff
#aside-content.aside-content
  //- post
  if is_post()
    - const tocStyle = page.toc_style_simple
    - const tocStyleVal = tocStyle === true || tocStyle === false ? tocStyle : theme.toc.style_simple
    if showToc && tocStyleVal
      .sticky_layout
        include ./card_post_toc.pug
    else
      !=partial('includes/widget/card_author', {}, {cache: true})
+     !=partial('includes/widget/card_poem', {}, {cache: true})
      !=partial('includes/widget/card_announcement', {}, {cache: true})
      !=partial('includes/widget/card_top_self', {}, {cache: true})
      .sticky_layout
        if showToc
          include ./card_post_toc.pug
        !=partial('includes/widget/card_weibo', {}, {cache: true})
        !=partial('includes/widget/card_recent_post', {}, {cache: true})
        !=partial('includes/widget/card_ad', {}, {cache: true})
  else
    //- page
    !=partial('includes/widget/card_author', {}, {cache: true})
+   !=partial('includes/widget/card_poem', {}, {cache: true})
    !=partial('includes/widget/card_announcement', {}, {cache: true})
    !=partial('includes/widget/card_top_self', {}, {cache: true})   
```

**创建 `Hexo根目录/source/css/custom.css` 文件，将代码复制粘贴到该文件中。**

```css
#card-poem {
    display: flex;
    flex-direction: column;
    padding: 0.5rem!important;
    min-height: 130px;
}
div#poem_sentence {
    text-align: center;
    font-family: serif,cursive;
    line-height: 1.9;
    margin-bottom: 0.66rem; /* 诗词与作者 间距调整 */
    padding: 1rem;
    border-radius: 15px;
    background: var(--trans-light);
    min-height: 62px;
    color: var(--theme-color);
}
[data-theme=dark] div#poem_sentence {
    background: var(--trans-dark);
}
/* 朝代 */
div#poem_dynasty {
    order: 0;
    padding: 1px 5px 5px 6px;
    background: var(--trans-light);
    color: var(--font-color);
    border-radius: 8px;
    font-size: 15px;
}
[data-theme=dark] div#poem_dynasty {
    background: var(--trans-dark);
}
/* 诗词作者和名字 */
div#poem_info {
    display: flex;
    color: var(--font-color);
    font-size: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 11px;
}
div#poem_author {
    order: 1;
    padding: 6px;
    margin-left: 12px;
    background: var(--trans-light);
    border-radius: 8px;
}
[data-theme=dark] div#poem_author {
    background: var(--trans-dark);
}

/* 小点的样式 */
div#poem_info .dot {
    width: 6px; /* 小点的宽度 */
    height: 6px; /* 小点的高度 */
    background-color: var(--theme-color); /* 小点的颜色，使用 CSS 变量 */
    border-radius: 50%; /* 将小点变成圆形 */
    position: relative; /* 使用相对定位 */
    transform: translate(6px, 15px); /* 向右移动 10 像素，向下移动 5 像素 */
}
```

**引入custom.css**

如果没有引用过 `heoMainColor.css` 需要引用

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
```

**重启项目即可看到效果：**
```bash
hexo cl; hexo s
```
