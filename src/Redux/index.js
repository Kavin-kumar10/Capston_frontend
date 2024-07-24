import { configureStore,combineReducers } from '@reduxjs/toolkit'
import MemberSlice from './MemberSlice';
import logger from 'redux-logger'


const reducer = combineReducers({
    Members:MemberSlice
})


export const store = configureStore({
  reducer:reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store