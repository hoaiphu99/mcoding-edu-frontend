import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Card, Link, Container, Typography } from '@mui/material'
// layouts
import AuthLayout from '../layouts/AuthLayout'
// components
import Page from '../components/Page'
import { MHidden } from '../components/@material-extend'
import { RegisterForm } from '../components/authentication/register'
import AuthSocial from '../components/authentication/AuthSocial'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
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

export default function Register() {
  return (
    <RootStyle title="Đăng ký | M-Coding Edu">
      <AuthLayout>
        Đã có tài khoản? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Đăng nhập
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Học lập trình miễn phí ngay trên M-Coding Edu
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Đăng ký miễn phí.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Không cần tín dụng hoặc trả phí.</Typography>
          </Box>

          <AuthSocial />

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Bằng cách đăng ký, tôi đồng ý với&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Điều khoản dịch vụ
            </Link>
            &nbsp;và&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Chính sách bảo mật
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Đã có tài khoản?&nbsp;
              <Link to="/login" component={RouterLink}>
                Đăng nhập
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
