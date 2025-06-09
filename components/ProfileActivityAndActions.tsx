import React from "react";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

export default function ProfileActivityAndActions() {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </>
  );
}
