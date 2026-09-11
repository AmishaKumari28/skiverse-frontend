import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/Auth";

const History = () => {
  const { historyData = [] } = useContext(MyStore);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FF] px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Learning History
        </h1>

        <p className="mt-1 text-gray-500">
          Keep track of the skills you've explored.
        </p>
      </div>

      {/* Empty History */}
      {historyData.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-[#D8DEEE] bg-white p-10 text-center">

          <p className="text-gray-400 text-lg">
            You haven't learned any skills yet.
          </p>

          <button
            onClick={() => navigate("/main/browse")}
            className="mt-5 rounded-xl bg-[#174F78] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#123F60]"
          >
            Browse Skills
          </button>

        </div>

      ) : (

        /* History Grid */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {historyData.map((item, index) => (

            <div
              key={item._id || item.courseId || index}
              className="flex h-75 cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              {/* Rating */}
              <div className="flex justify-end">

                <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-600">
                  ⭐ {item.rating || 0}
                </span>

              </div>

              {/* Content */}
              <div className="mt-3 flex-1">

                <h2 className="line-clamp-1 text-xl font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  By {item.creator}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>

              </div>

              {/* Bottom */}
              <div className="border-t border-gray-100 pt-4">

                <div className="flex items-center justify-between text-sm text-gray-500">

                  <span>
                    ⏱ {item.duration}
                  </span>

                  <span>
                     {item.date
                       ? new Date(item.date).toLocaleDateString("en-GB", {
                             day: "numeric",
                             month: "long",
                             year: "numeric",
                         })
                       : item.createdAt
                         ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                             day: "numeric",
                             month: "long",
                             year: "numeric",
                        })
                    : ""}
                  </span>

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {item.status || "Unlocked"}
                  </span>

                  <button
                    onClick={() => {
                      const courseId =
                        item.courseId || item._id;

                      if (courseId) {
                        navigate(`/main/video/${courseId}`);
                      }
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Continue →
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default History;