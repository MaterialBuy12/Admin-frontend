import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { updatevendor, shippingprice, warehouseget, confirm_vendor } from "../../services/api";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const StatusPosts = ({ porData }) => {
  let srno = 0;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedPorId, setSelectedPorId] = useState(null);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedproductprice, setSelectedproductprice] = useState("");
  const [selectedproductadmshipprice, setSelectedproductadmshipprice] = useState("");
  const [vendorprice, setVendorprice] = useState("");
  const [vendorshipprice, setVendorshipprice] = useState("");
  const [vendortotal, setVendortotal] = useState("");
  const [dataofship, setDataofship] = useState([]);
  const [warehouse, setwarehouse] = useState([]);
  const [warehouseid, setwarehouseid] = useState("");

  const handlewarehousechange = async (e) => {
    console.log("getting data");
    const selectedwaresouseid = e.target.value
    setwarehouseid(selectedwaresouseid);
    const warehouseIndex = dataofship.vendorWareHouse.findIndex(
      (vendor) => vendor.warehouseid === warehouseid
    );
    console.log(warehouseIndex);

    if (warehouseIndex !== -1) {
      let shprice = parseFloat(dataofship.shipCost[warehouseIndex]);
      let tprice = parseFloat(dataofship.pricesresult[warehouseIndex]);
      setVendorshipprice(shprice);
      setVendorprice(tprice);
      console.log(vendorprice, vendorshipprice);
      setVendortotal(shprice + tprice);
      // Assuming total is price + shipping cost
    } else {
      // Handle case where vendor is not found
      setVendorshipprice('');
      setVendorprice('');
      setVendortotal('');
    }
  }

  const handleVendorSelect = async () => {
    try {
      console.log("updating selected vendor")
      let data = await updatevendor(selectedPorId, selectedProductId, selectedVendorId, warehouseid);
      console.log(data);
      alert(data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating selected vendor:", error);
    }
  };

  const handleVendorChange = async (e) => {
    const selectedVendorId = e.target.value;
    setSelectedVendorId(selectedVendorId);

    let dat = await warehouseget(
      selectedVendorId
    );
    console.log(dat);
    setwarehouse(dat);
    setwarehouseid(dat[0].value);

    // Find the index of the selected vendor in vendordetail array
    const vendorIndex = dataofship.vendorWareHouse.findIndex(
      (vendor) => vendor.vendorid === selectedVendorId
    );
    console.log(vendorIndex);

    // If the vendor is found, update prices using the index
    if (vendorIndex !== -1) {
      let shprice = parseFloat(dataofship.shipCost[vendorIndex]);
      let tprice = parseFloat(dataofship.pricesresult[vendorIndex]);
      setVendorshipprice(shprice);
      setVendorprice(tprice);
      console.log(vendorprice, vendorshipprice);
      setVendortotal(shprice + tprice);
      // Assuming total is price + shipping cost
    } else {
      // Handle case where vendor is not found
      setVendorshipprice('');
      setVendorprice('');
      setVendortotal('');
    }
  };

  // const redirectToOtherPage = (orderId, productId) => {
  //   // Redirect to another page with orderId and productId
  //   navigate(`/porrequest?orderId=${orderId}&productId=${productId}`);
  // };

  const handleOpenModal = async (porId, productId, productname, productprice, productqunatity, admshipprice, productvarient, productpin) => {
    setSelectedPorId(porId);
    setSelectedProductId(productId);
    setSelectedProductName(productname);
    setSelectedproductprice(parseFloat(productprice));
    setSelectedQuantity(productqunatity);
    setSelectedproductadmshipprice(parseFloat(admshipprice));

    const apiFormData = {
      pincode: productpin || '',
      productid: productId || '',
      variantid: productvarient || '',
      quantity: parseInt(productqunatity, 10) || 0,
    };
    console.log(apiFormData)
    let data = await shippingprice(apiFormData);
    console.log(data.data);
    setDataofship(data.data)

    function addArrays(arr1, arr2) {
      // Check if both arrays have the same length
      if (arr1.length !== arr2.length) {
        throw new Error("Arrays must have the same length");
      }

      let result = [];

      // Iterate over the arrays and add corresponding elements
      for (let i = 0; i < arr1.length; i++) {
        // Convert string representations to numbers if necessary
        const num1 = typeof arr1[i] === 'string' ? parseFloat(arr1[i]) : arr1[i];
        const num2 = typeof arr2[i] === 'string' ? parseFloat(arr2[i]) : arr2[i];

        result.push(num1 + num2);
      }

      return result;
    }

    const sumArray = addArrays(data.data.shipCost, data.data.pricesresult);
    console.log(sumArray);


    function findIndexOfMinValue(array) {
      let minValue = array[0];
      let minIndex = 0;

      for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
          minValue = array[i];
          minIndex = i;
        }
      }

      return minIndex;
    }
    const minIndex = findIndexOfMinValue(sumArray);

    console.log("Index of minimum value:", minIndex);
    let total = (sumArray[minIndex]);
    let rounded_value = total.toFixed(2);
    setVendortotal(rounded_value);
    setVendorshipprice(data.data.shipCost[minIndex]);
    setVendorprice(data.data.pricesresult[minIndex]);



    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleVendorSelection = (vendorId) => {
    setSelectedVendorId(vendorId);
    setShowModal(false);
    handleVendorSelect();
  };

  const approve = async (porid, productid) => {
    let dat = await confirm_vendor(porid, productid);
    console.log(dat);
    if (dat == "confirmed") {
      alert(dat);

    } else {
      alert("Something went wrong");
    }
  };




  return (
    <>
      {porData &&
        porData.map((innerArray, index) => (
          <React.Fragment key={index}>
            {innerArray.products.map((item, itemIndex) => {
              srno++;
              return (
                <tr key={itemIndex}>
                  <th>{srno}</th>
                  <th>{innerArray.OrdID}</th>
                  <th>{innerArray.username}</th>
                  <th>{item.productName}</th>
                  <th>
                    {item.vendors.find(vendor => vendor.vendorid === item.selectedvendor)?.vendorName}
                  </th>
                  <th>
                    {item.warehouseName}
                  </th>
                  <th>
                    {item.vendors.find(vendor => vendor.vendorid === item.selectedvendor)?.vendorEmail}
                  </th>
                  <th>
                    {item.vendors.find(vendor => vendor.vendorid === item.selectedvendor)?.phoneNo}
                  </th>
                  <th>{item.quantity}</th>
                  <th>{item.totalPrice}</th>
                  <th>{item.vendorStatus ? (
                    <>
                      <button className="btn btn-success mt-2">Approved</button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={(e) => {
                          approve(innerArray._id, item.productid);
                        }}
                      >
                        PENDING
                      </button>
                    </>
                  )}</th>
                  <th>
                    <Button onClick={() => handleOpenModal(innerArray._id, item.productid, item.productName, item.totalPrice, item.quantity, item.adminshippingprice, item.varientid, item.pincode)}>Select Vendor</Button>
                  </th>
                </tr>
              )
            })}
          </React.Fragment>
        ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Product Name:</strong> {selectedProductName}</p>
          <p><strong>Product Quantity:</strong> {selectedQuantity}</p>
          <p><strong>Admin price:</strong> {selectedproductprice}</p>
          <p><strong>Admin shipping price:</strong> {selectedproductadmshipprice}</p>
          <p><strong>Admin totalprice:</strong> {selectedproductprice + selectedproductadmshipprice}</p>
          <p><strong>Vendor price:</strong> {vendorprice}</p>
          <p><strong>Vendor shipping price:</strong> {vendorshipprice}</p>
          <p><strong>Vendor total price:</strong> {vendortotal}</p>






          {selectedPorId && selectedProductId && (
            <div>
              <label>Select Vendor:</label>
              <select
                value={selectedVendorId}
                onChange={handleVendorChange}
              >
                {porData.find(por => por._id === selectedPorId)
                  ?.products.find(product => product.productid === selectedProductId)
                  ?.vendors.map((vendor, vendorIndex) => (
                    <option key={vendorIndex} value={vendor.vendorid}>
                      {vendor.vendorName}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div>
            <label>Select Warehouse:</label>
            <select
              value={warehouseid}
              onChange={handlewarehousechange}
            >
              {warehouse.map((warehouse, index) => (
                <option key={index} value={warehouse.value}>
                  {warehouse.label}
                </option>
              ))}
            </select>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleVendorSelection}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
