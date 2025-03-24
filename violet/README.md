# violet留言板

在[BlogRoot]运行指令

```bash
npm install hexo-butterfly-envelope --save
```

在站点配置文件_config.yml或主题配置文件_config.butterfly.yml添加以下配置项

```yaml
# envelope_comment
# see https://akilar.top/posts/e2d3c450/
envelope_comment:
  enable: true #控制开关
  custom_pic:      
    cover: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/violet/violet.webp #信笺头部图片
    line: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/violet/line.png #信笺底部图片
    beforeimg: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/violet/before.png # 信封前半部分
    afterimg: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/violet/after.png # 信封后半部分
  message: #信笺正文，多行文本，写法如下
    - 有什么想问的？
    - 有什么想说的？
    - 有什么想吐槽的？
    - 哪怕是有什么想吃的，都可以告诉我哦~
  bottom: 自动书记人偶竭诚为您服务！ #仅支持单行文本
  height: #1050px，信封划出的高度
  path: #【可选】comments 的路径名称。默认为 comments，生成的页面为 comments/index.html
  front_matter: #【可选】comments页面的 front_matter 配置
    title: 留言板
    comments: true
```

```yaml
留言板: /comments/ || fas fa-envelope
```

>    cover: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg #信笺头部图片
>    line: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png #信笺底部图片
>    beforeimg: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png # 信封前半部分
>    afterimg: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png # 信封后半部分