import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getMemberById } from "../../Redux/MemberSlice";

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
        <div className="Profile flex flex-col p-5 md:p-10 lg:p-20 gap-10 bg-mild">
            <div className="flex rounded-md gap-10 bg-white shadow-sm shadow-black p-3 sm:p-5 flex-col sm:flex-row">
                <div className="max-h-72 aspect-square rounded-md">
                    <img className="h-full w-full" src={selected.profilePic} alt="" />
                </div>
                <div className="w-3/4 flex flex-col gap-3">
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-primary opacity-65">{selected.name}</h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold opacity-70">{selected.gender} - {selected.age} years old</p>
                    <div className="flex gap-2">
                        {selected.isVerified ?<div className="text-[#4398EF] px-2 py-1 text-sm rounded-md border-2 border-[#4398EF]">Verified</div>:<></>}
                        {selected.membership == 1 ?<div className="border-2 border-primary px-2 py-1 text-sm rounded-md text-primary">Premium</div>:<div className="px-2 py-1 rounded-md text-tertiary bg-green-900">Free</div>}
                    </div>
                    {/* <div className="flex flex-col gap-4 items-start">
                        <h1 className="text-xl font-bold opacity-50">Hurry up ... ! Send Match Request Now ... !</h1>
                        <button className="text-tertiary bg-primary px-3 py-2 rounded-md">Request Match</button>
                    </div> */}
                </div>
            </div>
            <div className="rounded-md bg-white p-5 shadow-sm shadow-black">
                <h1 className="text-xl text-primary font-bold mb-1">About</h1>
                <p className="text-md opacity-50 mb-5">Described as</p>
                <h2 className="font-bold opacity-80 text-sm sm:text-md md:text-lg">{selected.about}</h2>
            </div>
            <div className="rounded-md bg-white p-5 shadow-sm shadow-black">
                <div className="template flex items-center justify-center h-80 w-full rounded-md border-2 border-dotted border-primary">
                    <button className="bg-primary text-white px-4 py-2 rounded-md outline-none">Use Credits</button>
                </div>
            </div>
        </div>
    )
}

export default Profile