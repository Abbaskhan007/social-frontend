import React from "react";
import MainSection from "../Components/MainSection";
import ProfileWidget from "../Components/ProfileWidget";
import RightSection from "../Components/RightSection";

export default function HomePage() {
  return (
    <div className="grid grid-cols-7 gap-8 pt-12 sm:px-20 px-8 relative pb-12">
      <div className="md:col-span-2 col-span-7">
        {" "}
        <ProfileWidget />
      </div>

      <div className="md:col-span-3 col-span-7">
        <MainSection />
      </div>
      <div className="md:col-span-2  col-span-7">
        <RightSection />
      </div>
    </div>
  );
}
