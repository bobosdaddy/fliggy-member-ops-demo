import { useDemo } from '../app/useDemo'
import { roleMeta, roleOrder, brandProfile } from '../data/mockData'
import { PageHeader } from '../components/PageHeader'

export function SettingsPage() {
  const { role, setRole } = useDemo()

  return (
    <>
      <PageHeader
        eyebrow="会员中心"
        title="系统设置"
        description="统一管理角色分工与发布权限，确保多角色协同有序。"
      />

      <section className="section">
        <h3 className="panel-title">品牌信息</h3>
        <div className="settings-card">
          <div className="settings-row">
            <span className="settings-label">平台名称</span>
            <span>{brandProfile.platformName}</span>
          </div>
          <div className="settings-row">
            <span className="settings-label">品牌定位</span>
            <span>{brandProfile.proposition}</span>
          </div>
          <div className="settings-row">
            <span className="settings-label">协作模式</span>
            <span>{brandProfile.collaboration}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h3 className="panel-title">角色权限</h3>
        <div className="role-grid">
          {roleOrder.map((r) => {
            const m = roleMeta[r]
            return (
              <div
                key={r}
                className={`role-card-block ${r === role ? 'active' : ''}`}
                onClick={() => setRole(r)}
              >
                <strong>{m.label}</strong>
                <p>{m.description}</p>
                {r === role && <span className="badge tone-success">当前角色</span>}
              </div>
            )
          })}
        </div>
      </section>

      <section className="section">
        <h3 className="panel-title">权限说明</h3>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>操作</th>
                <th>飞猪小二</th>
                <th>商家管理员</th>
                <th>商家运营</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>创建策略</td><td>✓</td><td>✓</td><td>✓</td></tr>
              <tr><td>发布策略</td><td>✓</td><td>✓</td><td>—</td></tr>
              <tr><td>审核策略</td><td>✓</td><td>—</td><td>—</td></tr>
              <tr><td>权益配置</td><td>✓</td><td>✓</td><td>✓</td></tr>
              <tr><td>素材管理</td><td>✓</td><td>✓</td><td>✓</td></tr>
              <tr><td>数据分析</td><td>✓</td><td>✓</td><td>只读</td></tr>
              <tr><td>系统设置</td><td>✓</td><td>✓</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
