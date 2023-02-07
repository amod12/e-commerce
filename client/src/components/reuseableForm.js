import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useState, useEffect } from "react";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const ReusableForm =({isAdminEdit, item, handleCancel})=>{
  const itemSchema = Yup.object().shape({
    catagoryName: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    minimumDeliveryPrice: Yup.string()
      .required("Required"),
  });
  const { _id } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  
  const triggerImgSave = async () => {
    const formdata = new FormData();
    formdata.append("avatar", file);
    formdata.append("_id", _id);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    if (data) {
      fetchUserDetails()
    }
  };
  const fetchUserDetails = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/items/${_id}`)
      .then((response) => {
        setUserDetails(response.data.userDetails);
      });
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  console.log(file)
    return(
        <>
         <input type="file" onChange={(e) => {
          setFile(e.target.files[0])
        }} id="upload"  />
        <label >
          add photo
        </label>
        <div  style={{height: 100}}>
          {/* {userDetails.avatarName && <img src={require(`../uploads/${userDetails.avatarName}`)} alt="Loading.." />} */}
        </div>
        <div class="actionBtn">
              <button onClick={() => triggerImgSave()}>Save</button>
            </div>
        <Formik
          initialValues={item || {}}
          validationSchema={itemSchema}
          onSubmit={async (values, { resetForm }) => {
            const requestOptions = {
              method: isAdminEdit ? "PUT" : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            };
            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/items`,
              requestOptions
            );
            const data = await res.json();
            if (res.status === 200) {
              toast.success(data.msg)
            } else {
              toast.error(data.msg);
            }
            handleCancel();
            resetForm({ values: "" });
          }}
        >
          {({ errors, touched }) => (
            <div>
              <Form>
                <div>
                  <Field name="catagoryName" placeholder="Catagory Name" />
                  {errors.catagoryName && touched.catagoryName ? (
                    <div className="validaton-message">{errors.catagoryName}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="minimumDeliveryPrice"
                    placeholder="minimum delivery price"
                    type="number"
                  />
                  {errors.minimumDeliveryPrice && touched.minimumDeliveryPrice ? (
                    <div className="validaton-message">{errors.minimumDeliveryPrice}</div>
                  ) : null}
                </div>
                <button className="button" name="Sumbit" type="submit">{isAdminEdit ? 'Save Item' :'Add Item'}</button>
              </Form>
            </div>
          )}
        </Formik>

        </>
    )
} 

export default ReusableForm