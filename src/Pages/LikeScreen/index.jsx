import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteLikeByLikeId,getLikesByMemberId } from "../../Redux/LikeSlice";
import Loader from "../../Components/Loader/index"
import Toastify from "../../utils/Toastify";
// import Card from "../../Components/Card";

const LikeScreen = () =>{
    const dispatch = useDispatch();
    const LikedProfiles = useSelector(state=>state.Like.Liked);
    const loading = useSelector(state => state.Like.loading)
    useEffect(()=>{
        dispatch(getLikesByMemberId())
    },[dispatch,LikedProfiles.length])
    return(
        loading?<Loader/>:
        <div className="LikeScreen min-h-screen w-screen flex flex-col px-5 md:px-10 lg:px-20 py-28 gap-5 bg-tertiary ">
            <Navbar/>
            <div className="flex flex-col gap-2">
                <h1 className="text-primary text-2xl sm:text-3xl font-bold">Liked </h1>
                <p className="text-lg sm:text-xl font-semibold opacity-50">List of Liked Profiles</p>
            </div>
            {(LikedProfiles.length === 0)?
            <div className="h-24 w-full flex flex-col justify-center items-center border-dotted border-2 border-primary">
                <Link to="/Search" className="text-lg sm:text-2xl text-primary font-semibold">Add Liked profiles</Link>
            </div>:
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    LikedProfiles.map((elem)=>
                        <div key={elem.liked.memberId} className="bg-mode flex flex-col shadow-md aspect-square w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
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
                                <button onClick={async()=>{
                                    try{
                                        const actionresult = await dispatch(deleteLikeByLikeId(elem.likeId))
                                        if(deleteLikeByLikeId.fulfilled.match(actionresult)){
                                            Toastify.success("Removed from Wishlist");
                                        }
                                    }
                                    catch(err){
                                    }
                                }} className="text-primary bg-tertiary border border-primary rounded-md px-3 py-1">Remove</button>
                            </div>
                        </div>                    
                        )
                }
            </div>}
        </div>
    )
}

export default LikeScreen