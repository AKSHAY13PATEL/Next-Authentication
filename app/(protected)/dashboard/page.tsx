"use client";

import { logout } from "@/actions/logout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Dashboard
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default DashboardPage;
