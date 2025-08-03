import React from "react";
import PropTypes from "prop-types";
import BaseHeader from "./BaseHeader";

const BaseLayout = ({ children }) => {
  return (
    <div className="bg-baseBackground flex flex-col text-surface relative">
      <BaseHeader />
      <div className="h-full px-4 sm:px-6 md:px-8">
        <div className="grid grid-rows-[auto_auto_auto] md:grid-cols-[1fr_3fr_1fr] md:grid-rows-1 gap-4 mt-4 min-h-[85vh]">
          {/* Left Sidebar - appears at bottom on mobile, left on desktop */}
          <aside className="bg-background p-4 rounded-xl h-min order-3 md:order-none">
            <p className="font-medium">Left Sidebar</p>
          </aside>

          {/* Main Content */}
          <main className="bg-background p-4 rounded-xl shadow-sm order-2 md:order-none ">
            {children}
          </main>

          {/* Right Sidebar - appears at top on mobile, right on desktop */}
          <aside className="bg-background p-4 rounded-xl h-min order-1 md:order-none">
            <p className="font-medium">Right Sidebar</p>
          </aside>
        </div>
      </div>
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
