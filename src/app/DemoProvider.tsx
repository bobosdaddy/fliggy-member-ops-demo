import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type {
  Activity,
  ActivityAction,
  BenefitConfig,
  CampaignFormValues,
  Goal,
  GoalAnalytics,
  PerformanceEntry,
  PlacementConfig,
  PlacementDraft,
  PlacementKey,
  Role,
  Segment,
  ToastMessage,
} from './types'
import { DemoContext } from './demoContext'
import {
  analyticsByGoal,
  initialActivities,
  initialBenefits,
  initialPlacements,
  performanceEntries,
  roleMeta,
  templates,
} from '../data/mockData'

const pad = (value: number) => String(value).padStart(2, '0')

const nowStamp = () => {
  const current = new Date()
  return `${pad(current.getMonth() + 1)}.${pad(current.getDate())} ${pad(
    current.getHours(),
  )}:${pad(current.getMinutes())}`
}

const createPerformance = (
  goal: Goal,
  activityId: string,
  sequence: number,
): PerformanceEntry => {
  const base = {
    acquisition: { exposure: 168000, clicks: 23600, conversions: 3800, gmv: 2860000 },
    activation: { exposure: 78000, clicks: 13400, conversions: 3200, gmv: 2480000 },
    repeat: { exposure: 42000, clicks: 7400, conversions: 1900, gmv: 1960000 },
    retention: { exposure: 16000, clicks: 5100, conversions: 980, gmv: 1160000 },
  }[goal]

  return {
    activityId,
    exposure: base.exposure + sequence * 2400,
    clicks: base.clicks + sequence * 520,
    conversions: base.conversions + sequence * 120,
    gmv: base.gmv + sequence * 160000,
  }
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('merchantAdmin')
  const [benefits, setBenefits] = useState<Record<Segment, BenefitConfig>>(() =>
    structuredClone(initialBenefits),
  )
  const [activityList, setActivityList] = useState<Activity[]>(() =>
    structuredClone(initialActivities),
  )
  const [placementMap, setPlacementMap] = useState<Record<PlacementKey, PlacementConfig>>(
    () => structuredClone(initialPlacements),
  )
  const [analytics] = useState<Record<Goal, GoalAnalytics>>(() =>
    structuredClone(analyticsByGoal),
  )
  const [performance, setPerformance] = useState<Record<string, PerformanceEntry>>(
    () => structuredClone(performanceEntries),
  )
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const toastSeed = useRef(0)

  useEffect(() => {
    document.title = `${roleMeta[role].label} · 飞猪品牌会员自运营平台`
  }, [role])

  const pushToast = (title: string, detail: string) => {
    toastSeed.current += 1
    const id = toastSeed.current

    setToasts((current) => [{ id, title, detail }, ...current].slice(0, 3))

    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
    }, 2800)
  }

  const saveBenefits = (
    segment: Segment,
    next: Omit<BenefitConfig, 'updatedAt'>,
  ) => {
    const updatedAt = nowStamp()
    setBenefits((current) => ({
      ...current,
      [segment]: {
        ...next,
        updatedAt,
      },
    }))

    pushToast('权益配置已保存', `${next.title} 已同步到前台体验与触点展示。`)
  }

  const createActivity = (values: CampaignFormValues, action: ActivityAction) => {
    const id = `act-${Date.now()}`
    const updatedAt = nowStamp()
    const status =
      action === 'draft' ? 'draft' : action === 'submit' ? 'pending' : 'running'

    const nextActivity: Activity = {
      id,
      ...values,
      status,
      updatedAt,
    }

    setActivityList((current) => [nextActivity, ...current])

    setPlacementMap((current) => {
      const next = structuredClone(current)
      values.placements.forEach((placementKey) => {
        next[placementKey].updatedAt = updatedAt
        next[placementKey].mounts.unshift({
          id: `mount-${placementKey}-${id}`,
          activityId: id,
          audience: values.segment,
          enabled: action !== 'draft',
          version: values.title,
          updatedAt,
        })
      })
      return next
    })

    setPerformance((current) => ({
      ...current,
      [id]: createPerformance(values.goal, id, activityList.length + 1),
    }))

    if (action === 'draft') {
      pushToast(
        '活动草稿已保存',
        `${values.name} 已进入工作台，可继续完成触点配置与发布操作。`,
      )
    } else if (action === 'submit') {
      pushToast(
        '活动已提交审核',
        `${values.name} 已进入工作台、触点管理和经营分析视图。`,
      )
    } else {
      pushToast(
        '活动已发布',
        `${values.name} 已在所选触点生效，前台体验与经营分析已更新。`,
      )
    }

    return id
  }

  const configurePlacement = (placementKey: PlacementKey, draft: PlacementDraft) => {
    const updatedAt = nowStamp()

    setPlacementMap((current) => {
      const next = structuredClone(current)
      const placement = next[placementKey]
      const existing = placement.mounts.find(
        (item) =>
          item.activityId === draft.activityId && item.audience === draft.audience,
      )

      placement.updatedAt = updatedAt

      if (existing) {
        existing.enabled = draft.enabled
        existing.version = draft.version
        existing.updatedAt = updatedAt
      } else {
        placement.mounts.unshift({
          id: `mount-${placementKey}-${draft.activityId}-${draft.audience}`,
          activityId: draft.activityId,
          audience: draft.audience,
          enabled: draft.enabled,
          version: draft.version,
          updatedAt,
        })
      }

      return next
    })

    setActivityList((current) =>
      current.map((activity) =>
        activity.id === draft.activityId &&
        !activity.placements.includes(placementKey)
          ? {
              ...activity,
              placements: [...activity.placements, placementKey],
              updatedAt,
            }
          : activity,
      ),
    )

    pushToast(
      '触点配置已更新',
      `${draft.version} 已同步到 ${placementMap[placementKey].name} 的前台体验位。`,
    )
  }

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        benefits,
        saveBenefits,
        templates,
        activities: activityList,
        createActivity,
        placements: placementMap,
        configurePlacement,
        analytics,
        performance,
        toasts,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}
