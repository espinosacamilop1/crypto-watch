import React, {useState,useEffect} from 'react';
import api from '../../api/index';
import {useNavigate} from 'react-router-dom';
import axios from 'axios' 

import '../../styles/index.css'

//MUI Components
import Button from '@mui/material/Button';


export default function Dashboard() {

    const navigate = useNavigate()

    //state that saves the current user information
    const [user, setUser] = useState({})

    //this state saves whether the user has made the coin a favorite returns True or False
    const [bitcoinFavorite, setBitcoinFavorite] = useState()
    const [ethFavorite, setEthFavorite] = useState()
    const [dogeFavorite, setDogeFavorite] = useState()

    //this state saves the data gathered from the Coinbase API for each coin
    const [bitcoinData, setBitcoinData] = useState({})
    const [ethData, setEthData] = useState({})
    const [dogeData, setDogeData] = useState({})


    //this state saves the data for each coin from the back end, the name, the total favorited
    const [bitcoinLikes, setBitcoinLikes] = useState({})
    const [ethereumLikes, setEthereumLikes] = useState({})
    const [dogeLikes, setDogeLikes] = useState({})

    //this state saved the total favorited for each coin to display easily on the front end
    const [btcLikeCtn, setBtcLikeCtn] = useState()
    const [ethLikeCtn, setEthLikeCtn] = useState()
    const [dogeLikeCtn, setDogeLikeCtn] = useState()


    //this useEffect gets the coin info from our DB and sets the states
    //it also listens to changes in "btcLikeCtn, ethLikeCtn, dogeLikeCtn" states to automatically update
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

    //this useEffect gets the user data from  our DB and sets the states "bitcoinFavorite, EthFavorite, DogeFavorite"
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

    //gets bitcoin data from Coinbase API
    useEffect(()=>{
        axios
            .get('https://api.coinbase.com/v2/prices/BTC-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setBitcoinData(data)
            })
    },[])


    //gets eth data from Coinbase API
    useEffect(()=>{
         axios
            .get('https://api.coinbase.com/v2/prices/ETH-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setEthData(data)
            })
    },[])
    
    //gets doge data from Coinbase API
    useEffect( ()=>{
        axios
            .get('https://api.coinbase.com/v2/prices/DOGE-USD/spot'
            ).then(res =>{
                const data = res.data.data;
                setDogeData(data)
            })
    },[])

    //this function calls the logout function in our "apis" to be able to successfully log out
    const logOutHandler = () =>{
        api.logout()
            .then((res) =>{
                navigate('/')
                setUser({})
                res.clearCookie('connect. sid', { path: '/' })
            })
    }



  return <div>{
            <div>
                <div>
                    <Button variant='contained' onClick={logOutHandler}>Logout</Button>
                    <h1 className='userHeading'>Welcome {user.username}</h1>
                    <h2 className='mainHeading'>Crypto Live Price Tracker</h2>
                </div>
                <div className='allCoins'>
                    <div className='card'>
                        <div className='namePrice'>
                            <h3>Bitcoin</h3> 
                            <p>${bitcoinData.amount}</p>
                        </div>
                        <div className='likeBtn'>
                            <p>{btcLikeCtn}</p>
                            <Button value='Bitcoin' 
                                //this onclick does quite a few things   
                                onClick={(value)=>{ 
                                                                
                                    //first it makes a copy of the user State to be able to change it without affecting the main data
                                    const newUser = user;

                                    //gets the name of the coin being worked on
                                    const coin = value.target.value;

                                    //sets whether the coin has been set to favorite by the user
                                    setBitcoinFavorite(!newUser.favorites[coin])

                                    //checks whether the coin has been set to favorite by the user
                                    //then it adds or substracts 1 based on whether the user is liking or disliking the coin
                                    if(bitcoinFavorite === false){
                                        const newCtn = btcLikeCtn + 1
                                        setBtcLikeCtn(newCtn)
                                    }else{
                                        const newCtn = btcLikeCtn - 1;
                                        setBtcLikeCtn(newCtn)
                                    }

                                    //changes the value of 'liked' on click to the opposite
                                    newUser.favorites[coin] = !newUser.favorites[coin]

                                    //uses the newUser variable that has already been modified to update the state
                                    setUser(newUser);


                                    //gets the user id to pass it to the back end to search for the user
                                    //then the api call is made
                                    const id = user._id
                                    api.updateCoinValue(newUser, id)
                                        .then(res => {})
                                        
                                    //constants needed to search and update the coin on our end and add or decrease likes
                                    const likeValue = newUser.favorites[coin]
                                    const coinId = bitcoinLikes._id
                                    const likeTotal = Number(bitcoinLikes.favorites)

                                    //the api call is made
                                    api.updateLikes(coinId, coin, likeValue, likeTotal)
                                    .then(res => {})


                        }}>
                            {!bitcoinFavorite? 'Like': 'Dislike'}
                            {/* basic usage of ternary to decide whether the button will show 'like' of 'dislike  */}
                        </Button>
                        </div>
                       
                    </div>
                    <div className='card'>
                        <div className='namePrice'> 
                            <h3>Ethereum</h3> 
                            <p>${ethData.amount}</p>
                        </div>
                        <div className='likeBtn'>
                        <p>{ethLikeCtn}</p>
                        <Button value='Ethereum' 
s                                //this onclick has the same purpose as the BTC one just changed to ETH
                                onClick={(value)=>{ 

                                    //first it makes a copy of the user State to be able to change it without affecting the main data
                                    const newUser = user;

                                    //gets the name of the coin being worked on
                                    const coin = value.target.value;

                                    //sets whether the coin has been set to favorite by the user
                                    setEthFavorite(!newUser.favorites[coin])

                                    //checks whether the coin has been set to favorite by the user
                                    //then it adds or substracts 1 based on whether the user is liking or disliking the coin
                                    if(ethFavorite === false){
                                        const newCtn = ethLikeCtn + 1
                                        setEthLikeCtn(newCtn)
                                    }else{
                                        const newCtn = ethLikeCtn - 1;
                                        setEthLikeCtn(newCtn)
                                    }

                                    //changes the value of 'liked' on click to the opposite
                                    newUser.favorites[coin] = !newUser.favorites[coin]

                                    //uses the newUser variable that has already been modified to update the state
                                    setUser(newUser);

                                    //gets the user id to pass it to the back end to search for the user
                                    //then the api call is made
                                    const id = user._id
                                    api.updateCoinValue(newUser, id)
                                        .then(res => {})


                                    //constants needed to search and update the coin on our end and add or decrease likes
                                    const likeValue = newUser.favorites[coin]
                                    const coinId = ethereumLikes._id
                                    const likeTotal = Number(ethereumLikes.favorites)

                                    //the api call is made
                                    api.updateLikes(coinId, coin, likeValue, likeTotal)
                                    .then(res =>{})

                        }}>{!ethFavorite? 'Like': 'Dislike'}
                            {/* basic usage of ternary to decide whether the button will show 'like' of 'dislike  */}
                        </Button>
                        </div>

                    </div>
                    <div className='card'>
                        <div className='namePrice'>
                            <h3>Dogecoin</h3> 
                            <p>${dogeData.amount}</p>
                        </div>
                        <div className='likeBtn'>
                        <p>{dogeLikeCtn}</p>
                        <Button value='Doge' 
                                //this onclick has the same purpose as the BTC one just changed to ETH
                                onClick={(value)=>{

                                    //first it makes a copy of the user State to be able to change it without affecting the main data
                                    const newUser = user;
                                    
                                    //gets the name of the coin being worked on
                                    const coin = value.target.value;

                                    //sets whether the coin has been set to favorite by the user
                                    setDogeFavorite(!newUser.favorites[coin])

                                    //checks whether the coin has been set to favorite by the user
                                    //then it adds or substracts 1 based on whether the user is liking or disliking the coin
                                    if(dogeFavorite === false){
                                        const newCtn = dogeLikeCtn + 1
                                        setDogeLikeCtn(newCtn)
                                    }else{
                                        const newCtn = dogeLikeCtn - 1;
                                        setDogeLikeCtn(newCtn)
                                    }


                                    //changes the value of 'liked' on click to the opposite
                                    newUser.favorites[coin] = !newUser.favorites[coin]

                                    //uses the newUser variable that has already been modified to update the state
                                    setUser(newUser);

                                    //gets the user id to pass it to the back end to search for the user
                                    //then the api call is made
                                    const id = user._id
                                    api.updateCoinValue(newUser, id)
                                        .then(res => {})

                                    //constants needed to search and update the coin on our end and add or decrease likes
                                    const coinId = dogeLikes._id
                                    const likeTotal = Number(dogeLikes.favorites)
                                    const likeValue = newUser.favorites[coin]

                                    //the api call is made
                                    api.updateLikes(coinId, coin, likeValue, likeTotal)
                                        .then(res => {})
                                    
                        }}>{!dogeFavorite? 'Like': 'Dislike'}
                            {/* basic usage of ternary to decide whether the button will show 'like' of 'dislike  */}
                        </Button>

                        </div>
                    </div>
                </div>
        </div> 
      }
    

  </div>
}