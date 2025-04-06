import React from "react";
import BaseHeader from "./BaseHeader";

const BaseLayout = ({ children }) => {
  return (
    <div className="bg-baseBackground text-surface h-screen">
      <div className="min-h-[10vh]">
        <BaseHeader />
      </div>

      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 mt-4 min-h-[80vh]">
          {/* Right Sidebar - appears at top on mobile, right on desktop */}
          <aside className="order-1 md:order-3 bg-background p-4 rounded-xl w-full md:w-52">
            <p className="font-medium">Right Sidebar</p>
          </aside>

          {/* Main Content */}
          <main className="order-2 flex-1 bg-background p-4 rounded-xl shadow-sm">
            {children}
          </main>

          {/* Left Sidebar - appears at bottom on mobile, left on desktop */}
          <aside className="order-3 md:order-1 bg-background p-4 rounded-xl w-full md:w-52">
            <p className="font-medium">Left Sidebar</p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
