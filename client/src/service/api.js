import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constrants/config';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({          // base api
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(                 // request interceptors
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(                // response interceptors
    function (response) {
        // can stop global loader here
        return processResponse(response);
    },
    function (error) {
        // can stop global loader here
        return Promise.reject(processError(error));
    }
)

// if success -> return { isSuccess: true, data: Object }
// if fall -> return { isFaliure: true, status: string, msg: string, code: int}

const processResponse = (response) => {
    if(response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFaliure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if (error.response){
        // Request success and server responded with status
        // falls out of the range 2.x.x
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.response) {
        // Request made but no response
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        // Something wrong in setting up request that triggers an error
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)){       // value is object
    API[key] = (body, showUploadProgress, showDownloadProgress) =>       // when we need to show upload/download bar from 0 to 100%
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total)
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total)
                    showDownloadProgress(percentCompleted);
                }
            }
        })
}

export { API };