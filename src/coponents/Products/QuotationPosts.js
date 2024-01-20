import React, {useState} from "react";
import { Quotationdeleted } from "../../services/api";

function QuotationPosts({ posts }) {
  const [img, setImg] = useState("");
  const remove = async (i) => {
    let dat = await Quotationdeleted(i._id);
    if (!dat.status) {
      alert(dat);
      window.location.reload();
    } else {
      alert("Something went wrong");
      window.location.reload();
    }
  };
  const detailsChangeHanlder = (i) => {
    setImg(i);
  };
  return (
    <>
      {posts &&
        posts.map((i) => (
          <tr key={i._id}>
            <td>
              <span>{i.name}</span>
            </td>
            <td>
              <span>{i.email}</span>
            </td>
            <td>
              <span>{i.phoneno}</span>
            </td>
            <td>
              <span>{i.description}</span>
            </td>
            <td>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => detailsChangeHanlder(i.img)}
              >
                Details
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      Image
                      <button
                        type="button"
                        className="btn rounded btn-md my-1 btn-outline-secondary btn-dark"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        {" "}
                        <i
                          className="fa fa-times"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                    </div>
                    <div className="modal-body">
                    <img src={img} height="100%" width="100%" alt="..." />
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
              {/* <img src={i.img} height="80px" width="80px" alt="..." /> */}
            </td>
            <th scope="col">
              <button
                className="btn btn-danger m-2"
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

export default QuotationPosts;
