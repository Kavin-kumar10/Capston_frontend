import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const token = JSON.parse(localStorage.getItem('user'))?.token;
console.log(token);
const baseurl = "https://localhost:7073/api"

// Get all members

export const getMembers = createAsyncThunk('gets/getMembers',async () =>{
    return axios.get(`${baseurl}/Member`).then((res)=>{
        return res.data;
    })
})


// Get member details by id

export const getMemberById = createAsyncThunk('gets/getMemberById',async (id) =>{
    return axios.get(`${baseurl}/Member/Profile/${id}`).then((res)=>{
        return res.data;
    })
})

//Get My profile details

export const getMyProfile = createAsyncThunk('gets/getMyProfile',async () =>{
    return axios.get(`${baseurl}/Member/Profile/3`).then((res)=>{
        return res.data;
    })
})

export const getPersonalInformationByMemberId = createAsyncThunk('gets/getsPersonalInformation',async () =>{
    try {
        const response = await axios.get(`${baseurl}/PersonalDetails/GetByMemberId?MemberId=1`, {
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
        loading:[],
        Search:{
            SearchPop:false,
            filtered:[]
        }
    },
    reducers:{
        handlePop:(state,action)=>{
            if(action.payload == 'open') state.Search.SearchPop = true;
            else state.Search.SearchPop = false;
        },
        SearchBarFilter:(state,action)=>{
            const value = action.payload.toLowerCase();
            const result = state.allMembers.filter((obj) => {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const objVal = obj[key];
                        if (objVal !== null && objVal !== undefined) {
                            const objValStr = objVal.toString().toLowerCase();
                            if (objValStr.includes(value)) {
                                return true; // Return true if the object property matches the search value
                            }
                        }
                    }
                }
                return false; // Return false if no properties match
            });
            state.Search.filtered = result;         
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getMembers.fulfilled, (state, action) => {
          // Add user to the state array
          state.allMembers = action.payload;
          state.Search.filtered = action.payload;
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

export const {handlePop,SearchBarFilter} = MemberSlice.actions;

export default MemberSlice.reducer