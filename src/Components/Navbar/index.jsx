import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";
// import { dummy } from "../../Assets";
// import { MdHomeFilled,MdOutlineSettings } from "react-icons/md";
// import { IoMdSearch } from "react-icons/io";
// import { GrConnect } from "react-icons/gr";
// import { setNav } from "../../Redux/MemberSlice";


const Navbar = () =>{
    const [open,setOpen] = useState(false);
    const [premium,setPremium] = useState(false);
    const myprofile = useSelector((state)=>state.Members.Profile)
    return(
        <div className="Navbar w-screen fixed top-0 z-20 left-0 px-5 sm:px-10 lg:px-20 py-4 bg-mild flex justify-between items-center">

            {/* Premium subscribe pop  */}
            {
                premium?
                <div id="PremiumPOP" className="rounded-md h-screen z-20 w-screen fixed bg-white bg-opacity-50 top-0 left-0 flex items-center justify-center">
                    <div class="relative bg-gradient-to-r from-offmode via-primary to-primary flex flex-col gap-5 items-center justify-center text-center p-5 h-1/2 sm:h-2/3 m-1 w-4/5 sm:w-1/2 lg:w-3/5 rounded-md shadow-sm shadow-secondary">
                    <div onClick={()=>setPremium(false)} className="absolute top-5 right-5">
                        <IoMdClose className="cursor-pointer" size={30}/>
                    </div>
                        <h1 className="text-tertiary font-extrabold text-3xl tracking-wider w-full md:text-5xl md:w-4/5 ">Get Your Premium Subscription Now</h1>
                        <div className="flex flex-col gap-3">
                            <p className="text-tertiary opacity-70 font-bold">Get notified by people 120% more than Usual</p>
                            <p className="text-tertiary opacity-70 font-bold ">Get upto 5 Personal Details Credentials per day</p>
                        </div>
                        <button className="bg-tertiary text-offmode text-lg hover:bg-offmode hover:text-tertiary hover:duration-100 px-5 py-2 rounded-md font-bold">Subscribe</button>
                    </div>
                </div>:<></>
            }

            <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-offmode via-primary to-primary bg-clip-text text-transparent">Soul Finder</Link>
            <ul className="text-offmode items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-between text-md font-semibold hidden md:flex">
                <Link className={`opacity-65 hover:opacity-100 cursor-pointer ${window.location.pathname === "/"?"text-primary":""}`} to='/'>HOME</Link>
                <Link className={`opacity-65 hover:opacity-100 cursor-pointer ${window.location.pathname==="/Search"?"text-primary":""}`} to='/Search'>SEARCH</Link>
                <Link className={`opacity-65 hover:opacity-100 cursor-pointer ${window.location.pathname === "/Matches"?"text-primary":""}`} to='/Matches'>MATCHES</Link>
                <Link className={`opacity-65 hover:opacity-100 cursor-pointer ${window.location.pathname === "/Like"?"text-primary":""}`} to='/Like'>LIKED</Link>
                <Link className={`opacity-65 hover:opacity-100 cursor-pointer ${window.location.pathname === "/Account"?"text-primary":""}`} to='/Account'>SETTINGS</Link>
                {
                        myprofile.membership === 1 && myprofile.dailyLog
                        ?<div className="px-3 py-2 text-primary border-2 border-primary rounded-md flex items-center justify-center gap-5 font-bold">
                        Credits : {myprofile.dailyLog.creditsCount}
                    </div>:<div onClick={()=>setPremium(true)} className="cursor-pointer px-3 py-2 text-primary border-2 border-primary rounded-md flex items-center justify-center gap-5 font-bold">
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
                <ul className="absolute flex flex-col gap-2 top-16 right-5 w-64 z-20 bg-mild p-2 rounded-md  md:hidden">
                    <Link className="rounded-md opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/'>Home</Link>
                    <Link className="rounded-md opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Search'>Search</Link>
                    <Link className="rounded-md opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Matches'>Matches</Link>
                    <Link className="rounded-md opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Like'>Liked</Link>
                    <Link  className=" rounded-md opacity-65 hover:opacity-100 cursor-pointer bg-offmode hover:bg-primary text-white px-5 py-4" to='/Account'>Settings</Link>
                    {
                        myprofile.membership === 1 && myprofile.dailyLog
                        ?<div className="px-3 py-2 text-primary border-2 border-primary rounded-md flex items-center justify-center gap-5 font-bold">
                        Credits : {myprofile.dailyLog.creditsCount}
                        </div>:<div onClick={()=>{
                            setOpen((prev)=>!prev)
                            setPremium(true);
                        }} className="cursor-pointer px-3 py-2 text-primary border-2 border-primary rounded-md flex items-center justify-center gap-5 font-bold">
                            For Premium
                        </div>
                        }
                        <div onClick={()=>{
                            localStorage.removeItem('user');
                            window.location.reload();
                        }} className="cursor-pointer px-3 py-2 text-white bg-primary rounded-md flex items-center justify-center gap-5 font-bold">Sign Out</div>
                </ul>:<></>
            }
        </div>
    )
}

export default Navbar