import React from "react";

export const StatusPosts = (porData) => {
  return (
    <>
      {porData &&
        porData.map((i, index) => (
          <tr key={i._id}>
            <th> {index + 1}</th>
            <th> {i.productname1}</th>

            {/* <th>
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

            {/* <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                    Description
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
              </div> */}
            {/* </th> */}

            <th>{i.vendorname} </th>
            <th>{i.email} </th>
            <th>{i.phonenumber} </th>
            <th>{i.quantity} </th>
            <th>{i.totalPrice} </th>
            <th>{i.requestStatus} </th>
          </tr>
        ))}
    </>
  );
};
