import React from "react";
import ProfileDataWidget from "../Components/ProfileDataWidget";
import ProfilePosts from "../Components/ProfilePosts";

export default function ProfilePage() {
  return (
    <div className="flex flex-col space-y-5 max-w-[350px] sm:max-w-[450px] mx-auto mt-12 pb-6">
      <ProfileDataWidget />

      <ProfilePosts />
    </div>
  );
}
