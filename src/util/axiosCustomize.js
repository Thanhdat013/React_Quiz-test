import axios from "axios"
import { store } from "~/redux/store"

const NO_RETRY_HEADER = "x-no-retry"

const getAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
})

// call api to refresh token
const handleRefreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token")
    const res = await getAxios.post("/api/v1/refresh-token", refresh_token)
    if (res && res.DT) return res.DT.access_token
  } catch (e) {
    console.log("Error", e)
  }
}

getAxios.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token
    config.headers["Authorization"] = `Bearer ${access_token}`

    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
getAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response && response.data ? response.data : response
  },
  async function (error) {
    // refresh token
    if (
      error?.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken()
      error.config.headers[NO_RETRY_HEADER] = "true"
      if (access_token) {
        console.log("refresh token")
        localStorage.setItem("access_token", access_token)
        error.config.headers["Authorization"] = `Bearer ${access_token}`
        return getAxios.request(error.config)
      }
    }

    // khi hết thời gian của refresh token

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      window.location.href = "/login"
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error)
  }
)

export default getAxios
