import { createContext } from 'react'
import type {
  Activity,
  ActivityAction,
  BenefitConfig,
  CampaignFormValues,
  ChannelPlanDraft,
  MarketingFormValues,
  PerformanceEntry,
  PlacementConfig,
  PlacementDraft,
  PlacementKey,
  Role,
  Segment,
  TemplateDefinition,
  ToastMessage,
  MarketingPreset,
} from './types'

export interface DemoContextValue {
  role: Role
  setRole: (role: Role) => void
  benefits: Record<Segment, BenefitConfig>
  saveBenefits: (segment: Segment, next: Omit<BenefitConfig, 'updatedAt'>) => void
  templates: TemplateDefinition[]
  marketingPresets: MarketingPreset[]
  activities: Activity[]
  createActivity: (values: CampaignFormValues, action: ActivityAction) => string
  createMarketingActivity: (values: MarketingFormValues, action: ActivityAction) => string
  updateActivityChannels: (draft: ChannelPlanDraft) => void
  placements: Record<PlacementKey, PlacementConfig>
  configurePlacement: (placementKey: PlacementKey, draft: PlacementDraft) => void
  performance: Record<string, PerformanceEntry>
  toasts: ToastMessage[]
}

export const DemoContext = createContext<DemoContextValue | null>(null)
