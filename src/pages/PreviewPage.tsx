import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { ChannelKey, Segment } from '../app/types'
import {
  channelMeta,
  segmentMeta,
  segmentOrder,
  touchpointKeys,
} from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle, SegmentBadge, StatusPill } from '../components/Primitives'

export function PreviewPage() {
  const { benefits, activities } = useDemo()
  const [activeSegment, setActiveSegment] = useState<Segment>('lapsed')
  const [activeTouchpoint, setActiveTouchpoint] = useState<ChannelKey>('store')

  const benefit = benefits[activeSegment]
  const matchedActivities = activities.filter(
    (a) =>
      a.status === 'running' &&
      a.segment === activeSegment &&
      a.channels.includes(activeTouchpoint),
  )

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="前台预览"
        title="品牌会员前台体验"
        description="切换不同会员人群和触点，查看当前前台展示内容与活动承接方式。"
      />

      <section className="preview-controls">
        <div className="control-group">
          <span className="detail-label">用户人群</span>
          <div className="tab-row compact">
            {segmentOrder.map((segment) => (
              <button
                className={segment === activeSegment ? 'tab-button active' : 'tab-button'}
                key={segment}
                onClick={() => setActiveSegment(segment)}
              >
                {segmentMeta[segment].short}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <span className="detail-label">触点切换</span>
          <div className="tab-row compact">
            {touchpointKeys.map((tp) => (
              <button
                className={tp === activeTouchpoint ? 'tab-button active' : 'tab-button'}
                key={tp}
                onClick={() => setActiveTouchpoint(tp)}
              >
                {channelMeta[tp].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="preview-scene-grid">
        <article className="card narrative-card">
          <PanelTitle
            title="当前用户视角"
            helper="统一查看不同人群与触点组合下的前台呈现，校准权益表达和策略承接。"
          />
          <div className="detail-list">
            <div>
              <span className="detail-label">会员人群</span>
              <p>{segmentMeta[activeSegment].label}</p>
            </div>
            <div>
              <span className="detail-label">当前触点</span>
              <p>{channelMeta[activeTouchpoint].label}</p>
            </div>
            <div>
              <span className="detail-label">触点说明</span>
              <p>{channelMeta[activeTouchpoint].description}</p>
            </div>
          </div>
        </article>

        <article className="front-stage">
          <div className="stage-header">
            <div>
              <span className="eyebrow">飞猪前台</span>
              <h2>希尔顿中国旗舰店</h2>
            </div>
            <SegmentBadge segment={activeSegment} />
          </div>

          <div className="preview-banner stage-banner">
            <div>
              <h2>{benefit.title}</h2>
              <p>{benefit.subtitle}</p>
            </div>
            <span className="action-button primary">{benefit.cta}</span>
          </div>

          <div className="benefit-card-list">
            {benefit.benefitCards.map((card) => (
              <div className="benefit-item" key={card}>
                <span className="eyebrow">会员权益</span>
                <strong>{card}</strong>
              </div>
            ))}
          </div>

          {benefit.tierNote ? (
            <div className="tier-note">
              <strong>等级提示</strong>
              <p>{benefit.tierNote}</p>
            </div>
          ) : null}

          {benefit.progressNote ? (
            <div className="tier-note accent">
              <strong>{activeSegment === 'gold' ? '保级进度' : '升级进度'}</strong>
              <p>{benefit.progressNote}</p>
            </div>
          ) : null}

          <div className="front-activity-list">
            {matchedActivities.length > 0 ? (
              matchedActivities.map((activity) => (
                <div className="front-activity-card" key={activity.id}>
                  <div className="mounted-item-head">
                    <div className="inline-token-row">
                      <GoalBadge goal={activity.goal} />
                      <span className="meta-chip">{channelMeta[activeTouchpoint].label}</span>
                    </div>
                    <StatusPill status={activity.status} />
                  </div>
                  <h3>{activity.title}</h3>
                  <p>{activity.subtitle}</p>
                  {activity.landingHighlights && activity.landingHighlights.length > 0 && (
                    <div className="inline-token-row" style={{ marginTop: '0.5rem' }}>
                      {activity.landingHighlights.map((hl) => (
                        <span className="subtle-badge" key={hl}>{hl}</span>
                      ))}
                    </div>
                  )}
                  <div className="front-activity-footer">
                    <span className="action-button secondary">{activity.cta}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <strong>当前触点暂无匹配策略</strong>
                <p>该人群在此触点未配置运营策略，将展示默认权益内容。</p>
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  )
}
