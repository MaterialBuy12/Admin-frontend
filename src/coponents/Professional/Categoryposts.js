import React, { useState} from "react";
import { Link } from "react-router-dom";
import { profecatedeleted } from "../../services/api";

function Categoryposts({ posts }) {
  const [description, setDescription] = useState("");
  const remove = async (i) => {
    let dat = await profecatedeleted(i._id);
    if (dat.status) {
      alert("DELETED", dat.data);
      window.location.reload();
    } else {
      alert("Something went wrong");
      window.location.reload();
    }
  };

  const detailsChangeHanlder = (i) => {
    setDescription(i.replace(/<[^>]+>/g, ""));
  };
  return (
    <>
      {posts &&
        posts.map((i, index) => (
          <tr key={i._id}>
            <th> {index + 1}</th>
            <th> {i.catprof}</th>
            <th>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => detailsChangeHanlder(i.descr)}
              >
                Details
              </button>

              {/* {i.descr.replace(/<[^>]+>/g, "")} */}

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <label className="modal-body__content">
                        {" "}
                        {description}
                      </label>
                      <br />
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </th>

            <th>
              <Link to={`/update/profe/cat/${i._id}`}>
                <button className="btn btn-dark btn-lg">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </Link>{" "}
              <button
                className="btn btn-danger mx-2 px-2"
                onClick={(e) => {
                  remove(i);
                }}
              >
                Remove
              </button>
            </th>
          </tr>
        ))}
    </>
  );
}

export default Categoryposts;
