import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import { durationContract, typeDocument } from "../../../data/select";
import { useForm } from "react-hook-form";
import {
  FieldInput,
  FieldSelect,
} from "../../../components/common/field-input";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import { CANCELLATION_REASON } from "../constants/form.constants";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";

const cancellationReasons = [
  {
    label: "",
    value: 0,
  },
  {
    label: "Prefiero pedir coedeudores",
    value: 1,
  },
  {
    label: "Prefiero trabajar con una inmobiliaria",
    value: 2,
  },
  {
    label: "No deseo continuar el proceso con este inquilino",
    value: 3,
  },
  {
    label: "Finmobi no me da confianza",
    value: 4,
  },
  {
    label: "Ya arrende el inmueble",
    value: 5,
  },
  {
    label: "Otra razón",
    value: 6,
  },
];

const LeaseRequestCancel = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [hideForm, setHideForm] = useState(false);
  const {
    cancellationLeaseRequestOwner,
    leaseRequest,
    loading,
    getLeaseRequest,
  } = useContext(LeaseContext);

  useEffect(() => {
    if (!leaseRequest) {
      getLeaseRequest(id, () => {});
    }
  }, [leaseRequest, getLeaseRequest, id]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleResponse = (data) => {
    const { message, error } = data;
    setMessage(message.message);
    setError(error);
    if (!error) {
      setHideForm(true);
    }
  };

  const onSubmit = (data) => {
    Object.assign(data, {
      leaseID: id,
    });
    if (!data?.cancellationReason) {
      data.cancellationReason = 0;
    }
    cancellationLeaseRequestOwner(data, handleResponse);
  };

  if (!leaseRequest) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className="add-new-property-area pd-top-90 mg-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          {message && (
            <Alert variant="outlined" severity={!error ? "success" : "error"}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            {leaseRequest.status === "owner-rejected" ||
            leaseRequest.status === "tenant-rejected" ||
            hideForm ? (
              <p>Esta solicitud ya ha sido cancelada.</p>
            ) : (
              <div className="col-xl-12 col-lg-12">
                <div className="row pd-top-50">
                  <div className="col-md-12">
                    <div className="section-title">
                      <h4>Cancelar solicitud</h4>
                      <p>
                        Apreciamos mucho su retroalimentaci&oacute;n para
                        mejorar, es por esto que si nos puede contar la razón
                        por la cual no le interesa continuar con nuestro
                        servicio, lo agradecemos.
                      </p>
                    </div>
                    <div className="row">
                      <Box pt={2} className="col-12">
                        <FieldSelect
                          {...CANCELLATION_REASON}
                          errors={errors}
                          control={control}
                          data={cancellationReasons}
                        />
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="row pd-top-80">
                  <div className="col-12 text-center">
                    <button className="btn btn-yellow w-50" type="submit">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withPageLayout(LeaseRequestCancel);
