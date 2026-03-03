import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { BASE_URL } from "../utils/constants";
import { UserCard } from "./UserCard";
import { addFeed } from "../utils/feedSlice";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || !feed.length)
    return (
      <h1 className="text-center text-2xl font-bold my-10">
        No new users are available!
      </h1>
    );
  return (
    feed && (
      <div className="flex flex-col items-center gap-4 m-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
