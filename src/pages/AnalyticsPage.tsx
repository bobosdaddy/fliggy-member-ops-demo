import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { AnalyticsTabKey, Goal } from '../app/types'
import { ContributionBars, FunnelChart, Sparkline } from '../components/Charts'
import { PageHeader } from '../components/PageHeader'
import {
  BudgetStatusPill,
  GoalBadge,
  MetricCard,
  PanelTitle,
  StatusPill,
} from '../components/Primitives'
import {
  analyticsSections,
  analyticsTabMeta,
  channelAnalytics,
  channelMeta,
} from '../data/mockData'

const formatCurrency = (value: number) =>
  `¥${new Intl.NumberFormat('zh-CN').format(Math.round(value))}`

const tabGoals: Record<Exclude<AnalyticsTabKey, 'channel'>, Goal[]> = {
  acquisition: ['acquisition'],
  activation: ['activation'],
  repeat: ['repeat'],
  loyalty: ['upgrade', 'retention'],
}

export function AnalyticsPage() {
  const { activities, performance } = useDemo()
  const [activeTab, setActiveTab] = useState<AnalyticsTabKey>('acquisition')

  const currentSection =
    activeTab === 'channel' ? null : analyticsSections[activeTab as keyof typeof analyticsSections]
  const activityRows =
    activeTab === 'channel'
      ? activities
      : activities.filter((activity) => tabGoals[activeTab as Exclude<AnalyticsTabKey, 'channel'>].includes(activity.goal))

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="数据分析"
        title="会员经营与投放分析"
        description="从会员经营结果、活动效果和渠道 ROI 三个维度统一观察飞猪品牌会员经营效率。"
      />

      <section className="tab-row">
        {(Object.keys(analyticsTabMeta) as AnalyticsTabKey[]).map((tab) => (
          <button
            className={tab === activeTab ? 'tab-button active' : 'tab-button'}
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {analyticsTabMeta[tab].label}
          </button>
        ))}
      </section>

      {activeTab !== 'channel' && currentSection ? (
        <>
          <section className="metric-grid compact">
            {currentSection.summary.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </section>

          <section className="three-column-grid">
            <article className="card chart-card">
              <PanelTitle
                title="趋势表现"
                helper="统一观察不同经营目标下的周期变化，判断增长节奏与资源投入效果。"
              />
              <Sparkline
                data={currentSection.trend}
                tone={analyticsTabMeta[activeTab].tone}
              />
            </article>

            <article className="card">
              <PanelTitle
                title="经营漏斗"
                helper="从触达、点击到转化逐层查看链路表现，识别关键转化节点。"
              />
              <FunnelChart steps={currentSection.funnel} />
            </article>

            <article className="card">
              <PanelTitle
                title="触点与渠道贡献"
                helper="体现飞猪阵地经营与加码投放的综合贡献结构。"
              />
              <ContributionBars items={currentSection.contributors} />
            </article>
          </section>
        </>
      ) : (
        <>
          <section className="metric-grid compact">
            {channelAnalytics.summary.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </section>

          <section className="two-column-grid">
            <article className="card">
              <PanelTitle
                title="渠道效率对比"
                helper="统一查看免费渠道与付费渠道在覆盖、成本和 GMV 贡献上的效率差异。"
              />
              <table className="data-table">
                <thead>
                  <tr>
                    <th>渠道名称</th>
                    <th>渠道类型</th>
                    <th>覆盖人数</th>
                    <th>触达成功率</th>
                    <th>转化率</th>
                    <th>成本</th>
                    <th>GMV贡献</th>
                    <th>ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {channelAnalytics.rows.map((row) => (
                    <tr key={row.channel}>
                      <td>{channelMeta[row.channel].label}</td>
                      <td>{row.channelType === 'paid' ? '付费渠道' : '免费渠道'}</td>
                      <td>{row.coverage.toLocaleString()}</td>
                      <td>{row.successRate}</td>
                      <td>{row.conversionRate}</td>
                      <td>{row.cost > 0 ? formatCurrency(row.cost) : '¥0'}</td>
                      <td>{formatCurrency(row.gmv)}</td>
                      <td>{row.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            <article className="card">
              <PanelTitle
                title="活动渠道组合"
                helper="查看当前活动所使用的渠道、预算与预计覆盖规模，验证加码动作是否有效。"
              />
              <table className="data-table">
                <thead>
                  <tr>
                    <th>活动名称</th>
                    <th>活动类型</th>
                    <th>渠道组合</th>
                    <th>预算</th>
                    <th>预计覆盖会员数</th>
                    <th>增量GMV</th>
                  </tr>
                </thead>
                <tbody>
                  {activityRows.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.name}</td>
                      <td>{activity.activityTypeLabel}</td>
                      <td>
                        <div className="inline-token-row">
                          {activity.channels.map((channel) => (
                            <span className="subtle-badge" key={`${activity.id}-${channel}`}>
                              {channelMeta[channel].label}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>{activity.budget > 0 ? formatCurrency(activity.budget) : '¥0'}</td>
                      <td>{activity.estimatedReach.toLocaleString()}</td>
                      <td>{formatCurrency(activity.incrementalGmv)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </section>
        </>
      )}

      <article className="card">
        <PanelTitle
          title="活动效果表"
          helper="统一查看活动类型、渠道组合、预算、增量GMV 和 ROI，识别最有效的经营动作。"
        />
        <table className="data-table">
          <thead>
            <tr>
              <th>活动名称</th>
              <th>活动类型</th>
              <th>经营目标</th>
              <th>状态</th>
              <th>渠道组合</th>
              <th>预算</th>
              <th>曝光</th>
              <th>点击</th>
              <th>转化</th>
              <th>增量GMV</th>
              <th>ROI</th>
            </tr>
          </thead>
          <tbody>
            {activityRows.map((activity) => {
              const current = performance[activity.id]
              return (
                <tr key={activity.id}>
                  <td>
                    <div className="table-title">
                      <strong>{activity.name}</strong>
                      <span>{activity.audienceLabel}</span>
                    </div>
                  </td>
                  <td>{activity.activityTypeLabel}</td>
                  <td>
                    <GoalBadge goal={activity.goal} />
                  </td>
                  <td>
                    <div className="inline-token-row">
                      <StatusPill status={activity.status} />
                      <BudgetStatusPill status={activity.budgetStatus} />
                    </div>
                  </td>
                  <td>
                    <div className="inline-token-row">
                      {activity.channels.map((channel) => (
                        <span className="subtle-badge" key={`${activity.id}-${channel}`}>
                          {channelMeta[channel].label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{activity.budget > 0 ? formatCurrency(activity.budget) : '¥0'}</td>
                  <td>{current?.exposure.toLocaleString() ?? '-'}</td>
                  <td>{current?.clicks.toLocaleString() ?? '-'}</td>
                  <td>{current?.conversions.toLocaleString() ?? '-'}</td>
                  <td>{formatCurrency(activity.incrementalGmv)}</td>
                  <td>{activity.roi ?? (activity.budget === 0 ? '基础运营承接' : '-')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </article>
    </div>
  )
}
