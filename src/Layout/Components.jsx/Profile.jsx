import React, { useRef, useState } from "react";
import { UserIcon } from "../../assets/SVG/svg";
import DropDown from "../../common/components/DropDown";

const Profile = () => {
  const buttonRef = useRef(null);
  const [enable, setEnable] = useState(false);
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="flex items-center gap-2 bg-yellow-100 p-1 rounded-full"
        onClick={() => setEnable(!enable)}
      >
        <UserIcon className="fill-black" />
      </button>
      <DropDown buttonRef={buttonRef} setEnable={setEnable}>
        {enable && (
          <div className="absolute right-0 w-max  p-4 rounded-2xl shadow-xl bg-blue-50">
            <p className="text-darkblue">Profile Options</p>
            <ul className="mt-2">
              <li className="p-1 hover:bg-gray-200 cursor-pointer">
                View Profile{" "}
              </li>
              <li className="p-1 hover:bg-gray-200 cursor-pointer">Settings</li>
              <li className="p-1 hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </DropDown>
    </div>
  );
};

export default Profile;
