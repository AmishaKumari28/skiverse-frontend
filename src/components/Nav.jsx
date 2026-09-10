import React, { useContext } from "react";
import { CircleEuro, Compass, NotebookPen, RotateCcwClock } from 'lucide-react';

import logImg from "../assets/image-removebg-preview.png";
import { NavLink } from "react-router";
import { MyStore } from "../context/Auth";

const Nav = () => {

    const {loggedInUser}=useContext(MyStore)
    

  return (
      <div className="flex items-center justify-between p-2 bg-[#F8F9FF] border-b-[#727f934d] border-b-[.9px]">
          
      <div className="flex gap-2 items-center ">
        <div className="h-10 w-10 flex items-center">
          <img className="h-100% w-100% object-cover" src={logImg} alt="" />
              </div>
              <h1 className="font-semibold text-xl font-mono text-[#215579]">Skiverse</h1>
          </div>

          <div className="flex items-center gap-8">
              <NavLink to='browse' className="flex gap-1 items-center text-[1rem] font-semibold text-[#215579] cursor-pointer transition-all duration:200 hover:scale-105 hover:bg-[#254c670f] p-3 rounded-lg"><Compass className="text-[0.9rem] text-[#215579]"/> Browse </NavLink>
              <NavLink to='history' className="flex gap-1 items-center text-[1rem] font-semibold text-[#215579] cursor-pointer transition-all duration:200 hover:scale-105 hover:bg-[#254c670f] p-3 rounded-lg"><RotateCcwClock className="text-[0.9rem] text-[#215579]"/> History</NavLink>
              <NavLink to='rating' className="flex gap-1 items-center text-[1rem] font-semibold text-[#215579] cursor-pointer transition-all duration:200 hover:scale-105 hover:bg-[#254c670f] p-3 rounded-lg"><NotebookPen className="text-[0.9rem] text-[#215579]"/> Rating/Review</NavLink>
          </div>
          
          <div className="flex items-center gap-4">
              <p className="bg-[#DCE9FF] py-1.5 px-2.5 rounded-lg flex gap-1 text-[.89rem] font-semibold items-center"><CircleEuro className="text-[#E6C221]" /> {loggedInUser.credits}</p>
              <div className="h-10 w-10 ">
                  <img className="h-full w-full object-cover rounded-full" src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="" />
              </div>
          </div>
    </div>
  );
};

export default Nav;
