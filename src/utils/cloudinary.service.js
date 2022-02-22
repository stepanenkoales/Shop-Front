import { Cloudinary } from '@cloudinary/url-gen'
import { fit } from '@cloudinary/url-gen/actions/resize'
import { httpsService } from './https.service'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../config/conf'

class CloudinaryService {
  async uploadImage(base64EncodedImage) {
    const public_id = uuidv4()
    const formData = new FormData()
    formData.append('file', base64EncodedImage)
    formData.append('public_id', public_id)
    return await httpsService.post('/cloudinary/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  deleteImage(public_id) {
    return httpsService.post('/cloudinary/delete', { public_id })
  }

  getProductCardImage(publicId, width, height) {
    const cld = new Cloudinary({
      cloud: {
        cloudName: config.cloudName,
      },
    })
    const myImage = cld.image(publicId)
    myImage.resize(
      fit()
        .width(width ? width : 150)
        .height(height ? height : 150)
    )

    return myImage
  }
}

export const cloudinaryService = new CloudinaryService()
