import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getMemberById } from "../../Redux/MemberSlice";
import { IoIosArrowBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa";



const Profile = () =>{
    const dispatch = useDispatch();
    const selected = useSelector(state=>state.Members.Selected)
    let value = useParams();
    console.log(value.userid);
    useEffect(()=>{
        dispatch(getMemberById(value.userid))
    },[])
    console.log(selected);
    return(
        <div className="Profile flex flex-col p-5 md:p-10 lg:p-20 gap-5 bg-tertiary">
            <Link to="/" className="back font-bold opacity-50 flex items-center justify-start ">
                <IoIosArrowBack/> &nbsp;
                <p className="hover:underline">Back to home page</p>
            </Link>
            <div className="flex gap-10 bg-white p-3 sm:p-10 flex-col sm:flex-row">
                <div className="max-h-52 aspect-square rounded-md">
                    <img className="h-full w-full rounded-full" src={selected.profilePic} alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-3">
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-primary opacity-65">{selected.personName}</h1>
                    {/* <p className="text-lg sm:text-xl md:text-2xl font-bold opacity-70">{selected.gender} - {selected.age} years old</p> */}
                    <div className="flex gap-2">
                        {selected.isVerified ?<div className="text-[#4398EF] px-2 py-1 text-sm rounded-md border-2 border-[#4398EF]">Verified</div>:<></>}
                        {selected.membership == 1 ?<div className="border-2 border-primary px-2 py-1 text-sm rounded-md text-primary">Premium</div>:<div className="border-2 border-green-600 px-2 py-1 text-sm rounded-md text-green-600">Free</div>}
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                        <h1 className="text-md font-bold opacity-50">Hurry up ... ! Send Match Request Now ... !</h1>
                            <div className="flex gap-3">
                                <button className="text-tertiary bg-primary px-2 py-1 rounded-md">Request Match</button>
                                <button className="border-2 border-primary text-primary px-2 py-1 rounded-md flex gap-2 items-center justify-center"><FaHeart size={20}/> Hit</button>
                            </div>
                        </div>
                </div>
            </div>
            <div className=" bg-white p-5 flex flex-col gap-5">
                <div className="flex flex-col">
                    <h1 className="text-xl text-black font-bold">About</h1>
                    <p className="text-md opacity-50 mb-2">Described as</p>
                    <h2 className="font-bold opacity-60 text-sm sm:text-md md:text-lg">{selected.about}</h2>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl mb-3 text-black font-bold">Basics</h1>
                    <h2 className="font-semibold opacity-60 text-sm sm:text-md md:text-lg">Gender : {selected.gender}</h2>
                    <h2 className="font-semibold opacity-60 text-sm sm:text-md md:text-lg">Age : {selected.age}</h2>
                    <h2 className="font-semibold opacity-60 text-sm sm:text-md md:text-lg">Native : {selected.native}</h2>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl text-black font-bold mb-1">Hobbies</h1>
                    {/* <p className="text-md opacity-50 mb-5">Described as</p> */}
                    {
                        selected.hobby?.map((elem)=>
                            <h2 className="font-bold opacity-60 px-2 py-1 shadow-sm shadow-black w-fit rounded-md text-xs sm:text-sm md:text-md">#{elem.hobbyName}</h2>
                        )
                    }
                </div>
            </div>
            <div className="rounded-md bg-white p-5">
                <div className="template flex items-center justify-center h-80 w-full rounded-md border-2 border-dotted border-primary">
                    <button className="bg-primary text-white px-4 py-2 rounded-md outline-none">Use Credits</button>
                </div>
            </div>
        </div>
    )
}

export default Profile