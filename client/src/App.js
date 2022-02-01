import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
//components
import SignUp from './Components/UserSignUp';
import LogIn from './Components/UserLogIn';
import Dashboard from './Components/Dashboard';

import api from './api'

function App() {

  const [coinsData, setCoinsData] = useState([])
  const [bitcoinLikes, setBitcoinLikes] = useState({})
  const [ethereumLikes, setEthereumLikes] = useState({})
  const [dogeLikes, setDogeLikes] = useState({})


  useEffect(()=>{
    api
    .getCoins()
    .then(res => {
      setCoinsData(res)
      setBitcoinLikes(res[0])
      setEthereumLikes(res[1])
      setDogeLikes(res[2])
    })

},[coinsData])

  return (
    <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<LogIn/>} />
            <Route exact path='/signup' element={<SignUp/>}/>
            <Route 
                exact path='/dashboard' 
                element={
                <Dashboard               
                btcLikes={bitcoinLikes}
                ethLikes={ethereumLikes}
                dogeLikes={dogeLikes}/>
              } />

          </Routes>
        </Router>
    </div>
  );
}

export default App;
