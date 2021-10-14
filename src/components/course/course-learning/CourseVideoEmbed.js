import PropTypes from 'prop-types'
// material
import { styled } from '@mui/material/styles'
// import { Typography } from '@mui/material'
// components
import CourseEmbedYoutube from './CourseEmbedYoutube'
// utils
// import { fDate } from '../../../utils/formatTime'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: 480,
  position: 'relative',
}))

const VideoEmbedStyle = styled(CourseEmbedYoutube)({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
})

// ----------------------------------------------------------------------

CourseVideoEmbed.propTypes = {
  videoUrl: PropTypes.string.isRequired,
}

export default function CourseVideoEmbed({ videoUrl, ...other }) {
  return (
    <RootStyle {...other}>
      <VideoEmbedStyle videoUrl={videoUrl} />
    </RootStyle>
  )
}
