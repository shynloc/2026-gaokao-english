window.E26_CONTENT = {
  mockExam: {
    title: "新高考英语微型模拟卷",
    duration: 45,
    sections: [
      {
        id: "reading",
        title: "阅读理解",
        score: 20,
        questions: [
          {
            id: "r1",
            prompt:
              "A school launched a peer-reading program. Senior students volunteered to read with younger students twice a week. Teachers found that younger students became more willing to ask questions, while senior students learned to explain ideas more clearly.",
            question: "What is one benefit of the peer-reading program?",
            options: ["It reduces all homework.", "It helps both younger and senior students.", "It replaces teachers completely.", "It focuses only on tests."],
            answer: 1,
            explain: "younger students became more willing，senior students learned to explain ideas，说明双方受益。",
          },
          {
            id: "r2",
            prompt:
              "The museum's new night opening is designed for families who cannot visit during the day. Tickets are cheaper after 6 p.m., and volunteers guide children through the science hall.",
            question: "Why does the museum open at night?",
            options: ["To support families with daytime limits", "To close the science hall", "To stop volunteers from working", "To make tickets more expensive"],
            answer: 0,
            explain: "for families who cannot visit during the day 与 daytime limits 对应。",
          },
        ],
      },
      {
        id: "gap",
        title: "七选五",
        score: 10,
        questions: [
          {
            id: "g1",
            prompt:
              "A good study plan should be realistic. ______ If the plan is too full, you may give up after two days.",
            question: "选择最合适的句子填入空格。",
            options: ["It should leave room for rest and review.", "Every student should sleep less.", "Plans are never useful.", "The weather is hard to predict."],
            answer: 0,
            explain: "后文 too full 和 give up 说明计划要留出休息复习空间。",
          },
          {
            id: "g2",
            prompt:
              "When you review a mistake, do not only copy the correct answer. ______ This helps you avoid repeating the same thinking error.",
            question: "选择最合适的句子填入空格。",
            options: ["Write down why your original choice was wrong.", "Close your notebook immediately.", "Choose the longest option next time.", "Forget the question as soon as possible."],
            answer: 0,
            explain: "same thinking error 对应分析原选项为什么错。",
          },
        ],
      },
      {
        id: "grammar",
        title: "语言运用",
        score: 20,
        questions: [
          {
            id: "gr1",
            prompt:
              "The reading room, ______ was rebuilt last year, is now open to all students on weekends.",
            question: "选择合适的关系词。",
            options: ["which", "where", "when", "why"],
            answer: 0,
            explain: "非限制性定语从句，先行词 reading room 指物，空格在从句中作主语，用 which。",
          },
          {
            id: "gr2",
            prompt:
              "Students are encouraged ______ (share) useful learning methods with classmates.",
            question: "选择括号内单词的正确形式。",
            options: ["sharing", "shared", "to share", "share"],
            answer: 2,
            explain: "be encouraged to do sth. 表示被鼓励做某事。",
          },
        ],
      },
      {
        id: "writing",
        title: "写作任务",
        score: 20,
        writing: true,
        prompt:
          "假定你是李华，你校英文报正在征集“考前如何保持稳定心态”的短文。请写一段 80-120 词的英文草稿，内容包括：1. 一个具体做法；2. 这样做的原因；3. 给同学的鼓励。",
        rubric: ["任务要点完整", "建议具体可执行", "表达自然准确", "结尾有鼓励但不过度空泛"],
      },
    ],
  },
  sprintCalendar: [
    {
      day: 1,
      focus: "阅读定位 + 语法谓语",
      minutes: 70,
      tasks: ["阅读细节题 2 篇，写出定位句", "语法填空动词空 10 题", "复盘 2 个选项偷换点"],
      output: "整理一张“阅读定位证据表”。",
    },
    {
      day: 2,
      focus: "七选五逻辑 + 词块调用",
      minutes: 65,
      tasks: ["七选五 2 组，标注承上/启下/转折", "主题词块造句 8 句", "把 3 个词块写进应用文句子"],
      output: "形成一组可直接迁移到作文的词块句。",
    },
    {
      day: 3,
      focus: "完形情绪线 + 续写动作链",
      minutes: 75,
      tasks: ["完形 1 篇，画出人物情绪变化", "续写动作句仿写 6 句", "改写一段直白情绪描写"],
      output: "积累 6 个动作推动情节的句子。",
    },
    {
      day: 4,
      focus: "应用文场景 + 从句连接",
      minutes: 70,
      tasks: ["应用文建议信/邀请信各列提纲", "从句连接词速查 15 分钟", "写一封 100 词邮件"],
      output: "完成一篇应用文草稿并按清单自查。",
    },
    {
      day: 5,
      focus: "听力转折 + 阅读推断",
      minutes: 60,
      tasks: ["听力转折/数字信息专项 15 题", "阅读推断题 8 题", "记录 3 个误判原因"],
      output: "更新错题标签：转折漏听、过度推断、范围扩大。",
    },
    {
      day: 6,
      focus: "微型模拟卷 + 分项复盘",
      minutes: 90,
      tasks: ["完成一套微型模拟卷", "查看模拟报告", "把错题加入收藏回炉"],
      output: "写出下一轮最该补的 1 个题型。",
    },
    {
      day: 7,
      focus: "错题回炉 + 写作定型",
      minutes: 80,
      tasks: ["回炉本周收藏题", "复述 5 条错误原因", "重写一段续写结尾"],
      output: "形成下周第一天任务清单。",
    },
  ],
  writingLab: {
    prompts: [
      {
        id: "advice",
        type: "应用文",
        title: "给朋友的学习建议",
        prompt:
          "你的英国朋友 Alex 最近准备中文演讲，来信说自己很紧张。请你写一封邮件，给出两条具体建议，并表达鼓励。",
        target: "80-120 词",
        mustHave: ["说明写信目的", "至少两条具体建议", "自然鼓励"],
      },
      {
        id: "notice",
        type: "应用文",
        title: "读书分享会通知",
        prompt:
          "你校英语社将举办一次英文读书分享会，请你写一则通知，说明时间地点、活动内容和报名方式。",
        target: "80 词左右",
        mustHave: ["时间地点", "活动内容", "参与/报名方式"],
      },
      {
        id: "continuation-kindness",
        type: "读后续写",
        title: "陌生人的善意",
        prompt:
          "原文情境：主角在雨中错过公交，准备放弃参加比赛。一位陌生人停下车，递来一把伞，并问他是否需要帮助。请续写接下来的情节。",
        target: "两段续写",
        mustHave: ["承接原文困境", "动作推动情节", "结尾回扣善意与勇气"],
      },
      {
        id: "continuation-teamwork",
        type: "读后续写",
        title: "接力赛前的失误",
        prompt:
          "原文情境：接力赛前，队员发现接力棒不见了，所有人都看向负责保管的男孩。请续写他如何面对问题并解决冲突。",
        target: "两段续写",
        mustHave: ["人物情绪变化", "团队协作", "合理解决冲突"],
      },
    ],
    checklist: [
      { id: "task", label: "任务要点完整，没有遗漏关键信息", weight: 25 },
      { id: "logic", label: "段落逻辑清楚，句子之间有自然衔接", weight: 20 },
      { id: "language", label: "表达准确，基本没有影响理解的语法错误", weight: 25 },
      { id: "specific", label: "建议、动作或情节足够具体，不空泛", weight: 20 },
      { id: "tone", label: "语气符合文体，结尾自然克制", weight: 10 },
    ],
  },
};
