import * as yup from "yup";
import { useFormik } from "formik";
import { TERMS_AND_CONDITIONS_INITIAL_STATE } from "../constants";
import { actions } from "astro:actions";

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
    onSubmit: async (values) => {
      const { data, error } =
        await actions.TermsAndConditionsAction.sendTermsAndConditions({
          acceptTerms: values.acceptTerms!,
          acceptCommunications: values.acceptCommunications!,
        });
      return {
        error,
        data,
      };
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
  const { error } = await form.submitForm();

  if (error) {
    console.log({ error });
    return false;
  }

  return true;
};
