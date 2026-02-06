import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("alia@gmail.com");
  const [password, setPassword] = useState("Alia@123");

  const handleLogin = async () => {
    try {
      axios.post(
        "http://localhost:3000/login",
        { emailId: email, password },
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-neutral text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <div>
            <fieldset className="fieldset mb-2">
              <legend className="fieldset-legend text-base">Email</legend>
              <input
                type="text"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base">Password</legend>
              <input
                type="password"
                className="input validator"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-2 ">
            <button className="btn bg-violet-800" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
