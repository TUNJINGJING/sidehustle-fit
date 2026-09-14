import { categories } from "./categories.js";
import { questions } from "./questions.js";

export const stages = {
  starter: {
    name: "先赚到第一块钱",
    description: "你当前最需要的是一次完整市场反馈。优先选链路短、失败成本低、能较快走完闭环的方向。",
    principle: "先证明有人愿意为你提供的价值付费，再谈长期主义。"
  },
  builder: {
    name: "建立可复利的副业",
    description: "你已经不只需要一次成交，要开始关注资产沉淀、能力复利和可放大的商业链路。",
    principle: "优先积累用户、内容、产品或流程资产，少做每次都从零开始的事。"
  },
  meaning: {
    name: "寻找长期个人事业",
    description: "短期现金流不是你的唯一目标。项目会把你塑造成什么样的人，以及几年后留下什么，同样重要。",
    principle: "把生活方式、长期能力和商业空间一起纳入决策。"
  }
};

export function calculateResult(answerIndexes) {
  if (answerIndexes.length !== questions.length) {
    throw new Error(`Expected ${questions.length} answers, received ${answerIndexes.length}`);
  }

  const totals = Object.fromEntries(Object.keys(categories).map((key) => [key, 0]));
  const stageTotals = { starter: 0, builder: 0, meaning: 0 };

  questions.forEach((question, questionIndex) => {
    const option = question.options[answerIndexes[questionIndex]];
    if (!option) throw new Error(`Invalid answer for ${question.id}`);
    Object.entries(option.score ?? {}).forEach(([key, value]) => { totals[key] += value; });
    Object.entries(option.stage ?? {}).forEach(([key, value]) => { stageTotals[key] += value; });
  });

  const ranking = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([key, score]) => ({ key, score, ...categories[key] }));
  const maxScore = ranking[0].score || 1;
  const top = ranking.slice(0, 3).map((item, index) => ({
    ...item,
    match: Math.max(61, Math.min(94, Math.round(68 + (item.score / maxScore) * 26 - index * 3)))
  }));
  const stageKey = Object.entries(stageTotals).sort((a, b) => b[1] - a[1])[0][0];

  return { top, avoid: ranking.slice(-2).reverse(), stageKey, totals, stageTotals };
}
