import { useDispatch, useSelector } from "react-redux";
// import BASEURL from "../utils/BaseUrl";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) {
        return;
      }
      const res = await axios.get(BASE_URL+"/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, []);
  
  return (
    (feed &&
    <div className="my-2">
        <UserCard user={feed[0]}/>
    </div>
  ));
};

export default Feed;
