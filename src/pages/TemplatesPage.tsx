import { Link } from 'react-router-dom'
import { goalMeta, goalOrder, placementMeta, segmentMeta } from '../data/mockData'
import { useDemo } from '../app/useDemo'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle } from '../components/Primitives'

export function TemplatesPage() {
  const { templates } = useDemo()

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="运营模板"
        title="模板化经营中心"
        description="围绕拉新、激活、复购、升保级沉淀标准模板，让商家不用从零搭活动。"
      />

      <section className="narrative-grid">
        <article className="card narrative-card">
          <PanelTitle
            title="模板运营方法"
            helper="围绕标准场景沉淀可复用的经营动作，缩短活动启动周期并提升跨触点一致性。"
          />
          <div className="story-line">
            <span>拉新、激活、复购、升保级统一模板化管理</span>
            <span>活动配置、触点投放与文案版本统一维护</span>
            <span>经营效果统一回收至数据分析中心</span>
          </div>
        </article>

        <article className="card narrative-card">
          <PanelTitle
            title="阶段经营重点"
            helper="首住激活是现阶段放大品牌会员价值与等级成长效率的核心经营动作。"
          />
          <p>
            围绕银卡会员首住转化与升级路径设计触点内容，能够同时带动订单激活和等级成长。
          </p>
        </article>
      </section>

      {goalOrder.map((goal) => {
        const currentTemplates = templates.filter((template) => template.goal === goal)
        return (
          <section className="page-stack" key={goal}>
            <div className="section-header-inline">
              <div>
                <span className="eyebrow">标准场景</span>
                <h2>{goalMeta[goal].label}</h2>
              </div>
              <GoalBadge goal={goal} />
            </div>

            <div className="template-grid">
              {currentTemplates.map((template) => (
                <article className="card template-card" key={template.id}>
                  <div className="template-head">
                    <GoalBadge goal={template.goal} />
                    <span className="meta-chip">{template.effectTag}</span>
                  </div>
                  <h2>{template.name}</h2>
                  <p>{template.description}</p>
                  <div className="detail-list">
                    <div>
                      <span className="detail-label">推荐人群</span>
                      <p>{segmentMeta[template.recommendedSegment].label}</p>
                    </div>
                    <div>
                      <span className="detail-label">推荐触点</span>
                      <div className="inline-token-row">
                        {template.recommendedPlacements.map((placement) => (
                          <span className="subtle-badge" key={`${template.id}-${placement}`}>
                            {placementMeta[placement].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link
                    className="action-button primary full"
                    to={`/campaigns/new?template=${template.id}`}
                  >
                    使用模板
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
