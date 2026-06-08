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

// ===================== 职业测评 =====================
const questions = [
    { q: '你在团队中通常扮演什么角色？', options: ['领导者，组织协调', '执行者，完成任务', '创意者，提供灵感', '分析者，理性决策'] },
    { q: '你更喜欢哪种工作方式？', options: ['独立完成', '团队协作', '与人沟通', '幕后支持'] },
    { q: '你对以下哪个领域更感兴趣？', options: ['技术与编程', '商业与金融', '医疗与健康', '教育与人文学科', '艺术与创意'] },
    { q: '你如何处理压力？', options: ['制定计划逐步解决', '寻求他人帮助', '暂时放松再处理', '坚持到底不放弃'] },
    { q: '你最看重工作中的什么？', options: ['薪资待遇', '成长空间', '工作氛围', '社会价值'] },
    { q: '你擅长哪种思维方式？', options: ['逻辑推理', '形象思维', '抽象思考', '实践操作'] },
    { q: '你喜欢与什么打交道？', options: ['数据与系统', '人与关系', '文字与知识', '艺术与设计'] },
    { q: '你理想的工作环境是？', options: ['创新自由', '稳定规范', '快节奏挑战', '轻松舒适'] },
    { q: '你最强的技能是什么？', options: ['沟通表达', '分析研究', '组织管理', '技术实操'] },
    { q: '你希望通过工作获得什么？', options: ['专业成就', '财富自由', '社会认可', '个人成长'] }
];

const careerMap = [
    { type: '技术专家', match: [0, 0, 0, 0, 1, 0, 0, 0, 3, 0], desc: '你适合成为软件工程师、数据科学家、DevOps 等技术岗位。推荐深入学习编程语言、系统设计和数据分析。' },
    { type: '产品经理', match: [0, 1, 0, 0, 1, 0, 1, 0, 0, 0], desc: '你适合产品经理、项目经理等岗位。需要培养需求分析、沟通协调和商业思维能力。' },
    { type: '创意设计师', match: [2, 0, 4, 2, 2, 1, 3, 0, 0, 0], desc: '你适合 UI/UX 设计师、平面设计师、品牌策划等创意岗位。建议提升设计工具和审美能力。' },
    { type: '金融分析师', match: [3, 2, 1, 0, 0, 0, 0, 1, 1, 1], desc: '你适合金融分析师、投资顾问、风险管理等岗位。需要学习金融模型和数据分析技能。' },
    { type: '教育工作者', match: [0, 1, 3, 1, 3, 1, 2, 3, 0, 2], desc: '你适合教师、培训师、教育咨询等岗位。需要提升教学设计和沟通表达能力。' },
    { type: '医疗健康专家', match: [1, 0, 2, 3, 3, 3, 1, 1, 2, 0], desc: '你适合医生、护士、健康管理师等岗位。需要系统学习医学知识和临床技能。' },
    { type: '管理领导者', match: [0, 1, 1, 0, 1, 2, 1, 0, 2, 1], desc: '你适合管理层岗位。建议提升领导力、战略规划和团队管理能力。' },
    { type: '创业者', match: [0, 1, 1, 0, 0, 2, 1, 0, 0, 1], desc: '你有创业潜质！适合自主创业或加入初创团队。需要全栈能力和商业嗅觉。' }
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
        <h4 style="color:#667eea;font-size:1.2rem">推荐方向：${bestMatch.type}</h4>
        <p style="margin-top:12px">${bestMatch.desc}</p>
        <p style="margin-top:16px;color:#999;font-size:0.85rem">可点击导航栏查看更多职业细节和学习路线</p>
    `;
}

window.resetAssessment = function () {
    initAssessment();
};

// ===================== AI 聊天 =====================
const aiResponses = [
    { keywords: ['前端', '后端', '全栈', '开发', '程序员', '编程'], response: '对于技术开发方向，建议：1. 打好计算机基础（数据结构、算法、网络）2. 选择一个方向深耕（前端/后端/移动端）3. 多做项目积累经验 4. 关注开源社区。需要我推荐具体的学习路线吗？' },
    { keywords: ['转行', '转岗', '换工作', '跳槽', '转型'], response: '转行建议分三步：1. 自我评估 —— 你的可迁移技能是什么？2. 目标调研 —— 了解目标行业的要求和前景 3. 逐步过渡 —— 先通过兼职/项目积累经验再全职转型。你目前从事什么行业，想转到哪里？' },
    { keywords: ['简历', '怎么写', '优化'], response: '简历优化要点：\n1. 使用 STAR 法则描述经历（情境-任务-行动-结果）\n2. 量化成果，例如"提升效率30%"\n3. 针对岗位定制，不要一份简历投所有\n4. 控制在一页内\n5. 突出关键词通过 ATS 筛选\n需要我帮你分析某个岗位的简历重点吗？' },
    { keywords: ['面试', '准备', '技巧', '面经'], response: '面试准备 checklist：\n1. 研究公司和职位要求\n2. 准备"自我介绍"（1-2分钟）\n3. 准备行为面试题（STAR法则）\n4. 准备2-3个反问问题\n5. 模拟面试练习\n面试当天：提前15分钟，着装得体，自信真诚。' },
    { keywords: ['薪资', '工资', '待遇', 'offer', '谈判'], response: '薪资谈判建议：\n1. 提前了解市场行情（猎聘、Boss直聘、脉脉）\n2. 不要先报数字，让对方出价\n3. 准备合理依据（能力、经验、市场水平）\n4. 考虑总包（薪资+奖金+股票+福利）\n5. 礼貌而坚定，敢于谈但不要贪婪' },
    { keywords: ['考研', '读研', '学历', '学位'], response: '关于考研 vs 就业：\n• 如果目标行业有学历门槛（如金融、科研），考研值得\n• 如果更看重实践（如互联网、设计），工作经验可能更重要\n• 也可以考虑在职研究生或在线课程\n你的目标行业是什么？我帮你具体分析。' },
    { keywords: ['产品经理', 'PM'], response: '产品经理入门路径：\n1. 学习基础：用户体验、需求分析、数据分析\n2. 工具：Axure/Figma、XMind、Jira\n3. 输出作品：撰写 PRD、画原型、做竞品分析\n4. 积累经验：从助理产品经理或相关岗位切入\n5. 推荐书籍：《启示录》《用户体验要素》' },
    { keywords: ['数据', '分析', '科学'], response: '数据科学学习路径：\n1. 编程基础：Python/R\n2. 数据处理：SQL、Pandas\n3. 统计分析：概率论、假设检验\n4. 机器学习：Scikit-learn、TensorFlow\n5. 可视化：Tableau、Matplotlib\n6. 业务理解：将数据转化为商业洞察' },
    { keywords: ['设计', 'UI', 'UX', '视觉'], response: 'UI/UX 设计师成长路径：\n1. 设计基础：色彩、排版、构图\n2. 工具技能：Figma（首选）、Sketch、Adobe XD\n3. 设计系统：组件化思维、设计规范\n4. 用户研究：用户画像、可用性测试\n5. 作品集：3-5个完整项目展示设计流程' },
    { keywords: ['创业', '副业', '自由职业', '独立'], response: '创业/副业建议：\n1. 从解决一个具体问题开始\n2. 先用最小可行产品（MVP）验证需求\n3. 控制成本，不要一开始就All-in\n4. 建立个人品牌和网络\n5. 准备好6个月的生活费作为缓冲\n你有什么具体的创业想法吗？' }
];

function getAIResponse(input) {
    const lower = input.toLowerCase();
    for (const item of aiResponses) {
        if (item.keywords.some(k => lower.includes(k))) return item.response;
    }
    return '感谢你的提问！作为 AI 职业顾问，我建议你先明确自己的兴趣和优势，然后选择一个有前景的方向深耕。你可以试试「职业测评」功能，或者告诉我更多关于你的背景，我能给出更具体的建议 😊';
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
    }, 800 + Math.random() * 600);
};

// ===================== 职业信息 =====================
const careersData = [
    { name: '前端工程师', cat: 'tech', tag: '科技', salary: '15-40K', desc: '负责网站和 Web 应用的用户界面开发，使用 HTML、CSS、JavaScript 及 React/Vue 等框架。' },
    { name: '后端工程师', cat: 'tech', tag: '科技', salary: '18-45K', desc: '负责服务器端逻辑、API 设计、数据库管理，常用语言包括 Java、Go、Python、Node.js。' },
    { name: '数据科学家', cat: 'tech', tag: '科技', salary: '20-50K', desc: '利用统计学和机器学习从数据中提取洞察，支持业务决策。需要 Python、SQL 和数学基础。' },
    { name: '产品经理', cat: 'tech', tag: '科技', salary: '15-40K', desc: '负责产品规划、需求分析、项目管理，连接用户、技术和商业。需要出色的沟通和逻辑能力。' },
    { name: 'UI/UX 设计师', cat: 'tech', tag: '科技', salary: '12-35K', desc: '负责产品界面视觉设计和用户体验优化，使用 Figma、Sketch 等工具，需要设计思维和用户洞察。' },
    { name: '金融分析师', cat: 'finance', tag: '金融', salary: '15-35K', desc: '分析金融市场数据，撰写研究报告，为投资决策提供支持。需要 CFA、财务建模等专业知识。' },
    { name: '投资银行家', cat: 'finance', tag: '金融', salary: '25-60K', desc: '为企业提供融资、并购等金融服务。高压高回报，需要出色的分析和沟通能力。' },
    { name: '风险管理师', cat: 'finance', tag: '金融', salary: '15-35K', desc: '识别和评估金融风险，制定风险控制策略。需要量化分析能力和金融知识。' },
    { name: '医生', cat: 'medical', tag: '医疗', salary: '15-40K', desc: '负责疾病诊断和治疗。需要医学博士学位和执业医师资格，持续学习和临床实践。' },
    { name: '护士', cat: 'medical', tag: '医疗', salary: '8-20K', desc: '负责患者护理、健康教育、医疗协助。需要护理学背景和执业资格。' },
    { name: '健康管理师', cat: 'medical', tag: '医疗', salary: '10-25K', desc: '提供健康评估、慢病管理和健康咨询服务。需要医学营养学或相关背景。' },
    { name: '教师', cat: 'education', tag: '教育', salary: '8-20K', desc: '负责学科教学和学生培养。需要教师资格证，热爱教育事业，有耐心和责任心。' },
    { name: '教育咨询师', cat: 'education', tag: '教育', salary: '10-25K', desc: '为学生提供升学规划、留学咨询、职业指导等服务。需要了解教育体系和市场。' },
    { name: '培训讲师', cat: 'education', tag: '教育', salary: '12-30K', desc: '在企业或培训机构提供专业技能培训。需要扎实的专业知识和出色的表达能力。' },
    { name: '平面设计师', cat: 'art', tag: '艺术', salary: '8-20K', desc: '负责品牌视觉、广告海报、包装等设计工作。需要掌握 PS、AI 等工具和审美能力。' },
    { name: '视频剪辑师', cat: 'art', tag: '艺术', salary: '10-25K', desc: '负责视频内容的剪辑、特效和后期制作。需要 Premiere、AE 等工具技能和叙事能力。' },
    { name: '游戏设计师', cat: 'art', tag: '艺术', salary: '15-35K', desc: '负责游戏玩法设计、关卡设计和世界观构建。需要创意能力和游戏理解。' }
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

// ===================== 简历面试 =====================
const resumeData = [
    { title: '简历结构建议', content: '<ul><li><strong>个人信息</strong>：姓名、电话、邮箱、GitHub/作品链接</li><li><strong>教育背景</strong>：学校、专业、时间、GPA（如果高）</li><li><strong>工作/项目经历</strong>：使用STAR法则，量化成果</li><li><strong>技能清单</strong>：按熟练度分类列出</li><li><strong>其他</strong>：证书、语言、获奖等</li></ul>' },
    { title: 'STAR 法则示例', content: '<p><strong>情境(Situation)：</strong> 电商平台用户留存率下降15%</p><p><strong>任务(Task)：</strong> 负责分析原因并制定优化方案</p><p><strong>行动(Action)：</strong> 分析用户行为数据，设计A/B测试，优化推荐算法</p><p><strong>结果(Result)：</strong> 留存率回升12%，GMV增长8%</p>' },
    { title: '简历常见错误', content: '<ul><li>❌ 一份简历投所有岗位</li><li>❌ 只写职责不写成果</li><li>❌ 排版混乱、有错别字</li><li>❌ 无关信息太多</li><li>❌ 超过一页（应届生尤其注意）</li></ul>' }
];

const interviewData = [
    { title: '自我介绍模板', content: '<p>"面试官好，我叫XXX，毕业于XXX大学XXX专业。我有X年XXX领域经验，曾在XXX公司负责XXX项目，取得了XXX成果。我对贵公司的XXX岗位非常感兴趣，因为我的技能和经验与岗位要求高度匹配。谢谢！"</p><p><strong>提示：</strong>控制在1-2分钟，突出与岗位最相关的经验。</p>' },
    { title: '行为面试高频问题', content: '<ul><li>请分享一次你带领团队解决问题的经历</li><li>你遇到过最大的挑战是什么？如何克服的？</li><li>描述一次与他人发生分歧的经历</li><li>如果重新做一次那个项目，你会怎么改进？</li><li>你的职业规划是什么？</li></ul><p>建议用 STAR 法则准备 4-5 个故事。</p>' },
    { title: '面试反问建议', content: '<ul><li>这个岗位最看重的能力是什么？</li><li>团队目前面临的最大挑战是什么？</li><li>公司对这个岗位的期望是什么样的？</li><li>培训体系和晋升路径是怎样的？</li><li>您在这里工作最享受的是什么？</li></ul>' },
    { title: '线上面试注意事项', content: '<ul><li>提前测试网络、摄像头、麦克风</li><li>选择安静、光线充足的环境</li><li>背景整洁或用虚拟背景</li><li>眼神看摄像头，保持微笑</li><li>准备纸笔做笔记</li></ul>' }
];

function switchResumeTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btns = document.querySelectorAll('.tab-btn');
    if (tab === 'resume') { btns[0].classList.add('active'); renderResumeTips(); }
    else { btns[1].classList.add('active'); renderInterviewTips(); }
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

// ===================== 学习路线 =====================
const learningPaths = {
    '前端工程师': [
        'HTML5 + CSS3 基础：语义化标签、Flex/Grid 布局、响应式设计',
        'JavaScript 核心：ES6+ 语法、DOM 操作、异步编程、闭包/原型链',
        '前端框架：React / Vue 选一个深入学习，理解组件化、状态管理、路由',
        '工程化工具：Webpack/Vite、Git、ESLint、Prettier、包管理',
        '进阶技能：TypeScript、SSR（Next.js/Nuxt）、性能优化、测试',
        '全栈拓展：Node.js 基础、数据库基础、RESTful API 设计'
    ],
    '后端工程师': [
        '编程语言基础：Java/Python/Go 至少精通一门',
        '数据结构和算法：数组、链表、树、图、排序、动态规划',
        '数据库：MySQL 核心（SQL、索引、事务）+ 一种 NoSQL（Redis/MongoDB）',
        'Web 框架：Spring Boot / Django / Gin 熟练掌握',
        '微服务与架构：Docker、Kubernetes、消息队列、RPC',
        '系统设计：高并发、高可用、分布式系统设计'
    ],
    '数据科学家': [
        '数学基础：线性代数、概率论与统计、微积分',
        '编程基础：Python + Pandas + NumPy + Matplotlib',
        'SQL 和数据清洗：复杂查询、ETL 流程、数据可视化',
        '机器学习：监督/非监督学习、特征工程、模型评估、Scikit-learn',
        '深度学习（进阶）：TensorFlow/PyTorch、CNN/RNN/Transformer',
        '业务与沟通：A/B 测试、数据驱动决策、报告撰写'
    ],
    '产品经理': [
        '产品思维：用户需求分析、市场调研、竞品分析、MVP 思维',
        '工具技能：Axure/Figma 原型设计、XMind 思维导图、Jira 项目管理',
        '数据分析：Google Analytics、SQL 基础、A/B 测试、漏斗分析',
        '文档能力：BRD/MRD/PRD 撰写、需求优先级排序',
        '沟通协作：跨部门沟通、项目管理、敏捷开发流程',
        '业务理解：行业知识、商业模式、用户增长策略'
    ],
    'UI/UX 设计师': [
        '设计基础：色彩理论、排版、构图、设计原则',
        '工具掌握：Figma（核心）、Adobe Creative Suite、原型工具',
        '用户研究：用户访谈、问卷调查、可用性测试、用户画像',
        '交互设计：信息架构、用户流程、交互规范、设计系统',
        '视觉设计：品牌视觉、图标设计、动效设计、设计规范文档',
        '作品集：3-5个完整项目展示设计思路和流程'
    ],
    '金融分析师': [
        '金融基础：会计学、公司金融、金融市场、宏观经济',
        '分析工具：Excel 高级功能、Bloomberg/Wind 终端、Python 数据分析',
        '量化技能：统计建模、时间序列分析、风险管理模型',
        '证书准备：CFA / FRM 备考',
        '报告撰写：研究报告、估值模型、投资建议书',
        '行业研究：选择一个行业深耕，建立行业洞察力'
    ]
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
                <h4>第 ${i + 1} 步</h4>
                <p>${step}</p>
            </div>
        </div>
    `).join('');
};

// ===================== 规划报告 =====================
window.generateReport = function () {
    const name = document.getElementById('report-name').value.trim();
    const goal = document.getElementById('report-goal').value.trim();
    const skills = document.getElementById('report-skills').value.trim();
    if (!name || !goal) { alert('请至少填写姓名和目标职业'); return; }

    const skillList = skills ? skills.split(/[,，]/).map(s => s.trim()).filter(Boolean) : ['待开发'];
    const months = ['第1-3个月', '第4-6个月', '第7-12个月'];
    const plans = [
        `学习 ${goal} 的核心基础知识和工具`,
        `完成 2-3 个实战项目，建立作品集`,
        `深入进阶技能，准备面试，寻找机会`
    ];

    document.getElementById('report-output').style.display = 'block';
    document.getElementById('report-output').innerHTML = `
        <h3>📋 ${name} 的职业规划报告</h3>
        <div class="report-section">
            <h4>🎯 目标职业</h4>
            <p>${goal}</p>
        </div>
        <div class="report-section">
            <h4>🛠️ 当前技能</h4>
            <p>${skillList.join('、')}</p>
        </div>
        <div class="report-section">
            <h4>📌 技能差距分析</h4>
            <p>根据目标要求，建议重点提升：${goal} 领域的主流技术栈、项目实战经验、行业相关知识。</p>
        </div>
        <div class="report-section">
            <h4>📅 12个月学习计划</h4>
            ${months.map((m, i) => `<p><strong>${m}：</strong>${plans[i]}</p>`).join('')}
        </div>
        <div class="report-section">
            <h4>📚 推荐学习资源</h4>
            <ul>
                <li>Coursera / Udemy 在线课程</li>
                <li>相关技术文档与博客</li>
                <li>开源项目参与贡献</li>
                <li>行业会议和社区活动</li>
            </ul>
        </div>
        <div class="report-section">
            <h4>💡 建议</h4>
            <ul>
                <li>每周固定时间学习，保持节奏</li>
                <li>多做项目，动手实践比看书更重要</li>
                <li>建立行业人脉，寻找导师</li>
                <li>定期复盘，调整计划</li>
            </ul>
        </div>
        <p style="text-align:center;color:#999;margin-top:20px;font-size:0.8rem">报告由 AI 自动生成，仅供参考</p>
    `;
    window.print
};

// ===================== 初始化 =====================
renderCareers('all');
initAssessment();
initLearningPaths();
switchResumeTab('resume');
showLearningPath();
