import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MyStore } from "../context/Auth";
import { useNavigate } from "react-router";
import API from "../api/api";

const Upload = () => {
  const { loggedInUser, fetchCourses } = useContext(MyStore);

  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handle = async (data) => {
    if (!videoFile) {
      alert("Please select a video");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);

      // Backend currently uses "role"
      formData.append(
        "role",
        loggedInUser?.role || "Student"
      );

      formData.append("duration", data.duration);
      formData.append("credits", data.credits);

      // Creator name
      formData.append(
        "creator",
        loggedInUser?.name || "Unknown Creator"
      );

      // Video file
      formData.append("video", videoFile);

      const response = await API.post(
        "/courses",
        formData
      );

      alert(
        response.data.message ||
          "Course uploaded successfully"
      );

      // Refresh courses from backend
      if (fetchCourses) {
        await fetchCourses();
      }

      // Go to rating page
      navigate("/main/rating");

    } catch (error) {
      console.log(
        "Upload error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Course upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FF] px-8 py-10">

      {/* Header */}
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Share Your Knowledge
        </h1>

        <p className="mt-2 text-gray-500">
          Upload a session and help someone learn a new skill.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handle)}
        className="mx-auto mt-8 max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >

        {/* Title */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Session Title
          </label>

          <input
            {...register("title", {
              required: "Enter a Valid title",
              setValueAs: (v) => v.trim(),
            })}
            type="text"
            placeholder="e.g. React Fundamentals"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
            {...register("description", {
              required: "Enter a Valid description",
              setValueAs: (v) => v.trim(),
            })}
            rows="4"
            placeholder="Tell learners what they will learn..."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          ></textarea>

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category + Difficulty */}
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              defaultValue="default"
              {...register("category", {
                required: "Choose category",
              })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-indigo-500"
            >
              <option value="default" disabled>
                Select category
              </option>

              <option>Web Development</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Data Science</option>
              <option>Communication</option>
              <option>Other</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Difficulty
            </label>

            <select
              defaultValue="default"
              {...register("difficulty", {
                required: "Choose difficulty",
              })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-indigo-500"
            >
              <option value="default" disabled>
                Select difficulty
              </option>

              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {errors.difficulty && (
              <p className="mt-1 text-sm text-red-500">
                {errors.difficulty.message}
              </p>
            )}
          </div>

        </div>

        {/* Duration + Credits */}
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Duration */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Duration
            </label>

            <select
              defaultValue="default"
              {...register("duration", {
                required: "Choose Duration",
              })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-indigo-500"
            >
              <option value="default" disabled>
                Select duration
              </option>

              <option>Under 30 minutes</option>
              <option>30–60 minutes</option>
              <option>1–2 hours</option>
              <option>2+ hours</option>
            </select>

            {errors.duration && (
              <p className="mt-1 text-sm text-red-500">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* Credits */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Credits
            </label>

            <select
              defaultValue="default"
              {...register("credits", {
                required: "Choose Credits",
              })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-indigo-500"
            >
              <option value="default" disabled>
                Select credits
              </option>

              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>

            {errors.credits && (
              <p className="mt-1 text-sm text-red-500">
                {errors.credits.message}
              </p>
            )}
          </div>

        </div>

        {/* Upload */}
        <div className="mb-8">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Upload Session
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 px-6 py-10 text-center transition hover:bg-indigo-50">

            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl">
              ↑
            </div>

            <p className="font-medium text-gray-700">
              Upload your session
            </p>

            <p className="mt-1 text-sm text-gray-400">
              MP4 supported files
            </p>

            {videoFile && (
              <p className="mt-3 text-sm font-medium text-indigo-600">
                Selected: {videoFile.name}
              </p>
            )}

            <input
              type="file"
              accept="video/mp4,video/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setVideoFile(file);
                }
              }}
            />

          </label>

        </div>

        {/* Submit */}
        <div className="flex justify-end">

          <button
            type="submit"
            disabled={uploading}
            className={`rounded-xl px-8 py-3 font-medium text-white transition ${
              uploading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {uploading
              ? "Uploading..."
              : "Upload Session →"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default Upload;