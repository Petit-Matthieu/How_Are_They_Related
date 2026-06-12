export interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  xLabel: string;
  yLabel: string;
  x: number[];
  y: number[];
  funFact: string;
}

export const datasets: Dataset[] = [
  {
    id: "icecream_drowning",
    name: "冰淇淋 vs 溺水",
    description: "经典案例：冰淇淋卖得越多，溺水越多。真正原因是夏天！",
    category: "经典",
    xLabel: "冰淇淋销量(万份)",
    yLabel: "溺水人数",
    x: [12, 15, 18, 25, 35, 48, 52, 50, 42, 28, 18, 14],
    y: [15, 18, 22, 30, 42, 55, 60, 58, 45, 32, 20, 16],
    funFact: "相关性 ≠ 因果性！真正的共同原因是夏天"
  },
  {
    id: "pirates_warming",
    name: "海盗 vs 全球变暖",
    description: "海盗越少，地球越热！Pastafarianism 的经典论证。",
    category: "搞笑",
    xLabel: "海盗数量",
    yLabel: "温度异常(°C)",
    x: [35000, 25000, 15000, 5000, 1000, 500, 200, 100, 50, 20],
    y: [-0.4, -0.2, 0.0, 0.1, 0.3, 0.5, 0.7, 0.85, 0.95, 1.1],
    funFact: "飞天面条神教用这个'证明'海盗减少导致全球变暖"
  },
  {
    id: "chocolate_nobel",
    name: "巧克力 vs 诺贝尔奖",
    description: "巧克力吃得越多的国家，诺贝尔奖得主越多！",
    category: "学术",
    xLabel: "人均巧克力消费(kg/年)",
    yLabel: "诺贝尔奖(每千万人)",
    x: [9.4, 11.6, 8.8, 6.5, 10.2, 7.8, 5.6, 4.3, 3.8, 2.1],
    y: [32.8, 31.2, 25.6, 18.4, 28.9, 22.1, 15.8, 12.3, 8.9, 5.2],
    funFact: "研究发表在《新英格兰医学杂志》，r = 0.791"
  },
  {
    id: "study_sleep",
    name: "学习 vs 睡眠",
    description: "大学生学习时间和睡眠时间的关系，期末周特别明显。",
    category: "学生",
    xLabel: "日学习时间(小时)",
    yLabel: "日睡眠时间(小时)",
    x: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5],
    funFact: "期末周：学习10小时，睡眠4小时，咖啡3杯"
  },
  {
    id: "height_weight",
    name: "身高 vs 体重",
    description: "这个是真的有强相关性！",
    category: "健康",
    xLabel: "身高(cm)",
    yLabel: "体重(kg)",
    x: [155, 160, 165, 168, 170, 172, 175, 178, 180, 185],
    y: [50, 55, 60, 63, 68, 72, 78, 82, 88, 95],
    funFact: "BMI = 体重/(身高/100)²，这就是相关性的应用"
  },
  {
    id: "coffee_work",
    name: "咖啡 vs 工作效率",
    description: "咖啡真的是生产力神器吗？",
    category: "工作",
    xLabel: "日咖啡杯数",
    yLabel: "工作效率(0-100)",
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [60, 72, 82, 88, 85, 78, 70, 62, 55],
    funFact: "超过3杯后效率反而下降（手抖）"
  },
  {
    id: "cat_internet",
    name: "猫咪视频 vs 互联网",
    description: "互联网的本质就是猫咪！",
    category: "搞笑",
    xLabel: "猫咪视频(万/月)",
    yLabel: "互联网流量(EB/月)",
    x: [10, 25, 45, 80, 120, 180, 250, 350, 480, 620],
    y: [15, 28, 45, 72, 110, 160, 230, 320, 440, 580],
    funFact: "互联网上猫咪内容占比约15%"
  },
  {
    id: "temperature_crime",
    name: "气温 vs 犯罪率",
    description: "天气越热，犯罪越多？",
    category: "社会",
    xLabel: "月平均气温(°C)",
    yLabel: "月犯罪案件数",
    x: [2, 5, 10, 15, 20, 25, 30, 32, 28, 22, 12, 5],
    y: [120, 135, 150, 180, 210, 250, 310, 340, 280, 200, 160, 130],
    funFact: "可能是因为天热人更容易暴躁"
  },
  {
    id: "gdp_happiness",
    name: "GDP vs 幸福指数",
    description: "钱能买到幸福吗？",
    category: "社会",
    xLabel: "人均GDP(万美元)",
    yLabel: "幸福指数(0-10)",
    x: [1.2, 2.5, 3.8, 5.2, 6.8, 8.5, 10.2, 12.5, 15.8, 18.2],
    y: [4.8, 5.2, 5.8, 6.2, 6.8, 7.1, 7.3, 7.5, 7.6, 7.7],
    funFact: "超过一定收入后，更多钱不能带来更多幸福"
  },
  {
    id: "margarine_divorce",
    name: "人造黄油 vs 离婚率",
    description: "吃人造黄油会导致离婚？r = 0.99 的虚假相关！",
    category: "搞笑",
    xLabel: "人造黄油消费(磅/年)",
    yLabel: "离婚率(每千人)",
    x: [8.2, 7.8, 7.0, 6.5, 5.8, 5.2, 4.8, 4.2, 3.8, 3.2],
    y: [5.0, 4.7, 4.3, 4.0, 3.7, 3.4, 3.2, 2.9, 2.7, 2.4],
    funFact: "相关系数 r = 0.99！但这纯属巧合"
  },
  {
    id: "exercise_mood",
    name: "运动 vs 心情",
    description: "运动真的能改善心情吗？",
    category: "健康",
    xLabel: "每周运动(小时)",
    yLabel: "心情评分(1-10)",
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10],
    y: [5.0, 5.5, 6.0, 6.8, 7.2, 7.8, 8.0, 8.2, 8.3, 8.5],
    funFact: "科学证实：运动释放内啡肽，让你快乐！"
  },
  {
    id: "game_grades",
    name: "游戏时间 vs 成绩",
    description: "打游戏真的会影响成绩吗？",
    category: "学生",
    xLabel: "日均游戏(小时)",
    yLabel: "GPA成绩",
    x: [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8],
    y: [3.0, 3.2, 3.4, 3.3, 3.1, 2.8, 2.5, 2.2, 2.0, 1.8],
    funFact: "适度游戏(<2小时)可能反而有益认知能力！"
  },
  {
    id: "social_lonely",
    name: "社交媒体 vs 孤独感",
    description: "社交媒体让我们更孤独了吗？",
    category: "社会",
    xLabel: "日均使用(小时)",
    yLabel: "孤独感指数(1-10)",
    x: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8],
    y: [4.0, 4.2, 4.5, 5.0, 5.5, 6.0, 6.8, 7.2, 7.5, 8.0],
    funFact: "被动浏览比主动互动更容易感到孤独"
  },
  {
    id: "age_screen",
    name: "年龄 vs 屏幕时间",
    description: "年轻人真的更爱玩手机吗？",
    category: "生活",
    xLabel: "年龄",
    yLabel: "日屏幕时间(小时)",
    x: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
    y: [7, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5],
    funFact: "65岁以上群体的TikTok使用率正在快速增长！"
  },
  {
    id: "nicolas_pool",
    name: "尼古拉斯·凯奇 vs 溺亡",
    description: "凯奇拍的电影越多，泳池溺亡的人越多！",
    category: "搞笑",
    xLabel: "凯奇年电影数",
    yLabel: "泳池溺亡人数",
    x: [2, 3, 1, 4, 2, 3, 1, 2, 4, 3],
    y: [100, 120, 90, 140, 110, 125, 95, 105, 145, 130],
    funFact: "Tyler Vigen 发现的经典虚假相关之一"
  },
  {
    id: "mozzarella_cs",
    name: "马苏里拉奶酪 vs CS博士",
    description: "吃更多奶酪，就能获得更多CS博士学位？",
    category: "学术",
    xLabel: "奶酪消费(磅)",
    yLabel: "CS博士数量",
    x: [9.3, 9.7, 9.7, 9.8, 10.0, 10.2, 10.5, 10.7, 11.0, 11.1],
    y: [800, 850, 830, 880, 920, 960, 1000, 1050, 1100, 1120],
    funFact: "相关系数 r = 0.96！数据来自2000-2009年"
  }
];

export const categories = [...new Set(datasets.map(d => d.category))];
