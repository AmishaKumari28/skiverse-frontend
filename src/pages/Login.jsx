import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { MyStore } from "../context/Auth";
import { useForm } from "react-hook-form";
import API from "../api/api";

const Login = () => {
  const { loggedInUser, setLoggedInUser } = useContext(MyStore);

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handle = async (data) => {
    try {
      const response = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      // Save login token
      localStorage.setItem("token", token);

      // Save logged-in user
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(user)
      );

      // Update React state
      setLoggedInUser(user);

      // Go to main page
      navigate("/main");

      reset();

    } catch (error) {
      console.log("Login error:", error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FF] flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center px-20">

        {/* Logo */}
        <div className="mb-4">
          <h1 className="text-6xl font-bold tracking-tight text-[#174F78]">
            SKI<span className="text-[#5B8DB8]">VERSE</span>
          </h1>
        </div>

        {/* Welcome text */}
        <p className="text-2xl font-medium text-[#174F78] tracking-wide">
          WELCOME BACK
        </p>

        <p className="mt-4 text-gray-500 text-lg max-w-md">
          Learn, share and grow together with your college community.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center">

        {/* LOGIN CARD */}
        <div className="w-130 bg-white border border-[#174F78]/30 rounded-3xl px-10 py-12 shadow-sm">

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-[#174F78]">
            Sign in
          </h2>

          <p className="text-gray-500 mt-2">
            Enter your details to continue
          </p>

          <form onSubmit={handleSubmit(handleSubmit ? handle : handle)}>

            {/* Email */}
            <div className="mt-8">

              <label className="block text-sm font-medium text-[#174F78] mb-2">
                Email
              </label>

              <input
                {...register("email", {
                  required: "Enter a valid Email",
                })}
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-[#F3F5FC]
                  border border-[#D8DEEE]
                  outline-none
                  text-gray-700
                  placeholder-gray-400
                  focus:border-[#174F78]
                  focus:ring-2
                  focus:ring-[#174F78]/10
                  transition
                "
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}
            <div className="mt-6">

              <label className="block text-sm font-medium text-[#174F78] mb-2">
                Password
              </label>

              <input
                {...register("password", {
                  required: "Enter a password",
                })}
                type="password"
                placeholder="Enter your password"
                className="
                  w-full
                  h-12
                  px-4
                  rounded-xl
                  bg-[#F3F5FC]
                  border border-[#D8DEEE]
                  outline-none
                  text-gray-700
                  placeholder-gray-400
                  focus:border-[#174F78]
                  focus:ring-2
                  focus:ring-[#174F78]/10
                  transition
                "
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full
                h-12
                mt-8
                rounded-xl
                bg-[#174F78]
                text-white
                font-medium
                hover:bg-[#123F60]
                active:scale-[0.99]
                transition
              "
            >
              Login
            </button>

          </form>

          {/* Create Account */}
          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}

            <NavLink
              to="/register"
              className="text-[#174F78] font-semibold cursor-pointer hover:underline"
            >
              Create one
            </NavLink>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;