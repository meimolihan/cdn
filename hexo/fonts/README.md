## 引用字体

<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/fonts/ZhuZiAWan.woff2>

<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/fonts/dingliezhuhaifont.woff2>



>  字体天下： <https://www.fonts.net.cn/font-32027849465.html>
>  谷歌字体,：<http://www.googlefonts.net/chinese>

首先将文件放到CSS同级目录下：`Hexo根目录/source/css/GenJyuuGothic-Medium-2.ttf`

创建 `Hexo根目录/source/css/引用字体.css` 文件，将代码复制粘贴到该文件中。
```css
/* 引用外链字体（任选其一） */
@font-face {
    font-family: ZhuZiAYuanJWD;
    src: url(https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/fonts/ZhuZiAWan.woff2);
    font-display: swap;
}

/* 引用本地字体（任选其一） */
@font-face {
    font-family: 'ZhuZiAYuanJWD'; /*字体名称，名字可以随便起，但是注意要一致，建议英文*/
    font-display: swap;
    src: url('./GenJyuuGothic-Medium-2.ttf') format("truetype");
}


body, /* 全局修改为此字体 */
a.title, /* 标题链接-引用字体 */
div#menus, /* 菜单容器-引用字体 */
#blog-info, /* 站点标题-引用字体 */
#post-meta, /* 发表时间、更新时间等-引用字体 */
h1#site-title, /* 网站主标题-引用字体 */
h1.post-title, /* 文章标题-引用字体 */
#site-subtitle, /* 一言网一句话-引用字体 */
#aside-content, /* 侧边栏内容-引用字体 */
.category-title, /* 分类标题-引用字体 */
a.article-title, /* 文章链接标题-引用字体 */
.tag-cloud-title, /* 标签云标题-引用字体 */
.article-sort-title, /* 文章排序标题-引用字体 */
a.blog-slider__title, /* 博客轮播标题-引用字体 */
a.category-list-link, /* 分类列表链接-引用字体 */
h1,h2,h3,h4,h5,h6, /* 所有标题标签-引用字体 */
a.categoryBar-list-link, /* 分类栏列表链接-引用字体 */
a.article-sort-item-title, /* 文章排序项目标题-引用字体 */
figure.highlight td.code pre, /* 代码框-引用字体 */
figure.highlight td.code pre code, /* 代码框中的代码-引用字体 */
a#site-name, span#subtitle, a.site-page, /* 站点名称、副标题和页面链接-引用字体 */
#post .container.post-content .folding-tag .content ul li code /* 折叠标签中的代码-引用字体 */
{
    font-family: 'ZhuZiAYuanJWD', sans-serif !important; /* 设置字体为 ZhuZiAYuanJWD，如果没有则使用系统默认的无衬线字体 */
}
```

**引入 `引用字体.css` 文件**

在 _config.butterfly.yml 文件中找到 inject 部分，如果该部分不存在，添加以下内容：
```yaml
inject:
  head: # 注入自定义css
    - <link rel="stylesheet" href="/css/引用字体.css">
```

**配置字体**
在 _config.butterfly.yml 文件中修改一下内容：
```yaml
# 全局字体设置
# 除非您知道它们的工作原理，否则不要修改以下设置
font:
  # 默认字体大小（全局范围内的字体大小）
  global-font-size: 18px
  # 代码字体大小（用于代码块或代码相关的内容）
  code-font-size: 18px
  # 普通文本的字体家族（字体名称）
  font-family: 'ZhuZiAYuanJWD'
  # 代码字体家族（代码块或代码相关的内容的字体）
  code-font-family: 'ZhuZiAYuanJWD'
```

**最后重新编译运行即可看见效果**

```bash
hexo cl; hexo s
```
**刷新页面即可看到效果**
