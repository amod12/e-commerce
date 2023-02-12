import React from 'react'
import Map from '../../components/map'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../../components/customButton";
import { useSelector } from 'react-redux';
import { responseHandler } from "../../utils/responseHandler"
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {message } from 'antd'; 
import { useLocation } from 'react-router-dom'


function Buy() {
  const usersSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    address: Yup.string()
      .min(3, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),

    phone: Yup.number().required("Required"),

    quantity: Yup.number().required("Required"),

    });
  const buyFormFields = [
    {name: 'name',  placeholder: 'Name'},
    {name: 'address',  placeholder: 'Address'},
    {name: 'phone',  placeholder: 'Phone'},
    {name: 'email',  placeholder: 'Email'},
    {name: 'quantity', placeholder: 'Quantity'},
  ];

  const {state} = useLocation();
  const {address, name, email, phone  }= useSelector(state=>state.user)
  const {distance} =useSelector(state=>state.location)

  return (
    <div>
      {console.log(state)}
      <Map />
      <div >    
            <Formik
              initialValues={{
                name: name,
                address: address,
                email: email,
                phone: phone,
                quantity: 1,
                catagoryName:state.catagoryName,
                minimumDeliveryPrice:state.minimumDeliveryPrice,

              }}
              validationSchema={usersSchema}
              onSubmit={async(values, { resetForm }) => { 
                const requestOptions = {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(values),
                 };
                 const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`, requestOptions);
                  const data = await res.json()
                  const notify = responseHandler(res, data.errorMsg)
                  toast(notify)
                  console.log(data.msg)
                  if (data) {
                    message.success(data.msg, [2])
                  } else {
                    message.error(data.errorMsg, [2])
                  }
             }}
            >
           {({  errors, touched }) => (
              <Form>
                {buyFormFields.map(field => (
                  <div key={field.name}>
                    <Field
                      type={'text' }
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && touched[field.name] ? (
                        <div className="validaton-message">{errors[field.name]}</div>
                      ) : null}
                    <br />
                  </div>
                ))}
                  <CustomButton name="Submit" type="submit" />
                </Form>
              )}
            </Formik>
      </div>
    </div>
  )
}

export default Buy
