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
  targetImageCount: yup
    .string()
    .trim()
    .when("$isCollection", {
      is: true,
      then: (schema) =>
        schema
          .required("Target image count is required")
          .matches(/^[1-9]\d*$/, "Enter a whole number greater than zero"),
      otherwise: (schema) => schema.optional(),
    }),
})

export type CreateProductFormValues = yup.InferType<typeof createProductSchema>
