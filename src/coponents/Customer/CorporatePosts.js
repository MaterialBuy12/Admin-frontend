import React from 'react';
import { changerole } from '../../services/api';
function CorporatePosts({posts}) {
    const remove=async(i) =>{
        
        let dat=await changerole(i._id,{ "role":"Customer"})
        if(dat.status){
            alert("ROLE CHANGED TO CUSTOMER",dat.data)
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
                            <td><span>{i.username}</span></td>
                            <td><span>{i.phoneno}</span></td>
                            <td><span>{i.email}</span></td>
                            <td><span>{i.gst}</span></td>
                            <td><span>{i.role}</span></td>
                            <td><span>{i.billingaddress}</span></td>
                            <td><span>{i.shippingaddress}</span></td>
                            <td><span><button className='btn btn-success rounded '  onClick={(e) => {
                                remove(i)
                            }}>Move to  Normal</button></span></td>




                        </tr>
                    )
                )
            }
    </>
  );
}

export default CorporatePosts;
