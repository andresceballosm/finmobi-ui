import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sectiondata from "../../data/sections.json";
import QuoteComponent from "../quote";
import { useForm } from "react-hook-form";

const TYPE_PROPERTY = {
  id: "type-property-field",
  label: "Tipo de inmueble",
  name: "typeProperty",
};

const ROOMS = {
  id: "rooms-field",
  label: "Habitaciones",
  name: "rooms",
};

const PRICE = {
  id: "range-price-field",
  label: "Precio",
  name: "price",
};

const Banner = () => {
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

  useEffect(() => {
    const $ = window.$;

    if ($(".single-select").length) {
      $(".single-select").niceSelect();
    }
  }, []);

  const publicUrl = process.env.REACT_APP_PUBLIC_URL + "/";
  const imagealt = "image";
  const data = sectiondata.banner;

  const inlineStyle = {
    backgroundImage: "url(" + publicUrl + "/assets/img/banner/1.jpg)",
    opacity: 0.8,
  };

  return (
    <div className="banner-area jarallax" style={inlineStyle}>
      <div className="container">
        <div className="banner-inner-wrap">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="banner-inner pt-5 pb-5">
                <h5 className="sub-title">{data.subtitle}</h5>
                <h1 className="title">
                  {data.title1} <br /> {data.title2}
                </h1>
                <p>
                  Dile adios a los coedeudores, como inquilino puede solicitar
                  el servicio y pagar una baja tarifa mensual.
                </p>
                <Link className="btn btn-yellow" to="/lease-request">
                  SOLICITAR
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
              <div className="banner-inner">
                <QuoteComponent />
              </div>
            </div>
            {/* <div className="col-12">
              <div className="banner-search-wrap">
                <ul className="nav nav-tabs rld-banner-tab">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs_1"
                    >
                      Arrendar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs_2">
                      For Rent
                    </a>
                  </li>
                </ul>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tabs_1">
                      <div className="rld-main-search">
                        <div className="row">
                          <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="rld-single-input left-icon">
                              <input
                                type="text"
                                placeholder="Entry Landmark Location"
                              />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-6 col-md-6">
                            <div className="rld-single-select">
                              <FieldSelect
                                {...TYPE_PROPERTY}
                                errors={errors}
                                control={control}
                                data={typeLease}
                              />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="rld-single-select">
                              <FieldSelect
                                {...ROOMS}
                                errors={errors}
                                control={control}
                                data={numberRooms}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-2 col-md-5">
                            <div className="rld-single-select">
                              <FieldSelect
                                {...PRICE}
                                errors={errors}
                                control={control}
                                data={rangePrice}
                              />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-4 col-md-4 readeal-top">
                            <Link className="btn btn-yellow" to="/search-list">
                              BUSCAR
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="tabs_2">
                      <div className="rld-main-search">
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="rld-single-input left-icon">
                              <input
                                type="text"
                                placeholder="Entry Landmark Location"
                              />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-6 col-md-6">
                            <div className="rld-single-select">
                              <FieldSelect
                                {...TYPE_PROPERTY}
                                errors={errors}
                                control={control}
                                data={typeLease}
                              />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-4 col-md-4">
                            <div className="rld-single-select">
                              <FieldSelect
                                {...ROOMS}
                                errors={errors}
                                control={control}
                                data={numberRooms}
                              />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-4 col-md-4">
                            <div className="rld-single-select">
                              <FieldSelect
                                {...PRICE}
                                errors={errors}
                                control={control}
                                data={rangePrice}
                              />
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-4 col-md-4 readeal-top">
                            <Link className="btn btn-yellow" to="/search-list">
                              BUSCAR
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
