import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { Activity, ChannelKey } from '../app/types'
import { PageHeader } from '../components/PageHeader'
import {
  BudgetStatusPill,
  GoalBadge,
  MetricCard,
  PanelTitle,
  StatusPill,
} from '../components/Primitives'
import {
  channelDefinitions,
  channelMeta,
  channelOrder,
  roleMeta,
} from '../data/mockData'

const paidChannels: ChannelKey[] = ['sms', 'call', 'venue', 'search']

const formatCurrency = (value: number) =>
  `¥${new Intl.NumberFormat('zh-CN').format(Math.round(value))}`

const buildChannelDraft = (activity: Activity) => ({
  activityId: activity.id,
  channels: activity.channels,
  totalBudget: activity.channels.some((channel) => paidChannels.includes(channel))
    ? activity.budget
    : 0,
  channelBudget: Object.fromEntries(
    activity.channels
      .filter((channel) => paidChannels.includes(channel))
      .map((channel) => [channel, activity.budget > 0 ? Math.round(activity.budget / Math.max(1, activity.channels.filter((item) => paidChannels.includes(item)).length)) : 8000]),
  ) as Partial<Record<ChannelKey, number>>,
})

const estimateChannelPlan = (activity: Activity, channels: ChannelKey[], totalBudget: number) => {
  const paidCount = channels.filter((channel) => paidChannels.includes(channel)).length
  const freeCount = channels.length - paidCount
  const adjustedBudget = paidCount === 0 ? 0 : Math.max(totalBudget, paidCount * 8000)
  const estimatedReach = activity.estimatedReach + freeCount * 1200 + paidCount * 2800
  const successRate = `${Math.min(98, 68 + freeCount * 2 + paidCount * 5)}%`

  return {
    adjustedBudget,
    estimatedReach,
    successRate,
    paidCount,
    freeCount,
  }
}

export function ChannelsPage() {
  const { role, activities, updateActivityChannels } = useDemo()
  const [activeActivityId, setActiveActivityId] = useState(activities[0]?.id ?? '')
  const activeActivity = activities.find((activity) => activity.id === activeActivityId) ?? activities[0]
  const [draft, setDraft] = useState(() =>
    activeActivity ? buildChannelDraft(activeActivity) : buildChannelDraft(activities[0]),
  )

  const estimate = activeActivity
    ? estimateChannelPlan(activeActivity, draft.channels, draft.totalBudget)
    : { adjustedBudget: 0, estimatedReach: 0, successRate: '0%', paidCount: 0, freeCount: 0 }

  const toggleChannel = (channel: ChannelKey) => {
    setDraft((current) => {
      const exists = current.channels.includes(channel)
      const nextChannels = exists
        ? current.channels.filter((item) => item !== channel)
        : [...current.channels, channel]
      const nextBudget = { ...current.channelBudget }

      if (exists) {
        delete nextBudget[channel]
      } else if (paidChannels.includes(channel) && nextBudget[channel] == null) {
        nextBudget[channel] = 8000
      }

      return {
        ...current,
        channels: nextChannels,
        channelBudget: nextBudget,
        totalBudget:
          nextChannels.some((item) => paidChannels.includes(item)) && current.totalBudget === 0
            ? 8000
            : current.totalBudget,
      }
    })
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="渠道管理"
        title="渠道与投放管理"
        description="区分免费渠道与付费渠道，统一管理活动可用的触达能力、成本结构与预算投放节奏。"
      />

      <section className="metric-grid compact">
        <MetricCard
          label="免费渠道数"
          value={`${channelDefinitions.filter((channel) => channel.category === 'free').length}`}
          helper="平台基础经营能力，可作为常态化承接主盘"
        />
        <MetricCard
          label="付费渠道数"
          value={`${channelDefinitions.filter((channel) => channel.category === 'paid').length}`}
          helper="适合冲刺阶段与高价值会员经营"
        />
        <MetricCard
          label="当前活动预算预估"
          value={formatCurrency(estimate.adjustedBudget)}
          helper={
            estimate.adjustedBudget === 0
              ? '仅使用免费渠道，预算为 0'
              : '已叠加付费渠道，预算将随渠道组合上升'
          }
        />
        <MetricCard
          label="预估触达成功率"
          value={estimate.successRate}
          helper="综合当前渠道组合后的预计触达效率"
        />
      </section>

      <article className="card">
        <PanelTitle
          title="渠道总览"
          helper="展示飞猪会员经营可用的免费渠道和付费渠道，帮助商家理解不同渠道的使用边界。"
        />
        <div className="channel-card-grid">
          {channelDefinitions.map((channel) => (
            <div className="channel-card" key={channel.key}>
              <div className="channel-card-head">
                <strong>{channel.label}</strong>
                <span className={`meta-chip ${channel.category === 'paid' ? 'warn' : ''}`}>
                  {channel.category === 'paid' ? '付费' : '免费'}
                </span>
              </div>
              <p>{channel.reach}</p>
              <div className="detail-list compact-list">
                <div>
                  <span className="detail-label">推荐场景</span>
                  <p>{channel.scenario}</p>
                </div>
                <div>
                  <span className="detail-label">近30天使用</span>
                  <p>{channel.usage}</p>
                </div>
                <div>
                  <span className="detail-label">单次成本</span>
                  <p>{channel.unitCost}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <section className="two-column-grid">
        <article className="card">
          <PanelTitle
            title="渠道成本说明"
            helper="免费渠道属于平台基础能力，付费渠道适合在关键阶段放大活动效果。"
          />
          <table className="data-table">
            <thead>
              <tr>
                <th>渠道名称</th>
                <th>渠道类型</th>
                <th>计费方式</th>
                <th>推荐使用场景</th>
              </tr>
            </thead>
            <tbody>
              {channelDefinitions.map((channel) => (
                <tr key={channel.key}>
                  <td>{channel.label}</td>
                  <td>{channel.category === 'paid' ? '付费渠道' : '免费渠道'}</td>
                  <td>{channel.unitCost}</td>
                  <td>{channel.scenario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="card form-card">
          <PanelTitle
            title="渠道配置区"
            helper="为当前活动组合免费渠道和付费渠道，并同步预算预估与触达效率。"
          />

          {activeActivity ? (
            <div className="form-grid">
              <label className="field">
                <span>选择活动</span>
                <select
                  value={activeActivityId}
                  onChange={(event) => {
                    const nextActivity =
                      activities.find((activity) => activity.id === event.target.value) ??
                      activities[0]
                    setActiveActivityId(event.target.value)
                    setDraft(buildChannelDraft(nextActivity))
                  }}
                >
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="field">
                <span>渠道组合</span>
                <div className="multi-select-grid">
                  {channelOrder.map((channel) => (
                    <button
                      className={
                        draft.channels.includes(channel)
                          ? 'multi-select-button active'
                          : 'multi-select-button'
                      }
                      key={channel}
                      onClick={() => toggleChannel(channel)}
                      type="button"
                    >
                      <span>{channelMeta[channel].label}</span>
                      <span className="select-helper">
                        {channelMeta[channel].category === 'paid' ? '付费' : '免费'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <label className="field">
                <span>预算预估</span>
                <input
                  type="number"
                  value={estimate.adjustedBudget}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      totalBudget: Number(event.target.value) || 0,
                    })
                  }
                />
              </label>

              <div className="channel-summary-strip">
                <div className="summary-item">
                  <span>免费渠道已选数</span>
                  <strong>{estimate.freeCount}</strong>
                </div>
                <div className="summary-item">
                  <span>付费渠道已选数</span>
                  <strong>{estimate.paidCount}</strong>
                </div>
                <div className="summary-item">
                  <span>预估覆盖会员数</span>
                  <strong>{estimate.estimatedReach.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>预估触达成功率</span>
                  <strong>{estimate.successRate}</strong>
                </div>
              </div>

              <div className="detail-list">
                <div>
                  <span className="detail-label">活动目标</span>
                  <p>{activeActivity.audienceLabel}</p>
                </div>
                <div>
                  <span className="detail-label">当前状态</span>
                  <div className="inline-token-row">
                    <GoalBadge goal={activeActivity.goal} />
                    <StatusPill status={activeActivity.status} />
                    <BudgetStatusPill status={activeActivity.budgetStatus} />
                  </div>
                </div>
                <div>
                  <span className="detail-label">预算提示</span>
                  <p>
                    {estimate.adjustedBudget === 0
                      ? '预算为0，适合基础运营承接。'
                      : '已包含付费渠道预算，适合冲刺阶段或高价值会员运营。'}
                  </p>
                </div>
              </div>

              <div className="form-action-bar">
                <button
                  className="action-button primary"
                  onClick={() =>
                    updateActivityChannels({
                      activityId: activeActivity.id,
                      channels: draft.channels,
                      totalBudget: estimate.adjustedBudget,
                      channelBudget: draft.channelBudget,
                      estimatedReach: estimate.estimatedReach,
                      estimatedSuccessRate: estimate.successRate,
                    })
                  }
                >
                  保存渠道组合
                </button>
                <span className="meta-chip">{roleMeta[role].label}</span>
              </div>
            </div>
          ) : null}
        </article>
      </section>
    </div>
  )
}
