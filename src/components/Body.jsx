import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../utils/slice";
import { useEffect } from "react";
import axios from "axios";
const Body=()=>{

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((store)=>store.user)

    const fetchUser=async ()=>{
        try{
            const res=await axios.get("http://localhost:7000/profile",
            {
                withCredentials:true
            });
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
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Body;