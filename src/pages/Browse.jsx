import React, { useContext, useState } from "react";
import SkillCard from "../components/SkillCard";
import { MyStore } from "../context/Auth";

const Browse = () => {
  const { visibleSkills = [] } = useContext(MyStore);

  const [search, setSearch] = useState("");

  const [time, setTime] = useState("Time");
  const [cost, setCost] = useState("Cost");
  const [rating, setRating] = useState("Rating");

  const filteredData = visibleSkills.filter((val) => {

    // Search
    const title = val.title || "";
    const description = val.description || "";
    const creator = val.creator || "";

    const searchText = search.toLowerCase().trim();

    const matchedSearch =
      title.toLowerCase().includes(searchText) ||
      description.toLowerCase().includes(searchText) ||
      creator.toLowerCase().includes(searchText);

    // Time filter
    const duration = val.duration || "";

    const minutes = parseInt(duration) || 0;

    const matchedTime =
      time === "Time" ||
      (time === "Short" && minutes < 30) ||
      (time === "Medium" && minutes >= 30 && minutes <= 45) ||
      (time === "Long" && minutes > 45);

    // Cost filter
    const credits = Number(val.credits) || 0;

    const matchedCost =
      cost === "Cost" ||
      (cost === "Low" && credits <= 5) ||
      (cost === "Medium" && credits > 5 && credits <= 10) ||
      (cost === "High" && credits > 10);

    // Rating filter
    const courseRating = Number(val.rating) || 0;

    const matchedRating =
      rating === "Rating" ||
      (rating === "4+ stars" && courseRating >= 4) ||
      (rating === "3+ stars" && courseRating >= 3);

    return (
      matchedSearch &&
      matchedCost &&
      matchedRating &&
      matchedTime
    );
  });

  return (
    <div className="min-h-screen bg-[#F7F8FF] px-10 py-8">

      {/* SEARCH */}
      <div className="flex items-center gap-4">

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="Search for skills, courses or topics..."
          className="
            flex-1
            h-12
            px-5
            rounded-xl
            bg-white
            border border-[#D8DEEE]
            outline-none
            text-gray-700
            placeholder-gray-400
            focus:border-[#174F78]
          "
        />

        <button
          className="
            h-12
            px-7
            rounded-xl
            bg-[#174F78]
            text-white
            font-medium
            hover:bg-[#123F60]
            transition
          "
        >
          I want to learn
        </button>

      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-4 mt-6">

        <p className="text-[#174F78] font-medium">
          Filter by:
        </p>

        {/* Time */}
        <select
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          className="h-10 px-4 rounded-lg bg-white border border-[#D8DEEE] text-gray-600 outline-none"
        >
          <option>Time</option>
          <option>Short</option>
          <option>Medium</option>
          <option>Long</option>
        </select>

        {/* Cost */}
        <select
          value={cost}
          onChange={(e) => {
            setCost(e.target.value);
          }}
          className="h-10 px-4 rounded-lg bg-white border border-[#D8DEEE] text-gray-600 outline-none"
        >
          <option>Cost</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* Rating */}
        <select
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
          className="h-10 px-4 rounded-lg bg-white border border-[#D8DEEE] text-gray-600 outline-none"
        >
          <option>Rating</option>
          <option>4+ stars</option>
          <option>3+ stars</option>
        </select>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6 mt-8">

        {filteredData.map((item) => {
          return (
            <SkillCard
              key={item._id || item.id}
              element={item}
            />
          );
        })}

      </div>

      {/* NO RESULTS */}
      {filteredData.length === 0 && (
        <div className="mt-12 text-center">

          <p className="text-gray-400 text-lg">
            No skills found.
          </p>

        </div>
      )}

    </div>
  );
};

export default Browse;