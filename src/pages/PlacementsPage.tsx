import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { PlacementDraft, PlacementKey, Segment } from '../app/types'
import {
  placementMeta,
  placementOrder,
  roleMeta,
  segmentMeta,
  segmentOrder,
} from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { PanelTitle, SegmentBadge, StatusPill } from '../components/Primitives'

function buildPlacementDraft(
  placementKey: PlacementKey,
  placements: ReturnType<typeof useDemo>['placements'],
  activities: ReturnType<typeof useDemo>['activities'],
): PlacementDraft {
  const currentPlacement = placements[placementKey]
  const firstMount = currentPlacement.mounts[0]
  const firstActivity = activities[0]

  return {
    activityId: firstMount?.activityId ?? firstActivity?.id ?? '',
    audience: firstMount?.audience ?? firstActivity?.previewSegment ?? 'guest',
    enabled: firstMount?.enabled ?? true,
    version: firstMount?.version ?? firstActivity?.title ?? '默认展示版本',
  }
}

export function PlacementsPage() {
  const { role, activities, placements, configurePlacement } = useDemo()
  const [activePlacement, setActivePlacement] = useState<PlacementKey>('store')
  const [draft, setDraft] = useState<PlacementDraft>(() =>
    buildPlacementDraft('store', placements, activities),
  )

  const activePlacementConfig = placements[activePlacement]
  const activitiesById = Object.fromEntries(activities.map((activity) => [activity.id, activity]))

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="触点管理"
        title="飞猪阵地触点配置"
        description="把模板活动和营销活动挂到店铺首页、详情页、会员中心和订单完成页，让配置真正作用于前台体验。"
      />

      <section className="placement-card-grid">
        {placementOrder.map((placementKey) => {
          const placement = placements[placementKey]
          return (
            <button
              className={
                placementKey === activePlacement ? 'placement-card active' : 'placement-card'
              }
              key={placementKey}
              onClick={() => {
                setActivePlacement(placementKey)
                setDraft(buildPlacementDraft(placementKey, placements, activities))
              }}
            >
              <div className="placement-head">
                <strong>{placementMeta[placementKey].label}</strong>
                <span className="meta-chip">{placement.mounts.length} 个活动</span>
              </div>
              <p>{placement.defaultStrategy}</p>
              <div className="inline-token-row">
                {placement.mounts.slice(0, 3).map((mount) => (
                  <span className="subtle-badge" key={mount.id}>
                    {segmentMeta[mount.audience].short}
                  </span>
                ))}
              </div>
              <span className="placement-update">最近更新 {placement.updatedAt}</span>
            </button>
          )
        })}
      </section>

      <section className="split-layout">
        <article className="card form-card">
          <PanelTitle
            title={`${placementMeta[activePlacement].label}配置`}
            helper={placements[activePlacement].narrative}
          />

          <div className="form-grid">
            <label className="field">
              <span>挂载活动</span>
              <select
                value={draft.activityId}
                onChange={(event) => {
                  const nextActivity = activitiesById[event.target.value]
                  setDraft({
                    activityId: event.target.value,
                    audience: nextActivity?.previewSegment ?? draft.audience,
                    enabled: draft.enabled,
                    version: nextActivity?.title ?? draft.version,
                  })
                }}
              >
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>目标人群</span>
              <select
                value={draft.audience}
                onChange={(event) =>
                  setDraft({ ...draft, audience: event.target.value as Segment })
                }
              >
                {segmentOrder.map((segment) => (
                  <option key={segment} value={segment}>
                    {segmentMeta[segment].label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>展示文案版本</span>
              <input
                value={draft.version}
                onChange={(event) => setDraft({ ...draft, version: event.target.value })}
              />
            </label>

            <label className="toggle-row">
              <span>启停状态</span>
              <button
                className={draft.enabled ? 'toggle-switch active' : 'toggle-switch'}
                onClick={() => setDraft({ ...draft, enabled: !draft.enabled })}
                type="button"
              >
                <span />
                {draft.enabled ? '已启用' : '已停用'}
              </button>
            </label>
          </div>

          <div className="form-action-bar">
            <button
              className="action-button primary"
              onClick={() => configurePlacement(activePlacement, draft)}
            >
              保存触点配置
            </button>
            <span className="meta-chip">{roleMeta[role].label}</span>
          </div>
        </article>

        <article className="card">
          <PanelTitle
            title="当前已挂载活动"
            helper="查看当前触点已挂载的模板活动与营销活动版本、适用人群和运行状态。"
          />
          <div className="mounted-list">
            {activePlacementConfig.mounts.map((mount) => {
              const activity = activitiesById[mount.activityId]
              return (
                <button
                  className="mounted-item"
                  key={mount.id}
                  onClick={() =>
                    setDraft({
                      activityId: mount.activityId,
                      audience: mount.audience,
                      enabled: mount.enabled,
                      version: mount.version,
                    })
                  }
                >
                  <div className="mounted-item-head">
                    <strong>{activity?.name ?? '未命名活动'}</strong>
                    {activity ? <StatusPill status={activity.status} /> : null}
                  </div>
                  <div className="inline-token-row">
                    <SegmentBadge segment={mount.audience} />
                    <span className="meta-chip">{mount.version}</span>
                  </div>
                  <p>{activity?.subtitle ?? '当前触点使用默认展示策略。'}</p>
                </button>
              )
            })}
          </div>
        </article>
      </section>
    </div>
  )
}
