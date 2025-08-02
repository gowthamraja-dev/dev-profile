import React, { useEffect, useRef } from "react";

const DropDown = ({ children, buttonRef, setEnable = () => {}, ...props }) => {
  const dropDownRef = useRef(null);
  useEffect(() => {
    // USED TO CLOSE DROP DOWN WHEN CLICK OUTSIDE
    const handleClickOutside = (event) => {
      if (
        !dropDownRef?.current?.contains(event.target) &&
        !buttonRef?.current?.contains(event.target)
      ) {
        setEnable(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [dropDownRef, buttonRef, setEnable]);
  return (
    <div ref={dropDownRef} {...props}>
      {children}
    </div>
  );
};

export default DropDown;
