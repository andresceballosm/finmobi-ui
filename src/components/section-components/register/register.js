import React, { useState } from "react";
import sectiondata from "../../../data/sections.json";
import { useForm } from "react-hook-form";
import { FORM_FIELD, STATE, CITY } from "./constants/form.constants";
import { FieldInput, FieldNativeSelect } from "../../common/field-input";
import { Box } from "@mui/material";
import { useAuth } from "../../../contexts/auth.context";

const states = require("../../../data/cities-colombia.json");

const Register = () => {
  let publicUrl = process.env.REACT_APP_PUBLIC_URL + "/";
  let imagealt = "image";
  let data = sectiondata.whychooseus;
  const [cities, setCities] = useState([]);
  const { registerWithEmailAndPassword } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    Object.assign(data, {
      country: "Colombia",
      role: "tenant",
    });
    await registerWithEmailAndPassword(data);
  };

  const getCities = (state) => {
    const data = states.find((item) => item.departamento === state).ciudades;
    setCities(data);
  };

  const onHandleChange = (event) => {
    getCities(event.target.value);
  };

  return (
    <div className="register-page-area pd-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
            <form className="contact-form-wrap contact-form-bg">
              <h4>Iniciar sesión</h4>
              <div className="rld-single-input">
                <input type="text" placeholder="Entry Login" />
              </div>
              <div className="rld-single-input">
                <input type="password" placeholder="Entry Password" />
              </div>
              <div className="btn-wrap">
                <button className="btn btn-yellow">Iniciar sesión</button>
              </div>
            </form>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6">
            <form
              onSubmit={handleSubmit((data) => onSubmit(data))}
              className="contact-form-wrap contact-form-bg"
            >
              <h4>Registro</h4>
              {FORM_FIELD.map((field, index) => (
                <Box pt={2} className="rld-single-input">
                  <FieldInput
                    key={index}
                    {...field}
                    errors={errors}
                    control={control}
                  />
                </Box>
              ))}
              <Box className="rld-single-input">
                <FieldNativeSelect
                  {...STATE}
                  errors={errors}
                  control={control}
                  data={states}
                  onChangeValue={onHandleChange}
                />
              </Box>
              <Box className="rld-single-input">
                <FieldNativeSelect
                  {...CITY}
                  errors={errors}
                  control={control}
                  data={cities}
                />
              </Box>
              <div className="btn-wrap">
                <button className="btn btn-yellow">Registro</button>
              </div>
              <ul className="social-icon">
                <li className="ml-0">
                  <a href="#" target="_blank">
                    <i className="fa fa-facebook  " />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <i className="fa fa-twitter  " />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
