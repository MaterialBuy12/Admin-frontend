import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import * as yup from "yup";

import { Formik, Form, ErrorMessage } from "formik";

import { Dealget, Dealsput, Productget } from "../../services/api";
import '../../App.css'

import DealsPosts from "./DealsPosts";
import Pagination from "../categories/categories/Pagination";
import Inputfielded from "./Inputfielded";
import Multiselect from "multiselect-react-dropdown";
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
 
  const [filters,setfilters] = useState([])
  const [tags2, settags2] = useState([]);

  useEffect(() => {
    async function data() {
    
      let resp=await Dealget()
      console.log("dela",resp)
      let data1=await Productget()
      setfilters(data1.data)    
      setposts(resp.data)     
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
                          tags2.map((element,index)=>{
                            values.vari[index]=element.name
                            return null
                            
                          })
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
                              
                              <div className="col-12">
                                <label>Product Name</label>
                              <Multiselect
                             placeholder="Product Name" 
                            options={filters} // Options to display in the dropdown
                            name="vari"
                            onSelect={(selectedList, selectedItem) => {
                              settags2(selectedList);
                            }}
                            onRemove={(selectedList, removedItem) => {
                              settags2(selectedList);
                            }}
                            style={{ border: "1px solid #353957" , color:"white" ,overflow:"none"}}
                            displayValue="productname1" // Property name to display in the dropdown options
                          />
                              </div>
                              
                                 

                            
                                <ErrorMessage
                                  name="vari"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            <div className=" row mx-1 mt-3">
                            
                                
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
                            <th scope="col"> Discount</th>
                                               
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