import { Icon } from '@iconify/react'
import { useState } from 'react'
import roundAccountBox from '@iconify/icons-ic/round-account-box'
import bookOpenFill from '@iconify/icons-eva/book-open-fill'
import outlineVpnKey from '@iconify/icons-ic/outline-vpn-key'
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material'
// redux
// import { useDispatch } from 'react-redux'
// components
import Page from '../components/Page'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs'
import { Account, ProfileMyCourse } from '../components/_dashboard/user/profile'
import { AccountChangePassword } from '../components/_dashboard/user/account'

// ----------------------------------------------------------------------

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('account')

  const ACCOUNT_TABS = [
    {
      value: 'account',
      label: 'Tài khoản',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Account />,
    },
    {
      value: 'my-course',
      label: 'Khóa học của tôi',
      icon: <Icon icon={bookOpenFill} width={20} height={20} />,
      component: <ProfileMyCourse />,
    },
    {
      value: 'change-password',
      label: 'Đổi mật khẩu',
      icon: <Icon icon={outlineVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ]

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <Page title="Trang cá nhân">
      <Container sx={{ mb: 2 }}>
        <HeaderBreadcrumbs
          sx={{ mb: 1, mt: 15 }}
          heading="Trang cá nhân"
          links={[{ name: 'Trang chủ', href: '/' }, { name: 'Trang cá nhân' }]}
        />

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab
            return isMatched && <Box key={tab.value}>{tab.component}</Box>
          })}
        </Stack>
      </Container>
    </Page>
  )
}
