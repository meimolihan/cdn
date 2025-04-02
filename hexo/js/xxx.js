// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }));
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time;
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 读取背景
try {
    let data = loadData('blogbg', 1440); // 1440分钟 = 1天
    if (data) changeBg(data, 1);
    else localStorage.removeItem('blogbg');
} catch (error) {
    localStorage.removeItem('blogbg');
}

// 切换背景函数
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg');

    // 确保背景元素存在
    if (!bg) {
        console.error("Background element not found");
        return;
    }

    // 处理纯色背景
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s;
        bg.style.backgroundImage = 'none';
    }
    // 处理图片背景
    else if (s.startsWith('url(') && s.endsWith(')')) {
        // 修复手机端 URL 转义问题
        let url = s.replace(/^url\(|\)$/g, '').replace(/\\:/g, ':');

        // 设置背景图片
        bg.style.backgroundImage = `url(${url})`;
        bg.style.backgroundSize = 'cover';
        bg.style.backgroundPosition = 'center';
        bg.style.backgroundColor = 'transparent';
    }
    // 处理渐变色背景
    else {
        bg.style.backgroundImage = s;
        bg.style.backgroundSize = 'auto';
        bg.style.backgroundPosition = 'initial';
        bg.style.backgroundColor = 'transparent';
    }

    // 保存背景设置（如果需要）
    if (!flag) {
        saveData('blogbg', s);
    }
}

// 初始化透明度设置 - 修改默认值为60%
const DEFAULT_TRANSPARENCY = 60;
let curTransNum;

// 初始化透明度
function initTransparency() {
    // 加载透明度设置
    curTransNum = loadData("transNum", 1440); // 1440分钟 = 1天
    if (!curTransNum) {
        curTransNum = DEFAULT_TRANSPARENCY;
        saveData("transNum", curTransNum);
    }

    updateTransparency(curTransNum);

    // 绑定透明度滑块事件
    const transSet = document.getElementById("transSet");
    if (transSet) {
        transSet.value = curTransNum;
        transSet.addEventListener("input", setTrans);
    }
}

// 更新透明度CSS变量 - 优化版本
function updateTransparency(newTransNum) {
    // 确保透明度值在0到100之间
    newTransNum = Math.max(0, Math.min(100, newTransNum));

    // 使用requestAnimationFrame确保所有更新在同一帧完成
    requestAnimationFrame(() => {
        // 日间模式透明度
        const lightOpacityValue = newTransNum / 100;
        document.documentElement.style.setProperty('--trans-light', `rgba(253, 253, 253, ${lightOpacityValue})`);

        // 夜间模式透明度
        const darkOpacityValue = newTransNum / 100;
        document.documentElement.style.setProperty('--trans-dark', `rgba(30, 30, 30, ${darkOpacityValue})`);

        // 更新显示文本
        const transPercentElement = document.getElementById("transPercent");
        if (transPercentElement) {
            transPercentElement.style.color = "red"; // 设置为红色
            transPercentElement.innerText = `${newTransNum}%`;
        }

        // 更新所有.transValue元素
        const transValueElements = document.querySelectorAll('.transValue');
        transValueElements.forEach(el => {
            el.innerHTML = `<span style="color: red;">透明度 (0%-100%): ${newTransNum}%</span>`;
        });
    });
}

// 优化后的防抖函数
let debounceTimer;
function setTrans() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        var elem = document.getElementById("transSet");
        var newTransNum = elem.value;
        saveData("transNum", newTransNum);
        updateTransparency(newTransNum);
    }, 16); // 约60fps的间隔
}

// 创建窗口
var winbox = '';

function createWinbox() {
    let div = document.createElement('div');
    document.body.appendChild(div);
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => {
            div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>`;
        },
        onrestore: () => {
            div.innerHTML = '';
        }
    });
    winResize();
    window.addEventListener('resize', winResize);

    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <p><button onclick="resetToDefault()" style="background:#006b93;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    
    <div class="transValue" style="font-weight:bold;padding-left:10px">透明度 (0%-100%): ${curTransNum}%</div>
    <input id="transSet" type="range" min="0" max="100" value="${curTransNum}" oninput="setTrans()" style="width:220px;margin:10px 0;"> <!-- 修改进度条长度为220px -->
    
    <h2 id="手机壁纸"><a href="#手机壁纸" class="headerlink" title="手机壁纸"></a>手机壁纸</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-001.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-001.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-002.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-002.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-003.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-003.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-004.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-004.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-005.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-005.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-006.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-006.webp)')"></a>
    </div>
    
    <h2 id="电脑壁纸"><a href="#电脑壁纸" class="headerlink" title="电脑壁纸"></a>电脑壁纸</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/pc-019.webp)" class="imgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/pc-019.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/pc-020.webp)" class="imgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/pc-020.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/pc-021.webp)" class="imgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/pc-021.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/pc-022.webp)" class="imgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/pc-022.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/pc-023.webp)" class="imgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/pc-023.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/pc-024.webp)" class="imgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/pc-024.webp)')"></a>
    </div>
    
    <h2 id="随机壁纸"><a href="#随机壁纸" class="headerlink" title="随机壁纸"></a>随机壁纸</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://api.timelessq.com/bing/random)" class="imgbox" onclick="changeBg('url(https://api.timelessq.com/bing/random)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://api.paugram.com/wallpaper/)" class="imgbox" onclick="changeBg('url(https://api.paugram.com/wallpaper/)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.alcy.cc/ai)" class="imgbox" onclick="changeBg('url(https://t.alcy.cc/ai)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://acg.suyanw.cn/cutepet)" class="imgbox" onclick="changeBg('url(https://acg.suyanw.cn/cutepet)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://acg.suyanw.cn/Game)" class="imgbox" onclick="changeBg('url(https://acg.suyanw.cn/Game)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://acg.suyanw.cn/beauty)" class="imgbox" onclick="changeBg('url(https://acg.suyanw.cn/beauty)')"></a>
    </div>
    
    <h2 id="颜色壁纸" onclick="toggleSection('bg-options')">
        <a href="#颜色壁纸" class="headerlink" title="颜色壁纸"></a>
        颜色壁纸
        <svg class="toggle-icon" aria-hidden="true" style="width: 1em; height: 1em; margin-left: 0.5em; transition: transform 0.3s ease;">
            <use xlink:href='#icon-jiantou'></use>
        </svg>
    </h2>
    <div id="bg-options" class="bg-options-container" style="display: none;">
        
        <h3 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h3>
        <div class="bgbox">
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #a8edea, #fed6e3, #f6d365, #a8edea);" onclick="changeBg('linear-gradient(to right, #a8edea, #fed6e3, #f6d365, #a8edea)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #0f2027, #203a43, #2c5364, #3a7bd5)" onclick="changeBg('linear-gradient(to right, #0f2027, #203a43, #2c5364, #3a7bd5)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb)" onclick="changeBg('linear-gradient(to right, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #d4a57e, #c29d63, #a67c52, #8c6b45)" onclick="changeBg('linear-gradient(to right, #d4a57e, #c29d63, #a67c52, #8c6b45)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #2193b0, #6dd5ed, #2980b9, #68c3a3)" onclick="changeBg('linear-gradient(to right, #2193b0, #6dd5ed, #2980b9, #68c3a3)')"></a>
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #ff8008, #ff973a, #ffbe76, #ffd39b)" onclick="changeBg('linear-gradient(to right, #ff8008, #ff973a, #ffbe76, #ffd39b)')"></a>
        </div>
        
        <h3 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h3>
        <div class="bgbox">
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #1A237E" onclick="changeBg('#1A237E')"></a> 
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #80DEEA" onclick="changeBg('#80DEEA')"></a> 
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #F5F5F5" onclick="changeBg('#F5F5F5')"></a> 
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #FF9800" onclick="changeBg('#FF9800')"></a> 
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #F8BBD0" onclick="changeBg('#F8BBD0')"></a> 
            <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #1B5E20" onclick="changeBg('#1B5E20')"></a> 
        </div>
    </div>

    <!-- 新增居中显示的文本 -->
    <div style="text-align: center; margin-top: 20px; color: #666;">
        ------ ( •̀ ω •́ )y 到底啦 ------
    </div>
    `;

    // 确保输入元素正确绑定事件
    initTransparency();
}

// 适应窗口大小
function winResize() {
    let box = document.querySelector('#changeBgBox');
    if (!box || box.classList.contains('min') || box.classList.contains('max')) return;
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

function toggleSection(id) {
    const section = document.getElementById(id);
    const icon = document.querySelector('#背景选项 .toggle-icon');

    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        icon.style.transform = 'rotate(90deg)';
    } else {
        section.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}

// 重置透明度到默认值
function resetToDefault() {
    // 重置透明度
    saveData("transNum", DEFAULT_TRANSPARENCY);
    // 重置背景
    localStorage.removeItem('blogbg');
    location.reload();
}

// 初始化透明度
initTransparency();

// 适配 pjax
document.addEventListener('pjax:complete', function() {
    // 在 pjax 页面加载完成后重新初始化透明度
    initTransparency();
});