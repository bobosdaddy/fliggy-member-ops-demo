import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { PlacementKey, Segment } from '../app/types'
import {
  placementMeta,
  placementOrder,
  segmentMeta,
  segmentOrder,
} from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle, SegmentBadge, StatusPill } from '../components/Primitives'

export function PreviewPage() {
  const { benefits, activities, placements } = useDemo()
  const [activeSegment, setActiveSegment] = useState<Segment>('guest')
  const [activePlacement, setActivePlacement] = useState<PlacementKey>('store')

  const benefit = benefits[activeSegment]
  const activitiesById = Object.fromEntries(activities.map((activity) => [activity.id, activity]))
  const mountedActivities = placements[activePlacement].mounts
    .filter((mount) => mount.enabled && mount.audience === activeSegment)
    .map((mount) => ({
      mount,
      activity: activitiesById[mount.activityId],
    }))
    .filter((item) => item.activity)

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="前台体验"
        title="品牌会员前台体验"
        description="切换不同会员身份和触点，查看当前前台展示内容与活动承接方式。"
      />

      <section className="preview-controls">
        <div className="control-group">
          <span className="detail-label">用户身份</span>
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
            {placementOrder.map((placement) => (
              <button
                className={placement === activePlacement ? 'tab-button active' : 'tab-button'}
                key={placement}
                onClick={() => setActivePlacement(placement)}
              >
                {placementMeta[placement].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="preview-scene-grid">
        <article className="card narrative-card">
          <PanelTitle
            title="当前用户视角"
            helper="统一查看不同会员身份与触点组合下的前台呈现，校准权益表达和活动挂载策略。"
          />
          <div className="detail-list">
            <div>
              <span className="detail-label">会员身份</span>
              <p>{segmentMeta[activeSegment].label}</p>
            </div>
            <div>
              <span className="detail-label">当前触点</span>
              <p>{placementMeta[activePlacement].label}</p>
            </div>
            <div>
              <span className="detail-label">默认触点策略</span>
              <p>{placements[activePlacement].defaultStrategy}</p>
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
            {mountedActivities.length > 0 ? (
              mountedActivities.map(({ mount, activity }) => (
                <div className="front-activity-card" key={mount.id}>
                  <div className="mounted-item-head">
                    <div className="inline-token-row">
                      <GoalBadge goal={activity.goal} />
                      <span className="meta-chip">{placementMeta[activePlacement].label}</span>
                    </div>
                    <StatusPill status={activity.status} />
                  </div>
                  <h3>{activity.title}</h3>
                  <p>{activity.subtitle}</p>
                  <div className="front-activity-footer">
                    <span className="action-button secondary">{activity.cta}</span>
                    <span className="meta-chip">{mount.version}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <strong>当前触点未配置活动版本</strong>
                <p>系统将按默认权益策略展示当前会员身份的基础内容。</p>
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  )
}
