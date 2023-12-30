import React from "react";
import { Link } from "react-router-dom";
import { mainProductdelete } from "../../services/api";

function Addvariantsposts({ posts }) {
  const remove = async (i) => {
    let dat = await mainProductdelete(i);
    if (dat.status) {
      alert(" DELETED", dat.data);
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
              <span>{i.productname1}</span>
            </td>
            <td>
              <img src={i.imgs1} alt="..." height="80px" weight="80px" />
            </td>
            <td>
              <span>{i.price2A}</span>
            </td>
            <td>
              <span>{i.discountprice2B}</span>
            </td>
            <td>
              <span>{i.vari1}</span>
            </td>
            <td>
              <span>{i.vari2}</span>
            </td>
            <td>
              <span>{i.vari3}</span>
            </td>
            <td>
              <span>{i.vari4}</span>
            </td>
            <td>
              <span>{i.stock6}</span>
            </td>
           

            <th scope="col" colSpan="2">
              <Link to={`/update/addvariant/${i._id}`}>
                <button className="btn btn-dark btn-lg">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </Link>
            </th>
            <th>
            <button
                  className="btn btn-danger btn-lg mx-2"
                  onClick={(e) => {
                    remove(i._id);
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

export default Addvariantsposts;
