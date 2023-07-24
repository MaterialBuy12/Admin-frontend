import React from "react";
import Footer from "../footer/Footer";
import { Formik, Form, ErrorMessage,Field } from "formik";
import TextField from "../categories/TextField";

import * as yup from "yup";
import { PORVENDOR } from "../../services/api";
function Request() {
  const validate = yup.object({
    frieghtrate: yup.string().required("Required"),
    vendorsel: yup.string().required("Required"),
    userscharge: yup.string().required("Required"),
    

  });
  const validate1 = yup.object({
    productname: yup.string().required("Required"),
    quantity: yup.string().required("Required"),
    adminprice: yup.string().required("Required"),
    vendorprice: yup.string().required("Required"),
    pxquantity: yup.string().required("Required"),
    pxquantityshipping: yup.string().required("Required"),
    
    

  });
  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">POR Request</h4>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-right"></ol>
                </div>
              </div>
            </div>

            <div className="row d-md-flex justify-content-md-end ">
              <div className="col-sm-6 d-md-flex justify-content-md-end"></div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h3 className="mt-0 header-title mb-4">POR Request</h3>

                    <div class="row justify-content-start">
                      <div class="col-5 ">
                        <h4>Get Frieght Rate</h4>
                        <Formik
                          initialValues={{
                            frieghtrate: "",
                            vendorsel: "",
                            userscharge:""
                          }}
                          validationSchema={validate}
                          onSubmit={async (values, actions) => {
                            console.log("submitted values", values);

                            actions.resetForm();
                          }}
                        >
                          {(formik) => (
                            <Form>
                               <div class="row justify-content-evenly">
                                <div class="col-6 mt-3"> 
                                <label>Vendor Selection</label>
                      <Field
                        as="select"
                        className={`form-control shadow-none  ${
                          formik.touched.vendorsel &&
                          formik.errors.vendorsel &&
                          "is-invalid"
                        }`}
                        id="title"
                        name="categoryid"
                      >
                        <option defaultValue="">Select Vendor</option>
                        {/* {state &&
                          state.map((i, index) => (
                            <option key={index} value={i._id}>
                              {i.title}
                            </option>
                          ))} */}
                      </Field>

                      <ErrorMessage
                        name="vendorsel"
                        component="div"
                        className="error"
                      />
</div>
                                <div class="col-6 mt-3"> <label>Ware House Selection</label>
                      <Field
                        as="select"
                        className={`form-control shadow-none  ${
                          formik.touched.warehousesel &&
                          formik.errors.warehousesel &&
                          "is-invalid"
                        }`}
                        id="title"
                        name="categoryid"
                      >
                        <option defaultValue="">Select Warehouse</option>
                        {/* {state &&
                          state.map((i, index) => (
                            <option key={index} value={i._id}>
                              {i.title}
                            </option>
                          ))} */}
                      </Field>

                      <ErrorMessage
                        name="warehousesel"
                        component="div"
                        className="error"
                      /></div>
                              </div>
                              
                              <div class="row justify-content-evenly">
                                <div class="col-6 mt-3"><TextField name="frieghtrate"label="Frieght Rate"/></div>
                                <div class="col-6 mt-3"><TextField name="userscharge"label="User's Shipping Charge"/></div>
                              </div>
                              <input
                                type="Submit"
                                className="btn mt-2 rounded-3 w-20  btn-lg btn-outline-secondary btn-dark"
                                value="Submit"
                              />
                            </Form>
                          )}
                        </Formik>
                      </div>
                      <div className="col-2"></div>
                      <div class="col-5">
                        <h4>Send POR To Vendor</h4>
                        <Formik
                          initialValues={{
                            productname: "",
                            quantity: "",
                            adminprice:"",
                            vendorprice:"",
                            pxquantity:"",
                            pxquantityshipping:""
                          }}
                          validationSchema={validate1}
                          onSubmit={async (values, actions) => {
                            
                            try {
                              let dat = await PORVENDOR(values);
                              
      
                              if (dat.status) {
                            
                                alert("SUCCESSFUL");
                              
                                window.location.reload();
                              } else {
                                alert("Something went wrong");
                              }
                            } catch (error) {
                              console.log(error);
                            }
                            actions.resetForm();
                          }}
                        >
                          {(formik) => (
                            <Form>
                               <div class="row justify-content-evenly">
                               <div class="col-6 mt-3"><TextField name="productname"label="Product Name"/></div>
                               <div class="col-6 mt-3"><TextField name="quantity"label="Quantity"/></div>

                               
                              </div>
                              
                              <div class="row justify-content-evenly">
                                <div class="col-6 mt-3"><TextField name="adminprice"label="Admin's Price"/></div>
                                <div class="col-6 mt-3"><TextField name="vendorprice"label="Vendor's Price"/></div>
                              </div>
                              <div class="row justify-content-evenly">
                                <div class="col-6 mt-3"><TextField name="pxquantity" label="Price X (Quantity)"/></div>
                                <div class="col-6 mt-3"><TextField name="pxquantityshipping"label="(Price XQuantity)+Shipping " placeholder="Charge"/></div>
                              </div>
                              <input
                                type="Submit"
                                className="btn mt-2 rounded-3 w-20  btn-lg btn-outline-secondary btn-dark"
                                value="Submit"
                              />
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Request;
