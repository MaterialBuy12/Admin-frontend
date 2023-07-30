import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import * as yup from "yup";
import { TextField, Autocomplete } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Formik, Form, ErrorMessage } from "formik";

import { Productname, Recomget, Recomput } from "../../services/api";

import {  MenuItem } from "@mui/material";
import RecomPosts from "./RecomPosts";
import Pagination from "../categories/categories/Pagination";

function Recom() {




  const validate = yup.object({
    vari: yup.array().min(1, "Atleast one Product").required("Required"),
  });
  const [posts1, setposts1] = useState([]);

  const [posts, setposts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  // total no of pages
  const Totalpages = Math.ceil(posts.length / postsPerPage);
  const pages = [...Array(Totalpages + 1).keys()].slice(1);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    async function data() {
      let dat = await Productname();
      console.log(dat[0])
      let resp = await Recomget();

      setposts(resp.data);

      setposts1(dat[0]);
    }
    data();
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
                  <h4 className="page-title">Recommended</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">
                      Recommended Product
                    </h4>

                    <div className="table-responsive">
                      <Formik
                        enableReinitialize
                        initialValues={{
                          vari: [],
                        }}
                        validationSchema={validate}
                        onSubmit={async (values, actions) => {
                          console.log("Product erecommened", values);
                          try {
                            let data = await Recomput(values);
                            if (data.status) {
                              alert("SUCCESSFULL");
                              window.location.reload();
                            } else {
                              alert("something went wrong");
                            }
                          } catch (error) {
                            console.log("error in promo", error);
                          }

                          actions.resetForm();
                          console.log("after", values);
                        }}
                      >
                        {(formik) => (
                          <Form>
                            {console.log(formik.values)}
                            <div className=" row mx-1">
                              <div className="col-12">
                                <Autocomplete
                                onChange={(event, value) => formik.setFieldValue("vari",value)} 
                                  sx={{ m: 1, width: 500 }}
                                  multiple
                                  style={{ backgroundColor: 'white'  }}                                                                
                                  options={posts1}
                                  getOptionLabel={(option) => option}
                                  disableCloseOnSelect
                          
                                  renderInput={(params) => (
                                    <TextField  
                                      {...params}
                                      name="vari"
                                      value={formik.values.vari}
                                      onChange={formik.handleChange}  
                                      variant="outlined"
                                      color="info"
                                      label="Product Name"
                                      placeholder="Product Name"
                                    />
                                  )}
                                  renderOption={(
                                    props,
                                    option,
                                    { selected }
                                  ) => (
                                    
                                    <MenuItem
                                      {...props}
                                      key={option}
                                      value={option}
                                      sx={{ justifyContent: "space-between" }}
                                    >
                                      {option}
                                      {selected ? (
                                        <CheckIcon color="info" />
                                      ) : null}
                                    </MenuItem>
                                  )}
                                />

                                <ErrorMessage
                                  name="vari"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>

                            <input
                              type="submit"
                              className="btn mt-2 mx-4 rounded-3 w-20  btn-lg btn-outline-secondary btn-dark"
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

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Recommended List</h4>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col"> Sr No.</th>
                            <th scope="col"> Product Name</th>

                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <RecomPosts posts={currentPosts} />
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={Totalpages}
                      paginate={paginate}
                      currentPage={currentPage}
                      pageNumbers={pages}
                    />
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

export default Recom;
