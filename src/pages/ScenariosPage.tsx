import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import type { ActivityAction, ChannelKey, ScenarioDefinition, StrategyFormValues } from '../app/types'
import {
  channelMeta,
  channelOrder,
  roleMeta,
  segmentMeta,
} from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle, SegmentBadge } from '../components/Primitives'

const stepLabels = [
  '选择场景 · 一键生成',
  'AI 人群策略 · 承接页',
  '触达渠道选择',
  '权益配置 · 发布',
]

function buildInitialForm(scenario: ScenarioDefinition): StrategyFormValues {
  const today = new Date()
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + 30)
  const fmt = (d: Date) => d.toISOString().slice(0, 10)

  return {
    scenarioId: scenario.id,
    name: `${scenario.name} - ${segmentMeta[scenario.targetSegment].label}`,
    goal: scenario.goal,
    segment: scenario.targetSegment,
    channels: [...scenario.recommendedChannels],
    startDate: fmt(today),
    endDate: fmt(endDate),
    title: scenario.landingPage.title,
    subtitle: scenario.landingPage.subtitle,
    cta: scenario.landingPage.cta,
    note: scenario.aiStrategy,
    landingHighlights: [...scenario.landingPage.highlights],
    benefits: [...scenario.defaultBenefits],
    benefitTitle: scenario.defaultBenefitTitle,
    benefitCta: scenario.defaultBenefitCta,
  }
}

export function ScenariosPage() {
  const { role, scenarios, createStrategy } = useDemo()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialScenarioId = searchParams.get('scenario')

  const [step, setStep] = useState(1)
  const [selectedScenario, setSelectedScenario] = useState<ScenarioDefinition | null>(
    () => (initialScenarioId ? scenarios.find((s) => s.id === initialScenarioId) ?? null : null),
  )
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [form, setForm] = useState<StrategyFormValues | null>(null)
  const timerRef = useRef<number>(0)

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  const handleGenerate = useCallback(
    (scenario: ScenarioDefinition) => {
      setSelectedScenario(scenario)
      setGenerating(true)
      setGenerated(false)
      timerRef.current = window.setTimeout(() => {
        setForm(buildInitialForm(scenario))
        setGenerating(false)
        setGenerated(true)
      }, 1600)
    },
    [],
  )

  const toggleChannel = (ch: ChannelKey) => {
    if (!form) return
    setForm({
      ...form,
      channels: form.channels.includes(ch)
        ? form.channels.filter((c) => c !== ch)
        : [...form.channels, ch],
    })
  }

  const updateHighlight = (index: number, value: string) => {
    if (!form) return
    const next = [...form.landingHighlights]
    next[index] = value
    setForm({ ...form, landingHighlights: next })
  }

  const updateBenefit = (index: number, value: string) => {
    if (!form) return
    const next = [...form.benefits]
    next[index] = value
    setForm({ ...form, benefits: next })
  }

  const submit = (action: ActivityAction) => {
    if (!form) return
    createStrategy(form, action)
    navigate('/dashboard')
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="场景策略"
        title="AI 智能运营策略中心"
        description="选择运营场景，一键生成 AI 策略 → 自动生成承接页 → 选择触达渠道 → 配置权益发布。"
      />

      {/* Wizard Steps Indicator */}
      <section className="wizard-steps">
        {stepLabels.map((label, index) => (
          <button
            className={
              index + 1 === step
                ? 'wizard-step active'
                : index + 1 < step
                  ? 'wizard-step completed'
                  : 'wizard-step'
            }
            key={label}
            onClick={() => {
              if (index + 1 < step) setStep(index + 1)
            }}
            type="button"
          >
            <span className="wizard-step-number">{index + 1}</span>
            <span className="wizard-step-label">{label}</span>
          </button>
        ))}
      </section>

      {/* STEP 1: Scenario Selection + AI Generation */}
      {step === 1 && (
        <div className="page-stack">
          <section className="scenario-pick-grid">
            {scenarios.map((scenario) => (
              <button
                className={
                  selectedScenario?.id === scenario.id
                    ? 'scenario-card active'
                    : 'scenario-card'
                }
                key={scenario.id}
                onClick={() => handleGenerate(scenario)}
                type="button"
              >
                <div className="scenario-card-head">
                  <span className="scenario-icon">{scenario.icon}</span>
                  <GoalBadge goal={scenario.goal} />
                </div>
                <h2>{scenario.name}</h2>
                <p>{scenario.description}</p>
                <div className="scenario-card-footer">
                  <span className="meta-chip">{scenario.effectTag}</span>
                  <SegmentBadge segment={scenario.targetSegment} />
                </div>
              </button>
            ))}
          </section>

          {generating && (
            <section className="card ai-generating-card">
              <div className="ai-generating">
                <div className="ai-dot-pulse">
                  <span />
                  <span />
                  <span />
                </div>
                <p>AI 正在分析场景数据，生成运营策略...</p>
              </div>
            </section>
          )}

          {generated && selectedScenario && form && (
            <section className="card ai-result-card">
              <PanelTitle
                title="AI 策略生成完成"
                helper={`基于「${selectedScenario.name}」场景自动生成以下运营策略`}
              />
              <div className="ai-result-grid">
                <div className="ai-result-item">
                  <span className="detail-label">目标人群</span>
                  <strong>{segmentMeta[selectedScenario.targetSegment].label}</strong>
                  <p>{selectedScenario.aiAudienceDesc}</p>
                </div>
                <div className="ai-result-item">
                  <span className="detail-label">预估覆盖</span>
                  <strong>{selectedScenario.aiAudienceSize}</strong>
                  <p>{selectedScenario.effectTag}</p>
                </div>
                <div className="ai-result-item full">
                  <span className="detail-label">AI 运营策略</span>
                  <p>{selectedScenario.aiStrategy}</p>
                </div>
              </div>
              <div className="form-action-bar">
                <button
                  className="action-button primary"
                  onClick={() => setStep(2)}
                >
                  确认策略，下一步
                </button>
              </div>
            </section>
          )}
        </div>
      )}

      {/* STEP 2: AI Audience Strategy + Landing Page */}
      {step === 2 && form && selectedScenario && (
        <div className="page-stack">
          <section className="split-layout">
            <article className="card form-card">
              <PanelTitle
                title="AI 推荐人群策略"
                helper="AI 已根据场景自动圈选目标人群并生成运营策略，可按需调整。"
              />

              <div className="ai-audience-summary card narrative-card">
                <div className="ai-result-grid">
                  <div className="ai-result-item">
                    <span className="detail-label">目标人群</span>
                    <strong>{segmentMeta[form.segment].label}</strong>
                  </div>
                  <div className="ai-result-item">
                    <span className="detail-label">预估覆盖</span>
                    <strong>{selectedScenario.aiAudienceSize}</strong>
                  </div>
                </div>
                <div className="ai-result-item full">
                  <span className="detail-label">圈选规则</span>
                  <p>{selectedScenario.aiAudienceDesc}</p>
                </div>
              </div>

              <div className="form-grid" style={{ marginTop: '1rem' }}>
                <label className="field">
                  <span>策略名称</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>

                <label className="field">
                  <span>承接页标题</span>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </label>

                <label className="field">
                  <span>承接页副标题</span>
                  <textarea
                    rows={2}
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  />
                </label>

                <label className="field">
                  <span>CTA 按钮文案</span>
                  <input
                    value={form.cta}
                    onChange={(e) => setForm({ ...form, cta: e.target.value })}
                  />
                </label>

                {form.landingHighlights.map((hl, i) => (
                  <label className="field" key={`hl-${i}`}>
                    <span>亮点 {i + 1}</span>
                    <input
                      value={hl}
                      onChange={(e) => updateHighlight(i, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </article>

            <article className="card preview-card">
              <PanelTitle
                title="承接页预览"
                helper="AI 自动生成的承接页效果，点击发布后用户将看到此内容。"
              />
              <div className="front-preview">
                <div className="preview-banner">
                  <div>
                    <SegmentBadge segment={form.segment} />
                    <h2>{form.title}</h2>
                    <p>{form.subtitle}</p>
                  </div>
                  <span className="action-button primary">{form.cta}</span>
                </div>
                <div className="benefit-card-list">
                  {form.landingHighlights.map((hl) => (
                    <div className="benefit-item" key={hl}>
                      <span className="eyebrow">活动亮点</span>
                      <strong>{hl}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <div className="wizard-nav-bar">
            <button className="action-button ghost" onClick={() => setStep(1)}>
              上一步
            </button>
            <button className="action-button primary" onClick={() => setStep(3)}>
              下一步：选择触达渠道
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Channel Selection */}
      {step === 3 && form && (
        <div className="page-stack">
          <section className="card">
            <PanelTitle
              title="多触达渠道覆盖"
              helper="自由选择触达渠道，AI 已根据场景推荐最优组合，可按需调整。"
            />

            <div className="channel-section">
              <h3>消息渠道</h3>
              <div className="channel-grid">
                {channelOrder
                  .filter((ch) => channelMeta[ch].category === 'message')
                  .map((ch) => (
                    <button
                      className={
                        form.channels.includes(ch)
                          ? 'channel-card active'
                          : 'channel-card'
                      }
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      type="button"
                    >
                      <div className="channel-card-head">
                        <strong>{channelMeta[ch].label}</strong>
                        {form.channels.includes(ch) && (
                          <span className="status-pill success">已选</span>
                        )}
                      </div>
                      <p>{channelMeta[ch].description}</p>
                    </button>
                  ))}
              </div>
            </div>

            <div className="channel-section">
              <h3>平台触点</h3>
              <div className="channel-grid">
                {channelOrder
                  .filter((ch) => channelMeta[ch].category === 'touchpoint')
                  .map((ch) => (
                    <button
                      className={
                        form.channels.includes(ch)
                          ? 'channel-card active'
                          : 'channel-card'
                      }
                      key={ch}
                      onClick={() => toggleChannel(ch)}
                      type="button"
                    >
                      <div className="channel-card-head">
                        <strong>{channelMeta[ch].label}</strong>
                        {form.channels.includes(ch) && (
                          <span className="status-pill success">已选</span>
                        )}
                      </div>
                      <p>{channelMeta[ch].description}</p>
                    </button>
                  ))}
              </div>
            </div>

            <div className="channel-summary">
              <span className="detail-label">已选渠道</span>
              <div className="inline-token-row">
                {form.channels.map((ch) => (
                  <span className="subtle-badge" key={ch}>
                    {channelMeta[ch].label}
                  </span>
                ))}
                {form.channels.length === 0 && (
                  <span className="meta-chip">请至少选择一个渠道</span>
                )}
              </div>
            </div>
          </section>

          <div className="wizard-nav-bar">
            <button className="action-button ghost" onClick={() => setStep(2)}>
              上一步
            </button>
            <button
              className="action-button primary"
              onClick={() => setStep(4)}
              disabled={form.channels.length === 0}
            >
              下一步：配置权益
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Benefits Configuration + Publish */}
      {step === 4 && form && selectedScenario && (
        <div className="page-stack">
          <section className="split-layout">
            <article className="card form-card">
              <PanelTitle
                title="为目标人群配置权益"
                helper="配置面向目标人群的专属权益，促进最终转化。"
              />

              <div className="form-grid">
                <label className="field">
                  <span>权益主题</span>
                  <input
                    value={form.benefitTitle}
                    onChange={(e) =>
                      setForm({ ...form, benefitTitle: e.target.value })
                    }
                  />
                </label>

                <label className="field">
                  <span>权益 CTA</span>
                  <input
                    value={form.benefitCta}
                    onChange={(e) =>
                      setForm({ ...form, benefitCta: e.target.value })
                    }
                  />
                </label>

                {form.benefits.map((b, i) => (
                  <label className="field" key={`benefit-${i}`}>
                    <span>权益卡片 {i + 1}</span>
                    <input
                      value={b}
                      onChange={(e) => updateBenefit(i, e.target.value)}
                    />
                  </label>
                ))}

                <div className="form-row">
                  <label className="field">
                    <span>生效时间</span>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                    />
                  </label>
                  <label className="field">
                    <span>失效时间</span>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({ ...form, endDate: e.target.value })
                      }
                    />
                  </label>
                </div>

                <label className="field">
                  <span>运营备注</span>
                  <textarea
                    rows={2}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                  />
                </label>
              </div>
            </article>

            <article className="card preview-card">
              <PanelTitle
                title="策略总览"
                helper="确认策略配置后即可发布，所有渠道将同步生效。"
              />

              <div className="strategy-summary">
                <div className="detail-list">
                  <div>
                    <span className="detail-label">运营场景</span>
                    <div className="inline-token-row">
                      <GoalBadge goal={form.goal} />
                      <strong>{selectedScenario.name}</strong>
                    </div>
                  </div>
                  <div>
                    <span className="detail-label">目标人群</span>
                    <div className="inline-token-row">
                      <SegmentBadge segment={form.segment} />
                      <span>{selectedScenario.aiAudienceSize}</span>
                    </div>
                  </div>
                  <div>
                    <span className="detail-label">触达渠道</span>
                    <div className="inline-token-row">
                      {form.channels.map((ch) => (
                        <span className="subtle-badge" key={ch}>
                          {channelMeta[ch].label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="detail-label">权益配置</span>
                    <div className="inline-token-row">
                      {form.benefits.map((b) => (
                        <span className="subtle-badge" key={b}>
                          {b}
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
                    <span className="detail-label">预估效果</span>
                    <span className="meta-chip highlight">
                      {selectedScenario.effectTag}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <div className="wizard-nav-bar">
            <button className="action-button ghost" onClick={() => setStep(3)}>
              上一步
            </button>
            <span className="meta-chip">{roleMeta[role].label}</span>

            {role === 'merchantOperator' && (
              <button
                className="action-button secondary"
                onClick={() => submit('draft')}
              >
                保存草稿
              </button>
            )}

            {role === 'merchantAdmin' && (
              <>
                <button
                  className="action-button secondary"
                  onClick={() => submit('submit')}
                >
                  提交审核
                </button>
                <button
                  className="action-button primary"
                  onClick={() => submit('publish')}
                >
                  发布策略
                </button>
              </>
            )}

            {role === 'platformOps' && (
              <button
                className="action-button primary"
                onClick={() => submit('publish')}
              >
                审核并发布
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
