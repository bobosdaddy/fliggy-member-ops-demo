import { useDemo } from '../app/useDemo'
import { brandProfile, roleMeta } from '../data/mockData'
import { PageHeader } from '../components/PageHeader'
import { PanelTitle } from '../components/Primitives'

const permissionRows = [
  {
    label: '查看数据',
    roles: {
      platformOps: '可用',
      merchantAdmin: '可用',
      merchantOperator: '可用',
    },
  },
  {
    label: '创建活动',
    roles: {
      platformOps: '可用',
      merchantAdmin: '可用',
      merchantOperator: '可用',
    },
  },
  {
    label: '编辑权益',
    roles: {
      platformOps: '可用',
      merchantAdmin: '可用',
      merchantOperator: '可用',
    },
  },
  {
    label: '提交审核',
    roles: {
      platformOps: '可用',
      merchantAdmin: '可用',
      merchantOperator: '受限',
    },
  },
  {
    label: '发布活动',
    roles: {
      platformOps: '可用',
      merchantAdmin: '可用',
      merchantOperator: '受限',
    },
  },
  {
    label: '下线活动',
    roles: {
      platformOps: '可用',
      merchantAdmin: '可用',
      merchantOperator: '受限',
    },
  },
]

export function SettingsPage() {
  const { role } = useDemo()

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="系统设置"
        title="品牌信息与权限共管"
        description="统一查看品牌信息、合作模式与角色分工，明确平台与商家在经营流程中的职责边界。"
      />

      <section className="two-column-grid">
        <article className="card">
          <PanelTitle title="品牌信息" helper="围绕希尔顿中国旗舰店管理品牌定位、合作模式与平台角色关系。" />
          <div className="detail-list">
            <div>
              <span className="detail-label">品牌名称</span>
              <p>{brandProfile.brandName}</p>
            </div>
            <div>
              <span className="detail-label">平台定位</span>
              <p>{brandProfile.platformName}{brandProfile.proposition}</p>
            </div>
            <div>
              <span className="detail-label">当前合作模式</span>
              <p>{brandProfile.collaboration}</p>
            </div>
          </div>
        </article>

        <article className="card narrative-card">
          <PanelTitle title="当前角色职责" helper="不同角色对应不同经营职责与发布权限，确保平台与商家协同有序。" />
          <div className="narrative-block">
            <strong>{roleMeta[role].label}</strong>
            <p>{roleMeta[role].description}</p>
          </div>
          <div className="action-preview-row">
            {role === 'merchantOperator' ? <span className="action-button primary">保存草稿</span> : null}
            {role === 'merchantAdmin' ? (
              <>
                <span className="action-button secondary">提交审核</span>
                <span className="action-button primary">发布</span>
              </>
            ) : null}
            {role === 'platformOps' ? <span className="action-button primary">审核并发布</span> : null}
          </div>
        </article>
      </section>

      <article className="card">
        <PanelTitle title="权限矩阵" helper="统一管理查看、创建、编辑、审核、发布与下线等关键经营权限。" />
        <table className="data-table">
          <thead>
            <tr>
              <th>权限项</th>
              <th>飞猪小二</th>
              <th>商家管理员</th>
              <th>商家运营</th>
            </tr>
          </thead>
          <tbody>
            {permissionRows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.roles.platformOps}</td>
                <td>{row.roles.merchantAdmin}</td>
                <td>{row.roles.merchantOperator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </div>
  )
}
