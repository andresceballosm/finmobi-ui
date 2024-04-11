import React from "react";
import { withStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const TexFieldComponent = withStyles()(function(props) {
  return (
    <TextField
      {...props}
      sx={{
        "& label.Mui-focused": {
          color: "#285854",
        },
        "& .MuiInput-underline::after": { borderBottomColor: "#285854" },
      }}
    />
  );
});

export const TexFieldPhoneComponent = withStyles()(function(props) {
  return (
    <PhoneInput
      {...props}
      country={"co"}
      inputStyle={{
        borderTopWidth: 0,
        height: 48,
        borderRadius: 0,
        borderBottomWidth: 0.7,
        borderBottomColor: "rgba(0, 0, 0, 0.87)",
        width: "100%",
        borderRightWidth: 0,
      }}
      inputClass={{
        "& label.Mui-focused": {
          color: "#285854",
        },
        "& .MuiInput-underline::after": { borderBottomColor: "#285854" },
      }}
      buttonStyle={{
        backgroundColor: "transparent",
        borderBottomWidth: 0.7,
        borderBottomColor: "rgba(0, 0, 0, 0.87)",
      }}
    />
  );
});

export const InputComponent = withStyles()(function(props) {
  return (
    <Input
      {...props}
      sx={{
        "& label.Mui-focused": {
          color: "#285854",
        },
        "& .MuiInput-underline::after": { borderBottomColor: "#285854" },
      }}
    />
  );
});
