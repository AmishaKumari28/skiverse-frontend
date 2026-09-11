import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../api/api";

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rating states
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Video watch states
  const [watchedPercent, setWatchedPercent] = useState(0);
  const [maxWatchedTime, setMaxWatchedTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

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
  // Check Existing Rating
  // --------------------------------

  useEffect(() => {
    const checkRating = async () => {
      if (!id) return;

      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await API.get(`/ratings/${id}`);

        const ratings = response.data.ratings || [];

        const loggedUser = JSON.parse(
          localStorage.getItem("loggedUser")
        );

        if (!loggedUser) return;

        const alreadyRated = ratings.some(
          (item) =>
            String(item.userId) === String(loggedUser._id)
        );

        if (alreadyRated) {
          setSubmitted(true);
        }
      } catch (error) {
        console.log(
          "Failed to check rating:",
          error.response?.data?.message || error.message
        );
      }
    };

    checkRating();
  }, [id]);

  // --------------------------------
  // Video Loaded
  // --------------------------------

  const handleVideoLoaded = (e) => {
    const duration = e.target.duration;

    if (duration && Number.isFinite(duration)) {
      setVideoDuration(duration);
    }
  };

  // --------------------------------
  // Video Progress
  // --------------------------------

  const handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;

    if (!videoDuration) return;

    const percent = (currentTime / videoDuration) * 100;

    setWatchedPercent(Math.min(percent, 100));

    if (currentTime > maxWatchedTime) {
      setMaxWatchedTime(currentTime);
    }
  };

  // --------------------------------
  // Prevent Skipping Too Far
  // --------------------------------

  const handleSeeking = (e) => {
    const video = e.target;

    // Allow a small 2-second forward movement
    if (video.currentTime > maxWatchedTime + 2) {
      video.currentTime = maxWatchedTime;
    }
  };

  // --------------------------------
  // Submit Rating
  // --------------------------------

  const handleRating = async (e) => {
    e.preventDefault();

    if (watchedPercent < 70) {
      alert(
        "You need to watch at least 70% of the session before rating it."
      );
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please select a rating.");
      return;
    }

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

      <div className="mt-8 w-full h-100 rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden">

        {course.videoUrl ? (
          <video
            src={course.videoUrl}
            controls
            controlsList="nodownload"
            onLoadedMetadata={handleVideoLoaded}
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
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

      {/* Watch Progress */}

      {course.videoUrl && videoDuration > 0 && (
        <div className="mt-4 bg-white rounded-xl border border-[#D8DEEE] p-4">

          <div className="flex justify-between items-center mb-2">

            <span className="text-sm font-medium text-gray-600">
              Session progress
            </span>

            <span className="text-sm font-semibold text-[#174F78]">
              {Math.round(watchedPercent)}%
            </span>

          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#174F78] transition-all duration-300"
              style={{
                width: `${Math.min(watchedPercent, 100)}%`,
              }}
            />
          </div>

          {watchedPercent < 70 ? (
            <p className="mt-2 text-sm text-gray-500">
              Watch at least 70% of this session to unlock
              rating.
            </p>
          ) : (
            <p className="mt-2 text-sm text-green-600 font-medium">
              ✓ Rating unlocked!
            </p>
          )}

        </div>
      )}

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
            ⭐ Your rating has already been submitted.
          </div>

        ) : watchedPercent < 70 ? (

          <div className="mt-5 rounded-xl bg-[#F3F5FC] border border-[#D8DEEE] p-5">

            <p className="text-gray-600">
              🔒 Rating is locked.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Please watch at least 70% of the session to
              unlock the rating form.
            </p>

            <div className="mt-3 text-sm font-medium text-[#174F78]">
              Current progress: {Math.round(watchedPercent)}%
            </div>

          </div>

        ) : (

          <form onSubmit={handleRating}>

            {/* Star Rating */}

            <div className="mt-5">

              <label className="block text-sm font-medium text-gray-600 mb-2">
                Your Rating
              </label>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}

              </div>

              <p className="mt-1 text-sm text-gray-500">
                {rating > 0
                  ? `${rating} out of 5`
                  : "Select your rating"}
              </p>

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