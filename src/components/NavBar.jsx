import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/slice";
import axios from "axios"

const NavBar=()=>{
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async ()=>{
    try {
      await axios.post("http://localhost:7000/logout",{withCredentials:true},
      )
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      
    }
  }

  const user = useSelector((store)=>store.user);
    return(
      <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      {user&&(
      <div className="flex-none gap-2 mx-2">
        <div className="form-control">Welcome,{user.firstName}</div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Photo"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
      )}
    </div>
    )
}

export default NavBar;