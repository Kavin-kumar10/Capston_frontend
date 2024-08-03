import React from "react";
import Navbar from "../Navbar";
import './Loader.css';

const Loader = () =>{
    return(
        <div className="Preloader bg-tertiary" id="preload">
            <Navbar/>
            <div className="circle "></div>
        </div>
    )
}

export default Loader