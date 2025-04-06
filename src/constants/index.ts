import type {
  AdditionalInformation,
  CodeConfirmation,
  TermsAndConditions,
  ValidationData,
} from "../interfaces";

export const VALIDATION_DATA_INITIAL_STATE: ValidationData = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
};

export const CODE_CONFIRMATION_INITIAL_STATE: CodeConfirmation = {
  codeConfirmation: "",
};

export const ADDITIONAL_DATA_INITIAL_STATE: AdditionalInformation = {
  documentId: undefined,
  birthdate: undefined,
  phoneNumber: undefined,
  address: undefined,
};

export const TERMS_AND_CONDITIONS_INITIAL_STATE: TermsAndConditions = {
  acceptTerms: true,
  acceptCommunications: true,
};
