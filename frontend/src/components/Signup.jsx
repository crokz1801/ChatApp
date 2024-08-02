import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success('SignIn Successfull !')
        
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 ">
        <h1 className="text-3xl font-bold text-center text-black">
          Sign-Up !!
        </h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text font-semibold  text-black ">
                Full Name
              </span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="rounded-md w-full input-bordered h-10 p-3"
              type="text"
              placeholder="Enter full Name"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text font-semibold  text-black ">
                User Name
              </span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="rounded-md w-full input-bordered h-10 p-3"
              type="text"
              placeholder="Enter Username"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text font-semibold  text-black ">
                Password
              </span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="rounded-md w-full input-bordered h-10 p-3"
              type="text"
              placeholder="Enter Password"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text font-semibold  text-black ">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="rounded-md w-full input-bordered h-10 p-3"
              type="text"
              placeholder="Re-Enter Password"
            />
          </div>

          <div className=" flex justify-center mt-2 text-black">
            <div className="p-2 flex">
              <p>Male ?</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox border-black mx-2"
              />
            </div>

            <div className="p-2 flex">
              <p>Female ?</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox border-black mx-2"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm w-full my-3 border-white "
            >
              Sign-Up !
            </button>
          </div>
          <div className="flex justify-center text-blue-950 font-semibold">
            <Link to="/login">
              <p className="underline"> Already Have An Account ? </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
