// material
import { styled } from '@mui/material/styles'
import { Stack, Container, Typography } from '@mui/material'
// components
import Page from '../../components/Page'
import { NewPasswordForm } from '../../components/authentication/reset-password'
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

export default function NewPassword() {
  return (
    <RootStyle title="Đặt lại mật khẩu | M-Coding Edu">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Đặt lại mật khẩu
            </Typography>
          </Stack>

          <NewPasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
