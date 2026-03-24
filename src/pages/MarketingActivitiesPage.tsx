import { Link } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import { PageHeader } from '../components/PageHeader'
import {
  BudgetStatusPill,
  GoalBadge,
  MetricCard,
  PanelTitle,
  StatusPill,
} from '../components/Primitives'
import { channelMeta } from '../data/mockData'

const formatCurrency = (value: number) =>
  `¥${new Intl.NumberFormat('zh-CN').format(value)}`

export function MarketingActivitiesPage() {
  const { activities } = useDemo()
  const marketingActivities = activities.filter((activity) => activity.kind === 'marketing')

  const confirmedBudget = marketingActivities
    .filter((activity) => activity.budgetStatus === 'confirmed')
    .reduce((total, activity) => total + activity.budget, 0)

  const projectedGmv = marketingActivities.reduce(
    (total, activity) => total + activity.incrementalGmv,
    0,
  )

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="营销活动"
        title="会员营销加速器"
        description="围绕会员经营目标叠加预算、资源位和付费渠道，让商家在飞猪内完成加码投放与效果放大。"
        actions={
          <div className="header-actions-row">
            <Link className="action-button secondary" to="/channels">
              配置渠道组合
            </Link>
            <Link className="action-button primary" to="/marketing/new">
              新建营销活动
            </Link>
          </div>
        }
      />

      <section className="metric-grid compact">
        <MetricCard
          label="运行中营销活动"
          value={`${marketingActivities.filter((activity) => activity.status === 'running').length}`}
          helper="覆盖超级闪促、积分加赠和限时加码三类活动"
        />
        <MetricCard
          label="已确认预算"
          value={formatCurrency(confirmedBudget)}
          helper="用于放大高价值会员和冲刺阶段转化"
        />
        <MetricCard
          label="预计覆盖会员数"
          value={marketingActivities
            .reduce((total, activity) => total + activity.estimatedReach, 0)
            .toLocaleString()}
          helper="营销加速活动预计触达的会员规模"
        />
        <MetricCard
          label="预计增量GMV"
          value={formatCurrency(projectedGmv)}
          helper="加码活动带来的预估经营增量"
        />
      </section>

      <section className="two-column-grid">
        <article className="card narrative-card">
          <PanelTitle
            title="营销活动能力"
            helper="区别于基础模板运营，营销活动支持预算、资源位和渠道组合的加速投放。"
          />
          <div className="story-line">
            <span>支持超级闪促、积分加赠、限时加码和会员专享礼遇</span>
            <span>可选择免费资源位与付费资源位形成组合投放</span>
            <span>预算、覆盖、增量GMV 和 ROI 统一回收到分析看板</span>
          </div>
        </article>

        <article className="card narrative-card">
          <PanelTitle
            title="当前加码重点"
            helper="当前阶段建议优先加码首住激活和金卡保级两类高价值动作。"
          />
          <div className="detail-list">
            <div>
              <span className="detail-label">优先目标</span>
              <p>新会员首住激活、银卡升级冲刺、金卡保级冲刺</p>
            </div>
            <div>
              <span className="detail-label">推荐资源</span>
              <p>会员中心推荐位、短信、联合会场资源、搜索强化资源位</p>
            </div>
            <div>
              <span className="detail-label">预算建议</span>
              <p>基础免费承接 + 节点型付费加码，优先投向高价值会员人群。</p>
            </div>
          </div>
        </article>
      </section>

      <article className="card">
        <PanelTitle
          title="营销活动列表"
          helper="统一查看活动类型、预算状态、投放渠道、覆盖会员和预估效果提升。"
        />
        <table className="data-table">
          <thead>
            <tr>
              <th>活动名称</th>
              <th>活动类型</th>
              <th>经营目标</th>
              <th>投放渠道</th>
              <th>预算状态</th>
              <th>活动状态</th>
              <th>覆盖会员数</th>
              <th>预估效果提升</th>
              <th>更新时间</th>
            </tr>
          </thead>
          <tbody>
            {marketingActivities.map((activity) => (
              <tr key={activity.id}>
                <td>
                  <div className="table-title">
                    <strong>{activity.name}</strong>
                    <span>{activity.title}</span>
                  </div>
                </td>
                <td>{activity.activityTypeLabel}</td>
                <td>
                  <GoalBadge goal={activity.goal} />
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
                <td>
                  <BudgetStatusPill status={activity.budgetStatus} />
                </td>
                <td>
                  <StatusPill status={activity.status} />
                </td>
                <td>{activity.estimatedReach.toLocaleString()}</td>
                <td>{activity.estimatedLift}</td>
                <td>{activity.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </div>
  )
}
