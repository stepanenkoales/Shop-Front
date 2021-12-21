import axios from 'axios'
import { config as conf } from '../config/conf'
import { storageService } from './storage.service'
import { notificationService } from './notification.service'

class HttpsService {
  get(url, options) {
    return this.makeRequest({
      url,
      method: 'GET',
      ...options,
    })
  }

  post(url, body, options) {
    return this.makeRequest({
      url,
      data: body,
      method: 'POST',
      ...options,
    })
  }

  put(url, body, options) {
    return this.makeRequest({
      url,
      data: body,
      method: 'PUT',
      ...options,
    })
  }

  delete(url, body, options) {
    return this.makeRequest({
      url,
      data: body,
      method: 'DELETE',
      ...options,
    })
  }

  makeRequest(config) {
    const token = storageService.get('accessToken')
    if (token) {
      config.headers = { Authorization: 'Bearer' + token }
    }

    return axios({
      ...config,
      url: conf.baseUrl + config.url,
    })
      .then((response) => response.data)
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            notificationService.openNotification(
              'error',
              err.response.statusText,
              err.response.data.message
            )
            if (err.response.data.message === 'token expired') {
            }
            break
          case 409:
            notificationService.openNotification(
              'error',
              err.response.statusText,
              err.response.data.message
            )
            break
          default:
            notificationService.openNotification(
              'error',
              err.response.statusText,
              err.response.data.message
            )
        }
        return err.response
      })
  }
}

export const httpsService = new HttpsService()
