import { ErrorMessage, Field, Form, Formik } from 'formik';
import React,{useState,useEffect} from 'react'
import { SubSubgetCategory, getAllCategory, getAllSubCategory } from '../../services/api';
import * as yup from "yup";
import TextField from '../categories/TextField';
function CSSDeals() {
  const validate = yup.object({
   options:yup.string().required("Required"),
   percentage:yup.number().required("Required")
  });
  const [state, setstate] = useState([]);
  const [state1, setstate1] = useState([]);
  const [state2, setstate2] = useState([]);
  useEffect(() => {
    async function data() {
      let dat = await getAllCategory();

      let response = await getAllSubCategory();
      let resp = await SubSubgetCategory();
      
      setstate2(resp);

      setstate1(response);
      
      setstate(dat);
    }
    data();
  }, []);
  return (
    <>
       <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">CSS Deals</h4>
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
                    <h4 className="mt-0 header-title mb-4">CSS Deals</h4>

                    <div className="table-responsive">
                      <Formik
                        initialValues={{
                          categoryid:"",
                          subcategory:"",
                          subsubcategory:"",
                          percentage:""
                        }}
                        validationSchema={validate}
                        onSubmit={async (values, action) => {
                          // try {
                          //   let dat = await buyerleve(values);
                          
                          //   if (dat.status) {
                          //     alert("SUCCESSFULLY ", dat.data);
                          //     window.location.reload()
                          //   } else {
                          //     alert("Something went wrong");
                          //   }
                          // } catch (error) {
                          //   console.log(error);
                          // }
                          action.resetForm();
                        }}
                      >
                        {(formik) => (
                          <Form>
                         <div className="row mt-2 mx-0">
                        <div className="col mt-2">
                          <label> Category Name</label>
                          <Field
                            as="select"
                            className={`form-control shadow-none ${
                              formik.touched.categoryid &&
                              formik.errors.categoryid &&
                              "is-invalid"
                            }`}
                            name="categoryid"
                          >
                            <option defaultValue="">Select Category</option>
                            {state &&
                              state.map((i, index) => (
                                <option value={i.title}>{i.title}</option>
                              ))}
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="categoryid"
                            className="error"
                          />
                        </div>
                        <div className="col mt-2">
                          <label> Sub Category Name</label>
                          <Field
                            as="select"
                            className={`form-control shadow-none ${
                              formik.touched.subcategory &&
                              formik.errors.subcategory &&
                              "is-invalid"
                            }`}
                            name="subcategory"
                          >
                            
                            <option defaultValue="">Select Category</option>
                            {state1 &&
                              state1.map((i, index) => {
                                if (formik.values.categoryid === i.categoryname)
                                  return (
                                    <option
                                      key={index}
                                      name="subcategory"
                                      value={i.subcategory}
                                    >
                                      {i.subcategory}
                                    </option>
                                  );
                              })}
                          </Field>
                          <ErrorMessage
                            component="div"
                            className="error"
                            name="subcategory"
                          />
                        </div>

                        <div className="col mt-2">
                          <label>  Sub Sub Category Name</label>
                          <Field
                            as="select"
                            className={`form-control shadow-none ${
                              formik.touched.subsubcategory &&
                              formik.errors.subsubcategory &&
                              "is-invalid"
                            }`}
                            name="subsubcategory"
                          >
                            <option defaultValue="">Select Category</option>
                            {state2 &&
                              state2.map((i, index) => {
                                if (formik.values.categoryid === i.categoryname)
                                  return (
                                    <option value={i.subsubcategory}>
                                      {i.subsubcategory}
                                    </option>
                                  );
                              })}
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="subsubcategory"
                            className="error"
                          />
                        </div>
                        <div className='col mt-2'>
                          <TextField label='Percentage ' name='percentage'/>
                        </div>
                      </div> 

                      

                            <br />
                            <input
                              type="Submit"
                              className="btn mt-2 rounded-3 w-20  btn-lg btn-outline-secondary btn-dark"
                              value="Submit"
                              onChange={() => {}}
                            />
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">CSS Deals</h4>
                    <form class="d-flex w-10" role="search">
      <input class="form-control w-5 mx-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-dark btn-dark text-white" type="submit">Search</button>
    </form>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col"> Sr No. </th>
                            <th scope="col"> category </th>
                            <th scope="col"> sub category </th>
                            <th scope="col">sub sub category</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                      </table>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CSSDeals
