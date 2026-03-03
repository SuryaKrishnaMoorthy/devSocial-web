import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UserCard } from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

export const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(
    user?.photoUrl ||
      "https://media.allure.com/photos/618153bc590337268c4b06fd/16:9/w_2560%2Cc_limit/My%2520Beautiful%2520Black%2520Hair%25201.jpg",
  );
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSaveProfile = async () => {
    setError("");
    setShowToast(false);

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, photoUrl, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10 gap-5">
      <div className="flex justify-center ">
        <div className="card bg-neutral text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
            <div>
              <fieldset className="fieldset mb-2">
                <legend className="fieldset-legend text-base">
                  First Name
                </legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mb-2">
                <legend className="fieldset-legend text-base">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mb-2">
                <legend className="fieldset-legend text-base">Age</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mb-2">
                <legend className="fieldset-legend text-base">Gender</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mb-2">
                <legend className="fieldset-legend text-base">About</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mb-2">
                <legend className="fieldset-legend text-base">Photo Url</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Photo Url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <div className="card-actions justify-center mt-2 ">
              <button className="btn bg-violet-800" onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
            {showToast && (
              <div className="toast toast-top toast-start">
                <div className="alert alert-success">
                  <span>Profile edited successfully</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, photoUrl, gender, about }} />
    </div>
  );
};
