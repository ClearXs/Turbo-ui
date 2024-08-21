## 总览

TurboUI的目录结构设计遵循着清晰直观的设计。

```shell
.
├── Dockerfile																	# Dockerfile
├── LICENSE				
├── index.html																												
├── mkdocs.yml																  # mkdocs配置文件
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js														# tailwindcss配置文件
├── public																			# 公共资源文件
├── requirements.txt
├── src																					# 源码目录
│   ├── api																			# 接口调用的目录
│   │   ├── developer
│   │   ├── message
│   │   └── system
│   ├── components															# 组件目录
│   │   ├── App
│   │   ├── Bar
│   │   ├── Binary
│   │   ├── ButtonSpace
│   │   ├── CodeEditor
│   │   ├── Color
│   │   ├── Dialog
│   │   ├── Icon
│   │   ├── List
│   │   ├── Modular
│   │   ├── MotionContent
│   │   ├── MotionHeader
│   │   ├── SelectGroup
│   │   ├── Sidebar
│   │   ├── SliderSide
│   │   ├── TForm
│   │   ├── TableCrud
│   │   ├── Tag
│   │   └── Tree
│   ├── config																	# 配置文件的目录
│   ├── constant																# 常量目录
│   ├── error																		# 错误页面目录
│   ├── hook																		# 系统级的hook目录
│   ├── locales																	# 国际化目录
│   ├── lottie																  # lottie动画目录
│   ├── pages																		# 页面目录
│   │   ├── developer
│   │   ├── home
│   │   ├── login
│   │   ├── message
│   │   ├── profile
│   │   └── system
│   ├── route																		# 路由目录
│   ├── shared																	# 公共属性定义
│   ├── store																		# 状态管理目录
│   ├── theme																		# 主题目录
│   └── util																		# 工具类目录
├── tailwind.config.js													# tailwind配置文件
├── tsconfig.json																# ts配置文件
└── vite.config.js															# vite配置文件
```



## 页面

页面目录的命名尊循着如下的结构，以模块作为某一个页面的集合，在页面下存在

- index.tsx
- helper.tsx

作为定义页面的CRUD。

> 命名的规范详细看[命名规范](/rules.html#命名规范)

```shell
├── module1
│   ├── page1
│   │   ├── helper.tsx
│   │   └── index.tsx
│		└── page2
└── module2
```

