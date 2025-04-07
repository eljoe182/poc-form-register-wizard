import * as yup from "yup";
import { useFormik } from "formik";
import { ADDITIONAL_DATA_INITIAL_STATE } from "../constants";
import { actions } from "astro:actions";

export const AdditionalInformationValidationSchema = yup.object({
  documentId: yup.string().required("Document ID is required"),
  birthdate: yup.string().required("Birthdate is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
});

export const AdditionalInformationFrom = () =>
  useFormik({
    initialValues: ADDITIONAL_DATA_INITIAL_STATE,
    validationSchema: AdditionalInformationValidationSchema,
    onSubmit: async (values) => {
      const { data, error } =
        await actions.AdditionalInformationAction.sendAdditionalInformation({
          documentId: values.documentId!,
          birthdate: values.birthdate!,
          phoneNumber: values.phoneNumber!,
          address: values.address!,
        });
      if (error) {
        console.log({ error });
      }

      return data;
    },
  });
export type AdditionalInformationFromType = ReturnType<
  typeof AdditionalInformationFrom
>;

export const AdditionalInformationSubmittedFrom = async (
  form: AdditionalInformationFromType
) => {
  const validationResult = await form.validateForm();
  form.setErrors(validationResult);
  if (Object.keys(validationResult).length > 0) return false;
  const result = await form.submitForm();
  return result;
};
