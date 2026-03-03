import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.data));
      console.log(connections);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (!connections.length)
    return (
      <h1 className="text-bold text-2xl text-center my-10">
        No connections found!
      </h1>
    );

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-bold text-3xl text-white">Connections</h1>
      <div className="my-10">
        {connections &&
          connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, about, age, gender } =
              connection;
            return (
              <div
                key={_id}
                className="flex items-center gap-4 m-4 p-4 bg-black rounded-lg max-h-40"
              >
                <div className="min-w-25">
                  <img
                    src={photoUrl}
                    alt={`profile pic`}
                    className="w-20 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h3>
                  {age && gender && <p>{age + " " + gender}</p>}
                  <p className="h-15 overflow-y-auto">{about}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Connections;
