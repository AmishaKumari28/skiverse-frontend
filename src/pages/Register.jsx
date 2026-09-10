import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import API from "../api/api";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const handle = async (data) => {
    try {
      const response = await API.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert(response.data.message);

      reset();

      // Go back to Login
      navigate("/");

    } catch (error) {
      console.log("Registration error:", error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FF] flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center px-20">

        <h1 className="text-6xl font-bold tracking-tight text-[#174F78]">
          SKI<span className="text-[#5B8DB8]">VERSE</span>
        </h1>

        <p className="text-2xl font-medium text-[#174F78] tracking-wide mt-4">
          JOIN SKIVERSE
        </p>

        <p className="mt-4 text-lg text-gray-500 max-w-md">
          Share your skills, learn from others and grow together.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center">

        <div className="w-130 bg-white border border-[#174F78]/30 rounded-3xl px-10 py-10 shadow-sm">

          <h2 className="text-3xl font-semibold text-[#174F78]">
            Create account
          </h2>

          <p className="text-gray-500 mt-2">
            Enter your details to get started
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(handleSubmit ? handle : handle)}>

            {/* FULL NAME */}
            <div className="mt-7">

              <label className="block text-sm font-medium text-[#174F78] mb-2">
                Full Name
              </label>

              <input
                {...register("name", {
                  required: "Enter your name",
                })}
                type="text"
                placeholder="Enter your full name"
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

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}

            </div>

            {/* EMAIL */}
            <div className="mt-5">

              <label className="block text-sm font-medium text-[#174F78] mb-2">
                Email
              </label>

              <input
                {...register("email", {
                  required: "Enter an email",
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

            {/* PASSWORD */}
            <div className="mt-5">

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

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="
                w-full
                h-12
                mt-7
                rounded-xl
                bg-[#174F78]
                text-white
                font-medium
                hover:bg-[#123F60]
                active:scale-[0.99]
                transition
              "
            >
              Create Account
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-500 mt-5">
            Already have an account?{" "}

            <NavLink
              to="/"
              className="text-[#174F78] font-semibold cursor-pointer hover:underline"
            >
              Sign in
            </NavLink>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;