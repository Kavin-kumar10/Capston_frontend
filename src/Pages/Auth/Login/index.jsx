import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from "react-redux";
import { logo } from "../../../Assets";
import { Link } from "react-router-dom";
import { postLoginRequest } from "../../../Redux/AuthSlice";
import { setLogEmail, setLogPassword } from "../../../Redux/AuthSlice";
import Toastify from "../../../utils/Toastify";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();
    let isAuthenticated = useSelector(state => state.Auth.isAuthenticated)
    const Log = useSelector(state=>state.Auth.Log);
    const dispatch = useDispatch();

    useEffect(()=>{
        // if(localStorage.getItem('user')){
        //     const localdata = JSON.parse(localStorage.getItem('user'));
        //     dispatch(Validator(localdata.token));
        // }
        if(isAuthenticated){
            navigate('/');
        }
        
    },[isAuthenticated,navigate])
    
    const handleEmailChange = (e) => {
        dispatch(setLogEmail(e.target.value)); // Dispatch action to update email
    };
    
    const handlePasswordChange = (e) => {
    dispatch(setLogPassword(e.target.value)); // Dispatch action to update password
    };

    const handlereset = () =>{
        dispatch(setLogEmail(''));
        dispatch(setLogPassword(''));
    }

    return(
        <div className="Login h-screen w-screen flex">
            <ToastContainer/>
            <div className="w-full sm:w-1/2 h-full p-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl text-secondary font-bold my-5" >Login</h1>
                <form onSubmit={async (e)=>{
                    e.preventDefault();
                    try {
                        const resultAction = await dispatch(postLoginRequest(Log));
                
                        if (postLoginRequest.fulfilled.match(resultAction)) {
                            console.log('Operation succeeded:', resultAction.payload);
                            Toastify.success("Login Success, Please wait...")
                            // Perform actions on successful login, like redirecting
                            setTimeout(() => {
                                navigate('/');
                            }, 1000);
                        } else {
                            Toastify.error(resultAction.error.message);
                            console.error('Operation failed:', resultAction.error.message);
                            if(resultAction.error.message === "User is disabled"){
                                Toastify.info("Get verified call : 9876543214");
                            }
                            // Handle errors
                        }
                    } catch (error) {
                        console.error('Unexpected error:', error);
                    }
                    handlereset();
                }} id="login" action="/" className="w-full gap-2 py-5 rounded-md flex items-center justify-center flex-col">
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50 text-secondary" for="email">Email</label>
                                <p id="idError" className="invisible text-red-600 text-sm">Error</p>
                            </div>
                            <input onChange={handleEmailChange} value={Log.email} required name="email" type="email" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" id="email"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50" for="password">Password</label>
                                <p id="passError" className="invisible text-red-600 text-sm">Error</p>
                            </div>
                            <input onChange={handlePasswordChange} value={Log.password} required name="password" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="password" id="password"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <p className="self-start">Create new account?<Link className="text-blue-700" to='/Register'> Register</Link></p>
                        </div>
                        <div className="flex justify-between w-full md:w-2/3 lg:w-1/2">
                            <button className="px-5 py-2 border-2 border-secondary" onClick={handlereset} type="reset">Reset</button>
                            <button className="px-5 py-2 border-2 border-secondary bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary duration-300" type="submit">Submit</button>
                        </div>
                </form>
            </div>
            <div className=" w-1/2 h-full bg-secondary hidden sm:flex items-center justify-center ">
                <div className="flex flex-col items-center justify-center w-full">
                    <img className="w-1/2 h-auto" src={logo} alt="Logo"/>
                    <p className="mt-12 text-2xl text-tertiary font-semibold opacity-50">Find Your Perfect Partner</p>
                </div>
            </div>
        </div>
    )
}

export default Login