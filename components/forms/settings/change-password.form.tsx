"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword } from "@/services/mutation/user.mutation";
import {
  changePasswordValidationSchema,
  changePasswordDefaultValues,
  type ChangePasswordFormValues,
} from "./change-password.validation";

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export default function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const changePasswordMutation = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(changePasswordValidationSchema),
    defaultValues: changePasswordDefaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(
      {
        current_password: data.oldPassword,
        new_password: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Old Password */}
      <div>
        <Label htmlFor="oldPassword" className="text-xs font-semibold text-gray-700 mb-2 block">
          Enter Old Password
        </Label>
        <Input
          id="oldPassword"
          type="password"
          placeholder="••••••••"
          className="w-full"
          {...register("oldPassword")}
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.oldPassword.message}</p>
        )}
      </div>

      {/* New Password */}
      <div>
        <Label htmlFor="newPassword" className="text-xs font-semibold text-gray-700 mb-2 block">
          Enter New Password
        </Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="••••••••"
          className="w-full"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-700 mb-2 block">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          className="w-full"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Save Changes Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={changePasswordMutation.isPending || !isValid}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {changePasswordMutation.isPending ? "Changing..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
