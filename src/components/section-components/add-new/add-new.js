import React, { useState } from "react";
import sectiondata from "../../../data/sections.json";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import {
  amenitiesData,
  durationContract,
  durationsArray,
  typeLease,
} from "../../../data/select";
import { Controller, useForm } from "react-hook-form";
import {
  ADDRESS,
  ADMON,
  AMENITIES,
  AMOUNT,
  AREA,
  CITY,
  DEPOSIT,
  DURATION,
  FORM_FIELD,
  NEIGHBORHOOD,
  STATE,
  TYPE_PROPERTY,
} from "./constants/form.constants";
import { Header } from "./components/header";
import {
  FieldCheckBox,
  FieldInput,
  FieldInputDecorator,
  FieldMultiSelect,
  FieldNativeSelect,
  FieldSelect,
} from "../../common/field-input";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";

const states = require("../../../data/cities-colombia.json");

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: 300,
    margin: 100,
  },
  resize: {
    fontSize: 50,
  },
};

const AddNew = ({ classes }) => {
  let publicUrl = process.env.REACT_APP_PUBLIC_URL + "/";
  let imagealt = "image";
  let data = sectiondata.aboutus;

  const [showAdmon, setShowAdmon] = useState(true);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("dataaa", data);
    if (errors) {
      setError("Faltan campos por completar");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const getCities = (state) => {
    const data = states.find((item) => item.departamento === state).ciudades;
    setCities(data);
  };

  const onHandleChange = (event) => {
    getCities(event.target.value);
  };

  return (
    <div className="add-new-property-area pd-top-90 mg-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-center">
                <h3>Agregar propiedad</h3>
              </div>
              {error && (
                <Alert variant="outlined" severity="error">
                  This is an error alert — check it out!
                </Alert>
              )}

              <div className="border-bottom mb-4">
                <div className="row">
                  <div className="col-md-4">
                    <div className="single-intro style-two text-center">
                      <div className="thumb">1</div>
                      <div className="details">
                        <h4 className="title">Agregar Informacion</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="single-intro style-two text-center">
                      <div className="thumb">2</div>
                      <div className="details">
                        <h4 className="title">Contacto</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="single-intro style-two text-center">
                      <div className="thumb">3</div>
                      <div className="details">
                        <h4 className="title">Publicar</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                  <div className="col-5">
                    <div className="section-title mb-md-0">
                      <h4 className="pt-lg-1 pt-2">Categories</h4>
                    </div>
                  </div>
                  <div className="col-7 text-right add-property-btn-wrap">
                    <a className="btn btn-yellow mr-md-3" href="#">Sell</a>
                    <a className="btn btn-yellow" href="#">Rent</a>
                  </div>
                </div> */}
              <div className="row pd-top-100">
                <Header title="Propiedad" icon="assets/img/icons/28.png" />
                <div className="col-md-8">
                  <div className="section-title">
                    <h4>Caracter&iacute;sticas</h4>
                    <p>Informaci&oacute;n acerca de su propiedad </p>
                  </div>
                  <div className="row">
                    {FORM_FIELD.map((field, index) => (
                      <Box pt={2} className="col-6">
                        <FieldInput
                          key={index}
                          {...field}
                          type="number"
                          errors={errors}
                          control={control}
                        />
                      </Box>
                    ))}
                    <Box pt={2} className="col-6">
                      <FieldSelect
                        {...TYPE_PROPERTY}
                        errors={errors}
                        control={control}
                        data={typeLease}
                      />
                    </Box>
                    <Box pt={2} className="col-6">
                      <FieldInputDecorator
                        {...AREA}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="row pd-top-80">
                <Header
                  title="Ubicaci&oacute;n"
                  icon="assets/img/icons/29.png"
                />
                <div className="col-md-8">
                  <div className="section-title">
                    <h4>Direcci&oacute;n</h4>
                    <p>Ubicaci&oacute;n de su propiedad </p>
                  </div>
                  <div className="row">
                    <Box className="col-6">
                      <FieldNativeSelect
                        {...STATE}
                        errors={errors}
                        control={control}
                        data={states}
                        onChangeValue={onHandleChange}
                      />
                    </Box>
                    <Box className="col-6">
                      <FieldNativeSelect
                        {...CITY}
                        errors={errors}
                        control={control}
                        data={cities}
                      />
                    </Box>
                    <Box pt={2} className="col-6">
                      <FieldInput
                        {...NEIGHBORHOOD}
                        type="text"
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-6">
                      <FieldInput
                        {...ADDRESS}
                        type="text"
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    {/* <div className="col-12 mb-2">
          <div className="rld-single-input">
           <textarea rows={10} placeholder="Message" defaultValue={""} />
          </div>
         </div>
         <div className="col-12">
          <iframe
           className="w-100"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385276.5794773028!2d-115.51325829849152!3d41.1290219540523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1578810733172!5m2!1sen!2sbd"
           height={350}
           style={{ border: 0 }}
           allowFullScreen
          />
         </div> */}
                  </div>
                </div>
              </div>
              <div className="row pd-top-80">
                <Header title="Contrato" icon="assets/img/icons/30.png" />
                <div className="col-md-8">
                  <div className="row">
                    <Box className="col-12 mb-3">
                      <FieldInputDecorator
                        {...AMOUNT}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-6 mb-3">
                      <FormControlLabel
                        label="Incluye administraci&oacute;n"
                        control={
                          <Controller
                            name="includeAdmon"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                color="success"
                                {...field}
                                onChange={(value) => {
                                  field.onChange(value.target.value);
                                  setShowAdmon(!showAdmon);
                                }}
                              />
                            )}
                          />
                        }
                      />
                    </Box>
                    {showAdmon && (
                      <Box className="col-6 mb-3">
                        <FieldInputDecorator
                          {...ADMON}
                          errors={errors}
                          control={control}
                        />
                      </Box>
                    )}
                    <Box className="col-6 mb-3">
                      <FieldSelect
                        {...DEPOSIT}
                        errors={errors}
                        control={control}
                        data={durationsArray}
                      />
                    </Box>
                    <Box className="col-6 mb-3">
                      <FieldSelect
                        {...DURATION}
                        errors={errors}
                        control={control}
                        data={durationContract}
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="row pd-top-80">
                <Header title="Amenidades" icon="assets/img/icons/31.png" />
                <div className="col-md-8">
                  <div className="row">
                    <Box className="col-12 mb-3">
                      <FieldMultiSelect
                        {...AMENITIES}
                        control={control}
                        errors={errors}
                        data={amenitiesData}
                      />
                    </Box>
                    {/* <div className="col-sm-4">
                      <ul className="rld-list-style mb-3 mb-sm-0">
                        <li>
                          <i className="fa fa-check" /> Attic
                        </li>
                        <li>
                          <i className="fa fa-check" /> Poll
                        </li>
                        <li>
                          <i className="fa fa-check" /> Concierge
                        </li>
                        <li>
                          <i className="fa fa-check" /> Basketball
                        </li>
                        <li>
                          <i className="fa fa-check" /> Sprinklers
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-4">
                      <ul className="rld-list-style mb-3 mb-sm-0">
                        <li>
                          <i className="fa fa-check" /> Recreation
                        </li>
                        <li>
                          <i className="fa fa-check" /> Front Yard
                        </li>
                        <li>
                          <i className="fa fa-check" /> Wine Cellar
                        </li>
                        <li>
                          <i className="fa fa-check" /> Basketball
                        </li>
                        <li>
                          <i className="fa fa-check" /> Fireplace
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-4">
                      <ul className="rld-list-style mb-3 mb-sm-0">
                        <li>
                          <i className="fa fa-check" /> Balcony
                        </li>
                        <li>
                          <i className="fa fa-check" /> Pound
                        </li>
                        <li>
                          <i className="fa fa-check" /> Deck
                        </li>
                        <li>
                          <i className="fa fa-check" /> 24x7 Sec
                        </li>
                        <li>
                          <i className="fa fa-check" /> Indoor Game
                        </li>
                      </ul>
                    </div> */}
                    <div className="col-12 mt-5">
                      <button className="btn btn-yellow" type="submit">
                        Publicar propiedad
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(AddNew);
