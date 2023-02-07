import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


const formFields = [
  {name: 'name',  placeholder: 'Name'},
  {name: 'address',  placeholder: 'Address'},
  {name: 'phone',  placeholder: 'Phone'},
  {name: 'username',  placeholder: 'Username'},
  {name: 'email',  placeholder: 'Email'},
  {name: 'password', placeholder: 'Password'},
  {name: 'confirmPassword',  placeholder: 'ConfirmPassword'},
];


const validationSchema = Yup.object().shape({ 
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

    username: Yup.string()
      .min(4, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    password: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    confirmPassword: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

    // role: Yup.string().required("Required"),
  
});

const MyForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  return(
  <Formik
    initialValues={{
     name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    }}
    validationSchema={validationSchema}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
  >
    {({ isSubmitting, errors, touched }) => (
      <Form><div style={{paddingLeft:500, marginRight:100}}>
        {formFields.map(field => (
          <div key={field.name}>
            <Field
              type={field.name === 'password' || field.name === 'confirmPassword' ? showPassword
              ? 'text'
              : 'password'
            : 'text' }
              name={field.name}
              placeholder={field.placeholder}
            />
            {field.name === 'password'  || field.name === 'confirmPassword' ? <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEyeSlash : faEye}  /> : ''}
            {errors[field.name] && touched[field.name] ? (
                <div className="validaton-message">{errors[field.name]}</div>
              ) : null}
            <br />
          </div>
        ))}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        </div>
      </Form>
    )}
  </Formik>
);
}
export default MyForm;
