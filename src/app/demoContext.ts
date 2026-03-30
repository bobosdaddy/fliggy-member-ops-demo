import { createContext } from 'react'
import type {
  Activity,
  ActivityAction,
  BenefitConfig,
  Goal,
  GoalAnalytics,
  PerformanceEntry,
  Role,
  Segment,
  ScenarioDefinition,
  StrategyFormValues,
  ToastMessage,
} from './types'

export interface DemoContextValue {
  role: Role
  setRole: (role: Role) => void
  benefits: Record<Segment, BenefitConfig>
  saveBenefits: (segment: Segment, next: Omit<BenefitConfig, 'updatedAt'>) => void
  scenarios: ScenarioDefinition[]
  activities: Activity[]
  createStrategy: (values: StrategyFormValues, action: ActivityAction) => string
  analytics: Record<Goal, GoalAnalytics>
  performance: Record<string, PerformanceEntry>
  toasts: ToastMessage[]
}

export const DemoContext = createContext<DemoContextValue | null>(null)
