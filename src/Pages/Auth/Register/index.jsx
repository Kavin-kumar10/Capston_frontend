import React,{useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Toastify from "../../../utils/Toastify";
import { useNavigate } from "react-router-dom";
import { Validator } from "../../../Redux/AuthSlice";
import { Link } from "react-router-dom";
import { logo } from "../../../Assets";
import { useSelector,useDispatch } from "react-redux";
import { postRegisterRequest } from "../../../Redux/AuthSlice";
import { setRegEmail,setRegPassword,setRegName } from "../../../Redux/AuthSlice";

const Register = () =>{

    const navigate = useNavigate();
    let isAuthenticated = useSelector(state => state.Auth.isAuthenticated)
    const Reg = useSelector(state=>state.Auth.Reg);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(localStorage.getItem('user')){
            const localdata = JSON.parse(localStorage.getItem('user'));
            dispatch(Validator(localdata.token));
        }
        if(isAuthenticated){
            navigate('/');
        }
    },[dispatch,navigate,isAuthenticated])

    const handleNameChange = (e) =>{
        dispatch(setRegName(e.target.value)); // Dispatch action to update name
    }

    const handleEmailChange = (e) => {
        dispatch(setRegEmail(e.target.value)); // Dispatch action to update email
    };
    
    const handlePasswordChange = (e) => {
        dispatch(setRegPassword(e.target.value)); // Dispatch action to update password
    };
    const handleReset = () =>{
        dispatch(setRegName('')); // Dispatch action to update name
        dispatch(setRegEmail('')); // Dispatch action to update email
        dispatch(setRegPassword('')); // Dispatch action to update password
    }
    return(
        <div className="Register h-screen w-screen flex">
            <ToastContainer />
            <div className=" w-1/2 h-full bg-secondary hidden sm:flex items-center justify-center ">
                <div className="flex flex-col items-center justify-center w-full">
                    <img className="w-1/2 h-auto" src={logo} alt="Logo"/>
                    <p className="mt-12 text-2xl text-tertiary font-semibold opacity-50">Find Your Perfect partner</p>
                </div>
            </div>
            <div className="w-full sm:w-1/2 h-full p-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl text-secondary font-bold my-5">Register</h1>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                            try{
                                dispatch(postRegisterRequest(Reg));
                                navigate('/Login');
                                handleReset()
                                Toastify.success("Registration Successfull");
                            }
                            catch(err){

                            }
                        }} id="register" className="w-full gap-2 py-5 rounded-md flex items-center justify-center flex-col">
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50 text-secondary" for="Name">Username</label>
                                <p className="invisible">Error</p>
                            </div>
                            <input value={Reg.name} onChange={handleNameChange} name="Name" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="text" id="Name"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50" for="email">Email</label>
                                <p className="invisible">Error</p>
                            </div>
                            <input value={Reg.email} onChange={handleEmailChange} name="email" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="email" id="email"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50" for="password">Password</label>
                                <p className="invisible">Error</p>
                            </div>
                            <input value={Reg.password} onChange={handlePasswordChange} name="password" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="password" id="password"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <p className="self-start">Already Have an account? <Link className="text-blue-700" to='/Login'>Login</Link></p>
                        </div>
                        <div className="flex justify-between w-full md:w-2/3 lg:w-1/2">
                            <button className="px-5 py-2 border-2 border-secondary" onClick={handleReset} type="reset">Reset</button>
                            <button className="px-5 py-2 border-2 border-secondary bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary duration-300" type="submit">Submit</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register