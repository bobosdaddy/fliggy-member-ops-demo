import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import type {
  AudienceCondition,
  AudienceTagKey,
  ChannelKey,
  ScenarioKey,
  StrategyFormValues,
} from '../app/types'
import {
  scenarios,
  conditionMeta,
  conditionOrder,
  audienceTagMeta,
  audienceTagOrder,
  channelMeta,
  channelOrder,
  sharedChannelBalance,
  scenarioMeta,
  initialBenefits,
  benefitCategoryMeta,
  benefitCategoryOrder,
} from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { ComingSoonCard } from '../components/Primitives'

const STEPS = ['选择场景 · AI 生成', '人群圈选 · 渠道选择', '权益配置', '素材配置 · 发布'] as const

const parseEstimatedAudience = (value: string) => Number(value.replace(/[^\d]/g, '')) || 0

const formatAudienceCount = (value: number) => new Intl.NumberFormat('zh-CN').format(value)

function getAudienceTierLabel(count: number) {
  if (count >= 60000) return '高量级'
  if (count >= 35000) return '中高量级'
  if (count >= 20000) return '中量级'
  return '精细量级'
}

function getAudienceScaleLabel(scale: number) {
  if (scale <= 60) return '精准收敛'
  if (scale <= 90) return '平衡覆盖'
  if (scale <= 110) return '推荐量级'
  return '放量扩量'
}

function getScenarioAudienceDescriptor(scenario?: ScenarioKey) {
  if (scenario === 'registration') return '88VIP 且希尔顿未注册会员用户'
  if (scenario === 'firstOrder') return '已注册未下单且近期浏览酒店的会员'
  if (scenario === 'promoteOrder') return '下单未支付或下单取消的高意向用户'
  return '近期沉默但具备复购潜力的老客会员'
}

function getScenarioIntentSignals(scenario?: ScenarioKey) {
  if (scenario === 'registration') {
    return ['近 30 天浏览希尔顿', '点击会员权益页', '领券未注册', '高星酒店偏好']
  }
  if (scenario === 'promoteOrder') {
    return ['下单未支付', '取消订单后重访', '高价值房型偏好', '活动页反复浏览']
  }
  if (scenario === 'firstOrder') {
    return ['注册后 7 天未下单', '多次浏览房型', '领券未使用', '价格敏感高响应']
  }
  return ['30 天未复购', '活动页停留长', '会员日点击高', '高价值历史订单']
}

function defaultForm(): StrategyFormValues {
  const sc = scenarios.find((s) => s.id === 'registration')!
  return {
    name: sc.name,
    scenario: 'registration',
    conditions: [...sc.defaultConditions],
    channels: [...sc.defaultChannels],
    audienceScale: 100,
    audienceMode: 'ai',
    audienceTags: [],
    creativeMode: 'ai',
    manualLink: '',
    landingTitle: sc.landingTitle,
    landingSubtitle: sc.landingSubtitle,
    landingCta: sc.landingCta,
    landingHighlights: [...sc.landingHighlights],
    benefitIds: [...sc.defaultBenefitIds],
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    note: '',
  }
}

export function ScenariosPage() {
  const { createStrategy, role, benefits } = useDemo()
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<StrategyFormValues>(defaultForm)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiDone, setAiDone] = useState(false)

  const selectedScenario = scenarios.find((s) => s.id === form.scenario)
  const audienceScale = form.audienceScale ?? 100
  const estimatedAudienceBase = parseEstimatedAudience(selectedScenario?.estimatedAudience ?? '0')
  const manualAudienceBase = form.audienceTags.length === 0
    ? 0
    : Math.round(estimatedAudienceBase * Math.min(0.34 + form.audienceTags.length * 0.11, 0.82))
  const effectiveAudienceBase = form.audienceMode === 'manual' ? manualAudienceBase : estimatedAudienceBase
  const projectedAudience = Math.max(0, Math.round((effectiveAudienceBase * audienceScale) / 100))
  const projectedAudienceLabel = formatAudienceCount(projectedAudience)
  const projectedAudienceTier = getAudienceTierLabel(projectedAudience)
  const scaleLabel = getAudienceScaleLabel(audienceScale)
  const audienceDescriptor = getScenarioAudienceDescriptor(selectedScenario?.id)
  const intentSignals = getScenarioIntentSignals(selectedScenario?.id)
  const selectedBenefitNames = useMemo(
    () => form.benefitIds
      .map((bid) => benefits.find((item) => item.id === bid)?.name)
      .filter((name): name is string => Boolean(name)),
    [benefits, form.benefitIds],
  )
  const selectedAudienceTags = useMemo(
    () => form.audienceTags.map((tag) => audienceTagMeta[tag].label),
    [form.audienceTags],
  )
  const isCreativeReady = form.creativeMode === 'ai'
    ? aiDone
    : form.manualLink.trim().length > 0

  const patch = (partial: Partial<StrategyFormValues>) =>
    setForm((prev) => ({ ...prev, ...partial }))

  const toggleCondition = (c: AudienceCondition) =>
    patch({
      conditions: form.conditions.includes(c)
        ? form.conditions.filter((x) => x !== c)
        : [...form.conditions, c],
    })

  const toggleAudienceTag = (tag: AudienceTagKey) =>
    patch({
      audienceTags: form.audienceTags.includes(tag)
        ? form.audienceTags.filter((item) => item !== tag)
        : [...form.audienceTags, tag],
    })

  const toggleChannel = (ch: ChannelKey) =>
    patch({
      channels: form.channels.includes(ch)
        ? form.channels.filter((x) => x !== ch)
        : [...form.channels, ch],
    })

  const toggleBenefit = (id: string) =>
    patch({
      benefitIds: form.benefitIds.includes(id)
        ? form.benefitIds.filter((x) => x !== id)
        : [...form.benefitIds, id],
    })

  const pickScenario = (id: ScenarioKey) => {
    const sc = scenarios.find((s) => s.id === id)!
    patch({
      scenario: id,
      name: sc.name,
      conditions: [...sc.defaultConditions],
      channels: [...sc.defaultChannels],
      audienceScale: 100,
      audienceMode: 'ai',
      audienceTags: [],
      benefitIds: [...sc.defaultBenefitIds],
      landingTitle: sc.landingTitle,
      landingSubtitle: sc.landingSubtitle,
      landingCta: sc.landingCta,
      landingHighlights: [...sc.landingHighlights],
    })
  }

  const runAi = () => {
    setAiLoading(true)
    setTimeout(() => {
      setAiLoading(false)
      setAiDone(true)
    }, 1500)
  }

  const submit = (action: 'draft' | 'submit' | 'publish') => {
    createStrategy(form, action)
    nav('/dashboard')
  }

  const resetAudience = () => {
    if (!selectedScenario) return
    patch({
      conditions: [...selectedScenario.defaultConditions],
      audienceScale: 100,
      audienceMode: 'ai',
      audienceTags: [],
    })
  }

  const canNext = () => {
    if (step === 0) return !!form.scenario
    if (step === 1) {
      const hasAudience = form.audienceMode === 'ai' ? true : form.audienceTags.length > 0
      return hasAudience && form.channels.length > 0
    }
    if (step === 2) return form.benefitIds.length > 0
    return isCreativeReady
  }

  return (
    <>
      <PageHeader
        eyebrow="会员中心"
        title="场景策略"
        description="选择场景一键生成 AI 策略，自动配置人群、渠道、权益与素材投放。"
      />

      {/* Stepper */}
      <div className="stepper">
        {STEPS.map((label, i) => (
          <div key={i} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <span className="step-number">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="wizard-body">
        {/* ── Step 0: 选择场景 ── */}
        {step === 0 && (
          <section className="wizard-section">
            <h3>选择运营场景</h3>
            <div className="scenario-select-grid">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  className={`scenario-select-card ${form.scenario === sc.id ? 'selected' : ''}`}
                  onClick={() => pickScenario(sc.id)}
                >
                  <span className="scenario-select-icon">{sc.icon}</span>
                  <strong>{sc.name}</strong>
                  <p>{sc.description}</p>
                  <span className={`badge tone-${scenarioMeta[sc.id].tone}`}>{sc.effectTag}</span>
                </button>
              ))}
              <ComingSoonCard
                title="更多场景"
                description="即将支持更多会员运营场景，如签到打卡、积分兑换、等级升级等。"
              />
            </div>

            {selectedScenario && (
              <div className="ai-strategy-block">
                <div className="ai-strategy-header">
                  <span className="ai-icon">🤖</span>
                  <h4>AI 策略推荐</h4>
                  {!aiDone && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={runAi}
                      disabled={aiLoading}
                    >
                      {aiLoading ? '生成中…' : '一键生成 AI 策略'}
                    </button>
                  )}
                  {aiDone && <span className="badge tone-success">已生成</span>}
                </div>
                <p className="ai-strategy-text">{selectedScenario.aiStrategy}</p>
                <div className="ai-strategy-meta">
                  <span>AI 圈人 · 预估人群量级：{getAudienceTierLabel(estimatedAudienceBase)}</span>
                  <span>预计覆盖：{selectedScenario.estimatedAudience}</span>
                  <span>{selectedScenario.effectTag}</span>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── Step 1: 人群 + 渠道 ── */}
        {step === 1 && (
          <section className="wizard-section">
            <h3>人群圈选</h3>
            <div className="audience-mode-tabs">
              <button
                type="button"
                className={`audience-mode-tab ${form.audienceMode === 'ai' ? 'active' : ''}`}
                onClick={() => patch({
                  audienceMode: 'ai',
                  audienceTags: [],
                  conditions: [...(selectedScenario?.defaultConditions ?? [])],
                })}
              >
                🤖 AI 推荐圈选
              </button>
              <button
                type="button"
                className={`audience-mode-tab ${form.audienceMode === 'manual' ? 'active' : ''}`}
                onClick={() => patch({ audienceMode: 'manual', conditions: [] })}
              >
                🏷️ 用户标签圈选
              </button>
            </div>

            <div className="audience-base">
              <span className="badge tone-amber">88VIP</span>
              <span className="audience-base-text">
                {form.audienceMode === 'ai'
                  ? `已一键圈选 ${audienceDescriptor}，AI 优先为商家推荐意向度高的用户`
                  : '已切换为用户标签圈选，商家可组合标签手动筛选目标人群'}
              </span>
            </div>

            {form.audienceMode === 'ai' ? (
              <>
                <div className="audience-auto-pick-card">
                  <div className="audience-auto-pick-header">
                    <div>
                      <span className={`badge tone-${selectedScenario ? scenarioMeta[selectedScenario.id].tone : 'amber'}`}>
                        {selectedScenario?.name ?? '当前场景'}
                      </span>
                      <span className="badge tone-success">系统已完成圈选</span>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline" onClick={resetAudience}>
                      恢复场景推荐
                    </button>
                  </div>
                  <p className="audience-auto-pick-text">
                    当前已自动锁定 {audienceDescriptor}。AI 会优先推荐更高意向的用户，帮助商家先触达最有机会完成注册或转化的人群。
                  </p>
                  <div className="audience-chip-list">
                    <span className="badge tone-amber">88VIP</span>
                    <span className="badge tone-blue">{audienceDescriptor}</span>
                    <span className="badge tone-success">高意向优先</span>
                  </div>
                  <div className="audience-reason-list">
                    {intentSignals.map((signal) => (
                      <span key={signal} className="badge tone-muted">{signal}</span>
                    ))}
                  </div>
                </div>

                <div className="audience-estimator">
                  <div className="audience-scale-card">
                    <div className="audience-scale-header">
                      <strong>用户规模调节</strong>
                      <span>{audienceScale}% · {scaleLabel}</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={140}
                      step={10}
                      value={audienceScale}
                      className="audience-scale-slider"
                      aria-label="调整投放规模"
                      onChange={(e) => patch({ audienceScale: Number(e.target.value) })}
                    />
                    <div className="audience-scale-marks">
                      <span>40% 收敛</span>
                      <span>100% 推荐</span>
                      <span>140% 放量</span>
                    </div>
                    <p className="wizard-hint audience-inline-hint">
                      当你调小规模时，AI 会优先保留近 30 天行为最活跃、注册意愿更高的用户。
                    </p>
                  </div>
                  <div className="audience-estimate-card">
                    <span className="eyebrow">AI 圈人 · 预估用户量级</span>
                    <div className="audience-tier-row">
                      <span className="badge tone-blue">{projectedAudienceTier}</span>
                      <span className="badge tone-muted">当前量级 {audienceScale}% </span>
                    </div>
                    <strong>{projectedAudienceLabel} 人</strong>
                    <p>基于 {audienceDescriptor} 实时估算，适合先从高意向用户起投，再逐步放量。</p>
                  </div>
                </div>

                {selectedScenario?.id !== 'registration' && (
                  <>
                    <p className="wizard-hint">
                      已按场景推荐默认条件，你也可以继续增减筛选条件，进一步收紧或放宽投放人群。
                    </p>
                    <div className="condition-grid">
                      {conditionOrder.map((c) => (
                        <label key={c} className={`condition-card ${form.conditions.includes(c) ? 'selected' : ''}`}>
                          <input
                            type="checkbox"
                            checked={form.conditions.includes(c)}
                            onChange={() => toggleCondition(c)}
                          />
                          <strong>{conditionMeta[c].label}</strong>
                          <p>{conditionMeta[c].description}</p>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="audience-manual-card">
                  <div className="audience-auto-pick-header">
                    <div>
                      <span className="badge tone-blue">用户标签圈选</span>
                      <span className="badge tone-success">商家手动配置</span>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline" onClick={resetAudience}>
                      恢复 AI 圈选
                    </button>
                  </div>
                  <p className="audience-auto-pick-text">
                    通过用户标签手动圈选目标人群，系统会根据已选标签实时估算可覆盖用户，并保留用户规模调节能力。
                  </p>
                  <div className="tag-select-grid">
                    {audienceTagOrder.map((tag) => (
                      <label key={tag} className={`tag-select-card ${form.audienceTags.includes(tag) ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={form.audienceTags.includes(tag)}
                          onChange={() => toggleAudienceTag(tag)}
                        />
                        <strong>{audienceTagMeta[tag].label}</strong>
                        <p>{audienceTagMeta[tag].description}</p>
                      </label>
                    ))}
                  </div>
                  {selectedAudienceTags.length > 0 && (
                    <div className="audience-chip-list audience-chip-stack">
                      {selectedAudienceTags.map((label) => (
                        <span key={label} className="badge tone-blue">{label}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="audience-estimator">
                  <div className="audience-scale-card">
                    <div className="audience-scale-header">
                      <strong>用户规模调节</strong>
                      <span>{audienceScale}% · {scaleLabel}</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={140}
                      step={10}
                      value={audienceScale}
                      className="audience-scale-slider"
                      aria-label="调整投放规模"
                      onChange={(e) => patch({ audienceScale: Number(e.target.value) })}
                    />
                    <div className="audience-scale-marks">
                      <span>40% 收敛</span>
                      <span>100% 推荐</span>
                      <span>140% 放量</span>
                    </div>
                    <p className="wizard-hint audience-inline-hint">
                      先选择标签，再按预算和履约能力调整用户规模。
                    </p>
                  </div>
                  <div className="audience-estimate-card">
                    <span className="eyebrow">标签圈选 · 预估用户量级</span>
                    <div className="audience-tier-row">
                      <span className="badge tone-blue">{projectedAudienceTier}</span>
                      <span className="badge tone-muted">已选标签 {form.audienceTags.length} 个</span>
                    </div>
                    <strong>{projectedAudienceLabel} 人</strong>
                    <p>
                      {form.audienceTags.length > 0
                        ? '系统已根据已选标签估算可覆盖用户量，可继续调节规模后进入下一步。'
                        : '请选择至少 1 个用户标签，系统才会为你估算可覆盖用户量。'}
                    </p>
                  </div>
                </div>
              </>
            )}

            <h3 style={{ marginTop: 32 }}>渠道选择</h3>
            <div className="channel-grid">
              {channelOrder.map((ch) => (
                <label key={ch} className={`channel-card ${form.channels.includes(ch) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={form.channels.includes(ch)}
                    onChange={() => toggleChannel(ch)}
                  />
                  <strong>{channelMeta[ch].label}</strong>
                  <p>{channelMeta[ch].description}</p>
                  <div className="channel-budget-row">
                    <span>
                      <em>共享余额</em>
                      <strong>{sharedChannelBalance}</strong>
                    </span>
                    <span>
                      <em>预估花费</em>
                      <strong>{channelMeta[ch].estimatedCost}</strong>
                    </span>
                  </div>
                </label>
              ))}
              <ComingSoonCard
                title="更多渠道"
                description="即将支持 Push 推送、站内信、支付宝生活号等更多触达渠道。"
              />
            </div>
          </section>
        )}

        {/* ── Step 2: 权益配置 ── */}
        {step === 2 && (
          <section className="wizard-section">
            <h3 style={{ marginTop: 28 }}>权益配置</h3>
            <p className="wizard-hint">
              先确定本次策略关联的会员权益（已选 {form.benefitIds.length} 项），下一步的投放素材会基于这些权益实时生成。
            </p>
            {benefitCategoryOrder.map((cat) => {
              const items = benefits.filter((b) => b.category === cat && b.enabled)
              if (items.length === 0) return null
              return (
                <div key={cat} className="benefit-select-group">
                  <h4>{benefitCategoryMeta[cat].icon} {benefitCategoryMeta[cat].label}</h4>
                  <div className="benefit-select-list">
                    {items.map((b) => (
                      <label key={b.id} className={`benefit-select-card ${form.benefitIds.includes(b.id) ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={form.benefitIds.includes(b.id)}
                          onChange={() => toggleBenefit(b.id)}
                        />
                        <div>
                          <strong>{b.name}</strong>
                          {(b.brand || b.value) && (
                            <div className="benefit-meta">
                              {b.brand && <span className="benefit-brand">{b.brand}</span>}
                              {b.value && <span className="benefit-value">{b.value}</span>}
                            </div>
                          )}
                          <p>{b.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </section>
        )}

        {/* ── Step 3: 素材配置 + 摘要 + 发布 ── */}
        {step === 3 && (
          <section className="wizard-section">
            <h3>素材配置</h3>
            <div className="creative-mode-tabs">
              <button
                type="button"
                className={`creative-mode-tab ${form.creativeMode === 'ai' ? 'active' : ''}`}
                onClick={() => patch({ creativeMode: 'ai' })}
              >
                🤖 AI 自动生成
              </button>
              <button
                type="button"
                className={`creative-mode-tab ${form.creativeMode === 'manual' ? 'active' : ''}`}
                onClick={() => patch({ creativeMode: 'manual' })}
              >
                🔗 手动配置链接
              </button>
            </div>

            {form.creativeMode === 'manual' ? (
              <div className="creative-manual">
                <label className="field-label">
                  投放链接
                  <input
                    type="url"
                    className="field-input"
                    placeholder="https://..."
                    value={form.manualLink}
                    onChange={(e) => patch({ manualLink: e.target.value })}
                  />
                </label>
                <label className="field-label">
                  投放页标题
                  <input
                    type="text"
                    className="field-input"
                    value={form.landingTitle}
                    onChange={(e) => patch({ landingTitle: e.target.value })}
                  />
                </label>
              </div>
            ) : (
              <div className="creative-ai">
                <p className="creative-ai-hint">
                  已基于前一步所选权益生成投放页面与承接页面素材，生成后可继续修改文案并下载。
                </p>

                <div className="creative-preview-grid">
                  <div className="creative-preview-card">
                    <h4>投放页面</h4>
                    <div className="creative-preview-phone">
                      <div className="phone-screen">
                        <strong className="phone-title">{form.landingTitle || '投放页标题'}</strong>
                        <p className="phone-sub">{form.landingSubtitle || '投放页副标题'}</p>
                        <ul className="phone-highlights">
                          {form.landingHighlights.map((h, i) => (
                            <li key={i}>✦ {h}</li>
                          ))}
                        </ul>
                        <button type="button" className="phone-cta">{form.landingCta || 'CTA'}</button>
                      </div>
                    </div>
                    <div className="creative-actions">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={() => patch({ landingTitle: `${form.landingTitle}（已编辑）` })}
                      >
                        编辑文案
                      </button>
                      <button type="button" className="btn btn-sm btn-outline">下载素材</button>
                    </div>
                  </div>

                  <div className="creative-preview-card">
                    <h4>承接页面</h4>
                    <div className="creative-preview-phone">
                      <div className="phone-screen reception">
                        <strong className="phone-title">欢迎加入会员</strong>
                        <p className="phone-sub">您已成功注册，以下权益已激活：</p>
                        <ul className="phone-highlights">
                          {form.benefitIds.map((bid) => {
                            const b = initialBenefits.find((x) => x.id === bid)
                            return b ? <li key={bid}>✦ {b.name}</li> : null
                          })}
                        </ul>
                        <button type="button" className="phone-cta">查看我的权益</button>
                      </div>
                    </div>
                    <div className="creative-actions">
                      <button type="button" className="btn btn-sm btn-outline">编辑文案</button>
                      <button type="button" className="btn btn-sm btn-outline">下载素材</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <h3 style={{ marginTop: 28 }}>策略摘要</h3>
            <div className="strategy-summary-grid">
              <div className="summary-item">
                <span className="summary-icon">🎯</span>
                <div className="summary-content">
                  <span className="eyebrow">场景</span>
                  <p>{selectedScenario?.icon} {selectedScenario?.name ?? '-'}</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">👥</span>
                <div className="summary-content">
                  <span className="eyebrow">圈选人群</span>
                  <p>
                    {projectedAudienceLabel} 人 · {form.audienceMode === 'ai'
                      ? `${audienceDescriptor} · 高意向优先`
                      : selectedAudienceTags.join('、') || '未选择标签'}
                  </p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">📡</span>
                <div className="summary-content">
                  <span className="eyebrow">触达渠道</span>
                  <p>{form.channels.map((ch) => channelMeta[ch].label).join('、') || '未选择'}</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">🎁</span>
                <div className="summary-content">
                  <span className="eyebrow">已选权益</span>
                  <p>{selectedBenefitNames.length > 0 ? selectedBenefitNames.slice(0, 2).join('、') : '未选择'}{selectedBenefitNames.length > 2 ? ` 等 ${selectedBenefitNames.length} 项` : ''}</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">🎨</span>
                <div className="summary-content">
                  <span className="eyebrow">素材模式</span>
                  <p>{form.creativeMode === 'ai' ? '🤖 AI 自动生成' : '🔗 手动配置链接'}</p>
                </div>
              </div>
            </div>

            {/* 投放时间 */}
            <h3 style={{ marginTop: 28 }}>投放时间</h3>
            <div className="form-row">
              <label className="field-label">
                开始日期
                <input
                  type="date"
                  className="field-input"
                  value={form.startDate}
                  onChange={(e) => patch({ startDate: e.target.value })}
                />
              </label>
              <label className="field-label">
                结束日期
                <input
                  type="date"
                  className="field-input"
                  value={form.endDate}
                  onChange={(e) => patch({ endDate: e.target.value })}
                />
              </label>
            </div>

            {/* 策略备注 */}
            <h3 style={{ marginTop: 28 }}>策略备注</h3>
            <textarea
              className="field-textarea"
              placeholder="填写策略说明（可选）"
              value={form.note}
              onChange={(e) => patch({ note: e.target.value })}
              rows={3}
            />

            <div className="publish-actions">
              {role !== 'merchantOperator' && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => submit('publish')}
                  disabled={!isCreativeReady}
                >
                  🚀 发布策略
                </button>
              )}
              {role === 'merchantOperator' && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => submit('submit')}
                  disabled={!isCreativeReady}
                >
                  📤 提交审核
                </button>
              )}
              <button type="button" className="btn btn-outline" onClick={() => submit('draft')}>
                💾 保存草稿
              </button>
            </div>
            {!isCreativeReady && (
              <p className="wizard-hint" style={{ marginTop: 12 }}>
                完成当前素材配置后才能发布；草稿可随时保存，后续继续补充投放素材。
              </p>
            )}
          </section>
        )}
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        {step > 0 && (
          <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>
            上一步
          </button>
        )}
        <div className="wizard-nav-spacer" />
        {step < STEPS.length - 1 && (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canNext()}
            onClick={() => setStep(step + 1)}
          >
            下一步
          </button>
        )}
      </div>
    </>
  )
}
