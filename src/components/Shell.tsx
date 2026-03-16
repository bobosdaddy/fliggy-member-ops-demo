import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import { brandProfile, roleMeta } from '../data/mockData'
import fliggyLogo from '../assets/fliggy-logo.svg'

const navigation = [
  { to: '/dashboard', label: '工作台', short: 'WB' },
  { to: '/segments', label: '会员身份', short: 'ID' },
  { to: '/benefits', label: '权益展示', short: 'BF' },
  { to: '/templates', label: '运营模板', short: 'TP' },
  { to: '/placements', label: '触点管理', short: 'PL' },
  { to: '/analytics', label: '数据分析', short: 'AN' },
  { to: '/settings', label: '系统设置', short: 'ST' },
  { to: '/preview', label: '前台体验', short: 'PV' },
]

const pageLead: Record<string, string> = {
  '/dashboard': '统一查看品牌会员经营结果与进行中动作',
  '/segments': '用身份分层表达经营目标，不再一刀切运营',
  '/benefits': '后台编辑权益表达，前台体验同步更新',
  '/templates': '围绕拉新、激活、复购、升保级复用模板',
  '/campaigns/new': '基于标准模板完成活动配置并进入发布流程',
  '/placements': '把活动挂到飞猪各触点，形成阵地经营',
  '/analytics': '让配置动作最终回到经营结果',
  '/settings': '统一管理品牌信息、角色分工与发布权限',
  '/preview': '统一查看不同会员身份与触点下的前台体验',
}

export function Shell() {
  const { role, setRole, toasts } = useDemo()
  const location = useLocation()
  const leadText =
    pageLead[location.pathname] ?? '围绕会员运营、触点投放与经营结果构建统一闭环'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-card">
          <img src={fliggyLogo} alt="飞猪" className="sidebar-brand-logo" />
          <div className="brand-copy">
            <p>{brandProfile.platformName}品牌会员自运营平台</p>
            <strong>{brandProfile.brandName}</strong>
            <span className="brand-subline">品牌第二官网经营中台</span>
          </div>
        </div>

        <div className="sidebar-summary card">
          <span className="eyebrow">定位</span>
          <h2>{brandProfile.proposition}</h2>
          <p>围绕品牌会员拉新、激活、复购与升保级，构建可共管的品牌经营后台。</p>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <span className="nav-token">{item.short}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footnote">
          <span className="eyebrow">共管模式</span>
          <p>{brandProfile.collaboration}</p>
        </div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <div className="topbar-identity">
            <div className="platform-badge">
              <img src={fliggyLogo} alt="飞猪" className="platform-wordmark" />
              <div>
                <span className="eyebrow">平台品牌</span>
                <p>品牌会员自运营平台</p>
              </div>
            </div>

            <div className="topbar-brand-block">
              <div className="topbar-meta-row">
                <span className="meta-chip highlight">{brandProfile.proposition}</span>
                <span className="meta-chip">会员经营闭环</span>
              </div>
              <span className="eyebrow">当前品牌</span>
              <strong>{brandProfile.brandName}</strong>
              <p>{leadText}</p>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="role-card">
              <label htmlFor="role-select">角色切换</label>
              <select
                id="role-select"
                value={role}
                onChange={(event) => setRole(event.target.value as typeof role)}
              >
                {Object.entries(roleMeta).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
              <p>{roleMeta[role].description}</p>
            </div>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>

      <div className="toast-stack">
        {toasts.map((toast) => (
          <div className="toast-card" key={toast.id}>
            <strong>{toast.title}</strong>
            <p>{toast.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
