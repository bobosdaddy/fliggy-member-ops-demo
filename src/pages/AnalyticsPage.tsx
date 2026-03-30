import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { Goal } from '../app/types'
import { goalMeta, goalOrder } from '../data/mockData'
import { ContributionBars, FunnelChart, Sparkline } from '../components/Charts'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, MetricCard, PanelTitle, StatusPill } from '../components/Primitives'

const formatCurrency = (value: number) => {
  if (value >= 10000) {
    return `¥${(value / 10000).toFixed(value % 10000 === 0 ? 0 : 1)}万`
  }
  return `¥${value.toLocaleString('zh-CN')}`
}

export function AnalyticsPage() {
  const { analytics, activities, performance } = useDemo()
  const [activeGoal, setActiveGoal] = useState<Goal>('recall')
  const currentAnalytics = analytics[activeGoal]
  const rows = activities.filter((activity) => activity.goal === activeGoal)

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="数据分析"
        title="会员经营结果看板"
        description="围绕会员拉新、召回、升保级、浏览未购与营销活动，统一回收经营结果。"
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
          <PanelTitle title="趋势表现" helper="观察不同场景下的周期变化，判断策略效果与资源投入。" />
          <Sparkline data={currentAnalytics.trend} tone={goalMeta[activeGoal].tone as never} />
        </article>

        <article className="card">
          <PanelTitle title="经营漏斗" helper="从触达、点击到转化逐层查看链路表现。" />
          <FunnelChart steps={currentAnalytics.funnel} />
        </article>

        <article className="card">
          <PanelTitle title="渠道贡献" helper="查看各触达渠道对转化的贡献占比。" />
          <ContributionBars items={currentAnalytics.contributors} />
        </article>
      </section>

      <article className="card">
        <PanelTitle
          title="策略效果表"
          helper="统一查看各策略在触达、点击、转化与 GMV 贡献上的经营表现。"
          action={<GoalBadge goal={activeGoal} />}
        />
        <table className="data-table">
          <thead>
            <tr>
              <th>策略名称</th>
              <th>运营场景</th>
              <th>状态</th>
              <th>触达</th>
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
