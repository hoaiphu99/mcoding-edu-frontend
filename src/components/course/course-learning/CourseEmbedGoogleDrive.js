import PropTypes from 'prop-types'
// utils
import { getGoogleDriveFileId } from '../../../utils/getFileType'

CourseEmbedGoogleDrive.propTypes = {
  url: PropTypes.string.isRequired,
}

export default function CourseEmbedGoogleDrive({ url }) {
  const fileId = getGoogleDriveFileId(url)

  return (
    <iframe
      title="Google Drive video player"
      src={`https://drive.google.com/file/d/${fileId}/preview`}
      width="100%"
      height="100%"
      allow="autoplay"
      allowFullScreen
    />
  )
}
