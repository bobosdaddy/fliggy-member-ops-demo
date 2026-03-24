import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { PanelTitle, SegmentBadge } from '../components/Primitives'
import {
  audienceInsights,
  opportunityPools,
  segmentMeta,
} from '../data/mockData'
import type { Segment } from '../app/types'

export function SegmentsPage() {
  const [activeSegment, setActiveSegment] = useState<Segment>('guest')
  const current = audienceInsights.find((item) => item.key === activeSegment) ?? audienceInsights[0]

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="会员身份"
        title="会员身份与经营分层"
        description="将飞猪渠道内品牌会员按身份状态拆分，明确不同经营目标、默认展示策略与推荐动作。"
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
            <div>
              <span className="detail-label">高潜提示</span>
              <p>{current.highPotentialHint}</p>
            </div>
          </div>
        </article>

        <article className="card narrative-card">
          <PanelTitle
            title="高潜经营池"
            helper="补充观察激活、升级和保级的重点机会人群，帮助运营快速识别优先动作。"
          />
          <div className="segment-stack">
            {opportunityPools.map((pool) => (
              <div className="segment-card-inline" key={pool.label}>
                <div>
                  <span className="detail-label">{pool.label}</span>
                  <strong>{pool.value}</strong>
                  <p>{pool.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
