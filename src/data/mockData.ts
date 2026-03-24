import type {
  Activity,
  AudienceKey,
  BenefitConfig,
  BoostType,
  CampaignFormValues,
  ChannelAnalytics,
  ChannelDefinition,
  ChannelKey,
  Goal,
  GoalAnalytics,
  MarketingFormValues,
  MarketingPreset,
  MarketingType,
  OperatingStage,
  PerformanceEntry,
  PlacementConfig,
  PlacementKey,
  ResourceSlotDefinition,
  ResourceSlotKey,
  Role,
  Segment,
  SegmentInsight,
  StrategyRecommendation,
  TemplateDefinition,
} from '../app/types'

export const roleOrder: Role[] = ['platformOps', 'merchantAdmin', 'merchantOperator']

export const goalOrder: Goal[] = [
  'acquisition',
  'activation',
  'repeat',
  'upgrade',
  'retention',
]

export const segmentOrder: Segment[] = ['guest', 'registered', 'silver', 'gold']

export const audienceOrder: AudienceKey[] = [
  'guest',
  'registered',
  'newMember',
  'silverPotential',
  'goldRetention',
]

export const placementOrder: PlacementKey[] = ['store', 'detail', 'center', 'order']

export const channelOrder: ChannelKey[] = [
  'push',
  'onsite',
  'store',
  'detail',
  'center',
  'order',
  'sms',
  'call',
  'venue',
  'search',
]

export const resourceSlotOrder: ResourceSlotKey[] = [
  'storeBanner',
  'detailZone',
  'memberCenterSpot',
  'venueSpot',
  'brandHallBanner',
  'searchBenefitSpot',
]

export const brandProfile = {
  productName: '飞猪品牌会员智能经营平台',
  brandName: '希尔顿中国旗舰店',
  platformName: '飞猪',
  proposition: '品牌第二官网',
  collaboration: '飞猪小二 + 商家共同管理',
  period: '近30天',
}

export const roleMeta: Record<Role, { label: string; description: string }> = {
  platformOps: {
    label: '飞猪小二',
    description: '负责策略审核、平台资源协同与重点活动节奏把控。',
  },
  merchantAdmin: {
    label: '商家管理员',
    description: '负责经营策略确认、预算审批与活动发布。',
  },
  merchantOperator: {
    label: '商家运营',
    description: '负责权益维护、活动配置和日常内容执行。',
  },
}

export const goalMeta: Record<Goal, { label: string; tone: 'amber' | 'teal' | 'blue' | 'rose' }> =
  {
    acquisition: { label: '拉新', tone: 'amber' },
    activation: { label: '激活', tone: 'teal' },
    repeat: { label: '复购', tone: 'blue' },
    upgrade: { label: '升级', tone: 'teal' },
    retention: { label: '保级', tone: 'rose' },
  }

export const analyticsTabMeta = {
  acquisition: { label: '拉新分析', tone: 'amber' as const },
  activation: { label: '激活分析', tone: 'teal' as const },
  repeat: { label: '复购分析', tone: 'blue' as const },
  loyalty: { label: '升保级分析', tone: 'rose' as const },
  channel: { label: '渠道与投放分析', tone: 'amber' as const },
}

export const templateSections = [
  {
    key: 'acquisition',
    label: '拉新',
    goals: ['acquisition'] as Goal[],
  },
  {
    key: 'activation',
    label: '激活',
    goals: ['activation'] as Goal[],
  },
  {
    key: 'repeat',
    label: '复购',
    goals: ['repeat'] as Goal[],
  },
  {
    key: 'loyalty',
    label: '升保级',
    goals: ['upgrade', 'retention'] as Goal[],
  },
]

export const segmentMeta: Record<Segment, { label: string; short: string }> = {
  guest: { label: '未入会用户', short: '未入会' },
  registered: { label: '已注册未绑定用户', short: '未绑定' },
  silver: { label: '银卡会员', short: '银卡' },
  gold: { label: '金卡会员', short: '金卡' },
}

export const audienceMeta: Record<
  AudienceKey,
  { label: string; short: string; previewSegment: Segment }
> = {
  guest: { label: '未入会用户', short: '未入会', previewSegment: 'guest' },
  registered: { label: '已注册未绑定用户', short: '未绑定', previewSegment: 'registered' },
  newMember: { label: '新入会未首单会员', short: '未首单', previewSegment: 'silver' },
  silverPotential: { label: '银卡高潜会员', short: '高潜银卡', previewSegment: 'silver' },
  goldRetention: { label: '金卡待保级会员', short: '待保级金卡', previewSegment: 'gold' },
}

export const placementMeta: Record<PlacementKey, { label: string; surface: string }> = {
  store: { label: '店铺首页', surface: '承接拉新、复购与营销加码的首屏阵地' },
  detail: { label: '商品详情页', surface: '强化会员权益与高意向转化' },
  center: { label: '会员中心', surface: '集中承接等级权益、任务与成长提醒' },
  order: { label: '订单完成页', surface: '承接首住激活与保级冲刺的即时触点' },
}

export const statusMeta = {
  draft: { label: '草稿', tone: 'muted' },
  pending: { label: '待审核', tone: 'warning' },
  running: { label: '运行中', tone: 'success' },
}

export const budgetStatusMeta = {
  none: { label: '基础运营', tone: 'muted' },
  pending: { label: '待确认', tone: 'warning' },
  confirmed: { label: '已确认', tone: 'success' },
}

export const marketingTypeMeta: Record<MarketingType, string> = {
  flashSale: '超级闪促',
  bonusPoints: '积分加赠',
  limitedBoost: '限时加码',
  memberPerk: '会员专享礼遇',
}

export const boostTypeMeta: Record<BoostType, string> = {
  discount: '限时折扣',
  bonusPoints: '积分加赠',
  extraExposure: '额外权益曝光',
  upgradeBoost: '升级冲刺权益',
}

export const channelMeta: Record<ChannelKey, { label: string; category: 'free' | 'paid' }> = {
  push: { label: 'Push', category: 'free' },
  onsite: { label: '站内资源位', category: 'free' },
  store: { label: '店铺首页', category: 'free' },
  detail: { label: '商品详情页', category: 'free' },
  center: { label: '会员中心', category: 'free' },
  order: { label: '订单完成页', category: 'free' },
  sms: { label: '短信', category: 'paid' },
  call: { label: '外呼', category: 'paid' },
  venue: { label: '品牌联合会场资源', category: 'paid' },
  search: { label: '搜索强化资源位', category: 'paid' },
}

export const resourceSlotMeta: Record<
  ResourceSlotKey,
  { label: string; type: 'free' | 'paid'; description: string }
> = {
  storeBanner: {
    label: '店铺首页会员主Banner',
    type: 'free',
    description: '首页首屏曝光，适合承接会员经营主题活动。',
  },
  detailZone: {
    label: '商品详情页会员专区',
    type: 'free',
    description: '在详情页强化权益表达和会员专享利益点。',
  },
  memberCenterSpot: {
    label: '会员中心推荐位',
    type: 'free',
    description: '适合持续承接任务、成长与保级提醒。',
  },
  venueSpot: {
    label: '飞猪会场精选资源位',
    type: 'paid',
    description: '适合活动期拉升曝光，放大触达覆盖。',
  },
  brandHallBanner: {
    label: '品牌馆焦点Banner',
    type: 'paid',
    description: '适合重点节点做品牌会员权益强化。',
  },
  searchBenefitSpot: {
    label: '搜索结果会员权益强化位',
    type: 'paid',
    description: '适合高意向用户承接和转化放大。',
  },
}

export const resourceSlots: ResourceSlotDefinition[] = resourceSlotOrder.map((key) => ({
  key,
  label: resourceSlotMeta[key].label,
  type: resourceSlotMeta[key].type,
  description: resourceSlotMeta[key].description,
}))

export const channelDefinitions: ChannelDefinition[] = [
  {
    key: 'push',
    label: 'Push',
    category: 'free',
    reach: '站内高频即时触达',
    scenario: '适合激活、保级和节点召回',
    usage: '近30天触达 186,000 人次',
    unitCost: '免费',
  },
  {
    key: 'onsite',
    label: '站内资源位',
    category: 'free',
    reach: '统一沉淀站内品牌会员曝光',
    scenario: '适合拉新与长期权益承接',
    usage: '近30天曝光 420,000 次',
    unitCost: '免费',
  },
  {
    key: 'store',
    label: '店铺首页',
    category: 'free',
    reach: '高流量品牌首屏触达',
    scenario: '适合拉新与会员活动主视觉承接',
    usage: '近30天使用 11 次',
    unitCost: '免费',
  },
  {
    key: 'detail',
    label: '商品详情页',
    category: 'free',
    reach: '高意向浏览用户触达',
    scenario: '适合绑定、升级与权益放大',
    usage: '近30天使用 9 次',
    unitCost: '免费',
  },
  {
    key: 'center',
    label: '会员中心',
    category: 'free',
    reach: '会员沉淀与成长阵地',
    scenario: '适合激活、升级和保级提醒',
    usage: '近30天使用 13 次',
    unitCost: '免费',
  },
  {
    key: 'order',
    label: '订单完成页',
    category: 'free',
    reach: '订单后即时承接',
    scenario: '适合首住激活和保级冲刺',
    usage: '近30天使用 8 次',
    unitCost: '免费',
  },
  {
    key: 'sms',
    label: '短信',
    category: 'paid',
    reach: '高成功率定向触达',
    scenario: '适合冲刺阶段和高价值会员召回',
    usage: '近30天触达 36,000 人次',
    unitCost: '按触达量计费',
  },
  {
    key: 'call',
    label: '外呼',
    category: 'paid',
    reach: '高价值会员深度沟通',
    scenario: '适合高客单和保级冲刺活动',
    usage: '近30天完成 4,200 通',
    unitCost: '按完成呼叫计费',
  },
  {
    key: 'venue',
    label: '品牌联合会场资源',
    category: 'paid',
    reach: '大型会场加码曝光',
    scenario: '适合节点营销和品牌权益强化',
    usage: '近30天投放 3 个资源包',
    unitCost: '按资源包计费',
  },
  {
    key: 'search',
    label: '搜索强化资源位',
    category: 'paid',
    reach: '高意向搜索人群承接',
    scenario: '适合转化冲刺与权益强化',
    usage: '近30天投放 4 个周期',
    unitCost: '按活动周期计费',
  },
]

export const dashboardMetrics = [
  { label: '本周期新增入会', value: '8,420', helper: '新客入会规模稳定，较上周期 +12.6%' },
  { label: '本周期新增绑定', value: '5,180', helper: '绑定效率提升，详情页承接贡献显著' },
  { label: '新会员首单转化率', value: '18.7%', helper: '激活拉升期核心转化指标' },
  { label: '已绑定会员复购率', value: '24.3%', helper: '复购召回活动维持稳态增长' },
  { label: '升保级达成人数', value: '1,260', helper: '升级与保级双链路持续拉动' },
  { label: '飞猪渠道已识别品牌会员数', value: '128,600', helper: '品牌会员资产持续沉淀' },
]

export const dashboardTrend = [58, 62, 66, 70, 76, 83, 91]

export const currentOperatingStage: OperatingStage = {
  label: '激活拉升期',
  issue: '新入会会员首单转化偏低，已绑定高潜会员复购承接不足。',
  opportunity: '银卡会员升级动机明显，可优先推动首住激活与等级跃迁。',
}

export const aiDiagnoses = [
  {
    id: 'diag-1',
    detail:
      '新增入会规模稳定，但新会员首单转化率低于同档品牌均值 2.3pct，建议优先启动“首住激活计划”并叠加限时权益刺激。',
  },
  {
    id: 'diag-2',
    detail:
      '已绑定未下单会员中，近7日浏览高星酒店的人群占比提升，建议增加详情页权益承接与站内 Push 提醒。',
  },
  {
    id: 'diag-3',
    detail:
      '金卡保级人群中，仍有 32% 用户距保级仅差 1 晚，适合通过定向提醒和限时加赠权益做冲刺转化。',
  },
]

const strategyChannels = {
  firstStay: ['store', 'order', 'push'] as ChannelKey[],
  silverBoost: ['center', 'detail', 'venue'] as ChannelKey[],
  goldRetention: ['push', 'sms', 'order'] as ChannelKey[],
}

const strategyPlacements = {
  firstStay: ['store', 'order'] as PlacementKey[],
  silverBoost: ['detail', 'center'] as PlacementKey[],
  goldRetention: ['center', 'order'] as PlacementKey[],
}

export const strategyRecommendations: StrategyRecommendation[] = [
  {
    id: 'strategy-first-stay',
    name: '首住激活加速方案',
    goal: 'activation',
    audienceLabel: '近14天新入会且未首单会员',
    stage: '激活拉升期',
    recommendedChannels: strategyChannels.firstStay,
    recommendedPlacements: strategyPlacements.firstStay,
    estimatedLift: '首单转化率预计提升 12%~18%',
    description: '适合当前阶段快速提升新会员首住激活效率，强化下单前后双触点承接。',
    target: 'template',
    templateId: 'tpl-first-stay',
  },
  {
    id: 'strategy-silver-upgrade',
    name: '银卡升级促进方案',
    goal: 'upgrade',
    audienceLabel: '近30天有浏览/收藏行为的银卡会员',
    stage: '等级跃迁期',
    recommendedChannels: strategyChannels.silverBoost,
    recommendedPlacements: strategyPlacements.silverBoost,
    estimatedLift: '升级达成率预计提升 8%~12%',
    description: '适合用限时加码和会场资源放大银卡高潜会员的升级动机。',
    target: 'marketing',
    marketingPresetId: 'preset-silver-upgrade',
  },
  {
    id: 'strategy-gold-retention',
    name: '金卡保级冲刺方案',
    goal: 'retention',
    audienceLabel: '距保级差 1~2 晚的金卡会员',
    stage: '保级冲刺期',
    recommendedChannels: strategyChannels.goldRetention,
    recommendedPlacements: strategyPlacements.goldRetention,
    estimatedLift: '保级达成率预计提升 10%~15%',
    description: '适合通过短信与限时加赠形成冲刺式承接，放大高价值会员的回流效率。',
    target: 'marketing',
    marketingPresetId: 'preset-gold-retention',
  },
]

export const quickTodos = [
  '1个激活活动待发布，预计覆盖 18,000 名新入会会员',
  '2个付费渠道未完成预算确认',
  '1个金卡保级活动将在 3 天后结束，建议评估二次加码',
  'AI 识别到 1 个高潜复购人群，建议立即启用推荐策略',
]

export const opportunityPools = [
  { label: '新入会未首单会员', value: '18,240', helper: '激活拉升期的核心经营池' },
  { label: '银卡高潜升级会员', value: '8,760', helper: '适合叠加升级冲刺活动' },
  { label: '待保级高潜会员', value: '3,420', helper: '距保级仅差 1 晚的金卡会员' },
]

export const audienceInsights: SegmentInsight[] = [
  {
    key: 'guest',
    scale: 420000,
    goal: '拉新',
    strategy: '以会员价、早餐礼遇和品牌权益说明承接自然流量，提升入会渗透率。',
    recommendation: '优先使用“新客入会引导”模板，在店铺首页和详情页强化入会理由。',
    definition: '尚未加入希尔顿荣誉客会的飞猪访客。',
    defaultBenefits: ['会员专享价', '早餐权益提示', '品牌等级成长路径'],
    recommendedTemplate: '新客入会引导',
    touchpoints: ['店铺首页', '商品详情页'],
    highPotentialHint: '近30天未入会高意向访客 126,000，适合优先做拉新承接。',
  },
  {
    key: 'registered',
    scale: 92000,
    goal: '绑定',
    strategy: '降低绑定成本，强化绑定后可同步查看品牌等级权益和会员礼遇。',
    recommendation: '使用“品牌会员绑定引导”模板，在详情页和会员中心持续强化绑定收益。',
    definition: '已在品牌侧注册，但尚未完成飞猪渠道身份绑定的用户。',
    defaultBenefits: ['等级权益同步', '会员价可见', '预订后积分沉淀说明'],
    recommendedTemplate: '品牌会员绑定引导',
    touchpoints: ['商品详情页', '会员中心'],
    highPotentialHint: '近7天浏览高星酒店的未绑定会员占比上升，适合加强绑定引导。',
  },
  {
    key: 'silver',
    scale: 61000,
    goal: '激活 / 升级',
    strategy: '围绕首住激活和成长进度设计权益承接，放大升级动机与下单理由。',
    recommendation: '通过“新会员首单激活”模板和升级加码活动，强化首住转化与成长反馈。',
    definition: '已完成绑定并处于银卡等级的会员。',
    defaultBenefits: ['早餐权益', '延迟退房提醒', '升级任务可视化'],
    recommendedTemplate: '新会员首单激活',
    touchpoints: ['会员中心', '订单完成页'],
    highPotentialHint: '银卡高潜升级会员 8,760，可优先承接详情页和会员中心资源。',
  },
  {
    key: 'gold',
    scale: 18000,
    goal: '保级 / 复购',
    strategy: '围绕剩余入住晚数、尊享礼遇和加赠权益做高价值会员保级与复购承接。',
    recommendation: '使用“金卡保级提醒”模板，并在冲刺阶段叠加加赠型营销活动。',
    definition: '已完成绑定并达到金卡等级的高价值会员。',
    defaultBenefits: ['行政礼遇说明', '保级进度追踪', '高价值会员专享价格'],
    recommendedTemplate: '金卡保级提醒',
    touchpoints: ['会员中心', '订单完成页'],
    highPotentialHint: '距保级仅差1晚的金卡会员 3,420，适合做定向冲刺触达。',
  },
]

const newGuestCampaign: CampaignFormValues = {
  name: '希尔顿新客入会礼遇',
  goal: 'acquisition',
  segment: 'guest',
  placements: ['store', 'detail'],
  startDate: '2026-03-17',
  endDate: '2026-04-20',
  title: '加入希尔顿荣誉客会，解锁飞猪专享会员礼遇',
  subtitle: '新客入会即可查看品牌会员价、早餐福利与等级成长权益。',
  cta: '立即入会',
  note: '适合承接店铺自然流量，提升入会渗透率。',
  templateId: 'tpl-join',
}

const bindCampaign: CampaignFormValues = {
  name: '品牌会员绑定引导',
  goal: 'acquisition',
  segment: 'registered',
  placements: ['detail', 'center'],
  startDate: '2026-03-17',
  endDate: '2026-04-25',
  title: '绑定希尔顿会员，飞猪同步查看等级权益',
  subtitle: '完成绑定后，品牌等级、早餐与延迟退房权益同步可见。',
  cta: '立即绑定',
  note: '适合承接高意向浏览用户，减少权益认知损耗。',
  templateId: 'tpl-bind',
}

const firstStayCampaign: CampaignFormValues = {
  name: '首住激活计划',
  goal: 'activation',
  segment: 'silver',
  placements: ['center', 'order'],
  startDate: '2026-03-17',
  endDate: '2026-04-22',
  title: '完成首住可升级，解锁更多会员礼遇',
  subtitle: '围绕首住转化设计会员任务，帮助新会员更快进入活跃经营轨道。',
  cta: '立即预订',
  note: '适合新入会未首单会员与银卡首住激活经营。',
  templateId: 'tpl-first-stay',
}

const repeatCampaign: CampaignFormValues = {
  name: '30天未下单唤醒',
  goal: 'repeat',
  segment: 'silver',
  placements: ['store', 'center'],
  startDate: '2026-03-17',
  endDate: '2026-04-30',
  title: '专属复购礼遇已准备，回住即可再享会员价',
  subtitle: '针对近30天未下单会员，强化会员价、早餐和限时礼遇的回流心智。',
  cta: '重新预订',
  note: '适合召回沉默会员，带动第二次下单。',
  templateId: 'tpl-repeat',
}

const goldCampaign: CampaignFormValues = {
  name: '金卡保级提醒',
  goal: 'retention',
  segment: 'gold',
  placements: ['center', 'order'],
  startDate: '2026-03-17',
  endDate: '2026-05-15',
  title: '距本周期保级还差 1 晚，立即预订完成保级',
  subtitle: '通过剩余晚数提醒和尊享礼遇表达，促成高价值会员回流。',
  cta: '立即保级',
  note: '适合高价值会员保级与复购运营。',
  templateId: 'tpl-gold',
}

export const templates: TemplateDefinition[] = [
  {
    id: 'tpl-join',
    goal: 'acquisition',
    name: '新客入会引导',
    description: '适合未入会流量，以品牌会员价和首住礼遇提升入会率。',
    recommendedSegment: 'guest',
    recommendedPlacements: ['store', 'detail'],
    recommendedStage: '起量拉新期',
    budgetStrategy: '优先用免费触点承接，暂不建议付费加码。',
    recommendedChannels: ['store', 'detail', 'push'],
    effectTag: '预估入会提升 18%',
    aiTag: 'AI优先推荐',
    suggestMarketingBoost: '基础承接为主，适合先完成入会链路铺设。',
    defaultCampaign: newGuestCampaign,
  },
  {
    id: 'tpl-bind',
    goal: 'acquisition',
    name: '品牌会员绑定引导',
    description: '适合已注册未绑定用户，强化等级权益同步和品牌心智。',
    recommendedSegment: 'registered',
    recommendedPlacements: ['detail', 'center'],
    recommendedStage: '起量拉新期',
    budgetStrategy: '优先依赖免费触点，必要时可叠加搜索强化位承接高意向流量。',
    recommendedChannels: ['detail', 'center', 'search'],
    effectTag: '预估绑定提升 12%',
    aiTag: '建议加码投放',
    suggestMarketingBoost: '高意向阶段可加搜索强化资源位，放大绑定转化。',
    defaultCampaign: bindCampaign,
  },
  {
    id: 'tpl-first-stay',
    goal: 'activation',
    name: '新会员首单激活',
    description: '适合新会员首住转化，围绕首住激活和成长反馈表达。',
    recommendedSegment: 'silver',
    recommendedPlacements: ['center', 'order'],
    recommendedStage: '激活拉升期',
    budgetStrategy: '可叠加短信触达或超级闪促，加速首单转化。',
    recommendedChannels: ['center', 'order', 'push', 'sms'],
    effectTag: '预估首单提升 15%',
    aiTag: '当前阶段最优',
    suggestMarketingBoost: '建议叠加“超级闪促·新会员首住加速”营销活动。',
    defaultCampaign: firstStayCampaign,
  },
  {
    id: 'tpl-repeat',
    goal: 'repeat',
    name: '30天未下单唤醒',
    description: '适合沉默会员召回，用复购礼遇和时间窗口催化回流。',
    recommendedSegment: 'silver',
    recommendedPlacements: ['store', 'center'],
    recommendedStage: '复购稳态期',
    budgetStrategy: '基础模板可承接常态经营，节点期可叠加 Push 强化提醒。',
    recommendedChannels: ['store', 'center', 'push'],
    effectTag: '预估复购提升 9%',
    aiTag: 'AI优先推荐',
    suggestMarketingBoost: '优先做内容与权益承接，视节奏决定是否二次加码。',
    defaultCampaign: repeatCampaign,
  },
  {
    id: 'tpl-gold',
    goal: 'retention',
    name: '金卡保级提醒',
    description: '适合高等级会员保级经营，突出剩余晚数和专属礼遇。',
    recommendedSegment: 'gold',
    recommendedPlacements: ['center', 'order'],
    recommendedStage: '保级冲刺期',
    budgetStrategy: '建议叠加短信与加赠权益，提升高价值会员转化效率。',
    recommendedChannels: ['center', 'order', 'push', 'sms'],
    effectTag: '预估保级提升 11%',
    aiTag: '建议加码投放',
    suggestMarketingBoost: '适合叠加“金卡保级限时加赠”做冲刺期承接。',
    defaultCampaign: goldCampaign,
  },
]

const flashSalePreset: MarketingFormValues = {
  name: '超级闪促·新会员首住加速',
  marketingType: 'flashSale',
  goal: 'activation',
  audience: 'newMember',
  boostType: 'discount',
  startDate: '2026-03-17',
  endDate: '2026-04-10',
  totalBudget: 24000,
  channelBudget: {
    sms: 12000,
    push: 0,
    store: 0,
    order: 0,
  },
  resourceSlots: ['storeBanner', 'venueSpot'],
  channels: ['store', 'order', 'push', 'sms'],
  estimatedReach: 28000,
  estimatedLift: '预计点击提升 +18%，首单转化提升 +12%',
  estimatedIncrementalGmv: 386000,
  recommendedBudget: 24000,
  title: '新会员首住限时加码，今晚下单可享额外礼遇',
  subtitle: '叠加超级闪促资源位和短信提醒，放大首住激活效率。',
  cta: '立即抢订',
  note: '适合新入会未首单会员的首住冲刺经营。',
  presetId: 'preset-flash-activation',
}

const silverUpgradePreset: MarketingFormValues = {
  name: '银卡升级周末冲刺计划',
  marketingType: 'limitedBoost',
  goal: 'upgrade',
  audience: 'silverPotential',
  boostType: 'upgradeBoost',
  startDate: '2026-03-18',
  endDate: '2026-04-08',
  totalBudget: 22000,
  channelBudget: {
    venue: 12000,
    search: 10000,
    center: 0,
    detail: 0,
  },
  resourceSlots: ['detailZone', 'memberCenterSpot', 'brandHallBanner'],
  channels: ['detail', 'center', 'venue', 'search'],
  estimatedReach: 21400,
  estimatedLift: '预计升级达成提升 +9%，详情页点击提升 +14%',
  estimatedIncrementalGmv: 342000,
  recommendedBudget: 22000,
  title: '银卡周末升级冲刺，完成入住可解锁更高等级礼遇',
  subtitle: '通过周末资源位加码和升级权益展示，放大等级跃迁动机。',
  cta: '立即升级',
  note: '适合近30天有浏览或收藏行为的银卡高潜会员。',
  presetId: 'preset-silver-upgrade',
}

const goldRetentionPreset: MarketingFormValues = {
  name: '金卡保级限时加赠',
  marketingType: 'bonusPoints',
  goal: 'retention',
  audience: 'goldRetention',
  boostType: 'bonusPoints',
  startDate: '2026-03-17',
  endDate: '2026-04-05',
  totalBudget: 18000,
  channelBudget: {
    sms: 10000,
    call: 8000,
    center: 0,
    order: 0,
  },
  resourceSlots: ['memberCenterSpot', 'searchBenefitSpot'],
  channels: ['center', 'order', 'push', 'sms', 'call'],
  estimatedReach: 9200,
  estimatedLift: '预计保级达成提升 +10%，高价值会员回流提升 +8%',
  estimatedIncrementalGmv: 268000,
  recommendedBudget: 18000,
  title: '金卡保级限时加赠中，完成本次预订可加速达成',
  subtitle: '叠加积分加赠与定向提醒，强化金卡会员冲刺动力。',
  cta: '立即保级',
  note: '适合距保级差1至2晚的金卡待保级会员。',
  presetId: 'preset-gold-retention',
}

export const marketingPresets: MarketingPreset[] = [
  {
    id: 'preset-flash-activation',
    name: '超级闪促·新会员首住加速',
    description: '以超级闪促和短信触达放大新会员首住激活效率。',
    defaultForm: flashSalePreset,
  },
  {
    id: 'preset-silver-upgrade',
    name: '银卡升级周末冲刺计划',
    description: '通过资源位加码和升级权益强化银卡会员跃迁动机。',
    defaultForm: silverUpgradePreset,
  },
  {
    id: 'preset-gold-retention',
    name: '金卡保级限时加赠',
    description: '通过积分加赠和定向提醒强化高价值会员保级达成。',
    defaultForm: goldRetentionPreset,
  },
]

export const initialBenefits: Record<Segment, BenefitConfig> = {
  guest: {
    segment: 'guest',
    title: '加入希尔顿荣誉客会，解锁飞猪专享会员礼遇',
    subtitle: '注册会员即可查看专属价格、早餐礼遇及等级成长权益。',
    cta: '立即入会',
    benefitCards: ['会员专享价', '早餐权益提示', '等级成长路径'],
    updatedAt: '03.17 09:30',
  },
  registered: {
    segment: 'registered',
    title: '绑定希尔顿会员，飞猪同步查看等级权益',
    subtitle: '完成绑定后，可在飞猪享受更完整的品牌会员体验。',
    cta: '立即绑定',
    benefitCards: ['同步品牌等级', '预订后积分沉淀', '会员价与礼遇可视化'],
    updatedAt: '03.17 09:32',
  },
  silver: {
    segment: 'silver',
    title: '银卡会员专享礼遇已解锁',
    subtitle: '完成首住可加速升级，享更多会员权益。',
    cta: '立即预订',
    benefitCards: ['早餐权益', '延迟退房提示', '升级任务提醒'],
    tierNote: '当前等级权益：早餐礼遇、延迟退房和品牌会员价权益。',
    progressNote: '下一等级激励：再完成 1 晚住宿，即可冲刺更高等级礼遇。',
    updatedAt: '03.17 09:35',
  },
  gold: {
    segment: 'gold',
    title: '金卡会员尊享礼遇进行中',
    subtitle: '距本周期保级还差 1 晚，立即预订完成保级。',
    cta: '立即保级',
    benefitCards: ['行政礼遇提示', '保级进度追踪', '高价值会员专属价格'],
    tierNote: '当前等级权益：高阶礼遇、价格权益与品牌专属服务。',
    progressNote: '保级进度提示：还差 1 晚即可完成当前周期保级目标。',
    updatedAt: '03.17 09:38',
  },
}

const buildTemplateActivity = (
  id: string,
  form: CampaignFormValues,
  updatedAt: string,
  audienceKey: AudienceKey,
  audienceLabel: string,
  estimatedReach: number,
  estimatedLift: string,
  incrementalGmv: number,
): Activity => ({
  id,
  kind: 'template',
  activityTypeLabel: '模板活动',
  name: form.name,
  goal: form.goal,
  audienceKey,
  audienceLabel,
  previewSegment: form.segment,
  placements: form.placements,
  channels: form.placements,
  resourceSlots: [],
  startDate: form.startDate,
  endDate: form.endDate,
  title: form.title,
  subtitle: form.subtitle,
  cta: form.cta,
  note: form.note,
  status: 'running',
  updatedAt,
  templateId: form.templateId,
  budget: 0,
  budgetStatus: 'none',
  estimatedReach,
  estimatedLift,
  incrementalGmv,
  roi: form.goal === 'acquisition' ? '基础运营承接' : undefined,
})

const buildMarketingActivity = (
  id: string,
  form: MarketingFormValues,
  updatedAt: string,
  status: Activity['status'],
  budgetStatus: Activity['budgetStatus'],
): Activity => ({
  id,
  kind: 'marketing',
  activityTypeLabel: marketingTypeMeta[form.marketingType],
  name: form.name,
  goal: form.goal,
  audienceKey: form.audience,
  audienceLabel: audienceMeta[form.audience].label,
  previewSegment: audienceMeta[form.audience].previewSegment,
  placements: [
    ...(form.channels.includes('store') ? (['store'] as PlacementKey[]) : []),
    ...(form.channels.includes('detail') ? (['detail'] as PlacementKey[]) : []),
    ...(form.channels.includes('center') ? (['center'] as PlacementKey[]) : []),
    ...(form.channels.includes('order') ? (['order'] as PlacementKey[]) : []),
  ],
  channels: form.channels,
  resourceSlots: form.resourceSlots,
  startDate: form.startDate,
  endDate: form.endDate,
  title: form.title,
  subtitle: form.subtitle,
  cta: form.cta,
  note: form.note,
  status,
  updatedAt,
  presetId: form.presetId,
  budget: form.totalBudget,
  budgetStatus,
  estimatedReach: form.estimatedReach,
  estimatedLift: form.estimatedLift,
  incrementalGmv: form.estimatedIncrementalGmv,
  roi:
    form.totalBudget > 0
      ? `1:${(form.estimatedIncrementalGmv / form.totalBudget).toFixed(1)}`
      : undefined,
})

export const initialActivities: Activity[] = [
  buildTemplateActivity(
    'act-join',
    newGuestCampaign,
    '03.17 10:12',
    'guest',
    '未入会用户',
    320000,
    '入会转化率 16.1%',
    0,
  ),
  buildTemplateActivity(
    'act-first-stay',
    firstStayCampaign,
    '03.17 10:22',
    'newMember',
    '新入会未首单会员',
    82000,
    '首单转化率 18.7%',
    468000,
  ),
  buildTemplateActivity(
    'act-repeat',
    repeatCampaign,
    '03.17 10:35',
    'silverPotential',
    '银卡高潜会员',
    46000,
    '复购转化率 24.3%',
    522000,
  ),
  buildTemplateActivity(
    'act-gold',
    goldCampaign,
    '03.17 10:48',
    'goldRetention',
    '金卡待保级会员',
    12000,
    '保级达成率 20.5%',
    310000,
  ),
  buildMarketingActivity(
    'act-flash',
    flashSalePreset,
    '03.17 10:58',
    'running',
    'confirmed',
  ),
  buildMarketingActivity(
    'act-gold-bonus',
    goldRetentionPreset,
    '03.17 11:06',
    'pending',
    'pending',
  ),
  buildMarketingActivity(
    'act-silver-upgrade',
    silverUpgradePreset,
    '03.17 11:15',
    'running',
    'confirmed',
  ),
]

export const initialPlacements: Record<PlacementKey, PlacementConfig> = {
  store: {
    key: 'store',
    name: '店铺首页',
    defaultStrategy: '第一屏按会员身份分层展示，并为激活拉升活动预留加码入口。',
    narrative: '首页是品牌第二官网的首要阵地，既要承接自然流量，也要放大营销主题。',
    updatedAt: '03.17 11:10',
    mounts: [
      {
        id: 'mount-store-join',
        activityId: 'act-join',
        audience: 'guest',
        enabled: true,
        version: newGuestCampaign.title,
        updatedAt: '03.17 10:12',
      },
      {
        id: 'mount-store-repeat',
        activityId: 'act-repeat',
        audience: 'silver',
        enabled: true,
        version: '银卡复购承接版',
        updatedAt: '03.17 10:35',
      },
      {
        id: 'mount-store-flash',
        activityId: 'act-flash',
        audience: 'silver',
        enabled: true,
        version: '超级闪促版',
        updatedAt: '03.17 10:58',
      },
    ],
  },
  detail: {
    key: 'detail',
    name: '商品详情页',
    defaultStrategy: '围绕商品卖点强化会员利益点，并在高意向阶段承接升级加码活动。',
    narrative: '详情页适合承接绑定与升级表达，让会员权益更靠近下单决策。',
    updatedAt: '03.17 11:15',
    mounts: [
      {
        id: 'mount-detail-join',
        activityId: 'act-join',
        audience: 'guest',
        enabled: true,
        version: '详情页入会版本',
        updatedAt: '03.17 10:14',
      },
      {
        id: 'mount-detail-upgrade',
        activityId: 'act-silver-upgrade',
        audience: 'silver',
        enabled: true,
        version: '升级冲刺详情页版',
        updatedAt: '03.17 11:15',
      },
    ],
  },
  center: {
    key: 'center',
    name: '会员中心',
    defaultStrategy: '聚合等级权益、成长任务和进行中的会员营销活动。',
    narrative: '会员中心是分层经营核心阵地，适合强化等级权益、任务与保级进度。',
    updatedAt: '03.17 11:16',
    mounts: [
      {
        id: 'mount-center-first-stay',
        activityId: 'act-first-stay',
        audience: 'silver',
        enabled: true,
        version: '首住激活版本',
        updatedAt: '03.17 10:22',
      },
      {
        id: 'mount-center-repeat',
        activityId: 'act-repeat',
        audience: 'silver',
        enabled: true,
        version: '会员中心召回版',
        updatedAt: '03.17 10:35',
      },
      {
        id: 'mount-center-gold',
        activityId: 'act-gold',
        audience: 'gold',
        enabled: true,
        version: goldCampaign.title,
        updatedAt: '03.17 10:48',
      },
      {
        id: 'mount-center-gold-bonus',
        activityId: 'act-gold-bonus',
        audience: 'gold',
        enabled: true,
        version: '加赠冲刺版',
        updatedAt: '03.17 11:06',
      },
      {
        id: 'mount-center-upgrade',
        activityId: 'act-silver-upgrade',
        audience: 'silver',
        enabled: true,
        version: '升级周末冲刺版',
        updatedAt: '03.17 11:15',
      },
    ],
  },
  order: {
    key: 'order',
    name: '订单完成页',
    defaultStrategy: '围绕订单后激活和保级提醒做即时承接，延续经营动作。',
    narrative: '订单完成页适合做即时反馈，让首住激活和保级提醒更具行动感。',
    updatedAt: '03.17 11:12',
    mounts: [
      {
        id: 'mount-order-first-stay',
        activityId: 'act-first-stay',
        audience: 'silver',
        enabled: true,
        version: '订单后激活版',
        updatedAt: '03.17 10:24',
      },
      {
        id: 'mount-order-flash',
        activityId: 'act-flash',
        audience: 'silver',
        enabled: true,
        version: '首住闪促版',
        updatedAt: '03.17 10:58',
      },
      {
        id: 'mount-order-gold',
        activityId: 'act-gold',
        audience: 'gold',
        enabled: true,
        version: '保级提醒版',
        updatedAt: '03.17 10:48',
      },
      {
        id: 'mount-order-gold-bonus',
        activityId: 'act-gold-bonus',
        audience: 'gold',
        enabled: true,
        version: '限时加赠版',
        updatedAt: '03.17 11:06',
      },
    ],
  },
}

export const analyticsSections: Record<
  'acquisition' | 'activation' | 'repeat' | 'loyalty',
  GoalAnalytics
> = {
  acquisition: {
    key: 'acquisition',
    title: '拉新分析',
    goals: ['acquisition'],
    summary: [
      { label: '曝光', value: '320,000', helper: '店铺首页与详情页双触点承接' },
      { label: '点击', value: '48,600', helper: '点击率 15.2%' },
      { label: '入会', value: '7,820', helper: '入会转化率 16.1%' },
      { label: '绑定', value: '3,900', helper: '绑定链路持续回升' },
    ],
    trend: [28, 31, 35, 39, 44, 47, 49],
    funnel: [
      { label: '曝光', value: 320000 },
      { label: '点击', value: 48600 },
      { label: '入会', value: 7820 },
      { label: '绑定', value: 3900 },
    ],
    contributors: [
      { label: '店铺首页', value: 44 },
      { label: '商品详情页', value: 28 },
      { label: 'Push', value: 18 },
      { label: '站内资源位', value: 10 },
    ],
  },
  activation: {
    key: 'activation',
    title: '激活分析',
    goals: ['activation'],
    summary: [
      { label: '新会员人数', value: '82,000', helper: '进入激活池的新会员规模' },
      { label: '首单人数', value: '4,100', helper: '首住激活计划拉动显著' },
      { label: '首单转化率', value: '18.7%', helper: '较活动前提升 4.2pct' },
      { label: '增量GMV', value: '¥468,000', helper: '首单激活带来的直接增量' },
    ],
    trend: [10, 12, 14, 15, 17, 18, 19],
    funnel: [
      { label: '激活池', value: 82000 },
      { label: '点击活动', value: 14200 },
      { label: '首单', value: 4100 },
      { label: '增量订单', value: 2980 },
    ],
    contributors: [
      { label: '会员中心', value: 39 },
      { label: '订单完成页', value: 27 },
      { label: 'Push', value: 18 },
      { label: '短信', value: 16 },
    ],
  },
  repeat: {
    key: 'repeat',
    title: '复购分析',
    goals: ['repeat'],
    summary: [
      { label: '已购会员数', value: '46,000', helper: '近90天有入住行为的会员' },
      { label: '二次下单人数', value: '2,300', helper: '召回链路驱动显著' },
      { label: '复购率', value: '24.3%', helper: '已绑定会员复购效率稳定' },
      { label: '增量GMV', value: '¥522,000', helper: '召回活动拉动回流订单' },
    ],
    trend: [12, 14, 16, 18, 20, 22, 24],
    funnel: [
      { label: '可召回会员', value: 46000 },
      { label: '点击活动', value: 8400 },
      { label: '复购', value: 2300 },
      { label: '增量订单', value: 1680 },
    ],
    contributors: [
      { label: '会员中心', value: 34 },
      { label: '店铺首页', value: 30 },
      { label: 'Push', value: 21 },
      { label: '短信', value: 15 },
    ],
  },
  loyalty: {
    key: 'loyalty',
    title: '升保级分析',
    goals: ['upgrade', 'retention'],
    summary: [
      { label: '银卡高潜升级会员', value: '8,760', helper: '近30天有浏览/收藏行为的银卡会员' },
      { label: '待保级高潜会员', value: '3,420', helper: '距保级仅差1晚的金卡会员' },
      { label: '升保级达成', value: '1,260', helper: '升级与保级合计达成数' },
      { label: '增量GMV', value: '¥578,000', helper: '高价值会员经营带来的增量贡献' },
    ],
    trend: [5, 6, 7, 8, 9, 11, 13],
    funnel: [
      { label: '高潜人群', value: 12180 },
      { label: '已提醒', value: 5800 },
      { label: '点击活动', value: 2700 },
      { label: '达成', value: 1260 },
    ],
    contributors: [
      { label: '会员中心', value: 33 },
      { label: '订单完成页', value: 26 },
      { label: '短信', value: 23 },
      { label: '联合会场资源', value: 18 },
    ],
  },
}

export const channelAnalytics: ChannelAnalytics = {
  summary: [
    { label: 'Push 触达成功率', value: '78%', helper: '免费渠道中的高频承接主力' },
    { label: '短信触达成功率', value: '92%', helper: '适合冲刺阶段与高价值会员' },
    { label: '外呼转化率', value: '11.2%', helper: '高价值会员保级转化效率更高' },
    { label: '免费渠道贡献订单占比', value: '63%', helper: '基础运营能力仍是主盘' },
    { label: '付费渠道贡献增量GMV', value: '¥526,000', helper: '加码型活动拉动显著' },
    { label: '渠道整体 ROI', value: '1:4.8', helper: '付费渠道具备明确加速价值' },
  ],
  rows: [
    {
      channel: 'push',
      channelType: 'free',
      coverage: 186000,
      successRate: '78%',
      conversionRate: '6.8%',
      cost: 0,
      gmv: 238000,
      roi: '基础运营',
    },
    {
      channel: 'onsite',
      channelType: 'free',
      coverage: 420000,
      successRate: '66%',
      conversionRate: '4.2%',
      cost: 0,
      gmv: 312000,
      roi: '基础运营',
    },
    {
      channel: 'sms',
      channelType: 'paid',
      coverage: 36000,
      successRate: '92%',
      conversionRate: '8.5%',
      cost: 56000,
      gmv: 296000,
      roi: '1:5.3',
    },
    {
      channel: 'call',
      channelType: 'paid',
      coverage: 4200,
      successRate: '61%',
      conversionRate: '11.2%',
      cost: 24000,
      gmv: 132000,
      roi: '1:5.5',
    },
    {
      channel: 'venue',
      channelType: 'paid',
      coverage: 22000,
      successRate: '84%',
      conversionRate: '7.1%',
      cost: 48000,
      gmv: 198000,
      roi: '1:4.1',
    },
    {
      channel: 'search',
      channelType: 'paid',
      coverage: 16000,
      successRate: '81%',
      conversionRate: '9.4%',
      cost: 32000,
      gmv: 176000,
      roi: '1:5.5',
    },
  ],
}

export const performanceEntries: Record<string, PerformanceEntry> = {
  'act-join': {
    activityId: 'act-join',
    exposure: 320000,
    clicks: 48600,
    conversions: 7820,
    gmv: 0,
  },
  'act-first-stay': {
    activityId: 'act-first-stay',
    exposure: 82000,
    clicks: 14200,
    conversions: 4100,
    gmv: 468000,
  },
  'act-repeat': {
    activityId: 'act-repeat',
    exposure: 46000,
    clicks: 8400,
    conversions: 2300,
    gmv: 522000,
  },
  'act-gold': {
    activityId: 'act-gold',
    exposure: 12000,
    clicks: 4200,
    conversions: 860,
    gmv: 310000,
  },
  'act-flash': {
    activityId: 'act-flash',
    exposure: 28000,
    clicks: 9200,
    conversions: 1880,
    gmv: 386000,
  },
  'act-gold-bonus': {
    activityId: 'act-gold-bonus',
    exposure: 9200,
    clicks: 3600,
    conversions: 720,
    gmv: 268000,
  },
  'act-silver-upgrade': {
    activityId: 'act-silver-upgrade',
    exposure: 21400,
    clicks: 6500,
    conversions: 1180,
    gmv: 342000,
  },
}
