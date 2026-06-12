# 🔗 How Are They Related?

探索任意两件事之间的相关系数 - 从 -1 到 +1

## ✨ 功能

- 📊 16 个有趣数据集（经典案例 + 搞笑虚假相关）
- ✏️ 自定义数据分析
- 🏆 相关系数排行榜
- 📈 散点图 + 趋势线
- 🚀 纯前端，无需后端服务器

## 🚀 启动

```bash
cd frontend
npm install
npm run dev
```

打开 http://localhost:5173

## 🌐 部署到 GitHub Pages

1. 推送代码到 GitHub
2. 进入 Settings → Pages → Source 选择 GitHub Actions
3. 每次 push 到 main 分支会自动部署

或者手动构建：

```bash
cd frontend
npm run build
# dist/ 文件夹就是部署产物
```

## 📊 数据集

| 分类 | 数据集 |
|------|--------|
| 经典 | 冰淇淋 vs 溺水 |
| 搞笑 | 海盗 vs 全球变暖、猫咪视频 vs 互联网、人造黄油 vs 离婚率、尼古拉斯·凯奇 vs 溺亡 |
| 学术 | 巧克力 vs 诺贝尔奖、马苏里拉奶酪 vs CS博士 |
| 学生 | 学习 vs 睡眠、游戏 vs 成绩 |
| 健康 | 身高 vs 体重、运动 vs 心情 |
| 社会 | GDP vs 幸福、气温 vs 犯罪率、社交媒体 vs 孤独感 |
| 工作 | 咖啡 vs 工作效率 |
| 生活 | 年龄 vs 屏幕时间 |

## 🛠️ 技术栈

- React + TypeScript + Vite + Tailwind CSS
- 纯前端，数据内嵌，无需后端

## ⚠️ 提示

**相关性 ≠ 因果性！**
