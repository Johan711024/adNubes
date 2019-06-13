import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://react-my-burger.firebaseio.com/'
    baseURL: 'https://my-burger-project-324a7.firebaseio.com/'
});

export default instance;