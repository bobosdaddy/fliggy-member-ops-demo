import type {
  Activity,
  BenefitConfig,
  Goal,
  GoalAnalytics,
  PerformanceEntry,
  Role,
  Segment,
  SegmentInsight,
  ScenarioDefinition,
  ChannelKey,
} from '../app/types'

export const roleOrder: Role[] = [
  'platformOps',
  'merchantAdmin',
  'merchantOperator',
]

export const goalOrder: Goal[] = [
  'acquisition',
  'recall',
  'upgrade',
  'browseNoBuy',
  'campaign',
]

export const segmentOrder: Segment[] = ['guest', 'lapsed', 'potential', 'silver', 'gold']

export const channelOrder: ChannelKey[] = [
  'push',
  'sms',
  'inapp',
  'store',
  'detail',
  'center',
]

export const touchpointKeys: ChannelKey[] = ['store', 'detail', 'center']

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
  acquisition: { label: '会员拉新', tone: 'violet' },
  recall: { label: '会员召回', tone: 'amber' },
  upgrade: { label: '升保级', tone: 'rose' },
  browseNoBuy: { label: '浏览未购', tone: 'teal' },
  campaign: { label: '营销活动', tone: 'blue' },
}

export const segmentMeta: Record<Segment, { label: string; short: string }> = {
  guest: { label: '未入会用户', short: '未入会' },
  lapsed: { label: '沉默会员', short: '沉默' },
  potential: { label: '潜力会员', short: '潜力' },
  silver: { label: '银卡会员', short: '银卡' },
  gold: { label: '金卡会员', short: '金卡' },
}

export const channelMeta: Record<
  ChannelKey,
  { label: string; description: string; category: 'message' | 'touchpoint' }
> = {
  push: {
    label: 'Push 推送',
    description: '通过 App 推送消息直接触达用户，打开率高。',
    category: 'message',
  },
  sms: {
    label: '短信触达',
    description: '通过短信发送营销信息，覆盖面广。',
    category: 'message',
  },
  inapp: {
    label: '站内消息',
    description: '飞猪 App 内消息中心推送，用户主动查看。',
    category: 'message',
  },
  store: {
    label: '店铺首页',
    description: '品牌旗舰店首页承接，第一屏曝光。',
    category: 'touchpoint',
  },
  detail: {
    label: '商品详情页',
    description: '在商品页强化会员权益卖点，促进转化。',
    category: 'touchpoint',
  },
  center: {
    label: '会员中心',
    description: '会员专属页面，聚合等级权益与活动。',
    category: 'touchpoint',
  },
}

export const statusMeta = {
  draft: { label: '草稿', tone: 'muted' },
  pending: { label: '待审核', tone: 'warning' },
  running: { label: '运行中', tone: 'success' },
}

export const dashboardMetrics = [
  { label: '新增入会人数', value: '8,420', helper: '拉新活动驱动入会持续增长' },
  { label: '召回成功人数', value: '3,260', helper: '沉默会员回流持续增长' },
  { label: '升保级达成', value: '1,480', helper: '银卡升级 + 金卡保级贡献' },
  { label: '浏览未购转化', value: '12.6%', helper: '定向推送带动转化提升' },
  { label: '营销活动 GMV', value: '¥380万', helper: '本月活动贡献 GMV' },
  { label: '已绑定会员数', value: '128,600', helper: '品牌会员资产持续沉淀' },
]

export const dashboardTrend = [42, 48, 53, 58, 64, 72, 82]

export const audienceInsights: SegmentInsight[] = [
  {
    key: 'guest',
    scale: 420000,
    goal: '拉新',
    strategy: '以入会权益和会员价心智承接自然流量，推动快速注册入会。',
    recommendation: '优先使用"会员拉新"场景，店铺首页 + 商品详情页承接。',
    definition: '尚未加入希尔顿荣誉客会的飞猪访客。',
    defaultBenefits: ['会员专享价', '入会礼包', '等级成长路径'],
  },
  {
    key: 'lapsed',
    scale: 38000,
    goal: '召回',
    strategy: '基于流失预测模型识别高价值沉默会员，通过专属回流礼遇激活。',
    recommendation: '优先使用"会员召回"场景，Push + 短信组合触达。',
    definition: '近 30 天未访问且近 90 天无订单的已绑定会员。',
    defaultBenefits: ['回流专属价', '限时优惠券', '积分翻倍'],
  },
  {
    key: 'potential',
    scale: 52000,
    goal: '转化',
    strategy: '针对浏览过商品但未下单的用户，推送已浏览商品的专属优惠促进决策。',
    recommendation: '使用"浏览未购"场景，站内消息 + 商品详情页承接。',
    definition: '近 7 天有浏览行为但无下单的已绑定会员。',
    defaultBenefits: ['已浏览商品优惠', '会员专享折扣', '限时下单礼'],
  },
  {
    key: 'silver',
    scale: 61000,
    goal: '升级',
    strategy: '围绕升级门槛设计任务，强化一次入住后的成长反馈与升级激励。',
    recommendation: '使用"升保级"场景，会员中心 + Push 组合提醒。',
    definition: '已完成绑定并处于银卡等级的会员。',
    defaultBenefits: ['升级差距提醒', '升级奖励预览', '专属预订优惠'],
  },
  {
    key: 'gold',
    scale: 18000,
    goal: '营销',
    strategy: '围绕高价值会员设计专属营销活动，强化尊享感与复购动力。',
    recommendation: '使用"营销活动"场景，全渠道触达配合专属权益。',
    definition: '已完成绑定并达到金卡等级的高价值会员。',
    defaultBenefits: ['金卡专属礼遇', '大促优先预订', '行政酒廊礼遇'],
  },
]

export const scenarios: ScenarioDefinition[] = [
  {
    id: 'sc-acquisition',
    goal: 'acquisition',
    name: '会员拉新',
    icon: '🚀',
    description:
      '针对尚未入会的飞猪访客，通过会员价心智与入会礼遇，降低入会门槛，快速扩大品牌会员规模。',
    targetSegment: 'guest',
    aiStrategy:
      '基于用户浏览偏好与消费力模型，筛选高转化潜力的未入会访客（近 7 天浏览 ≥ 2 次、客单价匹配），生成个性化入会引导话术与专属礼遇。',
    aiAudienceDesc:
      '7天内浏览 ≥ 2 次 × 未入会 × 消费力匹配的飞猪访客',
    aiAudienceSize: '约 42,000 人',
    landingPage: {
      title: '加入希尔顿荣誉客会，解锁飞猪专享礼遇',
      subtitle:
        '新会员入会即享专属价格、早餐福利与等级成长权益，开启品牌会员之旅。',
      cta: '立即入会',
      highlights: ['入会即享会员专属价', '首单赠早餐权益', '等级成长加速计划'],
    },
    recommendedChannels: ['store', 'detail', 'push'],
    effectTag: '预估入会率提升 18%',
    defaultBenefits: ['会员专享价', '入会礼包', '等级成长路径'],
    defaultBenefitTitle: '新客入会专属礼遇',
    defaultBenefitCta: '立即入会',
  },
  {
    id: 'sc-recall',
    goal: 'recall',
    name: '会员召回',
    icon: '📢',
    description:
      '针对 30 天以上未活跃的沉默会员，通过 AI 预测流失风险，精准推送回流礼遇，激活沉默资产。',
    targetSegment: 'lapsed',
    aiStrategy:
      '基于会员活跃度衰减模型，筛选流失风险 Top 20% 的高价值沉默会员（历史 GMV > ¥2,000），生成个性化回流话术与专属优惠组合。',
    aiAudienceDesc:
      '30天+ 未活跃 × 历史高价值 × 流失风险评分 > 0.7 的沉默会员',
    aiAudienceSize: '约 8,600 人',
    landingPage: {
      title: '好久不见，专属回流礼遇已备好',
      subtitle:
        '我们为您准备了回流专属会员价和限时积分翻倍，欢迎回到希尔顿的世界。',
      cta: '立即查看礼遇',
      highlights: ['回流专属价立减 ¥200', '入住即享双倍积分', '限时升级房型体验'],
    },
    recommendedChannels: ['push', 'sms', 'store'],
    effectTag: '预估召回率提升 22%',
    defaultBenefits: ['回流专属价', '积分翻倍', '房型升级体验'],
    defaultBenefitTitle: '沉默会员专属回流礼遇',
    defaultBenefitCta: '立即回归',
  },
  {
    id: 'sc-upgrade',
    goal: 'upgrade',
    name: '会员升保级',
    icon: '⭐',
    description:
      '识别距升级 / 保级目标最近的会员，通过成长进度提醒与升级奖励激励，推动等级跃迁。',
    targetSegment: 'silver',
    aiStrategy:
      '基于会员等级成长模型，圈选距升级金卡差 1-2 晚的银卡会员，结合升级后权益对比，生成个性化冲刺话术。',
    aiAudienceDesc:
      '银卡等级 × 距升级差 ≤ 2 晚 × 近 30 天有浏览行为的会员',
    aiAudienceSize: '约 5,200 人',
    landingPage: {
      title: '距金卡只差 1 晚，升级即享更多礼遇',
      subtitle:
        '完成升级后可解锁行政酒廊、延迟退房等金卡专属权益，现在预订即可冲刺。',
      cta: '立即预订冲刺',
      highlights: [
        '升级后解锁行政酒廊',
        '延迟退房至 16:00',
        '专属金卡会员价',
      ],
    },
    recommendedChannels: ['push', 'inapp', 'center'],
    effectTag: '预估升级率提升 18%',
    defaultBenefits: ['升级进度可视化', '升级后权益预览', '冲刺专属房价'],
    defaultBenefitTitle: '银卡升级冲刺礼遇',
    defaultBenefitCta: '立即冲刺',
  },
  {
    id: 'sc-browse',
    goal: 'browseNoBuy',
    name: '浏览未购运营',
    icon: '👀',
    description:
      '针对浏览过商品但未下单的高意向用户，推送已浏览商品的专属优惠，降低决策门槛。',
    targetSegment: 'potential',
    aiStrategy:
      '基于浏览行为分析模型，识别近 7 天浏览 ≥ 3 次但未下单的用户，结合浏览偏好生成个性化商品推荐与优惠组合。',
    aiAudienceDesc:
      '7天内浏览 ≥ 3 次 × 未下单 × 有收藏或加购行为的会员',
    aiAudienceSize: '约 12,400 人',
    landingPage: {
      title: '您关注的酒店有专属优惠了',
      subtitle:
        '我们发现您最近在关注这些酒店，现在下单可享会员专属折扣和限时礼遇。',
      cta: '查看专属优惠',
      highlights: [
        '已浏览商品专享 9 折',
        '下单即赠早餐权益',
        '限时 48 小时有效',
      ],
    },
    recommendedChannels: ['inapp', 'push', 'detail'],
    effectTag: '预估转化率提升 15%',
    defaultBenefits: ['浏览商品专属价', '下单赠早餐', '限时优惠券'],
    defaultBenefitTitle: '潜力会员专属下单礼遇',
    defaultBenefitCta: '立即下单',
  },
  {
    id: 'sc-campaign',
    goal: 'campaign',
    name: '会员营销活动',
    icon: '🎯',
    description:
      '围绕大促 / 节日 / 品牌节点策划会员专属营销活动，全量触达配合分层权益，最大化 GMV。',
    targetSegment: 'gold',
    aiStrategy:
      '基于会员消费力模型与节点营销经验库，为金卡会员设计尊享礼遇包，配合全渠道预热与限时抢购节奏。',
    aiAudienceDesc:
      '金卡等级 × 近 180 天有消费 × 客单价 Top 30% 的高价值会员',
    aiAudienceSize: '约 6,800 人',
    landingPage: {
      title: '金卡会员尊享·春季出行礼遇季',
      subtitle:
        '专为金卡会员打造的春季礼遇，预订指定酒店享专属折扣与升级体验。',
      cta: '立即抢购',
      highlights: [
        '金卡专属价低至 7 折',
        '满 2 晚赠 1 晚体验',
        '行政酒廊免费升级',
      ],
    },
    recommendedChannels: ['push', 'sms', 'inapp', 'store', 'detail', 'center'],
    effectTag: '预估 GMV 提升 28%',
    defaultBenefits: ['活动专属价', '满赠礼遇', '尊享升级体验'],
    defaultBenefitTitle: '金卡专属营销礼遇',
    defaultBenefitCta: '立即抢购',
  },
]

export const initialBenefits: Record<Segment, BenefitConfig> = {
  guest: {
    segment: 'guest',
    title: '加入希尔顿荣誉客会，解锁飞猪专享礼遇',
    subtitle: '新会员入会即享专属价格、早餐福利与等级成长权益。',
    cta: '立即入会',
    benefitCards: ['会员专享价', '入会礼包', '等级成长路径'],
    updatedAt: '03.28 09:28',
  },
  lapsed: {
    segment: 'lapsed',
    title: '好久不见，专属回流礼遇已备好',
    subtitle: '回流会员可享专属价格、积分翻倍与房型升级体验。',
    cta: '立即回归',
    benefitCards: ['回流专属价', '积分翻倍', '房型升级体验'],
    updatedAt: '03.28 09:30',
  },
  potential: {
    segment: 'potential',
    title: '您关注的酒店有专属优惠了',
    subtitle: '下单即享会员专属折扣与限时早餐礼遇。',
    cta: '立即下单',
    benefitCards: ['浏览商品专属价', '下单赠早餐', '限时优惠券'],
    updatedAt: '03.28 09:32',
  },
  silver: {
    segment: 'silver',
    title: '银卡会员升级冲刺中',
    subtitle: '距金卡还差 1 晚，完成升级即享更多专属礼遇。',
    cta: '立即冲刺',
    benefitCards: ['升级进度可视化', '升级后权益预览', '冲刺专属房价'],
    tierNote: '当前等级权益：早餐礼遇、延迟退房、会员价权益。',
    progressNote: '升级提醒：再完成 1 晚住宿，即可升级金卡解锁更多礼遇。',
    updatedAt: '03.28 09:35',
  },
  gold: {
    segment: 'gold',
    title: '金卡尊享·春季出行礼遇季',
    subtitle: '专为金卡会员打造的春季礼遇，预订指定酒店享专属折扣。',
    cta: '立即抢购',
    benefitCards: ['活动专属价', '满赠礼遇', '尊享升级体验'],
    tierNote: '当前等级权益：行政酒廊、高阶礼遇与品牌专属服务。',
    progressNote: '保级进度：还差 2 晚即可完成当前周期保级目标。',
    updatedAt: '03.28 09:38',
  },
}

export const initialActivities: Activity[] = [
  {
    id: 'act-acquisition',
    name: '新客入会礼遇计划',
    goal: 'acquisition',
    segment: 'guest',
    channels: ['store', 'detail', 'push'],
    startDate: '2026-03-16',
    endDate: '2026-04-16',
    title: '加入希尔顿荣誉客会，解锁飞猪专享礼遇',
    subtitle: '新会员入会即享专属价格、早餐福利与等级成长权益。',
    cta: '立即入会',
    note: '针对高浏览频次未入会访客，店铺首页 + 详情页双触点承接。',
    status: 'running',
    updatedAt: '03.28 10:10',
    scenarioId: 'sc-acquisition',
    landingHighlights: ['入会即享会员专属价', '首单赠早餐权益', '等级成长加速计划'],
    benefits: ['会员专享价', '入会礼包', '等级成长路径'],
  },
  {
    id: 'act-recall',
    name: '沉默会员唤醒计划',
    goal: 'recall',
    segment: 'lapsed',
    channels: ['push', 'sms', 'store'],
    startDate: '2026-03-16',
    endDate: '2026-04-16',
    title: '好久不见，专属回流礼遇已备好',
    subtitle: '回流会员可享专属价格、积分翻倍与房型升级体验。',
    cta: '立即查看礼遇',
    note: '针对 30 天以上未活跃的高价值会员，Push + 短信组合触达。',
    status: 'running',
    updatedAt: '03.28 10:20',
    scenarioId: 'sc-recall',
    landingHighlights: ['回流专属价立减 ¥200', '入住即享双倍积分', '限时升级房型体验'],
    benefits: ['回流专属价', '积分翻倍', '房型升级体验'],
  },
  {
    id: 'act-upgrade',
    name: '银卡升级加速计划',
    goal: 'upgrade',
    segment: 'silver',
    channels: ['push', 'inapp', 'center'],
    startDate: '2026-03-16',
    endDate: '2026-04-20',
    title: '距金卡只差 1 晚，升级即享更多礼遇',
    subtitle: '完成升级后可解锁行政酒廊、延迟退房等金卡专属权益。',
    cta: '立即预订冲刺',
    note: '圈选距升级差 1-2 晚的银卡会员，推动等级跃迁。',
    status: 'running',
    updatedAt: '03.28 10:35',
    scenarioId: 'sc-upgrade',
    landingHighlights: ['升级后解锁行政酒廊', '延迟退房至 16:00', '专属金卡会员价'],
    benefits: ['升级进度可视化', '升级后权益预览', '冲刺专属房价'],
  },
  {
    id: 'act-browse',
    name: '浏览未购定向转化',
    goal: 'browseNoBuy',
    segment: 'potential',
    channels: ['inapp', 'push', 'detail'],
    startDate: '2026-03-16',
    endDate: '2026-04-30',
    title: '您关注的酒店有专属优惠了',
    subtitle: '最近浏览的酒店现在下单可享会员专属折扣。',
    cta: '查看专属优惠',
    note: '基于浏览行为分析，推送已浏览商品的专属优惠。',
    status: 'running',
    updatedAt: '03.28 10:40',
    scenarioId: 'sc-browse',
    landingHighlights: ['已浏览商品专享 9 折', '下单即赠早餐权益', '限时 48 小时有效'],
    benefits: ['浏览商品专属价', '下单赠早餐', '限时优惠券'],
  },
  {
    id: 'act-campaign',
    name: '金卡春季礼遇季',
    goal: 'campaign',
    segment: 'gold',
    channels: ['push', 'sms', 'inapp', 'store', 'detail', 'center'],
    startDate: '2026-03-16',
    endDate: '2026-05-15',
    title: '金卡会员尊享·春季出行礼遇季',
    subtitle: '专为金卡会员打造的春季礼遇，预订指定酒店享专属折扣。',
    cta: '立即抢购',
    note: '面向金卡高价值会员的季度性营销活动，全渠道覆盖。',
    status: 'running',
    updatedAt: '03.28 10:48',
    scenarioId: 'sc-campaign',
    landingHighlights: ['金卡专属价低至 7 折', '满 2 晚赠 1 晚体验', '行政酒廊免费升级'],
    benefits: ['活动专属价', '满赠礼遇', '尊享升级体验'],
  },
]

export const analyticsByGoal: Record<Goal, GoalAnalytics> = {
  acquisition: {
    goal: 'acquisition',
    summary: [
      { label: '店铺曝光', value: '320,000', helper: '首页与详情页双触点承接' },
      { label: '点击入会', value: '48,000', helper: '点击率 15.0%' },
      { label: '成功入会', value: '8,420', helper: '入会转化率 17.5%' },
      { label: 'GMV 贡献', value: '¥580万', helper: '新会员首单带动增长' },
    ],
    trend: [28, 34, 40, 48, 56, 66, 78],
    funnel: [
      { label: '店铺曝光', value: 320000 },
      { label: '点击入会', value: 48000 },
      { label: '成功入会', value: 8420 },
      { label: '首单转化', value: 3200 },
    ],
    contributors: [
      { label: '店铺首页', value: 44 },
      { label: '商品详情页', value: 32 },
      { label: 'Push 推送', value: 16 },
      { label: '站内消息', value: 8 },
    ],
  },
  recall: {
    goal: 'recall',
    summary: [
      { label: '目标沉默会员', value: '38,000', helper: '30天+ 未活跃会员池' },
      { label: '成功触达', value: '28,600', helper: '多渠道触达率 75.3%' },
      { label: '回流人数', value: '3,260', helper: '召回转化率 11.4%' },
      { label: 'GMV 贡献', value: '¥286万', helper: '回流订单带动显著' },
    ],
    trend: [18, 22, 26, 29, 31, 34, 38],
    funnel: [
      { label: '目标会员', value: 38000 },
      { label: '成功触达', value: 28600 },
      { label: '点击活动', value: 8400 },
      { label: '回流下单', value: 3260 },
    ],
    contributors: [
      { label: 'Push 推送', value: 42 },
      { label: '短信触达', value: 28 },
      { label: '店铺首页', value: 18 },
      { label: '站内消息', value: 12 },
    ],
  },
  upgrade: {
    goal: 'upgrade',
    summary: [
      { label: '目标升保级会员', value: '12,800', helper: '银卡升级 + 金卡保级' },
      { label: '成功触达', value: '10,200', helper: '触达率 79.7%' },
      { label: '升保级达成', value: '1,480', helper: '达成率 14.5%' },
      { label: 'GMV 贡献', value: '¥168万', helper: '升级冲刺订单贡献' },
    ],
    trend: [6, 8, 10, 12, 13, 14, 15],
    funnel: [
      { label: '目标会员', value: 12800 },
      { label: '成功触达', value: 10200 },
      { label: '点击活动', value: 4600 },
      { label: '升保级达成', value: 1480 },
    ],
    contributors: [
      { label: '会员中心', value: 38 },
      { label: 'Push 推送', value: 32 },
      { label: '站内消息', value: 20 },
      { label: '商品详情页', value: 10 },
    ],
  },
  browseNoBuy: {
    goal: 'browseNoBuy',
    summary: [
      { label: '浏览未购用户', value: '52,000', helper: '近 7 天有浏览行为' },
      { label: '成功触达', value: '41,600', helper: '触达率 80%' },
      { label: '转化下单', value: '5,240', helper: '转化率 12.6%' },
      { label: 'GMV 贡献', value: '¥316万', helper: '未购转化 GMV 可观' },
    ],
    trend: [22, 26, 30, 35, 40, 46, 52],
    funnel: [
      { label: '浏览未购用户', value: 52000 },
      { label: '成功触达', value: 41600 },
      { label: '点击优惠', value: 14200 },
      { label: '转化下单', value: 5240 },
    ],
    contributors: [
      { label: '站内消息', value: 36 },
      { label: 'Push 推送', value: 28 },
      { label: '商品详情页', value: 24 },
      { label: '店铺首页', value: 12 },
    ],
  },
  campaign: {
    goal: 'campaign',
    summary: [
      { label: '活动触达人数', value: '86,000', helper: '全渠道累计触达' },
      { label: '活动参与人数', value: '18,600', helper: '参与率 21.6%' },
      { label: '活动下单人数', value: '6,820', helper: '转化率 36.7%' },
      { label: 'GMV 贡献', value: '¥586万', helper: '营销活动 GMV 贡献最大' },
    ],
    trend: [32, 38, 44, 52, 60, 68, 78],
    funnel: [
      { label: '活动触达', value: 86000 },
      { label: '活动参与', value: 18600 },
      { label: '加入购物车', value: 12400 },
      { label: '活动下单', value: 6820 },
    ],
    contributors: [
      { label: 'Push 推送', value: 28 },
      { label: '店铺首页', value: 24 },
      { label: '短信触达', value: 20 },
      { label: '会员中心', value: 16 },
    ],
  },
}

export const performanceEntries: Record<string, PerformanceEntry> = {
  'act-acquisition': {
    activityId: 'act-acquisition',
    exposure: 320000,
    clicks: 48000,
    conversions: 8420,
    gmv: 5800000,
  },
  'act-recall': {
    activityId: 'act-recall',
    exposure: 28600,
    clicks: 8400,
    conversions: 3260,
    gmv: 2860000,
  },
  'act-upgrade': {
    activityId: 'act-upgrade',
    exposure: 10200,
    clicks: 4600,
    conversions: 1480,
    gmv: 1680000,
  },
  'act-browse': {
    activityId: 'act-browse',
    exposure: 41600,
    clicks: 14200,
    conversions: 5240,
    gmv: 3160000,
  },
  'act-campaign': {
    activityId: 'act-campaign',
    exposure: 86000,
    clicks: 18600,
    conversions: 6820,
    gmv: 5860000,
  },
}

export const quickTodos = [
  '1 个策略待发布',
  '2 个渠道待配置',
  '1 个活动本周到期',
]
