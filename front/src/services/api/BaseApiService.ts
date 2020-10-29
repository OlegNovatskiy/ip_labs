import axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'

export abstract class BaseApiService {
  protected api: AxiosStatic

  constructor () {
    this.api = axios
  }

  protected callMethod (
    method: string,
    url: string,
    requestData?: object | null,
    responseKey?: string | null,
    config?: AxiosRequestConfig
  ) {
    const requestedMethod = method.toLowerCase()

    switch (requestedMethod) {
      case 'get' :
        return this.api.get(url, config)
          .then((response: AxiosResponse) => {
            return response.data
          })

      case 'post' :
        return this.api.post(url, requestData, config)
          .then((response: AxiosResponse) => {
            return response.data
          })

      case 'put' :
        return this.api.put(url, requestData, config)
          .then((response: AxiosResponse) => {
            return response.data
          })

      case 'patch' :
        return this.api.patch(url, requestData, config)
          .then((response: AxiosResponse) => {
            return response.data
          })

      case 'delete' :
        return this.api.delete(url, config)
          .then((response: AxiosResponse) => {
            return response.data
          })
      default:
        throw new Error('An undefined method called.')
    }
  }
}
