import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const baseurl = "https://matrimonykavinapi.azurewebsites.net/api/"
const localdata = JSON.parse(localStorage.getItem('user'));

export const postMyPictures = createAsyncThunk('post/postMyPictures',async (uploadPictures) => {
    try {            
        const formData = new FormData();
        console.log(uploadPictures);
        let {id,pictures} = uploadPictures
        
        for (let i = 0; i < pictures.length; i++) {
            formData.append('formfiles', pictures[i]);
        }

        console.log(formData);
        const response = await axios.post(`${baseurl}/Picture/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localdata.token}`,
            }
        });
        console.log('File paths:', response.data);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
})

export const updateProfilePic = createAsyncThunk('post/updateProfilePic',async (profile) => {
    try {            
        const formData = new FormData();
        console.log(profile);
        
        for (let i = 0; i < profile.length; i++) {
            formData.append('formfiles', profile[i]);
        }

        console.log(formData);
        const response = await axios.post(`${baseurl}/Member/ProfileUpdate`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localdata.token}`
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
        UploadPictures:[],
        profilePic:[],
        loading:false
    },
    reducers:{
        valueupdate:(state,action)=>{
            state.UploadPictures = action.payload;
            console.log(action.payload);
        },
        setProfilePic:(state,action)=>{
            state.profilePic = action.payload;
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

export const {valueupdate,setProfilePic} = PictureSlice.actions;

export default PictureSlice.reducer