export type TermsAndConditions = {
  acceptTerms?: boolean;
  acceptCommunications?: boolean;
};

export type GeneralInformation = {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
};

export type CodeConfirmation = {
  codeConfirmation?: string;
};

export type AdditionalInformation = {
  documentId?: string;
  birthdate?: string;
  phoneNumber?: string;
  address?: string;
};

export type FormRegisterWizardData = {
  terms?: TermsAndConditions;
  generalInformation?: GeneralInformation;
  codeConfirmation?: CodeConfirmation;
  additionalInformation?: AdditionalInformation;
  qrCode?: string;
};
