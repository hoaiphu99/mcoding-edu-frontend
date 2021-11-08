export const getGoogleDriveFileId = (url) => {
  // eslint-disable-next-line
  const regExp = /^.*(drive.google.com\/file\/d\/)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 38 ? match[2].split('/')[0] : false
}

export const getYoutubeVideoId = (url) => {
  // eslint-disable-next-line
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : false
}
