import React,{useRef} from "react";
import TextField from "../categories/TextField";
import { Formik, Form,ErrorMessage} from "formik";
import Footer from "../footer/Footer";
import * as yup from "yup";
import { careers } from "../../services/api";
import JoditEditor from "jodit-react";
function Career() {
  const validate = yup.object({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });
  const editor = useRef(null);
  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">Career</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card m-b-30">
                  <div className="card-body">
                    <h4 className="mt-0 header-title mb-4">Add Career</h4>
                    <Formik
                      initialValues={{
                        title: "",
                        description: "",
                      }}
                      validationSchema={validate}
                      onSubmit={async (values, actions) => {
                        try {
                          let data = await careers(values);
                          if (data.status) {
                            alert("SUCCESSFULLY CREATED CAREER ");
                          } else {
                            alert("Something went wrong");
                          }
                        } catch (error) {
                          console.log("error in procat", error);
                        }

                        actions.resetForm();
                      }}
                    >
                      {(formik) => (
                        <Form>
                          <TextField label="Career " name="title" />
                          <br />
                          <label> Description</label>
                          <JoditEditor
                            ref={editor}
                            value={formik.values.description}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) =>
                              formik.setFieldValue("description", newContent)
                            } // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />

                          <ErrorMessage
                            component="div"
                            name="description"
                            className="error"
                          />

                          <input
                            type="Submit"
                            className="btn mt-2 rounded-3 w-20  btn-lg btn-outline-secondary btn-dark"
                            value="Submit"
                          />
                        </Form>
                      )}
                    </Formik>
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

export default Career;
