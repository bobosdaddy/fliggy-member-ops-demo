import type { ReactNode } from 'react'
import { scenarioMeta, conditionMeta, channelMeta, benefitCategoryMeta, statusMeta } from '../data/mockData'
import type { AudienceCondition, BenefitCategory, ChannelKey, ScenarioKey } from '../app/types'

/* ───── Badges ───── */

export function ScenarioBadge({ scenario }: { scenario: ScenarioKey }) {
  const m = scenarioMeta[scenario]
  return <span className={`badge tone-${m.tone}`}>{m.label}</span>
}

export function ConditionBadge({ condition }: { condition: AudienceCondition }) {
  const m = conditionMeta[condition]
  return <span className="badge tone-muted">{m.label}</span>
}

export function ChannelBadge({ channel }: { channel: ChannelKey }) {
  const m = channelMeta[channel]
  return <span className="badge tone-blue">{m.label}</span>
}

export function BenefitCategoryBadge({ category }: { category: BenefitCategory }) {
  const m = benefitCategoryMeta[category]
  return <span className="badge tone-amber">{m.icon} {m.label}</span>
}

export function StatusPill({ status }: { status: string }) {
  const m = statusMeta[status] ?? { label: status, tone: 'muted' }
  return <span className={`status-pill tone-${m.tone}`}>{m.label}</span>
}

/* ───── Layout primitives ───── */

export function MetricCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-helper">{helper}</span>
    </div>
  )
}

export function PanelTitle({ children }: { children: ReactNode }) {
  return <h3 className="panel-title">{children}</h3>
}

export function EmptyState({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <p>{message}</p>
      {action}
    </div>
  )
}

export function ActionLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" className="link-button" onClick={onClick}>{label}</button>
  )
}

export function ComingSoonCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="coming-soon-card">
      <span className="coming-soon-icon">🚧</span>
      <h4>{title}</h4>
      <p>{description}</p>
      <span className="coming-soon-tag">敬请期待</span>
    </div>
  )
}
