import React, { useState } from 'react'
import '../App.css'
import { Modal } from "antd";
import CustomForm from "../components/customForm"
import ReusableForm from "../components/reuseableForm"
import ItemPage from '../containers/user/itemPage';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Card = (props) => {
   const navigate = useNavigate()
   const [isModalOpen, setIsModalOpen] = useState(false)
   const itemDetails = [
      'pickupDate',
      'pickupTime',
      'weight',
      'unitItems',
      'maxLength'
   ]
   const senderDetails = [
      'receiverName',
      'receiverPhoneNo'
   ]
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
      console.log(props)
      const requestOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(props),
       };
       const res = await fetch(
         `${process.env.REACT_APP_API_URL}/items`,
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
            {
              props.role === 'admin' ? <ReusableForm item={props.item} isAdminEdit={true}/> : <CustomForm endpoint="orders" basePrice={props.item.minimumDeliveryPrice} categoryName={props.item.catagoryName} itemDetails={itemDetails} senderDetails={senderDetails} /> 
            }
         </Modal>
        
         <div onClick={()=> nextPage(props)} 
            className='category'id={props.role==='admin'?'adminCardTheme':'userCardTheme'}>
         {props.role === 'admin' ?  <button onClick={() => setIsModalOpen(true) }>Edit</button>: <button onClick={() => buy(props) }>Buy</button>}
         {props.role === 'admin' ?  <button onClick={() => triggerDelete()}>Delete</button>: ''}
            <div className='categoryName'> 
            {props.item.catagoryName} <br/>  
            {props.item.minimumDeliveryPrice}
            </div>
         </div>
      </>
   )
}
export default Card;