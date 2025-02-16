import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/slice";
import { useNavigate } from "react-router-dom";
const Login = () => { 
    const [emailId, setEmailId]=useState("rs@gmail.com");
    const [password, setPassword]=useState("Rohit@1234");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin=async ()=>{
      try{
          const res=await axios.post("http://localhost:7000/login",{
              emailId,
              password,
            }, 
            {
              withCredentials:true
            }
          );
          dispatch(addUsers(res.data));
          return navigate("/Feed");
      }
      catch(error){
        console.log(error);
      }
    }

    return (
    // Grid (like Flexbox) works on children, not on the parent itself.
    // So, if you apply grid place-items-center on an element, it will only affect its direct children, not itself.
    // So we need to wrap that card code into  new div which will be the parent div of  that  card   div and there we wll  apply those   tailwind classes to align the card in center
    <div className="place-items-center">
      <div className="card bg-base-300 w-96 shadow-xl my-5">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input type="text" 
              className="input input-bordered w-full max-w-xs  bg-base-300" 
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              />
            </label>
          </div>
          <div>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input 
              type="password" 
              className="input input-bordered w-full max-w-xs  bg-base-300" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary"  onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Login;
