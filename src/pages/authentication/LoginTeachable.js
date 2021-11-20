import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Stack, Link, Container, Typography } from '@mui/material'
// components
import Page from '../../components/Page'
import { MHidden } from '../../components/@material-extend'
import { LoginFormTeachable } from '../../components/authentication/login'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

export default function LoginProfessor() {
  return (
    <RootStyle title="Đăng nhập | M-Coding Edu">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Đăng nhập vào M-Coding Edu
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Nhập thông tin tài khoản bên dưới.</Typography>
          </Stack>

          <LoginFormTeachable />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Chưa có tài khoản?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Đăng ký ngay
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
