import * as yup from "yup";
import { useFormik } from "formik";
import { VALIDATION_DATA_INITIAL_STATE } from "../constants";

export const ValidationDataValidationSchema = yup.object({
  firstName: yup.string().min(3).required("First Name is required"),
  lastName: yup.string().min(3).required("Last Name is required"),
  email: yup
    .string()
    .min(3)
    .email("Email is invalid")
    .required("Email is required"),
  gender: yup.string().min(1).required("Gender is required"),
});

export const ValidationDataFrom = () =>
  useFormik({
    initialValues: VALIDATION_DATA_INITIAL_STATE,
    validationSchema: ValidationDataValidationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });
export type ValidationDataFromType = ReturnType<typeof ValidationDataFrom>;

export const ValidationDataSubmittedFrom = async (
  form: ValidationDataFromType
) => {
  const validationResult = await form.validateForm();
  form.setErrors(validationResult);
  if (Object.keys(validationResult).length > 0) return false;
  await form.submitForm();
  return true;
};
