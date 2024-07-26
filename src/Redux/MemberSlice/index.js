import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getMembers = createAsyncThunk('gets/getMembers',async () =>{
    return axios.get('https://localhost:7073/api/Member').then((res)=>{
        return res.data;
    })
})

export const getMemberById = createAsyncThunk('gets/getMemberById',async (id) =>{
    return axios.get(`https://localhost:7073/api/Member/Profile/${id}`).then((res)=>{
        return res.data;
    })
})

export const getMyProfile = createAsyncThunk('gets/getMyProfile',async () =>{
    return axios.get('https://localhost:7073/api/Member/Profile/1').then((res)=>{
        return res.data;
    })
})

const MemberSlice = createSlice({
    name:"Member",
    initialState:{
        allMembers:[],
        Profile:{},
        Selected:{},
        loading:[]
    },
    reducers:{

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getMembers.fulfilled, (state, action) => {
          // Add user to the state array
          state.allMembers = action.payload;
        })
        builder.addCase(getMyProfile.fulfilled,(state,action)=>{
            state.Profile = action.payload;
        })
        builder.addCase(getMemberById.fulfilled,(state,action)=>{
            state.Selected = action.payload;
        })
      },
})

export default MemberSlice.reducer