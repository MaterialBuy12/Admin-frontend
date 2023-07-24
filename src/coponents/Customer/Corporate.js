import React, { useState, useEffect } from "react";
import Pagination from "../categories/categories/Pagination";
import { corporateusers } from "../../services/api";
import Footer from "../footer/Footer";
import CorporatePosts from "./CorporatePosts";
function Corporate() {
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
      let dat = await corporateusers();
      console.log("dat1256", dat.data);
      setposts(dat.data);
    }

    data();
  }, []);
  return (
    <>
 {localStorage.getItem("token")?<>     <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center"></div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Corporate List</h4>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile no</th>
                            <th scope="col">Email</th>
                            <th scope="col">GST</th>
                            <th scope="col">Billing Address</th>
                            <th scope="col">Shipping Address</th>
                            

                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <CorporatePosts posts={currentPosts} />
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
      </div></>:window.location.href="/"}
    </>
  );
}

export default Corporate;