import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Form, FormItem } from "@/components/ui/form";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <div>DashboardPage</div>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    </>
  );
};

export default DashboardPage;
