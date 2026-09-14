import React, { useContext } from "react";
import { MyStore } from "../context/Auth";
import { useNavigate } from "react-router";

const Profile = () => {
  const {
    loggedInUser,
    browseSkills = [],
  } = useContext(MyStore);

  const navigate = useNavigate();

  const history = loggedInUser?.history || [];

  // Get only the courses created by the logged-in user
  const mySkills = browseSkills.filter(
    (course) =>
      String(course.creatorId) ===
      String(loggedInUser?._id)
  );

  // Calculate average rating of user's uploaded skills
  const totalRating = mySkills.reduce((acc, course) => {
    return acc + (Number(course.rating) || 0);
  }, 0);

  
  
  const average =
    mySkills.length > 0
      ? (totalRating / mySkills.length).toFixed(1)
      : "0.0";log

  return (
    <div className="min-h-screen bg-[#F7F8FF] px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Profile
        </h1>

        <p className="mt-1 text-gray-500">
          Your Skiverse identity
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-[#D8DEEE] bg-white p-7 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-5">

            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#174F78] text-2xl font-bold text-white">
              {loggedInUser?.name
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            <div>

              <h2 className="text-2xl font-semibold text-[#174F78]">
                {loggedInUser?.name}
              </h2>

              <p className="mt-1 text-gray-500">
                {loggedInUser?.role || "Future Engineer"}
              </p>

              <p className="mt-1 text-sm text-gray-400">
                {loggedInUser?.email}
              </p>

            </div>
          </div>

          <button
            className="rounded-xl border border-[#174F78] px-5 py-2.5 text-sm font-medium text-[#174F78] transition hover:bg-[#174F78] hover:text-white"
          >
            Edit Profile
          </button>

        </div>

        {/* Stats */}
        <div className="mt-7 grid grid-cols-3 border-t border-gray-100 pt-6">

          <div className="text-center">

            <p className="text-2xl font-bold text-[#174F78]">
              {loggedInUser?.credits || 0}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Credits
            </p>

          </div>

          <div className="border-x border-gray-100 text-center">

            <p className="text-2xl font-bold text-[#174F78]">
              {history.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Learned
            </p>

          </div>

          <div className="text-center">

            <p className="text-2xl font-bold text-[#174F78]">
              {average}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Rating
            </p>

          </div>

        </div>
      </div>

      {/* Wallet + Activity */}
      <div className="mt-6 grid grid-cols-2 gap-6">

        {/* Wallet */}
        <div className="rounded-2xl border border-[#D8DEEE] bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-[#174F78]">
            Credit Wallet
          </h2>

          <p className="mt-5 text-4xl font-bold text-gray-900">
            {loggedInUser?.credits || 0}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Available Credits
          </p>

          <div className="mt-5 rounded-xl bg-[#F7F8FF] p-4">

            <p className="text-sm text-gray-500">
              Use your credits to unlock peer learning sessions.
            </p>

          </div>

        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-[#D8DEEE] bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-[#174F78]">
            Your Activity
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Skills Purchased
              </span>

              <span className="font-semibold text-gray-800">
                {history.length}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Skills Created
              </span>

              <span className="font-semibold text-gray-800">
                {mySkills.length}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Sessions Completed
              </span>

              <span className="font-semibold text-gray-800">
                {
                  history.filter(
                    (item) =>
                      item.status === "Completed"
                  ).length
                }
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* My Skills */}
      <div className="mt-6 rounded-2xl border border-[#D8DEEE] bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-[#174F78]">
              My Skills
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Skills you've shared with the community
            </p>

          </div>

          <button
            onClick={() => {
              navigate("/main/upload");
            }}
            className="rounded-xl bg-[#174F78] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#123E5E]"
          >
            Post a Skill →
          </button>

        </div>

        {mySkills.length > 0 ? (

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {mySkills.map((skill, index) => (

              <div
                key={skill._id || index}
                className="flex flex-col justify-between rounded-xl border border-[#D8DEEE] bg-white p-5 transition hover:shadow-md"
              >

                <div>

                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {skill.title || "Untitled Skill"}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    <span className="font-medium text-gray-700">
                      {skill.description}
                    </span>
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">

                    <span>
                      💰 {skill.credits || 0} credits
                    </span>

                    <span>
                      ⭐ {skill.rating || 0}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-xl border border-dashed border-[#D8DEEE] p-8 text-center">

            <p className="text-gray-400">
              You haven't uploaded any skills yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Profile;