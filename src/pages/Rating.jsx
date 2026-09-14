import React, { useContext } from "react";
import { MyStore } from "../context/Auth";
import { useNavigate } from "react-router";

const Rating = () => {
  const {
    loggedInUser,
    browseSkills = [],
  } = useContext(MyStore);

  const navigate = useNavigate();

  // Show only the courses created by the logged-in user
  const myUploads = browseSkills.filter((item) => {
    return (
      String(item.creatorId) ===
      String(loggedInUser?._id)
    );
  });

  return (
    <div className="min-h-screen bg-[#F7F8FF] px-8 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Ratings
        </h1>

        <p className="mt-1 text-gray-500">
          See the ratings and feedback others have given.
        </p>
      </div>

      {myUploads.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {myUploads.map((item) => {
            return (
              <div
                key={item._id}
                className="flex h-70 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* Rating */}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "Recently"}
                  </span>

                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-600">
  ⭐ {item.rating || 0} / 5
</span>
                </div>

                {/* Content */}
                <div className="mt-4 flex-1">
                  <h2 className="line-clamp-1 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h2>

                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                  {/* Time */}
                  <p className="mt-3 text-sm font-medium text-gray-500">
                    ⏱ {item.duration}
                  </p>

                  {/* Credits */}
                  <p className="mt-3 text-sm text-gray-500 font-medium">
                    💰 {item.credits} Credits
                  </p>
                </div>

                {/* Button */}
                <div className="border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/main/video/${item._id}`)
                    }
                    className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    See Session →
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center p-3">
          <h1 className="text-center font-semibold text-[3rem] text-[#cec7c7a0]">
            There is no content to see
          </h1>
        </div>
      )}
    </div>
  );
};

export default Rating;