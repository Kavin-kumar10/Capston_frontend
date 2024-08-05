import { configureStore,combineReducers } from '@reduxjs/toolkit'
import MemberSlice from './MemberSlice';
// import logger from 'redux-logger'
import PicturesSlice from './PicturesSlice';
import MatchSlice from './MatchSlice';
import AuthSlice from './AuthSlice';
import LikeSlice from './LikeSlice';
import AdminSlice from './AdminSlice';


const reducer = combineReducers({
    Members:MemberSlice,
    Picture:PicturesSlice,
    Match:MatchSlice,
    Auth:AuthSlice,
    Like:LikeSlice,
    Admin:AdminSlice
})


export const store = configureStore({
  reducer:reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(logger),
})

export default store