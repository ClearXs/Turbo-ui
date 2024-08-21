> - Turbo UI是一个简约、实用的理念，期望做成能够做成快速开发业务的后台管理UI骨架。通过抖音[semi.design](https://semi.design/)提供的现代化的UI库，
>
> - 融合着[formilyjs](https://formilyjs.org/)、[designable](https://designable.netlify.app/)打通从领域建模<=>Schema<=>JSON的配置渲染页面。

## 技术选型

Turbo UI的技术选型是基于React体系进行构建。以[semi.design](https://semi.design/)作为UI库，[Recoil](https://recoiljs.org/)是状态管理的框架，[React Router](https://reactrouter.com/)作为路由框架，[tailwind](https://tailwindcss.com/)是css框架以及[formily](https://formilyjs.org/)作为表单解决方案等。

> **为什么选取React？**
>
> 1. React生态齐全，Turbo的使命是提供全端的快速开发框子，所以包含移动端，桌面端需要考虑。
> 1. 语法灵活。
> 1. 虚拟DOM的性能。
> 1. 社区活跃。



| 名称         | 版本号 | 说明     | 记录时间 | 修改时间 |
| ------------ | ------ | -------- | -------- | -------- |
| react        | 18.3.x |          | 2024.08  | 2024.08  |
| recoil       | 0.7.x  | 状态管理 | 2024.08  | 2024.08  |
| semi-ui      | 2.6.x  | UI库     | 2024.08  | 2024.08  |
| axios        | 1.7.x  |          | 2024.08  | 2024.08  |
| react-router | 6.x    | 路由     | 2024.08  | 2024.08  |
| formily      | 2.3.x  |          | 2024.08  | 2024.08  |
| react-dnd    | 16.x   | 拖动库   | 2024.08  | 2024.08  |
| lodash       | 4.17.x | 工具库   | 2024.08  | 2024.08  |
| tailwindcss  | 3.4.x  | css库    | 2024.08  | 2024.08  |
| vite         | 5.3.x  | 包管理器 | 2024.08  | 2024.08  |
| ...          |        |          |          |          |

## 第一个页面

在[源码目录结构的页面](/directory.html#目录)下，对于一个单页面，可以看到包含了：

- 组件名称
- helper

两个文件
