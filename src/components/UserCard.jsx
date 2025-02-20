import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import {removeFeed} from "../utils/feedSlice";
const UserCard = ({ user }) => {
  if (!user || Object.keys(user).length === 0) {
    return <h1>No User Data Available</h1>;
  }
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  const feed=useSelector((store)=>store.feed);
  console.log(user);
  const dispatch=useDispatch();
  const handleFeed = async (status, _id) => {
    
    try {
      const res = await axios.post(
        "http://localhost:7000/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log("intersted")
      dispatch(removeFeed(_id));
    } catch (error) {
      
    }
  };

  // if (!feed || feed.length === 0) return <h1> No Users Left</h1>;

  return (
    <div className="place-items-center overflow-auto">
      <div className="card bg-base-300 w-96 h-auto shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl}
            alt="Profile Photo"
            className="rounded-xl h-auto"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p className="my-1">{gender + ", " + age}</p>}
          <p className="h-auto mt-0">{about}</p>
          <div className="card-actions my-2">
            <button className="btn btn-primary" onClick={()=>handleFeed("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=>handleFeed("interested",_id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
