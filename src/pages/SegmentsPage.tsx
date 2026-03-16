import { useState } from 'react'
import { audienceInsights, segmentMeta } from '../data/mockData'
import type { Segment } from '../app/types'
import { PageHeader } from '../components/PageHeader'
import { PanelTitle, SegmentBadge } from '../components/Primitives'

export function SegmentsPage() {
  const [activeSegment, setActiveSegment] = useState<Segment>('guest')
  const current = audienceInsights.find((item) => item.key === activeSegment) ?? audienceInsights[0]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="会员身份"
        title="会员身份分层经营"
        description="将飞猪渠道内的品牌会员按身份状态拆分，明确不同经营目标、展示策略和推荐动作。"
      />

      <section className="segment-grid">
        {audienceInsights.map((segment) => (
          <button
            className={segment.key === activeSegment ? 'segment-card active' : 'segment-card'}
            key={segment.key}
            onClick={() => setActiveSegment(segment.key)}
          >
            <div className="segment-card-head">
              <SegmentBadge segment={segment.key} />
              <strong>{segment.scale.toLocaleString()}</strong>
            </div>
            <h2>{segmentMeta[segment.key].label}</h2>
            <p>{segment.strategy}</p>
            <div className="segment-meta-list">
              <span>当前目标：{segment.goal}</span>
              <span>推荐动作：{segment.recommendation}</span>
            </div>
          </button>
        ))}
      </section>

      <section className="detail-grid">
        <article className="card">
          <PanelTitle
            title={`${segmentMeta[current.key].label}详情`}
            helper="围绕身份定义、默认权益、推荐模板与适用触点统一沉淀分层策略。"
          />
          <div className="detail-list">
            <div>
              <span className="detail-label">身份定义</span>
              <p>{current.definition}</p>
            </div>
            <div>
              <span className="detail-label">默认展示权益</span>
              <div className="inline-token-row">
                {current.defaultBenefits.map((benefit) => (
                  <span className="subtle-badge" key={benefit}>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="detail-label">推荐模板</span>
              <p>{current.recommendedTemplate}</p>
            </div>
            <div>
              <span className="detail-label">适用触点</span>
              <div className="inline-token-row">
                {current.touchpoints.map((touchpoint) => (
                  <span className="subtle-badge" key={touchpoint}>
                    {touchpoint}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="card narrative-card">
          <PanelTitle
            title="当前主要经营目标"
            helper="不同会员阶段对应不同经营动作，确保资源投放与权益表达更精准。"
          />
          <div className="narrative-block">
            <strong>{current.goal}</strong>
            <p>{current.strategy}</p>
          </div>
          <div className="narrative-block">
            <span className="detail-label">推荐动作</span>
            <p>{current.recommendation}</p>
          </div>
        </article>
      </section>
    </div>
  )
}
