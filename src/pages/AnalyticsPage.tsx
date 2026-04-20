import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import type { ScenarioKey } from '../app/types'
import { scenarioMeta, scenarioOrder, analyticsByScenario } from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { MetricCard, ScenarioBadge, StatusPill, PanelTitle } from '../components/Primitives'
import { Sparkline, FunnelChart, ContributionBars } from '../components/Charts'

type ReportView = 'strategy' | 'scenario'

export function AnalyticsPage() {
  const { strategies, performance } = useDemo()
  const [view, setView] = useState<ReportView>('scenario')
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('registration')
  const [reportGenerated, setReportGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)

  const scenarioData = analyticsByScenario[selectedScenario]

  const handleGenerateReport = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setReportGenerated(true)
    }, 1200)
  }

  return (
    <>
      <PageHeader
        eyebrow="会员中心"
        title="数据分析"
        description="按策略或按场景生成投放分析报告，一键导出。"
      />

      {/* 视图切换 */}
      <div className="analytics-view-tabs">
        <button
          type="button"
          className={`analytics-view-tab ${view === 'scenario' ? 'active' : ''}`}
          onClick={() => { setView('scenario'); setReportGenerated(false) }}
        >
          📊 按场景分析
        </button>
        <button
          type="button"
          className={`analytics-view-tab ${view === 'strategy' ? 'active' : ''}`}
          onClick={() => { setView('strategy'); setReportGenerated(false) }}
        >
          📋 按策略分析
        </button>
      </div>

      {/* ── 按场景 ── */}
      {view === 'scenario' && (
        <>
          <div className="scenario-tab-bar">
            {scenarioOrder.map((key) => (
              <button
                key={key}
                type="button"
                className={`scenario-tab ${selectedScenario === key ? 'active' : ''}`}
                onClick={() => { setSelectedScenario(key); setReportGenerated(false) }}
              >
                {scenarioMeta[key].label}
              </button>
            ))}
          </div>

          <div className="report-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateReport}
              disabled={generating}
            >
              {generating ? '生成中…' : '一键生成分析报告'}
            </button>
            {reportGenerated && (
              <span className="badge tone-success">报告已生成</span>
            )}
          </div>

          <section className="section">
            <PanelTitle>{scenarioMeta[selectedScenario].label} · 投放概览</PanelTitle>
            <div className="metric-grid">
              {scenarioData.summary.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>
          </section>

          <section className="section">
            <PanelTitle>转化趋势（近 7 日）</PanelTitle>
            <Sparkline data={scenarioData.trend} />
          </section>

          <div className="analytics-two-col">
            <section className="section">
              <PanelTitle>转化漏斗</PanelTitle>
              <FunnelChart steps={scenarioData.funnel} />
            </section>
            <section className="section">
              <PanelTitle>渠道贡献</PanelTitle>
              <ContributionBars items={scenarioData.channelContribution} />
            </section>
          </div>

          {reportGenerated && (
            <section className="section report-summary">
              <PanelTitle>📄 报告摘要</PanelTitle>
              <div className="report-card">
                <h4>{scenarioMeta[selectedScenario].label} 全量策略投放报告</h4>
                <ul>
                  <li>覆盖策略数：{strategies.filter((s) => s.scenario === selectedScenario).length} 条</li>
                  <li>总曝光：{scenarioData.summary[1]?.value}</li>
                  <li>总转化：{scenarioData.summary[2]?.value}</li>
                  <li>GMV 贡献：{scenarioData.summary[3]?.value}</li>
                </ul>
                <button type="button" className="btn btn-outline btn-sm">下载完整报告</button>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── 按策略 ── */}
      {view === 'strategy' && (
        <>
          <div className="report-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateReport}
              disabled={generating}
            >
              {generating ? '生成中…' : '一键生成策略报告'}
            </button>
            {reportGenerated && (
              <span className="badge tone-success">报告已生成</span>
            )}
          </div>

          <section className="section">
            <PanelTitle>全部策略投放数据</PanelTitle>
            {strategies.length === 0 ? (
              <p className="empty-hint">暂无策略数据</p>
            ) : (
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>策略名称</th>
                      <th>场景</th>
                      <th>状态</th>
                      <th>曝光</th>
                      <th>点击</th>
                      <th>转化</th>
                      <th>GMV</th>
                      <th>CTR</th>
                      <th>CVR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategies.map((s) => {
                      const p = performance[s.id]
                      const ctr = p ? ((p.clicks / p.exposure) * 100).toFixed(1) + '%' : '-'
                      const cvr = p ? ((p.conversions / p.clicks) * 100).toFixed(1) + '%' : '-'
                      return (
                        <tr key={s.id}>
                          <td className="cell-primary">{s.name}</td>
                          <td><ScenarioBadge scenario={s.scenario} /></td>
                          <td><StatusPill status={s.status} /></td>
                          <td>{p?.exposure?.toLocaleString() ?? '-'}</td>
                          <td>{p?.clicks?.toLocaleString() ?? '-'}</td>
                          <td>{p?.conversions?.toLocaleString() ?? '-'}</td>
                          <td>¥{((p?.gmv ?? 0) / 10000).toFixed(0)}万</td>
                          <td>{ctr}</td>
                          <td>{cvr}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {reportGenerated && (
            <section className="section report-summary">
              <PanelTitle>📄 单条策略报告</PanelTitle>
              <div className="report-card">
                <p>已为 {strategies.length} 条策略生成独立分析报告。</p>
                <button type="button" className="btn btn-outline btn-sm">下载全部报告</button>
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
