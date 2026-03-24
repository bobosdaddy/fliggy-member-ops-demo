import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import type { ActivityAction, CampaignFormValues, PlacementKey, TemplateDefinition } from '../app/types'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle, SegmentBadge } from '../components/Primitives'
import {
  channelMeta,
  placementMeta,
  placementOrder,
  roleMeta,
  segmentMeta,
  segmentOrder,
  strategyRecommendations,
} from '../data/mockData'

function CampaignBuilderForm({
  selectedTemplate,
  strategyId,
}: {
  selectedTemplate: TemplateDefinition
  strategyId?: string
}) {
  const { role, createActivity } = useDemo()
  const navigate = useNavigate()
  const linkedStrategy = strategyRecommendations.find((strategy) => strategy.id === strategyId)
  const [form, setForm] = useState<CampaignFormValues>({
    ...selectedTemplate.defaultCampaign,
    aiStrategyId: linkedStrategy?.id,
  })

  const togglePlacement = (placement: PlacementKey) => {
    setForm((current) => ({
      ...current,
      placements: current.placements.includes(placement)
        ? current.placements.filter((item) => item !== placement)
        : [...current.placements, placement],
    }))
  }

  const submit = (action: ActivityAction) => {
    createActivity(form, action)
    navigate('/dashboard')
  }

  return (
    <section className="split-layout">
      <article className="card form-card">
        <PanelTitle
          title={`当前模板：${selectedTemplate.name}`}
          helper={selectedTemplate.description}
          action={
            linkedStrategy ? (
              <span className="meta-chip highlight">AI策略：{linkedStrategy.name}</span>
            ) : null
          }
        />

        <div className="form-grid">
          <label className="field">
            <span>活动名称</span>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>

          <label className="field">
            <span>经营目标</span>
            <div className="read-only-chip">
              <GoalBadge goal={form.goal} />
            </div>
          </label>

          <label className="field">
            <span>目标人群</span>
            <select
              value={form.segment}
              onChange={(event) =>
                setForm({ ...form, segment: event.target.value as CampaignFormValues['segment'] })
              }
            >
              {segmentOrder.map((segment) => (
                <option key={segment} value={segment}>
                  {segmentMeta[segment].label}
                </option>
              ))}
            </select>
          </label>

          <div className="field">
            <span>投放触点</span>
            <div className="multi-select-grid">
              {placementOrder.map((placement) => (
                <button
                  className={
                    form.placements.includes(placement)
                      ? 'multi-select-button active'
                      : 'multi-select-button'
                  }
                  key={placement}
                  onClick={() => togglePlacement(placement)}
                  type="button"
                >
                  {placementMeta[placement].label}
                </button>
              ))}
            </div>
          </div>

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
            <span>标题</span>
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
          title="活动配置预览"
          helper="查看模板活动在当前阶段的推荐渠道、预算策略和前台呈现效果。"
        />

        <div className="campaign-preview-block">
          <div className="preview-banner compact">
            <div>
              <SegmentBadge segment={form.segment} />
              <h2>{form.title}</h2>
              <p>{form.subtitle}</p>
            </div>
            <span className="action-button primary">{form.cta}</span>
          </div>

          <div className="detail-list">
            <div>
              <span className="detail-label">推荐运营阶段</span>
              <p>{selectedTemplate.recommendedStage}</p>
            </div>
            <div>
              <span className="detail-label">推荐渠道组合</span>
              <div className="inline-token-row">
                {selectedTemplate.recommendedChannels.map((channel) => (
                  <span className="subtle-badge" key={`${selectedTemplate.id}-${channel}`}>
                    {channelMeta[channel].label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="detail-label">推荐预算策略</span>
              <p>{selectedTemplate.budgetStrategy}</p>
            </div>
            <div>
              <span className="detail-label">营销加码建议</span>
              <p>{selectedTemplate.suggestMarketingBoost}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export function CampaignBuilderPage() {
  const { role, templates } = useDemo()
  const [searchParams] = useSearchParams()
  const templateId = searchParams.get('template')
  const strategyId = searchParams.get('strategy') ?? undefined
  const selectedTemplate =
    templates.find((template) => template.id === templateId) ?? templates[2] ?? templates[0]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="创建活动"
        title="模板活动配置与发布"
        description="基于标准模板完成活动内容、触点和人群配置，并统一纳入工作台、触点和分析看板。"
        actions={
          <div className="header-actions-row">
            <Link className="action-button ghost" to="/templates">
              返回模板中心
            </Link>
            <span className="meta-chip">{roleMeta[role].label}</span>
          </div>
        }
      />

      <CampaignBuilderForm
        key={`${selectedTemplate.id}-${strategyId ?? 'default'}`}
        selectedTemplate={selectedTemplate}
        strategyId={strategyId}
      />
    </div>
  )
}
