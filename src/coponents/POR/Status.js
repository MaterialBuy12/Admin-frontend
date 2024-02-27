import React, {useState, useEffect} from "react";
import Footer from "../footer/Footer";
import Pagination from "../categories/categories/Pagination";
import { StatusPosts } from "./StatusPosts";
import { porStatus } from "../../services/api";

function Status() {
  const [posts, setposts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  // total no of pages
  const Totalpages = Math.ceil(posts?.length / postsPerPage);
  const pages = [...Array(Totalpages + 1).keys()]?.slice(1);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function data() {
      let dat = await porStatus();
      console.log(dat);
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
                  <h4 className="page-title">POR status</h4>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-right"></ol>
                </div>
              </div>
            </div>

            <div className="row d-md-flex justify-content-md-end ">
              <div className="col-sm-6 d-md-flex justify-content-md-end"></div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">POR status</h4>

                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Sr no</th>
                            <th>OrderId</th>
                            <th>UserName</th>
                            <th>Product Name</th>
                            <th scope="col">Vendor Name</th>
                            <th scope="col">Warehouse Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Quantity</th>
                            <th> Total Price</th>
                            <th scope="col">Request Status</th>
                            <th scope="col">Select Vendor</th>

                          </tr>
                        </thead>
                        <tbody>
                        <StatusPosts porData={currentPosts} />

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

export default Status;
