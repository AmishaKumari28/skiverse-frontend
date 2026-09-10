import React, { useContext } from "react";
import { MyStore } from "../context/Auth";
import { useNavigate } from "react-router";

const SkillCard = ({ element }) => {

  const { buy, loggedInUser } = useContext(MyStore);
  const navigate = useNavigate();

  const courseId = element._id || element.id;

  const isUnlocked =
    loggedInUser?.unlockedCourses?.includes(courseId);

  const clickSkill = () => {

    if (!loggedInUser) {
      alert("Please login first");
      return;
    }

    // If already unlocked, open the course
    if (isUnlocked) {
      navigate(`/main/video/${courseId}`);
      return;
    }

    // If locked, ask before buying
    const confirmBuy = confirm("Do u wanna buy this");

    if (confirmBuy) {
      buy(element);
    }
  };

  return (
    <div
      onClick={clickSkill}
      className="
        h-67.5
        bg-white
        rounded-2xl
        border border-[#D8DEEE]
        p-6
        flex flex-col
        cursor-pointer
        hover:-translate-y-1
        hover:shadow-md
        hover:border-[#174F78]/40
        transition-all
      "
    >

      {/* RATING */}
      <div className="flex items-center gap-1">
        <span className="text-yellow-500 text-lg">
          ★
        </span>

        <span className="font-medium text-gray-700">
          {element.rating || 0}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-[#174F78] mt-4">
        {element.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
        {element.description}
      </p>

      {/* CREATOR */}
      <p className="text-sm text-gray-500 mt-3">
        By{" "}
        <span className="text-[#174F78] font-medium">
          {element.creator}
        </span>{" "}
        · {element.role}
      </p>

      {/* BOTTOM */}
      <div className="mt-auto">

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>
            ⏱ {element.duration}
          </span>

          <span>
            {element.credits} credits
          </span>
        </div>

        <div className="flex justify-end">

          {isUnlocked ? (
            <span
              className="
                px-3 py-1
                rounded-full
                text-xs font-medium
                bg-green-100
                text-green-700
              "
            >
              Unlocked
            </span>
          ) : (
            <span
              className="
                px-3 py-1
                rounded-full
                text-xs font-medium
                bg-red-100
                text-red-700
              "
            >
              Locked
            </span>
          )}

        </div>

      </div>
    </div>
  );
};

export default SkillCard;