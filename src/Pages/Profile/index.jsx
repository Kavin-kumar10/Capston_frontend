import React, { useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { pic } from "../../Assets";


const Profile = () =>{
    const [data, setData] = useState({
        formfiles: []
    });

    const handleFileChange = (event) => {
        setData({
            ...data,
            formfiles: event.target.files
        });
        console.log(data);
    };

    const handlePicturesSubmit = async (event) => {
        event.preventDefault();
        try {            
            const formData = new FormData();
            
            for (let i = 0; i < data.formfiles.length; i++) {
                formData.append('formfiles', data.formfiles[i]);
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
    };
    return(
        <div className="Profile flex flex-col w-screen p-20 bg-[#F0F2F5] gap-10">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-lg opacity-50">Update your profile for better match</p>
                </div>
                <div className="p-2 rounded-md bg-primary text-tertiary border-2 border-primary hover:bg-tertiary hover:duration-100 cursor-pointer hover:text-primary ">
                    <MdEdit size={20}/>
                </div>
            </div>
            <div className="rounded-md bg-white p-5">
                <h1 className="text-xl font-bold mb-1">Profile Pic</h1>
                <p className="text-md opacity-50">Make sure to have 1 : 1 ratio</p>
                <form>
                    <label htmlFor="image" className="h-44 w-44 text-gray-500 bg-tertiary border-2 border-primary cursor-pointer rounded-full my-5 flex items-center justify-center">
                        <FaSquarePlus size={20}/> 
                        <input className="hidden" id="image" type="file" onChange={handleFileChange} multiple/>
                    </label>
                    <button className="bg-primary text-tertiary rounded-md px-5 py-2" type="submit">Upload</button>
                </form>
            </div>
            <div className="rounded-md bg-white p-5">
                <h1 className="text-xl font-bold mb-1">Upload your images</h1>
                <p className="text-md opacity-50">Allowed upto 5 images</p>
                <form onSubmit={handlePicturesSubmit}>
                    <label htmlFor="image" className="h-20 w-20 text-gray-500 bg-tertiary border-2 border-primary cursor-pointer rounded-md my-5 flex items-center justify-center">
                        <FaSquarePlus size={20}/> 
                        <input className="hidden" id="image" type="file" onChange={handleFileChange} multiple/>
                    </label>
                    <button className="bg-primary text-tertiary rounded-md px-5 py-2" type="submit">Upload</button>
                </form>
            </div>
            <div className="rounded-md bg-white p-5">
                <h1 className="text-xl font-bold mb-1">Personal Data</h1>
                <p className="text-md opacity-50">Update your personal settings</p>
                <form className="grid grid-cols-3 gap-5 my-10">
                    <input type="text" placeholder="Email" disabled className="px-5 py-2 rounded-md border-2 border-black outline-none" />
                    <input type="text" className="px-5 py-2 rounded-md border-2 border-black outline-none" />
                    <input type="text" className="px-5 py-2 rounded-md border-2 border-black outline-none" />
                    <input type="text" className="px-5 py-2 rounded-md border-2 border-black outline-none" />
                    <input type="text" className="px-5 py-2 rounded-md border-2 border-black outline-none" />
                </form>
            </div>
        </div>
    )
}

export default Profile