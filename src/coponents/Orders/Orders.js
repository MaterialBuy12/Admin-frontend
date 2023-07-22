import React, { useEffect, useState } from "react";
import { Orderget } from "../../services/api";
import Pagination from "../categories/categories/Pagination";
import Footer from "../footer/Footer";
import OrdersPosts from "./OrdersPosts";
function Orders() {
  const [ord, setord] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  // total no of pages
  const Totalpages = Math.ceil(ord.length / postsPerPage);
  const pages = [...Array(Totalpages + 1).keys()].slice(1);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ord.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    async function data() {
      let dat = await Orderget();

      setord(dat.data.data.orders);
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
                  <h4 className="page-title">Orders</h4>
       
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Order List</h4>
                    <form class="d-flex w-10" role="search">
      <input class="form-control w-5 mx-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-dark btn-dark text-white" type="submit">Search</button>
    </form>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Sr no</th>
                            <th>Products</th>

                            <th scope="col">User Name</th>

                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>

                            <th scope="col" colSpan="5">
                              Action
                            </th>
                            <th></th>
                            <th scope="col">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <OrdersPosts posts={currentPosts} />
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

export default Orders;
