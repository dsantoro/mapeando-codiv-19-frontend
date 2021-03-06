const API_URL = 'http://localhost:8080'

async function parseResponse(response) {
  try {
    const responseJson = await response.json()
    if (responseJson && response.status >= 200 && response.status < 300) {
      return responseJson
    } else {
      return Promise.reject(responseJson)
    }
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

export async function callAPI(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options)
    const json = await parseResponse(response)
    return json
  } catch (error) {
    return Promise.reject(error)
  }
}
