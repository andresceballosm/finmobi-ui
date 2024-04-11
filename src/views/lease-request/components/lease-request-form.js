import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import {
  durationContract,
  typeDocument,
  typeLease,
} from "../../../data/select";
import { Controller, useForm } from "react-hook-form";
import {
  FieldInput,
  FieldInputDecorator,
  FieldInputPhone,
  FieldNativeSelect,
  FieldSelect,
} from "../../../components/common/field-input";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import {
  ADMON,
  ADDRESS,
  NEIGHBORHOOD,
  TYPE_PROPERTY,
  AMOUNT,
  STATE,
  CITY,
  DURATION,
} from "../../../components/section-components/add-new/constants/form.constants";
import { Header } from "../../../components/section-components/add-new/components/header";
import {
  OWNER_EMAIL,
  OWNER_FIRST_NAME,
  OWNER_LAST_NAME,
  OWNER_PHONE,
  TENANT_CC,
  TENANT_CITY_DOCUMENT_EXPEDITION,
  TENANT_EMAIL,
  TENANT_FIRST_NAME,
  TENANT_LAST_NAME,
  TENANT_PHONE,
  TYPE_DOCUMENT,
} from "../constants/form.constants";
import { LeaseContext } from "../../../contexts/lease.context";
import { useHistory } from "react-router-dom";

const states = require("../../../data/cities-colombia.json");

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
};

const LeaseRequestForm = ({ nextStep }) => {
  const [showAdmon, setShowAdmon] = useState(true);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const { createLeaseRequest, quote } = useContext(LeaseContext);

  const { history } = useHistory();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const initForm = () => {
    getCities(quote.state);
    reset({
      ...quote,
    });
  };

  useEffect(() => {
    if (quote) {
      initForm();
    }
  }, [quote]);

  const onSubmit = (data) => {
    console.log("data ", data);
    if (errors) {
      setError("Faltan campos por completar");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    const includeAdmon = !!data.includeAdmon;
    data.includeAdmon = includeAdmon;
    data.ownerPhone = `+${data.ownerPhone}`;
    data.tenantPhone = `+${data.tenantPhone}`;
    createLeaseRequest(data, nextStep);
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
                <h3>Crear Solicitud</h3>
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
                        <h4 className="title">
                          Conectar información financiera
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="single-intro style-two text-center">
                      <div className="thumb">3</div>
                      <div className="details">
                        <h4 className="title">Firmar</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pd-top-100">
                <Header title="Solicitante" icon="assets/img/icons/5.png" />
                <div className="col-md-8">
                  <div className="section-title">
                    <h4>Solicitante</h4>
                    <p>
                      Informaci&oacute;n acerca del inquilino que solicita el
                      servicio{" "}
                    </p>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...TENANT_FIRST_NAME}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...TENANT_LAST_NAME}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInputPhone
                        {...TENANT_PHONE}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...TENANT_EMAIL}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-4 col-xs-12">
                      <FieldSelect
                        {...TYPE_DOCUMENT}
                        errors={errors}
                        control={control}
                        data={typeDocument}
                      />
                    </Box>
                    <Box pt={2} className="col-md-4 col-xs-12">
                      <FieldInput
                        {...TENANT_CC}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-md-4 col-xs-12">
                      <FieldInput
                        {...TENANT_CITY_DOCUMENT_EXPEDITION}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="row pd-top-100">
                <Header title="Propietario" icon="assets/img/icons/5.png" />
                <div className="col-md-8">
                  <div className="section-title">
                    <h4>Propietario</h4>
                    <p>
                      Informaci&oacute;n acerca del propietario del inmueble.
                    </p>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...OWNER_FIRST_NAME}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...OWNER_LAST_NAME}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInputPhone
                        {...OWNER_PHONE}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...OWNER_EMAIL}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="row pd-top-100">
                <Header title="Propiedad" icon="assets/img/icons/28.png" />
                <div className="col-md-8">
                  <div className="section-title">
                    <h4>Caracter&iacute;sticas</h4>
                    <p>Informaci&oacute;n acerca de su propiedad </p>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-12">
                      <FieldSelect
                        {...TYPE_PROPERTY}
                        errors={errors}
                        control={control}
                        data={typeLease}
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
                <div className="col-12 text-center">
                  <button className="btn btn-yellow w-50" type="submit">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(LeaseRequestForm);
