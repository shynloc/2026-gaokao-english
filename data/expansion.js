window.E26_EXPANSION = {
  practiceExpansion: {
    reading: [
      {
        title: "阅读理解：因果辨析",
        time: 10,
        prompt:
          "A small town opened a weekend repair cafe. Instead of throwing away broken bikes, lamps and radios, people brought them to volunteers who taught basic repair skills. The cafe soon became popular because residents saved money and learned to value old things.",
        question: "Why did the repair cafe become popular?",
        options: ["It helped people save money and learn skills.", "It sold new bikes every weekend.", "It asked residents to throw things away.", "It replaced all local shops."],
        answer: 0,
        explain: "because 后直接给出原因：saved money and learned to value old things。",
      },
      {
        title: "阅读理解：观点态度",
        time: 10,
        prompt:
          "Online courses cannot replace every classroom experience. However, for students in remote villages, they provide access to teachers and subjects that were once unavailable.",
        question: "What is the writer's attitude toward online courses?",
        options: ["Balanced but positive", "Completely opposed", "Unrelated", "Angry and doubtful"],
        answer: 0,
        explain: "cannot replace every classroom experience 是保留，However 后强调积极价值，态度是 balanced but positive。",
      },
      {
        title: "阅读理解：细节同义改写",
        time: 10,
        prompt:
          "During the school clean-up week, students were not asked simply to pick up litter. Each class also recorded the types of waste they found and discussed how to reduce them at the source.",
        question: "What did students do besides collecting litter?",
        options: ["They analyzed the waste and discussed prevention.", "They cancelled all school activities.", "They bought new cleaning tools online.", "They asked other schools to do the work."],
        answer: 0,
        explain: "recorded the types of waste 和 discussed how to reduce them 对应 analyzed waste and discussed prevention。",
        evidence: "Each class also recorded the types of waste they found and discussed how to reduce them at the source.",
        trap: "B、C、D 都把原文没有出现的动作强加进去，属于无中生有。",
        method: "先锁 besides collecting litter，再找 also 后面的并列动作。",
        errorTags: ["evidence", "scope"],
      },
      {
        title: "阅读理解：推断人物品质",
        time: 10,
        prompt:
          "Mia failed to win the speaking contest, but she stayed after the event to help collect chairs and encouraged the younger students who were too nervous to perform.",
        question: "What can we infer about Mia?",
        options: ["She is responsible and supportive.", "She is careless about contests.", "She dislikes younger students.", "She wants to avoid public speaking forever."],
        answer: 0,
        explain: "赛后留下帮忙和鼓励低年级同学共同指向 responsible and supportive。",
        evidence: "stayed after the event to help collect chairs and encouraged the younger students",
        trap: "failed to win 只能说明没获奖，不能推出 careless 或 avoid public speaking。",
        method: "推断题不要过度延伸，把多个行为合并成稳定品质。",
        errorTags: ["evidence"],
      },
    ],
    seven: [
      {
        title: "七选五：承上启下",
        time: 8,
        prompt:
          "Keeping a mistake notebook is useful, but the notebook should not become a place for copying answers. ______ Then you can return to the same thinking process before the next test.",
        question: "选择最合适的句子填入空格。",
        options: ["It should record why you made the wrong choice.", "It should be kept closed forever.", "Every answer should be written in red.", "Tests are always easy."],
        answer: 0,
        explain: "后文 same thinking process 指向记录错误思路，而不是只抄答案。",
      },
      {
        title: "七选五：段落主题",
        time: 8,
        prompt:
          "______. When you explain a problem to another person, you have to organize your own thoughts first. This often helps you find the part you did not understand.",
        question: "选择最合适的主题句。",
        options: ["Teaching others can improve your own learning.", "Sports make people stronger.", "Libraries should be quiet.", "Some questions have four choices."],
        answer: 0,
        explain: "explain a problem to another person 和 organize your own thoughts 都围绕 teaching others 展开。",
      },
      {
        title: "七选五：转折关系",
        time: 8,
        prompt:
          "Many students believe that doing more exercises is the fastest way to improve. ______ Without review, the same mistake may appear again in a different form.",
        question: "选择最合适的句子填入空格。",
        options: ["However, quantity alone is not enough.", "For example, exercise books are heavy.", "In this way, every test becomes shorter.", "Besides, mistakes never matter."],
        answer: 0,
        explain: "前句说 more exercises，后句强调 Without review 的问题，中间需要转折：数量不等于效果。",
        evidence: "Without review, the same mistake may appear again in a different form.",
        trap: "B 只抓 exercise books 的字面联想，和学习逻辑无关。",
        method: "先判断空后是否反驳空前观点；若反驳，优先找 However / Yet 类选项。",
        errorTags: ["logic"],
      },
      {
        title: "七选五：代词指代",
        time: 8,
        prompt:
          "Before writing a continuation, read the last paragraph again and list the key object, emotion and conflict. ______ This will prevent your new plot from leaving the original story.",
        question: "选择最合适的句子填入空格。",
        options: ["They are the anchors of the next paragraph.", "It is always better to write as many words as possible.", "Objects are usually made in factories.", "Conflicts should be deleted from stories."],
        answer: 0,
        explain: "They 指代 key object, emotion and conflict，anchors 呼应 prevent leaving the original story。",
        evidence: "list the key object, emotion and conflict",
        trap: "B 把续写质量偷换成字数；C 只抓 object 字面意思。",
        method: "看到代词选项时，回看空前名词串，检查单复数和语义能否接上。",
        errorTags: ["logic", "plot"],
      },
    ],
    cloze: [
      {
        title: "完形填空：人物变化",
        time: 8,
        prompt:
          "At the beginning, I was afraid to ask questions. But after my partner listened patiently and smiled, I became more ______ and raised my hand.",
        question: "选择最符合语境的词。",
        options: ["confident", "careless", "silent", "absent"],
        answer: 0,
        explain: "But 后出现 listened patiently and smiled，人物由害怕转向敢举手，confident 最合适。",
      },
      {
        title: "完形填空：动作推进",
        time: 8,
        prompt:
          "The little boy noticed the old ticket on the ground. He picked it up, looked around, and ______ toward the woman who was searching her bag anxiously.",
        question: "选择最符合语境的词。",
        options: ["walked", "slept", "complained", "hid"],
        answer: 0,
        explain: "picked it up, looked around 后应接一个帮助寻找失主的动作，walked toward 最自然。",
      },
      {
        title: "完形填空：语境复现",
        time: 8,
        prompt:
          "The coach did not praise us with big words. Instead, he wrote one short sentence on the board: \"Progress is built one step at a time.\" Those words became our ______ during the difficult season.",
        question: "选择最符合语境的词。",
        options: ["guide", "noise", "secret", "excuse"],
        answer: 0,
        explain: "one step at a time 在困难赛季中起引导作用，guide 最贴合。",
        evidence: "Progress is built one step at a time.",
        trap: "secret 和 excuse 都无法解释 became our 后的积极作用。",
        method: "完形遇到抽象名词时，看前文一句话在后文中的功能。",
        errorTags: ["context"],
      },
      {
        title: "完形填空：情绪线索",
        time: 8,
        prompt:
          "I almost gave up when the model bridge fell apart again. Then my teammate quietly placed the pieces in order and said, \"Let's try one more time.\" Her calm voice made me feel ______.",
        question: "选择最符合语境的词。",
        options: ["encouraged", "jealous", "careless", "lonely"],
        answer: 0,
        explain: "teammate 的 calm voice 和 try one more time 让情绪从想放弃转为被鼓励。",
        evidence: "Let's try one more time.",
        trap: "jealous、careless、lonely 都没有上下文支撑。",
        method: "先画出情绪起点 almost gave up，再看转折后同伴行为带来的变化。",
        errorTags: ["context"],
      },
    ],
    grammar: [
      {
        title: "语法填空：非谓语主动",
        time: 8,
        prompt:
          "The students stood by the river, ______ (discuss) how to design a poster about water protection.",
        question: "选择括号内单词的正确形式。",
        options: ["discussing", "discussed", "to be discussed", "were discussing"],
        answer: 0,
        explain: "句子已有谓语 stood，students 与 discuss 是主动关系，用 discussing 作伴随状语。",
      },
      {
        title: "语法填空：名词单复数",
        time: 8,
        prompt:
          "The project gave students many ______ (chance) to work with people from different communities.",
        question: "选择括号内单词的正确形式。",
        options: ["chances", "chance", "chanced", "chancing"],
        answer: 0,
        explain: "many 后接可数名词复数，chance 应变为 chances。",
      },
      {
        title: "语法填空：谓语时态",
        time: 8,
        prompt:
          "Since 2023, the reading club ______ (organize) more than twenty book-sharing activities for local children.",
        question: "选择括号内单词的正确形式。",
        options: ["has organized", "organized", "organizes", "is organizing"],
        answer: 0,
        explain: "Since 2023 与 more than twenty activities 表示从过去持续到现在，用现在完成时。",
        evidence: "Since 2023",
        trap: "organized 只表示过去动作，不能体现持续到现在。",
        method: "先圈时间状语，再判断动作是否从过去延续到现在。",
        errorTags: ["predicate"],
      },
      {
        title: "语法填空：词性转换",
        time: 8,
        prompt:
          "The volunteer explained the rules ______ (clear), so even the new members understood what to do.",
        question: "选择括号内单词的正确形式。",
        options: ["clearly", "clear", "clearness", "cleared"],
        answer: 0,
        explain: "空格修饰动词 explained，需要副词 clearly。",
        evidence: "explained the rules",
        trap: "clear 是形容词，不能直接修饰 explained。",
        method: "看空格修饰谁：修饰动词、形容词或整句，多用副词。",
        errorTags: ["wordform"],
      },
    ],
    practical: [
      {
        title: "应用文：道歉信",
        time: 12,
        prompt:
          "你原定周五参加外教组织的读书会，但因校队训练无法到场。请判断哪一句最适合作为道歉信主体。",
        question: "选择最合适的主体句。",
        options: ["I am sorry that I cannot attend the reading club because of team training, and I will ask a classmate for the notes.", "Reading is good.", "I like Fridays very much.", "Please never hold activities again."],
        answer: 0,
        explain: "道歉信要说明原因、表达歉意并给出补救办法，A 信息完整且语气得体。",
      },
      {
        title: "应用文：申请信",
        time: 12,
        prompt:
          "学校英语社招募志愿者接待交换生。你想申请，请判断哪一句最适合作为优势说明。",
        question: "选择最合适的句子。",
        options: ["I have experience in organizing school activities and can communicate clearly in English.", "I am busy every day.", "Exchange students are students.", "I do not like teamwork."],
        answer: 0,
        explain: "申请信要突出匹配岗位的能力和经历，A 同时说明组织经验和英语沟通能力。",
      },
    ],
    continuation: [
      {
        title: "读后续写：合理承接",
        time: 12,
        prompt:
          "原文结尾：女孩站在舞台边，手里紧紧攥着写满修改痕迹的演讲稿，听到主持人叫到她的名字。",
        question: "哪一句最适合作为续写开头？",
        options: ["She took a slow breath, unfolded the paper, and stepped into the light.", "Ten years later, she became a scientist.", "The chair was made of wood.", "Everyone went shopping."],
        answer: 0,
        explain: "续写开头要承接舞台、演讲稿和紧张情境，A 用动作自然推进。",
      },
      {
        title: "读后续写：情绪转化",
        time: 12,
        prompt:
          "主角误会朋友没有帮自己，后来发现朋友默默完成了最难的部分。",
        question: "哪一句最能体现情绪转化？",
        options: ["His anger melted into shame as he saw the carefully finished work on the desk.", "The desk was large.", "He bought a ticket.", "Friends are people."],
        answer: 0,
        explain: "anger melted into shame 明确体现情绪变化，并用 finished work 承接情节。",
      },
    ],
    vocab: [
      {
        title: "词汇短语：科技主题",
        time: 6,
        prompt:
          "主题：科技与学习。目标：表达“让学生接触更多学习资源”。",
        question: "选择最自然的表达。",
        options: ["give students access to more learning resources", "open students to more things", "make resources much student", "touch resources for students"],
        answer: 0,
        explain: "give sb. access to sth. 是表达“让某人获得/接触某物”的自然搭配。",
      },
      {
        title: "词汇短语：团队合作",
        time: 6,
        prompt:
          "主题：团队合作。目标：表达“共同努力”。",
        question: "选择最自然的表达。",
        options: ["with joint efforts", "with together powers", "by many hands only", "use group strong"],
        answer: 0,
        explain: "with joint efforts 可用于活动总结、续写结尾和应用文倡议。",
      },
    ],
    listening: [
      {
        title: "听力通用：价格变化",
        time: 6,
        prompt:
          "Man: The notebook usually costs twelve dollars, but it is three dollars cheaper today.",
        question: "How much is the notebook today?",
        options: ["3 dollars", "9 dollars", "12 dollars", "15 dollars"],
        answer: 1,
        explain: "twelve dollars 减 three dollars cheaper，今天是 9 dollars。",
      },
      {
        title: "听力通用：说话人关系",
        time: 6,
        prompt:
          "Woman: Please hand in your lab report before Friday. Man: Sure, Professor. I will revise the conclusion tonight.",
        question: "What is the probable relationship between the speakers?",
        options: ["Teacher and student", "Doctor and patient", "Waiter and customer", "Driver and passenger"],
        answer: 0,
        explain: "lab report, Professor, revise the conclusion 指向师生关系。",
      },
    ],
  },
  vocabExtra: [
    "give students access to",
    "build confidence through practice",
    "learn from repeated mistakes",
    "respond calmly to pressure",
    "take a practical step",
    "turn a setback into a lesson",
    "show respect for different cultures",
    "keep the original promise",
  ],
  libraryExtra: {
    checklist: [
      {
        title: "模拟卷复盘清单",
        tag: "Mock Review",
        items: ["先看未答题，再看答错题。", "每道错题只写一个最主要错因。", "把最高频错因转成下一次训练任务。"],
      },
    ],
    writing: [
      {
        title: "续写承接句",
        tag: "Continuation",
        items: ["For a moment, he could not move a step.", "The words stayed in her mind long after the door closed.", "With the old note in his hand, he finally understood what he should do."],
      },
      {
        title: "应用文收束句",
        tag: "Practical",
        items: ["I would appreciate it if you could consider my suggestion.", "Hopefully, these ideas will make your preparation easier.", "Your participation would mean a lot to us."],
      },
    ],
    grammar: [
      {
        title: "动词空快速问答",
        tag: "Verb",
        items: ["句子有没有谓语？", "空格和逻辑主语是主动还是被动？", "有没有明显时间状语决定时态？"],
      },
    ],
    timeline: [
      {
        title: "周末复盘节奏",
        tag: "Weekend",
        items: ["上午做一套微型卷。", "下午只处理错因前三名。", "晚上重写一段作文或整理 8 个词块句。"],
      },
    ],
  },
};
