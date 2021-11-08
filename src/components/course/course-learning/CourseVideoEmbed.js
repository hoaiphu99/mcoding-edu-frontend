import PropTypes from 'prop-types'
// material
import { styled } from '@mui/material/styles'
// import { Typography } from '@mui/material'
// components
import CourseEmbedYoutube from './CourseEmbedYoutube'
import CourseEmbedGoogleDrive from './CourseEmbedGoogleDrive'
// utils
import { getGoogleDriveFileId } from '../../../utils/getFileType'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: 480,
  position: 'relative',
}))

const YoutubeVideoEmbedStyle = styled(CourseEmbedYoutube)({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
})

const GGDVideoEmbedStyle = styled(CourseEmbedGoogleDrive)({
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
  const checkTypeUrl = getGoogleDriveFileId(videoUrl)
  return (
    <RootStyle {...other}>
      {checkTypeUrl ? <GGDVideoEmbedStyle url={videoUrl} /> : <YoutubeVideoEmbedStyle videoUrl={videoUrl} />}
    </RootStyle>
  )
}
