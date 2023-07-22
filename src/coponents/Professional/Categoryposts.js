import React from 'react';
import { Link } from 'react-router-dom';
import { profecatedeleted } from '../../services/api';

function Categoryposts({posts}) {
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
  return (
    <>
      {posts &&
        posts.map((i,index) => (
          <tr key={i._id}>
            <th> {index+1}</th>
            <th> {i.catprof}</th>
            <th> {i.descr}</th>

          
          
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
