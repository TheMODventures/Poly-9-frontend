import * as yup from "yup";

export const editBuyerSchema = yup.object({
  companyName: yup.string().required("Company name is required"),
  context: yup.string().required("Context is required"),
  website: yup.string().url("Invalid URL").required("Website is required"),
  type: yup.string().required("Type is required"),
  hasFacebook: yup.boolean().default(false),
  hasInstagram: yup.boolean().default(false),
});

export type EditBuyerFormValues = yup.InferType<typeof editBuyerSchema>;