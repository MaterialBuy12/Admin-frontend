import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { updatevendor, shippingprice } from "../../services/api";
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



  const handleVendorSelect = async () => {
    try {
      console.log("updating selected vendor")
      let data = await updatevendor(selectedPorId, selectedProductId, selectedVendorId);
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating selected vendor:", error);
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
    setSelectedproductprice(productprice);
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
    console.log(data);
    console.log(data.data.shipCost, data.data.pricesresult);

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
                    {item.vendors.find(vendor => vendor.vendorid === item.selectedvendor)?.vendorEmail}
                  </th>
                  <th>
                    {item.vendors.find(vendor => vendor.vendorid === item.selectedvendor)?.phoneNo}
                  </th>
                  <th>{item.quantity}</th>
                  <th>{item.totalPrice}</th>
                  <th>{item.vendorStatus}</th>
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





          {/* Your form to select vendor goes here */}
          {selectedPorId && selectedProductId && (
            <select
              value={selectedVendorId}
              onChange={(e) => setSelectedVendorId(e.target.value)}
            >
              {porData.find(por => por._id === selectedPorId)
                ?.products.find(product => product.productid === selectedProductId)
                ?.vendors.map((vendor, vendorIndex) => (
                  <option key={vendorIndex} value={vendor.vendorid}>
                    {vendor.vendorName}
                  </option>
                ))}
            </select>
          )}
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
