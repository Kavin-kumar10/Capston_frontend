import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteLikeByLikeId,getLikesByMemberId } from "../../Redux/LikeSlice";
import Toastify from "../../utils/Toastify";
// import Card from "../../Components/Card";

const LikeScreen = () =>{
    const LikedProfiles = useSelector(state=>state.Like.Liked);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getLikesByMemberId())
    },[dispatch])
    return(
        <div className="LikeScreen min-h-screen w-screen flex flex-col px-5 md:px-10 lg:px-20 py-28 gap-5 bg-tertiary ">
            <Navbar/>
            <div className="flex flex-col gap-2">
                <h1 className="text-primary text-2xl sm:text-3xl font-bold">Liked </h1>
                <p className="text-lg sm:text-xl font-semibold opacity-50">List of Liked Profiles</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    LikedProfiles.map((elem)=>
                        <div className="bg-mode flex flex-col shadow-md aspect-square w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
                            <div className="relative">
                                <img src={elem.liked.profilePic} alt="" />
                                <div className="absolute top-1 right-2 ">
                                {elem.liked.membership === 1 ?<p className="text-sm font-extrabold text-primary bg-mode border-2 border-primary rounded-md px-1 py-1">Premium</p>:<p className="text-sm font-extrabold text-green-700 bg-mode border-2 border-green-700 rounded-md px-1 py-1">Free</p>}
                                    
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-bold text-xl">{elem.liked.personName}</h1>
                                <p className="text-md opacity-50">{elem.liked.religion}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link to={`/Profile/${elem.liked.memberId}`} className="bg-primary text-tertiary border border-primary rounded-md px-3 py-1">View</Link>
                                <button onClick={()=>{
                                    dispatch(deleteLikeByLikeId(elem.likeId))
                                    Toastify.success("Removed from Wishlist");
                                    setTimeout(()=>{
                                        window.location.reload()
                                    },1000)
                                }} className="text-primary bg-tertiary border border-primary rounded-md px-3 py-1">Remove</button>
                            </div>
                        </div>                    
                        )
                }
            </div>
        </div>
    )
}

export default LikeScreen