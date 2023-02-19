import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useState } from 'react';
import { message } from 'antd';


const AddItems =({isAdminEdit, item, handleCancel})=>{
  const [image, setImage]=useState('')

  const itemSchema = Yup.object().shape({
    
    catagoryName: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    minimumDeliveryPrice: Yup.string()
      .required("Required"),

      file:Yup.mixed().test('hasFile','image is required',()=>{
        if(image){
          return true
        }
        return false
      }),
  });
  
  const submitImage = async ()=>{
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'pztinjet')
    data.append('cloud_name', 'djnspkxht')   

    const res = await fetch('https://api.cloudinary.com/v1_1/djnspkxht/image/upload', {
      method: 'post',
      body: data
    })
    const newData = await res.json();
    return newData.url
  }
    return(
        <>
        <Formik
           initialValues={item ||
        {
          catagoryName: "",
          minimumDeliveryPrice: "",
          photo: ""
        }
        // writing photo:' ' to show errors in form
        }
          validationSchema={itemSchema}
          onSubmit={async (values, { resetForm }) => {
            let imageUrl = await submitImage();
            values.image = imageUrl
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
              <div>
                <input type='file' onChange={(e) => setImage(e.target.files[0])} className=''></input>
              </div>
              <button className="button" onClick={() => image ? '' : message.error("Please Fill the form completely", [2])}>{isAdminEdit ? 'Save Item' : 'Add Item'}</button>
            </Form>
          </div>
        )}
        </Formik>

        </>
    )
} 

export default AddItems