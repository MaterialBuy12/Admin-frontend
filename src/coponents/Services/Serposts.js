import React from "react";
import { servicesdeleted } from "../../services/api";

function Serposts({ posts }) {
  const remove = async (i) => {
    console.log("deletd id", i._id);
    let dat = await servicesdeleted(i._id);
    if (dat.status) {
      alert("SERVICES DELETED", dat.data);
      window.location.reload();
    } else {
      alert("Something went wrong");
      window.location.reload();
    }
  };
  return (
    <>
      {posts &&
        posts.map((i,index) => (
          <tr key={i._id}>
            <th> {index+1}</th>
            <th> {i.service}</th>
            <th> {i.descr.replace(/<[^>]+>/g, '')}</th>

            <th>
              {" "}
              <img
                target="blank"
                alt="....."
                src={i.img}
                height="70px"
                width="80px"
              ></img>
            </th>

            <th>{i.email} </th>
            <th>
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

export default Serposts;
