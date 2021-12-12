import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Button, Container, Typography } from '@mui/material'
// components
import Page from '../../components/Page'
import { ResetPasswordForm } from '../../components/authentication/reset-password'
//
import { SentIcon } from '../../assets'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <RootStyle title="Đặt lại mật khẩu | M-Coding Edu">
      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Quên mật khẩu?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Vui lòng nhập email của bạn để lấy lại mật khẩu
              </Typography>

              <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

              <Button fullWidth size="large" component={RouterLink} to="/login" sx={{ mt: 1 }}>
                Trở về
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Yêu cầu đã được gửi
              </Typography>
              <Typography>
                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn &nbsp;
                <strong>{email}</strong>
                <br />
                Vui lòng kiểm tra email.
              </Typography>

              <Button size="large" variant="contained" component={RouterLink} to="/login" sx={{ mt: 5 }}>
                Đăng nhập
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  )
}
