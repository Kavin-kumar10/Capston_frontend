import React from "react";
import { home } from "../../Assets";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () =>{
    const Members = useSelector((state)=>state.Members.allMembers);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    console.log(Members);
    return(
        <div className="Home  flex flex-col">
            <div className="flex bg-mild px-5 sm:px-10 md:px-20 h-screen flex-col-reverse text-center md:text-right md:flex-row">
                <div className="w-full h-full md:w-1/2 flex gap-5 justify-center items-center md:items-end flex-col ">
                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-black via-primary to-primary bg-clip-text text-transparent">Soul Finder</h1>
                    <h3 className="text-lg md:text-2xl lg:text-4xl font-bold">Find Your <span className="text-primary">Perfect Partner</span></h3>
                    <p className="text-sm md:text-lg  opacity-50">Your soulmate might be waiting for you here.</p>
                </div>
                <div className="flex h-full w-full md:w-1/2 items-center justify-center">
                    <img className="h-3/5 w-auto drop-shadow-2xl shadow-primary" src={home} alt="Marriage" />
                </div>
            </div>
            <div className="bg-tertiary p-5 sm:p-10 md:p-20">
                <div className="flex flex-col gap-3 mb-10">
                    <h1 className="text-lg sm:text-xl md:text-3xl font-bold">Featured Profiles</h1>
                    <div className="w-20 h-1 sm:h-2 bg-primary"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        Members.map((elem)=>
                            <div onClick={()=>{
                                    navigate(`/Profile/${elem.memberId}`);
                                }
                                } className="bg-white flex flex-col shadow-md aspect-square w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
                                <div className="relative">
                                    <img src={elem.profilePic} alt="" />
                                    <div className="absolute top-1 right-2 ">
                                        <p className="text-sm font-extrabold text-tertiary bg-primary rounded-md px-1 py-1">Premium</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-xl">{elem.personName}</h1>
                                    <p className="text-md opacity-50">{elem.religion}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home