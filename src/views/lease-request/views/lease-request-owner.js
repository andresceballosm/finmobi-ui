import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { durationContract, typeDocument } from "../../../data/select";
import { useForm } from "react-hook-form";
import {
  FieldInput,
  FieldInputPhone,
  FieldSelect,
} from "../../../components/common/field-input";
import { Alert, Snackbar } from "@mui/material";
import {
  FINISH_CONTRACT,
  OWNER_CC,
  OWNER_CITY_DOCUMENT_EXPEDITION,
  OWNER_EMAIL,
  OWNER_FIRST_NAME,
  OWNER_LAST_NAME,
  OWNER_PHONE,
  START_CONTRACT,
  TYPE_OWNER_DOCUMENT,
} from "../constants/form.constants";
import {
  ADDRESS_OWNER,
  DURATION,
} from "../../../components/section-components/add-new/constants/form.constants";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";
import moment from "moment";

const LeaseRequestOwner = () => {
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
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const startContract = watch("startContract");
  const duration = watch("duration");

  useEffect(() => {
    if (startContract && duration) {
      const finish = moment(new Date(startContract)).add(duration, "months");
      const finishDate = moment(finish).format("YYYY-MM-DD");
      setValue("finishContract", finishDate);
    }
  }, [startContract, duration, setValue]);

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
                    <h4>Propietario</h4>
                    <p>
                      Por favor complete o actualice la siguiente
                      informaci&oacute;n.
                    </p>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-4 col-xs-6">
                      <FieldSelect
                        {...TYPE_OWNER_DOCUMENT}
                        errors={errors}
                        control={control}
                        data={typeDocument}
                      />
                    </Box>
                    <Box pt={2} className="col-md-4 col-xs-6">
                      <FieldInput
                        {...OWNER_CC}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-md-4 col-xs-12">
                      <FieldInput
                        {...OWNER_CITY_DOCUMENT_EXPEDITION}
                        errors={errors}
                        control={control}
                      />
                    </Box>
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
                  <div className="row">
                    <Box className="col-md-6 col-xs-12">
                      <FieldInput
                        {...ADDRESS_OWNER}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box className="col-md-6 col-xs-12">
                      <FieldSelect
                        {...DURATION}
                        errors={errors}
                        control={control}
                        data={durationContract}
                      />
                    </Box>
                  </div>
                  <div className="row">
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...START_CONTRACT}
                        errors={errors}
                        control={control}
                      />
                    </Box>
                    <Box pt={2} className="col-md-6 col-xs-12">
                      <FieldInput
                        {...FINISH_CONTRACT}
                        disabled={true}
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

export default withPageLayout(LeaseRequestOwner);
