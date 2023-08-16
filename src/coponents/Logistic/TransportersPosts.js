import React from 'react';
import { Transporterdelete } from '../../services/api';

function TransportersPosts({posts}) {
    const remove=async(i) =>{

        let dat=await Transporterdelete({"name":i.name})
        if(dat.status){
            alert("DELETED")
            window.location.reload()
        }else{
            alert("Something went wrong")
            window.location.reload()
        }
    }
  return (
    <>
   {
        posts && posts.map(
          (i,index) => (
            <tr key={i._id}>

              <td><span>{index+1}</span></td>
              <td><span>{i.name}</span></td>
              <td><span>{i.mobileno}</span></td>
              <td><span>{i.emailid}</span></td>
              <td><span>{i.gst}</span></td>
              <td><span>{i.address}</span></td>
              <td><span>{i.rate.replace(/<[^>]+>/g, '')}</span></td>
              <td> <button className='btn btn-danger m-2' onClick={(e) => {
                                remove(i)
                            }}>Remove</button></td>
              


            </tr>
          )
        )
      }

      
    </>
  );
}

export default TransportersPosts;
