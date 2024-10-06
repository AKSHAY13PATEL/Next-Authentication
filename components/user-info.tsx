import { Session } from "next-auth";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: Session["user"]; // TODO: what to user here as interface for user
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between border rounded-lg p-2 shadow-sm">
          <div>ID</div>
          <div className="font-normal bg-slate-100 rounded-sm p-1">
            {user?.id}
          </div>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-2 shadow-sm">
          <div>Name</div>
          <div className="font-normal bg-slate-100 rounded-sm p-1">
            {user?.name}
          </div>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-2 shadow-sm">
          <div>Email</div>
          <div className="font-normal bg-slate-100 rounded-sm p-1">
            {user?.email}
          </div>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-2 shadow-sm">
          <div>Role</div>
          <div className="font-normal bg-slate-100 rounded-sm p-1">
            {user?.role}
          </div>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-2 shadow-sm">
          <div>2FA enabled</div>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "Yes" : "No"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
