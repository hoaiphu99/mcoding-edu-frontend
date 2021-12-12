import { Link as RouterLink, useLocation } from 'react-router-dom'
import slugify from 'slugify'
// material
import { styled } from '@mui/material/styles'
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material'
// redux
import { useSelector } from 'react-redux'
import { categoriesState$ } from '../../redux/selectors'
// hooks
import useAuth from '../../hooks/useAuth'
import useOffSetTop from '../../hooks/useOffSetTop'
// components
import Logo from '../../components/Logo'
import Label from '../../components/Label'
import { MHidden } from '../../components/@material-extend'
//
import MenuDesktop from './MenuDesktop'
import MenuMobile from './MenuMobile'
import navConfig from './MenuConfig'
import MenuAccount from './MenuAccount'
import Searchbar from './Searchbar'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 88

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP,
  },
}))

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}))

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(50)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const { data: categories } = useSelector(categoriesState$)

  navConfig.forEach((item) => {
    if (item.path === '#') {
      item.children[0].items = categories.map((category) => ({
        title: category.name,
        path: `/khoa-hoc/danh-muc/${slugify(category.name, { lower: true, locale: 'vi' })}`,
      }))
    }
  })

  const { user } = useAuth()

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 },
          }),
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Label color="info" sx={{ ml: 1 }}>
            M-Coding Edu
          </Label>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop navConfig={navConfig} />
          </MHidden>
          <Searchbar />
          {!user ? (
            <RouterLink to="/login">
              <Button variant="contained">Đăng nhập</Button>
            </RouterLink>
          ) : (
            <MenuAccount userLogin={user} />
          )}
          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  )
}
