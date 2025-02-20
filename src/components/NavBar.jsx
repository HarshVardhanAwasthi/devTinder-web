import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/slice";
import axios from "axios";
import { removeConnection } from "../utils/ConnectionSlice";
import {logOut}  from "../utils/feedSlice"

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7000/logout", {
        withCredentials: true,
      });
      dispatch(removeUser());
      dispatch(removeConnection());
      dispatch(logOut());
      return navigate("/login");
    } catch (error) {}
  };

  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to={user?"/":"/login"} className="btn btn-ghost text-xl">
          <img
            className="w-10 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmY2iYQZouGBDROI4gVZL_FZL4kideIsTmzQ&s"
            alt="logo"
          />
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2 mx-2">
          <div className="form-control">Welcome,{user.firstName}</div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>
            {isOpen &&  (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/Connections" onClick={() => setIsOpen(false)}>Connections</Link>
              </li>
              <li>
                <Link to="/requests" onClick={() => setIsOpen(false)}>Requests</Link>
              </li>
              <li>
                <a onClick={()=>{handleLogout();  setIsOpen(false)}} >Logout</a>
              </li>
            </ul>
)}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
