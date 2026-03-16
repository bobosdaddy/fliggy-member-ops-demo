export type Role = 'platformOps' | 'merchantAdmin' | 'merchantOperator'

export type Segment = 'guest' | 'registered' | 'silver' | 'gold'

export type Goal = 'acquisition' | 'activation' | 'repeat' | 'retention'

export type PlacementKey = 'store' | 'detail' | 'center' | 'order'

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
  recommendedTemplate: string
  touchpoints: string[]
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
}

export interface TemplateDefinition {
  id: string
  goal: Goal
  name: string
  description: string
  recommendedSegment: Segment
  recommendedPlacements: PlacementKey[]
  effectTag: string
  defaultCampaign: CampaignFormValues
}

export interface Activity {
  id: string
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
  status: ActivityStatus
  updatedAt: string
  templateId?: string
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

export interface PlacementDraft {
  activityId: string
  audience: Segment
  enabled: boolean
  version: string
}
