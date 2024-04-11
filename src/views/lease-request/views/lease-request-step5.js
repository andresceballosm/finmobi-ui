import React, { useContext, useEffect, useState } from "react";
import LeaseRequestAnalyze from "../components/lease-request-analyze";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogComponent from "../../../components/dialog";

const LeaseRequestStep5 = () => {
  const [open, setOpen] = useState(false);
  const [linkSelected, setLinkSelected] = useState(null);

  const history = useHistory();
  const {
    leaseRequest,
    getLeaseRequest,
    loading,
    removeLinkRequest,
  } = useContext(LeaseContext);
  const { id } = useParams();
  const handleError = () => history.push(`/lease-request`);

  useEffect(() => {
    if (!leaseRequest) {
      getLeaseRequest(id, handleError);
    }
  }, [leaseRequest, getLeaseRequest]);

  const deleteLink = (link) => {
    setLinkSelected(link);
    setOpen(true);
  };

  const dialogContent = () => (
    <p>¿Está seguro(a) de eliminar la cuenta bancaria?</p>
  );

  const handleLeftButton = () => {
    setOpen(false);
  };

  const handleRightButton = () => {
    const data = {
      linkID: linkSelected,
      id,
    };
    removeLinkRequest(data);
  };

  const dialogFooter = () => (
    <div className="col-12">
      <div className="col-12 mt-1">
        <button className="col-12 btn btn-yellow" onClick={handleRightButton}>
          Continuar
        </button>
      </div>
      <div className="col-12 mb-5  mt-2 wp-caption-text">
        <button className="col-12 btn" onClick={handleLeftButton}>
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {!leaseRequest ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className="container text-center pd-top-60 mg-bottom-100">
          <div className="single-intro style-two text-center">
            <div className="thumb">2</div>
            <div className="details">
              <h3 className="title">Cuentas conectadas</h3>
              {leaseRequest?.links && leaseRequest?.links.length > 0 ? (
                <div className="col-12 text-center">
                  <DialogComponent
                    open={open}
                    content={dialogContent}
                    title="Cotización"
                    handleLeftButton={handleLeftButton}
                    footer={dialogFooter}
                  />
                  <List
                    className="col-12"
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    {leaseRequest?.links.map((value) => (
                      <>
                        <div className="col-12 text-center">
                          <ListItem
                            key={value}
                            disableGutters
                            secondaryAction={
                              <IconButton
                                aria-label="comment"
                                onClick={() => deleteLink(value._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={value.institution} />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      </>
                    ))}
                    <div className="row pd-top-80">
                      <div className="col-12 text-center">
                        <Link
                          className="btn btn-yellow"
                          to={`/lease-request/${id}/analyze`}
                        >
                          Continuar
                        </Link>
                      </div>
                    </div>
                  </List>
                </div>
              ) : (
                // leaseRequest?.links.map((link) => <p>{link.institution}</p>)
                <div>
                  <p>
                    No tiene ninguna cuenta conectada, para continuar con el
                    proceso debe conectar su cuenta bancaria donde podamos
                    verificar sus ingresos.
                  </p>
                  <div className="row pd-top-80">
                    <div className="col-12 text-center">
                      <Link
                        className="btn btn-yellow"
                        to={`/lease-request/${id}/connect/1`}
                      >
                        Conectar cuenta
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withPageLayout(LeaseRequestStep5);
