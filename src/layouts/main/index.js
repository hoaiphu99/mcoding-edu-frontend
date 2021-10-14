import { Link as ScrollLink } from 'react-scroll'
import { Outlet } from 'react-router-dom'
// material
import { Box, Container } from '@mui/material'
// components
import Logo from '../../components/Logo'
//
import MainNavbar from './MainNavbar'
import MainFooter from './MainFooter'

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      <Box
        sx={{
          py: 5,
          textAlign: 'center',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <ScrollLink to="move_top" spy smooth>
            <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
          </ScrollLink>
        </Container>
        <MainFooter />
      </Box>
    </>
  )
}
