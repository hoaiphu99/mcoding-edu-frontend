// routes
import Router from './routes'
// theme
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
// components
import NotistackProvider from './components/NotistackProvider'
// import Settings from './components/settings';
import RtlLayout from './components/RtlLayout'
import ScrollToTop from './components/ScrollToTop'
import { ProgressBarStyle } from './components/LoadingScreen'
import ThemePrimaryColor from './components/ThemePrimaryColor'
// verify
import AuthVerify from './common/authVerify'
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <NotistackProvider>
            <GlobalStyles />
            <ProgressBarStyle />
            {/* <Settings /> */}
            <ScrollToTop />
            <Router />
            <AuthVerify />
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  )
}
