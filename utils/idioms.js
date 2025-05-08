// utils/idioms.js
const idioms = [
  // ========== easy (1-33) ==========
  {
    id: 1,
    difficulty: "easy",
    emojis: ["🧍", "🌳", "⏳", "🐇"],
    idiom: "守株待兔",
    points: 100,
    reward: 20,
    hint: "比喻死守狭隘经验，希望不劳而获",
    category: "动物"
  },
  {
    id: 2,
    difficulty: "easy",
    emojis: ["🙈", "👂", "⬇️", "🔔"],
    idiom: "掩耳盗铃",
    points: 100,
    reward: 20,
    hint: "比喻自己欺骗自己",
    category: "行为"
  },
  {
    id: 3,
    difficulty: "easy",
    emojis: ["👫", "🐂", "🎻", "🎵"],
    idiom: "对牛弹琴",
    points: 100,
    reward: 20,
    hint: "比喻对不懂道理的人讲道理，白费口舌",
    category: "动物"
  },
  {
    id: 4,
    difficulty: "easy",
    emojis: ["🕳️", "⬇️", "🌿", "🐸"],
    idiom: "井底之蛙",
    points: 100,
    reward: 20,
    hint: "比喻见识短浅的人",
    category: "动物"
  },
  {
    id: 5,
    difficulty: "easy",
    emojis: ["🙅🏻‍♀️", "1️⃣", "2️⃣", "🛫"],   
    idiom: "不翼而飞",
    points: 200,
    reward: 40,
    hint: "比喻东西突然不见了，也比喻事情传播得很迅速",
    category: "人物"
  },
  {
    id: 6,
    difficulty: "easy",
    emojis: ["☠️", "🐑", "🕸", "🏢"],
    idiom: "亡羊补牢",
    points: 100,
    reward: 20,
    hint: "比喻出了问题以后想办法补救，可以防止继续受损失",
    category: "动物"
  },
  {
    id: 7,
    difficulty: "easy",
    emojis: ["🎨", "🐉", "✏️", "👁️"],
    idiom: "画龙点睛",
    points: 100,
    reward: 20,
    hint: "比喻在关键处加上精彩的一笔，使作品更加生动有力",
    category: "艺术"
  },
  {
    id: 8,
    difficulty: "easy",
    emojis: ["👀", "🍓", "🛑", "🥵"],
    idiom: "望梅止渴",
    points: 100,
    reward: 20,
    hint: "比喻用空想安慰自己",
    category: "植物"
  },
  {
    id: 9,
    difficulty: "easy",
    emojis: ["🏃‍♀️", "👴", "❌", "🐎"],
    idiom: "塞翁失马",
    points: 100,
    reward: 20,
    hint: "比喻一时虽然受到损失，也许反而因此能得到好处",
    category: "人物"
  },
  {
    id: 10,
    difficulty: "easy",
    emojis: ["🎨", "🍪", "🔋", "🐔"],
    idiom: "画饼充饥",
    points: 100,
    reward: 20,
    hint: "比喻用空想来安慰自己",
    category: "食物"
  },
  {
    id: 11,
    difficulty: "easy",
    emojis: ["🦊", "🎭", "🐯", "💪"],
    idiom: "狐假虎威",
    points: 100,
    reward: 20,
    hint: "比喻依仗他人权势",
    category: "动物"
  },
  {
    id: 12,
    difficulty: "easy",
    emojis: ["🐴", "🐜", "😅", "🌲"],
    idiom: "蚍蜉撼树",
    points: 100,
    reward: 20,
    hint: "比喻力量太小，不自量力",
    category: "动物"
  },
  {
    id: 13,
    difficulty: "easy",
    emojis: ["🎃", "🐍", "🎃", "🍐"],
    idiom: "难舍难离",
    points: 100,
    reward: 20,
    hint: "形容相互感情很深，不忍分离",
    category: "动物"
  },
  {
    id: 14,
    difficulty: "easy",
    emojis: ["💥", "✂️", "🍊", "🦋"],
    idiom: "破茧成蝶",
    points: 100,
    reward: 20,
    hint: "比喻经历蜕变后获得新生",
    category: "动物"
  },
  {
    id: 15,
    difficulty: "easy",
    emojis: ["🍁", "🍃", "👩‍🦯", "👂"],
    idiom: "秋风过耳",
    points: 100,
    reward: 20,
    hint: "比喻与己无关，毫不在意",
    category: "动物"
  },
  {
    id: 16,
    difficulty: "easy",
    emojis: ["🧂", "🐢", "🈴", "👌"], 
    idiom: "言归和好",
    points: 100,
    reward: 20,
    hint: "意思指彼此重新和好，同“言归于好”",
    category: "动物"
  },
  {
    id: 17,
    difficulty: "easy",
    emojis: ["👂", "🐓", "⬆️", "💃"],
    idiom: "闻鸡起舞",
    points: 100,
    reward: 20,
    hint: "比喻有志者及时奋发",
    category: "行为"
  },
  {
    id: 18,
    difficulty: "easy",
    emojis: ["✋", "⬆️", "🌙", "🔮"],
    idiom: "掌上明珠",
    points: 100,
    reward: 20,
    hint: "比喻深受宠爱的子女",
    category: "物品"
  },
  {
    id: 19,
    difficulty: "easy",
    emojis: ["🥃", "🏹", "🐍", "👻"],
    idiom: "杯弓蛇影",
    points: 100,
    reward: 20,
    hint: "比喻疑神疑鬼，自相惊扰",
    category: "物品"
  },
  {
    id: 20,
    difficulty: "easy",
    emojis: ["👉", "🦌", "✅", "🐎"],
    idiom: "指鹿为马",
    points: 100,
    reward: 20,
    hint: "比喻故意颠倒黑白，混淆是非",
    category: "动物"
  },
  {
    id: 21,
    difficulty: "easy",
    emojis: ["👿", "✅", "👍", "🎋"],
    idiom: "胸有成竹",
    points: 100,
    reward: 20,
    hint: "比喻做事之前已经有了通盘的考虑和把握",
    category: "植物"
  },
  {
    id: 22,
    difficulty: "easy",
    emojis: ["8️⃣", "🌱", "🆘", "📈"],
    idiom: "拔苗助长",
    points: 100,
    reward: 20,
    hint: "比喻违反事物发展规律",
    category: "农业"
  },
  {
    id: 23,
    difficulty: "easy",
    emojis: ["🐟", "👀", "🌀", "🔮"],
    idiom: "鱼目混珠",
    points: 100,
    reward: 20,
    hint: "比喻用假的冒充真的",
    category: "物品"
  },
  {
    id: 24,
    difficulty: "easy",
    emojis: ["🔪", "🚣", "🙏", "⚔️"],
    idiom: "刻舟求剑",
    points: 100,
    reward: 20,
    hint: "比喻拘泥成法不知变通",
    category: "行为"
  },
  {
    id: 26,
    difficulty: "easy",
    emojis: ["🙈", "👨", "🤲", "🐘"],
    idiom: "盲人摸象",
    points: 100,
    reward: 20,
    hint: "比喻对事物只了解片面，不见全貌",
    category: "行为"
  },
  {
    id: 27,
    difficulty: "easy",
    emojis: ["😊", "➡️", "🙈", "🔪"],
    idiom: "笑里藏刀",
    points: 100,
    reward: 20,
    hint: "比喻表面和善，内心却怀有恶意",
    category: "行为"
  },
  {
    id: 28,
    difficulty: "easy",
    emojis: ["🌱", "🌞", "🌸", "🙌"],
    idiom: "春暖花开",
    points: 100,
    reward: 20,
    hint: "形容春景优美，气候宜人",
    category: "自然"
  },
  {
    id: 29,
    difficulty: "easy",
    emojis: ["1️⃣", "🧂", "2️⃣", "🐟"], 
    idiom: "一言两语",
    points: 100,
    reward: 20,
    hint: "指为数不多的几句话",
    category: "自然"
  },
  {
    id: 30,
    difficulty: "easy",
    emojis: ["🙅🏻‍♀️", "💃🏽", "🍹", "🦩"], 
    idiom: "不舞之鹤",
    points: 100,
    reward: 20,
    hint: "比喻名不副实的人；也用来讥讽人无能",
    category: "自然"
  },
  {
    id: 31,
    difficulty: "easy",
    emojis: ["🌊", "🌊", "✈️", "⛵"],
    idiom: "浪遏飞舟",
    points: 100,
    reward: 20,
    hint: "比喻局势险恶，前进受阻",
    category: "自然"
  },
  {
    id: 32,
    difficulty: "easy",
    emojis: ["🐎", "👂", "🌊", "💨"],
    idiom: "马耳东风",
    points: 100,
    reward: 20,
    hint: "比喻听了也不在意，等于没听见",
    category: "动物"
  },
  {
    id: 33,
    difficulty: "easy",
    emojis: ["⚖️", "👣", "☁️", "🎋"],
    idiom: "平步青云",
    points: 100,
    reward: 20,
    hint: "比喻突然升到很高的地位",
    category: "自然"
  },
  {
    id: 34,
    difficulty: "medium",
    emojis: ["✋", "🌈", "🧊", "💔"],
    idiom: "五彩缤纷",
    points: 150,
    reward: 30,
    hint: "形容色彩繁多，十分绚丽",
    category: "自然"
  },
  {
    id: 35,
    difficulty: "medium",
    emojis: ["🌸", "👍", "🌕", "⭕"],
    idiom: "花好月圆",
    points: 150,
    reward: 30,
    hint: "比喻美好圆满的生活",
    category: "自然"
  },
  {
    id: 36,
    difficulty: "medium",
    emojis: ["⛰️", "💍", "🌊", "✋"],
    idiom: "山盟海誓",
    points: 150,
    reward: 30,
    hint: "指男女相爱时立下的誓言",
    category: "情感"
  },
  {
    id: 37,
    difficulty: "medium",
    emojis: ["🦟", "✈️", "👉", "💧"],
    idiom: "蜻蜓点水",
    points: 150,
    reward: 20,
    hint: "比喻做事肤浅不深入",
    category: "动物"
  },
  {
    id: 38,
    difficulty: "medium",
    emojis: ["🦗", "💪", "🚗", "🛑"],
    idiom: "螳臂当车",
    points: 150,
    reward: 20,
    hint: "比喻力量太小，不自量力",
    category: "动物"
  },
  {
    id: 39,
    difficulty: "medium",
    emojis: ["🏝️", "🐢", "♻️", "🏋️"], 
    idiom: "蹈规循矩",
    points: 150,
    reward: 30,
    hint: "遵守规矩",
    category: "植物"
  },
  {
    id: 40,
    difficulty: "medium",
    emojis: ["❄️", "2️⃣", "🙅🏻‍♀️", "😫"], 
    idiom: "学而不厌",
    points: 200,
    reward: 40,
    hint: "学习总感到不满足，形容好学",
    category: "行为"
  },
  {
    id: 41,
    difficulty: "medium",
    emojis: ["🐔", "🐕", "🚫", "🕊️"],
    idiom: "鸡犬不宁",
    points: 100,
    reward: 20,
    hint: "形容骚扰得厉害，连鸡狗都不得安宁",
    category: "动物"
  },
  {
    id: 42,
    difficulty: "medium",
    emojis: ["💧", "✉️", "🐏", "🌸"], 
    idiom: "水性杨花",
    points: 100,
    reward: 20,
    hint: "意思是像流水那样易变，像杨花那样轻飘，比喻在感情上不专一",
    category: "自然"
  },
  {
    id: 43,
    difficulty: "medium",
    emojis: ["🪞", "🌸", "🌊", "🌙"],
    idiom: "镜花水月",
    points: 100,
    reward: 20,
    hint: "比喻虚幻的景象",
    category: "自然"
  },
  {
    id: 44,
    difficulty: "medium",
    emojis: ["🦢", "🧍", "🐔", "👥"],
    idiom: "鹤立鸡群",
    points: 100,
    reward: 20,
    hint: "比喻一个人的才能或仪表在一群人里显得很突出",
    category: "动物"
  },
  {
    id: 45,
    difficulty: "medium",
    emojis: ["🙅🏻‍♀️", "🉑", "🧂", "🌽"], 
    idiom: "不可言喻",
    points: 100,
    reward: 20,
    hint: "意思指不能用言语来说明",
    category: "行为"
  },
  {
    id: 46,
    difficulty: "medium",
    emojis: ["🚴", "🐯", "😰", "⬇️"],
    idiom: "骑虎难下",
    points: 100,
    reward: 20,
    hint: "比喻事情中途遇到困难，但为形势所迫又无法中止",
    category: "行为"
  },
  {
    id: 47,
    difficulty: "medium",
    emojis: ["🌊", "🏊", "👀", "🐟"],
    idiom: "浮光掠影",
    points: 100,
    reward: 20,
    hint: "比喻对事物观察不深入，印象不深刻",
    category: "自然"
  },
  {
    id: 48,
    difficulty: "medium",
    emojis: ["👇🏻", "👁️", "🍹", "✏️"], 
    idiom: "点睛之笔",
    points: 100,
    reward: 20,
    hint: "指文章传神绝妙之处",
    category: "动物"
  },
  {
    id: 49,
    difficulty: "medium",
    emojis: ["🌱", "🔥", "🌸", "👐"],
    idiom: "春暖花开",
    points: 100,
    reward: 20,
    hint: "形容春景优美，气候宜人",
    category: "自然"
  },
  {
    id: 50,
    difficulty: "medium",
    emojis: ["📦", "👓", "👉", "🧊"], 
    idiom: "相敬如宾",
    points: 100,
    reward: 20,
    hint: "夫妻之间相互敬重爱护，就如同宾客间相待一样",
    category: "自然"
  },
  {
    id: 51,
    difficulty: "medium",
    emojis: ["🧘‍♂️", "贼", "🤍", "🤫"], 
    idiom: "做贼心虚",
    points: 100,
    reward: 20,
    hint: "指做了坏事怕人知道，心里老是不安",
    category: "自然"
  },
  {
    id: 52,
    difficulty: "medium",
    emojis: ["🦆", "🌱", "㊗️", "🤲🏻"], 
    idiom: "揠苗助长",
    points: 100,
    reward: 20,
    hint: "把苗拔起来，帮助其成长。比喻违反事物的发展规律，急于求成，最后事与愿违",
    category: "自然"
  },
  {
    id: 53,
    difficulty: "medium",
    emojis: ["♻️", "😔", "🍹", "🔀"], 
    idiom: "患难之交",
    points: 100,
    reward: 20,
    hint: "指一起经历过艰难处境而有深厚交情的朋友",
    category: "动物"
  },
  {
    id: 54,
    difficulty: "medium",
    emojis: ["🔴", "🎨", "🕷️", "🐔"], 
    idiom: "红颜知己",
    points: 150,
    reward: 30,
    hint: "意为形容男子所拥有的，可以无话不谈的，彼此有共鸣又非常知心的女性朋友",
    category: "自然"
  },
  {
    id: 55,
    difficulty: "medium",
    emojis: ["🌊", "⛰️", "🌅", "🎨"],
    idiom: "山光水色",
    points: 150,
    reward: 30,
    hint: "形容自然景色优美",
    category: "自然"
  },
  {
    id: 56,
    difficulty: "medium",
    emojis: ["🌪️", "🌧️", "⚡", "⛈️"],
    idiom: "风雨雷电",
    points: 150,
    reward: 30,
    hint: "形容自然界的各种天气现象",
    category: "自然"
  },
  {
    id: 57,
    difficulty: "medium",
    emojis: ["🎨", "🐍", "➕", "🦶"],
    idiom: "画蛇添足",
    points: 150,
    reward: 30,
    hint: "比喻做了多余的事，反而不恰当",
    category: "行为"
  },
  {
    id: 58,
    difficulty: "medium",
    emojis: ["🐝", "🦋", "🌸", "💃"],
    idiom: "蝶舞蜂飞",
    points: 100,
    reward: 20,
    hint: "形容春天景象热闹繁荣",
    category: "动物"
  },
  {
    id: 59,
    difficulty: "medium",
    emojis: ["🌊", "🌊", "🏃", "💨"],
    idiom: "波涛汹涌",
    points: 150,
    reward: 30,
    hint: "形容海浪翻滚，气势磅礴",
    category: "自然"
  },
  {
    id: 60,
    difficulty: "medium",
    emojis: ["⛰️", "🗣️", "🌊", "💬"],
    idiom: "山呼海应",
    points: 200,
    reward: 40,
    hint: "形容声势浩大，响应群众",
    category: "自然"
  },
  {
    id: 61,
    difficulty: "medium",
    emojis: ["🐉", "🔼", "🐯", "🦘"],
    idiom: "龙腾虎跃",
    points: 150,
    reward: 30,
    hint: "形容生气勃勃、充满活力的景象",
    category: "动物"
  },
  {
    id: 62,
    difficulty: "medium",
    emojis: ["🌙", "🈵", "🌇", "🏯"],
    idiom: "月满西楼",
    points: 200,
    reward: 40,
    hint: "形容月色美好的夜晚",
    category: "自然"
  },
  {
    id: 63,
    difficulty: "medium",
    emojis: ["🐔", "🐕", "🚫", "🕊️"],
    idiom: "鸡犬不宁",
    points: 100,
    reward: 20,
    hint: "形容骚扰得厉害，连鸡狗都不得安宁",
    category: "动物"
  },
  {
    id: 64,
    difficulty: "medium",
    emojis: ["🌊", "🏙️", "🐚", "🏯"],
    idiom: "海市蜃楼",
    points: 150,
    reward: 30,
    hint: "比喻虚无缥缈的事物",
    category: "自然"
  },
  {
    id: 65,
    difficulty: "medium",
    emojis: ["🍐", "🦅", "😏", "🈴"], 
    idiom: "里应外合",
    points: 200,
    reward: 40,
    hint: "指的是外面攻打，里面接应",
    category: "自然"
  },
  {
    id: 66,
    difficulty: "hard",
    emojis: ["🎃", "🉐", "🐯", "🖼️"], 
    idiom: "难得糊涂",
    points: 150,
    reward: 30,
    hint: "难得糊涂，是清朝乾隆年间郑板桥传世的名言，乃是他为官之道与人生之路的自况，也指人在该装糊涂的时候难得糊涂",
    category: "动物"
  },
  {
    id: 67,
    difficulty: "hard",
    emojis: ["🐺", "🍽️", "🐯", "🔥"],
    idiom: "狼吞虎咽",
    points: 200,
    reward: 40,
    hint: "形容吃东西又猛又急的样子",
    category: "行为"
  },
  {
    id: 68,
    difficulty: "hard",
    emojis: ["💨", "💪", "⛰️", "🌊"], 
    idiom: "气壮山河",
    points: 200,
    reward: 40,
    hint: "形容气势如高山大河般雄壮豪迈，使祖国山河因而更加壮丽",
    category: "行为"
  },
  {
    id: 69,
    difficulty: "hard",
    emojis: ["🍅", "🛫", "👇🏻", "🙃"], 
    idiom: "是非颠倒",
    points: 200,
    reward: 40,
    hint: "把错的说成对的，对的说成错的，把是非弄颠倒了；指故意违反事实，混淆是非",
    category: "自然"
  },
  {
    id: 70,
    difficulty: "hard",
    emojis: ["➖", "🔫", "🌙", "🐴"],
    idiom: "横枪跃马",
    points: 150,
    reward: 30,
    hint: "指手持武器，纵马驰骋；指在沙场作战；犹横戈跃马",
    category: "自然"
  },
  {
    id: 71,
    difficulty: "hard",
    emojis: ["🎭", "🌙", "💐", "🌊"],
    idiom: "月下花前",
    points: 200,
    reward: 40,
    hint: "形容优美浪漫的环境",
    category: "自然"
  },
  {
    id: 72,
    difficulty: "hard",
    emojis: ["🍅", "👨🏼‍🌾", "👉", "🟣"], 
    idiom: "视民如子",
    points: 150,
    reward: 30,
    hint: "形容帝王、官吏爱护百姓",
    category: "自然"
  },
  {
    id: 73,
    difficulty: "hard",
    emojis: ["1️⃣", "🔨", "📌", "🔊"], 
    idiom: "一锤定音",
    points: 200,
    reward: 40,
    hint: "借指凭一句话作出最后决定",
    category: "自然"
  },
  {
    id: 74,
    difficulty: "hard",
    emojis: ["🈚", "🉑", "🆘", "💊"], 
    idiom: "无可救药",
    points: 100,
    reward: 20,
    hint: "病已重到无法用药医治的程度，比喻已经到了无法挽救的地步",
    category: "动物"
  },
  {
    id: 75,
    difficulty: "hard",
    emojis: ["🟣", "🤫", "⛅", "🈶"], 
    idiom: "子虚乌有",
    points: 150,
    reward: 30,
    hint: "司马相如对诸候、天子贪恋游猎、荒废政务的行为作了讽谏，主张修明政治，提倡节俭。在生活中，人们也不能贪恋玩乐、荒废学习，追求子虚乌有的东西，不然长此下去会引来许多不良风气",
    category: "自然"
  },
  {
    id: 76,
    difficulty: "hard",
    emojis: ["🎨", "🦢", "⬇️", "❄️"],
    idiom: "雪泥鸿爪",
    points: 200,
    reward: 40,
    hint: "比喻往事遗留下的痕迹",
    category: "自然"
  },
  {
    id: 77,
    difficulty: "hard",
    emojis: ["🌊", "🏃", "🚫", "💤"],
    idiom: "川流不息",
    points: 200,
    reward: 40,
    hint: "形容行人、车马等像水流一样连续不断",
    category: "自然"
  },
  {
    id: 78,
    difficulty: "hard",
    emojis: ["🌊", "🌊", "1️⃣", "🌾"],
    idiom: "沧海一粟",
    points: 150,
    reward: 30,
    hint: "比喻非常渺小，微不足道",
    category: "自然"
  },
  {
    id: 79,
    difficulty: "hard",
    emojis: ["🛌", "🪵", "👅", "🫁"],
    idiom: "卧薪尝胆",
    points: 200,
    reward: 40,
    hint: "比喻忍受艰难困苦，发奋图强",
    category: "历史"
  },
  {
    id: 80,
    difficulty: "hard",
    emojis: ["🌙", "📖", "✏️", "💡"],
    idiom: "凿壁偷光",
    points: 200,
    reward: 40,
    hint: "形容勤学苦读",
    category: "行为"
  },
  {
    id: 81,
    difficulty: "hard",
    emojis: ["👉", "🎯", "👥", "🦅"],
    idiom: "一箭双雕",
    points: 200,
    reward: 40,
    hint: "比喻一举两得",
    category: "行为"
  },
  {
    id: 82,
    difficulty: "hard",
    emojis: ["1️⃣", "☀️", "🥣", "🐔"], 
    idiom: "一日万机",
    points: 100,
    reward: 20,
    hint: "一天要处理成千上万件公务。形容公务繁忙，每天要处理很多事情",
    category: "行为"
  },
  {
    id: 83,
    difficulty: "hard",
    emojis: ["🎂", "🌪️", "🔆", "🎀"], 
    idiom: "高风亮节",
    points: 100,
    reward: 20,
    hint: "人品格高尚，有坚贞的节操",
    category: "行为"
  },
  {
    id: 84,
    difficulty: "hard",
    emojis: ["💰", "🤍", "🥣", "😩"], 
    idiom: "千辛万苦",
    points: 100,
    reward: 20,
    hint: "指各种各样的艰难困苦",
    category: "物品"
  },
  {
    id: 85,
    difficulty: "hard",
    emojis: ["🈚", "🔒", "🙅🏻‍♀️", "🐔"], 
    idiom: "无所不及",
    points: 150,
    reward: 30,
    hint: "没有地方不能达到",
    category: "物品"
  },
  {
    id: 86,
    difficulty: "hard",
    emojis: ["🛌", "🧊", "🙏🏻", "🍐"], 
    idiom: "卧冰求鲤",
    points: 200,
    reward: 40,
    hint: "卧在冰上以求得鲤鱼，指忍苦孝亲",
    category: "动物"
  },
  {
    id: 87,
    difficulty: "hard",
    emojis: ["💣", "🧆", "🍹", "💧"], 
    idiom: "弹丸之地",
    points: 200,
    reward: 40,
    hint: "弹弓所用的铁丸或泥丸。形容地方非常狭小",
    category: "植物"
  },
  {
    id: 88,
    difficulty: "hard",
    emojis: ["👀", "1️⃣", "4️⃣", "💰"], 
    idiom: "见异思迁",
    points: 200,
    reward: 40,
    hint: "看到别的事物就想改变原来的主意；指主意不坚定，喜爱不专一",
    category: "行为"
  },
  {
    id: 89,
    difficulty: "hard",
    emojis: ["🍵", "🐠", "🍺", "🔙"], 
    idiom: "茶余酒后",
    points: 150,
    reward: 30,
    hint: "泛指休息或空闲的时候",
    category: "植物"
  },
  {
    id: 90,
    difficulty: "hard",
    emojis: ["🙅🏻‍♀️", "🕷️", "4️⃣", "🔥"], 
    idiom: "不知死活",
    points: 200,
    reward: 40,
    hint: "形容不知利害，冒昧从事",
    category: "行为"
  },
  {
    id: 91,
    difficulty: "hard",
    emojis: ["🏃🏻‍♀️", "👏", "🎙️", "😄"], 
    idiom: "追欢卖笑",
    points: 200,
    reward: 40,
    hint: "指出卖色情，供人取乐",
    category: "行为"
  },
  {
    id: 92,
    difficulty: "hard",
    emojis: ["👗", "🚻", "👗", "💪"],  
    idiom: "群策群力",
    points: 200,
    reward: 40,
    hint: "大家一起出谋出力，发挥集体的力量",
    category: "行为"
  },
  {
    id: 93,
    difficulty: "hard",
    emojis: ["⌛", "🌅", "🐴", "🦶"],
    idiom: "露出马脚",
    points: 200,
    reward: 40,
    hint: "比喻隐蔽的事实真相泄露出来",
    category: "行为"
  },
  {
    id: 94,
    difficulty: "hard",
    emojis: ["🈚", "🔆", "🐭", "🐚"], 
    idiom: "无名鼠辈",
    points: 200,
    reward: 40,
    hint: "不出名的小人物，旧小说中经常出现的对敌方的蔑视称呼",
    category: "行为"
  },
  {
    id: 95,
    difficulty: "hard",
    emojis: ["🌽", "🍭", "📦", "🪁"],  
    idiom: "鹬蚌相争",
    points: 200,
    reward: 40,
    hint: "比喻双方争执不下，两败俱伤，让第三者占了便宜",
    category: "行为"
  },
  {
    id: 96,
    difficulty: "hard",
    emojis: ["🅱️", "🧸", "🍪", "🐔"], 
    idiom: "避凶趋吉",
    points: 200,
    reward: 40,
    hint: "避开祸害而趋向吉利或避开凶险，趋向吉祥",
    category: "行为"
  },
  {
    id: 97,
    difficulty: "hard",
    emojis: ["🗳️", "🐭", "🐔", "💨"],
    idiom: "投鼠忌器",
    points: 200,
    reward: 40,
    hint: "本义为想掷打老鼠，却担心老鼠身旁的器物被击坏而不敢下手；后比喻做事有所顾忌，不敢下手",
    category: "行为"
  }
];

module.exports = {
  idioms
}; 
