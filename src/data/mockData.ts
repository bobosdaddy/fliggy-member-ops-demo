import type {
  AudienceCondition,
  AudienceTagKey,
  AnalyticsMetric,
  BenefitCategory,
  BenefitItem,
  ChannelKey,
  PerformanceEntry,
  Role,
  ScenarioAnalytics,
  ScenarioDefinition,
  ScenarioKey,
  Strategy,
} from '../app/types'

/* ───── Role ───── */

export const roleOrder: Role[] = ['platformOps', 'merchantAdmin', 'merchantOperator']

export const roleMeta: Record<Role, { label: string; description: string }> = {
  platformOps: { label: '飞猪小二', description: '负责审核发布、平台节奏把控与资源协同。' },
  merchantAdmin: { label: '商家管理员', description: '负责经营策略配置、活动发布与品牌节奏管理。' },
  merchantOperator: { label: '商家运营', description: '负责内容配置、权益维护与日常运营执行。' },
}

/* ───── Scenario ───── */

export const scenarioMeta: Record<ScenarioKey, { label: string; tone: string }> = {
  registration: { label: '希尔顿拉新', tone: 'violet' },
  firstOrder: { label: '首单激活', tone: 'amber' },
  promoteOrder: { label: '促购转化', tone: 'blue' },
  repurchase: { label: '老客复购', tone: 'teal' },
}

export const scenarioOrder: ScenarioKey[] = ['registration', 'firstOrder', 'promoteOrder', 'repurchase']

/* ───── Audience ───── */

export const conditionMeta: Record<AudienceCondition, { label: string; description: string }> = {
  unregistered: { label: '未注册会员', description: '88VIP 用户中尚未注册品牌会员的人群' },
  registeredNoOrder: { label: '已注册未下单', description: '已注册品牌会员但从未产生订单的人群' },
  orderUnpaid: { label: '下单未支付', description: '已提交订单但未完成支付的会员' },
  orderCancelled: { label: '下单后取消', description: '曾下单但主动取消订单的会员' },
}

export const conditionOrder: AudienceCondition[] = [
  'unregistered',
  'registeredNoOrder',
  'orderUnpaid',
  'orderCancelled',
]

export const audienceTagMeta: Record<AudienceTagKey, { label: string; description: string; tone: string }> = {
  hiltonHighIntent: {
    label: '希尔顿高意向浏览',
    description: '近 30 天多次浏览希尔顿酒店详情页或会员权益页。',
    tone: 'violet',
  },
  hiltonSearchRecent: {
    label: '近 7 天搜索希尔顿',
    description: '近 7 天主动搜索希尔顿品牌酒店，意向度较高。',
    tone: 'blue',
  },
  luxuryHotelFan: {
    label: '高星酒店偏好',
    description: '偏好五星及以上酒店，适合高价值会员拉新。',
    tone: 'teal',
  },
  couponResponder: {
    label: '优惠券敏感用户',
    description: '对注册券、满减券点击和领取行为明显活跃。',
    tone: 'amber',
  },
  businessTraveler: {
    label: '商旅常住人群',
    description: '高频商旅出行，适合希尔顿商旅权益拉新。',
    tone: 'blue',
  },
  familyVacationPlanner: {
    label: '家庭度假计划用户',
    description: '偏好周末和节假日家庭度假，适合礼遇型拉新。',
    tone: 'teal',
  },
}

export const audienceTagOrder: AudienceTagKey[] = [
  'hiltonHighIntent',
  'hiltonSearchRecent',
  'luxuryHotelFan',
  'couponResponder',
  'businessTraveler',
  'familyVacationPlanner',
]

/* ───── Channel ───── */

export const sharedChannelBalance = '¥ 54,600'

export const channelMeta: Record<ChannelKey, { label: string; description: string; estimatedCost: string }> = {
  sms: {
    label: '短信',
    description: '通过短信直接触达用户，覆盖面广，适合大促提醒和优惠推送。',
    estimatedCost: '≈ ¥ 5,800',
  },
  wecom: {
    label: '企微',
    description: '通过企业微信私域运营，支持 1 对 1 精准沟通与社群营销。',
    estimatedCost: '≈ ¥ 3,200',
  },
  storeMsg: {
    label: '店铺消息',
    description: '飞猪 App 内店铺消息推送，用户主动查看，点击率高。',
    estimatedCost: '≈ ¥ 1,600',
  },
}

export const channelOrder: ChannelKey[] = ['sms', 'wecom', 'storeMsg']

/* ───── Benefit ───── */

export const benefitCategoryMeta: Record<BenefitCategory, { label: string; icon: string }> = {
  points: { label: '积分奖励', icon: '🎯' },
  coupon: { label: '优惠券', icon: '🎫' },
  identity: { label: '会员身份', icon: '👑' },
  activity: { label: '会员活动', icon: '🎉' },
}

export const benefitCategoryOrder: BenefitCategory[] = ['points', 'coupon', 'identity', 'activity']

export const initialBenefits: BenefitItem[] = [
  { id: 'b-points-flash', category: 'points', name: '闪促活动积分奖励', description: '闪促期间下单可获得额外积分奖励，积分可兑换酒店权益。', enabled: true },
  { id: 'b-points-register', category: 'points', name: '注册赠积分', description: '新会员注册即赠 100 积分，可用于首单抵扣。', enabled: true },
  { id: 'b-coupon-marriott', category: 'coupon', name: '万豪 800-80 优惠券', description: '万豪酒店满 800 元立减 80 元，适用于全国参与活动的万豪旗下酒店。', brand: '万豪', value: '满800减80', enabled: true },
  { id: 'b-coupon-hilton', category: 'coupon', name: '希尔顿 40 元注册券', description: '新会员注册即领希尔顿 40 元优惠券，首单可用。', brand: '希尔顿', value: '40元', enabled: true },
  { id: 'b-identity-jinjiang', category: 'identity', name: '88VIP 直通锦江金卡', description: '88VIP 用户可直接开通锦江金卡会员身份，享受金卡专属权益。', brand: '锦江', enabled: true },
  { id: 'b-activity-marriott', category: 'activity', name: '万豪会员日', description: '每月 8 号万豪会员日，金卡及以上会员享专属折扣与礼遇。', brand: '万豪', enabled: true },
  { id: 'b-activity-jinjiang', category: 'activity', name: '锦江白金挑战活动', description: '完成指定入住任务即可升级锦江白金会员，享受更高等级礼遇。', brand: '锦江', enabled: true },
]

/* ───── Scenario Definitions ───── */

export const scenarios: ScenarioDefinition[] = [
  {
    id: 'registration',
    name: '希尔顿拉新注册',
    icon: '🚀',
    description: '针对 88VIP 中尚未注册希尔顿会员的用户，通过注册礼券和会员身份权益，优先转化高意向用户入会。',
    aiStrategy: 'AI 自动圈选 88VIP 且希尔顿未注册会员用户，优先推荐近 30 天浏览希尔顿、点击会员权益页、领券未注册的高意向人群，并自动生成注册激励策略。',
    estimatedAudience: '约 68,000 人',
    effectTag: '预估希尔顿注册转化率 22%',
    defaultConditions: ['unregistered'],
    defaultChannels: ['sms', 'storeMsg'],
    defaultBenefitIds: ['b-coupon-hilton', 'b-points-register', 'b-identity-jinjiang'],
    landingTitle: '88VIP 专属 · 注册即享品牌会员礼遇',
    landingSubtitle: '注册品牌会员，解锁专属优惠券、积分奖励与会员身份权益。',
    landingCta: '立即注册',
    landingHighlights: ['注册即领希尔顿 40 元券', '88VIP 直通锦江金卡', '注册赠 100 积分'],
  },
  {
    id: 'firstOrder',
    name: '会员首单激活',
    icon: '⚡',
    description: '针对已注册但未下单的会员，通过首单优惠与限时权益降低决策门槛，推动首次预订转化。',
    aiStrategy: '基于会员注册时间与浏览行为，圈选注册超过 7 天但未产生首单的用户，结合浏览偏好推送个性化首单优惠。',
    estimatedAudience: '约 42,000 人',
    effectTag: '预估首单转化率 18%',
    defaultConditions: ['registeredNoOrder'],
    defaultChannels: ['wecom', 'sms'],
    defaultBenefitIds: ['b-coupon-marriott', 'b-points-flash'],
    landingTitle: '首单专享 · 万豪立减 80 元',
    landingSubtitle: '品牌会员首单预订万豪酒店，满 800 立减 80 元，更有闪促积分翻倍。',
    landingCta: '立即预订',
    landingHighlights: ['万豪满 800 减 80', '闪促积分翻倍', '限时 48 小时有效'],
  },
  {
    id: 'promoteOrder',
    name: '会员促购转化',
    icon: '🛍️',
    description: '针对下单未支付、下单后取消等高意向人群，通过撬动商家权益和限时刺激促进下单转化。',
    aiStrategy: '基于订单流失节点与取消原因标签，圈选下单未支付、下单后取消的高意向会员，优先投放高感知权益与限时成交提醒，推动即时回流。',
    estimatedAudience: '约 26,000 人',
    effectTag: '预估补单转化率 19%',
    defaultConditions: ['orderUnpaid', 'orderCancelled'],
    defaultChannels: ['sms', 'wecom'],
    defaultBenefitIds: ['b-coupon-marriott', 'b-coupon-hilton', 'b-points-flash'],
    landingTitle: '限时挽回 · 下单即享专属促购权益',
    landingSubtitle: '针对高意向未成交会员，叠加优惠券与积分激励，促进订单快速转化。',
    landingCta: '立即补单',
    landingHighlights: ['取消订单专属补贴', '补单享闪促积分奖励', '限时 2 小时成交加码'],
  },
  {
    id: 'repurchase',
    name: '会员老客复购',
    icon: '🔄',
    description: '针对有过订单但近期未复购的老客会员，通过专属活动与积分激励唤醒复购意愿。',
    aiStrategy: '基于会员历史消费数据与活跃度衰减模型，筛选 30 天以上未复购的高价值老客，推送定向复购礼遇与会员活动。',
    estimatedAudience: '约 31,000 人',
    effectTag: '预估复购率提升 25%',
    defaultConditions: ['orderUnpaid', 'orderCancelled'],
    defaultChannels: ['wecom', 'storeMsg'],
    defaultBenefitIds: ['b-activity-marriott', 'b-activity-jinjiang', 'b-points-flash'],
    landingTitle: '老客专属 · 会员活动礼遇季',
    landingSubtitle: '万豪会员日 + 锦江白金挑战，多重礼遇等你回归。',
    landingCta: '查看活动',
    landingHighlights: ['万豪会员日专属折扣', '锦江白金挑战升级', '闪促积分加码'],
  },
]

/* ───── Dashboard ───── */

export const dashboardMetrics: AnalyticsMetric[] = [
  { label: '新注册会员', value: '12,680', helper: '本月拉新注册持续增长' },
  { label: '首单转化', value: '5,420', helper: '首单激活策略效果显著' },
  { label: '老客复购', value: '3,860', helper: '复购策略唤醒高价值用户' },
  { label: '88VIP 覆盖', value: '68,000', helper: '88VIP 人群持续扩大' },
  { label: '活动 GMV', value: '¥520万', helper: '本月活动贡献 GMV' },
  { label: '投放 ROI', value: '8.6', helper: '综合渠道投放效率' },
]

export const dashboardTrend = [38, 45, 52, 58, 66, 74, 86]

/* ───── Initial Strategies ───── */

export const initialStrategies: Strategy[] = [
  {
    id: 'str-reg-01',
    name: '88VIP 拉新注册 · 希尔顿专场',
    scenario: 'registration',
    conditions: ['unregistered'],
    channels: ['sms', 'storeMsg'],
    creative: {
      id: 'cr-reg-01', name: '拉新注册 · 希尔顿主视觉', mode: 'ai', link: '',
      landingTitle: '88VIP 专属 · 注册即享品牌会员礼遇',
      landingSubtitle: '注册品牌会员，解锁专属优惠券、积分奖励与会员身份权益。',
      landingCta: '立即注册',
      landingHighlights: ['注册即领希尔顿 40 元券', '88VIP 直通锦江金卡', '注册赠 100 积分'],
      benefitIds: ['b-coupon-hilton', 'b-points-register', 'b-identity-jinjiang'],
      updatedAt: '04.18 10:30',
    },
    benefitIds: ['b-coupon-hilton', 'b-points-register', 'b-identity-jinjiang'],
    status: 'running',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    note: '面向 88VIP 未注册用户，短信 + 店铺消息双渠道触达。',
    updatedAt: '04.18 10:30',
  },
  {
    id: 'str-first-01',
    name: '首单激活 · 万豪满减专场',
    scenario: 'firstOrder',
    conditions: ['registeredNoOrder'],
    channels: ['wecom', 'sms'],
    creative: {
      id: 'cr-first-01', name: '首单激活 · 万豪主视觉', mode: 'ai', link: '',
      landingTitle: '首单专享 · 万豪立减 80 元',
      landingSubtitle: '品牌会员首单预订万豪酒店，满 800 立减 80 元。',
      landingCta: '立即预订',
      landingHighlights: ['万豪满 800 减 80', '闪促积分翻倍', '限时 48 小时有效'],
      benefitIds: ['b-coupon-marriott', 'b-points-flash'],
      updatedAt: '04.18 11:00',
    },
    benefitIds: ['b-coupon-marriott', 'b-points-flash'],
    status: 'running',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    note: '面向已注册未下单会员，企微 + 短信组合触达。',
    updatedAt: '04.18 11:00',
  },
  {
    id: 'str-repurchase-01',
    name: '老客复购 · 会员活动季',
    scenario: 'repurchase',
    conditions: ['orderUnpaid', 'orderCancelled'],
    channels: ['wecom', 'storeMsg'],
    creative: {
      id: 'cr-repurchase-01', name: '老客复购 · 活动季主视觉', mode: 'ai', link: '',
      landingTitle: '老客专属 · 会员活动礼遇季',
      landingSubtitle: '万豪会员日 + 锦江白金挑战，多重礼遇等你回归。',
      landingCta: '查看活动',
      landingHighlights: ['万豪会员日专属折扣', '锦江白金挑战升级', '闪促积分加码'],
      benefitIds: ['b-activity-marriott', 'b-activity-jinjiang', 'b-points-flash'],
      updatedAt: '04.18 14:00',
    },
    benefitIds: ['b-activity-marriott', 'b-activity-jinjiang', 'b-points-flash'],
    status: 'running',
    startDate: '2026-04-01',
    endDate: '2026-05-15',
    note: '面向 30 天以上未复购老客，企微 + 店铺消息组合唤醒。',
    updatedAt: '04.18 14:00',
  },
  {
    id: 'str-promote-01',
    name: '促购转化 · 流失订单挽回',
    scenario: 'promoteOrder',
    conditions: ['orderUnpaid', 'orderCancelled'],
    channels: ['sms', 'wecom'],
    creative: {
      id: 'cr-promote-01', name: '促购转化 · 挽回主视觉', mode: 'ai', link: '',
      landingTitle: '限时挽回 · 下单即享专属促购权益',
      landingSubtitle: '针对高意向未成交会员，叠加优惠券与积分激励，促进订单快速转化。',
      landingCta: '立即补单',
      landingHighlights: ['取消订单专属补贴', '补单享闪促积分奖励', '限时 2 小时成交加码'],
      benefitIds: ['b-coupon-marriott', 'b-coupon-hilton', 'b-points-flash'],
      updatedAt: '04.18 16:20',
    },
    benefitIds: ['b-coupon-marriott', 'b-coupon-hilton', 'b-points-flash'],
    status: 'running',
    startDate: '2026-04-10',
    endDate: '2026-04-30',
    note: '面向下单未支付与取消订单会员，短信 + 企微双触达促进回流成交。',
    updatedAt: '04.18 16:20',
  },
]

/* ───── Performance ───── */

export const performanceEntries: Record<string, PerformanceEntry> = {
  'str-reg-01': { strategyId: 'str-reg-01', exposure: 280000, clicks: 42000, conversions: 12680, gmv: 3200000 },
  'str-first-01': { strategyId: 'str-first-01', exposure: 180000, clicks: 28800, conversions: 5420, gmv: 4800000 },
  'str-promote-01': { strategyId: 'str-promote-01', exposure: 145000, clicks: 26100, conversions: 4680, gmv: 4380000 },
  'str-repurchase-01': { strategyId: 'str-repurchase-01', exposure: 120000, clicks: 21600, conversions: 3860, gmv: 5200000 },
}

/* ───── Analytics by Scenario ───── */

export const analyticsByScenario: Record<ScenarioKey, ScenarioAnalytics> = {
  registration: {
    scenario: 'registration',
    summary: [
      { label: '目标人群', value: '68,000', helper: '88VIP 未注册品牌会员' },
      { label: '成功触达', value: '52,400', helper: '触达率 77.1%' },
      { label: '注册转化', value: '12,680', helper: '注册转化率 24.2%' },
      { label: 'GMV 贡献', value: '¥320万', helper: '新会员首单带动增长' },
    ],
    trend: [32, 38, 46, 54, 62, 72, 86],
    funnel: [
      { label: '目标人群', value: 68000 },
      { label: '成功触达', value: 52400 },
      { label: '点击注册', value: 18600 },
      { label: '完成注册', value: 12680 },
    ],
    channelContribution: [
      { label: '短信', value: 45 },
      { label: '店铺消息', value: 38 },
      { label: '企微', value: 17 },
    ],
  },
  firstOrder: {
    scenario: 'firstOrder',
    summary: [
      { label: '目标人群', value: '42,000', helper: '已注册未下单会员' },
      { label: '成功触达', value: '33,600', helper: '触达率 80.0%' },
      { label: '首单转化', value: '5,420', helper: '首单转化率 16.1%' },
      { label: 'GMV 贡献', value: '¥480万', helper: '首单客单价 ¥885' },
    ],
    trend: [22, 28, 34, 40, 46, 52, 58],
    funnel: [
      { label: '目标人群', value: 42000 },
      { label: '成功触达', value: 33600 },
      { label: '点击活动', value: 12400 },
      { label: '首单完成', value: 5420 },
    ],
    channelContribution: [
      { label: '企微', value: 48 },
      { label: '短信', value: 35 },
      { label: '店铺消息', value: 17 },
    ],
  },
  promoteOrder: {
    scenario: 'promoteOrder',
    summary: [
      { label: '目标人群', value: '26,000', helper: '下单未支付 + 取消订单会员' },
      { label: '成功触达', value: '20,400', helper: '触达率 78.5%' },
      { label: '补单转化', value: '4,680', helper: '补单转化率 22.9%' },
      { label: 'GMV 贡献', value: '¥438万', helper: '挽回订单贡献 GMV' },
    ],
    trend: [20, 24, 28, 33, 37, 43, 51],
    funnel: [
      { label: '目标人群', value: 26000 },
      { label: '成功触达', value: 20400 },
      { label: '点击补单', value: 9100 },
      { label: '补单完成', value: 4680 },
    ],
    channelContribution: [
      { label: '短信', value: 41 },
      { label: '企微', value: 39 },
      { label: '店铺消息', value: 20 },
    ],
  },
  repurchase: {
    scenario: 'repurchase',
    summary: [
      { label: '目标人群', value: '31,000', helper: '30 天+ 未复购老客' },
      { label: '成功触达', value: '24,800', helper: '触达率 80.0%' },
      { label: '复购转化', value: '3,860', helper: '复购率 15.6%' },
      { label: 'GMV 贡献', value: '¥520万', helper: '老客客单价 ¥1,347' },
    ],
    trend: [18, 22, 26, 30, 36, 42, 48],
    funnel: [
      { label: '目标人群', value: 31000 },
      { label: '成功触达', value: 24800 },
      { label: '点击活动', value: 9200 },
      { label: '复购完成', value: 3860 },
    ],
    channelContribution: [
      { label: '企微', value: 42 },
      { label: '店铺消息', value: 36 },
      { label: '短信', value: 22 },
    ],
  },
}

/* ───── Misc ───── */

export const quickTodos = [
  '1 条策略待发布',
  '2 个渠道素材待配置',
  '1 个活动本周到期',
]

export const brandProfile = {
  brandName: '飞猪品牌会员',
  platformName: '飞猪',
  proposition: '品牌会员智能经营平台',
  collaboration: '飞猪小二 + 商家共同管理',
}

export const statusMeta: Record<string, { label: string; tone: string }> = {
  draft: { label: '草稿', tone: 'muted' },
  pending: { label: '待审核', tone: 'warning' },
  running: { label: '运行中', tone: 'success' },
}
