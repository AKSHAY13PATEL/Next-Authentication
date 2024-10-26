"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { revalidateTag } from "next/cache";
import React, { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { settings } from "@/actions/settings";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas";
import { z } from "zod";
import { UserRole } from "@prisma/client";

type SettingsType = z.infer<typeof SettingsSchema>;

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const user = useCurrentUser();

  const form = useForm<SettingsType>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || undefined,
      isTwoFactorEnabled: !!user?.isTwoFactorEnabled || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit: SubmitHandler<SettingsType> = (formData) => {
    startTransition(() => {
      settings(formData)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            setSuccess(data.success);
            update();
            // if server component does not reflect changes after update due to caching of server component
            // we can use revalidateTag or revalidatePath to force the re-render of server component by invalidating the cache
            revalidateTag("user-data-server");
          }
        })
        .catch((err) => {
          console.log("Something went wrong while updating");
        });
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="font-semibold text-xl text-center">
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Jhon Doe"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {!user?.isOAuth && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="johndoe@gmail.com"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="******"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="******"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex justify-between items-center border rounded-md p-4">
                          <div className="space-y-2">
                            <FormLabel>Is 2FA enabled</FormLabel>
                            <FormDescription>
                              Enable two factor authentication for better
                              security
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={UserRole.ADMIN}>
                              ADMIN
                            </SelectItem>
                            <SelectItem value={UserRole.USER}>USER</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormSuccess message={success || ""} />
              <FormError message={error || ""} />
            </div>
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
