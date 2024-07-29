import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicHJhdmluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3MjI0MDA3ODd9.B-sAy-JLf1enEv0c1T3U63jzF0DWbUxNRXywJp_pRvSIQceUBWwUxvX4uSdW2HToSq3SI_MXzwE0p9vk6ATnPw'

const token = JSON.parse(localStorage.getItem('token'));
console.log(token);

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
    return axios.get('https://localhost:7073/api/Member/Profile/3').then((res)=>{
        return res.data;
    })
})

export const getPersonalInformationByMemberId = createAsyncThunk('gets/getsPersonalInformation',async () =>{
    try {
        const response = await axios.get('https://localhost:7073/api/PersonalDetails/GetByMemberId?MemberId=1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching personal information:', error);
        throw error;
      }
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
        builder.addCase(getPersonalInformationByMemberId.fulfilled,(state,action)=>{
            state.Selected = {...state.Selected,PersonalDetail:action.payload}
            if (state.Profile && state.Profile.dailyLog && state.Profile.dailyLog.creditsCount !== undefined) {
                state.Profile.dailyLog.creditsCount -= 1;
              }        
            })
      },
})

export default MemberSlice.reducer