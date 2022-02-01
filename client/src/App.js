import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//components
import SignUp from './Components/UserSignUp';
import LogIn from './Components/UserLogIn';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route exact path='/' 
                   element={<LogIn/>} 
            />
            <Route exact path='/signup' 
                   element={<SignUp/>}
            />
            <Route exact path='/dashboard' 
                   element={<Dashboard/>} 
            />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
