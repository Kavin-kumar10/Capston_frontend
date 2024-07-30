import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { FaSquarePlus,FaCamera } from "react-icons/fa6";
import { pic } from "../../Assets";
import { useSelector,useDispatch } from "react-redux";
import { valueupdate } from "../../Redux/PicturesSlice";
import { Tooltip } from 'react-tooltip'
import { postMyPictures } from "../../Redux/PicturesSlice";
import Navbar from "../../Components/Navbar";


const Account= () =>{
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    const uploadPictures = useSelector((state)=>state.Picture.UploadPictures)
    const myprofile = useSelector((state)=>state.Members.Profile)
    const [isDisabled,setDisabled] = useState(true);
    console.log(myprofile);
    const dispatch = useDispatch();
    return(
        <div className="Account flex flex-col w-screen py-28 px-5 sm:px-10 md:px-20 bg-[#F0F2F5] gap-10">

            <Tooltip id="my-tooltip" />
            <Navbar/>

            {/* Header  */}

            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary" >Settings</h1>
                    <p className="text-sm md:text-lg opacity-50">Update your profile for better match</p>
                </div>
                <div onClick={()=>setDisabled((prev)=>!prev)} className="p-2 rounded-md bg-primary text-tertiary border-2 border-primary hover:bg-tertiary hover:duration-100 cursor-pointer hover:text-primary ">
                    <MdEdit size={20}/>
                </div>
            </div>


            {/* Profile upload */}
            <div className="flex gap-10 flex-col-reverse xs:flex-row-reverse">
                <div className="rounded-md w-full xs:w-3/5 bg-mode p-5">
                    <h1 className="text-xl font-bold mb-1">Profile Information</h1>
                    <p className="text-md opacity-50">Profile Information requires re-verification</p>
                    <form className="flex flex-col">
                        <div className="grid grid-cols-1 gap-5 my-10">
                            <input name="personName" value={myprofile.personName} disabled={isDisabled} type="text" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" />
                            <select value={myprofile.relation} disabled={isDisabled} name="relation" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="Relation">
                                <option value="Brother">Brother</option>
                                <option value="Relative">Relative</option>
                                <option value="Myself">Myself</option>
                                <option value="Friend">Friend</option>
                                <option value="Sister">Sister</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                            </select>
                            <input name="email" value={myprofile.email} disabled={isDisabled} type="email" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode"/>
                        </div>
                        <button className="btn-primary" type="submit">Update</button>
                    </form>
                </div>
                <div className="rounded-md w-full xs:w-2/5 bg-mode p-5 items-center justify-center flex flex-col">
                    <h1 className="text-xl font-bold mb-1">Profile Pic</h1>
                    <p className="text-md opacity-50">Make sure to have 1 : 1 ratio</p>
                    <form className="flex items-center justify-center flex-col">
                        {
                            myprofile.profilePic?
                            // <div className="h-44 w-44 cursor-pointer rounded-full my-5 bg-no-repeat bg-cover bg-center" style={{background:`url(${myprofile.profilePic})`}}></div>
                            <img loading="lazy" data-tooltip-id="my-tooltip" data-tooltip-content="Click to Change" className="h-44 w-44 my-5 cursor-pointer rounded-full" src={myprofile.profilePic} alt="" />
                            :
                            <label htmlFor="profile" className="h-44 w-44 text-gray-500 bg-tertiary border-2 border-primary cursor-pointer rounded-full my-5 flex items-center justify-center">
                                <FaCamera size={30}/> 
                                <input className="hidden" id="profile" type="file"  multiple/>
                            </label>
                        }
                        <button className="btn-primary" type="submit">Upload</button>
                    </form>
                </div>
            </div>

            <div className="rounded-md bg-mode p-5">
                <h1 className="text-xl font-bold mb-1">About</h1>
                <p className="text-md opacity-50">Describe Yourself</p>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <textarea disabled={isDisabled} name="about" value={myprofile.about} type="text" className="h-20 w-full my-5 px-4 py-2 rounded-md outline-none border-2 border-offmode"/>
                    <button className="btn-primary" type="submit">Update</button>
                </form>
            </div>

            {/* Images upload  */}
            <div className="rounded-md bg-mode p-5">
                <h1 className="text-xl font-bold mb-1">Upload your images</h1>
                <p className="text-md opacity-50">Allowed upto 5 images</p>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    dispatch(postMyPictures(uploadPictures));
                }}>
                    <label htmlFor="image" className="h-20 w-20 text-gray-500 bg-tertiary border-2 border-primary cursor-pointer rounded-md my-5 flex items-center justify-center">
                        <FaSquarePlus size={20}/> 
                        <input className="hidden" id="image" type="file" onChange={(e)=>{dispatch(valueupdate(e.target.files));}} multiple/>
                    </label>
                    <button className="btn-primary" type="submit">Upload</button>
                </form>
            </div>


            {/* Personal data  */}
            <div className="rounded-md bg-mode p-5">
                <h1 className="text-xl font-bold mb-1">Basic Data</h1>
                <p className="text-md opacity-50">Update your Basic settings</p>
                <form className="grid grid-cols-2 md:grid-cols-3 gap-5 my-10">
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Current Age</h1>
                        <input type="text" value={myprofile.age} placeholder="Age" name="age" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Native Area</h1>
                        <input type="text" value={myprofile.native} placeholder="Native" name="native" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Religion</h1>
                        <input type="text" value={myprofile.religion} placeholder="Religion" name="religion" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Caste</h1>
                        <input type="text" value={myprofile.caste} placeholder="Caste" name="caste" disabled={isDisabled} className="basic-input" />
                        </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Marital Status</h1>
                        <input type="text" value={myprofile.maritalStatus} placeholder="Marital Status" name="maritalStatus" disabled={isDisabled} className="basic-input" />
                        </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Mother Tongue</h1>
                        <input type="text" value={myprofile.motherTongue} placeholder="Mother Tongue" name="motherTongue" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Height</h1>
                        <input type="text" value={myprofile.height} placeholder="Height" name="height" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Gender</h1>
                        <select name="gender" value={myprofile.gender} disabled={isDisabled} className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="Relation">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>                    
                    </div>

                </form>
                <button className="btn-primary" type="submit">Update</button>

            </div>
        </div>
    )
}

export default Account