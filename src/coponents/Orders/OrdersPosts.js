import React from "react";
import { orderput } from "../../services/api";
import useState from 'react-usestateref';
function OrdersPosts({ posts }) {
  const [sta, setsta] = useState("PENDING");
  const [details, setDetails] = useState([]);
  const [cate, setcate,refe] = useState([]);
  const [subcate, setsubcate] = useState([]);
  const [subsubcate, setsubsubcate] = useState([]);
  const [skuid, setskuid] = useState([]);
  const [discounted, setdiscounted] = useState([]);
  const [emails, setemails] = useState([]);
  const [mobile, setmobile] = useState([]);
  const [shipping, setshipping] = useState([]);
  const [billing, setbilling] = useState([]);
  
  const handleSubmit = async (i) => {
    let data = await orderput(i, { status: sta });
    if (data.status === 200) {
      alert("SUCCESSFULL");
      window.location.reload();
    }
  };

  const showDetails = (index) => {
    
  
      const productName = posts[index].products_docs.map((p) => p.productname1);
      const category = posts[index].products_docs.map((p) => p.categoryid);
      
      const subcategory = posts[index].products_docs.map((p) => p.subcategory);
      const subsubcategory = posts[index].products_docs.map(
        (p) => p.subsubcategory
      );
      const discountedprice2b = posts[index].products_docs.map(
        (p) => p.discountprice2B
      );
      const skuid1 = posts[index].products_docs.map((p) => p.skuid5);
      const email = posts[index].user_docs.map((p) => p.email);
      const mobilep = posts[index].user_docs.map((p) => p.phoneno);
      const shipping1 = posts[index].user_docs.map((p) => p.shippingaddress);
      const billing1 = posts[index].user_docs.map((p) => p.billingaddress);
      setemails(email);
      setDetails(productName,);
      setcate(category);
      setsubcate(subcategory);
      setsubsubcate(subsubcategory);
      setskuid(skuid1);
      setdiscounted(discountedprice2b);
      setmobile(mobilep);
      setshipping(shipping1);
      setbilling(billing1);
    
  };

  return (
    <>
      {posts &&
        posts?.map((i, index) => (
          <tr key={i._id}>
            <th> {index + 1}</th>
            <th scope="col">
              {i.products_docs.map((p) => (
                <span key={p._id}>
                  {p.productname1}
                  {i.products_docs.length > 1 ? <>,</> : <></>}
                </span>
              ))}
            </th>
            

            <th scope="col">
              {i.user_docs.map((k) => (
                <span key={k._id}>{k.username}</span>
              ))}
            </th>

            <th>{i.amount}</th>
            <th>
              <button className="btn btn-success">{i.status}</button>
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
                onClick={() => handleSubmit(i._id)}
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
                onClick={() => showDetails(index)}
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
                    <div className="modal-body">
                    

                      <label>Category: {cate }</label>
                      <br />
                      <label>Sub Category: {subcate}</label>
                      <br />
                      <label>Sub Sub Category : {subsubcate}</label>
                      <br />
                      <label> SKUID :{skuid}</label>
                      <br />
                      <label>Discounted Price : {discounted}</label>
                      <br />
                      <label> Payment Id : {i.paymentId}</label>
                      <br />
                      <label>Email :{emails}</label>
                      <br />
                      <label> Address : {i.address}</label>
                      <br />
                      <label> Mobile No :{mobile} </label>
                      <br />
                      <label>
                        Shipping Address: {shipping} {billing}
                      </label>
                      <br />

                      {/* <label>Billing Address :</label> */}
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
          </tr>
        ))}
    </>
  );
}

export default OrdersPosts;
