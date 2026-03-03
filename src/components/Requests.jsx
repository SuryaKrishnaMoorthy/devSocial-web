import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.data));
    console.log(requests);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(res.data.data._id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!requests) return;
  if (!requests.length)
    return (
      <h1 className="text-bold text-2xl text-center my-10">
        No Requests found
      </h1>
    );
  return (
    <div className="flex flex-col justify-between items-center my-10">
      <h1 className="text-bold text-3xl text-white">Connection Requests</h1>
      <div className="my-10">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, about } =
            request.fromUserId;
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
                <p className="overflow-y-auto">{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
