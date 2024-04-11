const PHONE = {
  messages: {
    required: `Requerido`,
  },
  label: "Celular",
  type: "number",
  validation: {
    required: "Requerido",
  },
};

const EMAIL = {
  messages: {
    required: `Requerido`,
  },
  label: "Correo electrónico",
  name: "email",
  validation: {
    required: "Requerido",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Ingrese un correo electrónico valido",
    },
  },
  type: "text",
};

const FIRST_NAME = {
  messages: {
    required: `Requerido`,
  },
  label: "Nombre",
  type: "text",
  validation: {
    required: "Requerido",
  },
};

const LAST_NAME = {
  messages: {
    required: `Requerido`,
  },
  label: "Apellidos",
  type: "text",
  validation: {
    required: "Requerido",
  },
};

export const TENANT_FIRST_NAME = {
  ...FIRST_NAME,
  id: "tenant-first-name-field",
  name: "tenantFirstName",
};

export const OWNER_FIRST_NAME = {
  ...FIRST_NAME,
  id: "owner-first-name-field",
  name: "ownerFirstName",
};

export const TENANT_LAST_NAME = {
  ...LAST_NAME,
  id: "tenant-last-name-field",
  name: "tenantLastName",
};

export const OWNER_LAST_NAME = {
  ...LAST_NAME,
  id: "owner-last-name-field",
  name: "ownerLastName",
};

export const TENANT_PHONE = {
  ...PHONE,
  id: "tenant-phone-field",
  name: "tenantPhone",
};

export const OWNER_PHONE = {
  ...PHONE,
  id: "owner-phone-field",
  name: "ownerPhone",
};

export const TENANT_EMAIL = {
  ...EMAIL,
  id: "tenant-email-field",
  name: "tenantEmail",
};

export const OWNER_EMAIL = {
  ...EMAIL,
  id: "owner-email-field",
  name: "ownerEmail",
};

export const TENANT_CC = {
  id: "tenant-document-id-field",
  name: "tenantDocumentId",
  messages: {
    required: `Requerido`,
  },
  label: "No. Documento de identidad",
  type: "number",
  validation: {
    required: "Requerido",
  },
};

export const TYPE_DOCUMENT = {
  id: "type-document-field",
  messages: {
    required: `Requerido`,
  },
  label: "Tipo de documento de identidad",
  name: "tenantTypeDocument",
  validation: {
    required: "Requerido",
  },
};

export const TYPE_OWNER_DOCUMENT = {
  id: "type-document-field",
  messages: {
    required: `Requerido`,
  },
  label: "Tipo de documento de identidad",
  name: "ownerTypeDocument",
  validation: {
    required: "Requerido",
  },
};

export const OWNER_CC = {
  id: "owner-document-id-field",
  name: "ownerDocumentId",
  messages: {
    required: `Requerido`,
  },
  label: "No. Documento de identidad",
  type: "number",
  validation: {
    required: "Requerido",
  },
};

export const OWNER_CITY_DOCUMENT_EXPEDITION = {
  id: "owner-document-id-field",
  name: "ownerCityDocumentExpedition",
  messages: {
    required: `Requerido`,
  },
  label: "Ciudad de expedición documento de identidad",
  validation: {
    required: "Requerido",
  },
};

export const ACCOUNT_TYPE = {
  id: "owner-document-id-field",
  name: "accountType",
  messages: {
    required: `Requerido`,
  },
  label: "Tipo de cuenta",
  validation: {
    required: "Requerido",
  },
};

export const TENANT_CITY_DOCUMENT_EXPEDITION = {
  id: "tenant-document-id-field",
  name: "tenantCityDocumentExpedition",
  messages: {
    required: `Requerido`,
  },
  label: "Ciudad de expedición documento de identidad",
  validation: {
    required: "Requerido",
  },
};

export const CANCELLATION_REASON = {
  id: "number-cancellation-reason-field",
  messages: {
    required: `Requerido`,
  },
  label: "Razón de la cancelación",
  name: "cancellationReason",
};

export const START_CONTRACT = {
  id: "start-contract-field",
  name: "startContract",
  type: "date",
  label: "Fecha de inicio del contrato",
  messages: {
    required: `Requerido`,
  },
};

export const FINISH_CONTRACT = {
  id: "finish-contract-field",
  name: "finishContract",
  type: "date",
  label: "Fecha de finalización del contrato",
  messages: {
    required: `Requerido`,
  },
};

export const BANK_ACCOUNT = {
  id: "type-bank-field",
  messages: {
    required: `Requerido`,
  },
  label: "Banco",
  name: "bank",
  validation: {
    required: "Requerido",
  },
};

export const ACCOUNT_NUMBER = {
  id: "account-number-field",
  name: "accountNumber",
  messages: {
    required: `Requerido`,
  },
  label: "No. cuenta",
  type: "number",
  validation: {
    required: "Requerido",
  },
};

export const DOCUMENT_NUMBER = {
  id: "document-number-field",
  name: "documentNumber",
  messages: {
    required: `Requerido`,
  },
  label: "No. Documento de identidad",
  type: "number",
  validation: {
    required: "Requerido",
  },
};

export const TYPE_DOCUMENT_ID = {
  id: "type-document-field",
  messages: {
    required: `Requerido`,
  },
  label: "Tipo de documento de identidad",
  name: "typeDocument",
  validation: {
    required: "Requerido",
  },
};
