export const FORM_FIELD = [
  {
    id: "name-field",
    messages: {
      required: `Requerido`,
    },
    label: "Nombre Completo",
    name: "name",
    validation: {
      required: "Requerido",
    },
    type: "text",
  },
  {
    id: "phone-field",
    messages: {
      required: `Requerido`,
    },
    label: "Telefono",
    name: "phone",
    validation: {
      required: "Requerido",
      minLength: {
        value: 6,
        message: "Mínimo 6 caracteres",
      },
    },
    type: "text",
  },
  {
    id: "email-field",
    messages: {
      required: `Requerido`,
    },
    label: "Correo electrónico",
    name: "email",
    validation: {
      required: "Requerido",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address",
      },
    },
    type: "text",
  },
  {
    id: "password-field",
    messages: {
      required: `Requerido`,
    },
    label: "Contraseña",
    name: "password",
    validation: {
      required: "Requerido",
      minLength: {
        value: 6,
        message: "Mínimo 6 caracteres",
      },
    },
    type: "password",
  },
  // {
  //   id: "repeat-password-field",
  //   messages: {
  //     required: `Requerido`,
  //   },
  //   label: "Repetir Contraseña",
  //   name: "repeat-password",
  //   validation: {
  //     required: "Requerido",
  //   },
  //   type: "password",
  // },
];

export const STATE = {
  id: "state-field",
  keyValue: "departamento",
  messages: {
    required: `Requerido`,
  },
  label: "Departamento",
  name: "state",
  validation: {
    required: "Requerido",
  },
};

export const CITY = {
  id: "city-field",
  messages: {
    required: `Requerido`,
  },
  label: "Ciudad",
  name: "city",
  validation: {
    required: "Requerido",
  },
};

export const ADDRESS = {
  id: "address-field",
  messages: {
    required: `Requerido`,
  },
  label: "Dirección",
  name: "address",
  validation: {
    required: "Requerido",
  },
};
