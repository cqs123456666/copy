// 全局变量
let currentModule = 'short-video';
let currentFormData = null;

// 初始化页面
function init() {
    setupModuleNavigation();
    setupFormSubmissions();
    setupResultActions();
    loadHistory();
}

// 设置模块导航
function setupModuleNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const modules = document.querySelectorAll('.module');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const moduleId = btn.dataset.module;
            
            // 更新导航按钮状态
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新模块显示
            modules.forEach(module => {
                module.classList.remove('active');
                if (module.id === moduleId) {
                    module.classList.add('active');
                }
            });
            
            currentModule = moduleId;
            // 隐藏结果和历史记录
            document.getElementById('result-container').classList.add('hidden');
            document.getElementById('history-container').classList.add('hidden');
        });
    });
}

// 设置表单提交
function setupFormSubmissions() {
    const forms = {
        'short-video': document.getElementById('short-video-form'),
        'xiaohongshu': document.getElementById('xiaohongshu-form'),
        'wechat': document.getElementById('wechat-form'),
        'brand': document.getElementById('brand-form')
    };
    
    Object.entries(forms).forEach(([module, form]) => {
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                currentFormData = Object.fromEntries(formData);
                generateContent(module, currentFormData);
            });
        }
    });
}

// 生成内容
function generateContent(module, formData) {
    // 显示加载状态
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('result-content').textContent = '生成中...';
    
    // 模拟AI生成过程
    setTimeout(() => {
        let result = '';
        
        switch(module) {
            case 'short-video':
                result = generateShortVideoScript(formData);
                break;
            case 'xiaohongshu':
                result = generateXiaohongshuPost(formData);
                break;
            case 'wechat':
                result = generateWechatArticle(formData);
                break;
            case 'brand':
                result = generateBrandCopy(formData);
                break;
        }
        
        document.getElementById('result-content').textContent = result;
        
        // 保存到历史记录
        saveToHistory(module, formData, result);
    }, 1500);
}

// 生成短视频脚本
function generateShortVideoScript(data) {
    return `【短视频脚本】\n\n平台：${data.platform}\n主题：${data.topic}\n目标受众：${data.audience}\n时长：${data.duration}\n风格：${data.style}\n赛道：${data.track}\n\n=== 3秒爆款钩子 ===\n镜头：特写\n画面：${data.platform === '抖音' ? '动感音乐+快速剪辑' : '温馨画面+柔和音乐'}\n台词："你绝对想不到，这个小技巧能让你${data.topic.split(' ')[0]}提升10倍效果！"\n时长：3秒\n\n=== 核心内容 ===\n镜头：中景\n画面：详细展示${data.topic}的使用方法\n台词："今天我要分享的是${data.topic}，它的核心优势是..."\n时长：${data.duration === '15s' ? '8秒' : data.duration === '30s' ? '18秒' : data.duration === '60s' ? '40秒' : '60秒'}\n\n=== 互动引导 ===\n镜头：近景\n画面：主播面对镜头微笑\n台词："觉得有用的小伙伴，记得点赞收藏关注，评论区告诉我你们的使用感受！"\n时长：${data.duration === '15s' ? '4秒' : data.duration === '30s' ? '9秒' : data.duration === '60s' ? '17秒' : '27秒'}\n\n=== 完整分镜建议 ===\n1. 开场：3秒，特写，吸引注意力\n2. 主体：核心内容展示\n3. 结尾：互动引导\n\n${data.requirements ? '=== 额外要求 ===\n' + data.requirements : ''}`;
}

// 生成小红书推文
function generateXiaohongshuPost(data) {
    return `【小红书笔记】\n\n=== 吸睛爆款标题 ===\n${data.type === '种草' ? '绝了！这个' + data.topic.split(' ')[0] + '我回购了10次！' : 
 data.type === '干货' ? '收藏！'+ data.topic +'全攻略，新手必看' : 
 data.type === '测评' ? '实测！'+ data.topic +'到底值不值得买？' : 
 '日常分享｜'+ data.topic}\n\n=== 正文 ===\n家人们！今天要给你们分享${data.topic}\n\n真的太好用了，我已经用了好几个月了\n\n它的优点：\n• 效果明显\n• 价格实惠\n• 使用方便\n\n适合${data.audience}使用，强烈推荐！\n\n=== 热门标签 ===\n#${data.topic.split(' ')[0]} #${data.type} #好物推荐 #生活方式 #${data.audience.split(' ')[0]} #宝藏单品 #必备神器\n\n${data.requirements ? '=== 额外要求 ===\n' + data.requirements : ''}`;
}

// 生成公众号推文
function generateWechatArticle(data) {
    return `【公众号推文】\n\n=== 标题 ===\n${data.type === '干货' ? '深度解析：' + data.topic : 
 data.type === '情感' ? '关于' + data.topic + '，你必须知道的事' : 
 '品牌故事：' + data.topic}\n\n=== 开头引入 ===\n大家好，今天想和大家聊聊${data.topic}。\n\n在这个信息爆炸的时代，我们每天都被各种信息包围，而${data.topic}却常常被我们忽略。\n\n=== 核心内容 ===\n一、${data.topic}的重要性\n   - 为什么${data.topic}对我们如此重要\n   - 它如何影响我们的生活\n\n二、如何正确理解${data.topic}\n   - 常见误区\n   - 正确的认识方式\n\n三、实用建议\n   - 具体的操作方法\n   - 注意事项\n\n=== 结尾升华 ===\n希望通过今天的分享，大家能对${data.topic}有更深入的认识。\n\n让我们一起努力，让${data.topic}成为我们生活中的正能量。\n\n感谢阅读，欢迎分享给身边的朋友！\n\n${data.requirements ? '=== 额外要求 ===\n' + data.requirements : ''}`;
}

// 生成品牌文案
function generateBrandCopy(data) {
    if (data.type === 'slogan') {
        return `【品牌Slogan】\n\n1. ${data.name}，${data.selling-points.split(' ')[0]}的选择\n2. 有${data.name}，生活更美好\n3. ${data.name}，为${data.audience}而生\n4. ${data.name}，${data.selling-points}\n5. 选择${data.name}，选择品质生活`;
    } else if (data.type === '产品介绍') {
        return `【产品介绍】\n\n品牌：${data.name}\n\n核心卖点：\n${data.selling-points.split(' ').map(point => '- ' + point).join('\n')}\n\n目标受众：${data.audience}\n\n使用场景：${data.scene}\n\n产品特点：\n• 品质保证\n• 设计精美\n• 使用便捷\n• 性价比高\n\n适合${data.audience}在${data.scene}使用，是您的理想选择！`;
    } else {
        return `【品牌故事】\n\n${data.name}的故事始于对${data.selling-points.split(' ')[0]}的追求。\n\n我们相信，每个人都值得拥有最好的${data.name}。\n\n从创立之初，我们就坚持以${data.audience}的需求为中心，不断创新和改进。\n\n在${data.scene}中，${data.name}成为了不可或缺的一部分。\n\n未来，我们将继续努力，为更多人带来优质的${data.name}体验。`;
    }
}

// 设置结果操作按钮
function setupResultActions() {
    // 一键复制
    document.getElementById('copy-btn').addEventListener('click', () => {
        const content = document.getElementById('result-content').textContent;
        navigator.clipboard.writeText(content).then(() => {
            alert('复制成功！');
        });
    });
    
    // 重新生成
    document.getElementById('regenerate-btn').addEventListener('click', () => {
        if (currentFormData) {
            generateContent(currentModule, currentFormData);
        }
    });
    
    // 在线编辑
    document.getElementById('edit-btn').addEventListener('click', () => {
        const content = document.getElementById('result-content').textContent;
        const editedContent = prompt('请编辑内容：', content);
        if (editedContent !== null) {
            document.getElementById('result-content').textContent = editedContent;
        }
    });
    
    // 本地保存
    document.getElementById('save-btn').addEventListener('click', () => {
        const content = document.getElementById('result-content').textContent;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentModule}_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// 保存到历史记录
function saveToHistory(module, formData, result) {
    const history = JSON.parse(localStorage.getItem('copyAssistantHistory') || '[]');
    const historyItem = {
        id: Date.now(),
        module,
        formData,
        result,
        date: new Date().toISOString()
    };
    history.unshift(historyItem);
    // 只保留最近20条记录
    if (history.length > 20) {
        history.pop();
    }
    localStorage.setItem('copyAssistantHistory', JSON.stringify(history));
    loadHistory();
}

// 加载历史记录
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('copyAssistantHistory') || '[]');
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<p>暂无历史记录</p>';
        return;
    }
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <h3>${getModuleName(item.module)}</h3>
            <p>${getFormSummary(item.formData)}</p>
            <p class="history-date">${new Date(item.date).toLocaleString()}</p>
        `;
        historyItem.addEventListener('click', () => {
            document.getElementById('result-container').classList.remove('hidden');
            document.getElementById('result-content').textContent = item.result;
            currentModule = item.module;
            currentFormData = item.formData;
            // 切换到对应模块
            document.querySelectorAll('.nav-btn').forEach(btn => {
                if (btn.dataset.module === item.module) {
                    btn.click();
                }
            });
        });
        historyList.appendChild(historyItem);
    });
}

// 获取模块名称
function getModuleName(module) {
    const moduleNames = {
        'short-video': '短视频脚本',
        'xiaohongshu': '小红书推文',
        'wechat': '公众号推文',
        'brand': '品牌文案'
    };
    return moduleNames[module] || module;
}

// 获取表单摘要
function getFormSummary(formData) {
    if (formData.topic) {
        return formData.topic.substring(0, 50) + (formData.topic.length > 50 ? '...' : '');
    } else if (formData.name) {
        return formData.name + (formData.sellingPoints ? ' - ' + formData.sellingPoints.substring(0, 30) + '...' : '');
    }
    return '无摘要';
}

// 初始化页面
init();