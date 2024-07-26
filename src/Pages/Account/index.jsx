import React, { useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { FaSquarePlus,FaCamera } from "react-icons/fa6";
import { pic } from "../../Assets";
import { useSelector,useDispatch } from "react-redux";
import { valueupdate } from "../../Redux/PicturesSlice";
import { Tooltip } from 'react-tooltip'
import { postMyPictures } from "../../Redux/PicturesSlice";


const Account= () =>{
    const uploadPictures = useSelector((state)=>state.Picture.UploadPictures)
    const myprofile = useSelector((state)=>state.Members.Profile)
    const [isDisabled,setDisabled] = useState(true);
    console.log(myprofile);
    const dispatch = useDispatch();
    return(
        <div className="Account flex flex-col w-screen p-5 sm:p-10 md:p-20 bg-[#F0F2F5] gap-10">

            <Tooltip id="my-tooltip" />
            {/* Header  */}

            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-2" >Settings</h1>
                    <p className="text-lg opacity-50">Update your profile for better match</p>
                </div>
                <div onClick={()=>setDisabled((prev)=>!prev)} className="p-2 rounded-md bg-primary text-tertiary border-2 border-primary hover:bg-tertiary hover:duration-100 cursor-pointer hover:text-primary ">
                    <MdEdit size={20}/>
                </div>
            </div>


            {/* Profile upload */}
            <div className="flex gap-10 flex-row-reverse">
                <div className="rounded-md w-3/5 bg-white p-5">
                    <h1 className="text-xl font-bold mb-1">Basic Information</h1>
                    <p className="text-md opacity-50">Basic Information requires re-verification</p>
                    <form className="flex flex-col">
                        <div className="grid grid-cols-1 gap-5 my-10">
                            <input name="personName" value={myprofile.personName} disabled={isDisabled} type="email" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-black" />
                            <select value={myprofile.relation} disabled={isDisabled} name="relation" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-black" id="Relation">
                                <option value="Brother">Brother</option>
                                <option value="Relative">Relative</option>
                                <option value="Myself">Myself</option>
                                <option value="Friend">Friend</option>
                                <option value="Sister">Sister</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                            </select>
                            <input value={myprofile.email} disabled={isDisabled} type="email" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-black"/>
                        </div>
                        <button className="btn-primary" type="submit">Update</button>
                    </form>
                </div>
                <div className="rounded-md w-2/5 bg-white p-5 items-center justify-center flex flex-col">
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

            <div className="rounded-md bg-white p-5">
                <h1 className="text-xl font-bold mb-1">About</h1>
                <p className="text-md opacity-50">Describe Yourself</p>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                }}>
                    <textarea disabled={isDisabled} name="about" value={myprofile.about} type="text" className="h-20 w-full my-5 px-4 py-2 rounded-md outline-none border-2 border-black"/>
                    <button className="btn-primary" type="submit">Update</button>
                </form>
            </div>

            {/* Images upload  */}
            <div className="rounded-md bg-white p-5">
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

export default Account