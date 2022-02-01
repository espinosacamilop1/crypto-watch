import React, {useState,useEffect} from 'react';
import api from '../../api/index';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
export default function Dashboard() {

    const navigate = useNavigate()
    const [user, setUser] = useState({})

    const [bitcoinFavorite, setBitcoinFavorite] = useState()
    const [ethFavorite, setEthFavorite] = useState()
    const [dogeFavorite, setDogeFavorite] = useState()


    const [bitcoinData, setBitcoinData] = useState({})
    const [ethData, setEthData] = useState({})
    const [dogeData, setDogeData] = useState({})



  const [bitcoinLikes, setBitcoinLikes] = useState({})
  const [ethereumLikes, setEthereumLikes] = useState({})
  const [dogeLikes, setDogeLikes] = useState({})

  const [btcLikeCtn, setBtcLikeCtn] = useState()
  const [ethLikeCtn, setEthLikeCtn] = useState()
  const [dogeLikeCtn, setDogeLikeCtn] = useState()


  console.log(btcLikeCtn,ethLikeCtn,dogeLikeCtn)


  useEffect(()=>{
    api
      .getCoins()
      .then(res => {
        const btcData = res[0];
        setBitcoinLikes(btcData)
        setBtcLikeCtn(btcData.favorites)
        const ethData = res[1];
        setEthereumLikes(ethData)
        setEthLikeCtn(ethData.favorites)
        const dogeData = res[2];
        setDogeLikes(dogeData)
        setDogeLikeCtn(dogeData.favorites)
      })
    },[btcLikeCtn, ethLikeCtn,dogeLikeCtn])

    useEffect( ()=>{
      api
        .loggedin()
        .then(res => {
            setUser(res)
            setBitcoinFavorite(res.favorites.Bitcoin)
            setEthFavorite(res.favorites.Ethereum)
            setDogeFavorite(res.favorites.Doge)
            })
    },[btcLikeCtn, ethLikeCtn,dogeLikeCtn])

    useEffect( ()=>{
        api
          .loggedin()
          .then(res => {
              setUser(res)
              setDogeFavorite(res.favorites.Doge)
              })
      },[btcLikeCtn])



    //gets bitcoin data
    useEffect(()=>{
        axios
            .get('https://api.coinbase.com/v2/prices/BTC-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setBitcoinData(data)
            })
    },[])


    //gets eth data
    useEffect(()=>{
         axios
            .get('https://api.coinbase.com/v2/prices/ETH-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setEthData(data)
            })
    },[])
    
    //gets doge data
    useEffect( ()=>{
        axios
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
                    <button value='Bitcoin' 
                            onClick={(value)=>{ 
                        
                                const newUser = user;
                                const coin = value.target.value;
                                setBitcoinFavorite(!newUser.favorites[coin])

                                if(bitcoinFavorite === false){
                                    const newCtn = btcLikeCtn - 1
                                    setBtcLikeCtn(newCtn)
                                }else if(bitcoinFavorite === false){
                                    const newCtn = btcLikeCtn + 1;
                                    setBtcLikeCtn(newCtn)
                                }

                                newUser.favorites[coin] = !newUser.favorites[coin]

                                setUser(newUser);

                                const id = user._id


                                api.updateCoinValue(newUser, id)
                                    .then(res => console.log(res))
                                    
                                const likeValue = newUser.favorites[coin]
                                const coinId = bitcoinLikes._id
                                const likeTotal = Number(bitcoinLikes.favorites)

                                api.updateLikes(coinId, coin, likeValue, likeTotal)
                                .then(res => console.log(res))


                    }}>{!bitcoinFavorite? 'Like': 'Unlike'}</button>


                    <p>Likes {btcLikeCtn}</p>
                </div>
                <div>
                    <h3>Ethereum</h3> 
                    <p>${ethData.amount}</p>
                    <button value='Ethereum' 
                            onClick={(value)=>{ 
                                const newUser = user;
                                const coin = value.target.value;

                                setEthFavorite(!newUser.favorites[coin])

                                if(ethFavorite === false){
                                    const newCtn = ethLikeCtn + 1
                                    setEthLikeCtn(newCtn)
                                }else if(ethFavorite === false){
                                    const newCtn = ethLikeCtn - 1;
                                    setEthLikeCtn(newCtn)
                                }



                                newUser.favorites[coin] = !newUser.favorites[coin]

                                setUser(newUser);

                                const id = user._id

                                api.updateCoinValue(newUser, id)
                                    .then(res => console.log(res))

                                const likeValue = newUser.favorites[coin]
                                const coinId = ethereumLikes._id
                                const likeTotal = Number(ethereumLikes.favorites)

                                api.updateLikes(coinId, coin, likeValue, likeTotal)
                                .then(res => console.log(res))

                    }}>{!ethFavorite? 'Like': 'Unlike'}</button>
                
                    <p>Likes {ethLikeCtn}</p>

                </div>
                <div>
                    <h3>Dogecoin</h3> 
                    <p>${dogeData.amount}</p>
                    <button value='Doge' 
                            onClick={(value)=>{
                                const newUser = user;
                                const coin = value.target.value;

                                setDogeFavorite(!newUser.favorites[coin])

                                if(dogeFavorite === false){
                                    const newCtn = dogeLikeCtn + 1
                                    setDogeLikeCtn(newCtn)
                                }else if(dogeFavorite === false){
                                    const newCtn = dogeLikeCtn - 1;
                                    setDogeLikeCtn(newCtn)
                                }


                                newUser.favorites[coin] = !newUser.favorites[coin]

                                setUser(newUser);

                                const id = user._id
                                const coinId = dogeLikes._id
                                const likeTotal = Number(dogeLikes.favorites)
                                const likeValue = newUser.favorites[coin]

                                api.updateCoinValue(newUser, id)
                                    .then(res => console.log(res))

                                api.updateLikes(coinId, coin, likeValue, likeTotal)
                                    .then(res => console.log(res))
                                
                    }}>{!dogeFavorite? 'Like': 'Unlike'}</button>
                    <p>Likes {dogeLikeCtn}</p>

                </div>
        </div> 
      }
    

  </div>
  
}
