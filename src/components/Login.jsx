import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/slice";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [emailId, setEmailId] = useState("@gmail.com");
  const [password, setPassword] = useState("@1234");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7000/signup",
        {
          firstName,
          lastName,
          age,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUsers(res?.data?.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7000/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUsers(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  return (
    // Grid (like Flexbox) works on children, not on the parent itself.
    // So, if you apply grid place-items-center on an element, it will only affect its direct children, not itself.
    // So we need to wrap that card code into  new div which will be the parent div of  that  card   div and there we wll  apply those   tailwind classes to align the card in center
    <div className={`place-items-center ${isLoginForm ? "mb-[135px]" : ""}`}>
      <div
        className={`card bg-base-300 w-96 shadow-xl my-2 ${
          isLoginForm ? "" : ""
        }`}
      >
        <div className="card-body items-center m-0 p-2 ">
          <h2
            className={`card-title text-3xl font-bold ${isLoginForm ? "" : ""}`}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="justify-end p-0">
            <button
              className={`btn border-2 border-white w-1/2 rounded-none ${
                isLoginForm
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-500 border border-pink-500"
              }`}
              onClick={() => setIsLoginForm(true)}
            >
              LoginUp
            </button>
            <button
              className={`btn border-2 border-white w-1/2 rounded-none ${
                !isLoginForm
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-500 border border-pink-500"
              }`}
              onClick={() => setIsLoginForm(false)}
            >
              SignUp
            </button>
          </div>
          {!isLoginForm && (
            <>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs  bg-base-300"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs  bg-base-300"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs  bg-base-300"
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                  />
                </label>
              </div>
            </>
          )}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs  bg-base-300"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="form-control relative w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type={showPassword ? "password" :  "text"}
                className="input input-bordered w-full max-w-xs  bg-base-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-[52px] left-[192px] flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
