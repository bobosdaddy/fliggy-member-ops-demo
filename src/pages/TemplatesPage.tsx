import { Link } from 'react-router-dom'
import { useDemo } from '../app/useDemo'
import { PageHeader } from '../components/PageHeader'
import { GoalBadge, PanelTitle } from '../components/Primitives'
import {
  channelMeta,
  placementMeta,
  segmentMeta,
  templateSections,
} from '../data/mockData'

export function TemplatesPage() {
  const { templates } = useDemo()

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="运营模板"
        title="模板化经营中心"
        description="围绕拉新、激活、复购与升保级沉淀标准运营模板，并给出阶段、渠道和预算加码建议。"
      />

      <section className="narrative-grid">
        <article className="card narrative-card">
          <PanelTitle
            title="模板运营方法"
            helper="将会员经营拆分为标准场景，让品牌在飞猪内更快完成活动启动、触点挂载和效果回收。"
          />
          <div className="story-line">
            <span>模板沉淀会员经营最佳实践，降低活动搭建门槛</span>
            <span>模板与 AI 诊断联动，优先推荐当前阶段最优动作</span>
            <span>模板与营销活动联动，支持免费承接与加码投放两套路径</span>
          </div>
        </article>

        <article className="card narrative-card">
          <PanelTitle
            title="当前阶段推荐"
            helper="当前系统识别为激活拉升期，优先推荐首住激活与高潜升级两类动作。"
          />
          <p>
            先用模板完成基础触点承接，再针对高价值人群叠加短信、搜索强化位或会场资源做效果放大。
          </p>
        </article>
      </section>

      {templateSections.map((section) => {
        const currentTemplates = templates.filter((template) =>
          section.goals.includes(template.goal),
        )

        return (
          <section className="page-stack" key={section.key}>
            <div className="section-header-inline">
              <div>
                <span className="eyebrow">标准场景</span>
                <h2>{section.label}</h2>
              </div>
            </div>

            <div className="template-grid">
              {currentTemplates.map((template) => (
                <article className="card template-card" key={template.id}>
                  <div className="template-head">
                    <GoalBadge goal={template.goal} />
                    <span className="meta-chip highlight">{template.aiTag}</span>
                  </div>
                  <h2>{template.name}</h2>
                  <p>{template.description}</p>

                  <div className="detail-list compact-list">
                    <div>
                      <span className="detail-label">推荐人群</span>
                      <p>{segmentMeta[template.recommendedSegment].label}</p>
                    </div>
                    <div>
                      <span className="detail-label">推荐运营阶段</span>
                      <p>{template.recommendedStage}</p>
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
                    <div>
                      <span className="detail-label">推荐渠道组合</span>
                      <div className="inline-token-row">
                        {template.recommendedChannels.map((channel) => (
                          <span className="subtle-badge" key={`${template.id}-${channel}`}>
                            {channelMeta[channel].label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="detail-label">推荐预算策略</span>
                      <p>{template.budgetStrategy}</p>
                    </div>
                    <div>
                      <span className="detail-label">营销活动建议</span>
                      <p>{template.suggestMarketingBoost}</p>
                    </div>
                  </div>

                  <div className="template-actions">
                    <span className="meta-chip">{template.effectTag}</span>
                    <Link
                      className="action-button primary"
                      to={`/campaigns/new?template=${template.id}`}
                    >
                      使用模板
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
