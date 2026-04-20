import { useState } from 'react'
import { useDemo } from '../app/useDemo'
import { benefitCategoryMeta, benefitCategoryOrder } from '../data/mockData'
import type { BenefitCategory } from '../app/types'
import { PageHeader } from '../components/PageHeader'

export function BenefitsPage() {
  const { benefits, toggleBenefit, updateBenefit, addBenefit } = useDemo()
  const [activeTab, setActiveTab] = useState<BenefitCategory>('points')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editBrand, setEditBrand] = useState('')
  const [editValue, setEditValue] = useState('')
  const [adding, setAdding] = useState(false)
  const [addName, setAddName] = useState('')
  const [addDesc, setAddDesc] = useState('')
  const [addBrand, setAddBrand] = useState('')
  const [addValue, setAddValue] = useState('')

  const filtered = benefits.filter((b) => b.category === activeTab)

  const startEdit = (id: string) => {
    const b = benefits.find((x) => x.id === id)
    if (!b) return
    setEditingId(id)
    setEditName(b.name)
    setEditDesc(b.description)
    setEditBrand(b.brand ?? '')
    setEditValue(b.value ?? '')
    setAdding(false)
  }

  const saveEdit = () => {
    if (!editingId) return
    updateBenefit(editingId, {
      name: editName,
      description: editDesc,
      brand: editBrand || undefined,
      value: editValue || undefined,
    })
    setEditingId(null)
  }

  const startAdd = () => {
    setAdding(true)
    setEditingId(null)
    setAddName('')
    setAddDesc('')
    setAddBrand('')
    setAddValue('')
  }

  const saveAdd = () => {
    if (!addName.trim()) return
    addBenefit({
      id: `b-${activeTab}-${Date.now()}`,
      category: activeTab,
      name: addName,
      description: addDesc,
      brand: addBrand || undefined,
      value: addValue || undefined,
      enabled: true,
    })
    setAdding(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="会员中心"
        title="会员权益"
        description="配置积分奖励、优惠券、会员身份与会员活动权益，关联到策略投放中。"
      />

      {/* Tabs */}
      <div className="benefit-tabs">
        {benefitCategoryOrder.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`benefit-tab ${activeTab === cat ? 'active' : ''}`}
            onClick={() => { setActiveTab(cat); setEditingId(null); setAdding(false) }}
          >
            {benefitCategoryMeta[cat].icon} {benefitCategoryMeta[cat].label}
            <span className="benefit-tab-count">
              {benefits.filter((b) => b.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* 操作栏 */}
      <div className="section-header-row" style={{ marginBottom: 12 }}>
        <span className="eyebrow">{benefitCategoryMeta[activeTab].label} · {filtered.length} 项</span>
        <button type="button" className="btn btn-primary btn-sm" onClick={startAdd}>+ 新增权益</button>
      </div>

      {/* 新增表单 */}
      {adding && (
        <div className="benefit-row" style={{ marginBottom: 8 }}>
          <div className="benefit-edit-form">
            <label className="field-label">
              权益名称 *
              <input className="field-input" value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="输入权益名称" />
            </label>
            <label className="field-label">
              权益说明
              <textarea className="field-textarea" value={addDesc} onChange={(e) => setAddDesc(e.target.value)} rows={2} placeholder="描述权益内容" />
            </label>
            <div className="form-row">
              <label className="field-label">
                关联品牌
                <input className="field-input" value={addBrand} onChange={(e) => setAddBrand(e.target.value)} placeholder="如：万豪、希尔顿" />
              </label>
              <label className="field-label">
                权益面值
                <input className="field-input" value={addValue} onChange={(e) => setAddValue(e.target.value)} placeholder="如：满800减80" />
              </label>
            </div>
            <div className="benefit-edit-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={saveAdd} disabled={!addName.trim()}>确认新增</button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setAdding(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 权益列表 */}
      <div className="benefit-list">
        {filtered.length === 0 ? (
          <p className="empty-hint">当前分类暂无权益配置</p>
        ) : (
          filtered.map((b) => (
            <div key={b.id} className={`benefit-row ${b.enabled ? '' : 'disabled'}`}>
              {editingId === b.id ? (
                <div className="benefit-edit-form">
                  <label className="field-label">
                    权益名称
                    <input
                      className="field-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </label>
                  <label className="field-label">
                    权益说明
                    <textarea
                      className="field-textarea"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows={2}
                    />
                  </label>
                  <div className="form-row">
                    <label className="field-label">
                      关联品牌
                      <input
                        className="field-input"
                        value={editBrand}
                        onChange={(e) => setEditBrand(e.target.value)}
                        placeholder="如：万豪、希尔顿"
                      />
                    </label>
                    <label className="field-label">
                      权益面值
                      <input
                        className="field-input"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="如：满800减80"
                      />
                    </label>
                  </div>
                  <div className="benefit-edit-actions">
                    <button type="button" className="btn btn-primary btn-sm" onClick={saveEdit}>保存</button>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingId(null)}>取消</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="benefit-row-info">
                    <strong>{b.name}</strong>
                    {b.brand && <span className="benefit-brand">{b.brand}</span>}
                    {b.value && <span className="benefit-value">{b.value}</span>}
                    <p>{b.description}</p>
                  </div>
                  <div className="benefit-row-actions">
                    <button type="button" className="btn btn-sm btn-outline" onClick={() => startEdit(b.id)}>
                      编辑
                    </button>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={b.enabled} onChange={() => toggleBenefit(b.id)} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  )
}
