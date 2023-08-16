import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";

import { Dealget, Dealsput, Productname } from "../../services/api";

import {  MenuItem} from "@mui/material";
import { TextField, Autocomplete } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import DealsPosts from "./DealsPosts";
import Pagination from "../categories/categories/Pagination";
import Inputfielded from "./Inputfielded";

function Deals() {
  

  const [posts, setposts] = useState([]);    
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  // total no of pages
  const Totalpages=Math.ceil(posts.length/postsPerPage)    
  const pages =[...Array(Totalpages+1).keys()].slice(1);
  


// Get current posts
  const indexOfLastPost = currentPage * postsPerPage;    
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  
// Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const validate = yup.object({
    discount: yup.number().typeError("Only number").required("Required"),
    // type: yup.string().required("Required"),
    vari: yup.array().min(1,"Atleast one Product").required("Required"),
   
  });
  const [posts1, setposts1] = useState({});


  useEffect(() => {
    async function data() {
      let dat = await Productname();
      let resp=await Dealget()
      
      setposts(resp.data)
    

      setposts1(dat);
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
                  <h4 className="page-title">Deals of the Day</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Deals</h4>

                    <div className="table-responsive">
                      <Formik
                      enableReinitialize
                        initialValues={{
                          discount: "",
                          // type: "Percentage",
                          vari:[],
                         
                        }}
                        validationSchema={validate}
                        onSubmit={async (values, actions) => {
                        
                            try {
                              let data = await Dealsput(values);
                              if (data.status) {
                                alert("SUCCESSFULL");
                                window.location.reload()
                              } else {
                                alert("something went wrong");
                              }
                            } catch (error) {
                              alert("error in promo", error);
                            }

                            actions.resetForm();
                      
                          }}
                      
                      >
                        {(formik) => (
                          <Form>
                           
                            <div className="row mx-1 ">
                             

                           
                            </div>



                            <div className=" row mx-1">
                            
                              <div className="col">
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
                              <div className="col">
                                <Inputfielded label="Discount(%)" name="discount" />
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
                    <h4 className="mt-0 header-title mb-4">Deals List</h4>

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
                        <DealsPosts posts={currentPosts}  />
                        </tbody>
                      </table>
                    </div>
                    <Pagination
        postsPerPage={postsPerPage}
        totalPosts={Totalpages}
        paginate={paginate}
        currentPage={currentPage}
        pageNumbers ={pages}
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

export default Deals;
