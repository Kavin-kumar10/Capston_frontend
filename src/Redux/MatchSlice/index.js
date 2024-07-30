import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = "https://localhost:7073/api"
const token = JSON.parse(localStorage.getItem('user'))?.token;
console.log(token);

export const getMatchesWithMemberId = createAsyncThunk('gets/getMatchesWithMemberId',async () =>{
    try {
        const response = await axios.get(`${baseurl}/Matches?MemberId=2`, {
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


const MatchSlice = createSlice({
    name:"Match",
    initialState:{
        MyAllMatches:{
            Pending:[],
            Matched:[],
            Requests:[]
        },
        pop:false
    },
    reducers:{
      setPopOpen:(state,action)=>{ state.pop = true},
      setPopClose:(state,action)=>{ state.pop = false}
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
        .addCase(getMatchesWithMemberId.pending, (state) => {
            state.loading = true;
        })
        .addCase(getMatchesWithMemberId.fulfilled, (state, action) => {
        state.loading = false;
        state.MyAllMatches = {
            Pending: action.payload.filter(
                (match) => match.fromProfileId === 2 // Replace 2 with current user ID
              ),
              Matched: action.payload.filter(
                (match) =>
                  match.status === "Accepted" &&
                  (match.fromProfileId === 2 || match.toProfileId === 2)
              ),
              Requests: action.payload.filter(
                (match) => match.toProfileId === 2 && match.status !== "Matched"
              ),
        };
      })
      .addCase(getMatchesWithMemberId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      });

      },
})

export const {setPopClose,setPopOpen} = MatchSlice.actions;

export default MatchSlice.reducer