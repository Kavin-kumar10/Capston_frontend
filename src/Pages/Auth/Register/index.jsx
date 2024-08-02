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
            <div class=" w-1/2 h-full bg-secondary hidden sm:flex items-center justify-center ">
                <div class="flex flex-col items-center justify-center w-full">
                    <img class="w-1/2 h-auto" src={logo} alt="Logo"/>
                    <p class="mt-12 text-2xl text-tertiary font-semibold opacity-50">Find Your Perfect partner</p>
                </div>
            </div>
            <div class="w-full sm:w-1/2 h-full p-5 flex flex-col items-center justify-center">
                <h1 class="text-3xl text-secondary font-bold my-5">Register</h1>
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
                        }} id="register" class="w-full gap-2 py-5 rounded-md flex items-center justify-center flex-col">
                        <div class="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div class="flex justify-between">
                                <label class="opacity-50 text-secondary" for="Name">Username</label>
                                <p class="invisible">Error</p>
                            </div>
                            <input value={Reg.name} onChange={handleNameChange} name="Name" class="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="text" id="Name"/>
                        </div>
                        <div class="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div class="flex justify-between">
                                <label class="opacity-50" for="email">Email</label>
                                <p class="invisible">Error</p>
                            </div>
                            <input value={Reg.email} onChange={handleEmailChange} name="email" class="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="email" id="email"/>
                        </div>
                        <div class="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div class="flex justify-between">
                                <label class="opacity-50" for="password">Password</label>
                                <p class="invisible">Error</p>
                            </div>
                            <input value={Reg.password} onChange={handlePasswordChange} name="password" class="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="password" id="password"/>
                        </div>
                        <div class="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <p class="self-start">Already Have an account? <Link class="text-blue-700" to='/Login'>Login</Link></p>
                        </div>
                        <div class="flex justify-between w-full md:w-2/3 lg:w-1/2">
                            <button class="px-5 py-2 border-2 border-secondary" onClick={handleReset} type="reset">Reset</button>
                            <button class="px-5 py-2 border-2 border-secondary bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary duration-300" type="submit">Submit</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register