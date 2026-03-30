import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DemoProvider } from './app/DemoProvider'
import { Shell } from './components/Shell'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { BenefitsPage } from './pages/BenefitsPage'
import { DashboardPage } from './pages/DashboardPage'
import { PreviewPage } from './pages/PreviewPage'
import { ScenariosPage } from './pages/ScenariosPage'
import { SettingsPage } from './pages/SettingsPage'

function App() {
  return (
    <HashRouter>
      <DemoProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </DemoProvider>
    </HashRouter>
  )
}

export default App
