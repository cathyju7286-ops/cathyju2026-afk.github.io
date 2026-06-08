// ===================== 导航 =====================
function showSection(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    document.querySelector('.nav-menu').classList.remove('open');
    window.scrollTo(0, 0);
}

function toggleNav() {
    document.querySelector('.nav-menu').classList.toggle('open');
}

// ===================== 专业测评 =====================
const questions = [
    { q: '你更喜欢哪类课程？', options: ['实践操作类（拍摄、设计、编程）', '理论研究类（文学、传播、心理）', '创意表达类（艺术、表演、编剧）', '数据分析类（会计、金融、电商）'] },
    { q: '你对哪个领域最感兴趣？', options: ['影视传媒（编导、播音、摄影）', '艺术设计（产品、环境、视觉）', '信息技术（计算机、网络、AI）', '经济管理（会计、人力、金融）', '人文教育（文学、英语、教育）', '体育健康（休闲体育、健身）'] },
    { q: '你毕业后更倾向于？', options: ['直接就业，进入企业工作', '考研深造，提升学历', '考公务员/事业单位', '创业或自由职业'] },
    { q: '你最强的能力是什么？', options: ['创意策划与表达', '逻辑分析与编程', '沟通协调与管理', '动手实践与制作'] },
    { q: '你理想的工作环境？', options: ['创意工作室/媒体公司', '互联网/科技公司', '学校/教育机构', '政府/事业单位', '自由办公/远程'] },
    { q: '你最看重的职业价值？', options: ['创意表达与成就感', '薪资待遇与经济回报', '稳定保障与福利', '社会贡献与意义', '个人成长与学习'] },
    { q: '你更喜欢怎样完成任务？', options: ['独立完成，专注深入', '团队协作，集思广益', '带领团队，统筹安排', '灵活应变，随机调整'] },
    { q: '你如何看待新技术？', options: ['热衷学习，紧跟前沿', '愿意尝试，按需学习', '不太敏感，够用就行', '专注传统技能深耕'] },
    { q: '你更倾向与人打交道还是与数据打交道？', options: ['与人打交道（沟通、教学、服务）', '与数据打交道（分析、编程、财务）', '与作品打交道（设计、创作、制作）', '都可以，视情况而定'] },
    { q: '你希望未来的工作节奏？', options: ['朝九晚五，稳定规律', '项目制，有忙有闲', '弹性自由，自主安排', '快节奏，充满挑战'] }
];

const careerMap = [
    {
        type: '影视传媒方向',
        match: [0, 0, 0, 0, 0, 0, 1, 0, 2, 1],
        desc: '推荐专业：广播电视编导、播音与主持艺术、摄影、影视摄影与制作、戏剧影视导演、表演<br><br>就业方向：电视台、影视公司、新媒体平台、广告公司、文化传媒机构<br><br>建议：多参加拍摄实践，积累作品集，关注行业新技术如 AI 影视制作。'
    },
    {
        type: '艺术设计方向',
        match: [2, 1, 0, 0, 0, 0, 0, 0, 2, 0],
        desc: '推荐专业：产品设计、环境设计、视觉传达设计、服装与服饰设计、数字媒体艺术、风景园林<br><br>就业方向：设计公司、互联网企业、家居/服装企业、游戏公司、自主创业<br><br>建议：打造高质量作品集，掌握 Figma/Blender 等前沿工具，关注 AI 辅助设计。'
    },
    {
        type: '信息技术方向',
        match: [0, 2, 0, 1, 1, 2, 0, 0, 1, 3],
        desc: '推荐专业：计算机科学与技术、网络工程、电子信息工程、电气工程及其自动化、人工智能、数字经济<br><br>就业方向：互联网公司、通信企业、金融科技、智能制造、政府信息化部门<br><br>建议：刷 LeetCode，做开源项目，考取专业认证（华为、AWS 等）。'
    },
    {
        type: '经济管理方向',
        match: [3, 3, 0, 2, 1, 1, 2, 2, 1, 0],
        desc: '推荐专业：会计学、财务管理、人力资源管理、市场营销、物流管理、金融工程、国际经济与贸易、电子商务<br><br>就业方向：银行、证券公司、会计师事务所、企业财务/人力/市场部门、跨境电商<br><br>建议：考取 CPA/ACCA/CFA 等证书，重视实习经历，培养数据分析能力。'
    },
    {
        type: '人文教育方向',
        match: [1, 4, 1, 2, 2, 3, 1, 2, 0, 0],
        desc: '推荐专业：汉语言文学、传播学、网络与新媒体、英语、商务英语、应用心理学、小学教育<br><br>就业方向：学校/教育机构、媒体出版、政府机关、企事业单位行政、心理咨询<br><br>建议：考取教师资格证，提升写作/表达能力，关注教育科技发展趋势。'
    },
    {
        type: '体育健康方向',
        match: [0, 5, 0, 3, 2, 3, 0, 3, 0, 2],
        desc: '推荐专业：休闲体育<br><br>就业方向：体育培训机构、健身俱乐部、学校体育教师、体育赛事运营、健康管理<br><br>建议：考取专业教练认证（ACE/NSCA 等），积累教学经验，关注体育产业创业机会。'
    }
];

let currentQ = 0;
let answers = [];

function initAssessment() {
    currentQ = 0;
    answers = [];
    document.getElementById('result-area').style.display = 'none';
    document.getElementById('question-area').style.display = 'block';
    document.getElementById('question-total').textContent = questions.length;
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQ];
    document.getElementById('question-num').textContent = currentQ + 1;
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('question-options').innerHTML = q.options.map((opt, i) =>
        `<label><input type="radio" name="q" value="${i}" ${answers[currentQ] === i ? 'checked' : ''}> ${opt}</label>`
    ).join('');
    document.getElementById('prev-btn').style.display = currentQ === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').textContent = currentQ === questions.length - 1 ? '查看结果' : '下一题';
}

window.nextQuestion = function () {
    const selected = document.querySelector('input[name="q"]:checked');
    if (!selected) { alert('请选择一个选项'); return; }
    answers[currentQ] = parseInt(selected.value);
    if (currentQ < questions.length - 1) { currentQ++; renderQuestion(); }
    else { showResult(); }
};

window.prevQuestion = function () {
    if (currentQ > 0) { currentQ--; renderQuestion(); }
};

function showResult() {
    let bestMatch = null, bestScore = -1;
    for (const c of careerMap) {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === c.match[i]) score += 2;
            else if (Math.abs(answers[i] - c.match[i]) <= 1) score += 1;
        }
        if (score > bestScore) { bestScore = score; bestMatch = c; }
    }
    document.getElementById('question-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'block';
    document.getElementById('result-content').innerHTML = `
        <h4 style="color:#007A49;font-size:1.2rem">推荐方向：${bestMatch.type}</h4>
        <p style="margin-top:12px">${bestMatch.desc}</p>
        <p style="margin-top:16px;color:#999;font-size:0.85rem">点击导航栏「专业方向」查看更多详情，「学习路径」查看四年规划</p>
    `;
}

window.resetAssessment = function () { initAssessment(); };

// ===================== AI 聊天 =====================
const aiResponses = [
    { keywords: ['就业', '工作', '找工作', '求职', 'offer'], response: '华珠近年毕业生去向落实率超过 96%！找工作建议：1. 大四上开始关注秋招（9-11月），春招（3-5月）也有机会 2. 利用学校就业指导中心资源 3. 多参加校园招聘会和宣讲会 4. 准备好简历和作品集。你想去哪个行业？' },
    { keywords: ['考研', '研究生', '读研', '深造', '学历'], response: '考研建议：1. 大三下开始准备，确定目标院校和专业 2. 华珠学子考研热门方向包括：传媒类（中传、暨大）、设计类（广美、华工）、管理类（中大、华师）3. 也可以考虑出国读研，学校有国际教育学院资源。需要了解某个学校的具体情况吗？' },
    { keywords: ['考公', '公务员', '考编', '事业编', '编制', '公考'], response: '考公考编建议：1. 国考（约10月报名）、省考（约3月报名）2. 提前了解岗位要求，华珠很多专业可报 3. 笔试考行测+申论，面试为结构化 4. 大三暑假开始准备较合适。推荐关注「粉笔」「中公」等备考平台。' },
    { keywords: ['简历', '怎么写', '优化'], response: '华珠学子简历优化要点：1. 突出专业相关实践经历（如传媒同学的作品、设计同学的项目）2. 用 STAR 法则描述实习/项目经历 3. 量化成果，如「参与策划活动覆盖 2000+ 人」4. 排版简洁一页内 5. 针对不同岗位定制不同版本。需要我帮你针对某类岗位分析吗？' },
    { keywords: ['面试', '技巧', '准备', '面经'], response: '面试准备 Checklist：1. 研究公司和岗位要求 2. 准备 1-2 分钟自我介绍 3. 准备好 3-4 个经历故事（STAR 法则）4. 准备 2-3 个反问面试官的问题 5. 着装得体，提前 15 分钟到。华珠每年都有模拟面试活动，建议参加！' },
    { keywords: ['实习', '实践', '经验'], response: '找实习渠道：1. 学校就业网和老师推荐 2. Boss直聘、实习僧、牛客网 3. 华珠校企合作单位 4. 师兄师姐内推。建议大二大三就开始实习，积累经验对毕业找工作很重要。你现在大几了？想找什么方向的实习？' },
    { keywords: ['薪资', '工资', '待遇', '薪酬'], response: '华珠毕业生薪资参考（因专业而异）：传媒类 5-10K，设计类 6-12K，IT 类 8-15K，经管类 5-10K，教育类 4-8K。谈薪资技巧：1. 提前了解市场行情 2. 不要先报数字 3. 考虑总包（薪资+奖金+福利）4. 合理表达自己的价值。' },
    { keywords: ['创业', '副业', '自由职业'], response: '华珠创业支持：学校有乡村振兴学院和大湾区公益学院，提供创业指导。自由职业适合传媒、设计方向的同学。建议：1. 先积累经验和客户 2. 控制初期成本 3. 建立个人品牌（小红书/抖音/B站）4. 准备好 6 个月生活费。有具体的创业想法吗？' },
    { keywords: ['专业', '选择', '迷茫', '不知道'], response: '专业选择建议：华珠 43 个本科专业覆盖传媒、设计、IT、经管、人文、体育六大方向。建议：1. 结合兴趣和能力 2. 了解各专业就业前景 3. 用上面的「专业测评」功能测一测 4. 咨询学长学姐或老师。你目前是什么专业的？' },
    { keywords: ['技能', '学习', '提升', '考证'], response: '大学期间值得考取的证书：1. 通用类：英语四六级、计算机二级、普通话 2. 专业类：传媒（剪辑师证）、设计（Adobe 认证）、IT（华为/思科认证）、经管（初级会计/CMA）3. 教师资格证（多一条路）。建议大二大三考完，大四专心求职考研。' }
];

function getAIResponse(input) {
    const lower = input.toLowerCase();
    for (const item of aiResponses) {
        if (item.keywords.some(k => lower.includes(k))) return item.response;
    }
    return '深度熊为你解答！关于就业、考研、考公、实习、简历、面试等问题都可以问我。也可以告诉我你的专业和年级，我能给更精准的建议 😊';
}

window.sendMessage = function () {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    const container = document.getElementById('chat-messages');

    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user-msg';
    userDiv.innerHTML = `<div class="msg-content">${msg}</div>`;
    container.appendChild(userDiv);

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chat-msg ai-msg';
    loadingDiv.id = 'loading-msg';
    loadingDiv.innerHTML = `<div class="msg-content"><div class="loading"></div></div>`;
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const loading = document.getElementById('loading-msg');
        if (loading) loading.remove();
        const aiDiv = document.createElement('div');
        aiDiv.className = 'chat-msg ai-msg';
        aiDiv.innerHTML = `<div class="msg-content">${getAIResponse(msg)}</div>`;
        container.appendChild(aiDiv);
        container.scrollTop = container.scrollHeight;
    }, 600 + Math.random() * 500);
};

// ===================== 专业方向 =====================
const careersData = [
    { name: '广播电视编导', cat: 'media', tag: '影视传媒', salary: '6-15K', desc: '负责影视节目策划、编剧、拍摄和后期制作。可在电视台、影视公司、新媒体平台从事编导工作。' },
    { name: '播音与主持艺术', cat: 'media', tag: '影视传媒', salary: '6-15K', desc: '从事新闻播音、节目主持、配音解说等工作。可在电视台、广播电台、新媒体平台发展。' },
    { name: '摄影 / 影视摄影与制作', cat: 'media', tag: '影视传媒', salary: '6-18K', desc: '负责各类影视作品拍摄和后期制作。就业于影视公司、广告公司、自媒体平台。' },
    { name: '戏剧影视导演', cat: 'media', tag: '影视传媒', salary: '8-20K', desc: '负责影视作品的艺术创作和现场执导。需具备剧本分析、镜头语言和团队管理能力。' },
    { name: '表演', cat: 'media', tag: '影视传媒', salary: '5-20K', desc: '从事影视剧、舞台剧、短视频等表演工作。需持续提升演技和个人特色。' },
    { name: '产品设计', cat: 'design', tag: '艺术设计', salary: '7-16K', desc: '省重点培育学科。负责产品外观、功能和用户体验设计，就业于设计公司、制造企业、互联网公司。' },
    { name: '环境设计', cat: 'design', tag: '艺术设计', salary: '7-15K', desc: '省一流本科专业。从事室内设计、景观设计、展览设计等，就业于设计院、装饰公司。' },
    { name: '视觉传达设计', cat: 'design', tag: '艺术设计', salary: '6-14K', desc: '负责品牌视觉、广告设计、包装设计、UI 设计等。可在设计公司、互联网企业就业。' },
    { name: '数字媒体艺术', cat: 'design', tag: '艺术设计', salary: '8-18K', desc: '融合艺术与科技，从事游戏设计、交互设计、影视特效、VR/AR 内容开发。' },
    { name: '服装与服饰设计', cat: 'design', tag: '艺术设计', salary: '6-12K', desc: '从事服装设计、面料开发、时尚买手、品牌企划等工作。可在服装企业、时尚行业就业。' },
    { name: '风景园林', cat: 'design', tag: '艺术设计', salary: '6-13K', desc: '从事园林规划设计、景观设计、城市绿化等工作。可在设计院、园林公司就业。' },
    { name: '计算机科学与技术', cat: 'it', tag: '信息技术', salary: '8-20K', desc: '培养程序设计、系统开发、算法分析能力。就业于互联网、金融科技、智能制造等领域。' },
    { name: '人工智能', cat: 'it', tag: '信息技术', salary: '10-25K', desc: '学习机器学习、深度学习、计算机视觉等。可在 AI 企业、互联网大厂从事算法工程师。' },
    { name: '网络工程', cat: 'it', tag: '信息技术', salary: '7-16K', desc: '负责网络规划、网络安全、云计算等。可在通信企业、互联网公司、政府信息化部门就业。' },
    { name: '电子信息工程', cat: 'it', tag: '信息技术', salary: '7-18K', desc: '涉及嵌入式系统、通信技术、电路设计等。可在电子、通信、物联网行业就业。' },
    { name: '电气工程及其自动化', cat: 'it', tag: '信息技术', salary: '7-17K', desc: '从事电力系统、自动化控制、新能源等领域工作。可在电力公司、制造企业就业。' },
    { name: '会计学', cat: 'business', tag: '经济管理', salary: '5-12K', desc: '培养会计核算、审计、税务等能力。可在会计师事务所、企业财务部门、金融机构就业。' },
    { name: '财务管理', cat: 'business', tag: '经济管理', salary: '6-13K', desc: '从事财务分析、预算管理、投资决策等工作。可在企事业单位、投资公司就业。' },
    { name: '人力资源管理', cat: 'business', tag: '经济管理', salary: '5-12K', desc: '省一流本科专业。从事招聘、培训、绩效、薪酬等人力资源管理工作。适合各类企业。' },
    { name: '金融工程', cat: 'business', tag: '经济管理', salary: '8-18K', desc: '运用数学和编程进行金融产品设计、风险管理和量化投资。可在银行、证券、基金公司就业。' },
    { name: '市场营销', cat: 'business', tag: '经济管理', salary: '5-15K', desc: '从事市场调研、品牌推广、营销策划等工作。可在各类企业市场部、广告公司就业。' },
    { name: '电子商务', cat: 'business', tag: '经济管理', salary: '6-14K', desc: '从事电商运营、跨境电商、网络营销、直播电商等。可在电商平台和品牌企业就业。' },
    { name: '汉语言文学', cat: 'humanities', tag: '人文教育', salary: '5-10K', desc: '培养文字功底和人文素养。可从事教育、编辑、文案策划、公务员等工作。' },
    { name: '传播学 / 网络与新媒体', cat: 'humanities', tag: '人文教育', salary: '6-13K', desc: '从事新闻采编、新媒体运营、内容策划、品牌传播等工作。可在媒体和互联网企业就业。' },
    { name: '英语 / 商务英语', cat: 'humanities', tag: '人文教育', salary: '5-12K', desc: '培养英语语言能力和跨文化沟通能力。从事翻译、外贸、教育、跨境电商等工作。' },
    { name: '应用心理学', cat: 'humanities', tag: '人文教育', salary: '5-12K', desc: '从事心理咨询、人力资源测评、用户研究、教育辅导等工作。需考取相关资格证书。' },
    { name: '小学教育', cat: 'humanities', tag: '人文教育', salary: '4-8K', desc: '培养小学教学和管理能力。从事小学教师、教育机构教师、教育行政等工作。' },
    { name: '休闲体育', cat: 'sports', tag: '体育健康', salary: '5-12K', desc: '从事体育教学、健身指导、体育赛事运营、健康管理等工作。可在学校、健身机构、体育公司就业。' }
];

function renderCareers(cat) {
    const list = document.getElementById('career-list');
    const filtered = cat === 'all' ? careersData : careersData.filter(c => c.cat === cat);
    list.innerHTML = filtered.map(c => `
        <div class="career-card">
            <h3>${c.name}</h3>
            <span class="career-tag">${c.tag}</span>
            <p>${c.desc}</p>
            <div class="career-salary">💰 ${c.salary}/月</div>
        </div>
    `).join('');
}

window.filterCareers = function (cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.filter-btn[data-category="${cat}"]`).classList.add('active');
    renderCareers(cat);
};

// ===================== 就业指导 =====================
const resumeData = [
    { title: '华珠学子简历结构建议', content: '<ul><li><strong>个人信息</strong>：姓名 + 电话 + 邮箱 + 求职意向</li><li><strong>教育背景</strong>：华南农业大学珠江学院 + 专业 + 时间 + GPA（如较高）</li><li><strong>实习/项目经历</strong>：2-3 段相关经历，用 STAR 法则描述</li><li><strong>校园实践</strong>：社团、学生会、志愿活动（体现软技能）</li><li><strong>技能证书</strong>：英语四六级、计算机等级、专业证书、软件技能</li><li><strong>作品集链接</strong>：传媒/设计同学必附！</li></ul>' },
    { title: 'STAR 法则运用示例', content: '<p><strong>S（情境）：</strong> 在华珠实践教学基地项目中，团队需为一品牌策划推广方案</p><p><strong>T（任务）：</strong> 我负责市场调研和创意策划</p><p><strong>A（行动）：</strong> 设计并发放 300 份问卷，分析数据后提出 3 个创意方向</p><p><strong>R（结果）：</strong> 方案被采纳，活动覆盖 2000+ 人，品牌曝光提升 40%</p>' },
    { title: '应届生简历常见误区', content: '<ul><li>❌ 一份简历投所有岗位（不针对）</li><li>❌ 只写职责不写成果（缺乏量化）</li><li>❌ 排版花哨/错别字（不专业）</li><li>❌ 堆砌无关经历（抓不住重点）</li><li>❌ 超过一页（HR 只需 10 秒扫读）</li></ul>' }
];

const interviewData = [
    { title: '应届生自我介绍模板', content: '<p>"面试官你好，我叫 XXX，是华南农业大学珠江学院 XXX 专业 20XX 届毕业生。在校期间，我曾在 XXX 公司实习/参与 XXX 项目，主要负责 XXX，取得了 XXX 成果。我对贵公司的 XXX 岗位非常感兴趣，因为我的专业背景和实践经验与岗位要求高度匹配。谢谢！"</p><p><strong>提示：</strong> 控制在 1-2 分钟，突出与岗位最相关的 1-2 段经历。</p>' },
    { title: '应届生高频面试题', content: '<ul><li>请做一下自我介绍</li><li>你为什么选择我们公司？</li><li>你的优势和劣势是什么？</li><li>你遇到过最大的挑战是什么？如何克服的？</li><li>你的职业规划是什么？</li><li>你对薪资的期望是多少？</li></ul><p>建议提前准备答案，用 STAR 法则组织经历故事。</p>' },
    { title: '面试反问建议', content: '<ul><li>这个岗位的日常工作和考核标准是什么？</li><li>团队目前最大的挑战是什么？</li><li>公司对新员工的培训体系是怎样的？</li><li>晋升路径和发展空间如何？</li><li>您希望在候选人身上看到什么特质？</li></ul>' },
    { title: '线上面试注意事项', content: '<ul><li>提前测试网络、摄像头、麦克风、光线</li><li>选择安静无打扰的环境</li><li>背景整洁或使用虚拟背景</li><li>眼神看摄像头，保持微笑和自信</li><li>准备好纸笔记录关键信息</li><li>结束前感谢面试官的时间</li></ul>' }
];

const careerGuideData = [
    { title: '传媒类就业方向', content: '<ul><li>电视台 / 广播电台：编导、记者、主持人、后期制作</li><li>影视公司：导演、摄影、剪辑、编剧、制片</li><li>新媒体/互联网：内容运营、短视频编导、直播运营</li><li>广告/公关公司：策划、创意、媒介执行</li><li>考公：宣传部、文旅局、融媒体中心</li></ul>' },
    { title: '设计类就业方向', content: '<ul><li>设计公司：平面设计、UI/UX 设计、品牌设计</li><li>互联网企业：产品设计、交互设计、视觉设计</li><li>家居/服装企业：产品开发、陈列设计、面料开发</li><li>游戏/影视公司：角色设计、场景设计、特效制作</li><li>自由职业：接单平台、个人工作室、自媒体</li></ul>' },
    { title: 'IT 类就业方向', content: '<ul><li>互联网公司：前后端开发、测试、运维、算法</li><li>通信企业：网络工程师、通信工程师</li><li>金融科技：量化开发、风控系统</li><li>智能制造：嵌入式开发、自动化控制</li><li>考公：公安/国安技术岗、信息化管理中心</li></ul>' },
    { title: '经管类就业方向', content: '<ul><li>会计师事务所：审计、税务、咨询</li><li>银行/证券：客户经理、风控、投资分析</li><li>企业职能：财务、人力、市场、行政</li><li>电商/跨境：运营、选品、供应链管理</li><li>考公：税务局、财政局、统计局</li></ul>' },
    { title: '人文教育类就业方向', content: '<ul><li>学校/教育机构：教师、教务管理、课程研发</li><li>媒体/出版：编辑、记者、文案策划</li><li>企事业单位：行政、文秘、宣传、HR</li><li>政府机关：公务员、事业单位（文字岗）</li><li>心理咨询机构：咨询师助理、用户研究</li></ul>' },
    { title: '体育类就业方向', content: '<ul><li>学校：体育教师、教练</li><li>健身行业：私人教练、团课教练、健身管理</li><li>体育公司：赛事运营、场馆管理、体育营销</li><li>健康管理：健康顾问、康复训练</li><li>考公：体育局、公安特警岗位</li></ul>' }
];

let currentResumeTab = 'resume';

function switchResumeTab(tab) {
    currentResumeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btns = document.querySelectorAll('.tab-btn');
    if (tab === 'resume') { btns[0].classList.add('active'); renderResumeTips(); }
    else if (tab === 'interview') { btns[1].classList.add('active'); renderInterviewTips(); }
    else { btns[2].classList.add('active'); renderCareerGuide(); }
}

function renderResumeTips() {
    document.getElementById('resume-tab-content').innerHTML = '<h3 style="text-align:center;margin-bottom:20px;">简历优化建议</h3>';
    document.getElementById('resume-tips').innerHTML = resumeData.map(d =>
        `<div class="tip-card"><h4>${d.title}</h4>${d.content}</div>`
    ).join('');
}

function renderInterviewTips() {
    document.getElementById('resume-tab-content').innerHTML = '<h3 style="text-align:center;margin-bottom:20px;">面试准备指南</h3>';
    document.getElementById('resume-tips').innerHTML = interviewData.map(d =>
        `<div class="tip-card"><h4>${d.title}</h4>${d.content}</div>`
    ).join('');
}

function renderCareerGuide() {
    document.getElementById('resume-tab-content').innerHTML = '<h3 style="text-align:center;margin-bottom:20px;">各专业群就业方向</h3>';
    document.getElementById('resume-tips').innerHTML = careerGuideData.map(d =>
        `<div class="tip-card"><h4>${d.title}</h4>${d.content}</div>`
    ).join('');
}

// ===================== 学习路径 =====================
const learningPaths = {
    '广播电视编导': ['大一：影视基础理论 + 摄影基础 + 剧本写作入门', '大二：拍摄技术进阶 + 后期剪辑（PR/AE）+ 短片创作实践', '大三：纪录片/剧情片创作 + 影视工业流程 + 实习积累', '大四：毕业作品创作 + 作品集整理 + 求职/考研准备'],
    '播音与主持艺术': ['大一：语音发声基础 + 播音主持概论 + 形体训练', '大二：新闻播音 + 节目主持 + 配音艺术 + 上镜实践', '大三：现场报道 + 大型活动主持 + 新媒体主播技能 + 实习', '大四：毕业汇报演出 + 个人作品集 + 求职/考研准备'],
    '摄影 / 影视摄影与制作': ['大一：摄影基础 + 构图与光影 + PS/LR 基础', '大二：商业摄影 + 影视灯光 + 视频拍摄 + 调色', '大三：专题摄影 + 影视摄影创作 + 纪录片拍摄 + 实习', '大四：毕业作品展 + 作品集整理 + 求职/自由职业'],
    '产品设计': ['大一：设计素描 + 色彩构成 + 设计史 + Rhino 基础', '大二：产品造型设计 + 材料工艺 + 人机工程学 + 3D 打印', '大三：产品系统设计 + 用户研究 + 设计竞赛 + 企业实习', '大四：毕业设计 + 作品集打造 + 求职/考研准备'],
    '环境设计': ['大一：设计基础 + 建筑制图 + CAD + SketchUp', '大二：室内设计 + 景观设计 + 材料与构造 + 3D Max', '大三：专题设计（居住/商业/公共空间）+ BIM 技术 + 实习', '大四：毕业设计 + 作品集整理 + 求职/考研准备'],
    '视觉传达设计': ['大一：平面构成 + 色彩构成 + 字体设计 + PS/AI', '大二：标志设计 + 版式设计 + 包装设计 + 品牌设计', '大三：UI/UX 设计 + 动态设计 + 设计竞赛 + 实习', '大四：毕业设计 + 作品集打磨 + 求职/自由职业'],
    '数字媒体艺术': ['大一：数字媒体概论 + 编程基础 + 设计基础 + PS/AE', '大二：交互设计 + 游戏设计 + 影视特效 + 3D 建模', '大三：VR/AR 开发 + 新媒体艺术 + 跨媒体创作 + 实习', '大四：毕业设计 + 作品集整合 + 求职/考研准备'],
    '计算机科学与技术': ['大一：C 语言 + 高数 + 线性代数 + 计算机导论', '大二：数据结构 + 面向对象编程 + 数据库 + 操作系统', '大三：算法设计 + Web 开发/移动开发 + 项目实战 + 刷题', '大四：毕业设计 + 求职刷题 + 校招准备/考研冲刺'],
    '人工智能': ['大一：Python + 高数 + 概率论 + 线性代数', '大二：机器学习 + 数据挖掘 + 数据库 + 数据结构', '大三：深度学习 + 计算机视觉/NLP + 框架实践 + 竞赛', '大四：毕业设计（AI 应用）+ 求职/考研准备'],
    '网络工程': ['大一：计算机基础 + C 语言 + 网络概论 + 高数', '大二：路由交换技术 + 网络安全 + Linux + 数据库', '大三：网络架构设计 + 云计算 + 华为/思科认证 + 实习', '大四：毕业设计 + 认证考取 + 求职/考研准备'],
    '会计学': ['大一：基础会计 + 经济学 + 管理学 + 高数', '大二：中级财务会计 + 成本会计 + 财务管理 + 税法', '大三：高级会计 + 审计 + CPA 备考 + 企业实习', '大四：毕业设计 + 考证冲刺 + 校招/考研准备'],
    '人力资源管理': ['大一：管理学 + 心理学 + 经济学 + 组织行为学', '大二：招聘与录用 + 培训与开发 + 绩效管理 + 劳动法', '大三：薪酬管理 + 人力资源规划 + HR 实训 + 企业实习', '大四：毕业设计 + 求职准备 + 考证（HR 证书）'],
    '金融工程': ['大一：经济学 + 会计学 + 高数 + 编程基础', '大二：金融学 + 计量经济学 + 金融工具 + Python', '大三：金融衍生品 + 风险管理 + 量化投资 + 金融机构实习', '大四：毕业设计 + CFA/FRM 备考 + 求职/考研准备'],
    '汉语言文学': ['大一：现代汉语 + 古代汉语 + 文学概论 + 写作', '大二：中国古代文学 + 现当代文学 + 外国文学 + 语言学', '大三：比较文学 + 文化研究 + 教育实习/媒体实习', '大四：毕业设计 + 教资备考 + 考公/考研/求职准备'],
    '网络与新媒体': ['大一：传播学概论 + 新闻学 + 新媒体概论 + 写作', '大二：数字媒体技术 + 数据分析 + 短视频创作 + 运营', '大三：新媒体策划 + 品牌传播 + 舆情分析 + 企业实习', '大四：毕业设计 + 作品集 + 求职/考研/考公准备'],
    '英语 / 商务英语': ['大一：英语精读 + 听力 + 口语 + 语法 + 英美文化', '大二：翻译基础 + 商务英语 + 跨文化交际 + 第二外语', '大三：专业方向（翻译/商务/教育）+ 实习 + 专八备考', '大四：毕业设计 + 专八冲刺 + 求职/考研/留学准备'],
    '休闲体育': ['大一：运动解剖学 + 体育概论 + 运动生理学 + 基础训练', '大二：健身指导 + 运动康复 + 体育教学 + 教练认证', '大三：体育赛事管理 + 体育营销 + 专业实训 + 实习', '大四：毕业设计 + 认证考取 + 求职/创业准备'],
    '表演': ['大一：表演基础 + 台词训练 + 形体训练 + 声乐', '大二：角色创作 + 片段排练 + 影视表演 + 舞台实践', '大三：毕业大戏 + 影视拍摄实践 + 经纪签约准备', '大四：毕业演出 + 演员资料卡 + 跑组/求职准备']
};

function initLearningPaths() {
    const select = document.getElementById('career-select');
    select.innerHTML = Object.keys(learningPaths).map(c =>
        `<option value="${c}">${c}</option>`
    ).join('');
}

window.showLearningPath = function () {
    const career = document.getElementById('career-select').value;
    const steps = learningPaths[career];
    const container = document.getElementById('learning-path');
    container.innerHTML = steps.map((step, i) => `
        <div class="path-step">
            <div class="path-step-num">${i + 1}</div>
            <div class="path-step-content">
                <h4>${['大一', '大二', '大三', '大四'][i] || '第 ' + (i + 1) + ' 年'}</h4>
                <p>${step}</p>
            </div>
        </div>
    `).join('');
};

// ===================== 规划报告 =====================
const allMajors = Object.keys(learningPaths).sort();

function initReportForm() {
    const select = document.getElementById('report-major');
    select.innerHTML = '<option value="">请选择你的专业</option>' +
        allMajors.map(m => `<option value="${m}">${m}</option>`).join('');
}

window.generateReport = function () {
    const name = document.getElementById('report-name').value.trim();
    const major = document.getElementById('report-major').value;
    const grade = document.getElementById('report-grade').value;
    const goal = document.getElementById('report-goal').value.trim();
    const skills = document.getElementById('report-skills').value.trim();
    if (!name || !major) { alert('请至少填写姓名并选择专业'); return; }

    const skillList = skills ? skills.split(/[,，]/).map(s => s.trim()).filter(Boolean) : ['待开发'];
    const path = learningPaths[major] || [];

    document.getElementById('report-output').style.display = 'block';
    document.getElementById('report-output').innerHTML = `
        <h3>🐻 ${name} 的职业规划报告</h3>
        <div class="report-section">
            <h4>🎓 个人信息</h4>
            <p><strong>学校：</strong>华南农业大学珠江学院</p>
            <p><strong>专业：</strong>${major}</p>
            <p><strong>年级：</strong>${grade}</p>
            <p><strong>目标职业：</strong>${goal || '待确定'}</p>
        </div>
        <div class="report-section">
            <h4>🛠️ 当前技能</h4>
            <p>${skillList.join('、')}</p>
        </div>
        <div class="report-section">
            <h4>📌 ${grade} 阶段建议</h4>
            ${path[['大一', '大二', '大三', '大四'].indexOf(grade)] ?
                `<p>${path[['大一', '大二', '大三', '大四'].indexOf(grade)]}</p>` :
                '<p>建议结合课程安排和个人兴趣制定学习计划。</p>'}
        </div>
        <div class="report-section">
            <h4>💡 就业建议</h4>
            <ul>
                <li>提前准备简历和作品集，大四上参加秋招</li>
                <li>关注华珠就业网和校园招聘会</li>
                <li>利用校友资源，多与学长学姐交流</li>
                <li>考取专业相关证书，提升竞争力</li>
                <li>如果考研，大三暑假开始系统复习</li>
            </ul>
        </div>
        <div class="report-section">
            <h4>📚 推荐资源</h4>
            <ul>
                <li>求职平台：Boss直聘、牛客网、实习僧</li>
                <li>学习平台：B站、慕课网、Coursera</li>
                <li>考公：粉笔、中公、华图</li>
                <li>考研：目标院校官网、考研帮</li>
            </ul>
        </div>
        <p style="text-align:center;color:#999;margin-top:20px;font-size:0.8rem">深度熊 AI 规划师生成 | 仅供参考</p>
    `;
};

// ===================== 初始化 =====================
renderCareers('all');
initAssessment();
initLearningPaths();
initReportForm();
switchResumeTab('resume');
showLearningPath();
