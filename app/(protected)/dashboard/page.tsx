"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-lg items-center justify-center">
      <button onClick={onClick}>Sign out</button>
    </div>
  );
};

export default DashboardPage;
