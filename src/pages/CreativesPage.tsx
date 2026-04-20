import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import { initialBenefits } from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { ScenarioBadge, StatusPill } from '../components/Primitives'

export function CreativesPage() {
  const { strategies } = useDemo()
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 1500)
  }

  return (
    <>
      <PageHeader
        eyebrow="会员中心"
        title="素材配置"
        description="管理投放素材，支持手动配置链接与 AI 自动生成投放页面和承接页面。"
      />

      {/* AI 生成区域 */}
      <section className="section">
        <h3 className="panel-title">AI 素材生成</h3>
        <div className="creative-ai-generator">
          <p>选择已配置的权益，AI 将自动生成投放页面与承接页面素材，支持编辑和下载。</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? '🤖 生成中…' : generated ? '🤖 重新生成' : '🤖 一键生成素材'}
          </button>
        </div>

        {generated && (
          <div className="creative-preview-grid" style={{ marginTop: 24 }}>
            <div className="creative-preview-card">
              <h4>投放页面 · 模板 A</h4>
              <div className="creative-preview-phone">
                <div className="phone-screen">
                  <strong className="phone-title">88VIP 专属 · 限时会员礼遇</strong>
                  <p className="phone-sub">注册品牌会员，解锁专属权益。</p>
                  <ul className="phone-highlights">
                    <li>✦ 注册即领优惠券</li>
                    <li>✦ 88VIP 直通金卡</li>
                    <li>✦ 闪促积分翻倍</li>
                  </ul>
                  <button type="button" className="phone-cta">立即领取</button>
                </div>
              </div>
              <div className="creative-actions">
                <button type="button" className="btn btn-sm btn-outline">编辑文案</button>
                <button type="button" className="btn btn-sm btn-outline">下载素材</button>
              </div>
            </div>

            <div className="creative-preview-card">
              <h4>承接页面 · 模板 A</h4>
              <div className="creative-preview-phone">
                <div className="phone-screen reception">
                  <strong className="phone-title">欢迎加入会员</strong>
                  <p className="phone-sub">您已成功注册，以下权益已激活：</p>
                  <ul className="phone-highlights">
                    <li>✦ 希尔顿 40 元注册券</li>
                    <li>✦ 注册赠 100 积分</li>
                    <li>✦ 88VIP 直通锦江金卡</li>
                  </ul>
                  <button type="button" className="phone-cta">查看我的权益</button>
                </div>
              </div>
              <div className="creative-actions">
                <button type="button" className="btn btn-sm btn-outline">编辑文案</button>
                <button type="button" className="btn btn-sm btn-outline">下载素材</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 已关联素材列表 */}
      <section className="section">
        <h3 className="panel-title">策略已关联素材</h3>
        {strategies.length === 0 ? (
          <p className="empty-hint">暂无已关联素材，请先在「场景策略」中创建策略。</p>
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>素材名称</th>
                  <th>场景</th>
                  <th>类型</th>
                  <th>关联权益</th>
                  <th>策略状态</th>
                  <th>更新时间</th>
                </tr>
              </thead>
              <tbody>
                {strategies.map((s) => (
                  <tr key={s.id}>
                    <td className="cell-primary">{s.creative.name}</td>
                    <td><ScenarioBadge scenario={s.scenario} /></td>
                    <td>
                      <span className="badge tone-blue">
                        {s.creative.mode === 'ai' ? 'AI 生成' : '手动配置'}
                      </span>
                    </td>
                    <td>
                      {s.creative.benefitIds.map((bid) => {
                        const b = initialBenefits.find((x) => x.id === bid)
                        return b ? (
                          <span key={bid} className="badge tone-muted" style={{ marginRight: 4 }}>
                            {b.name}
                          </span>
                        ) : null
                      })}
                    </td>
                    <td><StatusPill status={s.status} /></td>
                    <td className="cell-muted">{s.creative.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
