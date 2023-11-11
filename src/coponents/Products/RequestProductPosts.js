import React, { useState } from "react";
import { ProductRequest21, vendorget } from "../../services/api";

function RequestProductPosts({ posts }) {

  async function fetchVendorData() {
    // console.log(id,"hello")
    try {
      const response = await vendorget("6529370f965a4424bc52e35e");
      if (response.status) {
        console.log("data",response)
      }
    } catch (error) {
      alert(`Error fetching vendor data for post `, error);
    }
  }

  const remove = async (i) => {
    let dat = await ProductRequest21(i._id);
    if (dat.status) {
      alert(dat.data);
      window.location.reload();
    } else {
      alert("Something went wrong");
      window.location.reload();
    }
  };

  return (
    <>
      {posts &&
        posts.map((i) => (
          <tr key={i._id}>
            <td>
              <span>{i.vendorid}</span>
            </td>
            <td>
              <span>
                {i.warehouse_docs.map((j) => (
                  <span key={j._id}>{j.name}</span>
                ))}
              </span>
            </td>
            <td>
              <span>
                {i.product_docs.map((j) => (
                  <span key={j._id}>{j.productname1}</span>
                ))}
              </span>
            </td>
            <td>
              {i.status ? (
                <>
                  <button className="btn btn-success mt-2">Approved</button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={(e) => {
                      remove(i);
                    }}
                  >
                    PENDING
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
    </>
  );
}

export default RequestProductPosts;
