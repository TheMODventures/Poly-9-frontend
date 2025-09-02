import * as yup from "yup";

export const addBuyerSchema = yup.object({
  companyName: yup.string().required("Buyer Company Name is required"),
  website: yup.string().url("Invalid URL").required("Website is required"),
  socials: yup.array().of(yup.string()).min(1, "At least one social is required"),
  type: yup.string().required("Type is required"),
  note: yup.string().optional(),
});

export type AddBuyerFormValues = yup.InferType<typeof addBuyerSchema>;