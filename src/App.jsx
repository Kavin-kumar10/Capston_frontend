import './App.css';
import { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getMembers, getMyProfile } from './Redux/MemberSlice';
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
          <Route path='/' element={<Profile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
