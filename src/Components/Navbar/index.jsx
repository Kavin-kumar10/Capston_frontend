import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { dummy } from "../../Assets";
import { MdHomeFilled,MdOutlineSettings } from "react-icons/md";
import { FaHeart,FaBars } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { GrConnect } from "react-icons/gr";



const Navbar = () =>{
    const [open,setOpen] = useState(false);
    const myprofile = useSelector((state)=>state.Members.Profile)
    return(
        <div className="Navbar w-screen fixed top-0 z-20 left-0 px-5 sm:px-10 lg:px-20 py-4 bg-mild flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-offmode via-primary to-primary bg-clip-text text-transparent">Soul Finder</h1>
            <ul className="text-offmode items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-between text-md font-semibold hidden md:flex">
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/'>HOME</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/Search'>SEARCH</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/Matches'>MATCHES</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/Like'>LIKED</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/Account'>SETTINGS</Link>
                {
                    myprofile.dailyLog?<div className="px-3 py-2 text-primary border-2 border-primary rounded-md flex items-center justify-center gap-5 font-bold">
                        Credits : {myprofile.dailyLog.creditsCount}
                    </div>:<div className="px-3 py-2 text-primary border-2 border-primary rounded-md flex items-center justify-center gap-5 font-bold">
                        For Premium
                    </div>
                }
                <div onClick={()=>{
                    localStorage.removeItem('user');
                    window.location.reload();
                }} className="cursor-pointer px-3 py-2 text-white bg-primary rounded-md flex items-center justify-center gap-5 font-bold">Sign Out</div>
            </ul>
            <button onClick={()=>setOpen((prev)=>!prev)} className="block md:hidden"><FaBars size={20}/></button>
            {
                open?
                <ul className="absolute flex flex-col top-16 right-5 w-64 z-10 rounded-md bg-mild md:hidden">
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/'>Home</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Search'>Search</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Matches'>Matches</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Like'>Liked</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Account'>Settings</Link>
                </ul>:<></>
            }
        </div>
    )
}

export default Navbar