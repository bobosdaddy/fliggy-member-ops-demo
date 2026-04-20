import { NavLink, Outlet, useLocation } from 'react-router-dom'
import type { Role } from '../app/types'
import { useDemo } from '../app/useDemo'
import { brandProfile, roleMeta } from '../data/mockData'
import fliggyLogo from '../assets/fliggy-logo.png'

interface NavItem {
  to: string
  label: string
  short: string
  disabled?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

const sections: NavSection[] = [
  {
    title: '商家中心',
    items: [
      { to: '/merchant/store', label: '店铺管理', short: 'SM', disabled: true },
      { to: '/merchant/product', label: '商品管理', short: 'PM', disabled: true },
    ],
  },
  {
    title: '经营中心',
    items: [
      { to: '/ops/overview', label: '经营概览', short: 'OV', disabled: true },
      { to: '/ops/traffic', label: '流量分析', short: 'TA', disabled: true },
    ],
  },
  {
    title: '会员中心',
    items: [
      { to: '/dashboard', label: '工作台', short: 'WB' },
      { to: '/scenarios', label: '场景策略', short: 'SC' },
      { to: '/creatives', label: '素材配置', short: 'CR' },
      { to: '/benefits', label: '会员权益', short: 'BF' },
      { to: '/analytics', label: '数据分析', short: 'AN' },
      { to: '/settings', label: '系统设置', short: 'ST' },
    ],
  },
]

const pageLead: Record<string, string> = {
  '/dashboard': '统一查看品牌会员运营结果与进行中策略',
  '/scenarios': '选择场景一键生成 AI 策略，自动配置人群、渠道、素材与权益',
  '/creatives': '管理投放素材，支持手动配置与 AI 自动生成',
  '/benefits': '配置积分奖励、优惠券、会员身份与会员活动权益',
  '/analytics': '按策略或按场景生成投放分析报告',
  '/settings': '统一管理角色分工与发布权限',
}

export function Shell() {
  const { role, setRole, toasts } = useDemo()
  const location = useLocation()
  const leadText = pageLead[location.pathname] ?? '飞猪品牌会员智能经营平台'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-card">
          <img src={fliggyLogo} alt="飞猪" className="sidebar-brand-logo" />
          <div className="brand-copy">
            <p>{brandProfile.platformName}</p>
            <strong>{brandProfile.proposition}</strong>
          </div>
        </div>

        {sections.map((section) => (
          <div className="nav-section" key={section.title}>
            <span className="nav-section-title">{section.title}</span>
            <nav className="sidebar-nav">
              {section.items.map((item) =>
                item.disabled ? (
                  <span className="nav-link disabled" key={item.to}>
                    <span className="nav-token">{item.short}</span>
                    <span>{item.label}</span>
                    <span className="coming-soon-tag">敬请期待</span>
                  </span>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    <span className="nav-token">{item.short}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ),
              )}
            </nav>
          </div>
        ))}

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
                <p>{brandProfile.proposition}</p>
              </div>
            </div>

            <div className="topbar-brand-block">
              <div className="topbar-meta-row">
                <span className="meta-chip highlight">88VIP 会员运营</span>
                <span className="meta-chip">AI 智能策略</span>
              </div>
              <span className="eyebrow">当前平台</span>
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
                onChange={(e) => setRole(e.target.value as Role)}
              >
                {Object.entries(roleMeta).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
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
        {toasts.map((t) => (
          <div className="toast-card" key={t.id}>
            <strong>{t.title}</strong>
            <p>{t.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
