import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import type { ActivityAction, CampaignFormValues, PlacementKey } from '../app/types'
import {
  placementMeta,
  placementOrder,
  roleMeta,
  segmentMeta,
  segmentOrder,
} from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle, SegmentBadge } from '../components/Primitives'

export function CampaignBuilderPage() {
  const { role, templates, createActivity } = useDemo()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const templateId = searchParams.get('template')
  const selectedTemplate =
    templates.find((template) => template.id === templateId) ?? templates[2] ?? templates[0]

  const [form, setForm] = useState<CampaignFormValues>(selectedTemplate.defaultCampaign)

  useEffect(() => {
    setForm(selectedTemplate.defaultCampaign)
  }, [selectedTemplate])

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
    <div className="page-stack">
      <PageHeader
        eyebrow="创建活动"
        title="活动配置与发布"
        description="基于标准模板完成活动配置，并统一纳入工作台、触点投放与效果管理。"
        actions={
          <div className="header-actions-row">
            <Link className="action-button ghost" to="/templates">
              返回模板中心
            </Link>
            <span className="meta-chip">{roleMeta[role].label}</span>
          </div>
        }
      />

      <section className="split-layout">
        <article className="card form-card">
          <PanelTitle
            title={`当前模板：${selectedTemplate.name}`}
            helper={selectedTemplate.description}
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
              <span>运营备注</span>
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
            title="活动呈现效果"
            helper="统一查看当前活动的展示内容、投放触点、生效周期与角色操作权限。"
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
                <span className="detail-label">投放触点</span>
                <div className="inline-token-row">
                  {form.placements.map((placement) => (
                    <span className="subtle-badge" key={placement}>
                      {placementMeta[placement].label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="detail-label">生效周期</span>
                <p>
                  {form.startDate} 至 {form.endDate}
                </p>
              </div>
              <div>
                <span className="detail-label">操作角色</span>
                <p>{roleMeta[role].label}</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
