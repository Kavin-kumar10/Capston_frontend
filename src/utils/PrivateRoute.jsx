import { Outlet,Navigate,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setAuthenticated } from "../Redux/AuthSlice";
import { Validator } from "../Redux/AuthSlice";
import { useEffect } from "react";

const PrivateRoutes = () => {
    let isAuthenticated = useSelector(state => state.Auth.isAuthenticated)
    const dispatch = useDispatch();
    useEffect(()=>{
        setTimeout(()=>{
            if(localStorage.getItem('user')){
                const localdata = JSON.parse(localStorage.getItem('user'));
                dispatch(Validator(localdata.token));
                console.log(localdata);
            }
            else{
                dispatch(setAuthenticated(false))
                // alert("un authorized entry")
            }
        })
    },[dispatch])
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/Login"/>
    )
}

export default PrivateRoutes