import * as yup from "yup";
import { useFormik } from "formik";
import { GENERAL_INFORMATION_INITIAL_STATE } from "../constants";
import { actions } from "astro:actions";

export const GeneralInformationValidationSchema = yup.object({
  firstName: yup.string().min(3).required("First Name is required"),
  lastName: yup.string().min(3).required("Last Name is required"),
  email: yup
    .string()
    .min(3)
    .email("Email is invalid")
    .required("Email is required"),
  gender: yup.string().min(1).required("Gender is required"),
});

export const GeneralInformationFrom = () =>
  useFormik({
    initialValues: GENERAL_INFORMATION_INITIAL_STATE,
    validationSchema: GeneralInformationValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { data, error } =
        await actions.GeneralInformationAction.sendGeneralInformation({
          firstName: values.firstName!,
          lastName: values.lastName!,
          email: values.email!,
          gender: values.gender!,
        });
      if (error) {
        console.log({ error });
      }

      await actions.SMTPAction.sendCodeConfirmation();

      return data?.id;
    },
  });
export type GeneralInformationFromType = ReturnType<
  typeof GeneralInformationFrom
>;

export const GeneralInformationSubmittedFrom = async (
  form: GeneralInformationFromType
) => {
  const validationResult = await form.validateForm();
  form.setErrors(validationResult);
  if (Object.keys(validationResult).length > 0) return false;
  await form.submitForm();
  return true;
};
