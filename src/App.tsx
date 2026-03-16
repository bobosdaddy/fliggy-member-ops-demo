import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DemoProvider } from './app/DemoProvider'
import { Shell } from './components/Shell'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { BenefitsPage } from './pages/BenefitsPage'
import { CampaignBuilderPage } from './pages/CampaignBuilderPage'
import { DashboardPage } from './pages/DashboardPage'
import { PlacementsPage } from './pages/PlacementsPage'
import { PreviewPage } from './pages/PreviewPage'
import { SegmentsPage } from './pages/SegmentsPage'
import { SettingsPage } from './pages/SettingsPage'
import { TemplatesPage } from './pages/TemplatesPage'

function App() {
  return (
    <HashRouter>
      <DemoProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/segments" element={<SegmentsPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/campaigns/new" element={<CampaignBuilderPage />} />
            <Route path="/placements" element={<PlacementsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Route>
        </Routes>
      </DemoProvider>
    </HashRouter>
  )
}

export default App
