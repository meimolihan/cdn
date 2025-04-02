# 【Hexo + Butterfly】 增加动画特效

<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/wowjs/animate.min.css>

<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/wowjs/wow.min.js>

<https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo/wowjs/wow_init.js>

---

##【Hexo + Butterfly】 增加动画特效
### 安装插件
- Hexo 博客根目录执行命令：
```bash
npm install hexo-butterfly-wowjs --save
````

### 添加配置信息
- 在站点配置文件`_config.yml` 或者主题配置文件`_config.butterfly.yml `中添加：
```yaml
# Hexo + Butterfly】 增加动画特效
wowjs:
  enable: true #控制动画开关。true是打开，false是关闭
  priority: 10 #过滤器优先级
  mobile: false #移动端是否启用，默认移动端禁用
  animateitem:
    - class: recent-post-item #必填项，需要添加动画的元素的class
      style: animate__zoomIn #必填项，需要添加的动画
      duration: 2s #选填项，动画持续时间，单位可以是ms也可以是s。例如3s，700ms。
      delay: 1s #选填项，动画开始的延迟时间，单位可以是ms也可以是s。例如3s，700ms。
      offset: 100 #选填项，开始动画的距离（相对浏览器底部）
      iteration: 1 #选填项，动画重复的次数
    - class: card-widget
      style: animate__zoomIn
  animate_css: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo-butterfly-wowjs/animate.min.css
  wow_js: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo-butterfly-wowjs/wow.min.js
  wow_init_js: https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/hexo-butterfly-wowjs/wow_init.js
```