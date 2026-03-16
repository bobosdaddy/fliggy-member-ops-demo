import type { ReactNode } from 'react'
import { goalMeta, segmentMeta, statusMeta } from '../data/mockData'
import type { Goal, Segment, ActivityStatus } from '../app/types'

export function MetricCard({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <article className="metric-card card">
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <p className="metric-helper">{helper}</p>
    </article>
  )
}

export function GoalBadge({ goal }: { goal: Goal }) {
  return <span className={`tone-badge ${goalMeta[goal].tone}`}>{goalMeta[goal].label}</span>
}

export function SegmentBadge({ segment }: { segment: Segment }) {
  return <span className="subtle-badge">{segmentMeta[segment].short}</span>
}

export function StatusPill({ status }: { status: ActivityStatus }) {
  return (
    <span className={`status-pill ${statusMeta[status].tone}`}>
      {statusMeta[status].label}
    </span>
  )
}

export function PanelTitle({
  title,
  helper,
  action,
}: {
  title: string
  helper?: string
  action?: ReactNode
}) {
  return (
    <div className="panel-title">
      <div>
        <h2>{title}</h2>
        {helper ? <p>{helper}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{detail}</p>
    </div>
  )
}

export function ActionLink({
  children,
  tone = 'primary',
  as = 'button',
}: {
  children: ReactNode
  tone?: 'primary' | 'secondary' | 'ghost'
  as?: 'button' | 'span'
}) {
  const className = tone === 'primary' ? 'action-button primary' : tone === 'secondary' ? 'action-button secondary' : 'action-button ghost'
  if (as === 'span') {
    return <span className={className}>{children}</span>
  }

  return <button className={className}>{children}</button>
}
