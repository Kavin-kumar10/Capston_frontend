import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const token = JSON.parse(localStorage.getItem('user'))?.token;
console.log(token);
const baseurl = "https://matrimonykavinapi.azurewebsites.net/api/"

// Get all members

export const getMembers = createAsyncThunk('gets/getMembers',async () =>{
    return axios.get(`${baseurl}/Member`).then((res)=>{
        return res.data;
    })
})


// Get member details by id

export const getMemberById = createAsyncThunk('gets/getMemberById',async (id) =>{
    return axios.get(`${baseurl}/Member/GetByMemberId/?memberId=${id}`).then((res)=>{
        return res.data;
    })
})

//Get My profile details

export const getMyProfile = createAsyncThunk('gets/getMyProfile',async () =>{
    try {
        const response = await axios.get(`${baseurl}/Member/Profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching my profile information:', error);
        throw error;
      }
})

export const updateMyProfile = createAsyncThunk('put/putMyProfile',async (newProfile) =>{
  try {
      const response = await axios.put(`${baseurl}/Member`, newProfile,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Below is updated");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating my profile information:', error);
      throw error;
    }
})



// Get my Personal details

export const getMyPersonalDetails = createAsyncThunk('gets/getMyPersonalDetails',async () =>{
    try {
        const response = await axios.get(`${baseurl}/PersonalDetails/GetPersonalDetailByToken`, {
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

export const updatePersonalData = createAsyncThunk('put/putMyPersonalData',async (newPersonalData) =>{
  try {
      const response = await axios.put(`${baseurl}/PersonalDetails`, newPersonalData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Below is updated Personal Data");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching personal information:', error);
      throw error;
    }
})

export const postLocate = createAsyncThunk('post/postLocate',async (postdata) =>{
  try {
      const response = await axios.post(`${baseurl}/Locate`, postdata ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error posting Locate:', error);
      throw error;
    }
})


export const getPersonalInformationByMemberId = createAsyncThunk('gets/getsPersonalInformation',async (id) =>{
    try {
        const response = await axios.get(`${baseurl}/PersonalDetails/GetByMemberId?MemberId=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching personal information:', error?.response?.data?.message);
        throw error?.response?.data?.message;
      }
})



const MemberSlice = createSlice({
    name:"Members",
    initialState:{
        allMembers:[],
        Profile:{},
        mypersonaldetail:{},
        Selected:{},
        loading:false,
        Search:{
            SearchPop:false,
            filtered:[]
        },
        // Account
        Accountpagedata:{},
        AccountPersonal:{}
    },
    reducers:{
        setAccountPersonalData:(state,action)=>{
          let {field,value} = action.payload;
          state.AccountPersonal[field] = value;
        },
        setAccountProfileData:(state,action)=>{
            let {field,value} = action.payload;
            state.Accountpagedata[field] = value;
        },
        setFilteredToAll:(state,action)=>{
          state.Search.filtered = state.allMembers;
        },
        setChangesToFiltered:(state,action)=>{
          let {allMembers,filters} = action.payload;
          const appliedFilters = Object.entries(filters).filter(
            ([key, value]) => value // Filter out empty values
          );
      
          const filteredData = allMembers.filter((member) => {
            return appliedFilters.every(([filterKey, filterValue]) => {
              // Check if each filter matches the member's property
              return member[filterKey] === filterValue;
            });
          });

          state.Search.filtered = filteredData;
          console.log(action.payload);
        },
        handlePop:(state,action)=>{
            if(action.payload === 'open') state.Search.SearchPop = true;
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


        builder.addCase(getMembers.fulfilled, (state, action) => {
          state.allMembers = action.payload.filter((elem)=>elem.role === 0 && elem.isVerified === true);
          state.Search.filtered = action.payload.filter((elem)=>elem.role === 0 && elem.isVerified === true);
          state.loading = false;
        })
        .addCase(getMembers.pending,(state,action)=>{
          state.loading = true;
        })
        .addCase(getMembers.rejected,(state,action)=>{
          console.error("Error fetching information");
          state.loading = false;  
        })



        builder.addCase(getMyProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.Profile = action.payload;
            state.Accountpagedata = action.payload;
            state.allMembers = state.allMembers.filter((members)=>members.memberId !== action.payload.memberId);
            state.Search.filtered = state.Search.filtered.filter((members)=>members.memberId !== action.payload.memberId);
        })
        .addCase(getMyProfile.pending,(state,action)=>{
          state.loading = true;
        })
        .addCase(getMyProfile.rejected,(state,action)=>{
          state.loading = false;  
        })



        builder.addCase(getMemberById.fulfilled,(state,action)=>{
            state.Selected = action.payload;
            state.loading = false;
        })
        .addCase(getMemberById.pending,(state,action)=>{
          state.loading = true;
        })
        .addCase(getMemberById.rejected,(state,action)=>{
          state.loading = false;  
        })


        builder.addCase(getMyPersonalDetails.fulfilled,(state,action)=>{
            state.Profile = {...state.Profile,PersonalDetails:action.payload};
            state.mypersonaldetail = action.payload;
            state.AccountPersonal = action.payload;
            state.loading = false;
        })
        .addCase(getMyPersonalDetails.pending,(state,action)=>{
          state.loading = true;
        })
        .addCase(getMyPersonalDetails.rejected,(state,action)=>{
          console.error("Error fetching information");
          state.loading = false;  
        })


        builder
          .addCase(getPersonalInformationByMemberId.fulfilled,(state,action)=>{
              state.Selected = {...state.Selected,PersonalDetail:action.payload}   
              state.loading = false;  
            }
          )
          .addCase(getPersonalInformationByMemberId.pending,(state,action)=>{
            state.loading = true;
          })
          .addCase(getPersonalInformationByMemberId.rejected,(state,action)=>{
            console.error("Error fetching information");
            state.loading = false;  
          })
      },
})

export const {handlePop,SearchBarFilter,setChangesToFiltered,setFilteredToAll,setNav,setAccountProfileData,setAccountPersonalData} = MemberSlice.actions;

export default MemberSlice.reducer