import * as yup from "yup"

export const createProductSchema = yup.object({
  collectionName: yup
    .string()
    .required("Collection name is required")
    .min(2, "Collection name must be at least 2 characters"),
  season: yup
    .string()
    .required("Season is required")
    .min(3, "Season description must be at least 3 characters"),
  styles: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one style must be selected")
    .required("Styles are required"),
  productCount: yup
    .string()
    .required("Product count is required")
    .min(1, "Product count description is required"),
})

export type CreateProductFormValues = yup.InferType<typeof createProductSchema>