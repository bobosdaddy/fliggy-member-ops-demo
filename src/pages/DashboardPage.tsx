import { Link } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import { Sparkline } from '../components/Charts'
import { PageHeader } from '../components/PageHeader'
import {
  BudgetStatusPill,
  GoalBadge,
  PanelTitle,
  StatusPill,
} from '../components/Primitives'
import {
  aiDiagnoses,
  brandProfile,
  channelMeta,
  currentOperatingStage,
  opportunityPools,
  quickTodos,
  roleMeta,
  strategyRecommendations,
} from '../data/mockData'

type DiagnosticTone = 'opportunity' | 'risk' | 'suggestion'

const buildStrategyLink = (strategyId: string, target: 'template' | 'marketing', id?: string) =>
  target === 'template'
    ? `/campaigns/new?template=${id}&strategy=${strategyId}`
    : `/marketing/new?preset=${id}&strategy=${strategyId}`

const diagnosticSignals: Array<{ tone: DiagnosticTone; label: string }> = [
  { tone: 'risk', label: '风险' },
  { tone: 'opportunity', label: '机会' },
  { tone: 'suggestion', label: '建议' },
]

const kpiCards = [
  {
    key: 'join',
    label: '本周期新增入会',
    value: '8,420',
    delta: '+12.6%',
    trend: 'up',
    helper: '店铺首页与详情页双触点承接稳定，拉新效率持续提升。',
    icon: 'IN',
    series: [42, 46, 49, 54, 60, 68, 74],
  },
  {
    key: 'bind',
    label: '本周期新增绑定',
    value: '5,180',
    delta: '+8.9%',
    trend: 'up',
    helper: '高意向浏览用户的绑定转化继续上升，会员权益认知更完整。',
    icon: 'BD',
    series: [28, 31, 34, 38, 41, 43, 47],
  },
  {
    key: 'first',
    label: '新会员首单转化率',
    value: '18.7%',
    delta: '+4.2pct',
    trend: 'up',
    helper: '首住激活链路已经起效，仍有继续拉升空间。',
    icon: '1S',
    series: [10, 11, 13, 14, 16, 18, 19],
  },
  {
    key: 'repeat',
    label: '已绑定会员复购率',
    value: '24.3%',
    delta: '+2.1pct',
    trend: 'up',
    helper: '复购唤醒动作稳定承接，会员中心与 Push 贡献持续放大。',
    icon: 'RP',
    series: [14, 16, 17, 19, 21, 22, 24],
  },
  {
    key: 'tier',
    label: '升保级达成人数',
    value: '1,260',
    delta: '+11.4%',
    trend: 'up',
    helper: '升级与保级双链路同步放大，高价值会员经营进入冲刺阶段。',
    icon: 'LV',
    series: [5, 6, 7, 8, 9, 11, 13],
  },
  {
    key: 'member',
    label: '飞猪渠道已识别品牌会员数',
    value: '128,600',
    delta: '+6.8%',
    trend: 'up',
    helper: '品牌会员资产持续沉淀，第二官网价值正在增强。',
    icon: 'MM',
    series: [68, 72, 76, 81, 85, 90, 96],
  },
]

const trendFocus = [
  { label: '入会承接', value: '持续升温' },
  { label: '首单激活', value: '进入拉升段' },
  { label: '复购回流', value: '保持稳态' },
]

export function DashboardPage() {
  const { role, activities } = useDemo()

  const pendingActivities = activities.filter((activity) => activity.status !== 'running')
  const pendingBudgetActivities = activities.filter(
    (activity) => activity.kind === 'marketing' && activity.budgetStatus === 'pending',
  )

  const todoItems = [
    {
      priority: '高优',
      detail:
        pendingActivities.length > 0
          ? `${pendingActivities.length}个激活或保级活动待审核，建议优先处理影响本周期转化的动作。`
          : quickTodos[0],
    },
    {
      priority: '中优',
      detail:
        pendingBudgetActivities.length > 0
          ? `${pendingBudgetActivities.length}个付费渠道未完成预算确认，可能影响活动加码节奏。`
          : quickTodos[1],
    },
    {
      priority: '高优',
      detail: quickTodos[2],
    },
  ]

  const heroSideCards = [
    {
      title: '品牌会员概览',
      value: '128,600',
      helper: '飞猪渠道已识别品牌会员数，会员资产持续沉淀。',
      tone: 'neutral',
    },
    {
      title: '高潜机会提醒',
      value: '8,760',
      helper: '银卡高潜升级会员规模明显，适合优先叠加升级冲刺动作。',
      tone: 'accent',
    },
    {
      title: '预算与渠道建议',
      value: `${Math.max(2, pendingBudgetActivities.length)}个`,
      helper: '建议优先为短信或联合会场资源补足预算，放大冲刺活动效果。',
      tone: 'warning',
    },
  ]

  const opportunitySummary = [
    { label: '新入会未首单会员', value: '18,240', helper: '首住激活的核心经营池' },
    ...opportunityPools.slice(1),
  ]

  const focusedActivities = activities.slice(0, 4)
  const recentEdits = activities.slice(0, 3)

  return (
    <div className="page-stack dashboard-page">
      <PageHeader
        eyebrow="工作台"
        title="AI 智能经营驾驶舱"
        description="围绕当前经营阶段、AI 诊断、策略建议和重点活动，快速完成会员经营判断与决策。"
        actions={
          <div className="header-actions-row">
            <span className="meta-chip">统计周期：{brandProfile.period}</span>
            <span className="meta-chip">{roleMeta[role].label}</span>
          </div>
        }
      />

      <section className="dashboard-hero-grid">
        <article className="card dashboard-hero-primary">
          <div className="hero-topline">
            <span className="hero-status-badge">AI经营状态</span>
            <span className="hero-brand-chip">
              {brandProfile.platformName} · {brandProfile.proposition}
            </span>
          </div>

          <div className="hero-heading-block">
            <h2>当前处于「{currentOperatingStage.label}」</h2>
            <p>
              新入会会员首单转化承接不足，银卡高潜人群升级机会显著，适合优先放大激活与等级跃迁链路。
            </p>
          </div>

          <div className="hero-diagnostics-grid">
            {aiDiagnoses.map((item, index) => (
              <div className="hero-diagnostic-row" key={item.id}>
                <span className={`signal-pill ${diagnosticSignals[index].tone}`}>
                  {diagnosticSignals[index].label}
                </span>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="hero-action-row">
            <Link
              className="action-button primary"
              to="/campaigns/new?template=tpl-first-stay&strategy=strategy-first-stay"
            >
              启用首住激活策略
            </Link>
            <Link className="action-button secondary" to="/segments">
              查看高潜升级人群
            </Link>
            <Link
              className="action-button ghost"
              to="/marketing/new?preset=preset-gold-retention&strategy=strategy-gold-retention"
            >
              创建保级冲刺活动
            </Link>
          </div>

          <div className="hero-meta-strip">
            <div className="hero-meta-item">
              <span>重点问题</span>
              <strong>{currentOperatingStage.issue}</strong>
            </div>
            <div className="hero-meta-item">
              <span>当前机会</span>
              <strong>{currentOperatingStage.opportunity}</strong>
            </div>
          </div>
        </article>

        <div className="dashboard-hero-side">
          {heroSideCards.map((card) => (
            <article className={`card hero-side-card ${card.tone}`} key={card.title}>
              <span className="hero-side-label">{card.title}</span>
              <strong>{card.value}</strong>
              <p>{card.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-kpi-grid">
        {kpiCards.map((card) => (
          <article className="card dashboard-kpi-card" key={card.key}>
            <div className="dashboard-kpi-head">
              <div>
                <span className="dashboard-kpi-label">{card.label}</span>
                <strong className="dashboard-kpi-value">{card.value}</strong>
              </div>
              <span className="dashboard-kpi-icon">{card.icon}</span>
            </div>

            <div className="dashboard-kpi-meta">
              <span className={`dashboard-kpi-delta ${card.trend}`}>{card.delta}</span>
              <span className="dashboard-kpi-note">{card.helper}</span>
            </div>

            <div className="dashboard-kpi-sparkline">
              <Sparkline data={card.series} tone="amber" />
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-main-grid">
        <div className="dashboard-main-left">
          <article className="card dashboard-section-card">
            <PanelTitle
              title="AI推荐策略"
              helper="结合当前阶段、会员结构与渠道机会，给出优先执行的经营动作。"
            />
            <div className="strategy-action-list">
              {strategyRecommendations.map((strategy) => (
                <div className="strategy-action-card" key={strategy.id}>
                  <div className="strategy-action-icon">{strategy.name.slice(0, 2)}</div>
                  <div className="strategy-action-body">
                    <div className="strategy-action-title-row">
                      <strong>{strategy.name}</strong>
                      <span className="strategy-lift-pill">{strategy.estimatedLift}</span>
                    </div>
                    <p>{strategy.description}</p>
                    <div className="strategy-action-meta">
                      <span>适用人群：{strategy.audienceLabel}</span>
                      <span>
                        推荐渠道：
                        {strategy.recommendedChannels
                          .map((channel) => channelMeta[channel].label)
                          .join(' / ')}
                      </span>
                    </div>
                  </div>
                  <Link
                    className="action-button secondary"
                    to={buildStrategyLink(
                      strategy.id,
                      strategy.target,
                      strategy.target === 'template'
                        ? strategy.templateId
                        : strategy.marketingPresetId,
                    )}
                  >
                    一键采用
                  </Link>
                </div>
              ))}
            </div>
          </article>

          <div className="dashboard-left-secondary">
            <article className="card dashboard-section-card">
              <PanelTitle
                title="经营待办"
                helper="按优先级处理关键活动、预算确认和冲刺节点。"
              />
              <div className="dashboard-todo-list">
                {todoItems.map((item) => (
                  <div className="dashboard-todo-item" key={item.detail}>
                    <span
                      className={`todo-priority-pill ${item.priority === '高优' ? 'high' : 'medium'}`}
                    >
                      {item.priority}
                    </span>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card dashboard-section-card">
              <PanelTitle
                title="高潜会员机会"
                helper="快速识别本周期最值得优先经营的人群池。"
              />
              <div className="opportunity-list">
                {opportunitySummary.map((pool) => (
                  <div className="opportunity-row" key={pool.label}>
                    <div>
                      <span className="opportunity-label">{pool.label}</span>
                      <p>{pool.helper}</p>
                    </div>
                    <strong>{pool.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <article className="card dashboard-section-card dashboard-activity-panel">
          <PanelTitle
            title="进行中经营动作"
            helper="把模板活动和营销活动作为业务对象展示，方便快速判断当前进度与资源配置。"
          />
          <div className="activity-object-list">
            {focusedActivities.map((activity) => (
              <div className="activity-object-card" key={activity.id}>
                <div className="activity-object-head">
                  <div className="activity-object-title">
                    <strong>{activity.name}</strong>
                    <p>{activity.audienceLabel}</p>
                  </div>
                  <div className="activity-object-status">
                    <StatusPill status={activity.status} />
                    <BudgetStatusPill status={activity.budgetStatus} />
                  </div>
                </div>

                <div className="activity-object-tags">
                  <span className="meta-chip">{activity.activityTypeLabel}</span>
                  <GoalBadge goal={activity.goal} />
                </div>

                <div className="activity-object-grid">
                  <div>
                    <span className="detail-label">渠道组合</span>
                    <p>
                      {activity.channels
                        .slice(0, 4)
                        .map((channel) => channelMeta[channel].label)
                        .join(' / ')}
                    </p>
                  </div>
                  <div>
                    <span className="detail-label">预计覆盖</span>
                    <p>{activity.estimatedReach.toLocaleString()} 名会员</p>
                  </div>
                  <div>
                    <span className="detail-label">效果提升</span>
                    <p>{activity.estimatedLift}</p>
                  </div>
                  <div>
                    <span className="detail-label">活动加码预算</span>
                    <p>{activity.budget > 0 ? `¥${activity.budget.toLocaleString()}` : '¥0'}</p>
                  </div>
                </div>

                <div className="activity-object-footer">
                  <span className="activity-roi-chip">
                    {activity.roi ?? (activity.budget === 0 ? '基础运营承接' : '预算待确认')}
                  </span>
                  <Link className="action-button ghost" to="/analytics">
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-footer-grid">
        <article className="card dashboard-trend-card">
          <PanelTitle
            title="近30天会员经营趋势"
            helper="入会、首单与复购转化走势持续改善，当前策略更适合放大激活和保级冲刺。"
          />

          <div className="trend-focus-row">
            {trendFocus.map((item) => (
              <div className="trend-focus-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="dashboard-trend-visual">
            <Sparkline data={[48, 52, 58, 63, 71, 79, 88]} tone="amber" />
          </div>

          <div className="trend-footer">
            <span>02.16</span>
            <span>03.17</span>
          </div>
        </article>

        <div className="dashboard-footer-side">
          <article className="card dashboard-section-card">
            <PanelTitle
              title="快捷操作"
              helper="高频动作集中入口，便于从驾驶舱直接发起运营。"
            />
            <div className="quick-action-grid">
              <Link className="quick-action-card" to="/templates">
                <strong>创建模板活动</strong>
                <p>基于标准场景快速搭建拉新、激活或复购活动。</p>
              </Link>
              <Link className="quick-action-card" to="/marketing">
                <strong>查看营销活动</strong>
                <p>统一管理预算、资源位、付费渠道和加码动作。</p>
              </Link>
              <Link className="quick-action-card" to="/preview">
                <strong>查看前台预览</strong>
                <p>验证权益表达、活动挂载和加码模式的前台呈现。</p>
              </Link>
            </div>
          </article>

          <article className="card dashboard-section-card">
            <PanelTitle
              title="最近编辑记录"
              helper="保留近期关键动作，方便快速回看最新配置变更。"
            />
            <div className="recent-edit-list">
              {recentEdits.map((activity) => (
                <div className="recent-edit-row" key={activity.id}>
                  <div>
                    <strong>{activity.name}</strong>
                    <p>{activity.activityTypeLabel} · {activity.updatedAt}</p>
                  </div>
                  <GoalBadge goal={activity.goal} />
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
