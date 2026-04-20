import { useNavigate } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import { dashboardMetrics, dashboardTrend, scenarioMeta, quickTodos } from '../data/mockData'
import { MetricCard, ScenarioBadge, StatusPill, PanelTitle } from '../components/Primitives'
import { Sparkline } from '../components/Charts'
import { PageHeader } from '../components/PageHeader'

export function DashboardPage() {
  const { strategies, performance } = useDemo()
  const nav = useNavigate()

  const runningStrategies = strategies.filter((s) => s.status === 'running')

  return (
    <>
      <PageHeader
        eyebrow="会员中心"
        title="工作台"
        description="品牌会员运营全景概览，掌握核心经营指标与策略执行情况。"
      />

      {/* 核心指标 */}
      <section className="section">
        <PanelTitle>核心指标</PanelTitle>
        <div className="metric-grid">
          {dashboardMetrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </section>

      {/* 运营趋势 */}
      <section className="section">
        <PanelTitle>运营趋势（近 7 日）</PanelTitle>
        <Sparkline data={dashboardTrend} />
      </section>

      {/* 运行中策略 */}
      <section className="section">
        <div className="section-header-row">
          <PanelTitle>运行中策略</PanelTitle>
          <button type="button" className="btn btn-primary" onClick={() => nav('/scenarios')}>
            + 新建策略
          </button>
        </div>

        {runningStrategies.length === 0 ? (
          <p className="empty-hint">暂无运行中策略</p>
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
                  <th>更新时间</th>
                </tr>
              </thead>
              <tbody>
                {runningStrategies.map((s) => {
                  const p = performance[s.id]
                  return (
                    <tr key={s.id}>
                      <td className="cell-primary">{s.name}</td>
                      <td><ScenarioBadge scenario={s.scenario} /></td>
                      <td><StatusPill status={s.status} /></td>
                      <td>{p?.exposure?.toLocaleString() ?? '-'}</td>
                      <td>{p?.clicks?.toLocaleString() ?? '-'}</td>
                      <td>{p?.conversions?.toLocaleString() ?? '-'}</td>
                      <td>¥{((p?.gmv ?? 0) / 10000).toFixed(0)}万</td>
                      <td className="cell-muted">{s.updatedAt}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 待办事项 */}
      <section className="section">
        <PanelTitle>待办提醒</PanelTitle>
        <ul className="todo-list">
          {quickTodos.map((t, i) => (
            <li key={i} className="todo-item">
              <span className="todo-dot" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* 场景快捷入口 */}
      <section className="section">
        <PanelTitle>场景快捷入口</PanelTitle>
        <div className="scenario-grid">
          {Object.entries(scenarioMeta).map(([key, m]) => (
            <button
              key={key}
              type="button"
              className={`scenario-card tone-${m.tone}`}
              onClick={() => nav('/scenarios')}
            >
              <span className="scenario-card-label">{m.label}</span>
              <span className="scenario-card-cta">创建策略 →</span>
            </button>
          ))}
          <div className="scenario-card coming-soon">
            <span className="scenario-card-label">更多场景</span>
            <span className="coming-soon-tag">敬请期待</span>
          </div>
        </div>
      </section>
    </>
  )
}
