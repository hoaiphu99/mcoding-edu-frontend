export const getDuration = (file) =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src)

      if (video.duration < 1) {
        reject(new Error('Video is too short'))
      }
      const { duration } = video
      resolve(duration)
    }

    video.src = URL.createObjectURL(file)
  })
