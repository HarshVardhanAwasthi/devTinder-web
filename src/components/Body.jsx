import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../utils/slice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Body=()=>{

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((store)=>store.user)

    const fetchUser=async ()=>{
        // if(!user) return  navigate("/login");
        try{
            const res=await axios.get(BASE_URL+"/profile",{withCredentials:true});
            dispatch(addUsers(res.data));
        }
        catch(error){
            if(error.status===401){
                return navigate("/login");
            }
            console.error(error);
            
        }
    }


    useEffect(()=>{
        fetchUser();
    }, []);

    return(
        <div className="w-full h-screen overflow-x-auto">
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Body;