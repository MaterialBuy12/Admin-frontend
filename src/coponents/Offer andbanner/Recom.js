




import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Productname, Recomget, Recomput } from "../../services/api";
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, OutlinedInput } from "@mui/material";

import { Box } from "@mui/system";
import RecomPosts from "./RecomPosts";
import Pagination from "../categories/categories/Pagination";

function Recom() {
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

  const validate = yup.object({
   
    vari: yup.array().min(1,"Atleast one Product").required("Required"),
   


  });
  const [posts1, setposts1] = useState({});

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
  useEffect(() => {
    async function data() {
      let dat = await Productname();
      let resp= await Recomget();

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
                  <h4 className="page-title">Recommended</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Recommended Product</h4>

                    <div className="table-responsive">
                      <Formik
                      enableReinitialize
                        initialValues={{
                         
                          vari:[],
                         
                        }}
                        validationSchema={validate}
                        onSubmit={async (values, actions) => {
                          console.log("Product erecommened", values);
                            try {
                              let data = await Recomput(values);
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
                            console.log("after", values);
                          
                        }}
                      >
                        {(formik) => (
                          <Form>
                           
                          
                            <div className=" row mx-1">
                              <div className="col-12">
                               
                                <FormControl sx={{ mt: 2,width:400 }}>
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
                        <RecomPosts posts={currentPosts}  />
                        
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

export default Recom;

