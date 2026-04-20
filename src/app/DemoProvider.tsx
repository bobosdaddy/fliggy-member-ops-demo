import { useEffect, useRef, useState, type ReactNode } from 'react'
import type {
  ActivityAction,
  BenefitItem,
  PerformanceEntry,
  Role,
  ScenarioAnalytics,
  ScenarioKey,
  Strategy,
  StrategyFormValues,
  ToastMessage,
} from './types'
import { DemoContext } from './demoContext'
import {
  analyticsByScenario,
  initialBenefits,
  initialStrategies,
  performanceEntries,
  roleMeta,
  scenarios,
} from '../data/mockData'

const pad = (v: number) => String(v).padStart(2, '0')

const nowStamp = () => {
  const d = new Date()
  return `${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('merchantAdmin')
  const [benefits, setBenefits] = useState<BenefitItem[]>(() => structuredClone(initialBenefits))
  const [strategyList, setStrategyList] = useState<Strategy[]>(() => structuredClone(initialStrategies))
  const [analytics] = useState<Record<ScenarioKey, ScenarioAnalytics>>(() => structuredClone(analyticsByScenario))
  const [performance, setPerformance] = useState<Record<string, PerformanceEntry>>(() => structuredClone(performanceEntries))
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const toastSeed = useRef(0)

  useEffect(() => {
    document.title = `${roleMeta[role].label} · 飞猪品牌会员智能经营平台`
  }, [role])

  const pushToast = (title: string, detail: string) => {
    toastSeed.current += 1
    const id = toastSeed.current
    setToasts((cur) => [{ id, title, detail }, ...cur].slice(0, 3))
    window.setTimeout(() => {
      setToasts((cur) => cur.filter((t) => t.id !== id))
    }, 2800)
  }

  const toggleBenefit = (id: string) => {
    setBenefits((cur) =>
      cur.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b)),
    )
    pushToast('权益配置已更新', '权益开关状态已同步。')
  }

  const updateBenefit = (id: string, patch: Partial<BenefitItem>) => {
    setBenefits((cur) =>
      cur.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    )
    pushToast('权益已保存', '权益内容修改已生效。')
  }

  const createStrategy = (values: StrategyFormValues, action: ActivityAction) => {
    const id = `str-${Date.now()}`
    const ts = nowStamp()
    const status = action === 'draft' ? 'draft' : action === 'submit' ? 'pending' : 'running'

    const next: Strategy = {
      id,
      name: values.name,
      scenario: values.scenario,
      conditions: values.conditions,
      channels: values.channels,
      creative: {
        id: `cr-${Date.now()}`,
        name: `${values.name} 素材`,
        mode: values.creativeMode,
        link: values.manualLink,
        landingTitle: values.landingTitle,
        landingSubtitle: values.landingSubtitle,
        landingCta: values.landingCta,
        landingHighlights: values.landingHighlights,
        benefitIds: values.benefitIds,
        updatedAt: ts,
      },
      benefitIds: values.benefitIds,
      status,
      startDate: values.startDate,
      endDate: values.endDate,
      note: values.note,
      updatedAt: ts,
    }

    setStrategyList((cur) => [next, ...cur])

    const base = { registration: 280000, firstOrder: 180000, repurchase: 120000 }[values.scenario]
    const seq = strategyList.length + 1
    setPerformance((cur) => ({
      ...cur,
      [id]: {
        strategyId: id,
        exposure: base + seq * 2400,
        clicks: Math.round(base * 0.15) + seq * 520,
        conversions: Math.round(base * 0.045) + seq * 120,
        gmv: Math.round(base * 12) + seq * 160000,
      },
    }))

    const actionLabel = action === 'draft' ? '策略草稿已保存' : action === 'submit' ? '策略已提交审核' : '策略已发布'
    pushToast(actionLabel, `${values.name} 已在所选渠道生效。`)
    return id
  }

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        benefits,
        toggleBenefit,
        updateBenefit,
        scenarios,
        strategies: strategyList,
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
