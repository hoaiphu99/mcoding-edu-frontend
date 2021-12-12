// routes
import Router from './routes'
// theme
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
// hooks
import useAuth from './hooks/useAuth'
// components
import NotistackProvider from './components/NotistackProvider'
// import Settings from './components/settings';
import RtlLayout from './components/RtlLayout'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen'
import ThemePrimaryColor from './components/ThemePrimaryColor'
// verify
import AuthVerify from './common/authVerify'
// ----------------------------------------------------------------------

export default function App() {
  const { user, isInitialized } = useAuth()
  console.log('🚀 ~ file: App.js ~ line 21 ~ App ~ user', user)
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <NotistackProvider>
            <GlobalStyles />
            <ProgressBarStyle />
            {/* <Settings /> */}
            <ScrollToTop />
            {isInitialized ? <Router /> : <LoadingScreen />}
            <AuthVerify />
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  )
}
