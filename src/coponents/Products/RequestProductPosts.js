import React,{ useState, useEffect } from 'react';
import { ProductRequest21, vendorget } from '../../services/api';

function RequestProductPosts({posts}) {
  const [vendors, setVendors] = useState({});
  useEffect(() => {
    // Fetch vendor data for each post
    const fetchVendorData = async () => {
      for (const post of posts) {
        try {
          const response = await vendorget('651e852ec38d000033c86b02'); // Assuming vendorget API function exists
          console.log("vendors",response.data)
          if (response.status) {
            // Store vendor data in the state using the post ID as the key
            setVendors((prevVendors) => ({
              ...prevVendors,
              [post._id]: response.data.name,
            }));
          }
        } catch (error) {
          console.error(`Error fetching vendor data for post `, error);
        }
      }
    };

    fetchVendorData();
  }, []);

    const remove = async (i) => {

        let dat = await ProductRequest21(i._id)
        if (dat.status) {
          alert(dat.data)
          window.location.reload()
        } else {
          alert("Something went wrong")
          window.location.reload()
        }
      }
  return (
    <>
     {
        posts && posts.map(
          (i) => (
            <tr key={i._id}>

              <td>

              {
                (
                  async () => {
                    try {
                      const response = await vendorget('651e852ec38d000033c86b02'); // Assuming vendorget API function exists
                      console.log("vendors",response.data)
                      if (response.status) {
                        // Store vendor data in the state using the post ID as the key
                         return response.data.name
                      }
                    } catch (error) {
                      console.error(`Error fetching vendor data for post `, error);
                    }
                  }
                )
              }
              
              
              </td>
              <td><span>{i.warehouse_docs.map((j)=>(
                <span key={j._id}>{j.name}</span>
              ))}</span></td>
              <td><span>{i.product_docs.map((j)=>(
                <span key={j._id}>{j.productname1}</span>
              ))}</span></td>
              
            
              <td>{i.status?<><button className='btn btn-success mt-2' >Approved</button></>:<><button className='btn btn-danger mt-2' onClick={(e) => {
                  remove(i)
                }}>PENDING</button></>}</td>
             
             





            </tr>
          )
        )
      }


      
    </>
  );
}

export default RequestProductPosts;
