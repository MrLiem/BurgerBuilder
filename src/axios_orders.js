import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-6636e.firebaseio.com/'
})

export default instance