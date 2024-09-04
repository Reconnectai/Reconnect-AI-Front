export const cropImage = (
  imageSrc: string,
  croppedAreaPixels: { width: number; height: number; x: number; y: number } | null,
  onComplete: (croppedImage: string) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!croppedAreaPixels) {
      reject('No cropped area selected')
      return
    }

    const canvas = document.createElement('canvas')
    const image = new Image()
    image.src = imageSrc

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = croppedAreaPixels.width
    canvas.height = croppedAreaPixels.height

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject('Failed to get canvas context')
      return
    }

    ctx.drawImage(
      image,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    )

    const croppedImage = canvas.toDataURL('image/jpeg')
    onComplete(croppedImage)
    resolve(croppedImage)
  })
}

export const urlToBlob = async (image: string) => {
  const base64Response = await fetch(image)
  const blob = await base64Response.blob()
  return new Promise<Blob>((resolve, reject) => {
    resolve(blob)
    reject()
  })
}
