import React,{useState} from "react";
import { Link } from "react-router-dom";
import { MdHomeFilled,MdOutlineSettings } from "react-icons/md";
import { FaHeart,FaBars } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { GrConnect } from "react-icons/gr";



const Navbar = () =>{
    const [open,setOpen] = useState(false);
    return(
        <div className="Navbar w-screen fixed top-0 left-0 px-5 sm:px-10 md:px-20 py-4 z-10 bg-mild flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-black via-primary to-primary bg-clip-text text-transparent">Soul Finder</h1>
            <ul className="text-black items-center gap-3 sm:gap-5 md:gap-10 justify-between text-lg hidden md:flex">
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/'>Home</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/'>Search</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to=''>Matches</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to=''>Liked</Link>
                <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/Account'>Settings</Link>
            </ul>
            <button onClick={()=>setOpen((prev)=>!prev)} className="block md:hidden"><FaBars size={20}/></button>
            {
                open?
                <ul className="absolute flex flex-col top-16 right-5 w-64 z-50 rounded-md bg-mild md:hidden">
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-black hover:bg-primary text-white px-5 py-4" to='/'>Home</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-black hover:bg-primary text-white px-5 py-4" to='/'>Search</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-black hover:bg-primary text-white px-5 py-4" to=''>Matches</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-black hover:bg-primary text-white px-5 py-4" to=''>Liked</Link>
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer bg-black hover:bg-primary text-white px-5 py-4" to='/Account'>Settings</Link>
                </ul>:<></>
            }
        </div>
    )
}

export default Navbar