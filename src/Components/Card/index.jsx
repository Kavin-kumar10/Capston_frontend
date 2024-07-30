import React from "react";
import { Link } from "react-router-dom";


const Card = ({elem}) =>{
    return(
        <Link to={`/Profile/${elem.memberId}`} className="bg-mode flex flex-col shadow-md aspect-square w-full p-5 gap-5 hover:shadow-lg cursor-pointer">
        <div className="relative">
            <img src={elem.profilePic} alt="" />
            <div className="absolute top-1 right-2 ">
            {elem.membership == 1 ?<p className="text-sm font-extrabold text-primary bg-mode border-2 border-primary rounded-md px-1 py-1">Premium</p>:<p className="text-sm font-extrabold text-green-700 bg-mode border-2 border-green-700 rounded-md px-1 py-1">Free</p>}
                
            </div>
        </div>
        <div className="flex flex-col">
            <h1 className="font-bold text-xl">{elem.personName}</h1>
            <p className="text-md opacity-50">{elem.religion}</p>
        </div>
        </Link>
    )
}

export default Card