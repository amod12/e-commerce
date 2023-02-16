import React, { useState } from 'react'
import '../App.css'
import { Modal } from "antd";
import ReusableForm from "../containers/admin/adminComponents/reuseableForm"
import { useNavigate } from "react-router-dom";


const Card = (props) => {
   const navigate = useNavigate()
   const [isModalOpen, setIsModalOpen] = useState(false)
   
   const triggerDelete = async()=>{
      const requestOptions = {
         method:"DELETE",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({_id: props.item._id}),
       };
       const res = await fetch(
         `${process.env.REACT_APP_API_URL}/items`,
         requestOptions
       );
      if(res.status === 204) props.fetchAvailableItems()
   }

   const buy = async(props)=> { 
      const requestOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(props.item),
       };
        await fetch(
         `${process.env.REACT_APP_API_URL}/orders`,
         requestOptions
       );
   }

   const nextPage=()=>{
      console.log(props.item)
      navigate('/itemPage',  { state: props.item });            
   }
   return (
      <>
      <Modal
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}>
            {props.item.catagoryName}
            {props.role === 'admin' ? <ReusableForm item={props.item} isAdminEdit={true}/> : ""}
         </Modal>
        <div>
         <div onClick={()=> nextPage()} className='category'id={props.role==='admin'?'adminCardTheme':'userCardTheme'}>
            <div className='categoryName'> 
            {props.item.catagoryName} <br/>  
            {props.item.minimumDeliveryPrice}
            <img src={props.item.image} alt="Logo" width={100} />
            </div>
         </div>
         {props.role === 'admin' ?  <button onClick={() => setIsModalOpen(true) }>Edit</button>: <button onClick={() => buy(props) }>Buy</button>}
         {props.role === 'admin' ?  <button onClick={() => triggerDelete()}>Delete</button>: ''}
         </div>
      </>
   )
}
export default Card;