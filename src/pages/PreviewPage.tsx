import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { PlacementKey, PreviewMode, Segment } from '../app/types'
import { PageHeader } from '../components/PageHeader'
import { BudgetStatusPill, GoalBadge, PanelTitle, SegmentBadge, StatusPill } from '../components/Primitives'
import {
  placementMeta,
  placementOrder,
  segmentMeta,
  segmentOrder,
} from '../data/mockData'

export function PreviewPage() {
  const { benefits, activities, placements } = useDemo()
  const [activeSegment, setActiveSegment] = useState<Segment>('guest')
  const [activePlacement, setActivePlacement] = useState<PlacementKey>('store')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('template')

  const benefit = benefits[activeSegment]
  const activitiesById = Object.fromEntries(activities.map((activity) => [activity.id, activity]))
  const mountedActivities = placements[activePlacement].mounts
    .filter((mount) => mount.enabled && mount.audience === activeSegment)
    .map((mount) => ({
      mount,
      activity: activitiesById[mount.activityId],
    }))
    .filter((item) => item.activity)
    .filter((item) =>
      previewMode === 'template'
        ? item.activity.kind === 'template'
        : item.activity.kind === 'marketing',
    )

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="前台预览"
        title="品牌会员前台体验"
        description="切换会员身份、触点和活动模式，查看后台配置如何作用到飞猪前台的会员经营表达。"
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

        <div className="control-group">
          <span className="detail-label">活动模式</span>
          <div className="tab-row compact">
            {[
              { key: 'template', label: '基础模板模式' },
              { key: 'marketing', label: '营销加码模式' },
            ].map((item) => (
              <button
                className={item.key === previewMode ? 'tab-button active' : 'tab-button'}
                key={item.key}
                onClick={() => setPreviewMode(item.key as PreviewMode)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="preview-scene-grid">
        <article className="card narrative-card">
          <PanelTitle
            title="当前用户视角"
            helper="统一查看当前会员身份、触点与活动模式下的前台呈现，校准权益表达和加码节奏。"
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
              <span className="detail-label">展示模式</span>
              <p>{previewMode === 'template' ? '基础模板模式' : '营销加码模式'}</p>
            </div>
            <div>
              <span className="detail-label">默认触点策略</span>
              <p>{placements[activePlacement].defaultStrategy}</p>
            </div>
          </div>
        </article>

        <article className={previewMode === 'marketing' ? 'front-stage boosted' : 'front-stage'}>
          <div className="stage-header">
            <div>
              <span className="eyebrow">飞猪前台</span>
              <h2>希尔顿中国旗舰店</h2>
            </div>
            <SegmentBadge segment={activeSegment} />
          </div>

          <div className={previewMode === 'marketing' ? 'preview-banner stage-banner boost' : 'preview-banner stage-banner'}>
            <div>
              {previewMode === 'marketing' ? (
                <span className="meta-chip highlight">限时加码中</span>
              ) : null}
              <h2>{benefit.title}</h2>
              <p>{benefit.subtitle}</p>
            </div>
            <span className="action-button primary">
              {previewMode === 'marketing' ? '立即抢订' : benefit.cta}
            </span>
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
                <div
                  className={
                    previewMode === 'marketing'
                      ? 'front-activity-card marketing'
                      : 'front-activity-card'
                  }
                  key={mount.id}
                >
                  <div className="mounted-item-head">
                    <div className="inline-token-row">
                      <GoalBadge goal={activity.goal} />
                      <span className="meta-chip">
                        {previewMode === 'marketing' ? activity.activityTypeLabel : placementMeta[activePlacement].label}
                      </span>
                    </div>
                    <div className="inline-token-row">
                      <StatusPill status={activity.status} />
                      <BudgetStatusPill status={activity.budgetStatus} />
                    </div>
                  </div>
                  <h3>{activity.title}</h3>
                  <p>{activity.subtitle}</p>
                  <div className="front-activity-footer">
                    <span className="action-button secondary">
                      {previewMode === 'marketing' ? activity.cta : activity.cta}
                    </span>
                    <span className="meta-chip">
                      {previewMode === 'marketing' ? activity.estimatedLift : mount.version}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <strong>
                  {previewMode === 'marketing'
                    ? '当前触点暂无营销加码版本'
                    : '当前触点未配置模板活动版本'}
                </strong>
                <p>
                  {previewMode === 'marketing'
                    ? '系统将继续展示基础权益内容，可切回基础模板模式查看常态承接版本。'
                    : '系统将按默认权益策略展示当前会员身份的基础内容。'}
                </p>
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  )
}
