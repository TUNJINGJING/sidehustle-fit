import { cases } from "./cases.js";
import { questions } from "./questions.js";
import { calculateResult, stages } from "./scoring.js";

const app = document.querySelector("#app");
let answers = [];
let currentQuestion = 0;

function track(eventName, payload = {}) {
  const history = JSON.parse(localStorage.getItem("sidehustle-fit-events") || "[]");
  history.push({ eventName, ...payload, at: new Date().toISOString() });
  localStorage.setItem("sidehustle-fit-events", JSON.stringify(history.slice(-100)));
  if (typeof window.gtag === "function") window.gtag("event", eventName, payload);
}

function renderLanding() {
  app.innerHTML = `
    <section class="landing shell">
      <nav class="nav">
        <a class="brand" href="./"><span class="brand-mark">↗</span><span>副业罗盘</span></a>
        <span class="nav-note">V0.1 · 免费测试</span>
      </nav>
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">SIDE HUSTLE FIT CHECK</div>
          <h1>别再问什么副业最赚钱。<br><span>先看哪种赚钱方式更值得你验证。</span></h1>
          <p class="hero-lead">18 个现实问题，结合你的时间、资金、技能、获客方式和收入目标，给出当前更值得验证的 3 个副业方向。</p>
          <button class="primary-button" id="start">开始测试 <span>约 3 分钟</span></button>
          <p class="privacy-note">无需登录 · 不收集姓名和联系方式 · 结果仅供项目探索参考</p>
        </div>
        <aside class="thesis-card">
          <div class="card-label">我们不测玄学人格</div>
          <div class="formula">
            <span>现实约束</span><b>×</b><span>已有能力</span><b>×</b><span>商业偏好</span><b>×</b><span>目标阶段</span>
          </div>
          <div class="outcome-line"><span>最后得到</span><strong>你的副业下注顺序</strong></div>
          <div class="mini-bars"><i></i><i></i><i></i></div>
        </aside>
      </div>
      <div class="evidence-strip">
        <div><strong>不是职业测试</strong><span>推荐的是赚钱模式，不是岗位名称</span></div>
        <div><strong>先看阶段</strong><span>急需现金流和想做长期事业，答案应该不同</span></div>
        <div><strong>必须能验证</strong><span>每个结果都附一个最小行动</span></div>
      </div>
      <section class="method-section">
        <div><div class="eyebrow">WHY THIS TEST</div><h2>“喜欢什么”只占很小一部分。</h2></div>
        <p>真正影响副业选择的，是你现在有多少筹码、多久需要结果、能持续做什么、已经有什么能力，以及愿意用哪种方式获取客户。测试不替你做人生决定，只帮你把几十个项目缩到 3 种更值得验证的商业模式。</p>
      </section>
    </section>`;

  document.querySelector("#start").addEventListener("click", () => {
    track("quiz_start");
    answers = [];
    currentQuestion = 0;
    renderQuestion();
  });
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const progress = Math.round((currentQuestion / questions.length) * 100);
  app.innerHTML = `
    <section class="quiz-shell shell">
      <header class="quiz-header">
        <button class="text-button" id="back">${currentQuestion === 0 ? "退出测试" : "← 上一题"}</button>
        <span>${currentQuestion + 1} / ${questions.length}</span>
      </header>
      <div class="progress-track"><i style="width:${progress}%"></i></div>
      <div class="question-card">
        <div class="question-index">Q${String(currentQuestion + 1).padStart(2, "0")}</div>
        <h1>${question.text}</h1>
        ${question.hint ? `<p class="question-hint">${question.hint}</p>` : ""}
        <div class="options">
          ${question.options.map((option, index) => `
            <button class="option" data-index="${index}">
              <span class="option-key">${String.fromCharCode(65 + index)}</span><span>${option.label}</span>
            </button>`).join("")}
        </div>
      </div>
    </section>`;

  document.querySelector("#back").addEventListener("click", () => {
    if (currentQuestion === 0) return renderLanding();
    currentQuestion -= 1;
    renderQuestion();
  });
  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      answers[currentQuestion] = Number(button.dataset.index);
      track("quiz_answer", { question: question.id, answer: Number(button.dataset.index) });
      if (currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        setTimeout(renderQuestion, 70);
      } else {
        renderResult();
      }
    });
  });
}

function renderResult() {
  const result = calculateResult(answers);
  const stage = stages[result.stageKey];
  track("quiz_complete", { stage: result.stageKey, top: result.top[0].key });

  app.innerHTML = `
    <section class="result-shell shell">
      <nav class="nav result-nav">
        <a class="brand" href="./"><span class="brand-mark">↗</span><span>副业罗盘</span></a>
        <button class="text-button" id="restart">重新测试</button>
      </nav>
      <header class="result-hero">
        <div class="eyebrow">YOUR SIDE HUSTLE BET</div>
        <p class="result-kicker">你当前更像处在</p>
        <h1>${stage.name}</h1>
        <p>${stage.description}</p>
        <div class="stage-principle"><span>这一阶段最重要的原则</span><strong>${stage.principle}</strong></div>
      </header>

      <section class="ranking-section">
        <div class="section-heading"><span>建议下注顺序</span><p>匹配度表示相对优先级，不代表成功概率。</p></div>
        <div class="ranking-grid">
          ${result.top.map((item, index) => `
            <article class="rank-card ${index === 0 ? "rank-first" : ""}">
              <div class="rank-top"><span>0${index + 1}</span><strong>${item.match}%</strong></div>
              <h2>${item.name}</h2>
              <p>${item.summary}</p>
              <div class="examples">${item.examples}</div>
              <div class="match-bar"><i style="width:${item.match}%"></i></div>
            </article>`).join("")}
        </div>
      </section>

      <section class="action-section">
        <div class="section-heading"><span>先别学，先验证</span><p>只为排名第一的方向投入 7 天。</p></div>
        <div class="action-card"><div class="action-number">7D</div><div><h2>${result.top[0].name} · 最小验证动作</h2><p>${result.top[0].action}</p></div></div>
        <div class="risk-card"><strong>先知道它的坑：</strong>${result.top[0].risk}</div>
      </section>

      <section class="cases-section">
        <div class="section-heading"><span>和你的结果匹配的真实案例</span><p>只展示方向和结果，具体方法回原帖看。</p></div>
        <div class="case-list">
          ${result.top.map((item) => {
            const story = cases[item.key];
            return `<a class="case-card" href="${story.url}" target="_blank" rel="noopener" data-case="${item.key}">
              <span class="case-type">${item.label}</span><div><h3>${story.title}</h3><p>${story.note}</p></div><span class="case-arrow">↗</span>
            </a>`;
          }).join("")}
        </div>
        <div class="source-note">案例来自生财有术可定位的帖子标题与项目结果。本站不转载会员正文，也不承诺任何收入结果。</div>
      </section>

      <section class="avoid-section">
        <div class="section-heading"><span>现在先别重仓</span><p>不是永远不适合，只是当前优先级较低。</p></div>
        <div class="avoid-grid">${result.avoid.map((item) => `<div><strong>${item.name}</strong><span>${item.examples}</span></div>`).join("")}</div>
      </section>

      <section class="share-section">
        <div><span>测试有用？</span><h2>把结果截图发给一个也在找副业的人。</h2></div>
        <button class="secondary-button" id="copy">复制测试链接</button>
      </section>
      <footer>副业罗盘 V0.1 · 这不是投资、就业或收入保证。真正的匹配度最终要由市场反馈验证。</footer>
    </section>`;

  document.querySelector("#restart").addEventListener("click", renderLanding);
  document.querySelector("#copy").addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(window.location.href);
    event.currentTarget.textContent = "已复制";
    track("share_copy");
  });
  document.querySelectorAll("[data-case]").forEach((link) => {
    link.addEventListener("click", () => track("case_click", { type: link.dataset.case }));
  });
}

renderLanding();
