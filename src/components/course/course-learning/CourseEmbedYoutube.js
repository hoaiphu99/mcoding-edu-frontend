import PropTypes from 'prop-types'
// utils
import { getYoutubeVideoId } from '../../../utils/getFileType'

CourseEmbedYoutube.propTypes = {
  videoUrl: PropTypes.string.isRequired,
}

export default function CourseEmbedYoutube({ videoUrl }) {
  const videoID = getYoutubeVideoId(videoUrl)

  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoID}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
