export type Role = 'platformOps' | 'merchantAdmin' | 'merchantOperator'

export type Segment = 'guest' | 'lapsed' | 'potential' | 'silver' | 'gold'

export type Goal = 'acquisition' | 'recall' | 'upgrade' | 'browseNoBuy' | 'campaign'

export type ChannelKey = 'push' | 'sms' | 'inapp' | 'store' | 'detail' | 'center'

export type ActivityStatus = 'draft' | 'pending' | 'running'

export type ActivityAction = 'draft' | 'submit' | 'publish'

export interface SegmentInsight {
  key: Segment
  scale: number
  goal: string
  strategy: string
  recommendation: string
  definition: string
  defaultBenefits: string[]
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

export interface LandingPageConfig {
  title: string
  subtitle: string
  cta: string
  highlights: string[]
}

export interface ScenarioDefinition {
  id: string
  goal: Goal
  name: string
  icon: string
  description: string
  targetSegment: Segment
  aiStrategy: string
  aiAudienceDesc: string
  aiAudienceSize: string
  landingPage: LandingPageConfig
  recommendedChannels: ChannelKey[]
  effectTag: string
  defaultBenefits: string[]
  defaultBenefitTitle: string
  defaultBenefitCta: string
}

export interface Activity {
  id: string
  name: string
  goal: Goal
  segment: Segment
  channels: ChannelKey[]
  startDate: string
  endDate: string
  title: string
  subtitle: string
  cta: string
  note: string
  status: ActivityStatus
  updatedAt: string
  scenarioId?: string
  landingHighlights?: string[]
  benefits?: string[]
  benefitTitle?: string
  benefitCta?: string
}

export interface StrategyFormValues {
  scenarioId: string
  name: string
  goal: Goal
  segment: Segment
  channels: ChannelKey[]
  startDate: string
  endDate: string
  title: string
  subtitle: string
  cta: string
  note: string
  landingHighlights: string[]
  benefits: string[]
  benefitTitle: string
  benefitCta: string
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
  goal: Goal
  summary: AnalyticsMetric[]
  trend: number[]
  funnel: ChartDatum[]
  contributors: ChartDatum[]
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
