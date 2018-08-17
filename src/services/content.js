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
      "You send an e-mail to <b>team@wefindx.org</b>. We'll get back to you shortly.</p>",
      '<h2>I need a tutorial.</h2>',
      'Check out the <a href="https://wefindx.org/static/media/inf.mp4">video tutorial</a>.</p>'
    ],
    cn: [
      '<h1 class="en">这个地方如何操作？</h1>',
      '<p>您<a href="/#/page/otp">登录</a>，然后发布主题; 阅读，评论和交易。</p>',
      '<h2>我不能登录怎么办？</h2>',
      '您发送电子邮件至<b>team@wefindx.org</b>。 我们很快就会回复你。</p>',
      '<h2>我需要一个教程</h2>',
      '欢迎查看<a href="https://wefindx.io/static/tmp/inf.mp4">视频教程</a>。</p>'
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
    en: `<h1 class="en">What is this?</h1>

      <p>Infinity is a communal database of Needs, Goals, Ideas, Plans, their Steps and Tasks, with Comments to discuss them and track investments of Time into creation of Assets, and Monetary Transactions to gain transferrable tokens representing the created Assets.</p>
      We're a community of thinkers, innovators, investors and doers, with an over-arching goals of empowering life to decide its own destiny. It is a public space for discussing world's issues, thinking and sharing ideas how to solve them, initiating projects based on those ideas, and funding them, as well as managing their execution, while sharing the process with with world in public, so that people can understand how the work is done, and learn the procedural knowledge, as well as fund that pursuit through creating a market of data and goods. It's a full package to make sense of the world, and run an independent economy.

      <h2>How does Infinity work?</h2>
      Infinity relies on two major models -- Topic, and Comment, to decompose knowledge. Both are just content items that people can create by providing <i>title</i> and <i>body</i>, or <i>text</i>. Topics have 6 major categories: <i>Need, Goal, Idea, Plan, Step, Task</i>, and Comments have time accounting feature, and <i>Transactions</i>, so that people can invest time and money into creation together, and share returns.

      <h2>What are Needs? Why do we need them?</h2>
      Needs are acceptance conditions for goals. A goal is not achievable, if it does not have conditions that can be satisfied. In the future, Needs will be created and linked automatically if you provide the acceptance conditions in the goals as bullet points with tag [Need].

      <h2>What is a Goal?</h2>
      A goal is a set of conditions that we want to satisfy. We use natural language to define goals, simply as a type of Topics, that have title and body, and enumerate possible acceptance conditions by making bullet points with tag [Need].

      <h2>What qualifies as an Idea?</h2>
      Any solution describing a new principle of how it would work. So, ask yourself - (1) can you describe how it would work? (2) is this something new in principle? If answer to both questions is "yes," go ahead, describe, what circumstances this idea would apply to, and how it would work, and what would be the expected outcome. What change would the idea bring about?

      <h2>What is a Plan?</h2>
      A plan is a sequence of Steps that you set out to take to realize Ideas and achieve a Goals. To specify Goals, Ideas, and Steps, just use tags [Goal], [Idea], [Step] in the text of the Plan.

      <h2>Why do we need Steps?</h2>
      Steps divide a Plan into measurable parts. In the future, we'll be able to define [Input] and [Output] attributes for steps in form of <a href="https://github.com/wefindx/StepIO#stepio">StepIO</a> syntax, allowing for automatic estimation of asset risk, and returns on investment. Adding Steps also helps everyone divide the large project into manageable chunks.

      <h2>What is a Task?</h2>
      A Task is a little chunk of work that is easy enough for a doer to complete without further dividing into smaller chunks. Naturally, it is a matter of subjective perception of a doer. Use Tasks for documenting any ad-hoc initiatives, even if they are not linked to anything - you can link them later.

      <h2>I'd like to share a global problem. How would I do it?</h2>
      Convert your problem into a goal, and write a Goal. For example, problem "we don\'t have enough of X" could be converted into a goal "get enough of X".

      <h2>Why would I have to convert a problem into a Goal? I feel problems more natural to describe than goals.</h2>
      That is to keep positive a positive mindset, we like thinking dreams, rather than the status quo. If you need to include the status quo, include it into the description of the goal as an introduction, and then formulate the goal.

      <h2>I have a goal of finding an ideal partner, how do I proceed?</h2>
      Define it as a general goal to "Improve Partner Discovery," and describe it in general (i.e., <i>many people find it difficult to find an ideal partner,...</i>). Reframing personal problems as world's general ones is a perfect source of incentive to innovate. Before adding a new goal, check if such goal does not exist in the database yet, and include the acceptance conditions in bullet points.

      <h2>I have an idea to start a business to make cookies. Does this qualify as an idea?</h2>
      No, althought you might be able to describe how it would work, however, many had idea of doing business making cookies, so, it's not something new in principle. Consider creating a Plan, and link it to two [Existing] ideas.

      <h2>But my idea is a new way to deliver nootropics. Would that qualify?</h2>
      If the is a solution to a problem that nobody had thought of for the domain, it's definitely something new in principle. Make sure to give a proper title to your innovation, and add it to the database.

      <h2>Can I link an idea that is not new?</h2>
      Yes, but make sure to include keyword [Existing], follwed by source in the description, that will make it clear that the idea is taken from somewhere else, but, this will still enable to create Plan under it, and work on it.

      <h2>I found a related idea somewhere already, how can I add a link?</h2>
      Just write a comment about it, include tag [Link]. This will make the comment appear in the special section for links.

      <h2>Time claims? What are they?</h2>
      Everytime you write a comment, you can include some text within curly braces (e.g., <b>{1.5}</b>). If there is a number within curly braces, it is considered and counted as claimed time. It means, that to create the work results you're describing in the comment at the current moment of time, you've required the number of hours within the curly braces. You can include it multiple times in a single comment, and it adds up to the total claimed time within the comment. Additionally, there is a way to claim future time, by adding question mark within the curly braces (e.g., <b>{?1.5}</b>), which implies that this is not yet used time, and it is the estimate of the future time needed to do the things listed within the comment. That is useful, when you're not willing to spend time yet, but just want to provide time estimates to your investors. This gives investors an option to invest into the time estimates, even if there is no actual work done, and secure the priviledge to be the first to receive shares, as soon as the work is done. You indicate the work that is done by updating the comment, and replacing the time claim with question mark into one without it. You can also do that fractionally and incrementally.

      <h2>What if I claimed too much time in one comment, and now want to divide it into Steps?</h2>
      In the future, you will be able to use keyword [Step] inside the comment to divide time claims into bulleted enumeration of parts. This will auto-create sub-Steps, and a visual links to the original comment at the top of each Step, allowing for further dicussion about each of the steps within the Comment.

      <h2>How do you make sure that tracked records about time and assets are not tampered with?</h2>
      We store time, money, and transaction data in a network of blockchaindb (BigChainDB). It is not production-ready yet, therefore, keep in mind, that there are no guaranetees yet.

      <h2>What kind of rights does monetary transactions give to investors?</h2>
      The monetary transactions give investors the rights to quota. Currently, the price of quota unit ("investment hour") is automatically set to equal the average hourly earnings of all employees in private sector of the U.S. (<a href="https://fred.stlouisfed.org/series/CES0500000003">track these series</a>).

      <h2>I have studied and worked a lot, my hour is worth more than that. What do I do?</h2>
      You simply declare more hours when you do the actual work. For example, if you have spent 3 hours of doubly productive work, just declare that as 6 hours.

      <h2>Who manages the database?</h2>
      Each of our nodes is managed by a different organization. You can determine which organization you're using based on the text in the URL, and the server choice drop-box at the bottom right. Currently the "Dublin" node is managed by WeFindX Foundation of Ireland, the "Virginia" is managed by GlobalMindShare of United States, and "Shanghai" node is managed by Mindey.

      <h2>What Infinity is not?</h2>
      Infinity is not simple chat application. You don't come here just to do a private video call, or use it as an e-mail to have private conversations. Consider, that everything said and done on Infinity -- public, and intended for the educational purposes and the benefit of the public. For example, when you structure the project, think not just how the project is better for the participants, but also, how it is better for the random visitor, who wants to understand what is being done.

      <h2>How are you different from Kickstarter?</h2>
      Kickstarter ends with the funding. After funding a project, you don't get access to all of the nitty-gritty, all the details that the company behind the project is doing every day. We make sure that the investors (that is, public) can keep track of the projects on Infinity, up to the content of the tasks themselves.

      <h2>If it is so open, how are the investors protected from IP theft?</h2>
      We use asymmetric cryptography, cryptographic signatures, and blockchain technologies to make sure that the ideas, and work results shared by contributors, are uniquely tied to them. When the hash of the files uploaded and messages written is signed with the private key of the participant, and recorded to blockchain, it is possible to prove the identity and time of authorship, making it possible to prove precedence of invention or work result. In other words, if anyone finds others who copied their work, they are much more likely to prove it in a court of law, because immutable records are fetched in blockchain.

      <h2>How are you different from Wikipedia?</h2>
      Wikipedia focuses on semantic knowledge, we focus on the latest procedural knowledge, which can be gained by actually working on world's issues. Wikipedia describes general information about projects, we try to do the actual projects, and get them self-describe.

      <h2>How are you different from Reddit?</h2>
      Reddit focuses on free discussions about truth. We care about the truth in a similar way that Reddit does when it comes to humanity's goals, but that's where our Reddit-likeness ends. The rest is of Infinity is pragmatic.

      <h2>How are you different from Halfbakery?</h2>
      We don't have buns or croissants. Halfbakery is focused on free innovation, doesn't have focus on humanity's top level goals, and doesn't encourage people to work on the ideas and invest into projects.

      <h2>So, who is behind this?</h2>
      People and organizations like you. Among early contributors - people <a href="https://mindey.com">Mindey</a>, <a href="https://ruta.io">Ruta</a>, <a href="https://aliev.me">Aliev</a> and others, and organizations <a href="https://wefindx.org">WeFindX Foundation</a>, <a href="http://www.globalmindshare.org">Global Mind Share</a> and others (check out more details <a href="https://inf.li/#/wefindx.com:en/@/topic/235">here</a>). Collectively, we are a global family of individuals and organizations - the <b>Infinity Family</b>, and we are welcoming you to join it too.

      <h2>How do I join the Infinity Family?</h2>
      You <a href="/#/page/otp">sign-in</a>, you're already part of us. Write us at <b>team@wefindx.org</b>, if you want to get access or run your node for commercial purposes.`
      .split('\n')
      .map(x => x.trim())
  }
};
