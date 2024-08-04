import React,{useEffect, useState} from "react";
import Navbar from "../../Components/Navbar";
import Card from "../../Components/Card"
import { useSelector,useDispatch } from "react-redux";
import { MdFilterAlt  } from "react-icons/md";
import { handlePop,SearchBarFilter } from "../../Redux/MemberSlice";
import { setChangesToFiltered } from "../../Redux/MemberSlice";
import { setFilteredToAll } from "../../Redux/MemberSlice";
import Loader from "../../Components/Loader";

const Search = () =>{
    const [filters,setFilteres] = useState({
        motherTongue:"",
        martialStatus:"",
        religion:"",
        gender:""
    })
    const Members = useSelector((state)=>state.Members.allMembers);
    const Filtered = useSelector((state)=>state.Members.Search.filtered);
    const SearchPop = useSelector((state)=>state.Members.Search.SearchPop);
    const loading = useSelector(state => state.Members.loading)
    const dispatch = useDispatch();
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    const handleFilterChange = (e) =>{
        setFilteres({...filters,[e.target.name]:e.target.value})
        console.log(filters);
    }
    const handleFilterSubmit = ()=>{
        dispatch(setChangesToFiltered({allMembers:Members,filters:filters}));
        dispatch(handlePop('close'))
    }
    console.log(Members);
    return(
        loading?<Loader/>:
        <div className="Search min-h-screen w-screen flex flex-col px-5 md:px-10 lg:px-20 py-28 gap-5 bg-tertiary">
            <Navbar/>
            <div className="flex flex-col gap-2">
                <h1 className="text-primary  text-2xl sm:text-3xl font-bold">Search</h1>
                <p className="text-lg sm:text-xl font-semibold opacity-50">Find your perfect partner</p>
            </div>
            <div className="bar flex gap-2 relative z-10">
                <input onChange={(e)=>dispatch(SearchBarFilter(e.target.value))} type="text" id="search" className="block p-2 w-fit outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search"/>
                <div onClick={()=>dispatch(handlePop('open'))} className="p-2 rounded-md border border-primary text-primary cursor-pointer w-fit"><MdFilterAlt size={20}/></div>
                {
                    SearchPop?
                    <div className="absolute gap-5 shadow-md shadow-offmode flex flex-col p-5 w-full sm:w-2/3 min-h-52 rounded-md bg-mode top-14 z-10">
                        <h1 className="text-xl font-bold text-primary">Apply Filter</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <input
                                list="gender-options"
                                name="gender"
                                value={filters.gender}
                                onChange={handleFilterChange}
                                placeholder="Gender"
                                className="basic-input"
                                id="Gender"
                            />
                            <datalist id="gender-options">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </datalist>     
                            <input value={filters.motherTongue} list="motherTongue-list"  onChange={handleFilterChange} placeholder="Mother Tongue" name="motherTongue" className="basic-input w-full" />
                            <datalist id="motherTongue-list">
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Telugu">Telugu</option> 
                                <option value="Malayalam">Malayalam</option> 
                            </datalist>  
                            <input value={filters.martialStatus} list="martialStatus-list"  onChange={handleFilterChange} placeholder="Marital Status" name="martialStatus" className="basic-input w-full" />
                            <datalist id="martialStatus-list">
                                <option value="Select" selected>Select Status</option>
                                <option value="Never Married">Never Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorsed">Divorsed</option> 
                                <option value="Awaiting Divorse">Awaiting Divorse</option> 
                            </datalist>  
                            <input value={filters.religion} list="Religion-list"  onChange={handleFilterChange} placeholder="Religion" name="religion" className="basic-input w-full" />
                            <datalist id="Religion-list">
                                <option value="" selected>Select Religion</option> 
                                <option value="Hindu">Hindu</option>
                                <option value="Muslim">Muslim</option>
                                <option value="Christian">Christian</option>
                                <option value="Sikhm">Sikhm</option> 
                            </datalist> 
                        </div>
                        <div className="flex gap-5 items-end justify-end">
                            <button onClick={()=>{
                                dispatch(setFilteredToAll());
                                dispatch(handlePop('close'));
                            }} className="px-3 py-1 border border-primary text-primary rounded-md">Remove</button>
                            <button onClick={handleFilterSubmit} className="px-3 py-1 border border-primary text-mode bg-primary rounded-md">Apply</button>
                        </div>
                    </div>:<></>
                }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    Filtered.map((elem)=>
                        <Card key={elem} elem={elem}/>
                    )
                }
            </div>
        </div>
    )
}

export default Search