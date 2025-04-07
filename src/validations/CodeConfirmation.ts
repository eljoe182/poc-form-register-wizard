import * as yup from "yup";
import { useFormik } from "formik";
import { CODE_CONFIRMATION_INITIAL_STATE } from "../constants";
import { actions } from "astro:actions";

export const CodeConfirmationValidationSchema = yup.object({
  codeConfirmation: yup
    .string()
    .min(6)
    .required("Code Confirmation is required"),
});

export const CodeConfirmationFrom = () =>
  useFormik({
    initialValues: CODE_CONFIRMATION_INITIAL_STATE,
    validationSchema: CodeConfirmationValidationSchema,
    onSubmit: async (values) => {
      const { data, error } = await actions.CodeConfirmationAction.checkCode({
        codeConfirmation: values.codeConfirmation!,
      });
      if (error) {
        console.log({ error });
      }
      return data;
    },
  });
export type CodeConfirmationFromType = ReturnType<typeof CodeConfirmationFrom>;

export const CodeConfirmationSubmittedFrom = async (
  form: CodeConfirmationFromType
) => {
  const validationResult = await form.validateForm();
  form.setErrors(validationResult);
  if (Object.keys(validationResult).length > 0) return false;
  await form.submitForm();
  return true;
};
