import { configureStore,combineReducers } from '@reduxjs/toolkit'
import MemberSlice from './MemberSlice';
import logger from 'redux-logger'
import PicturesSlice from './PicturesSlice';


const reducer = combineReducers({
    Members:MemberSlice,
    Picture:PicturesSlice
})


export const store = configureStore({
  reducer:reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(logger),
})

export default store