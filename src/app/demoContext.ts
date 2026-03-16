import { createContext } from 'react'
import type {
  Activity,
  ActivityAction,
  BenefitConfig,
  CampaignFormValues,
  Goal,
  GoalAnalytics,
  PerformanceEntry,
  PlacementConfig,
  PlacementDraft,
  PlacementKey,
  Role,
  Segment,
  TemplateDefinition,
  ToastMessage,
} from './types'

export interface DemoContextValue {
  role: Role
  setRole: (role: Role) => void
  benefits: Record<Segment, BenefitConfig>
  saveBenefits: (segment: Segment, next: Omit<BenefitConfig, 'updatedAt'>) => void
  templates: TemplateDefinition[]
  activities: Activity[]
  createActivity: (values: CampaignFormValues, action: ActivityAction) => string
  placements: Record<PlacementKey, PlacementConfig>
  configurePlacement: (placementKey: PlacementKey, draft: PlacementDraft) => void
  analytics: Record<Goal, GoalAnalytics>
  performance: Record<string, PerformanceEntry>
  toasts: ToastMessage[]
}

export const DemoContext = createContext<DemoContextValue | null>(null)
