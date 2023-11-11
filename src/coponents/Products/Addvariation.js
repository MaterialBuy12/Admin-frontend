import React, { useState, useEffect } from "react";
import { Productget } from "../../services/api";
import Pagination from "../categories/categories/Pagination";
import Footer from "../footer/Footer";
import Addvariantsposts from "./Addvariantsposts";
function Addvariation() {
  // eslint-disable-next-line
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
      let dat = await Productget();

      setposts(dat.data);
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
                  <h4 className="page-title">Add variants</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Add variants</h4>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col"> Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Discount Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Weight</th>

                            <th scope="col" colSpan="2">
                              Add variant
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <Addvariantsposts posts={currentPosts} />
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

export default Addvariation;
