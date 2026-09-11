import { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const MyStore = createContext();

export const ContextProvider = ({ children }) => {

  // -----------------------------
  // LOGGED-IN USER
  // -----------------------------
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser")) || null
  );

  // -----------------------------
  // OTHER STATES
  // -----------------------------
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const [creation, setCreation] = useState([]);

  const [browseSkills, setBrowseSkills] = useState([]);

  const [historyData, setHistoryData] = useState([]);


  // -----------------------------
  // GET LOGGED-IN USER
  // -----------------------------
  useEffect(() => {

    const fetchUser = async () => {

      const token = localStorage.getItem("token");

      if (!token) return;

      try {

        const response = await API.get("/users/me");

        const user = response.data.user;

        setLoggedInUser(user);

        localStorage.setItem(
          "loggedUser",
          JSON.stringify(user)
        );

      } catch (error) {

        console.log(
          "Failed to fetch user:",
          error.response?.data?.message ||
          error.message
        );

        localStorage.removeItem("token");
        localStorage.removeItem("loggedUser");

        setLoggedInUser(null);
      }
    };

    fetchUser();

  }, []);


  // -----------------------------
  // GET COURSES FROM BACKEND
  // -----------------------------
  const fetchCourses = async () => {

    try {

      const response = await API.get("/courses");

      setBrowseSkills(
        response.data.courses || []
      );

    } catch (error) {

      console.log(
        "Failed to fetch courses:",
        error.response?.data?.message ||
        error.message
      );

      setBrowseSkills([]);
    }
  };


  useEffect(() => {

    fetchCourses();

  }, []);


  // -----------------------------
  // GET HISTORY
  // -----------------------------
  const fetchHistory = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setHistoryData([]);
      return;
    }

    try {

      const response = await API.get(
        "/users/history"
      );

      setHistoryData(
        response.data.history || []
      );

    } catch (error) {

      console.log(
        "Failed to fetch history:",
        error.response?.data?.message ||
        error.message
      );

      setHistoryData([]);
    }
  };


  useEffect(() => {

    if (loggedInUser) {
      fetchHistory();
    }

  }, [loggedInUser]);


  // -----------------------------
  // BUY COURSE
  // -----------------------------
  const buy = async (element) => {

    if (!loggedInUser) {

      alert("Please login first");

      return;
    }

    try {

      const courseId =
        element._id || element.id;

      const response = await API.post(
        `/courses/${courseId}/buy`
      );

      alert(response.data.message);


      // Get updated user
      const userResponse =
        await API.get("/users/me");

      const updatedUser =
        userResponse.data.user;

      setLoggedInUser(updatedUser);

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(updatedUser)
      );


      // Refresh history
      await fetchHistory();


      // Refresh courses
      await fetchCourses();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Course purchase failed"
      );
    }
  };


  // -----------------------------
  // ALL SKILLS
  // -----------------------------
  const allSkills = [
    ...browseSkills,
    ...creation
  ];


  // -----------------------------
  // DON'T SHOW OWN COURSES
  // -----------------------------
  const visibleSkills = allSkills.filter(
    (course) => {

      if (!loggedInUser) {
        return true;
      }

      return (
        String(course.creatorId) !==
        String(loggedInUser._id)
      );
    }
  );


  // -----------------------------
  // ADD REVIEW
  // -----------------------------
  const addReview = async (
    videoid,
    rating,
    comment
  ) => {

    try {

      await API.post("/ratings", {

        courseId: videoid,

        rating: Number(rating),

        review: comment

      });


      // Refresh courses so
      // updated rating appears
      await fetchCourses();

    } catch (error) {

      console.log(
        "Failed to add review:",
        error.response?.data?.message ||
        error.message
      );
    }
  };


  // -----------------------------
  // PROVIDER
  // -----------------------------
  return (

    <MyStore.Provider
      value={{

        loggedInUser,
        setLoggedInUser,

        registeredUsers,
        setRegisteredUsers,

        creation,
        setCreation,

        browseSkills,
        setBrowseSkills,

        buy,

        historyData,
        setHistoryData,

        visibleSkills,

        fetchCourses,

        fetchHistory,

        addReview

      }}
    >

      {children}

    </MyStore.Provider>
  );
};