import * as yup from "yup";

export interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePasswordValidationSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Current password is required")
    .min(6, "Current password must be at least 6 characters"),
  
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "New password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  
  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const changePasswordDefaultValues: ChangePasswordFormValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
