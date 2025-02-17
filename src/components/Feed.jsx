import { useDispatch, useSelector } from "react-redux";
// import BASEURL from "../utils/BaseUrl";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) {
        return;
      }
      const res = await axios.get("http://localhost:7000/user/feed", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, []);
  
  return (
    (feed &&
    <div>
        <UserCard user={feed[0]}/>
    </div>
  ));
};

export default Feed;
