import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/slice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SetProfile = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:7000/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUsers(res?.data?.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      },5000);
    } catch (error) {
      setError(error?.response?.data);
      //   console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 h-[700px] shadow-xl m-5">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs  bg-base-300"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs  bg-base-300"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs  bg-base-300"
                value={age}
                onChange={(e) => setage(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Profile Picture</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs  bg-base-300"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea
                className="textarea textarea-bordered bg-base-300"
                placeholder="Bio"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select
                className="input input-bordered w-full max-w-xs  bg-base-300"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              >
                {/* <summary className="btn m-1">Gender</summary> */}
                <option value="">Select Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="others">others</option>
              </select>
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={SetProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <div className="m-5">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {showToast && (<div className="toast toast-top toast-center">
        <div className="alert alert-info">
          <span>Profile Updated</span>
        </div>
      </div>
      )}
    </div>
  );
};

export default EditProfile;
