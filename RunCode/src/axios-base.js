import axios from 'axios'

const instance = axios.create({
  baseURL:'https://react-burger-47284.firebaseio.com/',
})

export default instance
