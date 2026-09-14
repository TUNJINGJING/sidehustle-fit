import test from "node:test";
import assert from "node:assert/strict";
import { questions } from "./questions.js";
import { calculateResult } from "./scoring.js";

test("quiz contains 18 questions", () => {
  assert.equal(questions.length, 18);
  assert.ok(questions.every((question) => question.options.length === 4));
});

test("result requires every answer", () => {
  assert.throws(() => calculateResult([0]), /Expected 18 answers/);
});

test("content-heavy choices put content in top three", () => {
  const answers = questions.map((question) => {
    const scores = question.options.map((option) => option.score?.content ?? 0);
    return scores.indexOf(Math.max(...scores));
  });
  assert.ok(calculateResult(answers).top.some((item) => item.key === "content"));
});

test("product-heavy choices put product in top three", () => {
  const answers = questions.map((question) => {
    const scores = question.options.map((option) => option.score?.product ?? 0);
    return scores.indexOf(Math.max(...scores));
  });
  assert.ok(calculateResult(answers).top.some((item) => item.key === "product"));
});

test("display match scores stay bounded", () => {
  for (const item of calculateResult(questions.map(() => 0)).top) {
    assert.ok(item.match >= 61 && item.match <= 94);
  }
});
