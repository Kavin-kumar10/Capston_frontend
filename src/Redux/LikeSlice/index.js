import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = "https://localhost:7073/api"
const token = JSON.parse(localStorage.getItem('user'))?.token;

export const getLikesByMemberId = createAsyncThunk('gets/getLikesByMemberId',async () =>{
    try {
        const response = await axios.get(`${baseurl}/Like/GetByMemberId`, {
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

export const postLikesByMemberId = createAsyncThunk('post/postLikesByMemberId',async (likedid) =>{
    try {
        const response = await axios.post(`${baseurl}/Like?LikeMemberId=${likedid}`,{},{
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        // const dispatch = useDispatch();
        // dispatch(getLikesByMemberId())
        return response.data;
      } catch (error) {
        console.error('Error fetching personal information:', error);
        throw error;
      }
})

export const deleteLikeByLikeId = createAsyncThunk('delete/deleteLikeByLikeId',async (likeId) =>{
  try {
      const response = await axios.delete(`${baseurl}/Like?LikeId=${likeId}`,{},{
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      // const dispatch = useDispatch();
      // dispatch(getLikesByMemberId())
      return response.data;
    } catch (error) {
      console.error('Error fetching personal information:', error);
      throw error;
    }
})


const LikeSlice = createSlice({
    name:"Like",
    initialState:{
        Liked:[],
        loading:false
    },
    reducers:{
    },
    extraReducers: (builder) => {
        //Builder for get liked by member id
        builder
        .addCase(getLikesByMemberId.pending, (state) => {
            state.loading = true;
        })
        .addCase(getLikesByMemberId.fulfilled, (state, action) => {
            state.loading = false;
            state.Liked = action.payload;
        })
        .addCase(getLikesByMemberId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Capture error message
        });

        //Builder for post new like
        builder
        .addCase(postLikesByMemberId.pending, (state) => {
            state.loading = true;
        })
        .addCase(postLikesByMemberId.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(postLikesByMemberId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Capture error message
        });

        builder
        .addCase(deleteLikeByLikeId.pending,(state)=>{
          state.loading = true;
        })
        .addCase(deleteLikeByLikeId.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(deleteLikeByLikeId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Capture error message
        });
      },
})

export default LikeSlice.reducer