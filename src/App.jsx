import './App.css';
import { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getMembers, getMyProfile } from './Redux/MemberSlice';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Profile from './Pages/Profile';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMembers())
    dispatch(getMyProfile())
  },[dispatch])
  return (
    <Router>
      <div className="App overflow-x-hidden">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Profile/:userid' element={<Profile/>}/>
          <Route path='/Account' element={<Account/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
