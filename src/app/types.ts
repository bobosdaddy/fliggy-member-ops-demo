export type Role = 'platformOps' | 'merchantAdmin' | 'merchantOperator'

export type ScenarioKey = 'registration' | 'firstOrder' | 'promoteOrder' | 'repurchase'

export type AudienceMode = 'ai' | 'manual'

export type AudienceTagKey =
  | 'hiltonHighIntent'
  | 'hiltonSearchRecent'
  | 'luxuryHotelFan'
  | 'couponResponder'
  | 'businessTraveler'
  | 'familyVacationPlanner'

export type AudienceCondition =
  | 'unregistered'
  | 'registeredNoOrder'
  | 'orderUnpaid'
  | 'orderCancelled'

export type ChannelKey = 'sms' | 'wecom' | 'storeMsg'

export type BenefitCategory = 'points' | 'coupon' | 'identity' | 'activity'

export type ActivityStatus = 'draft' | 'pending' | 'running'

export type ActivityAction = 'draft' | 'submit' | 'publish'

export type CreativeMode = 'manual' | 'ai'

export type ReportScope = 'strategy' | 'scenario'

export interface ScenarioDefinition {
  id: ScenarioKey
  name: string
  icon: string
  description: string
  aiStrategy: string
  estimatedAudience: string
  effectTag: string
  defaultConditions: AudienceCondition[]
  defaultChannels: ChannelKey[]
  defaultBenefitIds: string[]
  landingTitle: string
  landingSubtitle: string
  landingCta: string
  landingHighlights: string[]
}

export interface BenefitItem {
  id: string
  category: BenefitCategory
  name: string
  description: string
  brand?: string
  value?: string
  enabled: boolean
}

export interface Creative {
  id: string
  name: string
  mode: CreativeMode
  link: string
  landingTitle: string
  landingSubtitle: string
  landingCta: string
  landingHighlights: string[]
  benefitIds: string[]
  updatedAt: string
}

export interface Strategy {
  id: string
  name: string
  scenario: ScenarioKey
  conditions: AudienceCondition[]
  channels: ChannelKey[]
  creative: Creative
  benefitIds: string[]
  status: ActivityStatus
  startDate: string
  endDate: string
  note: string
  updatedAt: string
}

export interface StrategyFormValues {
  name: string
  scenario: ScenarioKey
  conditions: AudienceCondition[]
  channels: ChannelKey[]
  audienceScale: number
  audienceMode: AudienceMode
  audienceTags: AudienceTagKey[]
  creativeMode: CreativeMode
  manualLink: string
  landingTitle: string
  landingSubtitle: string
  landingCta: string
  landingHighlights: string[]
  benefitIds: string[]
  startDate: string
  endDate: string
  note: string
}

export interface PerformanceEntry {
  strategyId: string
  exposure: number
  clicks: number
  conversions: number
  gmv: number
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

export interface ScenarioAnalytics {
  scenario: ScenarioKey
  summary: AnalyticsMetric[]
  trend: number[]
  funnel: ChartDatum[]
  channelContribution: ChartDatum[]
}

export interface ToastMessage {
  id: number
  title: string
  detail: string
}
