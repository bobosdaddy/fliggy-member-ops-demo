import { Link } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import {
  audienceInsights,
  brandProfile,
  dashboardMetrics,
  dashboardTrend,
  placementMeta,
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
  const { activities, placements } = useDemo()

  const pendingActivities = activities.filter((activity) => activity.status !== 'running')
  const pendingPlacements = Object.values(placements).filter((placement) =>
    placement.mounts.some((mount) => !mount.enabled),
  )
  const todoItems = [
    pendingActivities.length > 0
      ? `${pendingActivities.length} 个活动待发布`
      : quickTodos[0],
    pendingPlacements.length > 0
      ? `${pendingPlacements.length} 个触点待配置`
      : quickTodos[1],
    quickTodos[2],
  ]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="工作台"
        title="品牌会员经营工作台"
        description="统一查看希尔顿在飞猪渠道内的会员拉新、激活、复购和升保级经营结果。"
        actions={
          <div className="header-actions-row">
            <span className="meta-chip">统计周期：本月</span>
            <Link className="action-button primary" to="/templates">
              新建活动
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
            飞猪作为品牌第二官网，正在承接品牌会员入会、绑定、首住激活和高等级保级经营。
          </p>
        </div>
        <div className="story-grid">
          <div className="story-item">
            <strong>128,600</strong>
            <span>飞猪内可识别品牌会员</span>
          </div>
          <div className="story-item">
            <strong>4 类</strong>
            <span>重点经营场景持续运营</span>
          </div>
          <div className="story-item">
            <strong>4 个</strong>
            <span>核心触点承接会员经营动作</span>
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
            helper="本周入会、绑定与激活表现持续上升，品牌会员经营效率稳步提升。"
          />
          <Sparkline data={dashboardTrend} tone="amber" />
          <div className="trend-footer">
            <span>03.10</span>
            <span>03.16</span>
          </div>
        </article>

        <article className="card">
          <PanelTitle
            title="待办事项"
            helper="聚焦近期待处理事项，保障活动发布、触点投放与保级节奏持续推进。"
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
            title="进行中活动"
            helper="统一查看当前活动的经营目标、运行状态、触点覆盖与更新时间。"
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>活动名称</th>
                <th>经营目标</th>
                <th>状态</th>
                <th>触点</th>
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
                      {activity.placements.map((placement) => (
                        <span className="subtle-badge" key={`${activity.id}-${placement}`}>
                          {placementMeta[placement].label}
                        </span>
                      ))}
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
            title="会员身份快照"
            helper="不同会员阶段对应不同经营目标、权益表达与触点承接方式。"
          />
          <div className="segment-stack">
            {audienceInsights.map((segment) => (
              <div className="segment-card-inline" key={segment.key}>
                <div>
                  <div className="segment-inline-head">
                    <SegmentBadge segment={segment.key} />
                    <GoalBadge
                      goal={
                        segment.key === 'guest' || segment.key === 'registered'
                          ? 'acquisition'
                          : segment.key === 'silver'
                            ? 'activation'
                            : 'retention'
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
