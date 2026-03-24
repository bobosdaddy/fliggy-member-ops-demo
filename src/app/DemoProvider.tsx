import { useEffect, useRef, useState, type ReactNode } from 'react'
import type {
  Activity,
  ActivityAction,
  AudienceKey,
  BenefitConfig,
  CampaignFormValues,
  ChannelKey,
  ChannelPlanDraft,
  Goal,
  MarketingFormValues,
  PerformanceEntry,
  PlacementConfig,
  PlacementDraft,
  PlacementKey,
  ResourceSlotKey,
  Role,
  Segment,
  ToastMessage,
} from './types'
import { DemoContext } from './demoContext'
import {
  audienceMeta,
  brandProfile,
  initialActivities,
  initialBenefits,
  initialPlacements,
  marketingPresets,
  placementMeta,
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

const activityStatusByAction: Record<ActivityAction, Activity['status']> = {
  draft: 'draft',
  submit: 'pending',
  publish: 'running',
}

const resourcePlacementMap: Partial<Record<ResourceSlotKey, PlacementKey>> = {
  storeBanner: 'store',
  detailZone: 'detail',
  memberCenterSpot: 'center',
  venueSpot: 'store',
  brandHallBanner: 'store',
  searchBenefitSpot: 'detail',
}

const dedupe = <T,>(items: T[]) => [...new Set(items)]

const inferTemplateAudience = (goal: Goal, segment: Segment): AudienceKey => {
  if (goal === 'activation') {
    return 'newMember'
  }

  if (goal === 'repeat' || goal === 'upgrade' || segment === 'silver') {
    return 'silverPotential'
  }

  if (goal === 'retention' || segment === 'gold') {
    return 'goldRetention'
  }

  if (segment === 'registered') {
    return 'registered'
  }

  return 'guest'
}

const createTemplatePerformance = (goal: Goal, sequence: number): PerformanceEntry => {
  const base = {
    acquisition: { exposure: 168000, clicks: 23200, conversions: 3600, gmv: 0 },
    activation: { exposure: 78000, clicks: 13400, conversions: 3200, gmv: 318000 },
    repeat: { exposure: 42000, clicks: 7600, conversions: 1880, gmv: 286000 },
    upgrade: { exposure: 26000, clicks: 6800, conversions: 940, gmv: 244000 },
    retention: { exposure: 16000, clicks: 5100, conversions: 980, gmv: 268000 },
  }[goal]

  return {
    activityId: '',
    exposure: base.exposure + sequence * 2600,
    clicks: base.clicks + sequence * 520,
    conversions: base.conversions + sequence * 120,
    gmv: base.gmv + sequence * 22000,
  }
}

const createMarketingPerformance = (
  goal: Goal,
  budget: number,
  reach: number,
  sequence: number,
): PerformanceEntry => {
  const clickRate = {
    acquisition: 0.18,
    activation: 0.31,
    repeat: 0.23,
    upgrade: 0.26,
    retention: 0.35,
  }[goal]

  const conversionRate = {
    acquisition: 0.16,
    activation: 0.19,
    repeat: 0.24,
    upgrade: 0.12,
    retention: 0.21,
  }[goal]

  const clicks = Math.round(reach * clickRate)
  const conversions = Math.round(clicks * conversionRate)
  const gmvBase = {
    acquisition: 0,
    activation: 268000,
    repeat: 298000,
    upgrade: 248000,
    retention: 236000,
  }[goal]

  return {
    activityId: '',
    exposure: reach,
    clicks,
    conversions,
    gmv: gmvBase + budget * 10 + sequence * 16000,
  }
}

const templateLiftLabel: Record<Goal, string> = {
  acquisition: '入会转化率 15.4%',
  activation: '首单转化率 17.9%',
  repeat: '复购转化率 23.1%',
  upgrade: '升级达成率 8.9%',
  retention: '保级达成率 19.8%',
}

const deriveMarketingPlacements = (
  channels: ChannelKey[],
  resourceSlots: ResourceSlotKey[],
): PlacementKey[] =>
  dedupe([
    ...(channels.includes('store') ? (['store'] as PlacementKey[]) : []),
    ...(channels.includes('detail') ? (['detail'] as PlacementKey[]) : []),
    ...(channels.includes('center') ? (['center'] as PlacementKey[]) : []),
    ...(channels.includes('order') ? (['order'] as PlacementKey[]) : []),
    ...resourceSlots
      .map((slot) => resourcePlacementMap[slot])
      .filter((slot): slot is PlacementKey => Boolean(slot)),
  ])

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('merchantAdmin')
  const [benefits, setBenefits] = useState<Record<Segment, BenefitConfig>>(() =>
    structuredClone(initialBenefits),
  )
  const [activityList, setActivityList] = useState<Activity[]>(() =>
    structuredClone(initialActivities),
  )
  const [placementMap, setPlacementMap] = useState<Record<PlacementKey, PlacementConfig>>(() =>
    structuredClone(initialPlacements),
  )
  const [performance, setPerformance] = useState<Record<string, PerformanceEntry>>(() =>
    structuredClone(performanceEntries),
  )
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const toastSeed = useRef(0)

  useEffect(() => {
    document.title = `${roleMeta[role].label} · ${brandProfile.productName}`
  }, [role])

  const pushToast = (title: string, detail: string) => {
    toastSeed.current += 1
    const id = toastSeed.current

    setToasts((current) => [{ id, title, detail }, ...current].slice(0, 3))

    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
    }, 2800)
  }

  const saveBenefits = (segment: Segment, next: Omit<BenefitConfig, 'updatedAt'>) => {
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

  const attachPlacements = (
    activityId: string,
    placements: PlacementKey[],
    audience: Segment,
    version: string,
    enabled: boolean,
    updatedAt: string,
  ) => {
    setPlacementMap((current) => {
      const next = structuredClone(current)

      placements.forEach((placementKey) => {
        next[placementKey].updatedAt = updatedAt
        next[placementKey].mounts.unshift({
          id: `mount-${placementKey}-${activityId}-${audience}`,
          activityId,
          audience,
          enabled,
          version,
          updatedAt,
        })
      })

      return next
    })
  }

  const createActivity = (values: CampaignFormValues, action: ActivityAction) => {
    const id = `act-${Date.now()}`
    const updatedAt = nowStamp()
    const status = activityStatusByAction[action]
    const audienceKey = inferTemplateAudience(values.goal, values.segment)
    const preview = createTemplatePerformance(values.goal, activityList.length + 1)

    const nextActivity: Activity = {
      id,
      kind: 'template',
      activityTypeLabel: '模板活动',
      name: values.name,
      goal: values.goal,
      audienceKey,
      audienceLabel: audienceMeta[audienceKey].label,
      previewSegment: values.segment,
      placements: values.placements,
      channels: values.placements,
      resourceSlots: [],
      startDate: values.startDate,
      endDate: values.endDate,
      title: values.title,
      subtitle: values.subtitle,
      cta: values.cta,
      note: values.note,
      status,
      updatedAt,
      templateId: values.templateId,
      budget: 0,
      budgetStatus: 'none',
      estimatedReach: preview.exposure,
      estimatedLift: templateLiftLabel[values.goal],
      incrementalGmv: preview.gmv,
      roi: values.goal === 'acquisition' ? '基础运营承接' : undefined,
    }

    preview.activityId = id

    setActivityList((current) => [nextActivity, ...current])
    setPerformance((current) => ({
      ...current,
      [id]: preview,
    }))

    attachPlacements(
      id,
      values.placements,
      values.segment,
      values.title,
      action !== 'draft',
      updatedAt,
    )

    if (action === 'draft') {
      pushToast(
        '活动草稿已保存',
        `${values.name} 已进入工作台，可继续完成触点配置与发布操作。`,
      )
    } else if (action === 'submit') {
      pushToast('活动已提交审核', `${values.name} 已进入工作台、触点管理和经营分析。`)
    } else {
      pushToast('活动已发布', `${values.name} 已在所选触点生效，经营分析已同步更新。`)
    }

    return id
  }

  const createMarketingActivity = (values: MarketingFormValues, action: ActivityAction) => {
    const id = `mkt-${Date.now()}`
    const updatedAt = nowStamp()
    const status = activityStatusByAction[action]
    const placements = deriveMarketingPlacements(values.channels, values.resourceSlots)
    const preview = createMarketingPerformance(
      values.goal,
      values.totalBudget,
      values.estimatedReach,
      activityList.length + 1,
    )
    const budgetStatus =
      values.totalBudget === 0
        ? 'none'
        : action === 'publish'
          ? 'confirmed'
          : 'pending'

    const nextActivity: Activity = {
      id,
      kind: 'marketing',
      activityTypeLabel:
        values.marketingType === 'flashSale'
          ? '超级闪促'
          : values.marketingType === 'bonusPoints'
            ? '积分加赠'
            : values.marketingType === 'limitedBoost'
              ? '限时加码'
              : '会员专享礼遇',
      name: values.name,
      goal: values.goal,
      audienceKey: values.audience,
      audienceLabel: audienceMeta[values.audience].label,
      previewSegment: audienceMeta[values.audience].previewSegment,
      placements,
      channels: values.channels,
      resourceSlots: values.resourceSlots,
      startDate: values.startDate,
      endDate: values.endDate,
      title: values.title,
      subtitle: values.subtitle,
      cta: values.cta,
      note: values.note,
      status,
      updatedAt,
      presetId: values.presetId,
      budget: values.totalBudget,
      budgetStatus,
      estimatedReach: values.estimatedReach,
      estimatedLift: values.estimatedLift,
      incrementalGmv: values.estimatedIncrementalGmv,
      roi:
        values.totalBudget > 0
          ? `1:${(values.estimatedIncrementalGmv / values.totalBudget).toFixed(1)}`
          : undefined,
    }

    preview.activityId = id

    setActivityList((current) => [nextActivity, ...current])
    setPerformance((current) => ({
      ...current,
      [id]: preview,
    }))

    attachPlacements(
      id,
      placements,
      audienceMeta[values.audience].previewSegment,
      values.title,
      action !== 'draft',
      updatedAt,
    )

    if (values.totalBudget === 0) {
      pushToast('营销活动已保存', `${values.name} 当前仅使用免费渠道，预算为 0。`)
    } else if (action === 'publish') {
      pushToast(
        '营销活动已发布',
        `${values.name} 已完成预算确认，可在前台体验查看加码版本效果。`,
      )
    } else {
      pushToast(
        '营销活动已保存',
        `${values.name} 已进入活动列表，可继续确认预算与渠道组合。`,
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
      `${draft.version} 已同步到 ${placementMeta[placementKey].label} 的展示位。`,
    )
  }

  const updateActivityChannels = (draft: ChannelPlanDraft) => {
    const updatedAt = nowStamp()

    setActivityList((current) =>
      current.map((activity) => {
        if (activity.id !== draft.activityId) {
          return activity
        }

        const paidSelected = draft.channels.some((channel) =>
          ['sms', 'call', 'venue', 'search'].includes(channel),
        )
        const nextBudgetStatus =
          draft.totalBudget === 0
            ? 'none'
            : activity.status === 'pending'
              ? 'pending'
              : 'confirmed'

        return {
          ...activity,
          channels: draft.channels,
          budget: draft.totalBudget,
          budgetStatus: nextBudgetStatus,
          estimatedReach: draft.estimatedReach,
          updatedAt,
          roi:
            draft.totalBudget > 0
              ? `1:${(activity.incrementalGmv / draft.totalBudget).toFixed(1)}`
              : paidSelected
                ? activity.roi
                : '基础运营承接',
        }
      }),
    )

    if (draft.totalBudget === 0) {
      pushToast('渠道组合已更新', '当前活动仅使用免费渠道，预算为 0，适合基础运营承接。')
    } else {
      pushToast('渠道组合已更新', '已叠加付费渠道，适合冲刺阶段与高价值会员经营。')
    }
  }

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        benefits,
        saveBenefits,
        templates,
        marketingPresets,
        activities: activityList,
        createActivity,
        createMarketingActivity,
        updateActivityChannels,
        placements: placementMap,
        configurePlacement,
        performance,
        toasts,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}
