import React,{useEffect} from "react";
import Navbar from "../../Components/Navbar";
import Card from "../../Components/Card"
import { useSelector,useDispatch } from "react-redux";
import { MdFilterAlt, MdFilterAltOff  } from "react-icons/md";
import { handlePop,SearchBarFilter } from "../../Redux/MemberSlice";

const Search = () =>{
    const Members = useSelector((state)=>state.Members.allMembers);
    const Filtered = useSelector((state)=>state.Members.Search.filtered);
    const SearchPop = useSelector((state)=>state.Members.Search.SearchPop);
    const dispatch = useDispatch();
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    console.log(Members);
    return(
        <div className="Search min-h-screen w-screen flex flex-col px-5 md:px-10 lg:px-20 py-28 gap-5 bg-tertiary">
            <Navbar/>
            <div className="flex flex-col gap-2">
                <h1 className="text-primary  text-xl sm:text-3xl font-bold">Search</h1>
                <p className="text-sm sm:text-xl font-semibold opacity-50">Find your perfect partner</p>
            </div>
            <div className="bar flex gap-2 relative z-10">
                <input onChange={(e)=>dispatch(SearchBarFilter(e.target.value))} type="text" id="search" class="block p-2 w-fit outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search"/>
                <div onClick={()=>dispatch(handlePop('open'))} className="p-2 rounded-md border border-primary text-primary cursor-pointer w-fit"><MdFilterAlt size={20}/></div>
                {
                    SearchPop?
                    <div className="absolute w-2/3 min-h-52 rounded-md bg-mode top-14 z-10">

                    </div>:<></>
                }
            </div>
            <div className="grid grid-cols-4 gap-10">
                {
                    Filtered.map((elem)=>
                        <Card elem={elem}/>
                    )
                }
            </div>
        </div>
    )
}

export default Search