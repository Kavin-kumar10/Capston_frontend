import './App.css';
import { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getMembers, getMyProfile } from './Redux/MemberSlice';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Profile from './Pages/Profile';
import { getMatchesWithMemberId } from './Redux/MatchSlice';
import Matches from './Pages/Matches';
import Search from './Pages/Search';
import LikeScreen from './Pages/LikeScreen';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMembers())
    dispatch(getMyProfile())
    dispatch(getMatchesWithMemberId());
  },[dispatch])
  const token = JSON.parse(localStorage.getItem('token'));
console.log(token);
  return (
    <Router>
      <div className="App overflow-x-hidden">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Profile/:userid' element={<Profile/>}/>
          <Route path='/Account' element={<Account/>}/>
          <Route path='/Matches' element={<Matches/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Like' element={<LikeScreen/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
