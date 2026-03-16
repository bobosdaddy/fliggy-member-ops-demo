import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { Goal } from '../app/types'
import { goalMeta, goalOrder } from '../data/mockData'
import { ContributionBars, FunnelChart, Sparkline } from '../components/Charts'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, MetricCard, PanelTitle, StatusPill } from '../components/Primitives'

const formatCurrency = (value: number) =>
  `¥${new Intl.NumberFormat('zh-CN', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)}`

export function AnalyticsPage() {
  const { analytics, activities, performance } = useDemo()
  const [activeGoal, setActiveGoal] = useState<Goal>('acquisition')
  const currentAnalytics = analytics[activeGoal]
  const rows = activities.filter((activity) => activity.goal === activeGoal)

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="数据分析"
        title="会员经营结果看板"
        description="不是只会配置的后台，而是一套能回到经营结果的品牌会员自运营平台。"
      />

      <section className="tab-row">
        {goalOrder.map((goal) => (
          <button
            className={goal === activeGoal ? 'tab-button active' : 'tab-button'}
            key={goal}
            onClick={() => setActiveGoal(goal)}
          >
            {goalMeta[goal].label}分析
          </button>
        ))}
      </section>

      <section className="metric-grid compact">
        {currentAnalytics.summary.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="three-column-grid">
        <article className="card chart-card">
          <PanelTitle title="趋势表现" helper="统一观察不同经营目标下的周期变化，判断增长节奏与资源投入效果。" />
          <Sparkline data={currentAnalytics.trend} tone={goalMeta[activeGoal].tone as never} />
        </article>

        <article className="card">
          <PanelTitle title="经营漏斗" helper="从曝光、点击到转化逐层查看链路表现，识别关键转化节点。" />
          <FunnelChart steps={currentAnalytics.funnel} />
        </article>

        <article className="card">
          <PanelTitle title="触点贡献" helper="体现飞猪阵地经营，而不是单点投放。" />
          <ContributionBars items={currentAnalytics.contributors} />
        </article>
      </section>

      <article className="card">
        <PanelTitle
          title="活动效果表"
          helper="统一查看各活动在曝光、点击、转化与 GMV 贡献上的经营表现。"
          action={<GoalBadge goal={activeGoal} />}
        />
        <table className="data-table">
          <thead>
            <tr>
              <th>活动名称</th>
              <th>经营目标</th>
              <th>状态</th>
              <th>曝光</th>
              <th>点击</th>
              <th>转化</th>
              <th>GMV 贡献</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((activity) => {
              const current = performance[activity.id]
              return (
                <tr key={activity.id}>
                  <td>
                    <div className="table-title">
                      <strong>{activity.name}</strong>
                      <span>{activity.title}</span>
                    </div>
                  </td>
                  <td>
                    <GoalBadge goal={activity.goal} />
                  </td>
                  <td>
                    <StatusPill status={activity.status} />
                  </td>
                  <td>{current?.exposure.toLocaleString() ?? '-'}</td>
                  <td>{current?.clicks.toLocaleString() ?? '-'}</td>
                  <td>{current?.conversions.toLocaleString() ?? '-'}</td>
                  <td>{current ? formatCurrency(current.gmv) : '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </article>
    </div>
  )
}
