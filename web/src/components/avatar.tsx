import React from "react";
import { Avatar as BaseAvatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Avatar = ({ name }: { name: string }) => (
  <div className="w-9 h-9 bg-gray-100 flex justify-center items-center rounded-full">
    {name}
  </div>
);

export default Avatar;
