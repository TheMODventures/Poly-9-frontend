import * as yup from "yup";

export const registerSchema = yup.object({
  companyName: yup.string().required("Company representator name is required"),
  companyEmail: yup
    .string()
    .email("Invalid email")
    .required("Company representator email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
