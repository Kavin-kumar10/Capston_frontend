import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// export const getMembers = createAsyncThunk('gets/getMembers',async () =>{
//     return axios.get('https://localhost:7073/api/Member').then((res)=>{
//         return res.data;
//     })
// })

export const postMyPictures = createAsyncThunk('post/postMyPictures',async (uploadPictures) => {
    try {            
        const formData = new FormData();
        console.log(uploadPictures);
        
        for (let i = 0; i < uploadPictures.length; i++) {
            formData.append('formfiles', uploadPictures[i]);
        }

        console.log(formData);
        const response = await axios.post(`https://localhost:7073/api/Picture/1`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('File paths:', response.data);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
})

const PictureSlice = createSlice({
    name:"Member",
    initialState:{
        UploadPictures:["hello"],
        loading:false
    },
    reducers:{
        valueupdate:(state,action)=>{
            state.UploadPictures = action.payload;
            console.log(action.payload);
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        // builder.addCase(getMembers.fulfilled, (state, action) => {
        //   state.allMembers = action.payload;
        // })
        
        builder.addCase(postMyPictures.fulfilled,(state,action)=>{
            // state.UploadPictures = action.payload;
        })
      },
})

export const {valueupdate} = PictureSlice.actions;

export default PictureSlice.reducer