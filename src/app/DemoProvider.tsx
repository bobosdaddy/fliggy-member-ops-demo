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
  Goal,
  GoalAnalytics,
  PerformanceEntry,
  Role,
  Segment,
  StrategyFormValues,
  ToastMessage,
} from './types'
import { DemoContext } from './demoContext'
import {
  analyticsByGoal,
  initialActivities,
  initialBenefits,
  performanceEntries,
  roleMeta,
  scenarios,
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
    acquisition: { exposure: 300000, clicks: 45000, conversions: 8000, gmv: 5500000 },
    recall: { exposure: 28000, clicks: 8200, conversions: 3100, gmv: 2700000 },
    upgrade: { exposure: 10000, clicks: 4400, conversions: 1400, gmv: 1600000 },
    browseNoBuy: { exposure: 40000, clicks: 13800, conversions: 5000, gmv: 3000000 },
    campaign: { exposure: 84000, clicks: 18000, conversions: 6600, gmv: 5600000 },
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
  const [analytics] = useState<Record<Goal, GoalAnalytics>>(() =>
    structuredClone(analyticsByGoal),
  )
  const [performance, setPerformance] = useState<Record<string, PerformanceEntry>>(
    () => structuredClone(performanceEntries),
  )
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const toastSeed = useRef(0)

  useEffect(() => {
    document.title = `${roleMeta[role].label} · 飞猪品牌会员智能运营平台`
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

    pushToast('权益配置已保存', `${next.title} 已同步到前台体验与触达渠道。`)
  }

  const createStrategy = (values: StrategyFormValues, action: ActivityAction) => {
    const id = `act-${Date.now()}`
    const updatedAt = nowStamp()
    const status =
      action === 'draft' ? 'draft' : action === 'submit' ? 'pending' : 'running'

    const nextActivity: Activity = {
      id,
      name: values.name,
      goal: values.goal,
      segment: values.segment,
      channels: values.channels,
      startDate: values.startDate,
      endDate: values.endDate,
      title: values.title,
      subtitle: values.subtitle,
      cta: values.cta,
      note: values.note,
      status,
      updatedAt,
      scenarioId: values.scenarioId,
      landingHighlights: values.landingHighlights,
      benefits: values.benefits,
      benefitTitle: values.benefitTitle,
      benefitCta: values.benefitCta,
    }

    setActivityList((current) => [nextActivity, ...current])

    setPerformance((current) => ({
      ...current,
      [id]: createPerformance(values.goal, id, activityList.length + 1),
    }))

    if (action === 'draft') {
      pushToast(
        '策略草稿已保存',
        `${values.name} 已保存到工作台，可继续完善后发布。`,
      )
    } else if (action === 'submit') {
      pushToast(
        '策略已提交审核',
        `${values.name} 已提交，审核通过后将自动生效。`,
      )
    } else {
      pushToast(
        '策略已发布',
        `${values.name} 已在所选渠道生效，前台体验与数据分析已更新。`,
      )
    }

    return id
  }

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        benefits,
        saveBenefits,
        scenarios,
        activities: activityList,
        createStrategy,
        analytics,
        performance,
        toasts,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}
