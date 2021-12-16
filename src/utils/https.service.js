import axios from 'axios';
import { config as conf } from '../config/conf';
import { storageService } from './storage.service';

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
            // headers: '';
            ...options,
        })
    }

    makeRequest(config) {
        //config.headers['Content-Type'] = 'application/json';

        const storage =  storageService.get('accessToken') 

        
        if (storage) {
            config.headers = { Authorization: 'Bearer' + storage }
        } 
        
        // add 401 error handler

        return axios({
            ...config,
            url: conf.baseUrl + config.url,
        
        }).then(response => response.data).catch(e=> console.log(e)) //err.code === 401  if (localStorage.get(refreshT)) { jwtMiddlewere with refresh (add to back) , request with new Access token: console.log(err.message));
    }

}

export const httpsService = new HttpsService();
