import axios from 'axios'


//this file connects the React calls to the back end of the application

const api = axios.create({
    baseURL: 'http://localhost:5000',
withCredentials: true})

 const signup = (username, password, favorites) => api.post('/signup', {username, password, favorites}).then(res => res.data)

 const login = (username, password) => api.post('/login', {username, password}).then(res => res.data)

 const loggedin = () => api.get('/loggedin').then(res => res.data)

 const logout = () => api.post('/logout', {}).then(res => res.data)

 const getCoins = () => api.get('/coin-data').then(res => res.data)
 
 const updateCoinValue = (newUser,id) => api.put('/update-coin-value',{newUser,id}).then(res => res.data)

 const updateLikes = (coinId, coin, likeValue, likeTotal) => api.post('/like-counter', {coinId,coin, likeValue, likeTotal}).then(res => res.data)

const apis = {
    signup,
    login,
    loggedin,
    logout,
    getCoins,
    updateCoinValue,
    updateLikes
}

export default apis;