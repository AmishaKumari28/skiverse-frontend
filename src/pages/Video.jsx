import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../api/api";

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --------------------------------
  // Fetch Course
  // --------------------------------

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await API.get(`/courses/${id}`);

        setCourse(response.data.course);
      } catch (error) {
        console.log(
          "Failed to fetch course:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FF] flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading course...
        </p>
      </div>
    );
  }

  // --------------------------------
  // Course Not Found
  // --------------------------------

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F7F8FF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Course not found
          </h1>

          <button
            onClick={() => navigate("/main/browse")}
            className="mt-5 px-5 py-2 rounded-xl bg-[#174F78] text-white hover:bg-[#123F60]"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Submit Rating
  // --------------------------------

  const handleRating = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await API.post("/ratings", {
        courseId: course._id,
        rating: Number(rating),
        review,
      });

      alert(response.data.message);

      setSubmitted(true);
      setReview("");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to submit rating"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FF] px-8 py-8">

      {/* Back Button */}

      <button
        onClick={() => navigate("/main/browse")}
        className="text-[#174F78] font-medium hover:underline"
      >
        ← Back to Browse
      </button>

      {/* Course Title */}

      <div className="mt-6">

        <h1 className="text-3xl font-bold text-gray-900">
          {course.title}
        </h1>

        <p className="mt-2 text-gray-500">
          By{" "}
          <span className="font-medium text-[#174F78]">
            {course.creator}
          </span>
        </p>

      </div>

      {/* Video */}

      <div className="mt-8 w-full h-100 rounded-2xl bg-gray-900 flex items-center justify-center">

        {course.videoUrl ? (
          <video
            src={course.videoUrl}
            controls
            className="w-full h-full rounded-2xl"
          />
        ) : (
          <div className="text-center text-white">

            <div className="text-5xl mb-4">
              ▶
            </div>

            <h2 className="text-xl font-semibold">
              Video coming soon
            </h2>

            <p className="mt-2 text-gray-400">
              The course video will be available here.
            </p>

          </div>
        )}

      </div>

      {/* About Session */}

      <div className="mt-8 bg-white rounded-2xl border border-[#D8DEEE] p-6">

        <h2 className="text-xl font-semibold text-[#174F78]">
          About this session
        </h2>

        <p className="mt-3 text-gray-600 leading-7">
          {course.description}
        </p>

        <div className="mt-5 flex items-center gap-8 text-sm text-gray-500">

          <span>
            ⏱ {course.duration}
          </span>

          <span>
            💰 {course.credits} credits
          </span>

          <span>
            ⭐ {course.rating || 0}
          </span>

        </div>

      </div>

      {/* Rating */}

      <div className="mt-8 bg-white rounded-2xl border border-[#D8DEEE] p-6">

        <h2 className="text-xl font-semibold text-[#174F78]">
          Rate this session
        </h2>

        <p className="mt-1 text-gray-500">
          Share your experience with other students.
        </p>

        {submitted ? (

          <div className="mt-5 rounded-xl bg-green-50 p-4 text-green-700">
            ⭐ Your rating has been submitted successfully!
          </div>

        ) : (

          <form onSubmit={handleRating}>

            {/* Rating Select */}

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="h-11 px-4 rounded-xl bg-[#F3F5FC] border border-[#D8DEEE] outline-none text-gray-700"
              >

                <option value="5">
                  ⭐⭐⭐⭐⭐ 5
                </option>

                <option value="4">
                  ⭐⭐⭐⭐ 4
                </option>

                <option value="3">
                  ⭐⭐⭐ 3
                </option>

                <option value="2">
                  ⭐⭐ 2
                </option>

                <option value="1">
                  ⭐ 1
                </option>

              </select>

            </div>

            {/* Review */}

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Review
              </label>

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-[#F3F5FC] border border-[#D8DEEE] outline-none text-gray-700 placeholder-gray-400 focus:border-[#174F78] resize-none"
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 px-6 py-3 rounded-xl bg-[#174F78] text-white font-medium hover:bg-[#123F60] disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit Rating"}
            </button>

          </form>

        )}

      </div>

    </div>
  );
};

export default Video;