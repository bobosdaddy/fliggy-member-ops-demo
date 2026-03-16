import type {
  Activity,
  BenefitConfig,
  CampaignFormValues,
  Goal,
  GoalAnalytics,
  PerformanceEntry,
  PlacementConfig,
  PlacementKey,
  Role,
  Segment,
  SegmentInsight,
  TemplateDefinition,
} from '../app/types'

export const roleOrder: Role[] = [
  'platformOps',
  'merchantAdmin',
  'merchantOperator',
]

export const goalOrder: Goal[] = [
  'acquisition',
  'activation',
  'repeat',
  'retention',
]

export const segmentOrder: Segment[] = ['guest', 'registered', 'silver', 'gold']

export const placementOrder: PlacementKey[] = [
  'store',
  'detail',
  'center',
  'order',
]

export const brandProfile = {
  brandName: '希尔顿中国旗舰店',
  platformName: '飞猪',
  proposition: '品牌第二官网',
  collaboration: '飞猪小二 + 商家共同管理',
}

export const roleMeta: Record<Role, { label: string; description: string }> = {
  platformOps: {
    label: '飞猪小二',
    description: '负责审核发布、平台节奏把控与阵地资源协同。',
  },
  merchantAdmin: {
    label: '商家管理员',
    description: '负责经营策略配置、活动发布与品牌节奏管理。',
  },
  merchantOperator: {
    label: '商家运营',
    description: '负责内容配置、权益维护与日常运营执行。',
  },
}

export const goalMeta: Record<Goal, { label: string; tone: string }> = {
  acquisition: { label: '拉新', tone: 'amber' },
  activation: { label: '激活', tone: 'teal' },
  repeat: { label: '复购', tone: 'blue' },
  retention: { label: '升保级', tone: 'rose' },
}

export const segmentMeta: Record<Segment, { label: string; short: string }> = {
  guest: { label: '未入会用户', short: '未入会' },
  registered: { label: '已注册未绑定用户', short: '未绑定' },
  silver: { label: '银卡会员', short: '银卡' },
  gold: { label: '金卡会员', short: '金卡' },
}

export const placementMeta: Record<
  PlacementKey,
  { label: string; surface: string }
> = {
  store: { label: '店铺首页', surface: '承接品牌第一屏拉新与激活' },
  detail: { label: '商品详情页', surface: '强化权益卖点与下单转化' },
  center: { label: '会员中心', surface: '沉淀等级权益与任务进度' },
  order: { label: '订单完成页', surface: '承接首住激活与保级提醒' },
}

export const statusMeta = {
  draft: { label: '草稿', tone: 'muted' },
  pending: { label: '待审核', tone: 'warning' },
  running: { label: '运行中', tone: 'success' },
}

export const dashboardMetrics = [
  { label: '新增入会人数', value: '8,420', helper: '较上周 +12.6%' },
  { label: '新增绑定人数', value: '5,180', helper: '飞猪内可识别会员持续增长' },
  { label: '首单转化率', value: '18.7%', helper: '首住激活计划带动提升' },
  { label: '会员复购率', value: '24.3%', helper: '30 天召回活动稳定运行' },
  { label: '升保级达成人数', value: '1,260', helper: '金卡保级提醒贡献显著' },
  { label: '已绑定会员数', value: '128,600', helper: '品牌会员资产持续沉淀' },
]

export const dashboardTrend = [52, 58, 63, 60, 72, 79, 88]

export const audienceInsights: SegmentInsight[] = [
  {
    key: 'guest',
    scale: 420000,
    goal: '拉新',
    strategy: '以入会权益和会员价心智承接自然流量，推动快速注册入会。',
    recommendation: '优先投放“新客入会引导”模板，并在店铺首页强化会员礼遇。',
    definition: '尚未加入希尔顿荣誉客会的飞猪访客。',
    defaultBenefits: ['会员专享价', '早餐权益提示', '等级成长路径说明'],
    recommendedTemplate: '新客入会引导',
    touchpoints: ['店铺首页', '商品详情页'],
  },
  {
    key: 'registered',
    scale: 92000,
    goal: '绑定',
    strategy: '降低绑定门槛，突出绑定后可同步查看品牌等级与权益。',
    recommendation: '使用“品牌会员绑定引导”模板，在详情页和会员中心持续曝光。',
    definition: '已在品牌侧注册，但尚未完成飞猪渠道身份绑定的用户。',
    defaultBenefits: ['等级权益同步', '会员专属价格', '预订后积分沉淀说明'],
    recommendedTemplate: '品牌会员绑定引导',
    touchpoints: ['商品详情页', '会员中心'],
  },
  {
    key: 'silver',
    scale: 61000,
    goal: '激活 / 升级',
    strategy: '围绕首住激活和升级门槛设计任务，强化一次下单后的成长反馈。',
    recommendation: '用“新会员首单激活”模板在会员中心和订单完成页持续提醒。',
    definition: '已完成绑定并处于银卡等级的会员。',
    defaultBenefits: ['早餐权益', '延迟退房提示', '升级路径可视化'],
    recommendedTemplate: '新会员首单激活',
    touchpoints: ['会员中心', '订单完成页'],
  },
  {
    key: 'gold',
    scale: 18000,
    goal: '保级 / 复购',
    strategy: '围绕剩余入住晚数和尊享礼遇，做高价值会员的复购与保级承接。',
    recommendation: '通过“金卡保级提醒”模板，在会员中心与订单完成页形成连续提醒。',
    definition: '已完成绑定并达到金卡等级的高价值会员。',
    defaultBenefits: ['行政礼遇提示', '保级进度追踪', '高价值权益展示'],
    recommendedTemplate: '金卡保级提醒',
    touchpoints: ['会员中心', '订单完成页'],
  },
]

const newGuestCampaign: CampaignFormValues = {
  name: '希尔顿新客入会礼遇',
  goal: 'acquisition',
  segment: 'guest',
  placements: ['store', 'detail'],
  startDate: '2026-03-16',
  endDate: '2026-04-16',
  title: '加入希尔顿荣誉客会，解锁飞猪专享会员礼遇',
  subtitle: '新客入会即可查看品牌会员价、早餐福利与成长权益。',
  cta: '立即入会',
  note: '适合承接店铺自然流量，提升入会渗透率。',
  templateId: 'tpl-join',
}

const bindCampaign: CampaignFormValues = {
  name: '品牌会员绑定引导',
  goal: 'acquisition',
  segment: 'registered',
  placements: ['detail', 'center'],
  startDate: '2026-03-16',
  endDate: '2026-04-30',
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
  startDate: '2026-03-16',
  endDate: '2026-04-20',
  title: '完成首住可升级，解锁更多会员礼遇',
  subtitle: '围绕首住转化设计会员任务，帮助银卡用户加速成长。',
  cta: '立即预订',
  note: '适合首住激活和升级经营。',
  templateId: 'tpl-first-stay',
}

const repeatCampaign: CampaignFormValues = {
  name: '30天未下单唤醒',
  goal: 'repeat',
  segment: 'silver',
  placements: ['store', 'center'],
  startDate: '2026-03-16',
  endDate: '2026-04-30',
  title: '专属复购礼遇已准备，回住即可再享会员价',
  subtitle: '针对近 30 天未下单会员，强化会员价与早餐利益点。',
  cta: '重新预订',
  note: '适合召回沉默会员，带动第二次下单。',
  templateId: 'tpl-repeat',
}

const goldCampaign: CampaignFormValues = {
  name: '金卡保级提醒',
  goal: 'retention',
  segment: 'gold',
  placements: ['center', 'order'],
  startDate: '2026-03-16',
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
    effectTag: '预估入会提升 18%',
    defaultCampaign: newGuestCampaign,
  },
  {
    id: 'tpl-bind',
    goal: 'acquisition',
    name: '品牌会员绑定引导',
    description: '适合已注册未绑定用户，强化等级权益同步与品牌认知。',
    recommendedSegment: 'registered',
    recommendedPlacements: ['detail', 'center'],
    effectTag: '预估绑定提升 12%',
    defaultCampaign: bindCampaign,
  },
  {
    id: 'tpl-first-stay',
    goal: 'activation',
    name: '新会员首单激活',
    description: '适合银卡会员首住转化，围绕首住激活和升级路径表达。',
    recommendedSegment: 'silver',
    recommendedPlacements: ['center', 'order'],
    effectTag: '预估首住提升 15%',
    defaultCampaign: firstStayCampaign,
  },
  {
    id: 'tpl-repeat',
    goal: 'repeat',
    name: '30天未下单唤醒',
    description: '适合沉默会员召回，用复购礼遇和时间窗口催化回流。',
    recommendedSegment: 'silver',
    recommendedPlacements: ['store', 'center'],
    effectTag: '预估复购提升 9%',
    defaultCampaign: repeatCampaign,
  },
  {
    id: 'tpl-gold',
    goal: 'retention',
    name: '金卡保级提醒',
    description: '适合高等级会员保级经营，突出剩余晚数和专属礼遇。',
    recommendedSegment: 'gold',
    recommendedPlacements: ['center', 'order'],
    effectTag: '预估保级提升 11%',
    defaultCampaign: goldCampaign,
  },
]

export const initialBenefits: Record<Segment, BenefitConfig> = {
  guest: {
    segment: 'guest',
    title: '加入希尔顿荣誉客会，解锁飞猪专享会员礼遇',
    subtitle: '注册会员即可查看专属价格、早餐及等级权益。',
    cta: '立即入会',
    benefitCards: ['会员专享价', '早餐权益提示', '等级成长路径'],
    updatedAt: '03.16 09:30',
  },
  registered: {
    segment: 'registered',
    title: '绑定希尔顿会员，飞猪同步查看等级权益',
    subtitle: '完成绑定后，可在飞猪享受更完整的品牌会员体验。',
    cta: '立即绑定',
    benefitCards: ['同步品牌等级', '预订后积分沉淀', '会员价与礼遇可视化'],
    updatedAt: '03.16 09:32',
  },
  silver: {
    segment: 'silver',
    title: '银卡会员专享礼遇已解锁',
    subtitle: '完成首住可加速升级，享更多会员权益。',
    cta: '立即预订',
    benefitCards: ['早餐权益', '延迟退房提示', '升级任务提醒'],
    tierNote: '当前等级权益：早餐礼遇、延迟退房、会员价权益。',
    progressNote: '下一等级激励：再完成 1 晚住宿，即可冲刺更高等级礼遇。',
    updatedAt: '03.16 09:35',
  },
  gold: {
    segment: 'gold',
    title: '金卡会员尊享礼遇进行中',
    subtitle: '距本周期保级还差 1 晚，立即预订完成保级。',
    cta: '立即保级',
    benefitCards: ['行政礼遇提示', '保级进度追踪', '高价值会员专属价格'],
    tierNote: '当前等级权益：高阶礼遇、价格权益与品牌专属服务。',
    progressNote: '保级进度提示：还差 1 晚即可完成当前周期保级目标。',
    updatedAt: '03.16 09:38',
  },
}

export const initialActivities: Activity[] = [
  {
    id: 'act-join',
    ...newGuestCampaign,
    status: 'running',
    updatedAt: '03.16 10:20',
  },
  {
    id: 'act-first-stay',
    ...firstStayCampaign,
    status: 'running',
    updatedAt: '03.16 10:35',
  },
  {
    id: 'act-repeat',
    ...repeatCampaign,
    status: 'running',
    updatedAt: '03.16 10:40',
  },
  {
    id: 'act-gold',
    ...goldCampaign,
    status: 'running',
    updatedAt: '03.16 10:48',
  },
]

export const initialPlacements: Record<PlacementKey, PlacementConfig> = {
  store: {
    key: 'store',
    name: '店铺首页',
    defaultStrategy: '第一屏按会员身份分层展示，优先承接拉新与复购。',
    narrative: '首页是品牌第二官网的首要阵地，需要兼顾品牌感和经营效率。',
    updatedAt: '03.16 10:42',
    mounts: [
      {
        id: 'mount-store-join',
        activityId: 'act-join',
        audience: 'guest',
        enabled: true,
        version: newGuestCampaign.title,
        updatedAt: '03.16 10:42',
      },
      {
        id: 'mount-store-repeat',
        activityId: 'act-repeat',
        audience: 'silver',
        enabled: true,
        version: repeatCampaign.title,
        updatedAt: '03.16 10:40',
      },
    ],
  },
  detail: {
    key: 'detail',
    name: '商品详情页',
    defaultStrategy: '围绕商品卖点强化会员利益点，减少权益认知损耗。',
    narrative: '详情页更适合承接高意向用户，突出绑定和入会文案的转化效率。',
    updatedAt: '03.16 10:28',
    mounts: [
      {
        id: 'mount-detail-join',
        activityId: 'act-join',
        audience: 'guest',
        enabled: true,
        version: '详情页入会版本',
        updatedAt: '03.16 10:28',
      },
    ],
  },
  center: {
    key: 'center',
    name: '会员中心',
    defaultStrategy: '聚合等级权益、成长任务和当前进行中的会员活动。',
    narrative: '会员中心是分层经营核心阵地，适合强化等级权益与任务进度。',
    updatedAt: '03.16 10:45',
    mounts: [
      {
        id: 'mount-center-first-stay',
        activityId: 'act-first-stay',
        audience: 'silver',
        enabled: true,
        version: firstStayCampaign.title,
        updatedAt: '03.16 10:45',
      },
      {
        id: 'mount-center-repeat',
        activityId: 'act-repeat',
        audience: 'silver',
        enabled: true,
        version: '会员中心召回版本',
        updatedAt: '03.16 10:44',
      },
      {
        id: 'mount-center-gold',
        activityId: 'act-gold',
        audience: 'gold',
        enabled: true,
        version: goldCampaign.title,
        updatedAt: '03.16 10:45',
      },
    ],
  },
  order: {
    key: 'order',
    name: '订单完成页',
    defaultStrategy: '围绕订单后激活和保级提醒做二次承接，延续经营动作。',
    narrative: '订单完成页适合做即时反馈，让首住激活和保级提醒更具行动感。',
    updatedAt: '03.16 10:48',
    mounts: [
      {
        id: 'mount-order-first-stay',
        activityId: 'act-first-stay',
        audience: 'silver',
        enabled: true,
        version: '订单后激活版本',
        updatedAt: '03.16 10:46',
      },
      {
        id: 'mount-order-gold',
        activityId: 'act-gold',
        audience: 'gold',
        enabled: true,
        version: '保级冲刺版本',
        updatedAt: '03.16 10:48',
      },
    ],
  },
}

export const analyticsByGoal: Record<Goal, GoalAnalytics> = {
  acquisition: {
    goal: 'acquisition',
    summary: [
      { label: '店铺曝光', value: '320,000', helper: '首页与详情页双触点承接' },
      { label: '点击入会', value: '48,000', helper: '点击率 15.0%' },
      { label: '成功入会', value: '7,800', helper: '入会转化率 16.3%' },
      { label: '成功绑定', value: '3,900', helper: '绑定转化持续上升' },
    ],
    trend: [28, 31, 34, 39, 43, 46, 48],
    funnel: [
      { label: '曝光', value: 320000 },
      { label: '点击', value: 48000 },
      { label: '入会', value: 7800 },
      { label: '绑定', value: 3900 },
    ],
    contributors: [
      { label: '店铺首页', value: 46 },
      { label: '商品详情页', value: 31 },
      { label: '会员中心', value: 15 },
      { label: '订单完成页', value: 8 },
    ],
  },
  activation: {
    goal: 'activation',
    summary: [
      { label: '新会员人数', value: '82,000', helper: '本月进入激活池会员数' },
      { label: '首单人数', value: '4,100', helper: '订单完成页贡献最高' },
      { label: '首单转化率', value: '18.7%', helper: '较活动前提升 4.2 个点' },
      { label: '升级触发数', value: '1,240', helper: '银卡会员升级势能形成' },
    ],
    trend: [10, 11, 13, 15, 17, 18, 19],
    funnel: [
      { label: '激活池', value: 82000 },
      { label: '点击活动', value: 14200 },
      { label: '首单', value: 4100 },
      { label: '升级触发', value: 1240 },
    ],
    contributors: [
      { label: '会员中心', value: 52 },
      { label: '订单完成页', value: 35 },
      { label: '店铺首页', value: 8 },
      { label: '商品详情页', value: 5 },
    ],
  },
  repeat: {
    goal: 'repeat',
    summary: [
      { label: '已购会员数', value: '46,000', helper: '近 90 天有入住行为会员' },
      { label: '二次下单人数', value: '2,300', helper: '召回活动驱动显著' },
      { label: '复购率', value: '24.3%', helper: '银卡人群复购率更高' },
      { label: '订单贡献', value: '¥2.26M', helper: '复购订单带动 GMV 回升' },
    ],
    trend: [12, 14, 15, 17, 19, 22, 24],
    funnel: [
      { label: '可召回会员', value: 46000 },
      { label: '点击活动', value: 8400 },
      { label: '复购', value: 2300 },
      { label: '订单贡献', value: 2260000 },
    ],
    contributors: [
      { label: '会员中心', value: 41 },
      { label: '店铺首页', value: 33 },
      { label: '订单完成页', value: 17 },
      { label: '商品详情页', value: 9 },
    ],
  },
  retention: {
    goal: 'retention',
    summary: [
      { label: '目标会员数', value: '12,000', helper: '进入保级经营池的金卡会员' },
      { label: '已提醒人数', value: '4,200', helper: '保级触达率 35%' },
      { label: '达成人数', value: '860', helper: '保级达成率 20.5%' },
      { label: 'GMV 贡献', value: '¥0.98M', helper: '高价值会员回流拉动明显' },
    ],
    trend: [3, 4, 5, 6, 7, 8, 9],
    funnel: [
      { label: '目标会员', value: 12000 },
      { label: '已提醒', value: 4200 },
      { label: '点击保级', value: 1800 },
      { label: '达成', value: 860 },
    ],
    contributors: [
      { label: '会员中心', value: 48 },
      { label: '订单完成页', value: 38 },
      { label: '店铺首页', value: 8 },
      { label: '商品详情页', value: 6 },
    ],
  },
}

export const performanceEntries: Record<string, PerformanceEntry> = {
  'act-join': {
    activityId: 'act-join',
    exposure: 320000,
    clicks: 48000,
    conversions: 7800,
    gmv: 5800000,
  },
  'act-first-stay': {
    activityId: 'act-first-stay',
    exposure: 82000,
    clicks: 14200,
    conversions: 4100,
    gmv: 3680000,
  },
  'act-repeat': {
    activityId: 'act-repeat',
    exposure: 46000,
    clicks: 8400,
    conversions: 2300,
    gmv: 2260000,
  },
  'act-gold': {
    activityId: 'act-gold',
    exposure: 12000,
    clicks: 4200,
    conversions: 860,
    gmv: 980000,
  },
}

export const quickTodos = [
  '1 个活动待发布',
  '2 个触点待配置',
  '1 个活动本周到期',
]
