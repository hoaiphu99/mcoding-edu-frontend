import PropTypes from 'prop-types'

const getVideoID = (videoUrl) => {
  // eslint-disable-next-line
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = videoUrl.match(regExp)
  return match && match[2].length === 11 ? match[2] : false
}

CourseEmbedYoutube.propTypes = {
  videoUrl: PropTypes.string.isRequired,
}

export default function CourseEmbedYoutube({ videoUrl }) {
  const videoID = getVideoID(videoUrl)

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
