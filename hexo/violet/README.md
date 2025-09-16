## ✨ 二十八、留言板 Violet 风格

`hexo-butterfly-envelope` 是一款专为 Butterfly 主题设计的留言板插件。它以其独特的信封抽拉动画和优雅的紫罗兰（Violet）风格设计而备受青睐。

### 1.📦 安装插件

在博客根目录下运行以下命令来安装插件：

```bash
npm install hexo-butterfly-envelope --save
```

### 2. ⚙️ 配置菜单

在主题配置文件 `_config.butterfly.yml` 中，为 `menu` 项添加【留言板】条目，并指定其图标。

```yaml
menu:
  首页: / || icon-zhuye || faa-tada
  文章 || icon-wenzhang || faa-tada || hide:
  标签: /tags/ || icon-biaoqian || faa-tada
  分类: /categories/ || icon-fenlei || faa-tada
  留言板: /comments/ || fas fa-envelope # 新增此行
  关于: /about/ || icon-guanyu1 || faa-tada
```

### 3. 🔧 配置详解

以下所有配置均需添加到主题配置文件 `_config.butterfly.yml` 中。

```yaml
# see https://akilar.top/posts/e2d3c450/
envelope_comment:
  enable: true #控制开关
  custom_pic:
    cover: https://cdn.meimolihan.eu.org/hexo/violet/violet.webp #信笺头部图片
    line: https://cdn.meimolihan.eu.org/hexo/violet/line.png #信笺底部图片
    beforeimg: https://cdn.meimolihan.eu.org/hexo/violet/before.png # 信封前半部分
    afterimg: https://cdn.meimolihan.eu.org/hexo/violet/after.png # 信封后半部分
  message: #信笺正文，多行文本，写法如下
    - 有什么想问的？
    - 有什么想说的？
    - 有什么想吐槽的？
    - 哪怕是有什么想吃的，都可以告诉我哦~
  bottom: 自动书记人偶竭诚为您服务！ #仅支持单行文本
  height: 1050px # 信封划出的高度，可根据内容多少调整
  path: comments # 【可选】留言板页面的路径名称。默认为 comments，访问地址是 /comments/
  front_matter: # 【可选】为留言板页面设置单独的 Front Matter
    title: 留言板
    comments: true # 确保此页面的评论功能是开启的
```

### 4. 🌐 CDN 配置推荐

为了加速图片加载，建议使用 CDN 服务。以下是三种推荐的配置方案。

#### 🚀 jsDelivr CDN

[jsDelivr](https://www.jsdelivr.com/) 是一个免费的公共 CDN，速度快且稳定，非常适合开源项目。**（推荐使用）**

```yaml
custom_pic:
  cover: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/violet/violet.webp
  line: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/violet/line.png
  beforeimg: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/violet/before.png
  afterimg: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/violet/after.png
```

#### 🦄 Vercel CDN

如果您希望使用自己的图床，可以将图片部署到 [Vercel](https://vercel.com/) 等平台，获得更自主的控制权。

```yaml
custom_pic:
  cover: https://cdn.meimolihan.eu.org/hexo/violet/violet.webp #信笺头部图片
  line: https://cdn.meimolihan.eu.org/hexo/violet/line.png #信笺底部图片
  beforeimg: https://cdn.meimolihan.eu.org/hexo/violet/before.png # 信封前半部分
  afterimg: https://cdn.meimolihan.eu.org/hexo/violet/after.png # 信封后半部分
```

#### 🏢 官方 CDN

插件也提供了由 npm 分发的官方图片链接，作为备选方案。

```yaml
custom_pic:
  cover: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg
  line: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png
  beforeimg: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png
  afterimg: https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png
```
