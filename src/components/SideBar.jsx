import { CircleEuro } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { MyStore } from "../context/Auth";
import API from "../api/api";

const SideBar = () => {
  const navigate = useNavigate();

  const { loggedInUser, setLoggedInUser } = useContext(MyStore);

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const name = loggedInUser?.name || "User";

  // Check feedback status
  useEffect(() => {
    const checkFeedbackStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await API.get("/feedback/status");

        setFeedbackSubmitted(response.data.submitted);
      } catch (error) {
        console.log(
          "Failed to check feedback status:",
          error.response?.data?.message || error.message
        );
      }
    };

    if (loggedInUser) {
      checkFeedbackStatus();
    }
  }, [loggedInUser]);

  return (
    <div className="flex flex-col justify-between border-r-[#727f934d] border-r-[.9px] py-4 px-2 h-full bg-[#F8F9FF]">

      {/* Profile Section */}
      <div className="flex flex-col gap-4 items-center transition-all duration:200 hover:bg-[#bfc6ee2f] px-3 py-2 rounded-2xl rounded-b border-b border-b-[#747b874d]">

        <div className="h-13 w-13 flex items-center">
          <img
            className="h-full w-full object-cover rounded-full"
            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            alt="Profile"
          />
        </div>

        <div className="flex flex-col gap-.5 items-center justify-center">

          <p className="text-[0.85rem] font-semibold font-mono text-[#354d71e0]">
            {name}
          </p>

          <h2 className="text-center text-[1.05rem] mb-1 text-[#354d71] font-mono">
            Future Engineer
          </h2>

          <p className="flex text-[.89rem] font-semibold items-center justify-center gap-1.5">
            <CircleEuro className="text-[#E6C221]" />
            {loggedInUser?.credits || 0}
          </p>

        </div>

        {/* Profile Button */}
        <button
          onClick={() => navigate("/main/profile")}
          className="w-full text-center bg-[#dde2fd] py-2 px-3 rounded-xl font-semibold font-mono hover:bg-[#d5d8eb]"
        >
          View Profile
        </button>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 w-full">

        {/* Feedback Button */}
        <NavLink
          to={feedbackSubmitted ? "#" : "/main/feedback"}
          onClick={(e) => {
            if (feedbackSubmitted) {
              e.preventDefault();
              alert("You have already submitted your feedback.");
            }
          }}
          className={`text-center py-2 px-3 rounded-xl font-semibold font-mono ${
            feedbackSubmitted
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#8D9FBE] text-[#fafafaf7] hover:bg-[#6e86b0]"
          }`}
        >
          {feedbackSubmitted
            ? "Feedback Submitted"
            : "Feedback Form"}
        </NavLink>

        {/* Post a Skill */}
        <NavLink
          to="/main/upload"
          className="text-center bg-[#8D9FBE] py-2 px-3 rounded-xl font-semibold font-mono text-[#fafafaf7] hover:bg-[#6e86b0]"
        >
          Post a Skill
        </NavLink>

        {/* Logout */}
        <p
          onClick={() => {
            setLoggedInUser(null);
            localStorage.removeItem("loggedUser");
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="text-center bg-[#dde2fd] py-2 px-3 rounded-xl font-semibold font-mono hover:bg-[#d5d8eb] cursor-pointer"
        >
          Log Out
        </p>

      </div>

    </div>
  );
};

export default SideBar;

