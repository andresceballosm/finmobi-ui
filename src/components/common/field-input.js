import { CheckBox } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  ListItemText,
  NativeSelect,
  Select,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Controller, useController, useForm } from "react-hook-form";
import {
  InputComponent,
  TexFieldComponent,
  TexFieldPhoneComponent,
} from "../text-field";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const FieldInput = ({
  id,
  name,
  type,
  validation = {},
  errors,
  label,
  control,
  disabled=false
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: validation,
  });

  const invalid = errors && errors[name];

  return (
    <TexFieldComponent
      {...inputProps}
      label={label}
      id={id}
      fullWidth
      type={type}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{ inputProps: { min: 0 } }}
      variant="standard"
      size="medium"
      error={!!invalid}
      disabled={disabled}
    />
  );
};

export const FieldInputPhone = ({
  id,
  name,
  type,
  validation = {},
  errors,
  label,
  control,
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: validation,
  });

  const invalid = errors && errors[name];

  return (
    <TexFieldPhoneComponent
      {...inputProps}
      label={label}
      id={id}
      fullWidth
      type={type}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{ inputProps: { min: 0 } }}
      variant="standard"
      size="medium"
      error={!!invalid}
    />
  );
};

export const FieldInputDecorator = ({
  id,
  name,
  type,
  validation = {},
  errors,
  label,
  control,
  decorator,
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: validation,
  });
  const invalid = errors && errors[name];

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor="standard-adornment-amount">{label}</InputLabel>
      <InputComponent
        {...inputProps}
        id={id}
        fullWidth
        type={type}
        variant="standard"
        error={!!invalid}
        startAdornment={
          <InputAdornment position="start">{decorator}</InputAdornment>
        }
        inputProps={{
          "aria-label": name,
        }}
      />
    </FormControl>

    // <TexFieldComponent
    //   {...inputProps}
    //   label={label}
    //   id={id}
    //   fullWidth
    //   type={type}
    //   InputLabelProps={{
    //     shrink: true,
    //   }}
    //   InputProps={{ inputProps: { min: 0 } }}
    //   variant="standard"
    //   size="medium"
    //   error={!!invalid}
    // />
  );
};

export const FieldSelect = ({
  name,
  type,
  validation = {},
  errors,
  label,
  control,
  data,
  id,
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: validation,
  });

  const invalid = errors && errors[name];

  return (
    <TexFieldComponent
      select
      {...inputProps}
      label={label}
      id={id}
      fullWidth
      type={type}
      SelectProps={{
        native: true,
      }}
      InputProps={{ inputProps: { min: 0 } }}
      variant="standard"
      size="medium"
      error={!!invalid}
      //helperText={errors[field.name] || ""}
    >
      {data.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TexFieldComponent>
  );
};

export const FieldNativeSelect = ({
  id,
  name,
  validation = {},
  errors,
  label,
  control,
  data,
  keyValue,
  onChangeValue,
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: validation,
  });

  const invalid = errors && errors[name];

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel variant="standard" htmlFor="uncontrolled-native" id={id}>
        {label}
      </InputLabel>
      <NativeSelect
        {...inputProps}
        onChange={(value) => {
          inputProps.onChange(value);
          onChangeValue && onChangeValue(value);
        }}
        fullWidth
        labelId="demo-simple-select-standard-label"
        id={id}
        inputProps={{
          name: { name },
          id: "uncontrolled-native",
        }}
        error={!!invalid}
      >
        {data.map((value, index) => (
          <option key={index} value={keyValue ? value[keyValue] : value}>
            {keyValue ? value[keyValue] : value}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export const FieldMultiSelect = ({
  id,
  name,
  validation = {},
  errors,
  label,
  control,
  data,
  keyValue,
  onChangeValue,
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: validation,
  });
  const invalid = errors && errors[name];
  const values = inputProps?.value ? inputProps?.value : [];
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
      <Select
        {...inputProps}
        labelId="demo-multiple-checkbox-label"
        id={id}
        fullWidth
        value={values}
        multiple
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        error={!!invalid}
        onChange={(value) => {
          inputProps.onChange(value);
          onChangeValue && onChangeValue(value);
        }}
      >
        {data.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox color="success" checked={values.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const FieldCheckBox = ({
  id,
  name,
  validation = {},
  errors,
  label,
  control,
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: validation,
  });

  //   const handleCheck = (checkedId) => {
  //     const { item_ids: ids } = inputProps.value;
  //     const newIds = ids?.includes(checkedId)
  //       ? ids?.filter((id) => id !== checkedId)
  //       : [...(ids ?? []), checkedId];
  //     return newIds;
  //   };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Checkbox {...field} />}
    />
    // <FormControl error={!!errors?.name?.message}>
    //   <FormHelperText>{errors.name?.message}</FormHelperText>
    //   <Controller
    //     control={control}
    //     name={name}
    //     defaultValue={false}
    //     render={({ field: { onChange, value, ...field } }) => (
    //       <FormControlLabel
    //         label={label}
    //         control={
    //           <Checkbox
    //             onChange={onChange}
    //             checked={value}
    //             defaultChecked={false}
    //             {...field}
    //           />
    //         }
    //       />
    //     )}
    //   />
    // </FormControl>
  );
};
