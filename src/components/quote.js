import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import { durationContract } from "../data/select";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  ADMON,
  EMAIL,
  AMOUNT,
  CITY,
  DURATION,
  STATE,
} from "./section-components/add-new/constants/form.constants";
import {
  FieldInputDecorator,
  FieldNativeSelect,
  FieldSelect,
} from "./common/field-input";
import {
  Alert,
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { LeaseContext } from "../contexts/lease.context";
import DialogComponent from "./dialog";
import { formatAmount } from "../utils/numbers.utils";
import DialogFeedBack from "./common/dialog-feedback";

const states = require("../data/cities-colombia.json");

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

const QuoteComponent = ({ classes }) => {
  const [showAdmon, setShowAdmon] = useState(true);
  const [open, setOpen] = useState(false);
  const [openFeedBack, setOpenFeedBack] = useState(false);
  const [cities, setCities] = useState([]);
  const [quoteResponse, setQuoteResponse] = useState(null);
  const { createQuoteRequest, loading, updateQuote, error } = useContext(
    LeaseContext,
  );
  const history = useHistory();

  const optionsFeedBack = [
    "Necesito más información del servicio",
    "Muy costoso",
    "Elegí otra opción",
    "No deseo responder",
  ];

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const openDialog = (response) => {
    setQuoteResponse(response);
    setOpen(true);
  };

  const sendFeedback = (value) => {
    setOpenFeedBack(false);
    const data = {
      id: quoteResponse?.quote.id,
      status: "abandoned",
      feedback: value,
    };
    updateQuote(data);
  };

  const onSubmit = (data) => {
    const includeAdmon = !!data.includeAdmon;
    data.includeAdmon = includeAdmon;
    createQuoteRequest(data, openDialog);
  };

  const getCities = (state) => {
    const data = states.find((item) => item.departamento === state).ciudades;
    setCities(data);
  };

  const onHandleChange = (event) => {
    getCities(event.target.value);
  };

  const handleLeftButton = () => {
    setOpen(false);
    setOpenFeedBack(true);
  };

  const closeModal = () => setOpen(false);

  const navigateToCreateLease = () => history.push("/lease-request");

  const handleRightButton = () => {
    const data = {
      id: quoteResponse?.quote.id,
      status: "processed",
    };
    reset();
    updateQuote(data, navigateToCreateLease, closeModal);
  };

  const dialogContent = () => (
    <div className="pd-4">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <p>Debera pagar mensualmente por su arrendamiento: </p>
      <p>
        Arrendamiento: <b>${formatAmount(quoteResponse?.quote?.amount || 0)}</b>
      </p>
      <p>
        Servicio Finmobi: <b>${formatAmount(quoteResponse?.quote?.fee || 0)}</b>
      </p>
      <p>
        Total: <b>${formatAmount(quoteResponse?.quote?.total || 0)}</b>
      </p>
      <p className="font-italic font-size-small">
        Recuerde que Finmobi además de prestar el servicio de garantía en su
        arrendamiento, tambien es una pasarela de pago que facilita que
        mensualmente pueda realizar sus pagos desde la comodidad de su casa,
        puede elegir pagar por PSE desde su cuenta bancaria u otras opciones de
        pago que tenemos disponible para usted.
      </p>
    </div>
  );

  const dialogFooter = () => (
    <div className="col-12">
      <div className="col-12 mt-1">
        <button className="col-12 btn btn-yellow" onClick={handleRightButton}>
          Solicitar
        </button>
      </div>
      <div className="col-12 mb-5  mt-2 wp-caption-text">
        <button className="col-12 btn" onClick={handleLeftButton}>
          No deseo continuar
        </button>
      </div>
    </div>
  );

  return (
    <div className="row quote-container justify-content-center">
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="col-xl-12 col-lg-12">
          <div className="row">
            <div className="column">
              <div className="col-12">
                <h4>Cotiza en segundos</h4>
              </div>
              <div className="col-12">
                <p>Información del arriendo</p>
              </div>
            </div>
            {error && (
              <Alert variant="outlined" severity="error">
                {error}
              </Alert>
            )}
            <div className="col-md-11">
              <div className="row mb-3">
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
              </div>
              <div className="row">
                <Box className="col-6 mb-3">
                  <FieldInputDecorator
                    {...EMAIL}
                    errors={errors}
                    control={control}
                  />
                </Box>
                <Box className="col-6 mb-3">
                  <FieldInputDecorator
                    {...AMOUNT}
                    errors={errors}
                    control={control}
                  />
                </Box>
              </div>
              <div className="row">
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
                <Box className="col-6">
                  <FieldSelect
                    {...DURATION}
                    errors={errors}
                    control={control}
                    data={durationContract}
                  />
                </Box>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <DialogComponent
                  open={open}
                  content={dialogContent}
                  title="Cotización"
                  handleLeftButton={handleLeftButton}
                  footer={dialogFooter}
                />
                <DialogFeedBack
                  onClose={sendFeedback}
                  options={optionsFeedBack}
                  title="Te esperamos en otro momento"
                  valueProp="No deseo responder"
                  open={openFeedBack}
                />
                <div className="col-12 mt-5">
                  <button className="col-12 btn btn-yellow" type="submit">
                    Cotizar
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row pd-top-80">
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
              </div> */}
          {/* <div className="row pd-top-80">
                <Header title="Amenidades" icon="assets/img/icons/31.png" />
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-12 mt-5">
                      <button className="btn btn-yellow" type="submit">
                        Cotizar
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
        </div>
      </form>
    </div>
  );
};

export default withStyles(styles)(QuoteComponent);
