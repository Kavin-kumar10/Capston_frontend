import React from "react";

const Profile = () =>{
    return(
        <div className="Profile flex flex-col w-screen h-screen p-20 bg-[#F0F2F5]">
            <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-lg opacity-50">Update your profile for better match</p>
                </div>
                <div className="">
                    <h1>Edit</h1>
                </div>
            </div>
            <div className="rounded-md bg-white p-5">
                <h1 className="text-xl font-bold mb-1">Personal Data</h1>
                <p className="text-md opacity-50">Update your personal settings</p>
            </div>
        </div>
    )
}

export default Profile