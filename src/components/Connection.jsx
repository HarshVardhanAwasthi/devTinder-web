import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnetion } from "../utils/ConnectionSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  //   console.log(connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    // if(!connections){
    //     return;
    // }
    try {
      const res = await axios.get(BASE_URL+"/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnetion(res?.data?.data || []));
    } catch (err) {
        console.error("Error fetching connections:", err);
        dispatch(addConnetion([]));
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

//   if (!connections) return;

  if (!connections || connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-5">
        <h1 className="text-bold text-black text-3xl">Connections</h1>

      {connections.map((connection) => {
          const {_id, firstName, lastName, age, gender, photoUrl, about } =
            connection;

          return (
            <div key={_id} className="flex flex-col items-center  my-5">
              <div className="card bg-base-300 rounded-box grid h-auto md:h-32 lg:h-20 w-auto md:w-1/2 lg:w-1/2">
                <div className="flex justify-center md:justify-between lg:justify-between lg:w-full">
                  <div className="avatar m-4 ">
                    <div className="ring-secondary ring-offset-base-100  w-10 h-10 rounded-full ring ring-offset-2">
                      <img src={photoUrl} />
                    </div>
                  </div>
                  <div className="flex flex-col place-items-center my-4">
                  <h2 className="font-bold">{firstName + " " + lastName}</h2>
                  <p className="">{age+", "+gender}</p>
                  </div>
                  <div className="">
                  <button className="btn btn-outline btn-secondary mx-2 my-4">Message</button>
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

export default Connections;
