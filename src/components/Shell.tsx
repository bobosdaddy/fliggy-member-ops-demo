import { NavLink, Outlet } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import { brandProfile } from '../data/mockData'
import fliggySidebarLogo from '../assets/fliggy-logo-sidebar.jpg'

const navigation = [
  { to: '/dashboard', label: '工作台', short: 'WB' },
  { to: '/segments', label: '会员身份', short: 'ID' },
  { to: '/benefits', label: '权益展示', short: 'BF' },
  { to: '/templates', label: '运营模板', short: 'TP' },
  { to: '/marketing', label: '营销活动', short: 'MK' },
  { to: '/channels', label: '渠道管理', short: 'CH' },
  { to: '/placements', label: '触点管理', short: 'PL' },
  { to: '/analytics', label: '数据分析', short: 'AN' },
  { to: '/settings', label: '系统设置', short: 'ST' },
  { to: '/preview', label: '前台预览', short: 'PV' },
]

export function Shell() {
  const { toasts } = useDemo()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-card">
          <img src={fliggySidebarLogo} alt="飞猪" className="sidebar-brand-logo" />
          <div className="brand-copy">
            <p>{brandProfile.productName}</p>
            <strong>{brandProfile.brandName}</strong>
            <span className="brand-subline">品牌第二官网智能经营中台</span>
          </div>
        </div>

        <div className="sidebar-summary card">
          <span className="eyebrow">定位</span>
          <h2>{brandProfile.proposition}</h2>
          <p>围绕品牌会员拉新、激活、复购、升级和保级，构建可共管的智能经营平台。</p>
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
