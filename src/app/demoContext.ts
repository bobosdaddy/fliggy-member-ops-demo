import { createContext } from 'react'
import type {
  ActivityAction,
  BenefitItem,
  PerformanceEntry,
  Role,
  ScenarioAnalytics,
  ScenarioDefinition,
  ScenarioKey,
  Strategy,
  StrategyFormValues,
  ToastMessage,
} from './types'

export interface DemoContextValue {
  role: Role
  setRole: (role: Role) => void
  benefits: BenefitItem[]
  toggleBenefit: (id: string) => void
  updateBenefit: (id: string, patch: Partial<BenefitItem>) => void
  addBenefit: (item: BenefitItem) => void
  scenarios: ScenarioDefinition[]
  strategies: Strategy[]
  createStrategy: (values: StrategyFormValues, action: ActivityAction) => string
  analytics: Record<ScenarioKey, ScenarioAnalytics>
  performance: Record<string, PerformanceEntry>
  toasts: ToastMessage[]
}

export const DemoContext = createContext<DemoContextValue | null>(null)
