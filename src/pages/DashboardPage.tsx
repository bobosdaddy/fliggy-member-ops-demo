import { Link } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import {
  audienceInsights,
  brandProfile,
  channelMeta,
  dashboardMetrics,
  dashboardTrend,
  quickTodos,
} from '../data/mockData'
import { Sparkline } from '../components/Charts'
import { PageHeader } from '../components/PageHeader'
import {
  GoalBadge,
  MetricCard,
  PanelTitle,
  SegmentBadge,
  StatusPill,
} from '../components/Primitives'

export function DashboardPage() {
  const { activities } = useDemo()

  const pendingActivities = activities.filter((a) => a.status !== 'running')
  const todoItems = [
    pendingActivities.length > 0
      ? `${pendingActivities.length} 个策略待发布`
      : quickTodos[0],
    quickTodos[1],
    quickTodos[2],
  ]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="工作台"
        title="品牌会员智能运营工作台"
        description="统一查看会员拉新、召回、升保级、浏览未购与营销活动的经营结果与进行中策略。"
        actions={
          <div className="header-actions-row">
            <span className="meta-chip">统计周期：本月</span>
            <Link className="action-button primary" to="/scenarios">
              新建策略
            </Link>
            <Link className="action-button secondary" to="/benefits">
              配置权益
            </Link>
            <Link className="action-button ghost" to="/analytics">
              查看数据
            </Link>
          </div>
        }
      />

      <section className="hero-strip card">
        <div>
          <span className="eyebrow">品牌概览</span>
          <h2>{brandProfile.brandName}</h2>
          <p>
            飞猪作为品牌第二官网，通过 AI 智能策略驱动会员拉新、召回、升保级、浏览未购转化与营销活动。
          </p>
        </div>
        <div className="story-grid">
          <div className="story-item">
            <strong>128,600</strong>
            <span>飞猪内可识别品牌会员</span>
          </div>
          <div className="story-item">
            <strong>5 大</strong>
            <span>智能运营场景持续运营</span>
          </div>
          <div className="story-item">
            <strong>6 个</strong>
            <span>触达渠道全面覆盖</span>
          </div>
        </div>
      </section>

      <section className="metric-grid">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="two-column-grid">
        <article className="card chart-card">
          <PanelTitle
            title="经营趋势概览"
            helper="本周召回、转化与营销活动效果持续上升，AI 策略驱动效率提升。"
          />
          <Sparkline data={dashboardTrend} tone="amber" />
          <div className="trend-footer">
            <span>03.22</span>
            <span>03.28</span>
          </div>
        </article>

        <article className="card">
          <PanelTitle
            title="待办事项"
            helper="聚焦近期待处理事项，保障策略发布与渠道投放持续推进。"
          />
          <div className="todo-list">
            {todoItems.map((item) => (
              <div className="todo-row" key={item}>
                <span className="todo-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="two-column-grid">
        <article className="card">
          <PanelTitle
            title="进行中策略"
            helper="统一查看当前策略的运营场景、运行状态、触达渠道与更新时间。"
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>策略名称</th>
                <th>运营场景</th>
                <th>状态</th>
                <th>触达渠道</th>
                <th>更新时间</th>
              </tr>
            </thead>
            <tbody>
              {activities.slice(0, 6).map((activity) => (
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
                  <td>
                    <div className="inline-token-row">
                      {activity.channels.slice(0, 3).map((ch) => (
                        <span className="subtle-badge" key={`${activity.id}-${ch}`}>
                          {channelMeta[ch].label}
                        </span>
                      ))}
                      {activity.channels.length > 3 && (
                        <span className="meta-chip">+{activity.channels.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td>{activity.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="card">
          <PanelTitle
            title="会员人群快照"
            helper="不同会员人群对应不同运营场景与触达策略。"
          />
          <div className="segment-stack">
            {audienceInsights.map((segment) => (
              <div className="segment-card-inline" key={segment.key}>
                <div>
                  <div className="segment-inline-head">
                    <SegmentBadge segment={segment.key} />
                    <GoalBadge
                      goal={
                        segment.key === 'guest'
                          ? 'acquisition'
                          : segment.key === 'lapsed'
                            ? 'recall'
                            : segment.key === 'potential'
                              ? 'browseNoBuy'
                              : segment.key === 'silver'
                                ? 'upgrade'
                                : 'campaign'
                      }
                    />
                  </div>
                  <strong>{segment.scale.toLocaleString()}</strong>
                  <p>{segment.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
