import * as yup from "yup";

export const searchValidation = yup.object().shape({
    search: yup.string().optional()
});
