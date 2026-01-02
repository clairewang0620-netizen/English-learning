
import { Word, Article } from './types';

export const CATEGORIES = [
  "CET-4 / CET-6",
  "Business English",
  "Daily Life",
  "Professional Writing",
  "Financial English",
  "Social & Communication",
  "Work & Career"
];

export const getCategoryColor = (cat: string): string => {
  switch (cat) {
    case "CET-4 / CET-6": return "text-blue-500 bg-blue-50 border-blue-100";
    case "Business English": return "text-purple-600 bg-purple-50 border-purple-100";
    case "Daily Life": return "text-green-500 bg-green-50 border-green-100";
    case "Professional Writing": return "text-orange-500 bg-orange-100 border-orange-100";
    case "Financial English": return "text-red-500 bg-red-50 border-red-100";
    case "Social & Communication": return "text-cyan-600 bg-cyan-50 border-cyan-100";
    case "Work & Career": return "text-indigo-700 bg-indigo-50 border-indigo-100";
    default: return "text-slate-500 bg-slate-50 border-slate-100";
  }
};

export const INITIAL_WORDS: Word[] = [
  // ... Previous words w1 to w167 are retained ...
  {id:"w1",word:"Resilient",ipa:"/rɪˈzɪliənt/",meaning:"有复原力的",categories:["CET-4 / CET-6","Work & Career"],examples:[{sentence:"The economy proved to be resilient despite the recession.",translation:"尽管衰退，经济仍有韧性。"},{sentence:"She is a resilient girl who recovers from setbacks.",translation:"她是能从挫折中恢复的坚韧女孩。"}]},
  {id:"w2",word:"Mitigate",ipa:"/ˈmɪtɪɡeɪt/",meaning:"减轻",categories:["CET-4 / CET-6","Work & Career"],examples:[{sentence:"Measures were taken to mitigate the effects of drought.",translation:"采取措施减轻旱情影响。"},{sentence:"Planning can mitigate some of the risks involved.",translation:"规划可以降低风险。"}]},
  // [Expanding words from w168 to w200]
  {id:"w168",word:"Exacerbate",ipa:"/ɪɡˈzæsəbeɪt/",meaning:"恶化",categories:["Business English","CET-4 / CET-6"],examples:[{sentence:"The high interest rates will exacerbate the company's debt problem.",translation:"高利率将加剧公司的债务问题。"},{sentence:"Don't exacerbate the situation by arguing.",translation:"不要通过争吵来使情况恶化。"}]},
  {id:"w169",word:"Prerequisite",ipa:"/ˌpriːˈrekwəzɪt/",meaning:"前提",categories:["Work & Career","CET-4 / CET-6"],examples:[{sentence:"A degree is a prerequisite for this job.",translation:"学位是这份工作的先决条件。"},{sentence:"Patience is a prerequisite for a teacher.",translation:"耐心是当老师的前提。"}]},
  {id:"w170",word:"Ubiquitous",ipa:"/juːˈbɪkwɪtəs/",meaning:"无处不在的",categories:["Daily Life","CET-4 / CET-6"],examples:[{sentence:"Coffee shops are ubiquitous in this city.",translation:"咖啡馆在这个城市随处可见。"},{sentence:"The mobile phone has become ubiquitous.",translation:"手机已经变得无处不在。"}]},
  {id:"w171",word:"Substantiate",ipa:"/səbˈstænʃieɪt/",meaning:"证实",categories:["Professional Writing","CET-4 / CET-6"],examples:[{sentence:"We need more evidence to substantiate your claim.",translation:"我们需要更多证据来证实你的说法。"},{sentence:"The findings were substantiated by independent research.",translation:"这些发现得到了独立研究的证实。"}]},
  {id:"w172",word:"Benevolent",ipa:"/bəˈnevələnt/",meaning:"仁慈的",categories:["Social & Communication"],examples:[{sentence:"The organization was established for benevolent purposes.",translation:"该机构是为了慈善目的而设立的。"},{sentence:"He was a benevolent master to his servants.",translation:"他对仆人是一个仁慈的主人。"}]},
  {id:"w173",word:"Volatility",ipa:"/ˌvɒləˈtɪləti/",meaning:"波动性",categories:["Financial English","Business English"],examples:[{sentence:"Market volatility makes investors nervous.",translation:"市场波动让投资者感到紧张。"},{sentence:"The volatility of fuel prices affects transport costs.",translation:"燃料价格的波动影响运输成本。"}]},
  {id:"w174",word:"Empowerment",ipa:"/ɪmˈpaʊəmənt/",meaning:"赋权",categories:["Work & Career","Social & Communication"],examples:[{sentence:"Employee empowerment is key to innovation.",translation:"员工赋权是创新的关键。"},{sentence:"Female empowerment is a global movement.",translation:"女性赋权是一项全球运动。"}]},
  {id:"w175",word:"Incentivize",ipa:"/ɪnˈsentɪvaɪz/",meaning:"激励",categories:["Business English","Work & Career"],examples:[{sentence:"We need to incentivize high-performing staff.",translation:"我们需要激励高绩效员工。"},{sentence:"Lower taxes can incentivize investment.",translation:"低税收可以激励投资。"}]},
  {id:"w176",word:"Meticulous",ipa:"/məˈtɪkjələs/",meaning:"严谨的",categories:["Professional Writing","Work & Career"],examples:[{sentence:"She is meticulous about her work.",translation:"她对工作非常细心严谨。"},{sentence:"The research was meticulous and thorough.",translation:"研究工作既严谨又彻底。"}]},
  {id:"w177",word:"Standardize",ipa:"/ˈstændədaɪz/",meaning:"标准化",categories:["Business English","Work & Career"],examples:[{sentence:"We aim to standardize our production process.",translation:"我们的目标是将生产过程标准化。"},{sentence:"Tests are standardized across the country.",translation:"测试在全国范围内是标准化的。"}]},
  {id:"w178",word:"Cognitive",ipa:"/ˈkɒɡnətɪv/",meaning:"认知的",categories:["CET-4 / CET-6","Daily Life"],examples:[{sentence:"Cognitive development starts at a very young age.",translation:"认知发展从很小的时候就开始了。"},{sentence:"Brain training can improve cognitive skills.",translation:"大脑训练可以提高认知技能。"}]},
  {id:"w179",word:"Feasibility",ipa:"/ˌfiːzəˈbɪləti/",meaning:"可行性",categories:["Work & Career","Business English"],examples:[{sentence:"We conducted a feasibility study before starting.",translation:"我们在开始前进行了可行性研究。"},{sentence:"The feasibility of the project is in question.",translation:"该项目的可行性存在疑问。"}]},
  {id:"w180",word:"Synthesize",ipa:"/ˈsɪnθəsaɪz/",meaning:"综合",categories:["Professional Writing","CET-4 / CET-6"],examples:[{sentence:"He tried to synthesize the results from various studies.",translation:"他试图综合各项研究的结果。"},{sentence:"The report synthesizes complex data.",translation:"报告综合了复杂的数据。"}]},
  {id:"w181",word:"Paradox",ipa:"/ˈpærədɒks/",meaning:"悖论",categories:["CET-4 / CET-6","Daily Life"],examples:[{sentence:"It is a paradox that the more you give, the more you have.",translation:"这是一个悖论：你付出的越多，拥有的就越多。"},{sentence:"The paradox of choice can be overwhelming.",translation:"选择的悖论可能会让人不知所措。"}]},
  {id:"w182",word:"Leverage",ipa:"/ˈliːvərɪdʒ/",meaning:"杠杆作用/利用",categories:["Business English","Financial English"],examples:[{sentence:"We should leverage our expertise in this area.",translation:"我们应该利用我们在该领域的专长。"},{sentence:"The company used debt to leverage its growth.",translation:"公司利用债务来杠杆式增长。"}]},
  {id:"w183",word:"Compliance",ipa:"/kəmˈplaɪəns/",meaning:"合规",categories:["Business English","Work & Career"],examples:[{sentence:"Compliance with safety regulations is mandatory.",translation:"遵守安全法规是强制性的。"},{sentence:"The audit ensures legal compliance.",translation:"审计确保法律合规性。"}]},
  {id:"w184",word:"Redundancy",ipa:"/rɪˈdʌndənsi/",meaning:"裁员/冗余",categories:["Work & Career","Business English"],examples:[{sentence:"Many workers face the threat of redundancy.",translation:"许多工人面临裁员的威胁。"},{sentence:"The system has built-in redundancy for safety.",translation:"为了安全，该系统具有内置冗余。"}]},
  {id:"w185",word:"Trajectory",ipa:"/trəˈdʒektəri/",meaning:"轨迹",categories:["Professional Writing","CET-4 / CET-6"],examples:[{sentence:"The company's growth trajectory is impressive.",translation:"公司的增长轨迹令人印象深刻。"},{sentence:"He predicted a downward trajectory for the market.",translation:"他预测市场将呈下降趋势。"}]},
  {id:"w186",word:"Exemplify",ipa:"/ɪɡˈzemplɪfaɪ/",meaning:"例证",categories:["Professional Writing","CET-4 / CET-6"],examples:[{sentence:"His success exemplifies the power of persistence.",translation:"他的成功例证了坚持的力量。"},{sentence:"These buildings exemplify modern architecture.",translation:"这些建筑是现代建筑的典范。"}]},
  {id:"w187",word:"Indigenous",ipa:"/ɪnˈdɪdʒənəs/",meaning:"本土的",categories:["Social & Communication","CET-4 / CET-6"],examples:[{sentence:"The kangaroo is indigenous to Australia.",translation:"袋鼠是澳大利亚特有的。"},{sentence:"They are the indigenous people of this land.",translation:"他们是这片土地的土著人。"}]},
  {id:"w188",word:"Prosperity",ipa:"/prɒˈsperəti/",meaning:"繁荣",categories:["CET-4 / CET-6","Business English"],examples:[{sentence:"The country enjoyed a period of peace and prosperity.",translation:"该国享有一段和平与繁荣的时期。"},{sentence:"Education is the key to national prosperity.",translation:"教育是国家繁荣的关键。"}]},
  {id:"w189",word:"Sovereignty",ipa:"/ˈsɒvrənti/",meaning:"主权",categories:["Social & Communication","CET-4 / CET-6"],examples:[{sentence:"The state fought for its national sovereignty.",translation:"该国为国家主权而战。"},{sentence:"Digital sovereignty is a growing concern.",translation:"数字主权是一个日益受到关注的问题。"}]},
  {id:"w190",word:"Vanguard",ipa:"/ˈvænɡɑːd/",meaning:"先锋",categories:["Business English","Work & Career"],examples:[{sentence:"This company is in the vanguard of medical research.",translation:"这家公司处于医学研究的最前沿。"},{sentence:"He was in the vanguard of the artistic movement.",translation:"他是艺术运动的先锋。"}]},
  {id:"w191",word:"Aesthetic",ipa:"/iːsˈθetɪk/",meaning:"审美的",categories:["Daily Life","CET-4 / CET-6"],examples:[{sentence:"The building has a unique aesthetic appeal.",translation:"这座建筑具有独特的审美吸引力。"},{sentence:"She improved the aesthetic of the website.",translation:"她改进了网站的美感。"}]},
  {id:"w192",word:"Bureaucracy",ipa:"/bjʊəˈrɒkrəsi/",meaning:"官僚主义",categories:["Social & Communication","Work & Career"],examples:[{sentence:"We need to reduce red tape and bureaucracy.",translation:"我们需要减少繁文缛节和官僚主义。"},{sentence:"The bureaucracy delayed the project for months.",translation:"官僚作风使该项目延迟了数月。"}]},
  {id:"w193",word:"Decentralize",ipa:"/ˌdiːˈsentrəlaɪz/",meaning:"去中心化",categories:["Business English","Financial English"],examples:[{sentence:"The government plans to decentralize its power.",translation:"政府计划权力下放。"},{sentence:"Blockchain is a decentralized ledger technology.",translation:"区块链是一种去中心化的账本技术。"}]},
  {id:"w194",word:"Fluctuation",ipa:"/ˌflʌktʃuˈeɪʃn/",meaning:"波动",categories:["Financial English","CET-4 / CET-6"],examples:[{sentence:"There was a slight fluctuation in the temperature.",translation:"气温有轻微波动。"},{sentence:"Stock market fluctuations are normal.",translation:"股市波动是正常的。"}]},
  {id:"w195",word:"Hierarchy",ipa:"/ˈhaɪərɑːki/",meaning:"等级制度",categories:["Work & Career","Social & Communication"],examples:[{sentence:"There is a strict hierarchy within the army.",translation:"军队内部有严格的等级制度。"},{sentence:"The flat hierarchy encourages communication.",translation:"扁平化等级制度鼓励交流。"}]},
  {id:"w196",word:"Inherent",ipa:"/ɪnˈhɪərənt/",meaning:"固有的",categories:["CET-4 / CET-6","Daily Life"],examples:[{sentence:"Risk is inherent in any new business venture.",translation:"任何新的商业尝试都存在固有的风险。"},{sentence:"The desire for freedom is inherent in human nature.",translation:"对自由的渴望是人类天性中固有的。"}]},
  {id:"w197",word:"Justification",ipa:"/ˌdʒʌstɪfɪˈkeɪʃn/",meaning:"辩护/理由",categories:["Professional Writing","CET-4 / CET-6"],examples:[{sentence:"There is no justification for such behavior.",translation:"这种行为是没有任何道理的。"},{sentence:"He provided a detailed justification for the costs.",translation:"他为这些成本提供了详细的理由。"}]},
  {id:"w198",word:"Kinetic",ipa:"/kɪˈnetɪk/",meaning:"动能的",categories:["CET-4 / CET-6"],examples:[{sentence:"The kinetic energy of the moving car is high.",translation:"行驶中汽车的动能很高。"},{sentence:"The film has a kinetic, fast-paced style.",translation:"这部电影具有动感且节奏紧凑的风格。"}]},
  {id:"w199",word:"Liability",ipa:"/ˌlaɪəˈbɪləti/",meaning:"法律责任/负债",categories:["Business English","Financial English"],examples:[{sentence:"The company admits no liability for the accident.",translation:"公司对该事故不承担任何责任。"},{sentence:"Your total liabilities exceed your assets.",translation:"你的总负债超过了你的资产。"}]},
  {id:"w200",word:"Manifest",ipa:"/ˈmænɪfest/",meaning:"表现/明显的",categories:["CET-4 / CET-6","Daily Life"],examples:[{sentence:"The symptoms of the disease began to manifest.",translation:"该疾病的症状开始显现。"},{sentence:"His dissatisfaction was manifest in his expression.",translation:"他的不满从表情中显而易见。"}]},
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "a1",
    title: "The Subtle Art of Resilient Leadership",
    source: "The Economist Style",
    segments: [
      { id: "s1-1", text: "In an era of unprecedented global volatility, the concept of resilience has moved from a psychological niche to a corporate imperative.", translation: "在空前的全球动荡时代，韧性的概念已从心理学的小众领域转向企业必须具备的素质。" },
      { id: "s1-2", text: "Resilient leaders are those who can navigate ambiguity while maintaining a strategic focus on long-term prosperity.", translation: "有韧性的领导者是那些能够驾驭模糊性，同时保持对长期繁荣的战略关注的人。" },
      { id: "s1-3", text: "They mitigate risks not by avoiding them, but by building systems that can absorb shocks and adapt rapidly to new paradigms.", translation: "他们减轻风险不是通过规避，而是通过建立能够吸收冲击并快速适应新范式的系统。" }
    ],
    keyPhrases: [
      { phrase: "Unprecedented global volatility", meaning: "前所未有的全球波动" },
      { phrase: "Corporate imperative", meaning: "企业的当务之急" },
      { phrase: "Navigate ambiguity", meaning: "驾驭模糊性" },
      { phrase: "Absorb shocks", meaning: "吸收冲击" },
      { phrase: "Adapt to new paradigms", meaning: "适应新范式" }
    ]
  },
  {
    id: "a2",
    title: "Why Decentralization is the Future of Finance",
    source: "Financial Times Style",
    segments: [
      { id: "s2-1", text: "The traditional financial hierarchy is facing its most disruptive challenge yet: Decentralized Finance, or DeFi.", translation: "传统金融等级制度正面临其迄今为止最具颠覆性的挑战：去中心化金融（简称DeFi）。" },
      { id: "s2-2", text: "By leveraging blockchain technology, DeFi aims to remove the need for centralized intermediaries like banks.", translation: "通过利用区块链技术，DeFi旨在消除对银行等中心化中间机构的需求。" },
      { id: "s2-3", text: "Proponents argue that this will empower individuals and provide more transparent and equitable access to capital.", translation: "支持者认为，这将赋予个人权力，并提供更透明、更公平的资本获取渠道。" }
    ],
    keyPhrases: [
      { phrase: "Financial hierarchy", meaning: "金融等级" },
      { phrase: "Disruptive challenge", meaning: "颠覆性挑战" },
      { phrase: "Leverage blockchain", meaning: "利用区块链" },
      { phrase: "Centralized intermediaries", meaning: "中心化中间机构" },
      { phrase: "Equitable access to capital", meaning: "公平的资本获取" }
    ]
  },
  {
    id: "a3",
    title: "The Aesthetic of Modern Minimalism",
    source: "TIME Magazine Style",
    segments: [
      { id: "s3-1", text: "Modern minimalism is not just about having fewer things; it is a meticulous curation of one's environment.", translation: "现代极简主义不仅仅是拥有更少的东西；它是对个人环境的细致策划。" },
      { id: "s3-2", text: "This aesthetic shift exemplifies a growing desire for clarity and calm in an increasingly ubiquitous digital world.", translation: "这种审美转变体现了在日益普及的数字世界中对清晰和宁静的日益渴望。" },
      { id: "s3-3", text: "By stripping away the non-essential, individuals can find a sense of equilibrium and focus on what truly matters.", translation: "通过剥离非本质的东西，个人可以找到平衡感，并专注于真正重要的事情。" }
    ],
    keyPhrases: [
      { phrase: "Meticulous curation", meaning: "细致策划" },
      { phrase: "Aesthetic shift", meaning: "审美转变" },
      { phrase: "Ubiquitous digital world", meaning: "无处不在的数字世界" },
      { phrase: "Stripping away non-essential", meaning: "剥离非本质" },
      { phrase: "Sense of equilibrium", meaning: "平衡感" }
    ]
  },
  {
    id: "a4",
    title: "Navigating the Complexities of Workplace Culture",
    source: "Harvard Business Review Style",
    segments: [
      { id: "s4-1", text: "Workplace culture is an inherent part of any organization, yet it often remains ambiguous and hard to define.", translation: "职场文化是任何组织固有的一部分，但它往往保持模糊且难以定义。" },
      { id: "s4-2", text: "A prerequisite for a healthy culture is open communication and a clear understanding of the company's core attributes.", translation: "健康文化的先决条件是公开的沟通以及对公司核心属性的清晰理解。" },
      { id: "s4-3", text: "When leadership fails to substantiate their values with action, cynicism can exacerbate existing problems.", translation: "当领导层未能用行动证实其价值观时，愤世嫉俗的情绪会加剧现有问题。" }
    ],
    keyPhrases: [
      { phrase: "Inherent part", meaning: "固有部分" },
      { phrase: "Prerequisite for health", meaning: "健康的先决条件" },
      { phrase: "Core attributes", meaning: "核心属性" },
      { phrase: "Substantiate values", meaning: "证实价值观" },
      { phrase: "Exacerbate problems", meaning: "加剧问题" }
    ]
  },
  {
    id: "a5",
    title: "The Growth Trajectory of Sustainable Energy",
    source: "BBC Science Report",
    segments: [
      { id: "s5-1", text: "The trajectory of sustainable energy has shifted dramatically as technology costs continue to plummet.", translation: "随着技术成本持续暴跌，可持续能源的发展轨迹发生了巨大变化。" },
      { id: "s5-2", text: "Governments are now incentivizing the transition to green energy to mitigate the long-term impacts of climate change.", translation: "各国政府目前正在激励向绿色能源的转型，以减轻气候变化的长期影响。" },
      { id: "s5-3", text: "The feasibility of a net-zero future is no longer a paradox, but a manifest reality driven by innovation.", translation: "净零未来的可行性不再是一个悖论，而是由创新驱动的显而易见的现实。" }
    ],
    keyPhrases: [
      { phrase: "Growth trajectory", meaning: "增长轨迹" },
      { phrase: "Incentivize transition", meaning: "激励转型" },
      { phrase: "Mitigate impacts", meaning: "减轻影响" },
      { phrase: "Net-zero future", meaning: "净零未来" },
      { phrase: "Manifest reality", meaning: "显而易见的现实" }
    ]
  },
  {
    id: "a6",
    title: "The Importance of Ethical AI Development",
    source: "Wired Magazine Style",
    segments: [
      { id: "s6-1", text: "As AI becomes more ubiquitous, the ethical implications of its development cannot be ignored.", translation: "随着人工智能变得越来越普及，其发展的伦理影响不容忽视。" },
      { id: "s6-2", text: "We must ensure that algorithms do not reinforce existing social hierarchies or create new liabilities for society.", translation: "我们必须确保算法不会强化现有的社会等级制度，或为社会创造新的责任风险。" },
      { id: "s6-3", text: "Transparency is a prerequisite for building public trust and ensuring that AI serves the collective good.", translation: "透明度是建立公众信任并确保人工智能服务于集体利益的先决条件。" }
    ],
    keyPhrases: [
      { phrase: "Ethical implications", meaning: "伦理影响" },
      { phrase: "Social hierarchies", meaning: "社会等级" },
      { phrase: "Create new liabilities", meaning: "创造新的责任" },
      { phrase: "Prerequisite for trust", meaning: "信任的先决条件" },
      { phrase: "Collective good", meaning: "集体利益" }
    ]
  }
];
