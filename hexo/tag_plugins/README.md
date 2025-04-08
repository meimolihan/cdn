# 标签外挂

<https://cdn.meimolihan.eu.org/hexo/tag_plugins/font-awesome-animation.min.css>
<https://cdn.meimolihan.eu.org/hexo/tag_plugins/jquery.min.js>
<https://cdn.meimolihan.eu.org/hexo/tag_plugins/issues.js>
<https://cdn.meimolihan.eu.org/hexo/tag_plugins/carousel-touch.js>
<https://cdn.meimolihan.eu.org/hexo/tag_plugins/tag_plugins.css>


安装插件,在博客根目录[Blogroot]下打开终端，运行以下指令：
```bash
npm install hexo-butterfly-tag-plugins-plus --save
```

考虑到hexo自带的markdown渲染插件hexo-renderer-marked与外挂标签语法的兼容性较差，建议您将其替换成hexo-renderer-kramed
```bash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

```yaml
# 标签外挂
# tag-plugins-plus
# see https://akilar.top/posts/615e2dec/
tag_plugins:
  enable: true # 开关
  priority: 5 #过滤器优先权
  issues: false #issues标签开关
  link:
    placeholder: "/assets/coffee.png" #link_card标签默认的图标图片
  CDN:
    anima: https://cdn.meimolihan.eu.org/hexo/tag_plugins/font-awesome-animation.min.css #动画标签anima的依赖
    jquery: https://cdn.meimolihan.eu.org/hexo/tag_plugins/jquery.min.js #issues标签依赖
    issues: https://cdn.meimolihan.eu.org/hexo/tag_plugins/issues.js #issues标签依赖
    carousel: https://cdn.meimolihan.eu.org/hexo/tag_plugins/carousel-touch.js
    tag_plugins_css: https://cdn.meimolihan.eu.org/hexo/tag_plugins/tag_plugins.css
```