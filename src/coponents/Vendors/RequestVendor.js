import { React, useState, useEffect } from "react";
import { vandorfalse } from "../../services/api";
import Footer from "../footer/Footer";
import Requestvendorposts from "./Requestvendorposts";
import Pagination from "../categories/categories/Pagination";
// import {  useNavigate } from 'react-router-dom'
function RequestVendor() {
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

  // const navigate=useNavigate()
  // eslint-disable-next-line
  useEffect(() => {
    async function data() {
      let dat = await vandorfalse();

      setposts(dat);
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
                  <h4 className="page-title">Requests </h4>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  < div className="card-body">
         
                    <h4 className="mt-0 header-title mb-4">Vendor List 
        
    </h4>
                                       
                   <form class="d-flex w-10" role="search">
      <input class="form-control w-5 mx-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-dark btn-dark text-white" type="submit">Search</button>
    </form>  
                    



                    <div className="table-responsive">
                      
                      
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col"> Sr No.</th>
                            <th scope="col"> Name</th>
                            <th scope="col">Email</th>

                            <th scope="col">Phone No.</th>
                            <th scope="col">GST</th>
                            <th scope="col">Address</th>
                            <th scope="col" colSpan="2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <Requestvendorposts posts={currentPosts} />
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

export default RequestVendor;
