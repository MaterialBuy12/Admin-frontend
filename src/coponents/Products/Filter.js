import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import FilterForm from "./FilterForm";
import { Filterget } from "../../services/api";
import Pagination from "../categories/categories/Pagination";
import Filterposts from "./Filterposts";

function Filter() {
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
      let dat = await Filterget();

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
                  <h4 className="page-title">Add Filter</h4>
                </div>
                <div className="col-sm-6"></div>
              </div>
            </div>

            <FilterForm />
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card m-b-30">
                <div className="card-body">
                  <h4 className="mt-0 header-title mb-4">Filter List</h4>

                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col"> Filter</th>
                          <th scope="col">Attributres</th>

                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Filterposts posts={currentPosts} />
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
        <Footer />
      </div>
    </>
  );
}

export default Filter;
