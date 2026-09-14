const s = (...keys) => Object.fromEntries(keys.map((key) => [key, 2]));
const h = (...keys) => Object.fromEntries(keys.map((key) => [key, 4]));

export const questions = [
  {
    id: "income",
    text: "到今天为止，你有没有靠工资之外的方式赚到过钱？",
    hint: "先判断你现在需要第一次市场反馈，还是更长期的积累。",
    options: [
      { label: "还没有，基本是 0", stage: { starter: 4 }, score: h("craft", "operator") },
      { label: "零散赚过，累计不到 3000 元", stage: { starter: 3, builder: 1 }, score: h("craft", "digital") },
      { label: "跑通过，能偶尔月入几千", stage: { builder: 4 }, score: h("content", "digital", "operator") },
      { label: "已有稳定副业或业务收入", stage: { builder: 2, meaning: 3 }, score: h("product", "content", "operator") }
    ]
  },
  {
    id: "urgency",
    text: "你希望多久看到第一笔真实收入？",
    options: [
      { label: "7 天内，先证明我能赚到", stage: { starter: 3 }, score: h("craft", "operator") },
      { label: "1 个月内", stage: { starter: 2, builder: 1 }, score: h("digital", "commerce", "craft") },
      { label: "3～6 个月可以接受", stage: { builder: 3 }, score: h("content", "product", "operator") },
      { label: "不着急，我更想积累几年", stage: { meaning: 3, builder: 2 }, score: h("content", "product") }
    ]
  },
  {
    id: "time",
    text: "你每周能稳定拿出多少时间？",
    hint: "这里问的是能持续三个月的时间，不是偶尔爆肝。",
    options: [
      { label: "少于 5 小时", score: h("digital", "content") },
      { label: "5～10 小时", score: h("craft", "content", "digital") },
      { label: "10～20 小时", score: h("content", "operator", "product") },
      { label: "20 小时以上", score: s("content", "craft", "product", "commerce", "operator", "digital") }
    ]
  },
  {
    id: "budget",
    text: "第一轮验证失败的话，你最多能接受损失多少钱？",
    options: [
      { label: "0～300 元", score: h("craft", "content", "digital") },
      { label: "300～2000 元", score: h("digital", "product", "operator") },
      { label: "2000～10000 元", score: h("commerce", "product", "content") },
      { label: "1 万以上也能承受", score: h("commerce", "product", "operator") }
    ]
  },
  {
    id: "content",
    text: "连续 30 天公开发内容，对你来说是什么感觉？",
    options: [
      { label: "很抗拒，最好完全不用发", score: h("craft", "product", "commerce") },
      { label: "能做，但需要明确模板", score: h("digital", "operator", "commerce") },
      { label: "可以稳定输出", score: h("content", "operator", "digital") },
      { label: "我本来就喜欢表达和分享", score: { content: 6, digital: 4, operator: 3 } }
    ]
  },
  {
    id: "sales",
    text: "让你主动和陌生人聊需求、报价、成交，你会？",
    options: [
      { label: "非常抗拒", score: h("content", "digital", "product") },
      { label: "有标准话术就可以", score: h("commerce", "craft", "digital") },
      { label: "不排斥，能正常聊", score: h("craft", "operator", "commerce") },
      { label: "这是我的强项", score: { craft: 6, operator: 6, commerce: 4 } }
    ]
  },
  {
    id: "technical",
    text: "你对“把一个重复流程做成工具”这件事的能力如何？",
    options: [
      { label: "基本不会，也不想学", score: h("commerce", "content", "craft") },
      { label: "会用 AI 或自动化工具拼出来", score: { product: 5, operator: 4, digital: 3 } },
      { label: "能独立做网页、小程序或脚本", score: { product: 6, operator: 4, digital: 3 } },
      { label: "做过真实产品并有用户", score: { product: 7, operator: 4 } }
    ]
  },
  {
    id: "expertise",
    text: "有没有一类问题，身边的人经常来问你？",
    options: [
      { label: "暂时想不到", score: h("commerce", "digital") },
      { label: "有一些生活爱好或消费经验", score: h("content", "digital") },
      { label: "有明确职业技能", score: h("craft", "operator", "product") },
      { label: "有多年行业经验和实际结果", score: { operator: 6, craft: 5, content: 4 } }
    ]
  },
  {
    id: "audience",
    text: "你现在手里有可以直接触达的人群吗？",
    options: [
      { label: "几乎没有", score: h("craft", "commerce") },
      { label: "有一些朋友圈、同事或行业群", score: h("craft", "digital", "commerce") },
      { label: "有一个小账号或垂直社群", score: h("content", "digital", "operator") },
      { label: "有稳定流量、客户或私域", score: { content: 5, digital: 5, operator: 5, product: 3 } }
    ]
  },
  {
    id: "delivery",
    text: "你更愿意哪种交付方式？",
    options: [
      { label: "最好不用和客户反复沟通", score: h("content", "digital", "product") },
      { label: "按标准模板完成就行", score: h("craft", "digital", "commerce") },
      { label: "愿意针对客户定制解决", score: h("craft", "operator") },
      { label: "喜欢长期帮助客户拿结果", score: { operator: 6, craft: 5 } }
    ]
  },
  {
    id: "operations",
    text: "面对重复、琐碎但能直接影响收入的运营工作，你通常？",
    options: [
      { label: "很快厌倦", score: h("product", "content") },
      { label: "短期为了验证可以做", score: h("craft", "digital") },
      { label: "能稳定执行流程", score: h("commerce", "operator") },
      { label: "我会主动优化流程和数据", score: { operator: 6, product: 5, commerce: 4 } }
    ]
  },
  {
    id: "inventory",
    text: "你对选品、订单、供应链和售后是什么态度？",
    options: [
      { label: "能不碰就不碰", score: h("content", "product", "digital") },
      { label: "低库存模式可以试", score: { commerce: 5, digital: 2 } },
      { label: "我喜欢研究商品和交易", score: { commerce: 7, operator: 3 } },
      { label: "我已经有供应链或电商经验", score: { commerce: 8, operator: 4 } }
    ]
  },
  {
    id: "uncertainty",
    text: "连续两个月投入，但数据只是在缓慢变好，你能接受吗？",
    options: [
      { label: "不能，我需要很快看到收入", stage: { starter: 2 }, score: h("craft", "commerce") },
      { label: "只要每周有小反馈就行", score: h("digital", "commerce", "operator") },
      { label: "能，只要逻辑和数据在改善", stage: { builder: 2 }, score: h("content", "product", "operator") },
      { label: "能接受半年以上长期积累", stage: { meaning: 2 }, score: { content: 6, product: 5 } }
    ]
  },
  {
    id: "leverage",
    text: "下面哪句话最吸引你？",
    options: [
      { label: "这周就赚到第一块钱", stage: { starter: 3 }, score: h("craft", "commerce") },
      { label: "做一次，可以重复卖很多次", stage: { builder: 2 }, score: h("digital", "product") },
      { label: "流量和信任会越积越多", stage: { builder: 2 }, score: h("content", "operator") },
      { label: "最终做成别人也能执行的系统", stage: { meaning: 2 }, score: h("product", "operator", "commerce") }
    ]
  },
  {
    id: "workStyle",
    text: "哪种工作状态最容易让你进入心流？",
    options: [
      { label: "一个人研究、创作、搭东西", score: h("content", "product", "digital") },
      { label: "和一个客户一起解决具体问题", score: h("craft", "operator") },
      { label: "盯数据、流程、转化不断优化", score: h("operator", "commerce") },
      { label: "组织资源，把不同环节串起来", score: h("operator", "commerce", "product") }
    ]
  },
  {
    id: "learning",
    text: "遇到一个陌生但看起来有机会的方向，你更像哪一种？",
    options: [
      { label: "先找现成教程照做", score: h("commerce", "digital") },
      { label: "先卖一个最小交付验证", score: h("craft", "operator") },
      { label: "先研究用户，再做产品", score: h("digital", "product") },
      { label: "先持续输出，边吸引用户边迭代", score: h("content", "operator") }
    ]
  },
  {
    id: "goal",
    text: "你未来 12 个月最想得到什么？",
    options: [
      { label: "稳定多 1000～3000 元每月", stage: { starter: 3 }, score: h("craft", "digital") },
      { label: "跑出一个 5000～2 万每月的副业", stage: { builder: 3 }, score: h("digital", "commerce", "operator") },
      { label: "做出能替代主业的业务", stage: { builder: 4 }, score: h("content", "product", "operator") },
      { label: "建立可以做 5～10 年的个人事业", stage: { meaning: 4 }, score: h("content", "product", "operator") }
    ]
  },
  {
    id: "identity",
    text: "如果副业真的做成，你更希望别人因为什么记住你？",
    options: [
      { label: "很会找到好商品和机会", score: h("commerce", "digital") },
      { label: "某项技能特别能解决问题", score: h("craft", "operator") },
      { label: "有自己的观点、作品和受众", score: h("content", "digital") },
      { label: "做出了一个真正有人用的产品", score: h("product", "operator") }
    ]
  }
];
