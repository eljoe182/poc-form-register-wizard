export type TermsAndConditions = {
  acceptTerms?: boolean;
  acceptCommunications?: boolean;
};

export type ValidationData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
}

export type FormRegisterWizardData = {
  terms?: TermsAndConditions;
  validationData?: ValidationData;
}