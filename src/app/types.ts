export type Role = 'platformOps' | 'merchantAdmin' | 'merchantOperator'

export type Segment = 'guest' | 'registered' | 'silver' | 'gold'

export type AudienceKey =
  | 'guest'
  | 'registered'
  | 'newMember'
  | 'silverPotential'
  | 'goldRetention'

export type Goal =
  | 'acquisition'
  | 'activation'
  | 'repeat'
  | 'upgrade'
  | 'retention'

export type AnalyticsTabKey =
  | 'acquisition'
  | 'activation'
  | 'repeat'
  | 'loyalty'
  | 'channel'

export type PlacementKey = 'store' | 'detail' | 'center' | 'order'

export type ChannelKey =
  | 'push'
  | 'onsite'
  | 'store'
  | 'detail'
  | 'center'
  | 'order'
  | 'sms'
  | 'call'
  | 'venue'
  | 'search'

export type ResourceSlotKey =
  | 'storeBanner'
  | 'detailZone'
  | 'memberCenterSpot'
  | 'venueSpot'
  | 'brandHallBanner'
  | 'searchBenefitSpot'

export type ActivityStatus = 'draft' | 'pending' | 'running'

export type ActivityAction = 'draft' | 'submit' | 'publish'

export type ActivityKind = 'template' | 'marketing'

export type BudgetStatus = 'none' | 'pending' | 'confirmed'

export type MarketingType =
  | 'flashSale'
  | 'bonusPoints'
  | 'limitedBoost'
  | 'memberPerk'

export type BoostType =
  | 'discount'
  | 'bonusPoints'
  | 'extraExposure'
  | 'upgradeBoost'

export type PreviewMode = 'template' | 'marketing'

export interface SegmentInsight {
  key: Segment
  scale: number
  goal: string
  strategy: string
  recommendation: string
  definition: string
  defaultBenefits: string[]
  recommendedTemplate: string
  touchpoints: string[]
  highPotentialHint: string
}

export interface BenefitConfig {
  segment: Segment
  title: string
  subtitle: string
  cta: string
  benefitCards: string[]
  tierNote?: string
  progressNote?: string
  updatedAt: string
}

export interface CampaignFormValues {
  name: string
  goal: Goal
  segment: Segment
  placements: PlacementKey[]
  startDate: string
  endDate: string
  title: string
  subtitle: string
  cta: string
  note: string
  templateId?: string
  aiStrategyId?: string
}

export interface MarketingFormValues {
  name: string
  marketingType: MarketingType
  goal: Goal
  audience: AudienceKey
  boostType: BoostType
  startDate: string
  endDate: string
  totalBudget: number
  channelBudget: Partial<Record<ChannelKey, number>>
  resourceSlots: ResourceSlotKey[]
  channels: ChannelKey[]
  estimatedReach: number
  estimatedLift: string
  estimatedIncrementalGmv: number
  recommendedBudget: number
  title: string
  subtitle: string
  cta: string
  note: string
  presetId?: string
  aiStrategyId?: string
}

export interface TemplateDefinition {
  id: string
  goal: Goal
  name: string
  description: string
  recommendedSegment: Segment
  recommendedPlacements: PlacementKey[]
  recommendedStage: string
  budgetStrategy: string
  recommendedChannels: ChannelKey[]
  effectTag: string
  aiTag: string
  suggestMarketingBoost: string
  defaultCampaign: CampaignFormValues
}

export interface MarketingPreset {
  id: string
  name: string
  description: string
  defaultForm: MarketingFormValues
}

export interface StrategyRecommendation {
  id: string
  name: string
  goal: Goal
  audienceLabel: string
  stage: string
  recommendedChannels: ChannelKey[]
  recommendedPlacements: PlacementKey[]
  estimatedLift: string
  description: string
  target: 'template' | 'marketing'
  templateId?: string
  marketingPresetId?: string
}

export interface Activity {
  id: string
  kind: ActivityKind
  activityTypeLabel: string
  name: string
  goal: Goal
  audienceKey: AudienceKey
  audienceLabel: string
  previewSegment: Segment
  placements: PlacementKey[]
  channels: ChannelKey[]
  resourceSlots: ResourceSlotKey[]
  startDate: string
  endDate: string
  title: string
  subtitle: string
  cta: string
  note: string
  status: ActivityStatus
  updatedAt: string
  templateId?: string
  presetId?: string
  budget: number
  budgetStatus: BudgetStatus
  estimatedReach: number
  estimatedLift: string
  incrementalGmv: number
  roi?: string
}

export interface PlacementMount {
  id: string
  activityId: string
  audience: Segment
  enabled: boolean
  version: string
  updatedAt: string
}

export interface PlacementConfig {
  key: PlacementKey
  name: string
  defaultStrategy: string
  narrative: string
  updatedAt: string
  mounts: PlacementMount[]
}

export interface AnalyticsMetric {
  label: string
  value: string
  helper: string
}

export interface ChartDatum {
  label: string
  value: number
}

export interface GoalAnalytics {
  key: Exclude<AnalyticsTabKey, 'channel'>
  title: string
  goals: Goal[]
  summary: AnalyticsMetric[]
  trend: number[]
  funnel: ChartDatum[]
  contributors: ChartDatum[]
}

export interface ChannelMetric {
  channel: ChannelKey
  channelType: 'free' | 'paid'
  coverage: number
  successRate: string
  conversionRate: string
  cost: number
  gmv: number
  roi: string
}

export interface ChannelAnalytics {
  summary: AnalyticsMetric[]
  rows: ChannelMetric[]
}

export interface PerformanceEntry {
  activityId: string
  exposure: number
  clicks: number
  conversions: number
  gmv: number
}

export interface ToastMessage {
  id: number
  title: string
  detail: string
}

export interface PlacementDraft {
  activityId: string
  audience: Segment
  enabled: boolean
  version: string
}

export interface ChannelPlanDraft {
  activityId: string
  channels: ChannelKey[]
  totalBudget: number
  channelBudget: Partial<Record<ChannelKey, number>>
  estimatedReach: number
  estimatedSuccessRate: string
}

export interface OperatingStage {
  label: string
  issue: string
  opportunity: string
}

export interface AiDiagnosis {
  id: string
  detail: string
}

export interface ChannelDefinition {
  key: ChannelKey
  label: string
  category: 'free' | 'paid'
  reach: string
  scenario: string
  usage: string
  unitCost: string
}

export interface ResourceSlotDefinition {
  key: ResourceSlotKey
  label: string
  type: 'free' | 'paid'
  description: string
}
