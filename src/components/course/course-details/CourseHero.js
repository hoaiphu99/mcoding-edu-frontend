import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
// material
import { alpha, styled } from '@mui/material/styles'
import { Box, Avatar, Typography, Button, Link } from '@mui/material'
// utils
import { fDate } from '../../../utils/formatTime'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 480,
  position: 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  [theme.breakpoints.up('md')]: {
    height: 'auto',
    paddingTop: 'calc(100% * 9 / 32)',
  },
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.72),
  },
}))

const TitleStyle = styled(Typography)(({ theme }) => ({
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}))

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}))

const CoverImgStyle = styled('img')({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

CourseHero.propTypes = {
  course: PropTypes.object.isRequired,
  studentCourse: PropTypes.object,
}

export default function CourseHero({ course, studentCourse, ...other }) {
  const { course_id, image_url, name, professor, created_at, slug } = course

  return (
    <RootStyle {...other}>
      <CoverImgStyle alt="post cover" src={image_url} />

      <TitleStyle variant="h2" component="h1">
        {name}
      </TitleStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={professor && professor.user.name}
            src={professor && professor.user.avatar_url}
            sx={{ width: 48, height: 48 }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {professor && professor.user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              Ngày đăng {fDate(created_at)}
            </Typography>
          </Box>
        </Box>
        <Link to={`/${slug}`} component={RouterLink}>
          <Button variant="contained">
            {`${studentCourse && course_id === studentCourse.course_id ? 'Học ngay' : 'Đăng ký học miễn phí'}`}
          </Button>
        </Link>
      </FooterStyle>
    </RootStyle>
  )
}
