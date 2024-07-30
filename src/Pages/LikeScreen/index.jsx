import React from "react";
import Navbar from "../../Components/Navbar";
import Card from "../../Components/Card";
import { useSelector } from "react-redux";

const LikeScreen = () =>{
    const LikedProfiles = useSelector(state=>state.Like.Liked);
    return(
        <div className="LikeScreen min-h-screen w-screen flex flex-col px-5 md:px-10 lg:px-20 py-28 gap-5 bg-tertiary ">
            <Navbar/>
            <div className="flex flex-col gap-2">
                <h1 className="text-primary  text-xl sm:text-3xl font-bold">Liked </h1>
                <p className="text-sm sm:text-xl font-semibold opacity-50">List of Liked Profiles</p>
            </div>
            <div className="grid grid-cols-4 gap-10">
                {
                    LikedProfiles.map((elem)=>
                        <Card elem={elem.liked}/>
                    )
                }
            </div>
        </div>
    )
}

export default LikeScreen