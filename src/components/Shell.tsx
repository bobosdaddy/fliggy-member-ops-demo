import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import { brandProfile, roleMeta } from '../data/mockData'
import fliggyLogo from '../assets/fliggy-logo.png'

const navigation = [
  { to: '/dashboard', label: '工作台', short: 'WB' },
  { to: '/scenarios', label: '场景策略', short: 'SC' },
  { to: '/benefits', label: '权益配置', short: 'BF' },
  { to: '/analytics', label: '数据分析', short: 'AN' },
  { to: '/preview', label: '前台预览', short: 'PV' },
  { to: '/settings', label: '系统设置', short: 'ST' },
]

const pageLead: Record<string, string> = {
  '/dashboard': '统一查看品牌会员智能运营结果与进行中策略',
  '/scenarios': '选择场景一键生成 AI 策略，自动配置人群、承接页、渠道与权益',
  '/benefits': '按人群配置专属权益内容，促进最终转化',
  '/analytics': '围绕四大场景统一回收经营结果',
  '/preview': '统一查看不同人群与触点下的前台体验',
  '/settings': '统一管理品牌信息、角色分工与发布权限',
}

export function Shell() {
  const { role, setRole, toasts } = useDemo()
  const location = useLocation()
  const leadText =
    pageLead[location.pathname] ?? '围绕会员智能运营、触达覆盖与经营结果构建统一闭环'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-card">
          <img src={fliggyLogo} alt="飞猪" className="sidebar-brand-logo" />
          <div className="brand-copy">
            <p>{brandProfile.platformName}品牌会员智能运营平台</p>
            <strong>{brandProfile.brandName}</strong>
            <span className="brand-subline">品牌第二官网经营中台</span>
          </div>
        </div>

        <div className="sidebar-summary card">
          <span className="eyebrow">定位</span>
          <h2>{brandProfile.proposition}</h2>
          <p>围绕会员拉新、召回、升保级、浏览未购与营销活动，构建 AI 驱动的品牌运营后台。</p>
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
                <p>品牌会员智能运营平台</p>
              </div>
            </div>

            <div className="topbar-brand-block">
              <div className="topbar-meta-row">
                <span className="meta-chip highlight">{brandProfile.proposition}</span>
                <span className="meta-chip">AI 智能运营</span>
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
