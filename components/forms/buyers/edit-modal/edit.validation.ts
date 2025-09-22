import * as yup from "yup";

// Custom URL validation that accepts URLs with or without protocol
const urlValidation = yup.string().test(
  'is-url',
  'Invalid URL',
  function(value) {
    if (!value) return true; // Allow empty values for optional fields
    
    // Add https:// if no protocol is provided
    const urlWithProtocol = value.startsWith('http://') || value.startsWith('https://') 
      ? value 
      : `https://${value}`;
    
    // Test if the URL with protocol is valid
    try {
      new URL(urlWithProtocol);
      return true;
    } catch {
      return false;
    }
  }
);

export const editBuyerSchema = yup.object({
  companyName: yup.string().required("Buyer Company Name is required"),
  website: urlValidation.optional(),
  socials: yup.array().of(yup.object({
    name: yup.string().required(),
    url: urlValidation.required()
  })).optional(),
  type: yup.string().required("Type is required"),
  note: yup.string().optional(),
});

export type EditBuyerFormValues = yup.InferType<typeof editBuyerSchema>;