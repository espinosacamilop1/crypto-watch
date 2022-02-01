import React, {useState,useEffect} from 'react';
import api from '../../api/index';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
export default function Dashboard({btcLikes,ethLikes,dogeLikes}) {

    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [bitcoinFavorite, setBitcoinFavorite] = useState()
    const [ethFavorite, setEthFavorite] = useState()
    const [dogeFavorite, setDogeFavorite] = useState()
    const [bitcoinData, setBitcoinData] = useState({})
    const [ethData, setEthData] = useState({})
    const [dogeData, setDogeData] = useState({})

    useEffect( ()=>{
      api
        .loggedin()
        .then(res => {
            setUser(res)
            setBitcoinFavorite(res.favorites.Bitcoin)
            setEthFavorite(res.favorites.Ethereum)
            setDogeFavorite(res.favorites.Doge)
            })


    },[user])


    //gets bitcoin data
    useEffect(async()=>{
    await    axios
            .get('https://api.coinbase.com/v2/prices/BTC-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setBitcoinData(data)
            })
    },[])


    //gets eth data
    useEffect(async()=>{
    await     axios
            .get('https://api.coinbase.com/v2/prices/ETH-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setEthData(data)
            })
    },[])
    
    //gets doge data
    useEffect(async ()=>{
     await   axios
            .get('https://api.coinbase.com/v2/prices/DOGE-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setDogeData(data)
            })
    },[])


    const logOutHandler = () =>{
        api.logout()
            .then((res) =>{
                navigate('/')
                console.log('logged out successfully')
                setUser({})
                res.clearCookie('connect. sid', { path: '/' })
            })
    }



  return <div>{
            <div>
            <button onClick={logOutHandler}>Logout</button>
                <h1>Welcome {user.username}</h1>
                <h2>Crypto Live Price Tracker</h2>

                <div>
                    <h3>Bitcoin</h3> 
                    <p>${bitcoinData.amount}</p>
                    <button value='Bitcoin' onClick={(value)=>{ 
                        const newUser = user;
                        const coin = value.target.value;
                        newUser.favorites[coin] = !newUser.favorites[coin]
                        setUser(newUser);
                        const id = user._id
                        console.log(newUser)
                        api.updateCoinValue(newUser, id)
                            .then(res => console.log(res))   
                    }}>{!bitcoinFavorite? 'Like': 'Unlike'}</button>


                    <p>Likes {btcLikes.favorites}</p>
                </div>
                <div>
                    <h3>Ethereum</h3> 
                    <p>${ethData.amount}</p>
                    <button value='Ethereum' onClick={(value)=>{ 
                        const newUser = user;
                        const coin = value.target.value;
                        newUser.favorites[coin] = !newUser.favorites[coin]
                        setUser(newUser);
                        const id = user._id
                        console.log(newUser)
                        api.updateCoinValue(newUser, id)
                            .then(res => console.log(res))
                        
                    }}>{!ethFavorite? 'Like': 'Unlike'}</button>
                
                    <p>Likes {ethLikes.favorites}</p>

                </div>
                <div>
                    <h3>Dogecoin</h3> 
                    <p>${dogeData.amount}</p>
                    <button value='Doge' onClick={(value)=>{ 
                        const newUser = user;
                        const coin = value.target.value;
                        const likeValue = newUser.favorites[coin]
                        newUser.favorites[coin] = !newUser.favorites[coin]
                        setUser(newUser);
                        const id = user._id
                        const coinId = dogeLikes._id
                        const likeTotal = Number(dogeLikes.favorites)
                        console.log(coinId)
                        api.updateCoinValue(newUser, id)
                            .then(res => console.log(res))
                        api.updateLikes(coinId, coin, likeValue, likeTotal)
                            .then(res => console.log(res))
                        
                    }}>{dogeFavorite? 'Like': 'Unlike'}</button>
                    <p>Likes {dogeLikes.favorites}</p>

                </div>
        </div> 
      }
    

  </div>
  
}
