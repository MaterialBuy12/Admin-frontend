import { React, useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage, Field  } from "formik";
import TextField from "../categories/TextField";
import Switch from "@mui/material/Switch";
import JoditEditor from "jodit-react";
import uniqBy from "lodash.uniqby";
import * as yup from "yup";
import Multiselect from "multiselect-react-dropdown";
import {
  Filterget,
  getAllCategory,
  getAllSubCategory,
  ProductAget,
  ProductAUpdate,
  
  SubSubgetCategory,
  
} from "../../services/api";
import Footer from "../footer/Footer";
import { useParams,useNavigate } from "react-router-dom";
/* eslint-disable */
function Updateproduct() {
  
  const [state4, setstate4] = useState([]);
  const [state1, setstate1] = useState([]);
  const [state2, setstate2] = useState([]);
 
 
  const { id } = useParams();
  const [state, setstate] = useState([]);
  const [filters, setfilters] = useState([]);
  const [tags2, settags2] = useState([]);
  let navigate=useNavigate()
  
  const editor = useRef(null);
  useEffect(() => {
    async function data() {
      let datas = await ProductAget(id);
      let filtername = await Filterget();
      setfilters(uniqBy(filtername.data, "name"));

      setstate(datas.data);
    }
    data();
  }, []);
  const validate = yup.object({
    productname1: yup
      .string()
      .required("Required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    price2A: yup
      .string()

      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Only Digits"
      ),
    discountprice2B: yup
      .string()

      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Only Digits"
      ),
    taxpercent3: yup
      .string()
      .required("Required")
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Only Digits"
      ),
    partprice4A: yup
      .string()
      .required("Required")
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Only Digits"
      ),
    sell4B: yup.string().required("Required"),
    skuid5: yup.string().required("Required"),
    stock6: yup.string().required("Required"),
    weight7A: yup.string().required("Required"),
    weightunit7A: yup.string().required("Required"),
    volumetricweight7B: yup.string().required("Required"),
    volumetricunit7B: yup.string().required("Required"),
    len8A: yup.string().required("Required"),
    lenunit8A: yup.string().required("Required"),
    width8B: yup.string().required("Required"),
    widthunit8B: yup.string().required("Required"),
    height8C: yup.string().required("Required"),
    heightunit8C: yup.string().required("Required"),
    manufacturer9: yup.string().required("Required"),
    madein10: yup.string().required("Required"),
    minord11A: yup.string().required("Required"),
    maxord11B: yup.string().required("Required"),

    description12: yup.string().required("Required"),


    categoryid: yup.string().required("Required"),
    subcategory: yup.string(),
    subsubcategory: yup.string(),

   
  });
  useEffect(() => {
    async function data() {
      let dat = await getAllCategory();

      let response = await getAllSubCategory();
      let resp = await SubSubgetCategory();
      
      setstate2(resp);

      setstate1(response);
    
      setstate4(dat);
    }
    data();
  }, []);
  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">Products</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-28">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4"> Product</h4>
                    <div>
                      <Formik
                        enableReinitialize
                        initialValues={{
                          calculator:state.calculator,
                          productname1: state.productname1,
                          price2A: state.price2A,
                          discountprice2B: state.discountprice2B,
                          taxpercent3: state.taxpercent3,
                          partprice4A: state.partprice4A,
                          sell4B: state.sell4B,
                          skuid5: state.skuid5,
                          stock6: state.stock6,
                          weight7A: state.weight7A,
                          weightunit7A: state.weightunit7A,
                          volumetricweight7B: state.volumetricweight7B,
                          volumetricunit7B: state.volumetricunit7B,
                          len8A: state.len8A,
                          lenunit8A: state.lenunit8A,
                          width8B: state.width8B,
                          widthunit8B: state.widthunit8B,
                          height8C: state.height8C,
                          heightunit8C: state.heightunit8C,
                          manufacturer9: state.manufacturer9,
                          madein10: state.madein10,
                          minord11A: state.minord11A,
                          maxord11B: state.maxord11B,
                          description12: state.description12,
                          cancellable: state.cancellable,
                          returnable: state.returnable,
                          refunable: state.refunable,
                          quote: state.quote,
                          loading: state.loading,
                          unit18A: state.unit18A,
                          unit18B: state.unit18B,
                          unit18C: state.unit18C,
                          unit18D: state.unit18D,
                          cal:state.cal,
                        
                          subcategory: state.subcategory,
                          categoryid: state.categoryid,
                          vari: [state.vari],
                          calculatorunit:state.calculatorunit,
                          tags:state.tags,
                        

                          subsubcategory: state.subsubcategory,
                          minimum1: state.minimum1,
                          maximum1: state.maximum1,
                          price1: state.price1,
                          minimum2: state.minimum2,
                          maximum2: state.maximum2,
                          price2: state.price2,
                          minimum3: state.minimum3,
                          maximum3: state.maximum3,
                          price3: state.price3,
                          minimum4: state.minimum4,
                          maximum4: state.maximum4,
                          price4: state.price4,
                          minimum5: state.minimum5,
                          maximum5: state.maximum5,
                          price5: state.price5,
                          minimum6: state.minimum6,
                          maximum6: state.maximum6,
                          price6: state.price6
                          ,

                          variations:state.variations,
                          // new values 
                          description123: state.description123,
                    charges:state.charges,
                    free6:state.free6,
                    free5:state.free5,
                    free4:state.free4,
                    free3:state.free3,
                    free2:state.free2,
                    free1:state.free1,
                        }}
                        validationSchema={validate}
                        onSubmit={async (values, actions) => {
                          tags2.map((element,index)=>{
                            values.tags[index]=element.name
                            
                          })
                          try {
                            let response = await ProductAUpdate(id,values);
                            if (response.status) {
                              alert("SUCCESSFULLY");
                              navigate("/manageproduct")

                              window.location.reload();
                            } else {
                              alert("something went wrong");
                            }
                          } catch (error) {
                            alert(error);
                          }

                          actions.resetForm();
                        }}
                      >
                        {(formik) => (
                          <Form>
                          {/* 1st row  */}
                          <div className="row mt-2">
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField
                                label="1. Product Name"
                                name="productname1"
                              />
                            </div>
    
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField label="2A. Price(Rs)" name="price2A" />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField
                                label="2B. Discounted Price(Rs)"
                                name="discountprice2B"
                              />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField label="3. Tax(%)" name="taxpercent3" />
                            </div>
                          </div>
                          {/* 2nd row */}
                          <div className="row mt-2">
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField
                                label="4A. Part Price(Rs)"
                                name="partprice4A"
                              />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField
                                label="4B. Sell In"
                                name="sell4B"
                                placeholder="e.g. liter or sqft or bag"
                              />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField label="5. SKU ID" name="skuid5" />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField label="6. Stock" name="stock6" />
                            </div>
                          </div>
                          {/* 3rd row */}
                          <div className="row mt-2">
                            {/* 1 column */}
                            <div className="col-6  mt-2">
                              {/* inner row */}
                              <div className="row">
                                <div className="col-12 col-lg-8 mt-2 ">
                                  <TextField label="7A. Weight" name="weight7A" />
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                  <label>Unit</label>
    
                                  <Field
                                    as="select"
                                    name="weightunit7A"
                                    className={`form-control shadow-none ${
                                      formik.touched.weightunit7A &&
                                      formik.errors.weightunit7A &&
                                      "is-invalid"
                                    }`}
                                  >
                                    <option defaultValue="">Unit</option>
                                    <option value="Kg">Kg</option>
                                    <option value="g">g</option>
                                    <option value="lb">lb</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    name="weightunit7A"
                                    className="error"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* 2 column */}
                            <div className="col-6  mt-2">
                              <div className="row">
                                <div className="col-12 col-lg-8 mt-2 ">
                                  <TextField
                                    label=" 7B. Vol Weight"
                                    name="volumetricweight7B"
                                  />
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                  <label>Unit</label>
    
                                  <Field
                                    as="select"
                                    name="volumetricunit7B"
                                    className={`form-control shadow-none  ${
                                      formik.touched.volumetricunit7B &&
                                      formik.errors.volumetricunit7B &&
                                      "is-invalid"
                                    } `}
                                  >
                                    <option value="">Unit</option>
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="lb">lb</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    name="volumetricunit7B"
                                    className="error"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
    
                          {/* 4th row */}
                          <div className="row mt-2">
                            <div className="col-4 mt-2">
                              {/* inner row */}
                              <div className="row">
                                <div className="col-12 col-lg-8 mt-2 ">
                                  <TextField label="8A. Length" name="len8A" />
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                  <label>Unit</label>
    
                                  <Field
                                    as="select"
                                    name="lenunit8A"
                                    className={`form-control shadow-none  ${
                                      formik.touched.lenunit8A &&
                                      formik.errors.lenunit8A &&
                                      "is-invalid"
                                    } `}
                                  >
                                    <option defaultValue="">Unit</option>
                                    <option select value="cm">
                                      cm
                                    </option>
                                    <option value="m">m</option>
                                    <option value="ft">ft</option>
                                    <option value="in">in</option>
                                    <option value="mm">mm</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    name="lenunit8A"
                                    className="error"
                                  />
                                </div>
                              </div>
                            </div>
    
                            <div className="col-4 mt-2">
                              {/* inner row */}
                              <div className="row">
                                <div className="col-12 col-lg-8 mt-2 ">
                                  <TextField label="8B. Width" name="width8B" />
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                  <label>Unit</label>
    
                                  <Field
                                    as="select"
                                    name="widthunit8B"
                                    className={`form-control shadow-none  ${
                                      formik.touched.widthunit8B &&
                                      formik.errors.widthunit8B &&
                                      "is-invalid"
                                    } `}
                                  >
                                    <option defaultValue="">Unit</option>
                                    <option select value="cm">
                                      cm
                                    </option>
                                    <option value="m">m</option>
                                    <option value="ft">ft</option>
                                    <option value="in">in</option>
                                    <option value="mm">mm</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    name="widthunit8B"
                                    className="error"
                                  />
                                </div>
                              </div>
                            </div>
    
                            {/* 1 column */}
                            <div className="col-4 mt-2">
                              {/* inner row */}
                              <div className="row">
                                <div className="col-12 col-lg-8 mt-2 ">
                                  <TextField label="8C. Height" name="height8C" />
                                </div>
                                <div className="col-12 col-lg-4 mt-2">
                                  <label>Unit</label>
    
                                  <Field
                                    as="select"
                                    name="heightunit8C"
                                    className={`form-control shadow-none  ${
                                      formik.touched.heightunit8C &&
                                      formik.errors.heightunit8C &&
                                      "is-invalid"
                                    } `}
                                  >
                                    <option defaultValue="">Unit</option>
                                    <option select value="cm">
                                      cm
                                    </option>
                                    <option value="m">m</option>
                                    <option value="ft">ft</option>
                                    <option value="in">in</option>
                                    <option value="mm">mm</option>
                                  </Field>
                                  <ErrorMessage
                                    component="div"
                                    name="heightunit8C"
                                    className="error"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
    
                          {/* 5th row */}
                          <div className="row mt-2">
                            <div className="col-12 col-lg-3  mt-2">
                              <TextField
                                label="9. Manufacturer"
                                name="manufacturer9"
                              />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField label="10. Made in " name="madein10" />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField label="11A. Min Order" name="minord11A" />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <TextField label="11B. Max Order " name="maxord11B" />
                            </div>
                          </div>
                          {/* 6 row */}
                          <div className="row mt-2">
                            <div className="col-12  mt-2">
                              <label>12. Product Description</label>
    
                              <JoditEditor
                                ref={editor}
                                value={formik.values.description12}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) =>
                                  formik.setFieldValue("description12", newContent)
                                } // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                              />
    
                              <ErrorMessage
                                component="div"
                                name="description12"
                                className="error"
                              />
                            </div>
                          </div>
                          <div className="row mt-2">
                        <div className="col-12  mt-2">
                          <label>12B. Product Description 2</label>

                          <JoditEditor
                            ref={editor}
                            value={formik.values.description123}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) =>
                              formik.setFieldValue("description123", newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />

                          <ErrorMessage
                            component="div"
                            name="description123"
                            className="error"
                          />
                        </div>
                      </div>
    
                          <div className="row mt-2">
                            <div className="col-12 col-lg-3  mt-2">
                              <label>13A. Material Calculator ?</label>
                              <br />
                             {formik.values.cal?<> <Switch checked
                                onChange={(e) => formik.setFieldValue("cal", false)}
                              /></>:<>  <Switch
                              onChange={(e) => formik.setFieldValue("cal", true)}
                            /></>}
                            </div>
                           
                            <div className="col-lg-3  mt-2">
                              <TextField
                                label="13B. Material Calculator Value"
                                name="calculator"
                              />
                            </div>
                            <div className="col-12 col-lg-3  mt-2">
                              <TextField
                                label="13C. Material Unit"
                                name="calculatorunit"
                              />
                            </div>
                            <div className="col-12 col-lg-3  mt-2">
                            <label>14. Tags</label>
                          {/* <Inputfielded label="14. Tags" name="tags" /> */}

                          <Multiselect
                            defaultValue={formik.values.tags}
                            options={filters} // Options to display in the dropdown
                            name="tags"
                            onSelect={(selectedList, selectedItem) => {
                              settags2(selectedList);
                            }}
                            onRemove={(selectedList, removedItem) => {
                              settags2(selectedList);
                            }}
                            style={{ border: "1px solid #353957" }}
                            displayValue="name" // Property name to display in the dropdown options
                          />
                          {formik.values.tags?<p>Selected values : {formik.values.tags}</p>:""}
                            </div>
                            
    
                           
                          </div>
                          {/* 7 row */}
                          <div className="row mt-2">
                            <div className="col-12 col-lg-3  mt-2">
                              <label>16A. Is Cancellable ?</label>
                              <br />
                            
                              {formik.values.cancellable?<><Switch checked
                                onChange={(e) =>
                                  formik.setFieldValue("cancellable", false)
                                }
                              />    </>:<Switch
                              onChange={(e) =>
                                formik.setFieldValue("cancellable", true)
                              }
                            />    }
                                                      </div>
                            <div className="col-12 col-lg-3  mt-2">
                              <label>16B. Is Returnable ?</label>
                              <br />
                             {formik.values.returnable?<> <Switch checked
                                onChange={(e) =>
                                  formik.setFieldValue("returnable", false)
                                }
                              /></>: <Switch
                              onChange={(e) =>
                                formik.setFieldValue("returnable", true)
                              }
                            />}
                            </div>
    
                            <div className="col-12 col-lg-3  mt-2">
                              <label>16C. Is Refundable ?</label>
                              <br />
                             {formik.values.refunable? <Switch checked
                                onChange={(e) =>
                                  formik.setFieldValue("refunable", false)
                                }
                              />: <Switch
                              onChange={(e) =>
                                formik.setFieldValue("refunable", true)
                              }
                            />}
                            </div>
                            <div className="col-12 col-lg-3  mt-2">
                              <label>16D. Quote Only</label>
                              <br />
                             {formik.values.quote?<> <Switch checked
                                onChange={(e) =>
                                  formik.setFieldValue("quote", false)
                                }
                              /></>: <Switch
                              onChange={(e) =>
                                formik.setFieldValue("quote", true)
                              }
                            />}
                            </div>
                            
                          </div>
    
                          {/* 8. category is incomplete 17B,17C,17D */}
                          {/* 9. row */}
                          <div className="row mt-2">
                            <div className="col-12 col-lg-3  mt-2">
                              <label>16E. Loading/Unloading Charges</label>
                              <br />
                             {formik.values.loading?<> <Switch checked
                                onChange={(e) =>
                                  formik.setFieldValue("loading", false)
                                }
                              /></>: <Switch
                              onChange={(e) =>
                                formik.setFieldValue("loading", true)
                              }
                            />}
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                        <TextField
                            label="16F. Charges"
                            name="charges"
                          />
                        </div>
                           
                          </div>
                          {/* new row */}
                          <div className="row mt-2">
                          <div className="col-12 col-lg-3 mt-2">
                              <label>17A. Category Name</label>
                              <Field
                                as="select"
                                className={`form-control shadow-none ${
                                  formik.touched.categoryid &&
                                  formik.errors.categoryid &&
                                  "is-invalid"
                                }`}
                                name="categoryid"
                              >
                                <option defaultValue="">Select Category</option>
                                {state4 &&
                                  state4?.map((i, index) => (
                                    <option value={i.title}>{i.title}</option>
                                  ))}
                              </Field>
                              <ErrorMessage
                                component="div"
                                name="categoryid"
                                className="error"
                              />
                            </div>
                            <div className="col-12 col-lg-3 mt-2">
                              <label>17B. Sub Category Name</label>
                              <Field
                                as="select"
                                className={`form-control shadow-none ${
                                  formik.touched.subcategory &&
                                  formik.errors.subcategory &&
                                  "is-invalid"
                                }`}
                                name="subcategory"
                              >
                                <option defaultValue="">Select Category</option>
                                {state1 &&
                                  state1.map((i, index) => {
                                    if (formik.values.categoryid === i.categoryname)
                                      return (
                                        <option
                                          key={index}
                                          name="subcategory"
                                          value={i.subcategory}
                                        >
                                          {i.subcategory}
                                        </option>
                                      );
                                  })}
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="error"
                                name="subcategory"
                              />
                            </div>
    
                            <div className="col-12 col-lg-3 mt-2">
                              <label> 17C. Sub Sub Category Name</label>
                              <Field
                                as="select"
                                className={`form-control shadow-none ${
                                  formik.touched.subsubcategory &&
                                  formik.errors.subsubcategory &&
                                  "is-invalid"
                                }`}
                                name="subsubcategory"
                              >
                                <option defaultValue="">Select Category</option>
                                {state2 &&
                                  state2.map((i, index) => {
                                    if (formik.values.categoryid === i.categoryname)
                                      return (
                                        <option value={i.subsubcategory}>
                                          {i.subsubcategory}
                                        </option>
                                      );
                                  })}
                              </Field>
                              <ErrorMessage
                                component="div"
                                name="subsubcategory"
                                className="error"
                              />
                            </div>
                          </div>

                          <div className="row mt-2">
                        <div className="col-12 col-lg-3  mt-2">
                          <TextField
                            label="18A. Unit/Box Type 1"
                            name="unit18A"
                          />
                        </div>
                        <div className="col-12 col-lg-3 mt-2">
                          <TextField
                            label="18B. Unit/Box Type 2"
                            name="unit18B"
                          />
                        </div>
                        <div className="col-12 col-lg-3 mt-2">
                          <TextField
                            label="18C. Unit/Box Type 3"
                            name="unit18C"
                          />
                        </div>
                        <div className="col-12 col-lg-3 mt-2">
                          <TextField
                            label="18D. Unit/Box Type 4"
                            name="unit18D"
                          />
                        </div>
                      </div>

                      {/* new row */}
                      <div className="row mt-2">
                        <div className="col-12 col-lg-3  mt-2">
                          <TextField
                            label="18E. Box Type 1 Vol. Wt."
                            name="vol18E"
                          />
                        </div>
                        <div className="col-12 col-lg-3 mt-2">
                          <TextField
                            label="18F. Box Type 2 Vol. Wt."
                            name="vol18F"
                          />
                        </div>
                        <div className="col-12 col-lg-3 mt-2">
                          <TextField
                            label="18G. Box Type 3 Vol. Wt."
                            name="vol18G"
                          />
                        </div>
                        <div className="col-12 col-lg-3 mt-2">
                          <TextField
                            label="18H. Box Type 4 Vol. Wt."
                            name="vol18H"
                          />
                        </div>
                      </div>

                      {/* variation Name */}
                      <div className="row mt-2">
                        <div className="col-3  mt-2">
                          <TextField
                            label="19A. Variation 1 Name"
                            name="vari1"
                          />
                        </div>
                        <div className="col-3  mt-2">
                          <TextField
                            label="19B. Variation 2 Name"
                            name="vari2"
                          />
                        </div>
                        <div className="col-3  mt-2">
                          <TextField
                            label="19C. Variation 3 Name"
                            name="vari3"
                          />
                        </div>
                        <div className="col-3  mt-2">
                          <TextField
                            label="19D. Variation 4 Name"
                            name="vari4"
                          />
                        </div>
                      </div>        <label className="mt-2">20. Rate Chart</label>
                      <div className="row mt-2">
                        <div className="col-1 mt-2">
                          <TextField label="Min 1" name="minimum1" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Max 1" name="maximum1" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Price 1" name="price1" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Free 1" name="free1" />
                        </div>


                        <div className="col-1  mt-2">
                          <TextField label="Min 2" name="minimum2" />
                        </div>
                        <div className="col-1  mt-2">
                          <TextField label="Max 2" name="maximum2" />
                        </div>
                        <div className="col-1  mt-2">
                          <TextField label="Price 2" name="price2" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Free 2" name="free2" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Min 3" name="minimum3" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Max 3" name="maximum3" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Price 3" name="price3" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Free 3" name="free3" />
                        </div>
                      </div>
                      <div className="row mt-2"></div>
                      <div className="row mt-2">
                        <div className="col-1  mt-2">
                          <TextField label="Min4" name="minimum4" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Max 4" name="maximum4" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Price 4" name="price4" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Free 4" name="free4" />
                        </div>

                        <div className="col-1  mt-2">
                          <TextField label="Min 5" name="minimum5" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Max 5" name="maximum5" />
                        </div>
                        <div className="col-1  mt-2">
                          <TextField label="Price 5" name="price5" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Free 5" name="free5" />
                        </div>
                        <div className="col-1  mt-2">
                          <TextField label="Min 6" name="minimum6" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Max 6" name="maximum6" />
                        </div>
                        <div className="col-1  mt-2">
                          <TextField label="Price 6" name="price6" />
                        </div>
                        <div className="col-1 mt-2">
                          <TextField label="Free 6" name="free6" />
                        </div>
                      </div>
                       
    
                      
                
    
                         
                  
                        
                          <input
                            type="submit"
                            className="btn mt-4 rounded-3 w-20  btn-lg btn-outline-secondary btn-dark"
                            value="Submit"
                          />
                        </Form>
                        )}
                      </Formik>
                    </div>
                    {/* formik form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Updateproduct;
