const storageKey = "e26-gaokao-english";

const state = JSON.parse(localStorage.getItem(storageKey) || "{}");
state.tasks = state.tasks || {};
state.targetScore = state.targetScore || 125;
state.plan = state.plan || "60";
state.phase = state.phase || "基础回炉";
state.mistakes = state.mistakes || [];
state.draft = state.draft || "";
state.stats = state.stats || {};
state.savedReviews = state.savedReviews || [];
state.practiceIndex = state.practiceIndex || {};
state.mockAnswers = state.mockAnswers || {};
state.mockWriting = state.mockWriting || "";
state.mockWritingByExam = state.mockWritingByExam || {};
state.mockQuestionIndex = state.mockQuestionIndex || 0;
state.calendarDone = state.calendarDone || {};
state.mockAttempts = state.mockAttempts || [];
state.activeMockExamId = state.activeMockExamId || "core";
state.writingPromptId = state.writingPromptId || "";
state.writingChecks = state.writingChecks || {};
state.draftHistory = state.draftHistory || [];
state.activePackId = state.activePackId || "";
state.packDone = state.packDone || {};
state.scoreDone = state.scoreDone || {};
state.weeklyIntensity = state.weeklyIntensity || "75";
state.weeklyDone = state.weeklyDone || {};
state.reviewStatus = state.reviewStatus || {};
state.mistakeFilters = state.mistakeFilters || { type: "all", tag: "all", status: "all" };

const externalContent = window.E26_CONTENT || {};
const contentExpansion = window.E26_EXPANSION || {};

const saveState = () => localStorage.setItem(storageKey, JSON.stringify(state));

const examDate = new Date("2026-06-07T09:00:00+08:00");
const today = new Date();
const msPerDay = 1000 * 60 * 60 * 24;
const daysLeft = Math.max(0, Math.ceil((examDate - today) / msPerDay));

document.getElementById("daysLeft").textContent = daysLeft;

const tasks = [
  {
    id: "reading-ab",
    title: "阅读理解 A/B 篇限时",
    detail: "18 分钟完成，标出定位句和干扰项来源。",
    time: "18m",
  },
  {
    id: "gap-filling",
    title: "七选五逻辑线训练",
    detail: "先看空前空后，再判断代词、转折、递进和概括。",
    time: "12m",
  },
  {
    id: "grammar",
    title: "语法填空非谓语回炉",
    detail: "整理 5 个错误句，写出谓语/非谓语判断理由。",
    time: "15m",
  },
  {
    id: "continuation",
    title: "读后续写动作链",
    detail: "积累 6 个动作表达，并仿写一段 80 词情节推进。",
    time: "20m",
  },
];

const modules = [
  {
    id: "reading",
    no: "01",
    title: "阅读理解",
    text: "训练信息定位、推断判断、主旨归纳和态度识别。核心目标是减少“读懂但选错”。",
    drill: "今天练：细节题定位",
    loss: ["同义替换没识别", "选项偷换范围", "主旨题只看局部"],
    action: "每题写出原文定位句、正确选项改写点、错误选项多余信息。",
  },
  {
    id: "seven",
    no: "02",
    title: "七选五",
    text: "用篇章结构做题，优先处理代词指代、逻辑连接、段落主题和句式复现。",
    drill: "今天练：空前空后",
    loss: ["只凭中文顺眼", "忽略代词指代", "段首句不看结构"],
    action: "先标空格功能：承上、启下、例证、转折或总结，再看关键词复现。",
  },
  {
    id: "cloze",
    no: "03",
    title: "完形填空",
    text: "从情节、情绪、复现和搭配四条线入手，避免只凭单词意思硬选。",
    drill: "今天练：情绪转折",
    loss: ["脱离上下文", "情绪线断裂", "固定搭配不熟"],
    action: "每五空停一次，复述人物状态和事件方向，避免单空硬猜。",
  },
  {
    id: "grammar",
    no: "04",
    title: "语法填空",
    text: "建立谓语动词、非谓语、词性转换、从句连接和冠代介五类检查清单。",
    drill: "今天练：谓语判断",
    loss: ["谓语数量没数", "词性转换凭感觉", "从句连接词混用"],
    action: "先圈谓语，再看关系；动词空必须判断谓语/非谓语/词性转换。",
  },
  {
    id: "practical",
    no: "05",
    title: "应用文",
    text: "覆盖邀请、建议信、通知、申请、感谢、道歉、投稿等高频场景。",
    drill: "今天练：建议信",
    loss: ["要点遗漏", "语气不匹配", "模板痕迹太重"],
    action: "写前列三件事：身份、目的、对方需要的信息；写后查交际任务是否完成。",
  },
  {
    id: "continuation",
    no: "06",
    title: "读后续写",
    text: "围绕冲突、动作、情绪、环境和结尾升华，训练不跑题的情节推进。",
    drill: "今天练：动作描写",
    loss: ["情节跳跃", "人物性格变形", "结尾喊口号"],
    action: "每段至少安排一个动作节点、一个情绪变化、一个原文细节回扣。",
  },
  {
    id: "vocab",
    no: "07",
    title: "词汇短语",
    text: "按主题语境整理高频词块，重点解决阅读识别和写作调用两件事。",
    drill: "今天练：科技主题",
    loss: ["只背中文释义", "写作不会调用", "熟词生义遗漏"],
    action: "词块按主题造句，优先掌握动词搭配和抽象名词表达。",
  },
  {
    id: "listening",
    no: "08",
    title: "听力通用",
    text: "训练场景词、转折词、数字信息和说话人意图，适配全国通用听力能力。",
    drill: "今天练：态度判断",
    loss: ["but 后信息漏听", "数字换算出错", "说话人态度误判"],
    action: "听到转折、比较、否定和时间数字时做标记，答案多在变化处。",
  },
];

const plans = {
  30: [
    ["01", "错题回炉", "只保留高频错因，集中处理反复失分点。"],
    ["02", "套卷节奏", "隔天完成半套或整套，固定阅读和写作时间。"],
    ["03", "写作定型", "应用文场景和续写动作链每天交替训练。"],
    ["04", "考前清单", "回看词块、易错语法和作文可迁移句。"],
  ],
  60: [
    ["01", "基础回炉", "词汇、长难句、语法核心，先补稳定分。"],
    ["02", "题型突破", "阅读、七选五、完形策略，重点记录错因。"],
    ["03", "套卷限时", "节奏、取舍、稳定输出，训练完整考试体验。"],
    ["04", "考前回炉", "错题、作文、易错表达，不再大范围开新题。"],
  ],
  90: [
    ["01", "词汇语法", "主题词块、长难句、核心语法系统补齐。"],
    ["02", "阅读写作", "阅读题型拆解和写作素材同步积累。"],
    ["03", "综合套卷", "每周固定套卷，建立分数和时间曲线。"],
    ["04", "稳定输出", "按考试节奏压缩波动，维护手感。"],
  ],
};

const practiceBank = {
  reading: {
    title: "阅读理解：细节定位",
    time: 10,
    prompt:
      "The school library introduced a quiet-hour policy after students reported that group discussions often interrupted independent reading. According to the policy, the second floor is reserved for silent study from 6 p.m. to 9 p.m.",
    question: "Why did the library introduce the quiet-hour policy?",
    options: ["To extend opening hours", "To protect silent study time", "To encourage group discussions", "To move readers to the first floor"],
    answer: 1,
    explain: "reported interrupted independent reading 对应 protect silent study time。注意选项 C 与原文方向相反。",
  },
  seven: {
    title: "七选五：代词指代",
    time: 8,
    prompt:
      "Many students make a long vocabulary list before an exam. ______ Instead, the words become useful only when they appear in sentences, topics, and real tasks.",
    question: "选择最合适的句子填入空格。",
    options: ["This habit alone does not guarantee active use.", "They should never review words before exams.", "A dictionary is usually expensive.", "The exam will certainly become easier."],
    answer: 0,
    explain: "This habit 指代 make a long vocabulary list，后文 Instead 转向说明单纯列表不够。",
  },
  cloze: {
    title: "完形填空：情绪转折",
    time: 8,
    prompt:
      "I thought my speech had failed when I forgot the next line. But when I looked up, my classmates were smiling, waiting patiently. Their kindness made me feel ______ enough to continue.",
    question: "选择最符合语境的词。",
    options: ["ashamed", "brave", "sleepy", "doubtful"],
    answer: 1,
    explain: "But 后出现 smiling, waiting patiently，情绪由紧张转向被支持，所以 brave enough to continue 最合适。",
  },
  grammar: {
    title: "语法填空：非谓语",
    time: 8,
    prompt:
      "The project, ______ (design) to help teenagers read more, has attracted many volunteers from local universities.",
    question: "填入括号内单词的正确形式。",
    options: ["designed", "designing", "was designed", "to design"],
    answer: 0,
    explain: "句子已有谓语 has attracted，空格作后置定语，project 与 design 是被动关系，用 designed。",
  },
  practical: {
    title: "应用文：建议信",
    time: 12,
    prompt:
      "你的英国朋友 Alex 想提高中文学习效率，请你写一封邮件给出建议。",
    question: "哪一项最适合作为主体段建议？",
    options: ["I am writing to say hello to you.", "You can keep a daily speaking log and review useful expressions every weekend.", "Chinese is very interesting.", "I hope everything goes well."],
    answer: 1,
    explain: "主体段需要具体、可执行的建议。B 同时包含方法和频率，信息密度更高。",
  },
  continuation: {
    title: "读后续写：动作链",
    time: 12,
    prompt:
      "原文情境：男孩在比赛前弄丢了接力棒，队友们沉默地看着他。",
    question: "哪一句更适合作为续写动作推进？",
    options: ["He was very sad and nervous.", "The weather was good that day.", "He bent down, searched under the bench, and suddenly froze at the sight of a silver corner.", "Everyone should be kind."],
    answer: 2,
    explain: "续写要用动作推进情节。C 有连续动作和新发现，可以自然引出下一步。",
  },
  vocab: {
    title: "词汇短语：主题调用",
    time: 6,
    prompt:
      "主题：校园志愿活动。目标：把中文“增强责任感”写成自然表达。",
    question: "选择最合适的表达。",
    options: ["raise responsibility", "develop a sense of responsibility", "make responsibility bigger", "open responsibility"],
    answer: 1,
    explain: "a sense of responsibility 是自然搭配，develop 表示培养、增强。",
  },
  listening: {
    title: "听力通用：态度判断",
    time: 6,
    prompt:
      "Woman: I was worried about the new schedule at first, but it actually gives me more time to review after class.",
    question: "What is the woman's attitude toward the new schedule now?",
    options: ["Negative", "Supportive", "Uncertain", "Angry"],
    answer: 1,
    explain: "at first 表示过去担心，but 后才是现在态度：gives me more time，偏支持。",
  },
};

const practiceSets = {
  reading: [
    practiceBank.reading,
    {
      title: "阅读理解：推断判断",
      time: 10,
      prompt:
        "When the community garden opened, Mr. Lee visited every morning. He did not plant many vegetables himself. Instead, he repaired tools, watered new seedlings, and taught children how to read the weather before planting.",
      question: "What can we infer about Mr. Lee?",
      options: ["He dislikes gardening.", "He contributes mainly by supporting others.", "He visits only because he is required to.", "He wants to sell vegetables."],
      answer: 1,
      explain: "没有直接说 helpful，但 repaired tools, watered seedlings, taught children 都指向支持他人。",
    },
    {
      title: "阅读理解：作者态度",
      time: 10,
      prompt:
        "The new reading app is not perfect, but it has made books easier to reach for students who live far from libraries. Its best feature is not the colorful badges, but the simple way it connects readers with suitable texts.",
      question: "What is the author's attitude toward the app?",
      options: ["Generally positive", "Completely negative", "Uninterested", "Confused"],
      answer: 0,
      explain: "not perfect 有保留，但 made books easier 和 best feature 表明总体肯定。",
    },
  ],
  seven: [
    practiceBank.seven,
    {
      title: "七选五：转折关系",
      time: 8,
      prompt:
        "Some students believe that taking notes means writing down every word. ______ Good notes should record key ideas, examples, and questions for later review.",
      question: "选择最合适的句子填入空格。",
      options: ["However, this often makes review harder.", "For example, notebooks can be colorful.", "Therefore, every word is equally important.", "Books are usually kept on shelves."],
      answer: 0,
      explain: "前句是误区，后句给正确做法，中间需要 However 转折。",
    },
    {
      title: "七选五：主题概括",
      time: 8,
      prompt:
        "______. It helps you notice progress, find repeated mistakes, and decide what to practise next. Even a short weekly review can make learning more focused.",
      question: "选择最合适的主题句。",
      options: ["Reflection is a powerful learning habit.", "Exercise can keep people healthy.", "Many exams include reading tasks.", "Teachers often use blackboards."],
      answer: 0,
      explain: "后文 progress, mistakes, practise next, weekly review 都围绕 reflection 展开。",
    },
  ],
  cloze: [
    practiceBank.cloze,
    {
      title: "完形填空：复现线索",
      time: 8,
      prompt:
        "The old camera looked ordinary, but the photos it took were full of warmth. Years later, I realized the real ______ was not the camera itself, but the moments it helped us keep.",
      question: "选择最符合语境的词。",
      options: ["treasure", "problem", "noise", "schedule"],
      answer: 0,
      explain: "warmth 和 moments it helped us keep 指向珍贵记忆，treasure 最贴合。",
    },
    {
      title: "完形填空：搭配判断",
      time: 8,
      prompt:
        "Instead of giving up, she decided to ______ a plan and practise a little every day until the performance.",
      question: "选择最自然的搭配。",
      options: ["make", "catch", "break", "lift"],
      answer: 0,
      explain: "make a plan 是固定搭配，后文 practise every day 与制定计划一致。",
    },
  ],
  grammar: [
    practiceBank.grammar,
    {
      title: "语法填空：谓语时态",
      time: 8,
      prompt:
        "In the past three years, the club ______ (organize) more than twenty reading activities for local children.",
      question: "填入括号内单词的正确形式。",
      options: ["organized", "has organized", "organizing", "was organizing"],
      answer: 1,
      explain: "In the past three years 常与现在完成时连用，主语 the club 用 has organized。",
    },
    {
      title: "语法填空：词性转换",
      time: 8,
      prompt:
        "The teacher's patient explanation made the difficult problem much ______ (clear).",
      question: "填入括号内单词的正确形式。",
      options: ["clear", "clearly", "clearness", "cleared"],
      answer: 0,
      explain: "make + 宾语 + 形容词作宾补，much 修饰比较或程度，这里 clear 作形容词。",
    },
  ],
  practical: [
    practiceBank.practical,
    {
      title: "应用文：邀请信",
      time: 12,
      prompt:
        "你校将举办英语戏剧节，请你邀请外教参加并担任点评嘉宾。",
      question: "哪一句最适合说明邀请目的？",
      options: ["I am writing to invite you to our English Drama Festival as a guest judge.", "Drama is very good.", "I have not seen you for a long time.", "Please do your homework carefully."],
      answer: 0,
      explain: "邀请信开头要说清活动和身份，A 信息完整且语气自然。",
    },
    {
      title: "应用文：通知",
      time: 12,
      prompt:
        "学校英语社要发布一次读书分享会通知。",
      question: "哪一项最应该出现在通知主体？",
      options: ["Time, place, topic and participants", "Only the writer's feelings", "A long description of the weather", "Unrelated travel advice"],
      answer: 0,
      explain: "通知强调必要信息，时间、地点、主题和对象必须清楚。",
    },
  ],
  continuation: [
    practiceBank.continuation,
    {
      title: "读后续写：情绪外显",
      time: 12,
      prompt:
        "人物得知自己被误解，但不能立刻解释。",
      question: "哪一句更适合表现克制的委屈？",
      options: ["He was sad.", "He lowered his eyes, pressed his lips together, and folded the note in silence.", "Everyone knows life is difficult.", "The room was a room."],
      answer: 1,
      explain: "B 用动作表现情绪，比直接写 sad 更有画面，也能继续推进情节。",
    },
    {
      title: "读后续写：结尾回扣",
      time: 12,
      prompt:
        "故事主题是陌生人的善意让主角重新鼓起勇气。",
      question: "哪一句更适合作为结尾？",
      options: ["He decided that math was important.", "The small act of kindness became the light he carried into the next race.", "The weather changed quickly.", "He bought a new bag."],
      answer: 1,
      explain: "B 回扣 kindness 和 courage，兼顾主题升华与情节延续。",
    },
  ],
  vocab: [
    practiceBank.vocab,
    {
      title: "词汇短语：环保主题",
      time: 6,
      prompt:
        "主题：保护环境。目标：表达“提高公众意识”。",
      question: "选择最自然的表达。",
      options: ["raise public awareness", "rise people aware", "make public awake", "open the awareness"],
      answer: 0,
      explain: "raise public awareness 是环保、健康、社会议题中常用表达。",
    },
    {
      title: "词汇短语：个人成长",
      time: 6,
      prompt:
        "主题：克服困难。目标：表达“把压力变成动力”。",
      question: "选择最自然的表达。",
      options: ["turn pressure into motivation", "change press to move", "make stress a motor", "put pressure into walking"],
      answer: 0,
      explain: "turn A into B 表示把 A 转化为 B，motivation 是自然搭配。",
    },
  ],
  listening: [
    practiceBank.listening,
    {
      title: "听力通用：转折词",
      time: 6,
      prompt:
        "Man: I planned to take the bus, but the subway turned out to be faster and less crowded.",
      question: "How did the man probably travel?",
      options: ["By bus", "By subway", "By bike", "On foot"],
      answer: 1,
      explain: "but 后面是实际选择的关键信息：the subway turned out to be faster。",
    },
    {
      title: "听力通用：数字信息",
      time: 6,
      prompt:
        "Woman: The talk was supposed to start at 2:30, but it has been put off for twenty minutes.",
      question: "When will the talk start?",
      options: ["2:10", "2:30", "2:50", "3:20"],
      answer: 2,
      explain: "2:30 推迟 20 分钟，是 2:50。",
    },
  ],
};

const extraPractice = {
  reading: [
    {
      title: "阅读理解：词义猜测",
      time: 10,
      prompt:
        "The training was demanding. After three hours of repeated practice, most players looked exhausted, but no one asked to stop.",
      question: "What does the underlined word 'demanding' probably mean?",
      options: ["Requiring much effort", "Easy to finish", "Full of jokes", "Badly organized"],
      answer: 0,
      explain: "后文 repeated practice, exhausted, no one asked to stop 都说明训练强度大。",
    },
    {
      title: "阅读理解：写作意图",
      time: 10,
      prompt:
        "This guide explains how to prepare a simple emergency kit at home, including water, basic medicine, a flashlight, and important phone numbers.",
      question: "What is the author's main purpose?",
      options: ["To tell a story", "To give practical instructions", "To compare two cities", "To review a novel"],
      answer: 1,
      explain: "guide, how to prepare 和具体物品清单表明作者在给实用说明。",
    },
  ],
  seven: [
    {
      title: "七选五：例证关系",
      time: 8,
      prompt:
        "Small changes can improve your study routine. ______ You may place your phone in another room or prepare your books before dinner.",
      question: "选择最合适的句子填入空格。",
      options: ["For example, remove one distraction before you start.", "However, routines are always useless.", "Nobody likes making changes.", "Books are made of paper."],
      answer: 0,
      explain: "后句列举具体做法，因此空格应引出例子。",
    },
    {
      title: "七选五：总结句",
      time: 8,
      prompt:
        "Read the question first, locate the key sentence, and compare every option carefully. ______",
      question: "选择最适合作为结尾总结的句子。",
      options: ["This process turns reading into evidence checking.", "The library closes at six.", "Some stories are funny.", "Food can provide energy."],
      answer: 0,
      explain: "前文是做阅读题流程，A 对流程进行概括。",
    },
  ],
  cloze: [
    {
      title: "完形填空：动作线索",
      time: 8,
      prompt:
        "Seeing the old man struggle with the heavy box, Lily put down her bag and ______ across the street to help.",
      question: "选择最符合语境的词。",
      options: ["hurried", "slept", "argued", "disappeared"],
      answer: 0,
      explain: "put down her bag 和 to help 表明她快速过去帮忙。",
    },
    {
      title: "完形填空：前后呼应",
      time: 8,
      prompt:
        "At first the room was silent. Then one student began to clap, and soon the silence was replaced by warm ______.",
      question: "选择最符合语境的词。",
      options: ["applause", "snow", "homework", "traffic"],
      answer: 0,
      explain: "clap 与 applause 前后呼应，warm 也符合掌声氛围。",
    },
  ],
  grammar: [
    {
      title: "语法填空：定语从句",
      time: 8,
      prompt:
        "The book ______ I borrowed from the school library has many useful writing examples.",
      question: "选择合适的关系词。",
      options: ["which", "where", "when", "why"],
      answer: 0,
      explain: "先行词 book 指物，关系词在从句中作 borrowed 的宾语，用 which/that。",
    },
    {
      title: "语法填空：冠词",
      time: 8,
      prompt:
        "Keeping a diary is ______ useful way to record small progress in language learning.",
      question: "填入最合适的词。",
      options: ["a", "an", "the", "/"],
      answer: 0,
      explain: "useful 发音以辅音音素 /j/ 开头，且 way 是可数名词单数，用 a。",
    },
  ],
  practical: [
    {
      title: "应用文：感谢信",
      time: 12,
      prompt:
        "外教帮助你修改演讲稿，请写邮件表达感谢。",
      question: "哪一句最具体有效？",
      options: ["Thank you for helping me improve the structure and examples in my speech.", "Thank you very much for everything.", "I am fine.", "Speech is important."],
      answer: 0,
      explain: "感谢信要具体说明对方做了什么、带来什么帮助。",
    },
    {
      title: "应用文：投稿短文",
      time: 12,
      prompt:
        "校英文报征文：一次难忘的志愿活动。",
      question: "哪一项最适合作为文章主体展开？",
      options: ["What you did, what you learned, and why it mattered", "Only the date", "A list of unrelated words", "A complaint about exams"],
      answer: 0,
      explain: "投稿类短文要围绕经历、收获和意义展开。",
    },
  ],
  continuation: [
    {
      title: "读后续写：冲突升级",
      time: 12,
      prompt:
        "原文：女孩终于找到迷路的小狗，但暴雨突然下大。",
      question: "哪一句最能推进冲突？",
      options: ["She held the dog close, only to find the bridge ahead blocked by rising water.", "The dog was cute.", "Rain is water from the sky.", "She liked sunny days."],
      answer: 0,
      explain: "A 既承接找到小狗，又制造新的障碍。",
    },
    {
      title: "读后续写：原文回扣",
      time: 12,
      prompt:
        "原文多次提到爷爷送给主角的旧指南针。",
      question: "续写中哪一句最适合回扣这个细节？",
      options: ["His fingers touched the old compass in his pocket, and he suddenly remembered Grandpa's words.", "He bought a sandwich.", "The road was very road.", "Everyone was busy."],
      answer: 0,
      explain: "旧指南针是原文线索，回扣后能自然推动人物行动。",
    },
  ],
  vocab: [
    {
      title: "词汇短语：文化主题",
      time: 6,
      prompt:
        "主题：传统文化活动。目标：表达“拓宽视野”。",
      question: "选择最自然的表达。",
      options: ["broaden one's horizons", "wide one's eyes", "large the view", "open a horizon"],
      answer: 0,
      explain: "broaden one's horizons 是表达开阔眼界、拓宽视野的常用词块。",
    },
    {
      title: "词汇短语：社会参与",
      time: 6,
      prompt:
        "主题：公益活动。目标：表达“产生积极影响”。",
      question: "选择最自然的表达。",
      options: ["make a positive difference", "do a different thing", "create different", "be difference"],
      answer: 0,
      explain: "make a difference 表示产生影响，加 positive 更贴合公益语境。",
    },
  ],
  listening: [
    {
      title: "听力通用：地点推断",
      time: 6,
      prompt:
        "Man: Could you tell me where I can find books on modern history? Woman: They are on the third shelf next to the reading area.",
      question: "Where does the conversation probably take place?",
      options: ["In a library", "At an airport", "In a restaurant", "At a hospital"],
      answer: 0,
      explain: "books, shelf, reading area 都指向图书馆场景。",
    },
    {
      title: "听力通用：意图判断",
      time: 6,
      prompt:
        "Woman: I really appreciate your notes. They helped me understand the lecture much better.",
      question: "What is the woman doing?",
      options: ["Expressing thanks", "Making a complaint", "Giving directions", "Ordering food"],
      answer: 0,
      explain: "appreciate 和 helped me 是感谢语境。",
    },
  ],
};

Object.entries(extraPractice).forEach(([type, items]) => {
  practiceSets[type].push(...items);
});

[externalContent.practiceExpansion, contentExpansion.practiceExpansion].filter(Boolean).forEach((source) => {
  Object.entries(source).forEach(([type, items]) => {
    if (!practiceSets[type]) {
      return;
    }
    practiceSets[type].push(...items);
  });
});

const writing = {
  practical: {
    title: "应用文：三段式但不模板腔",
    intro: "先明确交际目的，再匹配语气和信息密度。高分关键不是长句堆砌，而是任务完整、表达自然、衔接清楚。",
    points: ["开头一句说明身份和目的。", "主体用 2-3 个要点展开，避免空泛建议。", "结尾给出期待、感谢或下一步行动。"],
  },
  continuation: {
    title: "读后续写：动作推动情节",
    intro: "续写先不急着写漂亮句，先画出人物目标、障碍、情绪变化和结尾方向。每一段至少有一个动作节点推动剧情。",
    points: ["第一段承接原文冲突，写清人物当下反应。", "用动作和环境暗示情绪，不只写 happy 或 nervous。", "结尾回扣主题，避免突然喊口号。"],
  },
};

const vocab = [
  "take responsibility for",
  "make steady progress",
  "be exposed to",
  "a sense of achievement",
  "overcome difficulties",
  "raise public awareness",
  "strike a balance",
  "broaden one's horizons",
  "be deeply impressed by",
  "make a difference",
  "with joint efforts",
  "attach importance to",
  "develop a sense of responsibility",
  "turn pressure into motivation",
  "adapt to a changing environment",
];

vocab.push(...(externalContent.vocabExtra || []), ...(contentExpansion.vocabExtra || []));

const defaultMistakes = [
  {
    title: "阅读：定位句看到了但没比较选项",
    text: "回炉动作：把正确选项和原文同义替换标出来，再写出错误选项多了什么或少了什么。",
  },
  {
    title: "语法：动词空直接填过去式",
    text: "回炉动作：先找句子谓语数量，再判断从句和非谓语，最后考虑时态语态。",
  },
  {
    title: "续写：情节跳太快",
    text: "回炉动作：每段至少补一个动作、一个情绪变化、一个和原文有关的细节。",
  },
];

const libraryContent = {
  checklist: [
    {
      title: "阅读最后检查",
      tag: "Reading",
      items: ["细节题必须回到定位句，不用常识补题。", "推断题找暗示，不选原文完全没支撑的发挥。", "主旨题看首尾段、转折后和反复出现的关键词。"],
    },
    {
      title: "写作最后检查",
      tag: "Writing",
      items: ["应用文先看任务对象和交际目的。", "续写人物性格不能突然变化。", "每段结尾要自然推进，不要突然升华。"],
    },
    {
      title: "语法最后检查",
      tag: "Grammar",
      items: ["动词空先数谓语，再判断非谓语。", "名词空注意单复数、所有格和限定词。", "从句空看缺不缺成分，再选连接词。"],
    },
  ],
  writing: [
    {
      title: "应用文高频开头",
      tag: "Practical",
      items: ["I am writing to invite you to...", "I would like to offer some practical suggestions.", "Knowing that you are interested in..., I am delighted to share..."],
    },
    {
      title: "读后续写动作链",
      tag: "Continuation",
      items: ["lowered his eyes and took a deep breath", "rushed forward before anyone could stop her", "held the note tightly, unable to say a word"],
    },
    {
      title: "情绪不直说",
      tag: "Emotion",
      items: ["Her voice trembled slightly.", "A smile spread across his face.", "He stood frozen, his mind going blank."],
    },
  ],
  grammar: [
    {
      title: "非谓语三步",
      tag: "Verb",
      items: ["句子已有谓语，空格多半考虑非谓语。", "主动关系用 doing，被动关系用 done。", "目的、将来或序数词后常看 to do。"],
    },
    {
      title: "词性转换清单",
      tag: "Word Form",
      items: ["修饰名词多用形容词。", "修饰动词、形容词或整句多用副词。", "介词后优先考虑名词或动名词。"],
    },
    {
      title: "从句连接词",
      tag: "Clause",
      items: ["缺主语/宾语看 what, who, which。", "不缺成分看 that, whether, if。", "时间地点原因方式看 when, where, why, how。"],
    },
  ],
  timeline: [
    {
      title: "建议时间分配",
      tag: "Timing",
      items: ["阅读和七选五控制在 35-40 分钟。", "语言运用控制在 20 分钟左右。", "写作至少留出 35-40 分钟，含审题和检查。"],
    },
    {
      title: "遇到卡题",
      tag: "Strategy",
      items: ["阅读单题超过 2 分钟先标记跳过。", "完形不确定时先保留语境线索，回头再选。", "作文不会高级表达时，用准确简单句保任务完成。"],
    },
    {
      title: "考前 10 分钟",
      tag: "Before Exam",
      items: ["只看错题标签和作文清单，不开新题。", "默想应用文开头、结尾和续写动作链。", "提醒自己：定位、比较、复述错因。"],
    },
  ],
};

[externalContent.libraryExtra, contentExpansion.libraryExtra].filter(Boolean).forEach((source) => {
  Object.entries(source).forEach(([category, cards]) => {
    if (!libraryContent[category]) {
      return;
    }
    libraryContent[category].push(...cards);
  });
});

const prescriptionPacks = externalContent.prescriptionPacks || [
  {
    id: "listening-turn",
    tag: "Listening",
    title: "听力转折与数字",
    minutes: 24,
    practiceType: "listening",
    goal: "把 but, however, actually, not really 后面的变化信息听准，减少数字换算和态度误判。",
    tasks: [
      { id: "scene", title: "听前预测场景", detail: "先看题干中的地点、人物关系、时间数字，写下可能出现的同义表达。" },
      { id: "signal", title: "抓转折信号", detail: "每听到转折、否定、比较、价格或时间变化，就在草稿纸上打一个小标记。" },
      { id: "convert", title: "复核数字变化", detail: "对 half price, ten minutes later, another two dollars 这类信息做二次换算。" },
      { id: "review", title: "复述错因", detail: "错题只写一句话：我漏听了哪个信号词，选项如何偷换了信息。" },
    ],
    evidence: ["转折后信息常是答案落点", "数字题容易考变化而非原始数字", "态度题优先听语气和评价词"],
    output: "产出：3 条听力错因标签 + 1 组信号词清单",
  },
  {
    id: "reading-evidence",
    tag: "Reading",
    title: "阅读定位与选项改写",
    minutes: 28,
    practiceType: "reading",
    goal: "把“看懂原文但选错”拆成定位、比对、排除三个动作，训练证据意识。",
    tasks: [
      { id: "locate", title: "定位证据句", detail: "每题必须圈出原文证据句，主旨题至少圈出首尾段和反复词。" },
      { id: "rewrite", title: "标同义改写", detail: "把正确选项和原文对应词写在同一行，特别关注动词和范围词。" },
      { id: "trap", title: "拆干扰项", detail: "给错误选项贴标签：无中生有、范围扩大、因果倒置、情感过度。" },
      { id: "retell", title: "30 秒复述", detail: "合上原文，用一句英文复述段落中心，检验是否真的抓住主线。" },
    ],
    evidence: ["细节题答案必须回到证据句", "正确选项多是同义改写", "错误选项常多一层推断或少一个限定"],
    output: "产出：一张阅读证据表 + 2 个干扰项标签",
  },
  {
    id: "grammar-verb",
    tag: "Grammar",
    title: "语法动词空急救",
    minutes: 20,
    practiceType: "grammar",
    goal: "先数谓语，再判关系，最后看时态语态，避免动词空凭感觉填。",
    tasks: [
      { id: "predicate", title: "先数谓语", detail: "找出句子主干，看已有几个谓语动词，判断空格是否可能是非谓语。" },
      { id: "relation", title: "判主被动", detail: "看空格逻辑主语和动词之间是主动、被动还是目的关系。" },
      { id: "clause", title: "看连接词", detail: "如果有从句连接词，先判断从句缺不缺成分，再决定关系词或连词。" },
      { id: "wrong", title: "改写错句", detail: "把错题改成一个新句子，保留同一语法点但换掉主题词。" },
    ],
    evidence: ["动词空不是先看中文意思", "一个简单句通常只能有一个谓语核心", "非谓语先看逻辑关系"],
    output: "产出：5 个动词空判断理由",
  },
  {
    id: "writing-action",
    tag: "Writing",
    title: "续写动作链补强",
    minutes: 26,
    practiceType: "continuation",
    goal: "用动作推动情节，用细节承接原文，避免续写变成情绪口号或剧情跳跃。",
    tasks: [
      { id: "conflict", title: "写清冲突", detail: "用一句话说明人物此刻想要什么、被什么阻碍。" },
      { id: "action", title: "列三步动作", detail: "写出看见、停顿、尝试、失败、发现、回应等连续动作。" },
      { id: "emotion", title: "情绪不直说", detail: "把 happy, nervous, moved 改成动作、表情或身体反应。" },
      { id: "echo", title: "回扣原文细节", detail: "结尾必须回收原文的一个物件、承诺、比赛目标或人物关系。" },
    ],
    evidence: ["续写评分看情节合理和语言协同", "每段至少有一个可视化动作", "结尾升华要从故事里长出来"],
    output: "产出：一条 6 句动作链 + 1 个自然结尾",
  },
];

const scoreSections = [
  {
    id: "listening",
    title: "听力",
    max: 30,
    practiceType: "listening",
    focus: "先保场景、数字、转折和态度题，听不清时不要用常识补答案。",
  },
  {
    id: "reading",
    title: "阅读与七选五",
    max: 50,
    practiceType: "reading",
    focus: "把细节定位和选项比对做稳，主旨题看结构而不是只凭某一句话。",
  },
  {
    id: "language",
    title: "语言运用",
    max: 30,
    practiceType: "grammar",
    focus: "完形看情绪和复现，语法填空先数谓语再判断非谓语或词性转换。",
  },
  {
    id: "writing",
    title: "写作",
    max: 40,
    practiceType: "continuation",
    focus: "应用文保任务完整，续写保情节合理、动作推进和结尾自然回扣。",
  },
];

const scoreActions = [
  { id: "budget", title: "写下本周失分预算", detail: "只允许 1-2 个主攻题型大幅波动，其余题型按保守目标执行。" },
  { id: "evidence", title: "每道错题保留证据", detail: "阅读写定位句，语法写判断理由，写作写遗漏要点，听力写漏听信号。" },
  { id: "timing", title: "固定时间上限", detail: "阅读卡题先标记，作文至少预留 35 分钟，不把后半卷交给运气。" },
  { id: "output", title: "每天留一个可见产出", detail: "可以是一张证据表、5 个动词空理由、1 段续写动作链或 1 篇应用文草稿。" },
];

const errorTags = [
  { id: "evidence", label: "定位证据", type: "reading", action: "回到原文证据句，标出正确选项的同义改写。" },
  { id: "scope", label: "范围偷换", type: "reading", action: "比较选项中的 all, only, never, mainly 等范围词。" },
  { id: "logic", label: "逻辑断裂", type: "seven", action: "先判断空格功能：承上、启下、转折、例证或总结。" },
  { id: "context", label: "语境线索", type: "cloze", action: "复述人物状态和事件方向，再回看空格前后五句。" },
  { id: "predicate", label: "谓语判断", type: "grammar", action: "先数谓语动词，再判定动词空是谓语还是非谓语。" },
  { id: "wordform", label: "词性转换", type: "grammar", action: "看空格修饰对象，确定名词、形容词、副词或动名词。" },
  { id: "task", label: "任务要点", type: "practical", action: "写前圈出对象、目的、必要信息，写后逐项核对。" },
  { id: "tone", label: "语气文体", type: "practical", action: "判断是邀请、建议、通知、申请还是道歉，先定语气再写内容。" },
  { id: "specific-info", label: "信息空泛", type: "practical", action: "把泛泛表达改成时间、地点、动作、频率或补救办法。" },
  { id: "plot", label: "情节跳跃", type: "continuation", action: "补一个动作节点、一个情绪变化和一个原文细节回扣。" },
  { id: "source", label: "原文回扣", type: "continuation", action: "从原文最后一段找物件、承诺、冲突或人物关系作为续写锚点。" },
  { id: "action-chain", label: "动作链不足", type: "continuation", action: "用连续动作推动情节，不只写人物感受或主题句。" },
  { id: "collocation", label: "搭配不准", type: "vocab", action: "把词块放进完整句子，重点检查动词和抽象名词搭配。" },
  { id: "signal", label: "漏听信号", type: "listening", action: "重听转折、否定、比较、时间和数字变化处。" },
];

const defaultErrorTagsByType = {
  reading: ["evidence", "scope"],
  seven: ["logic"],
  cloze: ["context"],
  grammar: ["predicate", "wordform"],
  practical: ["task", "tone"],
  continuation: ["plot", "source"],
  vocab: ["collocation"],
  listening: ["signal"],
};

const weeklyTemplates = {
  reading: {
    title: "阅读证据日",
    mission: "把每一道阅读题都落实到证据句和选项改写。",
    tasks: ["限时阅读 2 篇，圈出定位句", "给 3 个干扰项贴错因标签", "复述 1 段文章主线"],
    output: "一张阅读证据表",
  },
  seven: {
    title: "七选五逻辑日",
    mission: "训练空格功能判断，减少只凭语感选句。",
    tasks: ["完成 2 组七选五", "标注承上、启下、转折、总结", "整理 5 个复现词或代词指代"],
    output: "一组逻辑连接标签",
  },
  cloze: {
    title: "完形语境日",
    mission: "用情节线和情绪线做选择，不单看词义。",
    tasks: ["完成 1 篇完形", "画出人物情绪变化", "复盘 3 个上下文线索"],
    output: "一条完形情节线",
  },
  grammar: {
    title: "语法判断日",
    mission: "把动词空、词性转换和从句连接词按步骤判断。",
    tasks: ["动词空 12 题，写判断理由", "词性转换 8 题，标修饰对象", "改写 3 个错句"],
    output: "5 个语法判断理由",
  },
  practical: {
    title: "应用文保分日",
    mission: "保证任务完整、语气合适、信息密度够。",
    tasks: ["抽 1 个应用文任务", "列对象、目的、必要信息", "写 90-110 词并按清单自查"],
    output: "一篇可归档应用文",
  },
  continuation: {
    title: "续写动作链日",
    mission: "用动作和细节承接原文，避免剧情跳跃。",
    tasks: ["列人物目标和阻碍", "写 6 句动作链", "补 1 个原文细节回扣"],
    output: "一条续写动作链",
  },
  vocab: {
    title: "词块调用日",
    mission: "把主题词块从认识推进到写作可用。",
    tasks: ["选 8 个主题词块造句", "把 3 句改成作文句", "检查动词和抽象名词搭配"],
    output: "8 个可迁移词块句",
  },
  listening: {
    title: "听力信号日",
    mission: "抓转折、否定、比较、时间和数字变化。",
    tasks: ["听 15 道场景/态度/数字题", "记录漏听信号词", "复述 3 个错误选项如何偷换"],
    output: "一组听力信号词清单",
  },
  mock: {
    title: "微型模拟日",
    mission: "用完整流程检查时间分配和薄弱题型。",
    tasks: ["完成一套微型模拟卷", "查看模拟报告", "把错题加入回炉并标错因"],
    output: "一份模拟复盘",
  },
  review: {
    title: "回炉整理日",
    mission: "把本周错因变成下一轮训练动作。",
    tasks: ["回看收藏回炉题", "清理高频错因标签", "重写 1 段作文或 5 个语法理由"],
    output: "下周第一天任务",
  },
};

const builtInMockExams = [
  {
    id: "reading-boost",
    title: "阅读强化微型卷",
    description: "主攻阅读定位、七选五逻辑和语法动词空。",
    duration: 42,
    sections: [
      {
        id: "reading",
        title: "阅读理解",
        score: 24,
        questions: [
          {
            id: "rb-r1",
            prompt:
              "A city library started lending musical instruments to teenagers. The program was created after teachers noticed that many students loved music but could not afford private lessons or instruments at home.",
            question: "Why did the library start the program?",
            options: ["To help teenagers access music resources", "To sell old instruments", "To replace school teachers", "To make the library quieter"],
            answer: 0,
            explain: "could not afford private lessons or instruments 对应 access music resources，核心是降低音乐学习门槛。",
          },
          {
            id: "rb-r2",
            prompt:
              "Researchers found that students who reviewed notes within 24 hours remembered ideas more clearly a week later. The effect was strongest when students rewrote the notes in their own words.",
            question: "What method worked best according to the research?",
            options: ["Reading notes only before exams", "Copying every word twice", "Rewriting notes in one's own words", "Avoiding review for a week"],
            answer: 2,
            explain: "strongest when students rewrote the notes in their own words 是直接证据。",
          },
          {
            id: "rb-r3",
            prompt:
              "The new school garden is not only a place for biology lessons. Students also use it to record weather changes, write observation journals, and design posters about healthy eating.",
            question: "What is the main idea of the text?",
            options: ["The garden supports learning in different ways", "Biology lessons are no longer important", "Students dislike outdoor classes", "Healthy eating posters are banned"],
            answer: 0,
            explain: "not only biology lessons 后列出多种用途，主旨是多方式支持学习。",
          },
        ],
      },
      {
        id: "gap",
        title: "七选五",
        score: 12,
        questions: [
          {
            id: "rb-g1",
            prompt:
              "Many people try to solve a difficult problem by working longer. ______ A short break can help the brain connect ideas in a new way.",
            question: "选择最合适的句子填入空格。",
            options: ["However, more time is not always the answer.", "The problem should be hidden.", "Everyone must work at night.", "Ideas are never useful."],
            answer: 0,
            explain: "后文 A short break 与 working longer 构成转折，However 最合适。",
          },
          {
            id: "rb-g2",
            prompt:
              "Before joining a discussion, read the topic carefully. ______ This makes your opinion easier for others to understand.",
            question: "选择最合适的句子填入空格。",
            options: ["Then prepare one example to support your view.", "Leave the room immediately.", "Speak as fast as possible.", "Avoid listening to others."],
            answer: 0,
            explain: "This 指代 prepare one example，能让观点更容易被理解。",
          },
        ],
      },
      {
        id: "grammar",
        title: "语言运用",
        score: 14,
        questions: [
          {
            id: "rb-gr1",
            prompt:
              "The volunteers, ______ (train) by local doctors, helped visitors understand basic first-aid skills.",
            question: "选择括号内单词的正确形式。",
            options: ["training", "trained", "to train", "were trained"],
            answer: 1,
            explain: "句子已有谓语 helped，volunteers 与 train 是被动关系，用 trained 作后置定语。",
          },
          {
            id: "rb-gr2",
            prompt:
              "The reason ______ he missed the meeting was that his train was delayed by heavy rain.",
            question: "选择合适的连接词。",
            options: ["why", "which", "where", "when"],
            answer: 0,
            explain: "先行词 reason，定语从句不缺主宾，表示原因，用 why。",
          },
        ],
      },
      {
        id: "writing",
        title: "写作任务",
        score: 20,
        writing: true,
        prompt:
          "假定你是李华，你校英文报正在征集“如何高效整理错题”的短文。请写一段 80-120 词的英文稿，内容包括：1. 一个具体方法；2. 这样做的理由；3. 给同学的建议。",
        rubric: ["方法具体", "理由清楚", "语气适合校报", "结尾有行动建议"],
      },
    ],
  },
  {
    id: "writing-diagnosis",
    title: "写作诊断微型卷",
    description: "兼顾应用文任务意识和续写动作链。",
    duration: 40,
    sections: [
      {
        id: "practical",
        title: "应用文判断",
        score: 12,
        questions: [
          {
            id: "wd-p1",
            prompt:
              "Your English teacher Mr. Brown will give a lecture on English writing next Friday. You are asked to write a notice for the school English club.",
            question: "Which piece of information must be included?",
            options: ["The time and place of the lecture", "Your favorite movie", "A long story about your family", "The weather last Friday"],
            answer: 0,
            explain: "通知类应用文必须交代时间、地点、活动内容和参与方式。",
          },
          {
            id: "wd-p2",
            prompt:
              "A friend feels nervous before a speech contest and asks you for advice.",
            question: "Which sentence is most suitable in a letter of advice?",
            options: ["You should disappear before the contest.", "Practising in front of two classmates may help you feel more confident.", "Speeches are boring.", "I know nothing about contests."],
            answer: 1,
            explain: "建议要具体、可执行，并与对方困难直接相关。",
          },
        ],
      },
      {
        id: "continuation",
        title: "读后续写判断",
        score: 18,
        questions: [
          {
            id: "wd-c1",
            prompt:
              "The original story ends with a boy standing in front of a broken model plane, afraid to tell his father the truth.",
            question: "Which continuation best keeps the plot reasonable?",
            options: ["He suddenly became a famous pilot.", "He took a deep breath, picked up the broken wing, and walked slowly toward his father.", "The weather changed three years later.", "Everyone forgot the model plane."],
            answer: 1,
            explain: "续写要承接原文冲突，用动作推动情节，B 保留了模型飞机和面对父亲的矛盾。",
          },
          {
            id: "wd-c2",
            prompt:
              "The girl had promised to help her teammate finish the poster, but she lost the only photo they needed.",
            question: "Which detail can best echo the original story?",
            options: ["A new phone advertisement", "The missing photo and the promise to her teammate", "A random mountain trip", "A speech about world peace"],
            answer: 1,
            explain: "结尾回扣应来自原文关键物件或承诺，这里是 photo 和 promise。",
          },
        ],
      },
      {
        id: "vocab",
        title: "词块调用",
        score: 10,
        questions: [
          {
            id: "wd-v1",
            prompt:
              "主题：志愿服务。目标：表达“这次经历增强了我的责任感”。",
            question: "Which expression is the most natural?",
            options: ["made my responsibility big", "developed my sense of responsibility", "opened my responsibility", "built responsibility quickly"],
            answer: 1,
            explain: "develop a sense of responsibility 是自然搭配。",
          },
          {
            id: "wd-v2",
            prompt:
              "主题：学习压力。目标：表达“把压力转化为动力”。",
            question: "Which expression is the most natural?",
            options: ["turn pressure into motivation", "move pressure into power room", "make pressure yellow", "delete pressure forever"],
            answer: 0,
            explain: "turn pressure into motivation 是可迁移到作文中的自然词块。",
          },
        ],
      },
      {
        id: "writing",
        title: "写作任务",
        score: 20,
        writing: true,
        prompt:
          "读后续写情境：主角在比赛前弄丢了队友交给他的号码牌，所有人都焦急地寻找。请续写接下来的情节，注意动作推进、人物情绪变化和结尾回扣。",
        rubric: ["承接原文冲突", "动作推进自然", "人物情绪有变化", "结尾回扣号码牌或团队信任"],
      },
    ],
  },
];

function updateProgress() {
  const completed = tasks.filter((task) => state.tasks[task.id]).length;
  document.getElementById("progressText").textContent = `${completed}/${tasks.length}`;
  document.getElementById("taskMeter").value = completed;
}

function renderTasks() {
  document.getElementById("taskList").innerHTML = tasks
    .map(
      (task) => `
        <label class="task">
          <input type="checkbox" data-task="${task.id}" ${state.tasks[task.id] ? "checked" : ""} />
          <span>
            <strong>${task.title}</strong>
            <small>${task.detail}</small>
          </span>
          <time>${task.time}</time>
        </label>
      `
    )
    .join("");

  document.querySelectorAll("[data-task]").forEach((input) => {
    input.addEventListener("change", () => {
      state.tasks[input.dataset.task] = input.checked;
      saveState();
      updateProgress();
    });
  });
  updateProgress();
}

function renderPlan() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = plans[state.plan]
    .map(
      ([no, title, desc]) => `
        <button class="phase ${title === state.phase ? "active" : ""}" type="button" data-phase="${title}">
          <span>${no}</span>
          <strong>${title}</strong>
          <small>${desc}</small>
        </button>
      `
    )
    .join("");

  if (!plans[state.plan].some((phase) => phase[1] === state.phase)) {
    state.phase = plans[state.plan][0][1];
  }

  const active = plans[state.plan].find((phase) => phase[1] === state.phase);
  document.getElementById("phaseOutput").textContent = `当前阶段：${active[1]}。${active[2]}`;

  document.querySelectorAll(".phase").forEach((phase) => {
    phase.addEventListener("click", () => {
      state.phase = phase.dataset.phase;
      saveState();
      renderPlan();
    });
  });
}

function renderModules() {
  document.getElementById("moduleGrid").innerHTML = modules
    .map(
      (module) => `
        <article class="module-card">
          <span>${module.no}</span>
          <h3>${module.title}</h3>
          <p>${module.text}</p>
          <ul>
            ${module.loss.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <p class="module-action">${module.action}</p>
          <button type="button" data-open-practice="${module.id}">${module.drill}</button>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-open-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("practiceSelect").value = button.dataset.openPractice;
      renderPractice(button.dataset.openPractice);
      document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderLibrary(category = "checklist") {
  document.getElementById("libraryGrid").innerHTML = libraryContent[category]
    .map(
      (card) => `
        <article class="library-card">
          <span>${card.tag}</span>
          <h3>${card.title}</h3>
          <ul>${card.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function renderCalendar() {
  const calendar = externalContent.sprintCalendar || [];
  document.getElementById("calendarGrid").innerHTML = calendar
    .map(
      (day) => `
        <article class="calendar-day ${state.calendarDone[day.day] ? "done" : ""}">
          <div>
            <span>Day ${day.day}</span>
            <strong>${day.focus}</strong>
          </div>
          <time>${day.minutes} min</time>
          <ul>${day.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
          <p>${day.output}</p>
          <button type="button" data-calendar-day="${day.day}">
            ${state.calendarDone[day.day] ? "已完成" : "标记完成"}
          </button>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-calendar-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const day = button.dataset.calendarDay;
      state.calendarDone[day] = !state.calendarDone[day];
      saveState();
      renderCalendar();
    });
  });
}

function activePrescriptionPack() {
  if (!state.activePackId && prescriptionPacks.length) {
    state.activePackId = prescriptionPacks[0].id;
  }
  return prescriptionPacks.find((pack) => pack.id === state.activePackId) || prescriptionPacks[0];
}

function packCompletion(pack) {
  const done = state.packDone[pack.id] || {};
  const count = pack.tasks.filter((task) => done[task.id]).length;
  const percent = pack.tasks.length ? Math.round((count / pack.tasks.length) * 100) : 0;
  return { count, total: pack.tasks.length, percent };
}

function renderPrescription() {
  const pack = activePrescriptionPack();
  if (!pack) {
    return;
  }
  const completion = packCompletion(pack);

  document.getElementById("packTabs").innerHTML = prescriptionPacks
    .map(
      (item) => `
        <button class="${item.id === pack.id ? "active" : ""}" type="button" data-pack-id="${item.id}">
          <span>${item.tag}</span>
          <strong>${item.title}</strong>
        </button>
      `
    )
    .join("");

  document.getElementById("packDetail").innerHTML = `
    <div class="pack-head">
      <span>${pack.tag} · ${pack.minutes} min</span>
      <h3>${pack.title}</h3>
      <p>${pack.goal}</p>
    </div>
    <div class="pack-meter">
      <strong>${completion.percent}%</strong>
      <meter min="0" max="100" value="${completion.percent}"></meter>
      <span>${completion.count}/${completion.total} steps</span>
    </div>
    <div class="pack-task-list">
      ${pack.tasks
        .map(
          (task) => `
            <label class="pack-task">
              <input type="checkbox" data-pack-task="${task.id}" ${(state.packDone[pack.id] || {})[task.id] ? "checked" : ""} />
              <span>
                <strong>${task.title}</strong>
                <small>${task.detail}</small>
              </span>
            </label>
          `
        )
        .join("")}
    </div>
    <div class="pack-actions">
      <button type="button" data-pack-practice="${pack.practiceType}">进入对应专项练习</button>
      <button type="button" id="resetPack">重置本处方</button>
    </div>
  `;

  document.getElementById("prescriptionSummary").innerHTML = `
    <div class="section-heading">
      <p>Evidence</p>
      <h2>为什么这样练</h2>
    </div>
    <ul>${pack.evidence.map((item) => `<li>${item}</li>`).join("")}</ul>
    <div class="output-card">
      <span>Today's Output</span>
      <strong>${pack.output}</strong>
    </div>
    <p class="panel-note">做完处方后，把仍然卡住的一步写进错题回炉，下一轮只补这一个动作。</p>
  `;

  document.querySelectorAll("[data-pack-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePackId = button.dataset.packId;
      saveState();
      renderPrescription();
    });
  });

  document.querySelectorAll("[data-pack-task]").forEach((input) => {
    input.addEventListener("change", () => {
      state.packDone[pack.id] = state.packDone[pack.id] || {};
      state.packDone[pack.id][input.dataset.packTask] = input.checked;
      saveState();
      renderPrescription();
    });
  });

  document.querySelector("[data-pack-practice]").addEventListener("click", (event) => {
    document.getElementById("practiceSelect").value = event.currentTarget.dataset.packPractice;
    renderPractice(event.currentTarget.dataset.packPractice);
    document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("resetPack").addEventListener("click", () => {
    state.packDone[pack.id] = {};
    saveState();
    renderPrescription();
  });
}

function scoreBlueprint() {
  const target = Math.max(60, Math.min(150, Number(state.targetScore) || 125));
  const ratio = target / 150;
  const sections = scoreSections.map((section) => ({
    ...section,
    goal: Math.max(0, Math.min(section.max, Math.round(section.max * ratio))),
  }));
  let diff = target - sections.reduce((sum, section) => sum + section.goal, 0);
  const priority = ["reading", "writing", "listening", "language"];

  while (diff !== 0) {
    let changed = false;
    for (const id of priority) {
      const section = sections.find((item) => item.id === id);
      if (diff > 0 && section.goal < section.max) {
        section.goal += 1;
        diff -= 1;
        changed = true;
      } else if (diff < 0 && section.goal > 0) {
        section.goal -= 1;
        diff += 1;
        changed = true;
      }
      if (diff === 0) {
        break;
      }
    }
    if (!changed) {
      break;
    }
  }

  return sections.map((section) => ({
    ...section,
    loss: section.max - section.goal,
    percent: Math.round((section.goal / section.max) * 100),
  }));
}

function scoreBand(target) {
  if (target >= 135) {
    return {
      name: "高分冲刺",
      line: "每个板块都要可控，阅读和写作不能靠临场发挥。",
    };
  }
  if (target >= 120) {
    return {
      name: "稳中提分",
      line: "先把阅读证据、语法判断和写作任务完整度稳定下来。",
    };
  }
  if (target >= 105) {
    return {
      name: "保稳补基",
      line: "优先拿稳基础题和应用文，不在难题上过度消耗时间。",
    };
  }
  return {
    name: "基础回收",
    line: "把词汇识别、语法主干和阅读细节题作为第一得分来源。",
  };
}

function renderScoreBlueprint() {
  const target = Math.max(60, Math.min(150, Number(state.targetScore) || 125));
  const sections = scoreBlueprint();
  const band = scoreBand(target);
  const completed = scoreActions.filter((item) => state.scoreDone[item.id]).length;

  document.getElementById("scoreBlueprintCards").innerHTML = sections
    .map(
      (section) => `
        <article class="score-slice">
          <div>
            <span>${section.title}</span>
            <strong>${section.goal}<small>/${section.max}</small></strong>
          </div>
          <meter min="0" max="100" value="${section.percent}"></meter>
          <p>${section.focus}</p>
          <div class="loss-line">
            <span>可丢 ${section.loss} 分</span>
            <button type="button" data-score-practice="${section.practiceType}">练这一项</button>
          </div>
        </article>
      `
    )
    .join("");

  document.getElementById("scoreBlueprintSummary").innerHTML = `
    <div class="score-summary-card">
      <span>目标 ${target} / 150</span>
      <strong>${band.name}</strong>
      <p>${band.line}</p>
      <small>通用训练口径：听力 30、阅读与七选五 50、语言运用 30、写作 40。正式备考时按本省最新卷面结构微调。</small>
    </div>
  `;

  document.getElementById("scoreActionList").innerHTML = `
    <div class="score-action-head">
      <span>本周保分动作</span>
      <strong>${completed}/${scoreActions.length}</strong>
    </div>
    ${scoreActions
      .map(
        (item) => `
          <label class="score-action">
            <input type="checkbox" data-score-action="${item.id}" ${state.scoreDone[item.id] ? "checked" : ""} />
            <span>
              <strong>${item.title}</strong>
              <small>${item.detail}</small>
            </span>
          </label>
        `
      )
      .join("")}
  `;

  document.querySelectorAll("[data-score-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("practiceSelect").value = button.dataset.scorePractice;
      renderPractice(button.dataset.scorePractice);
      document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-score-action]").forEach((input) => {
    input.addEventListener("change", () => {
      state.scoreDone[input.dataset.scoreAction] = input.checked;
      saveState();
      renderScoreBlueprint();
    });
  });
}

function moduleTitle(type) {
  if (type === "custom") return "自定义错题";
  return modules.find((module) => module.id === type)?.title || weeklyTemplates[type]?.title || type;
}

function weeklyPriorityTypes() {
  const fromReviewPressure = reviewPressureStats().map((item) => item.type);
  const fromTags = errorTagStats().map((tag) => tag.type);
  const fromStats = modules
    .map((module) => {
      const stats = getStats(module.id);
      const rate = stats.answered ? stats.correct / stats.answered : 0.5;
      return { type: module.id, rate, answered: stats.answered };
    })
    .sort((a, b) => a.rate - b.rate || a.answered - b.answered)
    .map((item) => item.type);
  const target = Number(state.targetScore) || 125;
  const defaults = target >= 135 ? ["reading", "continuation", "grammar", "listening"] : target < 110 ? ["vocab", "grammar", "practical", "reading"] : ["reading", "grammar", "continuation", "listening"];

  return [...new Set([...fromReviewPressure, ...fromTags, ...fromStats, ...defaults])].filter((type) => weeklyTemplates[type]);
}

function weeklyPlan() {
  const priority = weeklyPriorityTypes();
  const minutes = Number(state.weeklyIntensity) || 75;
  const sequence = [
    priority[0] || "reading",
    priority[1] || "grammar",
    priority[2] || "continuation",
    priority[3] || "listening",
    priority[4] || "seven",
    "mock",
    "review",
  ];

  return sequence.map((type, index) => {
    const template = weeklyTemplates[type] || weeklyTemplates.reading;
    const isMock = type === "mock";
    const isReview = type === "review";
    return {
      day: index + 1,
      type,
      title: template.title,
      mission: template.mission,
      tasks: template.tasks,
      output: template.output,
      minutes: isMock ? minutes + 20 : isReview ? Math.max(45, minutes - 15) : minutes,
      practiceType: isMock ? "reading" : isReview ? priority[0] || "reading" : type,
    };
  });
}

function renderWeeklyPlan() {
  const grid = document.getElementById("weeklyGrid");
  const insight = document.getElementById("weeklyInsight");
  if (!grid || !insight) {
    return;
  }

  const plan = weeklyPlan();
  const priority = weeklyPriorityTypes();
  const tagStats = errorTagStats();
  const pressureStats = reviewPressureStats();
  const doneCount = plan.filter((day) => state.weeklyDone[day.day]).length;
  const target = Number(state.targetScore) || 125;

  document.getElementById("weeklyIntensity").value = state.weeklyIntensity;
  grid.innerHTML = plan
    .map(
      (day) => `
        <article class="weekly-day ${state.weeklyDone[day.day] ? "done" : ""}">
          <div class="weekly-day-head">
            <span>Day ${day.day}</span>
            <time>${day.minutes} min</time>
          </div>
          <h3>${day.title}</h3>
          <p>${day.mission}</p>
          <ul>${day.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
          <div class="weekly-output">${day.output}</div>
          <div class="weekly-actions">
            <button type="button" data-week-practice="${day.practiceType}">练对应专项</button>
            <label>
              <input type="checkbox" data-week-day="${day.day}" ${state.weeklyDone[day.day] ? "checked" : ""} />
              完成
            </label>
          </div>
        </article>
      `
    )
    .join("");

  insight.innerHTML = `
    <div class="section-heading">
      <p>Plan Logic</p>
      <h2>生成依据</h2>
    </div>
    <div class="weekly-summary-card">
      <span>目标 ${target} 分 · 剩余 ${daysLeft} 天</span>
      <strong>${doneCount}/7</strong>
      <p>本周优先顺序：${priority.slice(0, 4).map(moduleTitle).join(" / ")}</p>
      ${
        pressureStats.length
          ? `<p>回炉压力最高：${pressureStats
              .slice(0, 2)
              .map((item) => `${moduleTitle(item.type)} ${item.score}`)
              .join(" / ")}</p>`
          : ""
      }
    </div>
    <div class="weekly-reason-list">
      ${
        pressureStats.length
          ? pressureStats
              .slice(0, 3)
              .map(
                (item) => `
                  <article>
                    <span>${moduleTitle(item.type)} · 回炉压力 ${item.score}</span>
                    <p>${item.stuck ? `${item.stuck} 题仍不会，` : ""}${item.todo} 题待复述，优先安排回炉和二刷。</p>
                  </article>
                `
              )
              .join("")
        : tagStats.length
          ? tagStats
              .slice(0, 3)
              .map(
                (tag) => `
                  <article>
                    <span>${tag.label}</span>
                    <p>${tag.action}</p>
                  </article>
                `
              )
              .join("")
          : `<article><span>默认策略</span><p>还没有足够错因记录，先按阅读、语法、写作、听力建立基础训练节奏。</p></article>`
      }
    </div>
  `;

  document.querySelectorAll("[data-week-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("practiceSelect").value = button.dataset.weekPractice;
      renderPractice(button.dataset.weekPractice);
      document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-week-day]").forEach((input) => {
    input.addEventListener("change", () => {
      state.weeklyDone[input.dataset.weekDay] = input.checked;
      saveState();
      renderWeeklyPlan();
    });
  });
}

function renderWriting(tabName) {
  const data = writing[tabName];
  document.getElementById("writingContent").innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.intro}</p>
    <ul>${data.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
}

function writingPrompts() {
  return externalContent.writingLab?.prompts || [];
}

function writingChecklist() {
  const mode = currentWritingMode();
  const rubrics = {
    practical: [
      { id: "practical-task", label: "任务完整", detail: "对象、目的、必要信息没有遗漏。", weight: 24, issue: "先补齐写信对象、活动信息或请求目的。", advice: "用 1 句话复述题干要求，再逐项核对正文。" },
      { id: "practical-tone", label: "语气得体", detail: "邀请、建议、通知、道歉等语气符合场景。", weight: 18, issue: "语气偏空泛或不够礼貌。", advice: "补一个 I would appreciate it if... / I am sorry that... 等功能句。" },
      { id: "practical-specific", label: "信息密度", detail: "建议、安排或说明具体可执行。", weight: 22, issue: "主体段缺少具体动作或频率。", advice: "把 vague advice 改成方法 + 时间/频率 + 预期效果。" },
      { id: "practical-language", label: "语言准确", detail: "时态、搭配、单复数基本稳定。", weight: 22, issue: "语言错误可能影响理解。", advice: "优先检查谓语动词、名词单复数和固定搭配。" },
      { id: "practical-structure", label: "结构清楚", detail: "开头、主体、结尾分工明确。", weight: 14, issue: "段落功能不够清楚。", advice: "按目的句、主体信息、礼貌收束三步重排。" },
    ],
    continuation: [
      { id: "continuation-plot", label: "情节合理", detail: "没有突然跳时间、换人物或强行升华。", weight: 24, issue: "情节推进有跳跃。", advice: "补一个动作节点，让人物先做一件可见的事。" },
      { id: "continuation-source", label: "原文回扣", detail: "关键物件、人物关系或冲突来自原文。", weight: 20, issue: "续写和原文连接偏弱。", advice: "找原文最后一段的物件、情绪或承诺，写进第一段。" },
      { id: "continuation-action", label: "动作描写", detail: "用动作推动情节，而不是只写感受。", weight: 18, issue: "动作链不足，画面感偏弱。", advice: "连续写 2-3 个小动作，再接一句结果。" },
      { id: "continuation-emotion", label: "情绪变化", detail: "人物情绪有起点、变化和原因。", weight: 18, issue: "情绪表达直白或没有变化。", advice: "把 sad / nervous 改成声音、眼神、停顿等细节。" },
      { id: "continuation-language", label: "语言准确", detail: "句式自然，叙事时态稳定。", weight: 20, issue: "语言错误会削弱叙事连贯。", advice: "统一过去时，检查代词指代和非谓语结构。" },
    ],
  };
  return rubrics[mode] || externalContent.writingLab?.checklist || [];
}

function promptMode(prompt = currentWritingPrompt()) {
  if (!prompt) return "practical";
  return prompt.id?.startsWith("continuation") || prompt.type?.includes("续写") ? "continuation" : "practical";
}

function currentWritingMode() {
  return promptMode(currentWritingPrompt());
}

function setActiveWritingTab(mode) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === mode));
  renderWriting(mode);
}

function currentWritingPrompt() {
  const prompts = writingPrompts();
  if (!state.writingPromptId && prompts.length) {
    state.writingPromptId = prompts[0].id;
  }
  return prompts.find((item) => item.id === state.writingPromptId) || prompts[0];
}

function renderWritingPromptSelect() {
  const select = document.getElementById("writingPromptSelect");
  select.innerHTML = writingPrompts()
    .map((prompt) => `<option value="${prompt.id}">${prompt.type} · ${prompt.title}</option>`)
    .join("");
  select.value = currentWritingPrompt()?.id || "";
}

function renderWritingPrompt() {
  const prompt = currentWritingPrompt();
  if (!prompt) {
    return;
  }
  setActiveWritingTab(promptMode(prompt));

  document.getElementById("writingPromptCard").innerHTML = `
    <span>${prompt.type} · ${prompt.target}</span>
    <h3>${prompt.title}</h3>
    <p>${prompt.prompt}</p>
    <ul>${prompt.mustHave.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function writingScoreDetail() {
  const checklist = writingChecklist();
  const score = checklist.reduce((sum, item) => sum + (state.writingChecks[item.id] ? item.weight : 0), 0);
  const missing = checklist.filter((item) => !state.writingChecks[item.id]);
  const passed = checklist.filter((item) => state.writingChecks[item.id]);
  const band = score >= 88 ? "高分冲刺" : score >= 76 ? "稳分可交" : score >= 60 ? "保底成形" : "需要重写";
  const next = missing[0]?.advice || "保留当前结构，最后检查拼写、标点和卷面。";
  return { score, missing, passed, band, next };
}

function writingScore() {
  return writingScoreDetail().score;
}

function renderWritingChecklist() {
  const detail = writingScoreDetail();
  document.getElementById("writingBand").textContent = `自评档位：${detail.band} · ${detail.score}/100`;
  document.getElementById("writingChecklist").innerHTML = writingChecklist()
    .map(
      (item) => `
        <label class="check-item">
          <input type="checkbox" data-writing-check="${item.id}" ${state.writingChecks[item.id] ? "checked" : ""} />
          <span><strong>${item.label}</strong>${item.detail}</span>
          <strong>${item.weight}</strong>
        </label>
      `
    )
    .join("");
  document.getElementById("writingDiagnosis").innerHTML = `
    <div class="diagnosis-score">
      <span>${currentWritingMode() === "continuation" ? "Continuation" : "Practical"}</span>
      <strong>${detail.score}</strong>
      <p>${detail.band}</p>
    </div>
    <div class="diagnosis-list">
      <h3>扣分提醒</h3>
      ${
        detail.missing.length
          ? detail.missing
              .slice(0, 3)
              .map((item) => `<article><span>${item.label}</span><p>${item.issue}</p></article>`)
              .join("")
          : `<article><span>可以提交</span><p>核心维度已覆盖，最后检查拼写、标点和卷面。</p></article>`
      }
    </div>
    <div class="diagnosis-list">
      <h3>下一步修改</h3>
      <article><span>Rewrite Move</span><p>${detail.next}</p></article>
    </div>
  `;

  document.querySelectorAll("[data-writing-check]").forEach((input) => {
    input.addEventListener("change", () => {
      state.writingChecks[input.dataset.writingCheck] = input.checked;
      saveState();
      renderWritingChecklist();
    });
  });
}

function renderDraftHistory() {
  const history = document.getElementById("draftHistory");
  if (!state.draftHistory.length) {
    history.innerHTML = "";
    return;
  }

  history.innerHTML = `
    <h3>草稿归档</h3>
    <div class="draft-list">
      ${state.draftHistory
        .map(
          (item, index) => `
            <article>
              <span>${item.date}</span>
              <strong>${item.title}</strong>
              <p>${item.words} words · ${item.score}/100 · ${item.band || "未记录档位"}</p>
              ${item.issues?.length ? `<p>待改：${item.issues.slice(0, 2).join(" / ")}</p>` : ""}
              <button type="button" data-load-draft="${index}">载入</button>
            </article>
          `
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll("[data-load-draft]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.draftHistory[Number(button.dataset.loadDraft)];
      if (item.promptId) {
        state.writingPromptId = item.promptId;
        renderWritingPromptSelect();
        renderWritingPrompt();
        renderWritingChecklist();
      }
      state.draft = item.text;
      document.getElementById("writingDraft").value = item.text;
      saveState();
      updateDraftCount();
    });
  });
}

function initWritingLab() {
  renderWritingPromptSelect();
  renderWritingPrompt();
  renderWritingChecklist();
  renderDraftHistory();
}

function renderVocab(filter = "") {
  const normalized = filter.trim().toLowerCase();
  document.getElementById("vocabChips").innerHTML = vocab
    .filter((item) => item.toLowerCase().includes(normalized))
    .map((item) => `<button class="chip" type="button" data-chip="${item}">${item}</button>`)
    .join("");

  document.querySelectorAll("[data-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const draft = document.getElementById("writingDraft");
      draft.value = `${draft.value}${draft.value ? "\n" : ""}${chip.dataset.chip}: `;
      state.draft = draft.value;
      saveState();
      updateDraftCount();
      draft.focus();
    });
  });
}

const reviewStatusOptions = [
  { id: "todo", label: "待复述" },
  { id: "restated", label: "复述完成" },
  { id: "second", label: "二刷完成" },
  { id: "stuck", label: "仍不会" },
];

function reviewStatus(id) {
  return state.reviewStatus[id] || "todo";
}

function statusLabel(id) {
  return reviewStatusOptions.find((item) => item.id === id)?.label || "待复述";
}

function allMistakes() {
  const defaultReviewMistakes = defaultMistakes.map((item, index) => {
    const type = index === 0 ? "reading" : index === 1 ? "grammar" : "continuation";
    return {
      id: `default:${index}`,
      title: item.title,
      text: item.text,
      type,
      tags: defaultTagsForType(type),
      source: "基础错题",
    };
  });
  const savedReviewMistakes = state.savedReviews.map((item) => ({
    id: `saved:${item.key}`,
    title: item.title,
    text: item.text,
    type: item.type,
    tags: reviewTags(item),
    source: "收藏回炉",
  }));
  const manualMistakes = state.mistakes.map((item, index) => ({
    id: `manual:${index}:${item.title}`,
    title: item.title,
    text: item.text,
    type: item.type || "custom",
    tags: item.tags || [],
    source: "手动错题",
  }));
  return [...defaultReviewMistakes, ...savedReviewMistakes, ...manualMistakes];
}

function filteredMistakes() {
  state.mistakeFilters = { type: "all", tag: "all", status: "all", ...state.mistakeFilters };
  return allMistakes().filter((item) => {
    const status = reviewStatus(item.id);
    const typePass = state.mistakeFilters.type === "all" || item.type === state.mistakeFilters.type;
    const tagPass = state.mistakeFilters.tag === "all" || item.tags.includes(state.mistakeFilters.tag);
    const statusPass = state.mistakeFilters.status === "all" || status === state.mistakeFilters.status;
    return typePass && tagPass && statusPass;
  });
}

function renderMistakeFilters(items) {
  const typeFilter = document.getElementById("mistakeTypeFilter");
  const tagFilter = document.getElementById("mistakeTagFilter");
  const statusFilter = document.getElementById("mistakeStatusFilter");
  const types = [...new Set(items.map((item) => item.type))].filter(Boolean);

  typeFilter.innerHTML = [
    `<option value="all">全部专项</option>`,
    ...types.map((type) => `<option value="${type}">${moduleTitle(type)}</option>`),
  ].join("");
  tagFilter.innerHTML = [
    `<option value="all">全部错因</option>`,
    ...errorTags.map((tag) => `<option value="${tag.id}">${tag.label}</option>`),
  ].join("");
  statusFilter.innerHTML = [
    `<option value="all">全部状态</option>`,
    ...reviewStatusOptions.map((item) => `<option value="${item.id}">${item.label}</option>`),
  ].join("");

  typeFilter.value = state.mistakeFilters.type || "all";
  tagFilter.value = state.mistakeFilters.tag || "all";
  statusFilter.value = state.mistakeFilters.status || "all";

  [typeFilter, tagFilter, statusFilter].forEach((select) => {
    select.onchange = () => {
      state.mistakeFilters = {
        type: typeFilter.value,
        tag: tagFilter.value,
        status: statusFilter.value,
      };
      saveState();
      renderMistakes();
    };
  });
}

function renderMistakeSummary(items) {
  const todo = items.filter((item) => reviewStatus(item.id) === "todo").length;
  const second = items.filter((item) => reviewStatus(item.id) === "second").length;
  const stuck = items.filter((item) => reviewStatus(item.id) === "stuck").length;
  document.getElementById("mistakeSummary").innerHTML = `
    <div><span>回炉池</span><strong>${items.length}</strong></div>
    <div><span>待复述</span><strong>${todo}</strong></div>
    <div><span>二刷完成</span><strong>${second}</strong></div>
    <div><span>仍不会</span><strong>${stuck}</strong></div>
  `;
}

function todayReviewItems(items) {
  return items
    .filter((item) => reviewStatus(item.id) !== "second")
    .sort((a, b) => {
      const weight = { stuck: 0, todo: 1, restated: 2, second: 3 };
      return weight[reviewStatus(a.id)] - weight[reviewStatus(b.id)];
    })
    .slice(0, 5);
}

function renderTodayReview(items) {
  const todayItems = todayReviewItems(items);
  document.getElementById("todayReview").innerHTML = `
    <div>
      <span>Today Review</span>
      <strong>今日回炉任务</strong>
      <p>${todayItems.length ? `优先处理 ${todayItems.length} 题：先复述错因，再二刷确认。` : "当前筛选下没有待回炉题。"}</p>
    </div>
    <div class="today-review-list">
      ${
        todayItems.length
          ? todayItems.map((item) => `<button type="button" data-review-start="${item.id}">${moduleTitle(item.type)} · ${statusLabel(reviewStatus(item.id))}</button>`).join("")
          : `<span>可以放宽筛选条件，或新增一条错题。</span>`
      }
    </div>
  `;
}

function renderMistakes() {
  const items = allMistakes();
  const filtered = filteredMistakes();
  renderMistakeFilters(items);
  renderMistakeSummary(items);
  renderTodayReview(filtered);

  document.getElementById("mistakeGrid").innerHTML = filtered.length
    ? filtered
    .map(
      (item) => `
        <article class="mistake ${reviewStatus(item.id)}">
          ${item.source ? `<span>${item.source}</span>` : ""}
          <strong>${item.title}</strong>
          <div class="mistake-meta">
            <b>${moduleTitle(item.type)}</b>
            <b>${statusLabel(reviewStatus(item.id))}</b>
            ${item.tags.map((tagId) => `<b>${tagById(tagId)?.label || tagId}</b>`).join("")}
          </div>
          <p>${item.text}</p>
          <div class="mistake-status" aria-label="回炉状态">
            ${reviewStatusOptions
              .map(
                (status) => `
                  <button class="${reviewStatus(item.id) === status.id ? "active" : ""}" type="button" data-review-status="${status.id}" data-review-id="${item.id}">
                    ${status.label}
                  </button>
                `
              )
              .join("")}
          </div>
          <button type="button" data-review="${item.id}">今天回炉</button>
        </article>
      `
    )
    .join("")
    : `<p class="empty-state">当前筛选下没有错题。可以切换专项、错因或状态。</p>`;

  document.querySelectorAll("[data-review]").forEach((button) => {
    button.addEventListener("click", () => {
      openMistakeReview(button.dataset.review);
    });
  });

  document.querySelectorAll("[data-review-start]").forEach((button) => {
    button.addEventListener("click", () => openMistakeReview(button.dataset.reviewStart));
  });

  document.querySelectorAll("[data-review-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.reviewStatus[button.dataset.reviewId] = button.dataset.reviewStatus;
      saveState();
      renderMistakes();
      renderReport();
    });
  });
}

function openMistakeReview(id) {
  const item = allMistakes().find((mistake) => mistake.id === id);
  if (!item) {
    return;
  }
  document.getElementById("practiceQuestion").innerHTML = `
    <h3>错题回炉任务</h3>
    <p>${item.title}</p>
    <div class="answer-box show">
      <strong>${moduleTitle(item.type)} · ${statusLabel(reviewStatus(item.id))}</strong>
      <p>${item.text}</p>
    </div>
  `;
  document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
}

let timerSeconds = 600;
let timerHandle = null;
let currentPracticeType = "reading";
let mockSeconds = 45 * 60;
let mockTimerHandle = null;

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function setTimer(minutes) {
  timerSeconds = minutes * 60;
  document.getElementById("timerDisplay").textContent = formatTime(timerSeconds);
  document.getElementById("timerToggle").textContent = "开始";
  clearInterval(timerHandle);
  timerHandle = null;
}

function mockExams() {
  const core = externalContent.mockExam
    ? {
        id: "core",
        description: "覆盖阅读、七选五、语言运用和写作的基础稳分卷。",
        ...externalContent.mockExam,
      }
    : null;
  return [core, ...builtInMockExams].filter(Boolean);
}

function currentMockExam() {
  const exams = mockExams();
  if (!exams.some((exam) => exam.id === state.activeMockExamId)) {
    state.activeMockExamId = exams[0]?.id || "core";
  }
  return exams.find((exam) => exam.id === state.activeMockExamId) || exams[0];
}

function mockWritingValue() {
  return state.mockWritingByExam[state.activeMockExamId] ?? (state.activeMockExamId === "core" ? state.mockWriting : "");
}

function setMockWritingValue(value) {
  state.mockWritingByExam[state.activeMockExamId] = value;
  if (state.activeMockExamId === "core") {
    state.mockWriting = value;
  }
}

function practiceTypeForSection(sectionId) {
  const map = {
    gap: "seven",
    writing: "continuation",
  };
  return map[sectionId] || sectionId;
}

function practiceTypeFromSectionTitle(title = "") {
  if (title.includes("七选五")) return "seven";
  if (title.includes("完形")) return "cloze";
  if (title.includes("语法") || title.includes("语言")) return "grammar";
  if (title.includes("应用文")) return "practical";
  if (title.includes("续写")) return "continuation";
  if (title.includes("词块") || title.includes("词汇")) return "vocab";
  if (title.includes("听力")) return "listening";
  return "reading";
}

function packIdForPracticeType(type) {
  if (type === "listening") return "listening-turn";
  if (type === "reading" || type === "seven") return "reading-evidence";
  if (type === "grammar" || type === "cloze") return "grammar-verb";
  return "writing-action";
}

function mockQuestions() {
  const exam = currentMockExam();
  if (!exam) {
    return [];
  }

  return exam.sections.flatMap((section) => {
    if (section.writing) {
      return [{ ...section, id: `${exam.id}:${section.id}:writing`, type: "writing", sectionTitle: section.title, examId: exam.id }];
    }

    return section.questions.map((question, index) => ({
      ...question,
      id: `${exam.id}:${question.id}`,
      type: "choice",
      score: section.score / section.questions.length,
      sectionTitle: section.title,
      sectionId: section.id,
      practiceType: practiceTypeForSection(section.id),
      localNo: index + 1,
    }));
  });
}

function setMockTimer(seconds = mockSeconds) {
  mockSeconds = seconds;
  document.getElementById("mockTimer").textContent = formatTime(mockSeconds);
}

function resetMockTimerForExam() {
  clearInterval(mockTimerHandle);
  mockTimerHandle = null;
  document.getElementById("mockStart").textContent = "开始";
  setMockTimer((currentMockExam()?.duration || 45) * 60);
}

function renderMockExamSelect() {
  const select = document.getElementById("mockExamSelect");
  select.innerHTML = mockExams()
    .map((exam) => `<option value="${exam.id}">${exam.title}</option>`)
    .join("");
  select.value = currentMockExam()?.id || "";
}

function resetActiveMockExam() {
  const prefix = `${state.activeMockExamId}:`;
  Object.keys(state.mockAnswers).forEach((key) => {
    if (key.startsWith(prefix)) {
      delete state.mockAnswers[key];
    }
  });
  delete state.mockWritingByExam[state.activeMockExamId];
  if (state.activeMockExamId === "core") {
    state.mockWriting = "";
  }
  state.mockQuestionIndex = 0;
  saveState();
  resetMockTimerForExam();
  renderMockQuestion();
  renderMockStoredReport();
}

function renderAnswerSheet() {
  const questions = mockQuestions();
  document.getElementById("answerSheet").innerHTML = questions
    .map((question, index) => {
      const answered = question.type === "writing" ? mockWritingValue().trim() : state.mockAnswers[question.id] !== undefined;
      return `
        <button class="${index === state.mockQuestionIndex ? "active" : ""} ${answered ? "answered" : ""}" type="button" data-mock-jump="${index}">
          ${index + 1}
        </button>
      `;
    })
    .join("");

  document.querySelectorAll("[data-mock-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mockQuestionIndex = Number(button.dataset.mockJump);
      saveState();
      renderMockQuestion();
    });
  });
}

function renderMockQuestion() {
  const exam = currentMockExam();
  const questions = mockQuestions();
  if (!exam || !questions.length) {
    return;
  }

  state.mockQuestionIndex = Math.min(state.mockQuestionIndex, questions.length - 1);
  const question = questions[state.mockQuestionIndex];
  document.getElementById("mockTitle").textContent = exam.title;
  document.getElementById("mockProgress").textContent = `${state.mockQuestionIndex + 1}/${questions.length} · ${exam.description || "微型诊断"}`;

  if (question.type === "writing") {
    document.getElementById("mockQuestion").innerHTML = `
      <div class="practice-head">
        <h3>${question.sectionTitle}</h3>
        <span>写作</span>
      </div>
      <p>${question.prompt}</p>
      <ul class="rubric-list">${question.rubric.map((item) => `<li>${item}</li>`).join("")}</ul>
      <textarea id="mockWriting" rows="8" placeholder="在这里写模拟卷作文草稿，页面会自动保存。">${mockWritingValue()}</textarea>
      <div class="practice-actions">
        <button type="button" id="mockPrev">上一题</button>
        <button type="button" id="mockNext">下一题</button>
      </div>
    `;
    document.getElementById("mockWriting").addEventListener("input", (event) => {
      setMockWritingValue(event.target.value);
      saveState();
      renderAnswerSheet();
    });
  } else {
    document.getElementById("mockQuestion").innerHTML = `
      <div class="practice-head">
        <h3>${question.sectionTitle} · ${question.title || `第 ${question.localNo} 题`}</h3>
        <span>${state.mockQuestionIndex + 1}/${questions.length}</span>
      </div>
      <p>${question.prompt}</p>
      <strong>${question.question}</strong>
      <div class="option-list">
        ${question.options
          .map(
            (option, index) => `
              <button class="${state.mockAnswers[question.id] === index ? "selected" : ""}" type="button" data-mock-answer="${index}">
                <span>${String.fromCharCode(65 + index)}</span>
                ${option}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="practice-actions">
        <button type="button" id="mockPrev">上一题</button>
        <button type="button" id="mockNext">下一题</button>
      </div>
    `;
    document.querySelectorAll("[data-mock-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        state.mockAnswers[question.id] = Number(button.dataset.mockAnswer);
        saveState();
        renderMockQuestion();
      });
    });
  }

  document.getElementById("mockPrev").disabled = state.mockQuestionIndex === 0;
  document.getElementById("mockNext").disabled = state.mockQuestionIndex === questions.length - 1;
  document.getElementById("mockPrev").addEventListener("click", () => {
    state.mockQuestionIndex = Math.max(0, state.mockQuestionIndex - 1);
    saveState();
    renderMockQuestion();
  });
  document.getElementById("mockNext").addEventListener("click", () => {
    state.mockQuestionIndex = Math.min(questions.length - 1, state.mockQuestionIndex + 1);
    saveState();
    renderMockQuestion();
  });

  renderAnswerSheet();
}

function saveMockWrongAnswers(choiceQuestions) {
  let added = 0;
  choiceQuestions.forEach((question) => {
    const selected = state.mockAnswers[question.id];
    if (selected === question.answer) {
      return;
    }
    const key = `mock:${question.id}`;
    const current = state.savedReviews.find((review) => review.key === key);
    const text = `${selected === undefined ? "未作答" : `你的答案：${String.fromCharCode(65 + selected)}`}；正确答案：${String.fromCharCode(65 + question.answer)}。${question.explain}`;
    if (!current) {
      state.savedReviews.push({
        key,
        type: question.practiceType,
        title: `${currentMockExam().title} · ${question.sectionTitle}第 ${question.localNo} 题`,
        text,
        tags: defaultTagsForType(question.practiceType),
      });
      added += 1;
    } else {
      current.text = text;
      current.tags = current.tags?.length ? current.tags : defaultTagsForType(question.practiceType);
    }
  });
  return added;
}

function submitMockExam() {
  const exam = currentMockExam();
  const questions = mockQuestions();
  const choiceQuestions = questions.filter((question) => question.type === "choice");
  const correct = choiceQuestions.filter((question) => state.mockAnswers[question.id] === question.answer);
  const answered = choiceQuestions.filter((question) => state.mockAnswers[question.id] !== undefined);
  const writingDraft = mockWritingValue();
  const writingWords = writingDraft.trim() ? writingDraft.trim().split(/\s+/).length : 0;
  const rawScore = correct.reduce((sum, question) => sum + question.score, 0);
  const totalChoiceScore = choiceQuestions.reduce((sum, question) => sum + question.score, 0);
  const sectionStats = choiceQuestions.reduce((acc, question) => {
    acc[question.sectionTitle] = acc[question.sectionTitle] || { total: 0, correct: 0, type: question.practiceType };
    acc[question.sectionTitle].total += 1;
    if (state.mockAnswers[question.id] === question.answer) {
      acc[question.sectionTitle].correct += 1;
    }
    return acc;
  }, {});
  const weakestSection = Object.entries(sectionStats)
    .map(([title, item]) => ({ title, type: item.type, rate: item.total ? item.correct / item.total : 1 }))
    .sort((a, b) => a.rate - b.rate)[0];
  const attempt = {
    date: new Date().toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
    examId: exam.id,
    examTitle: exam.title,
    score: Math.round(rawScore),
    total: totalChoiceScore,
    accuracy: choiceQuestions.length ? Math.round((correct.length / choiceQuestions.length) * 100) : 0,
    writingWords,
    weakest: weakestSection?.title || "暂无",
    weakestType: weakestSection?.type || "reading",
  };
  const addedReviews = saveMockWrongAnswers(choiceQuestions);
  state.mockAttempts = [attempt, ...state.mockAttempts].slice(0, 6);
  saveState();

  document.getElementById("mockReportBody").innerHTML = `
    <div class="report-grid">
      <div class="report-tile">
        <span>选择题得分</span>
        <strong>${Math.round(rawScore)}/${totalChoiceScore}</strong>
      </div>
      <div class="report-tile">
        <span>正确率</span>
        <strong>${choiceQuestions.length ? Math.round((correct.length / choiceQuestions.length) * 100) : 0}%</strong>
      </div>
      <div class="report-tile">
        <span>作文词数</span>
        <strong>${writingWords}</strong>
      </div>
      <div class="report-tile">
        <span>错题入库</span>
        <strong>${addedReviews}</strong>
      </div>
    </div>
    <div class="mock-auto-note">
      <strong>${exam.title}</strong>
      <p>本次未答或答错的选择题已自动进入收藏回炉，并带上错因标签，可在学习报告和周计划中继续联动。</p>
    </div>
    <div class="mock-review-list">
      ${choiceQuestions
        .map((question, index) => {
          const selected = state.mockAnswers[question.id];
          const isCorrect = selected === question.answer;
          return `
            <article class="${isCorrect ? "correct" : "wrong"}">
              <strong>${index + 1}. ${question.sectionTitle}</strong>
              <p>${selected === undefined ? "未作答" : `你的答案：${String.fromCharCode(65 + selected)}`}；正确答案：${String.fromCharCode(65 + question.answer)}</p>
              <p>${question.explain}</p>
            </article>
          `;
        })
        .join("")}
    </div>
    ${renderMockHistory()}
  `;

  bindMockReportActions();
  renderReviewQueue();
  renderMistakes();
  renderReport();
  document.getElementById("mockReport").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderMockHistory() {
  if (!state.mockAttempts.length) {
    return "";
  }

  const best = state.mockAttempts.reduce((max, item) => Math.max(max, item.accuracy || 0), 0);
  return `
    <div class="mock-history">
      <h3>最近模拟记录</h3>
      ${renderMockTrend()}
      <div class="history-grid">
        ${state.mockAttempts
          .map(
            (item, index) => `
              <article class="${index === 0 ? "latest" : ""}">
                <span>${item.date}</span>
                <strong>${item.score}/${item.total}</strong>
                <p>${item.examTitle || "微型模拟卷"}</p>
                <p>正确率 ${item.accuracy}% · 作文 ${item.writingWords} 词</p>
                <em>薄弱项：${item.weakest}</em>
              </article>
            `
          )
          .join("")}
      </div>
      <p class="history-note">最高选择题正确率 ${best}%。下一轮建议优先回炉最近一次的薄弱项。</p>
    </div>
  `;
}

function renderMockStoredReport() {
  const body = document.getElementById("mockReportBody");
  if (!state.mockAttempts.length) {
    body.innerHTML = `<p class="empty-state">还没有模拟记录。完成一套微型卷后，这里会显示趋势、薄弱项和回练入口。</p>`;
    return;
  }

  const latest = state.mockAttempts[0];
  const best = state.mockAttempts.reduce((max, item) => Math.max(max, item.accuracy || 0), 0);
  body.innerHTML = `
    <div class="report-grid">
      <div class="report-tile">
        <span>最近模拟</span>
        <strong>${latest.accuracy}%</strong>
      </div>
      <div class="report-tile">
        <span>最高正确率</span>
        <strong>${best}%</strong>
      </div>
      <div class="report-tile">
        <span>记录数</span>
        <strong>${state.mockAttempts.length}</strong>
      </div>
      <div class="report-tile wide">
        <span>最近薄弱项</span>
        <strong>${latest.weakest || "暂无"}</strong>
        <p>${latest.examTitle || "微型模拟卷"} · ${latest.date}</p>
      </div>
    </div>
    ${renderMockHistory()}
  `;
  bindMockReportActions();
}

function renderMockTrend() {
  const recent = [...state.mockAttempts].slice(0, 6).reverse();
  const latest = state.mockAttempts[0];
  const previous = state.mockAttempts[1];
  const latestType = latest?.weakestType || practiceTypeFromSectionTitle(latest?.weakest);
  const delta = previous ? (latest.accuracy || 0) - (previous.accuracy || 0) : 0;
  const weakCounts = state.mockAttempts.reduce((acc, item) => {
    const type = item.weakestType || practiceTypeFromSectionTitle(item.weakest);
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const repeatedWeak = Object.entries(weakCounts).sort((a, b) => b[1] - a[1])[0];

  return `
    <div class="mock-trend-panel">
      <div class="trend-summary">
        <span>Trend</span>
        <strong>${delta === 0 ? "持平" : delta > 0 ? `+${delta}%` : `${delta}%`}</strong>
        <p>${previous ? "相对上一套模拟卷的选择题正确率变化。" : "完成第二套模拟后会显示趋势变化。"}</p>
      </div>
      <div class="trend-bars" aria-label="最近模拟正确率趋势">
        ${recent
          .map(
            (item) => `
              <div class="trend-bar" style="--h:${Math.max(6, item.accuracy || 0)}%">
                <span>${item.accuracy || 0}%</span>
                <i></i>
                <small>${item.examTitle || "模拟卷"}</small>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="trend-actions">
        <p>反复薄弱：${moduleTitle(repeatedWeak?.[0] || latestType)} · 最近薄弱：${moduleTitle(latestType)}</p>
        <button type="button" data-mock-trend-practice="${latestType}">回练最近薄弱项</button>
        <button type="button" data-mock-trend-pack="${packIdForPracticeType(latestType)}">打开对应处方</button>
      </div>
    </div>
  `;
}

function bindMockReportActions() {
  document.querySelectorAll("[data-mock-trend-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("practiceSelect").value = button.dataset.mockTrendPractice;
      renderPractice(button.dataset.mockTrendPractice);
      document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-mock-trend-pack]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePackId = button.dataset.mockTrendPack;
      saveState();
      renderPrescription();
      document.getElementById("prescription").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function getPracticeItem(type) {
  const set = practiceSets[type];
  const index = Math.min(state.practiceIndex[type] || 0, set.length - 1);
  return { item: set[index], index, total: set.length };
}

function getStats(type) {
  state.stats[type] = state.stats[type] || { answered: 0, correct: 0 };
  return state.stats[type];
}

function recordAnswer(type, isCorrect) {
  const stats = getStats(type);
  stats.answered += 1;
  if (isCorrect) {
    stats.correct += 1;
  }
  saveState();
  renderReport();
}

function defaultTagsForType(type) {
  return defaultErrorTagsByType[type] || ["evidence"];
}

function tagById(id) {
  return errorTags.find((tag) => tag.id === id);
}

function reviewTags(review) {
  return review.tags?.length ? review.tags : defaultTagsForType(review.type);
}

function practiceInsightItems(item) {
  return [
    item.evidence ? { label: "定位句", text: item.evidence } : null,
    item.trap ? { label: "干扰项", text: item.trap } : null,
    item.method ? { label: "解题动作", text: item.method } : null,
  ].filter(Boolean);
}

function renderPracticeInsight(item) {
  const insightItems = practiceInsightItems(item);
  const tags = item.errorTags?.map((tagId) => tagById(tagId)?.label).filter(Boolean) || [];
  if (!insightItems.length && !tags.length) {
    return "";
  }
  return `
    <div class="practice-insight">
      ${insightItems
        .map(
          (insight) => `
            <div>
              <span>${insight.label}</span>
              <p>${insight.text}</p>
            </div>
          `
        )
        .join("")}
      ${
        tags.length
          ? `<div class="practice-error-tags"><span>错因标签</span>${tags.map((tag) => `<b>${tag}</b>`).join("")}</div>`
          : ""
      }
    </div>
  `;
}

function practiceReviewText(item) {
  const details = practiceInsightItems(item).map((insight) => `${insight.label}：${insight.text}`);
  return [item.explain, ...details].join(" ");
}

function errorTagStats() {
  const counts = {};
  state.savedReviews.forEach((review) => {
    reviewTags(review).forEach((tagId) => {
      const tag = tagById(tagId);
      if (!tag) {
        return;
      }
      counts[tagId] = counts[tagId] || { ...tag, count: 0 };
      counts[tagId].count += 1;
    });
  });
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

function reviewPressureStats() {
  const weights = { stuck: 4, todo: 2, restated: 1, second: 0 };
  const stats = {};
  allMistakes().forEach((item) => {
    if (!weeklyTemplates[item.type]) {
      return;
    }
    const status = reviewStatus(item.id);
    const weight = weights[status] ?? 0;
    if (!weight) {
      return;
    }
    stats[item.type] = stats[item.type] || { type: item.type, score: 0, todo: 0, restated: 0, stuck: 0 };
    stats[item.type].score += weight;
    stats[item.type][status] = (stats[item.type][status] || 0) + 1;
  });
  return Object.values(stats).sort((a, b) => b.score - a.score || b.stuck - a.stuck);
}

function saveForReview(type, item) {
  const key = `${type}:${item.title}`;
  const current = state.savedReviews.find((review) => review.key === key);
  if (!current) {
    state.savedReviews.push({
      key,
      type,
      title: item.title,
      text: practiceReviewText(item),
      tags: item.errorTags?.length ? item.errorTags : defaultTagsForType(type),
    });
  } else if (!current.tags?.length) {
    current.tags = item.errorTags?.length ? item.errorTags : defaultTagsForType(type);
  } else if (current.text === item.explain) {
    current.text = practiceReviewText(item);
  }
  saveState();
  renderReviewQueue();
  renderMistakes();
  renderReport();
}

function renderPractice(type) {
  currentPracticeType = type;
  const { item, index, total } = getPracticeItem(type);
  setTimer(item.time);
  document.getElementById("practiceQuestion").innerHTML = `
    <div class="practice-head">
      <h3>${item.title}</h3>
      <span>${index + 1}/${total}</span>
    </div>
    <p>${item.prompt}</p>
    <strong>${item.question}</strong>
    <div class="option-list">
      ${item.options
        .map(
          (option, index) => `
            <button type="button" data-answer="${index}">
              <span>${String.fromCharCode(65 + index)}</span>
              ${option}
            </button>
          `
        )
        .join("")}
    </div>
    <div class="answer-box" id="answerBox"></div>
    <div class="practice-actions">
      <button type="button" id="prevQuestion" ${index === 0 ? "disabled" : ""}>上一题</button>
      <button type="button" id="saveReview">收藏回炉</button>
      <button type="button" id="nextQuestion">${index === total - 1 ? "回到第一题" : "下一题"}</button>
    </div>
  `;

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.answer);
      const isCorrect = selected === item.answer;
      document.querySelectorAll("[data-answer]").forEach((option) => {
        option.classList.remove("correct", "wrong");
        option.disabled = true;
      });
      button.classList.add(isCorrect ? "correct" : "wrong");
      document.getElementById("answerBox").classList.add("show");
      document.getElementById("answerBox").innerHTML = `
        <strong>${isCorrect ? "答对了。" : "这题先回炉。"}</strong>
        <p>${item.explain}</p>
        ${renderPracticeInsight(item)}
      `;
      recordAnswer(type, isCorrect);
      if (!isCorrect) {
        saveForReview(type, item);
      }
    });
  });

  document.getElementById("prevQuestion").addEventListener("click", () => {
    state.practiceIndex[type] = Math.max(0, index - 1);
    saveState();
    renderPractice(type);
  });

  document.getElementById("nextQuestion").addEventListener("click", () => {
    state.practiceIndex[type] = index === total - 1 ? 0 : index + 1;
    saveState();
    renderPractice(type);
  });

  document.getElementById("saveReview").addEventListener("click", () => {
    saveForReview(type, item);
    document.getElementById("saveReview").textContent = "已收藏";
  });
}

function renderReport() {
  const totalAnswered = Object.values(state.stats).reduce((sum, item) => sum + item.answered, 0);
  const totalCorrect = Object.values(state.stats).reduce((sum, item) => sum + item.correct, 0);
  const accuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const weakest = modules
    .map((module) => {
      const stats = getStats(module.id);
      const rate = stats.answered ? stats.correct / stats.answered : 1;
      return { ...module, ...stats, rate };
    })
    .sort((a, b) => a.rate - b.rate)[0];

  document.getElementById("reportGrid").innerHTML = `
    <div class="report-tile">
      <span>已练题数</span>
      <strong>${totalAnswered}</strong>
    </div>
    <div class="report-tile">
      <span>总体正确率</span>
      <strong>${accuracy}%</strong>
    </div>
    <div class="report-tile">
      <span>收藏回炉</span>
      <strong>${state.savedReviews.length}</strong>
    </div>
    <div class="report-tile wide">
      <span>下一步建议</span>
      <strong>${weakest.answered ? weakest.title : "先完成一组专项题"}</strong>
      <p>${weakest.answered ? "把这个专项的错题解释复述一遍，再做下一题。" : "建议从阅读理解或语法填空开始，最容易建立稳定分。"}</p>
    </div>
  `;

  const tagStats = errorTagStats();
  const pressureStats = reviewPressureStats();
  document.getElementById("errorTagReport").innerHTML = `
    <div class="error-report-head">
      <span>错因雷达</span>
      <strong>${tagStats.length ? `最高频：${tagStats[0].label}` : "先积累 1 道错题"}</strong>
    </div>
    ${
      tagStats.length
        ? `<div class="error-rank">
            ${tagStats
              .slice(0, 4)
              .map(
                (tag) => `
                  <article>
                    <div>
                      <span>${tag.label}</span>
                      <strong>${tag.count}</strong>
                    </div>
                    <p>${tag.action}</p>
                    <button type="button" data-tag-practice="${tag.type}">回练对应题型</button>
                  </article>
                `
              )
              .join("")}
          </div>`
        : `<p class="empty-state">做错或收藏题目后，这里会自动统计错因标签，并给出回练入口。</p>`
    }
    <div class="review-pressure-report">
      <div class="error-report-head">
        <span>回炉压力</span>
        <strong>${pressureStats.length ? `${moduleTitle(pressureStats[0].type)} 优先` : "暂无压力"}</strong>
      </div>
      ${
        pressureStats.length
          ? `<div class="pressure-grid">
              ${pressureStats
                .slice(0, 4)
                .map(
                  (item) => `
                    <article>
                      <div>
                        <span>${moduleTitle(item.type)}</span>
                        <strong>${item.score}</strong>
                      </div>
                      <p>${item.stuck ? `${item.stuck} 题仍不会，` : ""}${item.todo} 题待复述，${item.restated} 题已复述待二刷。</p>
                    </article>
                  `
                )
                .join("")}
            </div>`
          : `<p class="empty-state">把错题标为“仍不会”或“待复述”后，报告会把它们转成训练优先级。</p>`
      }
    </div>
  `;

  document.querySelectorAll("[data-tag-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("practiceSelect").value = button.dataset.tagPractice;
      renderPractice(button.dataset.tagPractice);
      document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  renderWeeklyPlan();
}

function renderReviewQueue() {
  const queue = document.getElementById("reviewQueue");
  if (!state.savedReviews.length) {
    queue.innerHTML = `<p class="empty-state">暂时没有收藏题。做错的题会自动进入这里，也可以在练习台手动收藏。</p>`;
    return;
  }

  queue.innerHTML = state.savedReviews
    .map(
      (item, index) => `
        <article class="review-item">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
          <div class="review-tags" aria-label="错因标签">
            ${errorTags
              .filter((tag) => tag.type === item.type || reviewTags(item).includes(tag.id))
              .map(
                (tag) => `
                  <button class="${reviewTags(item).includes(tag.id) ? "active" : ""}" type="button" data-review-index="${index}" data-review-tag="${tag.id}">
                    ${tag.label}
                  </button>
                `
              )
              .join("")}
          </div>
          <div>
            <button type="button" data-jump-review="${index}">再练同类</button>
            <button type="button" data-remove-review="${index}">移出</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-jump-review]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.savedReviews[Number(button.dataset.jumpReview)];
      document.getElementById("practiceSelect").value = item.type;
      renderPractice(item.type);
      document.getElementById("practice").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-review-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      const review = state.savedReviews[Number(button.dataset.reviewIndex)];
      review.tags = [...reviewTags(review)];
      if (review.tags.includes(button.dataset.reviewTag)) {
        review.tags = review.tags.filter((tag) => tag !== button.dataset.reviewTag);
      } else {
        review.tags.push(button.dataset.reviewTag);
      }
      saveState();
      renderReviewQueue();
      renderMistakes();
      renderReport();
    });
  });

  document.querySelectorAll("[data-remove-review]").forEach((button) => {
    button.addEventListener("click", () => {
      state.savedReviews.splice(Number(button.dataset.removeReview), 1);
      saveState();
      renderReviewQueue();
      renderMistakes();
      renderReport();
    });
  });
}

function renderScoreTips() {
  const score = Number(state.targetScore);
  let band = "稳分";
  let tips = ["阅读每天限时，错题必须写出选项错因。", "作文保持清晰，不追求炫技句。", "语法填空先判断谓语数量。"];

  if (score >= 135) {
    band = "高分";
    tips = ["压缩阅读犹豫时间，主攻推断和主旨。", "续写用动作链制造画面，结尾克制回扣主题。", "每周至少两次完整限时输出。"];
  } else if (score < 110) {
    band = "补基";
    tips = ["优先拿稳词汇、语法填空和应用文。", "阅读先保细节题，不在难推断题上耗太久。", "每日复盘 3 个高频错因。"];
  }

  document.getElementById("scoreTips").innerHTML = `
    <div class="score-band">${score} 分目标 · ${band}策略</div>
    <ul>${tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
  `;
}

function updateDraftCount() {
  const draft = document.getElementById("writingDraft").value.trim();
  const words = draft ? draft.split(/\s+/).filter(Boolean).length : 0;
  document.getElementById("draftCount").textContent = `${words} words`;
}

document.getElementById("targetScore").value = state.targetScore;
document.getElementById("targetScore").addEventListener("input", (event) => {
  state.targetScore = event.target.value;
  saveState();
  renderScoreTips();
  renderScoreBlueprint();
  renderWeeklyPlan();
});

document.getElementById("weeklyIntensity").addEventListener("change", (event) => {
  state.weeklyIntensity = event.target.value;
  saveState();
  renderWeeklyPlan();
});

document.getElementById("refreshWeeklyPlan").addEventListener("click", () => {
  state.weeklyDone = {};
  saveState();
  renderWeeklyPlan();
});

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.classList.toggle("active", button.dataset.plan === state.plan);
  button.addEventListener("click", () => {
    state.plan = button.dataset.plan;
    state.phase = plans[state.plan][0][1];
    saveState();
    document.querySelectorAll("[data-plan]").forEach((item) => item.classList.toggle("active", item === button));
    renderPlan();
  });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const prompt = writingPrompts().find((item) => promptMode(item) === tab.dataset.tab);
    if (prompt) {
      state.writingPromptId = prompt.id;
      saveState();
      renderWritingPromptSelect();
      renderWritingPrompt();
      renderWritingChecklist();
    } else {
      setActiveWritingTab(tab.dataset.tab);
    }
  });
});

document.getElementById("writingPromptSelect").addEventListener("change", (event) => {
  state.writingPromptId = event.target.value;
  saveState();
  renderWritingPrompt();
  renderWritingChecklist();
});

document.querySelectorAll(".library-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".library-tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderLibrary(tab.dataset.library);
  });
});

document.getElementById("practiceSelect").innerHTML = modules
  .map((module) => `<option value="${module.id}">${module.title}</option>`)
  .join("");
document.getElementById("practiceSelect").addEventListener("change", (event) => renderPractice(event.target.value));

document.getElementById("timerToggle").addEventListener("click", () => {
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
    document.getElementById("timerToggle").textContent = "继续";
    return;
  }

  document.getElementById("timerToggle").textContent = "暂停";
  timerHandle = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    document.getElementById("timerDisplay").textContent = formatTime(timerSeconds);
    if (timerSeconds === 0) {
      clearInterval(timerHandle);
      timerHandle = null;
      document.getElementById("timerToggle").textContent = "开始";
    }
  }, 1000);
});

document.getElementById("timerReset").addEventListener("click", () => {
  const { item } = getPracticeItem(currentPracticeType);
  setTimer(item.time);
});

document.getElementById("mockStart").addEventListener("click", () => {
  if (mockTimerHandle) {
    clearInterval(mockTimerHandle);
    mockTimerHandle = null;
    document.getElementById("mockStart").textContent = "继续";
    return;
  }

  document.getElementById("mockStart").textContent = "暂停";
  mockTimerHandle = setInterval(() => {
    mockSeconds = Math.max(0, mockSeconds - 1);
    setMockTimer(mockSeconds);
    if (mockSeconds === 0) {
      clearInterval(mockTimerHandle);
      mockTimerHandle = null;
      document.getElementById("mockStart").textContent = "开始";
      submitMockExam();
    }
  }, 1000);
});

document.getElementById("mockSubmit").addEventListener("click", () => {
  clearInterval(mockTimerHandle);
  mockTimerHandle = null;
  document.getElementById("mockStart").textContent = "开始";
  submitMockExam();
});

document.getElementById("mockResetExam").addEventListener("click", () => {
  resetActiveMockExam();
});

document.getElementById("mockExamSelect").addEventListener("change", (event) => {
  state.activeMockExamId = event.target.value;
  state.mockQuestionIndex = 0;
  saveState();
  resetMockTimerForExam();
  renderMockQuestion();
  renderMockStoredReport();
});

document.getElementById("vocabSearch").addEventListener("input", (event) => renderVocab(event.target.value));

document.getElementById("writingDraft").value = state.draft;
document.getElementById("writingDraft").addEventListener("input", (event) => {
  state.draft = event.target.value;
  saveState();
  updateDraftCount();
});
document.getElementById("clearDraft").addEventListener("click", () => {
  document.getElementById("writingDraft").value = "";
  state.draft = "";
  saveState();
  updateDraftCount();
});

document.getElementById("saveDraft").addEventListener("click", () => {
  const text = document.getElementById("writingDraft").value.trim();
  const prompt = currentWritingPrompt();
  if (!text || !prompt) {
    return;
  }

  const scoreDetail = writingScoreDetail();
  state.draftHistory = [
    {
      date: new Date().toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
      title: prompt.title,
      promptId: prompt.id,
      mode: currentWritingMode(),
      words: text.split(/\s+/).filter(Boolean).length,
      score: scoreDetail.score,
      band: scoreDetail.band,
      issues: scoreDetail.missing.map((item) => item.label),
      next: scoreDetail.next,
      text,
    },
    ...state.draftHistory,
  ].slice(0, 5);
  saveState();
  renderDraftHistory();
});

document.getElementById("mistakeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("mistakeTitle");
  const text = document.getElementById("mistakeText");
  state.mistakes.push({ title: title.value, text: text.value });
  title.value = "";
  text.value = "";
  saveState();
  renderMistakes();
  renderReport();
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderTasks();
renderPlan();
renderModules();
renderCalendar();
renderPrescription();
renderScoreBlueprint();
renderWeeklyPlan();
renderLibrary();
renderWriting("practical");
initWritingLab();
renderVocab();
renderMistakes();
renderPractice("reading");
renderMockExamSelect();
resetMockTimerForExam();
renderMockQuestion();
renderMockStoredReport();
renderReport();
renderReviewQueue();
renderScoreTips();
updateDraftCount();
