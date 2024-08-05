import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import ActivatePop from "./ActivatePop";
import { GetAllMembers } from "../../../Redux/AdminSlice";
import { SearchBarFilterAdmin } from "../../../Redux/AdminSlice";
import { Link } from "react-router-dom";
import { setSelected } from "../../../Redux/AdminSlice";
import { DeactivateMember } from "../../../Redux/AdminSlice";
import { dummy } from "../../../Assets";
import { useNavigate } from "react-router-dom";

const Activate = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let isAuthenticated = useSelector(state => state.Auth.isAuthenticated)
    let role = useSelector(state => state.Auth.role)
    useEffect(()=>{
        if(isAuthenticated && role === "user"){
            navigate('/');
        }
        dispatch(GetAllMembers());
    },[dispatch,isAuthenticated,navigate,role])

    const Selected = useSelector(state=>state.Admin.Selected)
    const filtered = useSelector(state=>state.Admin.filtered)
    return(
        <div className="Activate py-28 px-5 flex flex-col min-h-screen gap-10 sm:px-10 md:px-20 bg-tertiary">
            {
                Selected.memberId?
                 <ActivatePop/> :<></>
            }
            <div className="Nav z-10 flex items-center justify-between  lg:py-0 px-5 sm:px-10 md:px-20 bg-mild fixed top-0 left-0 w-full h-16">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-offmode via-primary to-primary bg-clip-text text-transparent">Soul Finder</h1>
                <ul className="text-offmode items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-between text-xl font-semibold hidden md:flex">
                    <Link className="opacity-65 hover:opacity-100 cursor-pointer" to='/Admin/Activate'>Activate</Link>
                    <div onClick={()=>{
                        localStorage.removeItem('user');
                        window.location.reload();
                    }} className="cursor-pointer px-3 py-2 text-white bg-primary rounded-md flex items-center justify-center gap-5 font-bold">Sign Out</div>                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-primary text-xl sm:text-3xl font-bold">Activate Update</h1>
                <p className="text-sm sm:text-xl font-semibold opacity-50">Update member status and membership here</p>
                <input onChange={(e)=>dispatch(SearchBarFilterAdmin(e.target.value))} type="text" className="outline-none border border-offmode rounded-md px-3 py-2 w-fit mt-8" placeholder="Search" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {
                filtered?.map((elem)=>{
                    return(
                        <div key={elem} className="flex flex-col gap-5 p-5 shadow-md shadow-offmode bg-mode">
                            <div className="aspect-square">
                                <img className="h-full w-full" src={elem.profilePic?elem.profilePic:dummy} alt="" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-lg font-semibold">{elem.name}</h1>
                                <div className="flex gap-2">
                                    {(elem.membership === 1)?
                                        <div className="px-2 py-1 bg-primary text-xs rounded-md w-fit text-mode">Premium</div>
                                    : <div className="px-2 py-1 bg-green-800 text-xs rounded-md w-fit text-mode">Free</div>
                                    }
                                    {(elem.plan === 1)?
                                        <div className="px-2 py-1 bg-primary text-xs rounded-md w-fit text-mode">Admin</div>
                                    : <div className="px-2 py-1 bg-green-800 text-xs rounded-md w-fit text-mode">User</div>
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <button onClick={()=>{dispatch(setSelected(elem))}} className="bg-primary px-2 py-1 text-tertiary rounded-md border border-primary outline-none">Activate</button>
                                <button onClick={()=>{
                                        dispatch(DeactivateMember(elem.memberId));
                                    }} className="bg-mode px-2 py-1 text-primary border border-dotted border-primary rounded-md outline-none">Deactivate</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>

        </div>
    )
}

export default Activate