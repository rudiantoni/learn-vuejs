const BASE_URL = 'http://localhost:3000'

const http = async (request) => {
  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error('HTTP response was not OK')
    }
    return { response: response, data: await response.json() }
  } catch (e) {
    console.error('HTTP error: ', e)
    throw e
  }

}

const apiService = {

  get: async (route) => {
    const reqUrl = `${BASE_URL}${route}`

    const reqConfig = {
      method: 'GET'
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  },

  post: async (route, body) => {
    const reqUrl = `${BASE_URL}${route}`
    const reqBody = JSON.stringify(body)
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')

    const reqConfig = {
      method: 'POST',
      headers: reqHeaders,
      body: reqBody
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  },

  delete: async (route) => {
    const reqUrl = `${BASE_URL}${route}`

    const reqConfig = {
      method: 'DELETE'
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  },

  patch: async (route, body) => {
    const reqUrl = `${BASE_URL}${route}`
    const reqBody = JSON.stringify(body)
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')

    const reqConfig = {
      method: 'PATCH',
      headers: reqHeaders,
      body: reqBody
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  }

}

export {
  apiService
}
