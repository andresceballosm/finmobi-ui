import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { bank_account, typeDocument, type_account } from "../../../data/select";
import { useForm } from "react-hook-form";
import {
  FieldInput,
  FieldSelect,
} from "../../../components/common/field-input";
import { Alert, Snackbar } from "@mui/material";
import {
  ACCOUNT_NUMBER,
  ACCOUNT_TYPE,
  BANK_ACCOUNT,
  DOCUMENT_NUMBER,
  TYPE_DOCUMENT_ID,
} from "../constants/form.constants";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";

const LeaseRequestBankAccount = () => {
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { createContract, leaseRequest, getLeaseRequest } = useContext(
    LeaseContext,
  );

  useEffect(() => {
    if (!leaseRequest) {
      getLeaseRequest(id, () => {});
    }
  }, [leaseRequest, getLeaseRequest, id]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const initForm = () => {
    reset({
      ownerFirstName: leaseRequest.ownerFirstName,
      ownerLastName: leaseRequest.ownerLastName,
      ownerEmail: leaseRequest.ownerEmail,
      ownerPhone: leaseRequest.ownerPhone,
      duration: leaseRequest.duration,
    });
  };

  useEffect(() => {
    if (leaseRequest?.ownerFirstName) {
      initForm();
    }
  }, [leaseRequest]);

  const handleResponse = (msg) => {
    setOpen(true);
    setMessage(msg);
    setTimeout(() => {
      history.push(`/`);
      setOpen(false);
    }, "10000");
  };

  const onSubmit = (data) => {
    if (errors) {
      setError("Faltan campos por completar");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    Object.assign(data, {
      leaseID: id,
    });
    createContract(data, handleResponse);
  };

  if (leaseRequest?.status === "tenant-rejected") {
    return (
      <div className="add-new-property-area pd-top-90 mg-bottom-100">
        <div className="container">
          <div className="row justify-content-center">
            <p>Oupps!, Esta solicitud ya ha sido cancelada por el inquilino.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="add-new-property-area pd-top-90 mg-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="col-xl-12 col-lg-12">
              {error && (
                <Alert variant="outlined" severity="error">
                  {error?.title}
                </Alert>
              )}
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {message}
                </Alert>
              </Snackbar>
              <div className="row pd-top-50">
                <div className="col-md-12">
                  <div className="section-title">
                    <h4>Cuenta bancaria</h4>
                    <p>
                      Por favor ingrese la informaci&oacute;n de la cuenta
                      bancaria donde quieres que te depositemos el dinero del
                      arriendo.
                    </p>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-6 col-xs-6">
                      <FieldSelect
                        {...BANK_ACCOUNT}
                        errors={errors}
                        control={control}
                        data={bank_account}
                      />
                    </Box>
                    <Box pt={2} className="col-md-6 col-xs-6">
                      <FieldSelect
                        {...ACCOUNT_TYPE}
                        errors={errors}
                        control={control}
                        data={type_account}
                      />
                    </Box>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-12 col-xs-12">
                      <FieldInput
                        {...ACCOUNT_NUMBER}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldSelect
                        {...TYPE_DOCUMENT_ID}
                        errors={errors}
                        control={control}
                        data={typeDocument}
                      />
                    </Box>
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...DOCUMENT_NUMBER}
                        errors={errors}
                        control={control}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default withPageLayout(LeaseRequestBankAccount);
