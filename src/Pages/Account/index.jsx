import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { FaSquarePlus,FaCamera } from "react-icons/fa6";
import { pic } from "../../Assets";
import { useSelector,useDispatch } from "react-redux";
import { valueupdate,setProfilePic } from "../../Redux/PicturesSlice";
import { Tooltip } from 'react-tooltip'
import { postMyPictures,updateProfilePic } from "../../Redux/PicturesSlice";
import { getMyProfile, getPersonalInformationByMemberId, updateMyProfile } from "../../Redux/MemberSlice";
import { updatePersonalData } from "../../Redux/MemberSlice";
import Navbar from "../../Components/Navbar";
import { postLocate } from "../../Redux/MemberSlice";
import Toastify from "../../utils/Toastify";


const Account= () =>{
    
    //Selectors
    const uploadPictures = useSelector((state)=>state.Picture.UploadPictures)
    const myprofile = useSelector((state)=>state.Members.Profile)
    const personalDetail = useSelector((state)=>state.Members.mypersonaldetail)
    const selectedProfilePic = useSelector((state)=>state.Picture.profilePic)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        dispatch(getMyProfile());
        dispatch(getPersonalInformationByMemberId())
    },[dispatch])
    
    //in page state management
    const [formdata,setFormData] = useState(myprofile);
    const [formPersonalData,setFormPersonalData] = useState(personalDetail);
    const [location,setLocation] = useState({
        lat:0,
        long:0,
        personalDetailsId:0
    })


    //Handle Changes
    const handleChange =(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
        console.log(formdata);
    }
    const handlePersonalChange = (e) =>{
        setFormPersonalData({...formPersonalData,[e.target.name]:e.target.value})
        console.log(formPersonalData);
        console.log("Above this only");
    }

    const handleProfileUpdate = async(e)=>{
        e.preventDefault();
        try{
            const actionresult = await dispatch(updateMyProfile(formdata));
            Toastify.success("Updation Successfull");
        }
        catch(err){
            console.error(err);
        }
    }

    const [isDisabled,setDisabled] = useState(true);
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
                            <input placeholder="Name" onChange={handleChange} name="personName" value={formdata.personName} disabled={isDisabled} type="text" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" />
                            <select onChange={handleChange} value={formdata.relation} disabled={isDisabled} name="relation" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="Relation">
                                <option value="" selected>Select Relation</option>
                                <option value="Brother">Brother</option>
                                <option value="Relative">Relative</option>
                                <option value="Myself">Myself</option>
                                <option value="Friend">Friend</option>
                                <option value="Sister">Sister</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                            </select>
                            <input name="email" placeholder="Email" onChange={handleChange} value={formdata.email} disabled={isDisabled} type="email" className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode"/>
                        </div>
                        <button onClick={handleProfileUpdate} className="btn-primary" type="submit">Update</button>
                    </form>
                </div>
                <div className="rounded-md w-full xs:w-2/5 bg-mode p-5 items-center justify-center flex flex-col">
                    <h1 className="text-xl font-bold mb-1">Profile Pic</h1>
                    <p className="text-md opacity-50">Make sure to have 1 : 1 ratio</p>
                    <form onSubmit={async (e)=>{
                            e.preventDefault();
                            try{
                                const action = await dispatch(updateProfilePic(selectedProfilePic));
                                Toastify.success("Profile update success");
                                window.location.reload();
                            }
                            catch(err){
                                console.error(err);
                            }
                        }} className="flex items-center justify-center flex-col">
                        {
                            formdata.profilePic?
                            // <div className="h-44 w-44 cursor-pointer rounded-full my-5 bg-no-repeat bg-cover bg-center" style={{background:`url(${formdata.profilePic})`}}></div>
                            <label htmlFor="profile">
                                <img loading="lazy" data-tooltip-id="my-tooltip" data-tooltip-content="Click to Change" className="h-44 w-44 my-5 cursor-pointer rounded-full" src={formdata.profilePic} alt="" />
                            </label>
                            :
                            <label htmlFor="profile" className="h-44 w-44 text-gray-500 bg-tertiary border-2 border-primary cursor-pointer rounded-full my-5 flex items-center justify-center">
                                <FaCamera size={30}/> 
                            </label>
                        }
                        <input className="hidden" id="profile" type="file" onChange={e=>{dispatch(setProfilePic(e.target.files))}}/>
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
                    <textarea disabled={isDisabled} name="about" onChange={handleChange} value={formdata.about} type="text" className="h-20 w-full my-5 px-4 py-2 rounded-md outline-none border-2 border-offmode"/>
                    <button onClick={handleProfileUpdate} className="btn-primary" type="submit">Update</button>
                </form>
            </div>

            {/* Images upload  */}
            <div className="rounded-md bg-mode p-5">
                <h1 className="text-xl font-bold mb-1">Upload your images</h1>
                <p className="text-md opacity-50">Allowed upto 5 images</p>
                <form onSubmit={async(e)=>{
                    e.preventDefault();
                    try{
                        await dispatch(postMyPictures({id:personalDetail.personalDetailsId,pictures:uploadPictures}));
                        Toastify.success("Upload Success");
                    }
                    catch(err){
                        console.error(err);
                    }
                }}>
                    <div className="flex flex-wrap gap-5">
                        {
                            personalDetail?.pictures?.map((elem)=>
                                <img className="h-20 w-20 text-gray-500 bg-tertiary border-2 border-primary cursor-pointer rounded-md my-5 flex items-center justify-center" src={elem.pictureUrl} alt="" />
                            )
                        }
                        <label htmlFor="image" className="h-20 w-20 text-gray-500 bg-tertiary border-2 border-primary cursor-pointer rounded-md my-5 flex items-center justify-center">
                            <FaSquarePlus size={20}/> 
                            <input className="hidden" id="image" type="file" onChange={(e)=>{dispatch(valueupdate(e.target.files));}} multiple/>
                        </label>
                    </div>
                    <button className="btn-primary" type="submit">Upload</button>
                </form>
            </div>


            {/* Basic data  */}
            <div className="rounded-md bg-mode p-5">
                <h1 className="text-xl font-bold mb-1">Basic Data</h1>
                <p className="text-md opacity-50">Update your Basic settings</p>
                <form className="grid grid-cols-2 md:grid-cols-3 gap-5 my-10">
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Current Age</h1>
                        <input type="text" onChange={handleChange} value={formdata.age} placeholder="Age" name="age" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Native Area</h1>
                        <input type="text" onChange={handleChange} value={formdata.native} placeholder="Native" name="native" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Religion</h1>
                        <input list="Religion-list" onChange={handleChange} value={formdata.religion} placeholder="Religion" name="religion" disabled={isDisabled} className="basic-input" />
                        <datalist id="Religion-list">
                            <option value="" selected>Select Religion</option> 
                            <option value="Hindu">Hindu</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Christian">Christian</option>
                            <option value="Sikhm">Sikhm</option> 
                        </datalist>  
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Caste</h1>
                        <input onChange={handleChange} value={formdata.caste} placeholder="Caste" name="caste" disabled={isDisabled} className="basic-input" />
                        </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Marital Status</h1>
                        <select onChange={handleChange} value={formdata.maritalStatus} placeholder="Marital Status" name="maritalStatus" disabled={isDisabled} className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="martialStatus">
                            <option value="Select" selected>Select Status</option>
                            <option value="Never Married">Never Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Divorsed">Divorsed</option> 
                            <option value="Awaiting Divorse">Awaiting Divorse</option> 
                        </select>  
                        </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Mother Tongue</h1>
                        <input list="motherTongue-options" onChange={handleChange} value={formdata.motherTongue} placeholder="Mother Tongue" name="motherTongue" disabled={isDisabled} className="basic-input" />
                        <datalist id="motherTongue-options">
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Tamil">Tamil</option>
                            <option value="Telugu">Telugu</option> 
                            <option value="Malayalam">Malayalam</option> 
                        </datalist>  
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Height</h1>
                        <input type="text" onChange={handleChange} value={formdata.height} placeholder="Height" name="height" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Gender</h1>
                        <input
                            list="gender-options"
                            name="gender"
                            value={formdata.gender}
                            onChange={handleChange}
                            disabled={isDisabled}
                            placeholder="Gender"
                            className="basic-input"
                            // className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode"
                            id="Gender"
                        />
                        <datalist id="gender-options">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </datalist>                    
                    </div>

                </form>
                <button onClick={handleProfileUpdate} className="btn-primary" >Update</button>

            </div>

            {/* Personal data  */}
            <div className="rounded-md bg-mode p-5">
                <h1 className="text-xl font-bold mb-1">Personal Data</h1>
                <p className="text-md opacity-50">Update your Personal Details</p>
                <form className="grid grid-cols-2 md:grid-cols-3 gap-5 my-10">
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Mobile No</h1>
                        <input type="number" onChange={handlePersonalChange} value={formPersonalData.mobile} placeholder="Mobile" name="mobile" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Education</h1>
                        <select name="education" onChange={handlePersonalChange} value={formPersonalData.education} disabled={isDisabled} className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="education">
                            <option value="" selected>Select</option>
                            <option value="Engineering Graduate">Engineering Graduate</option>
                            <option value="Higher Secondary">Higher Secondary</option>
                            <option value="Degree Graduate">Degree Graduate</option>
                            <option value="Pre-school">Pre-school</option>
                            <option value="Diplomo">Diplomo</option>
                            <option value="Primary School">Primary School</option>
                            <option value="Others">Others</option>
                        </select>                      
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Annual Income</h1>
                        <input type="text" onChange={handlePersonalChange} value={formPersonalData.annualIncome} placeholder="Annual Income" name="annualIncome" disabled={isDisabled} className="basic-input" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Profession</h1>
                        <input type="text" onChange={handlePersonalChange} value={formPersonalData.professionName} placeholder="Profession Name" name="professionName" disabled={isDisabled} className="basic-input" />
                        </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Family Status</h1>
                        <select name="familyStatus" onChange={handlePersonalChange} value={formPersonalData.familyStatus} disabled={isDisabled} className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="familyStatus">
                            <option selected value="">Select value</option>
                            <option value="Middle Class">Middle Class</option>
                            <option value="Upper Middle Class">Upper Middle Class</option>
                            <option value="Affluent">Affluent</option>
                            <option value="Rich">Rich</option>
                        </select>  
                        </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Family Value</h1>
                        <select name="familyValue" onChange={handlePersonalChange} value={formPersonalData.familyValue} disabled={isDisabled} className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="familyValue">
                            <option selected value="">Select value</option>
                            <option value="Traditional">Traditional</option>
                            <option value="Orthodox">Orthodox</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Liberal">Liberal</option>
                        </select>  
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Family Type</h1>
                        <select name="familyType" onChange={handlePersonalChange} value={formPersonalData.familyType} disabled={isDisabled} className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="familyType">
                            <option selected value="">Select type</option>
                            <option value="Joint">Joint</option>
                            <option value="Nuclear">Nuclear</option>
                        </select>    
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="basic-label">Location</h1>
                        <select name="location" onChange={(e)=>
                            {
                                if(e.target.value == "Allow"){
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition(
                                          (position) => {
                                            // Handle the position data here
                                            console.log("Latitude:", position.coords.latitude);
                                            console.log("Longitude:", position.coords.longitude);
                                            // setLocation({
                                                
                                            // })
                                            console.log(location);
                                            setTimeout(()=>{
                                                dispatch(postLocate({
                                                    personalDetailsId : personalDetail.personalDetailsId,
                                                    lat:position.coords.latitude,
                                                    long:position.coords.longitude
                                                }));
                                            },1000)
                                          },
                                          (error) => {
                                            // Handle errors here
                                            console.error("Error getting location:", error.message);
                                          }
                                        );
                                      } else {
                                        console.error("Geolocation is not supported by this browser.");
                                      }
                                }
                            }
                        } disabled={isDisabled} className="px-4 py-2 rounded-md outline-none shadow-sm shadow-offmode" id="location">
                            <option value="">Select Approval</option>
                            <option value="Allow">Allow</option>
                            <option value="Deny">Deny</option>
                        </select>                    
                    </div>

                </form>
                <button onClick={(e)=>{
                    e.preventDefault();
                    dispatch(updatePersonalData(formPersonalData));
                    Toastify.success("Personal Detail Update Successful");
                }} className="btn-primary" >Update</button>

            </div>
        </div>
    )
}

export default Account