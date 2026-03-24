import { useEffect, useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { BenefitConfig, Segment } from '../app/types'
import { segmentMeta, segmentOrder } from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { ActionLink, PanelTitle, SegmentBadge } from '../components/Primitives'

export function BenefitsPage() {
  const { benefits, saveBenefits } = useDemo()
  const [activeSegment, setActiveSegment] = useState<Segment>('guest')
  const [draft, setDraft] = useState<BenefitConfig>(benefits.guest)

  useEffect(() => {
    setDraft(benefits[activeSegment])
  }, [activeSegment, benefits])

  const updateCard = (index: number, value: string) => {
    const nextCards = [...draft.benefitCards]
    nextCards[index] = value
    setDraft({ ...draft, benefitCards: nextCards })
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="权益展示"
        title="会员权益配置台"
        description="按会员身份配置第二官网式的权益表达，并统一管理品牌会员在飞猪前台看到的内容。"
        actions={
          <div className="header-actions-row">
            <span className="meta-chip">上次保存 {benefits[activeSegment].updatedAt}</span>
            <button
              className="action-button primary"
              onClick={() =>
                saveBenefits(activeSegment, {
                  segment: activeSegment,
                  title: draft.title,
                  subtitle: draft.subtitle,
                  cta: draft.cta,
                  benefitCards: draft.benefitCards,
                  tierNote: draft.tierNote,
                  progressNote: draft.progressNote,
                })
              }
            >
              保存配置
            </button>
          </div>
        }
      />

      <section className="tab-row">
        {segmentOrder.map((segment) => (
          <button
            className={segment === activeSegment ? 'tab-button active' : 'tab-button'}
            key={segment}
            onClick={() => setActiveSegment(segment)}
          >
            {segmentMeta[segment].label}
          </button>
        ))}
      </section>

      <section className="split-layout">
        <article className="card form-card">
          <PanelTitle
            title={`${segmentMeta[activeSegment].label}文案配置`}
            helper="统一维护标题、CTA 与权益卡内容，确保不同身份用户看到的表达一致且准确。"
          />

          <div className="form-grid">
            <label className="field">
              <span>主标题</span>
              <input
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              />
            </label>

            <label className="field">
              <span>副标题</span>
              <textarea
                rows={3}
                value={draft.subtitle}
                onChange={(event) => setDraft({ ...draft, subtitle: event.target.value })}
              />
            </label>

            <label className="field">
              <span>CTA 按钮文案</span>
              <input
                value={draft.cta}
                onChange={(event) => setDraft({ ...draft, cta: event.target.value })}
              />
            </label>

            {draft.benefitCards.map((card, index) => (
              <label className="field" key={`${activeSegment}-card-${index}`}>
                <span>{`权益卡片 ${index + 1}`}</span>
                <input value={card} onChange={(event) => updateCard(index, event.target.value)} />
              </label>
            ))}

            {activeSegment === 'silver' || activeSegment === 'gold' ? (
              <>
                <label className="field">
                  <span>当前等级权益说明</span>
                  <textarea
                    rows={3}
                    value={draft.tierNote ?? ''}
                    onChange={(event) => setDraft({ ...draft, tierNote: event.target.value })}
                  />
                </label>
                <label className="field">
                  <span>{activeSegment === 'silver' ? '下一等级激励' : '保级进度提示'}</span>
                  <textarea
                    rows={3}
                    value={draft.progressNote ?? ''}
                    onChange={(event) =>
                      setDraft({ ...draft, progressNote: event.target.value })
                    }
                  />
                </label>
              </>
            ) : null}
          </div>
        </article>

        <article className="card preview-card">
          <PanelTitle
            title="当前展示效果"
            helper="展示当前会员身份在飞猪前台看到的权益模块，便于统一校准权益表达与品牌呈现。"
          />

          <div className="front-preview">
            <div className="preview-banner">
              <div>
                <SegmentBadge segment={activeSegment} />
                <h2>{draft.title}</h2>
                <p>{draft.subtitle}</p>
              </div>
              <ActionLink tone="primary" as="span">
                {draft.cta}
              </ActionLink>
            </div>

            <div className="benefit-card-list">
              {draft.benefitCards.map((benefit) => (
                <div className="benefit-item" key={benefit}>
                  <span className="eyebrow">会员礼遇</span>
                  <strong>{benefit}</strong>
                </div>
              ))}
            </div>

            {draft.tierNote ? (
              <div className="tier-note">
                <strong>当前等级权益</strong>
                <p>{draft.tierNote}</p>
              </div>
            ) : null}

            {draft.progressNote ? (
              <div className="tier-note accent">
                <strong>{activeSegment === 'silver' ? '升级提醒' : '保级提醒'}</strong>
                <p>{draft.progressNote}</p>
              </div>
            ) : null}
          </div>
        </article>
      </section>
    </div>
  )
}
