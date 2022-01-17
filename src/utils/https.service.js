import axios from 'axios'
import { config as conf } from '../config/conf'
import { storageService } from './storage.service'

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
    const accessToken = storageService.get('accessToken')

    if (accessToken) {
      config.headers = { Authorization: 'Bearer ' + accessToken }
    }

    return axios({
      ...config,
      url: conf.baseUrl + config.url,
    })
      .then((res) => res.data)
      .catch((err) => {
        const refreshToken = storageService.get('refreshToken')

        if (err.response.status === 401 && refreshToken) {
          return this.post('/user/refresh', { refreshToken })
            .then((res) => {
              storageService.set('accessToken', res.accessToken)
              storageService.set('refreshToken', res.refreshToken)
              return this.makeRequest(config)
            })
            .catch((err) => {
              storageService.remove('accessToken')
              storageService.remove('refreshToken')

              throw err
            })
        }

        throw err
      })
  }
}

export const httpsService = new HttpsService()
