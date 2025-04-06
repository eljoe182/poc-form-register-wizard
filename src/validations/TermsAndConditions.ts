import * as yup from "yup";
import { useFormik } from "formik";
import { TERMS_AND_CONDITIONS_INITIAL_STATE } from "../constants";

export const TermsAndConditionsValidationSchema = yup.object({
  acceptTerms: yup.boolean().required("Accept Terms is required"),
  acceptCommunications: yup
    .boolean()
    .required("Accept Communications is required"),
});

export const TermsAndConditionsFrom = () =>
  useFormik({
    initialValues: TERMS_AND_CONDITIONS_INITIAL_STATE,
    validationSchema: TermsAndConditionsValidationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });
export type TermsAndConditionsFromType = ReturnType<
  typeof TermsAndConditionsFrom
>;

export const TermsAndConditionsSubmittedFrom = async (
  form: TermsAndConditionsFromType
) => {
  const validationResult = await form.validateForm();
  form.setErrors(validationResult);
  if (Object.keys(validationResult).length > 0) return false;
  await form.submitForm();
  return true;
};
