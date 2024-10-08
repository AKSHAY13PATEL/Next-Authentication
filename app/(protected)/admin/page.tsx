"use client";

import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import React from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const role = useCurrentRole();

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Access granted");
      } else {
        toast.error("Access denied!");
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="text-center">Admin Page</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="This is admin only text!" />
        </RoleGate>
        <div className="flex justify-between items-center border rounded-lg p-3 shadow-md">
          <p>Admin only api route</p>
          <Button onClick={onApiRouteClick}>Test</Button>
        </div>
        <div className="flex justify-between items-center border rounded-lg p-3 shadow-md">
          <p>Admin only server action</p>
          <Button onClick={onServerActionClick}>Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
