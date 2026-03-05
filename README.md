UniApp 壁纸小程序 - 完整前后端项目
##演示在分支wallpaperShow
GitHub last commit
GitHub repo size
 
项目简介
 
这是一个基于 UniApp 开发的跨端壁纸小程序项目，配套 Node.js + Express 后端服务与 MySQL 数据库，实现壁纸浏览、收藏、下载功能，适合前端开发学习与小程序实战部署。
 
技术栈选型
 
模块 核心技术 版本要求 
前端 UniApp + Vue3 + JavaScript HBuilderX 3.0+ 
后端 Node.js + Express Node.js 16.0+ 
数据库 MySQL MySQL 8.0+ 
部署依赖 Git + GitHub - 
 
项目目录结构
 
plaintext
  
works/
├── wallpaper/                 # 【前端】UniApp 小程序核心代码
│   ├── components/            # 业务页面（首页、分类、我的、收藏等）
│   ├── pages/                 # 业务页面子组件
│   ├── static/images/         # 静态资源（图标、默认图片）
│   ├── uni_modules/           # UniApp 扩展模块
│   ├── .gitignore             # Git 忽略配置（过滤 node_modules 等）
│   ├── App.vue                # 应用入口文件
│   ├── index.html             # 入口 HTML
│   ├── main.js                # 项目入口脚本
│   ├── manifest.json          # 小程序配置文件
│   ├── package.json           # 项目依赖与脚本配置
│   ├── pages.json             # 页面路由配置
│   ├── project.config.json    # 项目配置
│   ├── project.private.config.json # 私有配置
│   ├── uni.promisify.adaptor.js # Promise 适配器
│   └── uni.scss               # 全局样式
├── serve/                     # 【后端】Node.js 服务端代码
│   ├── images/                # 壁纸资源存储目录
│   ├── js/                    # 接口路由、业务逻辑
│   ├── .gitignore             # Git 忽略配置（过滤 node_modules 等）
│   ├── package.json           # 项目依赖与脚本配置
│   ├── serve.js               # 后端服务入口文件
│   └── uniapp-wallpaper.sql   # 数据库初始化脚本（必用）
└── README.md                  # 项目说明文档（当前文件）
 
 
快速部署与运行步骤
 
第一步：数据库初始化（核心）
 
1. 启动本地 MySQL 服务，通过 Navicat/DBeaver 连接数据库。
2. 执行 SQL 脚本：运行  serve/uniapp-wallpaper.sql ，自动创建  uniapp-wallpaper  数据库及表结构。
 
第二步：启动后端服务
 
bash
  
# 进入后端目录
cd serve
# 安装依赖包
npm install
# 启动本地开发服务（默认端口：3000）
node serve.js
 
 
第三步：运行前端小程序
 
1. 打开 HBuilderX，导入  wallpaper  文件夹作为 UniApp 项目。
2. 配置后端接口地址：在前端请求封装文件中，修改为你的本地后端地址（如  http://127.0.0.1:3000 ）。
3. 运行项目：选择「运行」→ 目标平台（微信小程序模拟器/浏览器/H5）。
 
核心功能模块
 
✅ 壁纸浏览：按分类筛选、下拉刷新、上拉加载更多
✅ 收藏与下载：用户登录后可收藏壁纸，支持本地下载保存
✅ 资源管理：后端对接壁纸存储
✅ 用户中心：个人信息、收藏列表、下载记录查询
 
注意事项
 
1. 后端启动前需确保 MySQL 服务正常运行，且数据库连接配置正确。
2. 壁纸资源较大， serve/images  目录可根据实际需求替换为云存储（如阿里云 OSS）。
3. 运行微信小程序时，需设置不接查非法域名。
 
联系方式
 
- GitHub：okugls
- 邮箱：1261175950@qq.com
 
 
