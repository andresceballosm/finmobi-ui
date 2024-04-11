import { Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldSelect } from "../../../components/common/field-input";
import { NUMBER_ACCOUNTS } from "../../../components/section-components/add-new/constants/form.constants";
import { numberAccounts } from "../../../data/select";

const LeaseRequestStep2 = ({ nextStep, setAccountNumber, totalAmount }) => {
  const [showWarning, setShowWarning] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    if (data.numberConnectAccounts === "0") {
      setShowWarning(true);
    } else {
      setAccountNumber(parseInt(data.numberConnectAccounts));
      nextStep();
    }
  };

  return (
    <div className="container pd-top-60 mg-bottom-100">
      <div className="single-intro style-two text-center">
        <div className="thumb">2</div>
        <div className="details">
          <h4 className="title">Conectar cuentas bancarias</h4>
        </div>
      </div>
      <p>
        Para poder realizar el estudio de la viabilidad de otorgarle nuestro
        servicio, debemos validar sus ingresos, conectando sus cuentas bancarias
        podemos realizar este analisis en minutos, el proceso es completamente
        seguro.
      </p>
      <h5>
        El valor que debe pagar mensualmente es{" "}
        <b>
          $
          {totalAmount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          })}{" "}
          COP incluye el valor del arrendamiento + servicio de Finmobi.
        </b>
      </h5>
      <p>Cuantas cuentas desea conectar?</p>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {showWarning && (
          <Alert severity="warning">
            Lo sentimos, para poder continuar con el proceso debe conectar una
            cuenta bancaria propia con la que podamos validar sus ingresos.
          </Alert>
        )}
        <Box pt={2} className="col-12">
          <FieldSelect
            {...NUMBER_ACCOUNTS}
            errors={errors}
            control={control}
            data={numberAccounts}
          />
        </Box>
        <div className="row pd-top-80">
          <div className="col-12 text-center">
            <button className="btn btn-yellow w-50" type="submit">
              Continuar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeaseRequestStep2;
