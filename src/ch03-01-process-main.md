# 项目主流程

## 主流程

| 阶段     | 任务           | 里程碑       | 备注                        |
| -------- | -------------- | ------------ | --------------------------- |
| 起始阶段 | 提交需求说明书 |              |                             |
|          | 审阅需求说明书 | 需求确认     |                             |
| 设计阶段 | 设计软件       |              |                             |
|          | 原型设计       |              |                             |
|          | UI 设计        |              |                             |
|          | 审阅设计       | 设计完成     |                             |
|          | 估算开发人月数 | 估算完成     |                             |
| 开发阶段 | 迭代 1         | 开发里程碑 1 | 开发工作和测试工作同时进行  |
|          | 迭代 2         |              |                             |
|          | 迭代 3         |              |                             |
|          | 迭代 4         | 开发里程碑 2 |                             |
|          | ...            |              |                             |
|          | ...            |              |                             |
|          | 功能冻结日     | 功能冻结日   |                             |
|          | 功能完成日     | 功能完成日   | 功能开发完成日              |
|          | 代码冻结日     | 代码冻结日   |                             |
| 测试阶段 | 第 1 轮测试    |              | 需要 3~4 轮测试             |
|          | 第 2 轮测试    |              |                             |
|          | 第 3 轮测试    |              |                             |
|          | 候选发布版 1   |              | 距离项目结束，大概 1 个迭代 |
|          | 候选发布版 2   |              |                             |
|          | ...            |              |                             |
|          | 候选发布版 n   |              |                             |
| 发布阶段 | 发布版         | 确定发布版   |                             |
|          | 发布日         |              |                             |

### 说明

- 一个迭代一般是 2 周或者 3 周，根据项目的情况，自行做选择。
- 一个里程碑一般是 2 个迭代或者 3 个迭代，根据项目的情况，自行做选择。
- 测试用例编写在开发阶段就已经开始。
- 测试用例审阅在开发阶段中进行。
- 功能测试在开发阶段就已经开始。
- 功能终止日：功能将不会发生变化。
- 功能完成日：功能开发完成。
- 代码冻结日：代码提交将进入一个更严格的审核流程。

## 项目常见的关键日

- 开始日(Kickoff Day)
- 功能冻结日(Feature Freeze Day)本日之后，不再接受新的需求或者需求变更
- 功能开发完成日(Feature Dev Completed)所有的功能开发完成。
- 功能测试完成日(Feature Testing Completed)所有的功能测试完成。
- 代码冻结日(Code Freeze Day)只能修改 Stop Ship/Critical 的缺陷。使用加强版的代码审查流程
- 最终翻译采集日(Final L10N Drop Day)最后一次向翻译组提供需要被翻译的资源
- 文档完成日(Documentation Completed Day)
- 用户测试版选出日(Beta Version)
- 项目审核申请日开发进入项目发布审核流程
- 候选版选出日(Release Candidate Version)
- 最终版本选出日(Golden Master Version)
- 发布日(Publish Day)
