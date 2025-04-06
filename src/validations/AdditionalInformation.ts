import * as yup from "yup";
import { useFormik } from "formik";
import { ADDITIONAL_DATA_INITIAL_STATE } from "../constants";

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
    onSubmit: (values) => {
      console.log(values);
    },
  });
export type AdditionalInformationFromType = ReturnType<
  typeof AdditionalInformationFrom
>;

export const AdditionalInformationSubmittedFrom = async (
  form: AdditionalInformationFromType
) => {
  const validationResult = await form.validateForm();
  console.log({ validationResult });
  form.setErrors(validationResult);
  if (Object.keys(validationResult).length > 0) return false;
  await form.submitForm();
  return true;
};
