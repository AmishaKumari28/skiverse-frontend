import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MyStore } from "../context/Auth";
import { useNavigate } from "react-router";
import API from "../api/api";

const FeedBack = () => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const { loggedInUser } = useContext(MyStore);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const handle = async (data) => {
    if (userRating === 0) {
      alert("Rate the Platform");
      return;
    }

    try {
      const response = await API.post("/feedback", {
        name: loggedInUser?.name || "",
        email: loggedInUser?.email || "",
        experience: data.experience,
        improvement: data.improvement,
        feature: data.feature,
        rating: userRating,
      });

      alert(response.data.message);

      reset();
      setUserRating(0);
      setHoverRating(0);

      navigate("/main/browse");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to submit feedback."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FF] px-6 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-[#5B8DB8]">
            Skiverse Feedback
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Help us improve Skiverse
          </h1>

          <p className="mt-2 max-w-2xl leading-6 text-gray-500">
            Your feedback helps us understand your experience and improve
            peer learning for students.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handle)}
          className="rounded-2xl border border-[#D8DEEE] bg-white p-7 shadow-sm"
        >

          {/* Overall Rating */}
          <div className="mb-7">
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              How would you rate your overall experience?
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-3xl transition-transform active:scale-95 focus:outline-none"
                >
                  <span
                    className={
                      star <= (hoverRating || userRating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label
              htmlFor="experience"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              How was your experience using Skiverse?
            </label>

            <textarea
              id="experience"
              rows="4"
              placeholder="Tell us what you liked about Skiverse..."
              {...register("experience", {
                required: "Required to Fill",
              })}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5B8DB8] focus:ring-2 focus:ring-[#5B8DB8]/20"
            />

            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Improvement */}
          <div className="mb-6">
            <label
              htmlFor="improvement"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              What could we improve?
            </label>

            <textarea
              id="improvement"
              rows="4"
              placeholder="Tell us what we can make better..."
              {...register("improvement", {
                required: "Required to Fill",
              })}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5B8DB8] focus:ring-2 focus:ring-[#5B8DB8]/20"
            />

            {errors.improvement && (
              <p className="text-red-500 text-sm mt-1">
                {errors.improvement.message}
              </p>
            )}
          </div>

          {/* Feature Feedback */}
          <div className="mb-7">
            <label
              htmlFor="feature"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              What feature would you like to see next?
            </label>

            <input
              id="feature"
              type="text"
              placeholder="e.g. live peer sessions, better recommendations..."
              {...register("feature", {
                required: "Required to Fill",
              })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5B8DB8] focus:ring-2 focus:ring-[#5B8DB8]/20"
            />

            {errors.feature && (
              <p className="text-red-500 text-sm mt-1">
                {errors.feature.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end border-t border-gray-100 pt-6">
            <button
              type="submit"
              className="rounded-xl bg-[#174F78] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#123F61]"
            >
              Submit Feedback
            </button>
          </div>

        </form>

        <p className="mt-5 text-center text-xs text-gray-400">
          Your feedback helps make Skiverse better for every student.
        </p>

      </div>
    </div>
  );
};

export default FeedBack;

