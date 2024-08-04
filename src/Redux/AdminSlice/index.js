import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const token = JSON.parse(localStorage.getItem('user'))?.token;
const baseurl = "https://matrimonykavinapi.azurewebsites.net/api/"


export const GetAllMembers = createAsyncThunk('gets/getsAllMembers',async () =>{
    try {
        const response = await axios.get(`${baseurl}/Member`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          return response.data;
      } 
      catch (error) {
        if (error.response && error.response.data.message) {
            return error.response.data.message
        } else {
            return error.message
        }
      }
})

export const DeactivateMember = createAsyncThunk('put/updateDeactivate',async (memberId) =>{
    try {
        const response = await axios.put(`${baseurl}/Activate/DeActivate?MemberId=${memberId}`,{},{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          return response.data;
      } 
      catch (error) {
        if (error.response && error.response.data.message) {
            return error.response.data.message
        } else {
            return error.message
        }
      }
})

export const ActivateMember = createAsyncThunk('put/updateActivate',async (Activator) =>{
    try {
        const response = await axios.put(`${baseurl}/Activate/Activate`,Activator,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          return response.data;
      } 
      catch (error) {
        if (error.response && error.response.data.message) {
            return error.response.data.message
        } else {
            return error.message
        }
      }
})

const AdminSlice = createSlice({
    name:"Admin",
    initialState:{
        allMembers:[],
        filtered:[],
        Selected:{},
        Activate:{
            memberId: 0,
            role: 0,
            plan: 0
        },
        Deactivate:{
            memberId:0
        }
    },
    reducers:{
        setSelected:(state,action)=>{
            state.Selected = action.payload;
            state.Activate.memberId = action.payload?.memberId;
            state.Deactivate.memberId = action.payload?.memberId;
        },
        setMemberId:(state,action)=>{
            state.Activate.memberId = action.payload
            state.Deactivate.memberId = action.payload
        },
        setRole:(state,action)=>{
            state.Activate.role = Number(action.payload)
        },
        setPlan:(state,action)=>{
            state.Activate.plan = Number(action.payload)
        },
        SearchBarFilterAdmin:(state,action)=>{
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
            state.filtered = result;         
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(GetAllMembers.pending,(state)=>{
            state.loading = true;
        })
        .addCase(GetAllMembers.fulfilled,(state,action)=>{
            state.allMembers = action.payload;
            state.filtered = action.payload;
        })
        .addCase(GetAllMembers.rejected,(state,action)=>{
        })
      },
})

export const {SearchBarFilterAdmin,setSelected,setMemberId,setPlan,setRole} = AdminSlice.actions

export default AdminSlice.reducer