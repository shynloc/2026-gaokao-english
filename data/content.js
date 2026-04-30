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
};
