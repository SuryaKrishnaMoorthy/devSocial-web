import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
export const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div key={user._id} className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <p className="my-0 py-0">
          {user?.age && user?.gender && `${user?.age}, ${user?.gender}`}
        </p>
        <p>{user.about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", user?._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", user?._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
