import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Dealget, Dealsput, Productname } from "../../services/api";
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, OutlinedInput } from "@mui/material";
import TextField from "../categories/TextField";
import { Box } from "@mui/system";
import DealsPosts from "./DealsPosts";
import Pagination from "../categories/categories/Pagination";

function Deals() {
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 400,
      },
    },
  };
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
                          console.log("deasls of the day", values);
                            try {
                              let data = await Dealsput(values);
                              if (data.status) {
                                alert("SUCCESSFULL");
                                window.location.reload()
                              } else {
                                alert("something went wrong");
                              }
                            } catch (error) {
                              console.log("error in promo", error);
                            }

                            actions.resetForm();
                      
                          }}
                      
                      >
                        {(formik) => (
                          <Form>
                           
                            <div className="row mx-1 ">
                             

                              {/* <div className="col-6">
                                <label>Discount Type</label>
                                <Field
                                  as="select"
                                  className={`form-control shadow-none ${
                                    formik.touched.type &&
                                    formik.errors.type &&
                                    "is-invalid"
                                  }`}
                                  id="title"
                                  name="type"
                                >
                                  <option defaultValue="Percentage">
                                    Percentage
                                  </option>
                                  <option value="Amount">Amount</option>
                                </Field>

                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="error"
                                /> */}
                              {/* </div> */}
                            </div>



                            <div className=" row mx-1">
                            
                              <div className="col-4">
                               
                                <FormControl sx={{ mt: 2,width:250 }}>
                                  <InputLabel  style={{color:"rgb(165, 166, 173)"}} id="demo-multiple-chip-label">
                                    Product Name
                                  </InputLabel>
                                  <Select style={{color:"rgb(165, 166, 173)"}}
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    name="vari"
                                    value={formik.values.vari}
                                    onChange={formik.handleChange}
                                    input={
                                      <OutlinedInput style={{color:"rgb(165, 166, 173)"}}
                                        id="select-multiple-chip"
                                        label="Product Name"
                                      />
                                    }
                                    renderValue={(selected) => (
                                      <Box style={{color:"rgb(165, 166, 173)"}}
                                        sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 0.5,
                                        }}
                                      >
                                        {selected.map((value) => (
                                          <Chip key={value} label={value} style={{color:"rgb(165, 166, 173)"}} />
                                        ))}
                                      </Box>
                                    )}
                                    MenuProps={MenuProps}
                                  >
                                    {posts1[0]?.map((i) => (
                                      <MenuItem
                                        key={i._id}
                                        value={i.productname1}
                                       
                                      >
                                        {i.productname1}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <ErrorMessage
                                  name="vari"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="col-3 ">
                                <TextField label="Discount(%)" name="discount" />
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
