import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const Matches = () =>{
    const AllMatch = useSelector(state => state.Match.MyAllMatches);
    const [required,setRequired] = useState(AllMatch.Requests)
    return(
        <div className="Matches min-h-screen bg-tertiary w-screen">
            <Navbar/>
            <div className="flex flex-col p-20 gap-5">
                <h1 className="text-primary text-3xl font-bold">Matches</h1>
                <ul className="flex gap-2">
                    <li onClick={()=>setRequired(AllMatch.Requests)} className="cursor-pointer px-2 py-1 rounded bg-gray-200 text-gray-800 font-semibold">Requests</li>
                    <li onClick={()=>setRequired(AllMatch.Pending)} className="cursor-pointer px-2 py-1 rounded bg-gray-200 text-gray-800 font-semibold">Pending</li>
                    <li onClick={()=>setRequired(AllMatch.Matched)} className="cursor-pointer px-2 py-1 rounded bg-gray-200 text-gray-800 font-semibold">Matched</li>
                </ul>
                <div className="w-full h-0.5 bg-gray-400"></div>
                <div className="grid grid-cols-5">
                    {
                        required?.map((elem)=>
                            <Link to={`/Profile/${elem.fromProfile.memberId}`} className="bg-mode flex flex-col shadow-md aspect-square w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
                                <div className="relative">
                                    <img src={elem.fromProfile.profilePic} alt="" />
                                    <div className="absolute top-1 right-2 ">
                                    {elem.fromProfile.membership == 1 ?<p className="text-sm font-extrabold text-primary bg-mode border-2 border-primary rounded-md px-1 py-1">Premium</p>:<p className="text-sm font-extrabold text-green-700 bg-mode border-2 border-green-700 rounded-md px-1 py-1">Free</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-xl">{elem.fromProfile.personName}</h1>
                                    <p className="text-md opacity-50">{elem.fromProfile.religion}</p>
                                </div>
                                {
                                    required == AllMatch.Requests?
                                    <div className="flex justify-between">
                                        <button className="bg-mode font-semibold shadow-sm shadow-gray-500 px-3 py-1 rounded-md">Reject</button>
                                        <button className="bg-gray-500 font-semibold text-mode px-3 py-1 rounded-md">Accept</button>
                                    </div>:<></>
                                }
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Matches