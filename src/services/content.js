export default {
  utils: {
    servers: {
      en: {
        'wefindx.io': 'Shanghai',
        'wefindx.com': 'Dublin',
        'globalmindshare.org': 'Virginia',
        '0.0.0.0:8000': 'Local Fun'
      },
      cn: {
        'wefindx.io': '上海',
        'wefindx.com': '都柏林',
        'globalmindshare.org': '弗吉尼亚',
        '0.0.0.0:8000': '本地乐趣'
      },
      ru: {
        'wefindx.io': 'Шанхай',
        'wefindx.com': 'Дублин',
        'globalmindshare.org': 'Виргиния',
        '0.0.0.0:8000': 'Песочница'
      },
      lt: {
        'wefindx.io': 'Šanchajus',
        'wefindx.com': 'Dublinas',
        'globalmindshare.org': 'Virdžinija',
        '0.0.0.0:8000': 'Vietinis'
      },
      ja: {
        'wefindx.io': '上海',
        'wefindx.com': 'ダブリン',
        'globalmindshare.org': 'バージニア',
        '0.0.0.0:8000': 'ローカル'
      }
    }
  },
  how: {
    en: [
      '<h1 class="en">How does this place work?</h1>',
      '<p>You <a href="/#/page/otp">sign in</a>, and then post topics; read, comment and transact.</p>',
      "<h2>Can't sign-in, what do I do?</h2>",
      "You send an e-mail to <b>team@wefindx.org</b>. We'll get back to you shortly.</p>"
    ],
    cn: [
      '<h1 class="en">这个地方如何操作？</h1>',
      '<p>您<a href="/#/page/otp">登录</a>，然后发布主题; 阅读，评论和交易。</p>',
      '<h2>我不能登录怎么办？</h2>',
      '您发送电子邮件至<b>team@wefindx.org</b>。 我们很快就会回复你。</p>'
    ]
  },
  what: {
    // 'lt': [
    //   '<h1 class="zh">Kas tai?</h1>',
    // ],
    // 'ru': [
    //   '<h1 class="zh">Что это такое?</h1>'
    // ],
    // 'cn': [
    //   '<h1 class="zh">这什么是？</h1>'
    // ],
    en: [
      '<h1 class="en">What is this?</h1>',
      '<p>Infinity is a communal database of Needs, Goals, Ideas, Plans, their Steps and Tasks, with Comments to discuss them and track investments of Time into creation of Assets, and Monetary Transactions to gain transferrable tokens representing the created Assets.</p>',
      "We're a community of thinkers, innovators, investors and doers, with an over-arching goals of empowering life to decide its own destiny.",

      '<h2>How does Infinity work?</h2>',
      'Infinity relies on two major models -- Topic, and Comment, to decompose knowledge. Both are just content items that people can create by providing <i>title</i> and <i>body</i>, or <i>text</i>. Topics have 6 major categories: <i>Need, Goal, Idea, Plan, Step, Task</i>, and Comments have time accounting feature, and <i>Transactions</i>, so that people can invest time and money into creation together, and share returns.',
      '<h2>What are Needs? Why do we need them?</h2>',
      'Needs are acceptance conditions for goals. A goal is not achievable, if it does not have conditions that can be satisfied. So, Needs are created and linked automatically if you provide the acceptance conditions in the goals as bullet points with tag [Need].',
      '<h2>What is a Goal?</h2>',
      'A goal is a set of conditions that we want to satisfy. We use natural language to define goals, simply as a type of Topics, that have title and body, and enumerate possible acceptance conditions by making bullet points with tag [Need].',
      '<h2>What qualifies as an Idea?</h2>',
      'Any solution describing a new principle of how it would work. So, ask yourself - (1) can you describe how it would work? (2) is this something new in principle? If answer to both questions is "yes," go ahead, describe, what circumstances this idea would apply to, and how it would work, and what would be the expected outcome. What change would the idea bring about?',

      '<h2>What is a Plan?</h2>',
      'A plan is a sequence of Steps that you set out to take to realize Ideas and achieve a Goals. To specify Goals, Ideas, and Steps, just use tags [Goal], [Idea], [Step] in the text of the Plan.',
      '<h2>Why do we need Steps?</h2>',
      'Steps divide a Plan into measurable parts. For step you can define [Input] and [Output] attributes, in form of <a href="https://github.com/wefindx/StepIO#stepio">StepIO</a> syntax, allowing for automatic estimation of asset risk, and returns on investment. Adding Steps also helps everyone divide the large project into manageable chunks.',
      '<h2>What is a Task?</h2>',
      'A Task is a little chunk of work that is easy enough for a doer to complete without further dividing into smaller chunks. Naturally, it is a matter of subjective perception of a doer. Use Tasks for documenting any ad-hoc initiatives, even if they are not linked to anything - you can link them later.',
      "<h2>I'd like to share a global problem. How would I do it?</h2>",
      'Convert your problem into a goal, and write a Goal. For example, problem "we don\'t have enough of X" could be converted into a goal "get enough of X".',
      '<h2>Why would I have to convert a problem into a Goal? I feel problems more natural to describe than goals.</h2>',
      'That is to keep positive a positive mindset, we like thinking dreams, rather than the status quo. If you need to include the status quo, include it into the description of the goal as an introduction, and then formulate the goal.',

      '<h2>I have a goal of finding an ideal partner, does that qualify?</h2>',
      'We\'re not a match-making service, but if you think the world has this problem, define it as a general goal to "Improve Partner Discovery," and describe it in general (i.e., <i>many people find it difficult to find an ideal partner,...</i>). Doing so, you definitely can include that as a goal. Before adding a new goal, check if such goal does not exist in the database yet, and include the acceptance conditions in bullet points.',

      '<h2>I have an idea to start a business to make cookies. Does this qualify as an idea?</h2>',
      "No, althought you might be able to describe how it would work, however, many had idea of doing business making cookies, so, it's not something new in principle. Consider creating a Plan, and link it to two [Existing] ideas.",
      '<h2>But my idea of a business to make cookies, is a new way to deliver nootropics. Would that qualify?</h2>',
      "If the idea of - the cookies business - is a solution to a problem that nobody had thought of for the domain, it's definitely something new in principle. Make sure to give a proper title to your innovation, and add it to the database.",
      '<h2>Can I link an idea that is not new?</h2>',
      'Sure, but make sure to include keyword [Existing], follwed by source in the description, that will make it clear that the idea is taken from somewhere else, but, this will still enable to create Plan under it, and work on it.',
      '<h2>I found a related idea somewhere already, how can I add a link?</h2>',
      'Just write a comment about it, include tag [Link]. This will make the comment appear in the special section for links.',
      '<h2>What if I claimed too much time in one comment, and now want to divide it into Steps?</h2>',
      'Use keyword [Step] inside the comment to divide time claims into bulleted enumeration of parts. This will create Steps, and a visual links to the original comment at the top of each Step, allowing for further dicussion about each of the steps within the Comment.',

      '<h2>Time claims? What are they?</h2>',
      '<h2>How do you make sure that tracked records about time and assets are not tampered with?</h2>',
      'We store time, money, and transaction data in a network of blockchaindb.',
      '<h2>What kind of rights does monetary transactions give to?</h2>',
      '<h2>Who manages the database?</h2>',
      '<h2>What Infinity is not?</h2>',
      '<h2>So, who is behind this??</h2>',
      'People and organizations like you. Among early contributors - people Mindey, Ruta, Aliev, and organizations WeFindX, Global Mind Share, [a couple more?]. Collectively, we are a global family of individuals and organizations - the Infinity Family, and we are welcoming you to join it too.'
    ]
  }
};
