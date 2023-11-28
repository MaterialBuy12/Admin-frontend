import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryfilter, getAllCategory } from "../../../services/api";
import Footer from "../../footer/Footer";
import Catepost from "./catepost";
import Pagination from "./Pagination";
function Categories() {
  // const navigate = useNavigate()
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
  const [searchedvalue, setsearchedvalue] = useState("");
  // eslint-disable-next-line
  useEffect(() => {
    async function data() {
      let dat = await getAllCategory();

      setposts(dat);
    }
    data();
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          {" "}
          <div className="content-page">
            <div className="content">
              <div className="container-fluid">
                <div className="page-title-box">
                  <div className="row align-items-center">
                    <div className="col-sm-6">
                      <h4 className="page-title">Categories</h4>
                    </div>
                    <div className="col-sm-6">
                      <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item">
                          <Link to="/">materialbuy</Link>
                        </li>
                        <li className="breadcrumb-item active">
                          <Link to="/categories">Categories</Link>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="row d-md-flex justify-content-md-end ">
                  <div className="col-sm-6">
                    <h4 className="page-title">Categories</h4>
                  </div>
                  <div className="col-sm-6 d-md-flex justify-content-md-end">
                    <Link to="/addcategories">
                      <button className="btn btn-secondary rounded-pill mb-3">
                        Add Categories
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="card m-b-30">
                      <div className="card-body">
                        <h4 className="mt-0 header-title mb-4">Category</h4>
                        <form
                          className="d-flex mb-2 "
                          style={{ width: "30%" }}
                          role="search"
                        >
                          <div className="btn-group">
                            <input
                              className="form-control  mx-2  btn-close"
                              type="search"
                              value={searchedvalue}
                              placeholder="Search category"
                              onChange={(e) => {
                                setsearchedvalue(e.target.value);
                              }}
                              aria-label="Search Email"
                            />
                            <button
                              type="button"
                              className="btn bg-transparent"
                              style={{ left: "-43px" }}
                              onClick={async () => {
                                let dat = await getAllCategory();
                                setposts(dat);
                                setsearchedvalue("");
                              }}
                            >
                              <i
                                className="fa fa-times"
                                style={{ color: "white" }}
                              ></i>
                            </button>
                            <button
                              className="btn btn-outline-dark btn-dark text-white"
                              type="submit"
                              onClick={async (e) => {
                                e.preventDefault();
                                if (searchedvalue) {
                                  let dat = await categoryfilter(searchedvalue);
                                  setposts(dat.data);
                                } else {
                                  let dat = await getAllCategory();
                                  setposts(dat);
                                }
                              }}
                            >
                              Search
                            </button>
                          </div>
                        </form>

                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">Category Name</th>
                                <th scope="col">Image</th>

                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <Catepost posts={currentPosts} />
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
      ) : (
        (window.location.href = "/")
      )}
    </>
  );
}

export default Categories;
