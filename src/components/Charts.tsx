import type { ChartDatum } from '../app/types'

export function Sparkline({
  data,
  tone = 'amber',
}: {
  data: number[]
  tone?: 'amber' | 'teal' | 'blue' | 'rose' | 'violet'
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 80 - 10
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className={`sparkline ${tone}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points={points} fill="none" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function FunnelChart({ steps }: { steps: ChartDatum[] }) {
  const max = Math.max(...steps.map((step) => step.value))

  return (
    <div className="funnel-chart">
      {steps.map((step) => (
        <div className="funnel-row" key={step.label}>
          <div className="funnel-label-row">
            <span>{step.label}</span>
            <strong>{step.value.toLocaleString()}</strong>
          </div>
          <div className="funnel-track">
            <div className="funnel-fill" style={{ width: `${(step.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ContributionBars({ items }: { items: ChartDatum[] }) {
  const max = Math.max(...items.map((item) => item.value))

  return (
    <div className="contribution-list">
      {items.map((item) => (
        <div className="contribution-row" key={item.label}>
          <span>{item.label}</span>
          <div className="contribution-bar">
            <div
              className="contribution-fill"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
          <strong>{item.value}%</strong>
        </div>
      ))}
    </div>
  )
}
