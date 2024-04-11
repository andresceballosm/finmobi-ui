import React from "react";
import { withStyles } from "@mui/styles";

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

const Steps = () => {
  return (
    <div className="add-new-property-area pd-top-90 mg-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12">
            <div className="section-title text-center">
              <h3>Como funciona</h3>
            </div>
            <div className="border-bottom mb-4">
              <div className="row">
                <div className="col-md-4">
                  <div className="single-intro style-two text-center">
                    <div className="thumb">1</div>
                    <div className="details">
                      <h4 className="title">Cotiza</h4>
                      <p>Cotiza el valor que deberas pagar mes a mes.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="single-intro style-two text-center">
                    <div className="thumb">2</div>
                    <div className="details">
                      <h4 className="title">Solicita</h4>
                      <p>
                        Llena el formulario de solicitud, para esto necesitamos
                        que tengas a mano el nombre, numero de telefono y email
                        del propietario
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="single-intro style-two text-center">
                    <div className="thumb">3</div>
                    <div className="details">
                      <h4 className="title">Firma</h4>
                      <p>
                        Si el estudio es positivo, enviaremos un contrato
                        digital para que sea firmado por las partes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Steps);
