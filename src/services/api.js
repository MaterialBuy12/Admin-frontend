import axios from "axios";
let host = process.env.REACT_APP_HOST;
let host1 = process.env.REACT_APP_FLASKHOST;
export const Register = async (data) => {
  try {
    let response = await axios.post(`${host}/api/adminlogin/adminsignup`, data);
    return response;
  } catch (error) {
    alert(error.response.data.error);
  }
};

export const Loging = async (data) => {
  try {
    let response = await axios.post(`${host}/api/adminlogin/login`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// customer count /customerscount
export const Customercount = async () => {
  try {
    let response = await axios.get(`${host}/api/users/customerscount`);

    return response.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};
// vendors counter
export const Vendorcount = async () => {
  try {
    let response = await axios.get(`${host}/api/users/vendorscount`);

    return response.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};
// category
export const Category = async (data) => {
  try {
    let response = await axios.post(`${host}/api/categories/`, data);

    return response;
  } catch (error) {
    alert("Something went wrong");
  }
};
export const SubSubgetCategory = async () => {
  try {
    let response = await axios.get(`${host}/api/subsubcategories/`);

    return response.data;
  } catch (error) {
    alert("Something went wrong");
  }
};
export const SubSubgetACategory = async (id) => {
  try {
    let response = await axios.get(`${host}/api/subsubcategories/${id}`);

    return response.data;
  } catch (error) {
    alert("Something went wrong");
  }
};

export const SubSubUpdateCategory = async (id, values) => {
  try {
    let response = await axios.put(
      `${host}/api/subsubcategories/${id}`,
      values
    );

    return response;
  } catch (error) {
    alert("Something went wrong");
  }
};
// subcategory /api/subcategories
export const SubCategory = async (data) => {
  try {
    let response = await axios.post(`${host}/api/subcategories/`, data);

    return response;
  } catch (error) {
    alert("Something went wrong");
  }
};

// get a sub sub category
export const getASubCategory = async (id) => {
  try {
    let response = await axios.get(`${host}/api/subcategories/${id}`);
    return response.data;
  } catch (error) {
    console.log("error in getcategory", error);
  }
};
export const UpdateASubCategory = async (id, data) => {
  try {
    let response = await axios.put(`${host}/api/subcategories/${id}`, data);
    return response;
  } catch (error) {
    console.log("error in getcategory", error);
  }
};
export const deletedsubsubcate = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/subsubcategories/${id}`);
    return response;
  } catch (error) {}
};
export const cssdealsdelete = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/css/${id}`);
    return response;
  } catch (error) {}
};
export const deletedsubcate = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/subcategories/${id}`);
    return response;
  } catch (error) {}
};
export const deletedcate = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/categories/${id}`);
    return response;
  } catch (error) {}
};

export const UploadFile = async (data) => {
  try {
    let response = await axios.post(`${host}/api/categories/file/upload`, data);
    return response;
  } catch (error) {
    console.log("error in upload", error);
  }
};

export const getAllCategory = async () => {
  try {
    let response = await fetch(`${host}/api/categories/`, {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("error in get all category", error);
  }
};

export const getAllSubCategory = async () => {
  try {
    let response = await fetch(`${host}/api/subcategories/`, {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("error in get all category", error);
  }
};
// sub sub category  /api/subsubcategories
export const SubSubCategory = async (data) => {
  try {
    let response = await axios.post(`${host}/api/subsubcategories/`, data);

    return response;
  } catch (error) {
    alert("Something went wrong");
  }
};

// update the category

export const updatepercategory = async (data, id) => {
  try {
    let response = await axios.put(
      `${host}/api/categories/updatecategory/${id}`,
      data
    );
    return response;
  } catch (error) {
    console.log("error in the update ", error);
  }
};

export const Product = async (data) => {
  try {
    let response = await axios.post(`${host}/api/products/`, data);
    return response;
  } catch (error) {
    alert(error.response.data);
  }
};
export const Productget = async () => {
  try {
    let response = await axios.get(`${host}/api/products/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const Productname = async () => {
  try {
    let response = await axios.get(`${host}/api/products/productnames/names`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const Productcount = async () => {
  try {
    let response = await axios.get(`${host}/api/products/count/productcount`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const ProductAget = async (id) => {
  try {
    let response = await axios.get(`${host}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const ProductAUpdate = async (id, values) => {
  try {
    let response = await axios.put(`${host}/api/products/${id}`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const Productdelete = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/products/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (id) => {
  try {
    let response = await axios.get(`${host}/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log("error in getcategory", error);
  }
};

export const warehouse = async () => {
  try {
    let response = await axios.get(`${host}/api/warehouses/`);
    return response.data;
  } catch (error) {
    console.log("error in warehouse", error);
  }
};
export const warehouseupdated = async (id) => {
  try {
    console.log("warehouse id", id);
    let reposnse = await axios.put(`${host}/api/warehouses/approve/${id}`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

export const profecateupdated = async (id, values) => {
  try {
    let reposnse = await axios.put(
      `${host}/api/professionalcategories/${id}`,
      values
    );
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

export const profecategetone = async (id) => {
  try {
    let reposnse = await axios.get(`${host}/api/professionalcategories/${id}`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const warehousedeleted = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/warehouses/${id}`);
    return response;
  } catch (error) {
    console.log("error in warehouses");
  }
};

export const promocodepost = async (values) => {
  try {
    let response = await axios.post(`${host}/api/promocodes/`, values);
    return response;
  } catch (error) {
    console.log("error in the promo code post", error);
  }
};
export const promocodeget = async () => {
  try {
    let response = await axios.get(`${host}/api/promocodes/`);
    return response.data;
  } catch (error) {
    console.log("error in the promo code get", error);
  }
};
export const promocodeupdate = async (id, values) => {
  try {
    console.log("updates current");
    let reponse = await axios.put(
      `${host}/api/promocodes/currentstatus/${id}`,
      values
    );
    return reponse;
  } catch (error) {
    console.log(error);
  }
};
export const procatepost = async (values) => {
  try {
    let response = await axios.post(
      `${host}/api/professionalcategories`,
      values
    );
    return response;
  } catch (error) {
    console.log("error in procatpost", error);
  }
};
export const professionalapproved = async (id, values) => {
  try {
    let response = await axios.put(
      `${host}/api/professionals/approve/${id}`,
      values
    );
    return response;
  } catch (error) {
    console.log("error in procatpost", error);
  }
};
export const procateget = async () => {
  try {
    let response = await axios.get(`${host}/api/professionalcategories`);
    return response.data;
  } catch (error) {
    console.log("error in procateget");
  }
};

export const profaddpost = async (values) => {
  try {
    let response = await axios.post(`${host}/api/professionals`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const profget = async () => {
  try {
    let response = await axios.get(`${host}/api/professionals`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sercepost = async (values) => {
  try {
    console.log("meeee");
    let resposnse = await axios.post(`${host}/api/services`, values);
    return resposnse;
  } catch (error) {
    console.log(error);
  }
};

export const serceget = async () => {
  try {
    let resposnse = await axios.get(`${host}/api/services`);
    return resposnse.data;
  } catch (error) {}
};
export const professget = async () => {
  try {
    let resposnse = await axios.get(`${host}/api/professionalcategories/`);
    return resposnse.data;
  } catch (error) {}
};

export const sellerfre = async (values) => {
  try {
    let response = await axios.post(`${host1}/api/sellerdata`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const sellerfreq = async (values) => {
  try {
    let response = await axios.get(`${host1}/api/sellerdata`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getsellerfre = async (id) => {
  try {
    let response = await axios.get(`${host1}/api/sellerdata?id=${id}`);
    
    return response.data;
  } catch (error) {
    console.log("error in getsellerlevel", error);
  }
};
export const sellerlevelupdate = async (values) => {
  try {
    let response = await axios.put(`${host1}/api/sellerdata`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// buy level
export const buyerleve = async (values) => {
  try {
    let response = await axios.post(`${host1}/api/buyerdata`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getbuyerlevel = async (id) => {
  try {
    let response = await axios.get(`${host1}/api/buyerdata?id=${id}`);
    
    return response.data;
  } catch (error) {
    console.log("error in getbuyerlevel", error);
  }
};
export const buyerlevelupdate = async (values) => {
  try {
    let response = await axios.put(`${host1}/api/buyerdata`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const buyerlevel = async (values) => {
  try {
    let response = await axios.get(`${host1}/api/buyerdata`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const buyerlevel1 = async (values) => {
  try {
    let response = await axios.get(`${host1}/api/buyerdata?pin=${values}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const orderfilter = async (values) => {
  try {
    let response = await axios.get(`${host}/api/orders/get/admin?username=${values}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const requestvendor = async (values) => {
  try {
    let response = await axios.get(`${host}/api/vendors?email=${values}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const warehousefilter = async (values) => {
  try {
    let response = await axios.get(`${host}/api/warehouses?email=${values}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const corporatefilter = async (values) => {
  try {
    let response = await axios.get(`${host}/api/users/corporateusers?email=${values}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const normalfilter = async (values) => {
  try {
    let response = await axios.get(`${host}/api/users/normalusers?email=${values}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const confirmvendor = async (values) => {
  try {
    let response = await axios.get(`${host}/api/vendors/approvedvendors?email=${values}`);
  
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const seller1 = async (values) => {
  try {
    let response = await axios.get(`${host1}/api/sellerdata?pin=${values}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
// seller range
export const sellerrange = async (values) => {
  try {
    let response = await axios.put(`${host1}/api/seller`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const sellerpostrange = async (values) => {
  try {
    let response = await axios.post(`${host1}/api/seller`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
// get seller range
export const sellergetrange = async () => {
  try {
    let response = await axios.get(`${host1}/api/seller`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// approve vendor
export const vandorapproved = async () => {
  try {
    let response = await axios.get(`${host}/api/vendors/approvedvendors`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// false vendor fetching or not approve
export const vandorfalse = async () => {
  try {
    let response = await axios.get(`${host}/api/vendors/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// vendor updated
export const vendorupdated = async (id, values) => {
  try {
    let reposnse = await axios.put(`${host}/api/vendors/approve/${id}`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// vendor deleted
export const vendordeleted = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/vendors/${id}`);
    return response;
  } catch (error) {}
};

export const profecatedeleted = async (id) => {
  try {
    let response = await axios.delete(
      `${host}/api/professionalcategories/${id}`
    );
    return response;
  } catch (error) {}
};
// professionals deleted
export const professionaldeleted = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/professionals/${id}`);
    return response;
  } catch (error) {}
};
// services deleted
export const servicesdeleted = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/services/${id}`);
    return response;
  } catch (error) {}
};

//  career
export const careers = async (values) => {
  try {
    let response = await axios.post(`${host}/api/careers`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
// privay policies
export const privacypolicy = async (values) => {
  try {
    let reposnse = await axios.post(`${host}/api/privacypolicy/`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// rrc
export const rrc = async (values) => {
  try {
    let reposnse = await axios.post(`${host}/api/rrcpolicy/`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// shipping policies
export const shipping = async (values) => {
  try {
    let reposnse = await axios.post(`${host}/api/shippingpolicies/`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// tos
export const tos = async (values) => {
  try {
    let reposnse = await axios.post(`${host}/api/ts/`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// Carousels
export const Carousels = async (values) => {
  try {
    let reposnse = await axios.put(`${host}/api/caurausals/`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// get  Carousels

export const getcarousels = async () => {
  try {
    let response = await axios.get(`${host}/api/caurausals/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Banner
export const Banner = async (values) => {
  try {
    let reposnse = await axios.put(`${host}/api/banners/`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// get Banner
export const getBanner = async () => {
  try {
    let response = await axios.get(`${host}/api/banners/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// User Normal and corporate
export const corporateusers = async () => {
  try {
    let response = await axios.get(`${host}/api/users/corporateusers`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// normal user
export const normalusers = async () => {
  try {
    let response = await axios.get(`${host}/api/users/normalusers`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// change role
export const changerole = async (id, values) => {
  try {
    let response = await axios.put(
      `${host}/api/users/changerole/${id}`,
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Logistic Seller Range

export const Sellerrange = async (values) => {
  try {
    let reposnse = await axios.put(`${host1}/api/seller`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const buydeleted = async (values) => {
  try {
    let response = await axios.delete(`${host1}/api/buyerdata`, {
      data: values,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const frequedeleted = async (values) => {
  try {
    let response = await axios.delete(`${host1}/api/sellerdata`, {
      data: values,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
// transporter
export const Transporter = async (values) => {
  try {
    let reposnse = await axios.post(`${host1}/api/transport`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const Transporterget = async () => {
  try {
    let reposnse = await axios.get(`${host1}/api/transport`);
    return reposnse.data;
  } catch (error) {
    console.log(error);
  }
};
export const Transporterdelete = async (values) => {
  try {
    console.log("delete", values);
    let response = await axios.delete(`${host1}/api/transport`, {
      data: values,
    });
    return response;
  } catch (error) {}
};

// weight range
export const Weightgetrange = async (values) => {
  try {
    let reposnse = await axios.post(`${host1}/api/weight`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const Weightget = async () => {
  try {
    let reposnse = await axios.get(`${host1}/api/weight`);
    return reposnse.data;
  } catch (error) {
    console.log(error);
  }
};

//   fabs houses

export const getfabs = async () => {
  try {
    let reposnse = await axios.get(`${host}/api/fabs/`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

// fabs deletd
export const deletefabs = async (id) => {
  try {
    let reposnse = await axios.delete(`${host}/api/fabs/${id}`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

// product Page
// Quatation
export const Quotationpage = async () => {
  try {
    let reposnse = await axios.get(`${host}/api/quotations/`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// deleted quoattion
export const Quotationdeleted = async (id) => {
  try {
    let reposnse = await axios.delete(`${host}/api/quotations/${id}`);
    return reposnse.data;
  } catch (error) {
    console.log(error);
  }
};
// product request
export const ProductRequest1 = async () => {
  try {
    let reposnse = await axios.get(`${host}/api/productrequests/`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// product status
export const ProductRequest21 = async (id) => {
  try {
    let reposnse = await axios.put(
      `${host}/api/productrequests/approve/${id}`,
      { status: true }
    );
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
// manage product /api/filters
export const FilterPost = async (data) => {
  try {
    let response = await axios.post(`${host}/api/filters`, data);
    return response;
  } catch (error) {
    alert(error.response.data.error);
  }
};
// Rate chart
export const Rate = async (data) => {
  try {
    let response = await axios.post(`${host1}/api/ratechart`, data);
    return response;
  } catch (error) {
    alert(error.response.data.error);
  }
};

// order page
export const Orderget = async () => {
  try {
    let reposnse = await axios.get(`${host}/api/orders/get/admin`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const orderput = async (id, values) => {
  try {
    let reposnse = await axios.patch(`${host}/api/orders/${id}`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

// Deals
export const Dealsput = async (values) => {
  try {
    let reposnse = await axios.put(`${host}/api/products/dod/create`, values);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const Recomput = async (values) => {
  try {
    let reposnse = await axios.put(
      `${host}/api/products/recommended/create`,
      values
    );
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

export const Dealget = async (values) => {
  try {
    let reposnse = await axios.get(`${host}/api/products/dod/get`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const Recomget = async (values) => {
  try {
    let reposnse = await axios.get(`${host}/api/products/recommended/get`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const Dealdelete = async (productname) => {
  try {
    let reposnse = await axios.put(
      `${host}/api/products/dod/delete/${productname}`
    );
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};
export const Recomdelete = async (productname) => {
  try {
    let reposnse = await axios.put(
      `${host}/api/products/recommended/delete/${productname}`
    );
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

export const Prefabbform = async (data) => {
  try {
    console.log(data, "data====");
    let response = await axios.post(`${host}/api/prefabbform`, data);
    console.log(response, "api====");
    return response;
  } catch (error) {}
};

export const Filterget = async (values) => {
  //
  try {
    let reposnse = await axios.get(`${host}/api/filters`);
    return reposnse;
  } catch (error) {
    console.log(error);
  }
};

export const deletedfilter = async (id) => {
  try {
    let response = await axios.delete(`${host}/api/filters/${id}`);
    return response;
  } catch (error) {}
};


// POr
export const PORVENDOR = async (data) => {
  try {
    let response = await axios.post(`${host}/api/pors`, data);
    console.log("hello",response)

    return response;
  } catch (error) {
    alert("Something went wrong");
  }
};

export const DEALSPOST = async (data) => {
  try {
    let response = await axios.post(`${host}/api/css`, data);
    
    
    return response;
  } catch (error) {
    alert("Something went wrong");
  }
};
export const DEALSGET = async (data) => {
  try {
    let response = await axios.get(`${host}/api/css`);
    console.log("hii")
    
    return response;
  } catch (error) {
    alert("Something went wrong");
  }
};
