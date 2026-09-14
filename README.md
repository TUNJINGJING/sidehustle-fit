# 副业罗盘 Side Hustle Fit

用于快速验证“用户是否愿意通过测评寻找适合自己的副业方向”的静态 MVP。

## V0.1 核心链路

1. 开始测试。
2. 回答 18 个关于现实约束、能力、获客方式和目标的问题。
3. 得到当前阶段、Top 3 副业模式和一个 7 天验证动作。
4. 点击与结果匹配的生财有术真实案例继续阅读。

这一版刻意不做登录、支付、AI API、数据库和小程序。先验证测试完成率与结果后的案例点击率。

## 本地运行

```bash
python3 -m http.server 4173
```

然后打开 `http://localhost:4173/`。

## 测试

```bash
npm test
```

## 验证事件

页面会把最近 100 条事件保存在浏览器 `localStorage.sidehustle-fit-events`。如果后续页面存在 GA4 的 `gtag`，会自动同步发送同名事件。

- `quiz_start`
- `quiz_answer`
- `quiz_complete`
- `case_click`
- `share_copy`

首轮最重要的指标是测试完成率 `quiz_complete / quiz_start`，以及案例兴趣率 `case_click / quiz_complete`。

## 方法边界

这不是心理诊断，也不把“匹配度”当成功概率。V0.1 主要参考生财有术中关于副业选项目的实战框架，优先考虑阶段、风险承受、反馈周期、已有能力、时间与资金约束和能力复利。

结果页只引用可定位的帖子标题、项目结果摘要和原帖链接，不复制会员正文。
