import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DemoProvider } from './app/DemoProvider'
import { Shell } from './components/Shell'
import { DashboardPage } from './pages/DashboardPage'
import { ScenariosPage } from './pages/ScenariosPage'
import { CreativesPage } from './pages/CreativesPage'
import { BenefitsPage } from './pages/BenefitsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <HashRouter>
      <DemoProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="/creatives" element={<CreativesPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </DemoProvider>
    </HashRouter>
  )
}
