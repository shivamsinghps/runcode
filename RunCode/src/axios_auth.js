import axios from 'axios'

const instance = axios.create({
  baseURL: " endpoint"
})

export default instance
