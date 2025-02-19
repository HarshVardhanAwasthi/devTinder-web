import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequests } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/user/requests/received",
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addRequest(res?.data?.data || []));
    } catch (error) {
      // setError(error?.response?.data)
      dispatch(addRequest([]));
    }
  };

  const handleRequest = async (status, _id) => {
    try {
      const res = axios.post(
        "http://localhost:7000/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {}
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests || requests.length === 0) return <h1> No requests Found</h1>;

  return (
    <div className="text-center my-5">
      <h1 className="text-bold text-black text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, photoUrl } =
          request.fromUserId;

        return (
          <div key={_id} className="flex flex-col items-center  my-5">
            <div className="card bg-base-300 rounded-box grid h-40 md:h-32 lg:h-20 w-2/5 md:w-1/2 lg:w-1/2 items-center">
              <div className="flex flex-wrap justify-center md:justify-between lg:justify-between lg:w-full">
                <div className="avatar m-4 lg:m-2 ">
                  <div className="ring-secondary ring-offset-base-100  w-10 rounded-full ring ring-offset-2">
                    <img src={photoUrl} />
                  </div>
                </div>
                <div className="flex flex-col place-items-center  my-4">
                  <h2 className="font-bold">{firstName + " " + lastName}</h2>
                  <p className="">{age + ", " + gender}</p>
                </div> 
                <div className="my-4">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={() => handleRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
