import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { getMatchesWithMemberId, updateExistingMatch } from "../../Redux/MatchSlice";
import Loader from "../../Components/Loader";
// import { setDecision,setMatch } from "../../Redux/MatchSlice";

const Matches = () =>{
    const AllMatch = useSelector(state => state.Match.MyAllMatches);
    const myProfile = useSelector(state => state.Members.Profile)
    const loading = useSelector(state=> state.Match.loading)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getMatchesWithMemberId())
    },[dispatch])
    const [required,setRequired] = useState()
    return(
        loading?<Loader/>:
        <div className="Matches  bg-tertiary w-screen min-h-screen flex flex-col px-5 md:px-10 lg:px-20 py-28 gap-5">
            <Navbar/>
                <h1 className="text-primary text-2xl sm:text-3xl font-bold">Matches</h1>
                <ul className="flex gap-2">
                    <li onClick={()=>setRequired(AllMatch.Requests)} className={`cursor-pointer text-xs sm:text-lg px-2 py-1 rounded ${((required === AllMatch.Requests)?"bg-primary text-tertiary":"bg-gray-200 text-gray-800")} text-xs sm:text-lg   font-semibold`}>Requests : <span className={`text-primary font-bold text-sm rounded-full ${((required === AllMatch.Requests)?"bg-primary text-tertiary":"bg-gray-200 text-gray-800")} `}>{AllMatch.Requests.length}</span></li>
                    <li onClick={()=>setRequired(AllMatch.Pending)} className={`cursor-pointer text-xs sm:text-lg px-2 py-1 rounded ${((required === AllMatch.Pending)?"bg-primary text-tertiary":"bg-gray-200 text-gray-800")}  text-xs sm:text-lg font-semibold`}>Pending : <span className={`text-primary font-bold text-sm rounded-full ${((required === AllMatch.Pending)?"bg-primary text-tertiary":"bg-gray-200 text-gray-800")} `}>{AllMatch.Pending.length}</span></li>
                    <li onClick={()=>setRequired(AllMatch.Matched)} className={`cursor-pointer text-xs sm:text-lg px-2 py-1 rounded ${((required === AllMatch.Matched)?"bg-primary text-tertiary":"bg-gray-200 text-gray-800")} text-xs sm:text-lg font-semibold`}>Matched : <span className={`text-primary font-bold text-sm rounded-full ${((required === AllMatch.Matched)?"bg-primary text-tertiary":"bg-gray-200 text-gray-800")} `}>{AllMatch.Matched.length}</span></li>
                </ul>
                <div className="w-full h-0.5 bg-gray-400"></div>
                    {
                        // All Request to myprofile
                        (required === AllMatch.Requests)?
                        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-2">
                        {
                            required?.map((elem)=>
                                <div key={elem} className="bg-mode flex flex-col lg:flex-row shadow-md h-full w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
                                    <div className="flex flex-col w-full lg:w-1/2">
                                        <div className="relative">
                                            <img src={elem.fromProfile.profilePic} alt="" />
                                            <div className="absolute top-1 right-2 ">
                                            {elem.fromProfile.membership === 1 ?<p className="text-sm font-extrabold text-primary bg-mode border-2 border-primary rounded-md px-1 py-1">Premium</p>:<p className="text-sm font-extrabold text-green-700 bg-mode border-2 border-green-700 rounded-md px-1 py-1">Free</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full lg:w-1/2 h-full justify-between">
                                        <div className="flex flex-col">
                                            <h1 className="font-bold text-xl">{elem.fromProfile.personName}</h1>
                                            <p className="text-md opacity-50">{elem.fromProfile.religion}</p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-2 ">
                                                <h1 className="text-primary text-lg font-semibold opacity-80">Message:</h1>
                                                <p className="text-md font-semibold opacity-60">{elem.message}</p>
                                            </div>
                                            <Link to={`/Profile/${elem.fromProfile.memberId}`} className="w-full flex items-center justify-center bg-primary text-tertiary rounded-md py-2 px-5" >View Profile</Link>
                                            <div className="flex items-center justify-center w-full gap-5">
                                                <button onClick={async()=>{
                                                    try{
                                                        await dispatch(updateExistingMatch({decision:"Rejected",match:elem}))
                                                        await dispatch(getMatchesWithMemberId());
                                                    }catch(err){
                                                        // console.log(err); 
                                                    }
                                                    }} className="bg-mode w-full font-semibold shadow-sm shadow-gray-500 px-3 py-1 rounded-md">Reject</button>
                                                <button onClick={async ()=>{
                                                    try{
                                                        await dispatch(updateExistingMatch({decision:"Matched",match:elem}))
                                                        await dispatch(getMatchesWithMemberId());
                                                    }
                                                    catch(err){
                                                        // console.log(err);
                                                        
                                                    }
                                                    }} className="bg-gray-500 w-full font-semibold text-mode px-3 py-1 rounded-md">Accept</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }</div>:<></>
                    }
                    {       
                        (required === AllMatch.Pending)?
                        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {
                        required?.map((elem)=>
                            <Link key={elem} to={`/Profile/${elem.toProfile.memberId}`} className="bg-mode flex flex-col shadow-md aspect-square w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
                                <div className="relative">
                                    <img src={elem.toProfile.profilePic} alt="" />
                                    <div className="absolute top-1 right-2 ">
                                    {elem.toProfile.membership === 1 ?<p className="text-sm font-extrabold text-primary bg-mode border-2 border-primary rounded-md px-1 py-1">Premium</p>:<p className="text-sm font-extrabold text-green-700 bg-mode border-2 border-green-700 rounded-md px-1 py-1">Free</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-xl">{elem.toProfile.personName}</h1>
                                    <p className="text-md opacity-50">{elem.toProfile.religion}</p>
                                </div>
                            </Link>
                        )}</div>:<></>
                    }
                    {
                        (required === AllMatch.Matched)?
                            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {
                            required?.map((elem) => {
                                const isFromProfile = elem.fromProfile.memberId === myProfile.memberId;
                                const profileToDisplay = isFromProfile ? elem.toProfile : elem.fromProfile;
                        
                            return(
                            <Link key={elem} to={`/Profile/${profileToDisplay.memberId}`} className="bg-mode flex flex-col shadow-md aspect-square w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
                                <div className="relative">
                                    <img src={profileToDisplay.profilePic} alt="" />
                                    <div className="absolute top-1 right-2 ">
                                    {profileToDisplay.membership === 1 ?<p className="text-sm font-extrabold text-primary bg-mode border-2 border-primary rounded-md px-1 py-1">Premium</p>:<p className="text-sm font-extrabold text-green-700 bg-mode border-2 border-green-700 rounded-md px-1 py-1">Free</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-bold text-xl">{profileToDisplay.personName}</h1>
                                    <p className="text-md opacity-50">{profileToDisplay.religion}</p>
                                    <h1 className="text-green-700 font-semibold">Info : Now you can see personal details without Credits</h1>
                                </div>
                            </Link>)
                        }
                        )}</div>:<div></div>
                    }
        </div>
    )
}

export default Matches