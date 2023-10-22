import React from "react";
import { normalusers, orderput } from "../../services/api";
import useState from 'react-usestateref';
import moment from 'moment'
function OrdersPosts({ posts }) {
  const [sta, setsta] = useState("PENDING");
  const [details, setDetails] = useState([]);
  const [cate, setcate] = useState([]);
  const [subcate, setsubcate] = useState([]);
  const [subsubcate, setsubsubcate] = useState([]);
  const [skuid, setskuid] = useState([]);
  const [discounted, setdiscounted] = useState([]);
  const [emails, setemails] = useState([]);
  const [mobile, setmobile] = useState([]);
  const [shipping, setshipping] = useState([]);
  const [billing, setbilling] = useState([]);
  
  const handleSubmit = async (orders, productid) => {
    let data = await orderput(orders.order.user,productid, { status: sta });
    if (data.status === 200) {
      alert("SUCCESSFULL");
      window.location.reload();
    }
  };

  return (
    <>
      {posts &&
        posts?.map((i, index) => 
          {
            console.log(i)
            return   i.products.map((p,productindex) => (
              <tr key={i._id}>
            <th> {index + 1}</th>
              <th scope="col">
             
                        <span key={p._id}>
                    {p.productname1}
                  </span>
                  </th>
                  <th scope="col">
                  {
                    (()=>{
                      
                      let userName;
                      const user = i.order.user
                      i.user.map((usernames)=>{
                        if(user === usernames._id){
                          userName = usernames.username;
                          return 
                        }     
                      })
  
                   
                    
                      return userName
                    })()
                  }
                  </th>
                  <th>{
                    (()=>{
                      
                      let quantity;
                      const status = i.order.products.map((prod)=>{
                        
                        if(prod.vairanceid){
                         
                          if(prod.vairanceid === p._id){
                            quantity = prod.quantity;
                          }
                        }
                        if(prod.productid === p._id){
                         
                          quantity = prod.quantity;
                        }
                      })
  
                      if (
                        quantity >= p.minimum1 &&
                        quantity <= p.maximum1
                      ) {
                        return quantity * p.price1;
                      } else if (
                        quantity >= p.minimum2 &&
                        quantity <= p.maximum2
                      ) {
                        return quantity * p.price2;
                      } else if (
                        quantity >= p.minimum3 &&
                        quantity <= p.maximum3
                      ) {
                        return quantity * p.price3;
                      } else if (
                        quantity >= p.minimum4 &&
                        quantity <= p.maximum4
                      ) {
                        return quantity * p.price4;
                      } else if (
                        quantity >= p.minimum5 &&
                        quantity <= p.maximum5
                      ) {
                        return quantity * p.price5;
                      } else if (
                        quantity >= p.minimum6 &&
                        quantity <= p.maximum6
                      ) {
                        return quantity * p.price6;
                      } else {
                        return "0";
                      }
  
                      return quantity
                    })()
                  }</th>
  
                  <th>
                <button className="btn btn-success">
                  {
                    (()=>{
                      let newstatus;
                      const status = i.order.products.map((prod)=>{
                       
                        if(prod.vairanceid){
                         
                          if(prod.vairanceid === p._id){
                            newstatus = prod.status;
                            return
                          }
                        }
                        if(prod.productid === p._id){
                         
                          newstatus = prod.status;
                          return
                        }
                      })
                      // console.log(newstatus, "gh");
                      return newstatus
                    })()
                  }
                </button>
              </th>
              
            
  
              <th colSpan="5">
                <select
                  onChange={(i) => {
                    setsta(i.target.value);
                  }}
                  className={`form-control  shadow-none mx-1`}
                  name="statu"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="RETURN">RETURN</option>
                  <option value="IN TRANSIT">IN TRANSIT</option>
                  <option value="REFUND">REFUND</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </th>
  
              <th>
                <input
                  type="submit"
                  onClick={() => handleSubmit(i, p._id )}
                  className="btn mt-2 rounded-3 w-20  btn-sm btn-outline-secondary btn-dark"
                  value="Submit"
                />
              </th>
  
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
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
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5>{details}</h5>
  
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body" key={productindex}>                    
  
                        <label>Category:  { p.categoryid }</label>
                        <br />
                        <label>Sub Category: {subcate}</label>
                        <br />
                        <lacatbel>Sub Sub Category : {subsubcate}</lacatbel>
                        <br />
                        <label> SKUID :{skuid}</label>
                        <br />
                        <label>Discounted Price : {discounted}</label>
                        <br />
                        {console.log(i.order.paymentId,"paymengts")}
                        <label> Payment Id : {i.order.paymentId}</label>
                        <br />
                        <label>Email :{  (()=>{
                      
                      let email;
                      const user = i.order.user
                      i.user.map((usernames)=>{
                        if(user === usernames._id){
                          email = usernames.email;
                          return 
                        }     
                      })
                      return email
                    })()}</label>
                        <br />
                        <label> Address : {i.address}</label>
                        <br />
                        <label> Mobile No :{mobile} </label>
                        <br />
                        <label>
                          Shipping Address: {shipping} {billing}
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
              <th scope="col">{moment(`${i.order.createdAt}`).format(' Do MMMM YYYY')}</th>
              <th scope="col">{moment(`${i.order.createdAt}`).format("LTS")}</th>
                  
  
              
              
              
  
           
  
             
            
            
            </tr>
          ))
          }
          
          
        
        )}
        
    </>
  );
}

export default OrdersPosts;
