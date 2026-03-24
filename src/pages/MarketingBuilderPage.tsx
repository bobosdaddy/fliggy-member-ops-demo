import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import type {
  ActivityAction,
  ChannelKey,
  Goal,
  MarketingFormValues,
  MarketingPreset,
  ResourceSlotKey,
} from '../app/types'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle } from '../components/Primitives'
import {
  audienceMeta,
  audienceOrder,
  boostTypeMeta,
  channelMeta,
  channelOrder,
  goalMeta,
  marketingTypeMeta,
  resourceSlotMeta,
  resourceSlotOrder,
  roleMeta,
} from '../data/mockData'

const paidChannels: ChannelKey[] = ['sms', 'call', 'venue', 'search']

const formatCurrency = (value: number) =>
  `¥${new Intl.NumberFormat('zh-CN').format(Math.round(value))}`

const estimateMarketingPlan = (form: MarketingFormValues) => {
  const baseAudience = {
    guest: 26000,
    registered: 18000,
    newMember: 28000,
    silverPotential: 21400,
    goldRetention: 9200,
  }[form.audience]

  const paidChannelCount = form.channels.filter((channel) =>
    paidChannels.includes(channel),
  ).length
  const paidResourceCount = form.resourceSlots.filter(
    (slot) => resourceSlotMeta[slot].type === 'paid',
  ).length
  const freeChannelCount = form.channels.length - paidChannelCount
  const resourceCost = paidResourceCount * 6000

  const recommendedBudget =
    paidChannelCount * 8000 +
    paidResourceCount * 6000 +
    (form.goal === 'retention' ? 4000 : 0) +
    (form.goal === 'upgrade' ? 2000 : 0)

  const effectiveBudget =
    paidChannelCount === 0 && paidResourceCount === 0
      ? 0
      : Math.max(form.totalBudget, recommendedBudget)

  const estimatedReach =
    baseAudience +
    freeChannelCount * 2400 +
    paidChannelCount * 3600 +
    paidResourceCount * 2800

  const clickLift =
    8 +
    paidChannelCount * 4 +
    paidResourceCount * 3 +
    (form.boostType === 'discount' ? 3 : 0)

  const conversionLift =
    {
      acquisition: 6,
      activation: 12,
      repeat: 9,
      upgrade: 10,
      retention: 10,
    }[form.goal] +
    paidChannelCount * 2

  const gmvBase = {
    acquisition: 80000,
    activation: 220000,
    repeat: 260000,
    upgrade: 210000,
    retention: 240000,
  }[form.goal]

  const estimatedIncrementalGmv =
    gmvBase + effectiveBudget * 8 + paidChannelCount * 26000 + paidResourceCount * 20000

  return {
    recommendedBudget,
    resourceCost,
    estimatedReach,
    estimatedLift:
      form.goal === 'activation'
        ? `预计点击提升 +${clickLift}%，首单转化提升 +${conversionLift}%`
        : form.goal === 'repeat'
          ? `预计点击提升 +${clickLift}%，复购转化提升 +${conversionLift}%`
          : form.goal === 'upgrade'
            ? `预计点击提升 +${clickLift}%，升级达成提升 +${conversionLift}%`
            : form.goal === 'retention'
              ? `预计点击提升 +${clickLift}%，保级达成提升 +${conversionLift}%`
              : `预计点击提升 +${clickLift}%，入会转化提升 +${conversionLift}%`,
    estimatedIncrementalGmv,
    effectiveBudget,
  }
}

function MarketingBuilderForm({ preset }: { preset: MarketingPreset }) {
  const { role, createMarketingActivity } = useDemo()
  const navigate = useNavigate()
  const [form, setForm] = useState<MarketingFormValues>(preset.defaultForm)
  const estimate = estimateMarketingPlan(form)

  const toggleChannel = (channel: ChannelKey) => {
    setForm((current) => {
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
      }
    })
  }

  const toggleResourceSlot = (slot: ResourceSlotKey) => {
    setForm((current) => ({
      ...current,
      resourceSlots: current.resourceSlots.includes(slot)
        ? current.resourceSlots.filter((item) => item !== slot)
        : [...current.resourceSlots, slot],
    }))
  }

  const updateChannelBudget = (channel: ChannelKey, value: number) => {
    setForm((current) => ({
      ...current,
      channelBudget: {
        ...current.channelBudget,
        [channel]: value,
      },
    }))
  }

  const submit = (action: ActivityAction) => {
    createMarketingActivity(
      {
        ...form,
        totalBudget: estimate.effectiveBudget,
        recommendedBudget: estimate.recommendedBudget,
        estimatedReach: estimate.estimatedReach,
        estimatedLift: estimate.estimatedLift,
        estimatedIncrementalGmv: estimate.estimatedIncrementalGmv,
      },
      action,
    )
    navigate('/marketing')
  }

  const selectedPaidChannels = form.channels.filter((channel) => paidChannels.includes(channel))

  return (
    <section className="split-layout">
      <article className="card form-card">
        <PanelTitle title={`当前预设：${preset.name}`} helper={preset.description} />

        <div className="form-grid">
          <label className="field">
            <span>活动名称</span>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>

          <label className="field">
            <span>活动类型</span>
            <select
              value={form.marketingType}
              onChange={(event) =>
                setForm({
                  ...form,
                  marketingType: event.target.value as MarketingFormValues['marketingType'],
                })
              }
            >
              {Object.entries(marketingTypeMeta).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>经营目标</span>
            <select
              value={form.goal}
              onChange={(event) =>
                setForm({ ...form, goal: event.target.value as Goal })
              }
            >
              {Object.entries(goalMeta).map(([key, meta]) => (
                <option key={key} value={key}>
                  {meta.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>目标人群</span>
            <select
              value={form.audience}
              onChange={(event) =>
                setForm({
                  ...form,
                  audience: event.target.value as MarketingFormValues['audience'],
                })
              }
            >
              {audienceOrder.map((audience) => (
                <option key={audience} value={audience}>
                  {audienceMeta[audience].label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>权益加码方式</span>
            <select
              value={form.boostType}
              onChange={(event) =>
                setForm({
                  ...form,
                  boostType: event.target.value as MarketingFormValues['boostType'],
                })
              }
            >
              {Object.entries(boostTypeMeta).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label className="field">
              <span>生效时间</span>
              <input
                type="date"
                value={form.startDate}
                onChange={(event) => setForm({ ...form, startDate: event.target.value })}
              />
            </label>

            <label className="field">
              <span>失效时间</span>
              <input
                type="date"
                value={form.endDate}
                onChange={(event) => setForm({ ...form, endDate: event.target.value })}
              />
            </label>
          </div>

          <label className="field">
            <span>总预算</span>
            <input
              type="number"
              value={form.totalBudget}
              onChange={(event) =>
                setForm({ ...form, totalBudget: Number(event.target.value) || 0 })
              }
            />
          </label>

          <div className="field">
            <span>渠道预算分配</span>
            <div className="budget-grid">
              {selectedPaidChannels.length > 0 ? (
                selectedPaidChannels.map((channel) => (
                  <label className="field budget-field" key={channel}>
                    <span>{channelMeta[channel].label}</span>
                    <input
                      type="number"
                      value={form.channelBudget[channel] ?? 0}
                      onChange={(event) =>
                        updateChannelBudget(channel, Number(event.target.value) || 0)
                      }
                    />
                  </label>
                ))
              ) : (
                <div className="empty-state compact">
                  <strong>当前未选择付费渠道</strong>
                  <p>仅使用免费渠道时，预算默认为 0，适合基础运营承接。</p>
                </div>
              )}
            </div>
          </div>

          <div className="field">
            <span>资源位选择</span>
            <div className="multi-select-grid">
              {resourceSlotOrder.map((slot) => (
                <button
                  className={
                    form.resourceSlots.includes(slot)
                      ? 'multi-select-button active'
                      : 'multi-select-button'
                  }
                  key={slot}
                  onClick={() => toggleResourceSlot(slot)}
                  type="button"
                >
                  <span>{resourceSlotMeta[slot].label}</span>
                  <span className="select-helper">
                    {resourceSlotMeta[slot].type === 'paid' ? '付费' : '免费'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span>渠道选择</span>
            <div className="multi-select-grid">
              {channelOrder.map((channel) => (
                <button
                  className={
                    form.channels.includes(channel)
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
            <span>活动标题</span>
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
            />
          </label>

          <label className="field">
            <span>副标题</span>
            <textarea
              rows={3}
              value={form.subtitle}
              onChange={(event) => setForm({ ...form, subtitle: event.target.value })}
            />
          </label>

          <label className="field">
            <span>CTA 按钮文案</span>
            <input
              value={form.cta}
              onChange={(event) => setForm({ ...form, cta: event.target.value })}
            />
          </label>

          <label className="field">
            <span>备注说明</span>
            <textarea
              rows={3}
              value={form.note}
              onChange={(event) => setForm({ ...form, note: event.target.value })}
            />
          </label>
        </div>

        <div className="form-action-bar">
          {role === 'merchantOperator' ? (
            <button className="action-button primary" onClick={() => submit('draft')}>
              保存草稿
            </button>
          ) : null}

          {role === 'merchantAdmin' ? (
            <>
              <button className="action-button secondary" onClick={() => submit('submit')}>
                提交审核
              </button>
              <button className="action-button primary" onClick={() => submit('publish')}>
                发布
              </button>
            </>
          ) : null}

          {role === 'platformOps' ? (
            <button className="action-button primary" onClick={() => submit('publish')}>
              审核并发布
            </button>
          ) : null}
        </div>
      </article>

      <article className="card preview-card">
        <PanelTitle
          title="效果预估卡片"
          helper="根据当前渠道组合、资源位和预算结构，预估覆盖与经营提升空间。"
          action={<GoalBadge goal={form.goal} />}
        />

        <div className="forecast-card">
          <div className="forecast-metric">
            <span>预计覆盖会员数</span>
            <strong>{estimate.estimatedReach.toLocaleString()}</strong>
          </div>
          <div className="forecast-metric">
            <span>预计效果提升</span>
            <strong>{estimate.estimatedLift}</strong>
          </div>
          <div className="forecast-metric">
            <span>预计增量GMV</span>
            <strong>{formatCurrency(estimate.estimatedIncrementalGmv)}</strong>
          </div>
          <div className="forecast-metric">
            <span>建议预算</span>
            <strong>{formatCurrency(estimate.recommendedBudget)}</strong>
          </div>
          <div className="forecast-metric">
            <span>资源位成本估算</span>
            <strong>{formatCurrency(estimate.resourceCost)}</strong>
          </div>
        </div>

        <div className="campaign-preview-block">
          <div className="preview-banner compact boost">
            <div>
              <span className="meta-chip highlight">{marketingTypeMeta[form.marketingType]}</span>
              <h2>{form.title}</h2>
              <p>{form.subtitle}</p>
            </div>
            <span className="action-button primary">{form.cta}</span>
          </div>

          <div className="detail-list">
            <div>
              <span className="detail-label">目标人群</span>
              <p>{audienceMeta[form.audience].label}</p>
            </div>
            <div>
              <span className="detail-label">已选资源位</span>
              <div className="inline-token-row">
                {form.resourceSlots.map((slot) => (
                  <span className="subtle-badge" key={slot}>
                    {resourceSlotMeta[slot].label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="detail-label">已选渠道</span>
              <div className="inline-token-row">
                {form.channels.map((channel) => (
                  <span className="subtle-badge" key={channel}>
                    {channelMeta[channel].label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="detail-label">预算状态提示</span>
              <p>
                {estimate.effectiveBudget === 0
                  ? '预算为 0，适合基础运营承接。'
                  : '已使用付费渠道或资源位，适合冲刺阶段与高价值会员经营。'}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export function MarketingBuilderPage() {
  const { role, marketingPresets } = useDemo()
  const [searchParams] = useSearchParams()
  const presetId = searchParams.get('preset')
  const selectedPreset =
    marketingPresets.find((preset) => preset.id === presetId) ?? marketingPresets[0]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="创建营销活动"
        title="会员营销活动配置"
        description="配置预算、资源位和渠道组合，把基础会员运营升级为可加码的营销投放动作。"
        actions={
          <div className="header-actions-row">
            <Link className="action-button ghost" to="/marketing">
              返回营销活动
            </Link>
            <span className="meta-chip">{roleMeta[role].label}</span>
          </div>
        }
      />

      <MarketingBuilderForm key={selectedPreset.id} preset={selectedPreset} />
    </div>
  )
}
