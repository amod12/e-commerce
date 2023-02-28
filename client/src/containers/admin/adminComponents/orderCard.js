import React, { useState } from 'react'
import '../../../App.css'
import { Button,  } from 'antd'
import { AiOutlineSend } from 'react-icons/ai';
import io from 'socket.io-client'; 
import { BsCalendar2Date } from 'react-icons/bs'
import { BiTime, BiMobileAlt, BiCheck } from 'react-icons/bi'
import { MdOutlineDeliveryDining } from 'react-icons/md'
const socket = io(process.env.REACT_APP_API_URL);

const OrdersCard = (props) => {
   const selectDynamicColor = () => {

      if (nam === "Sent") {
         return '#F29339'
      } else if (nam === "Accept") {
         return '#077E8C'
      } else if (nam === "Complete") {
         return 'green'
      } else {
         return 'red'
      }
   }

   const changeStatus = (status) => {
      const orderDetails = {
         status: status,
         id: props.item._id
      }
      socket.emit('orderRequest', orderDetails)
   }

   const changeName=()=>{
      if(nam === ''){
         setNam('Accept')
         return 'Accept'
      }
      else if(nam === 'Accept'){
           setNam('Sent')
         return 'Sent'
                
      }
      else if(nam === 'Sent'){
         setNam('Complete')
         return 'Complete'
    }
      else {
         setNam('error')
         return 'error'
   }
 
   }
   const [nam, setNam] =useState('')
  
   console.log(props.item.name,'o')
   const content = (
      <div style={{ display: 'flex', alignItems: 'center' }}>
         <input placeholder="reasons for rejection" />{<AiOutlineSend size={30} marginLeft={8} />}
      </div>
   );


   return (
      <>

         <div className='order-box'>
         <div className="order-footer">
               <div className='flex '>
                  <BsCalendar2Date /><h4>{props.item.pickupDate}</h4>
                  <BiTime /><h4>{props.item.pickupTime}</h4>
                  <BiMobileAlt /><h4> {props.item.phone}</h4>
                  <h4 >order id # {props.item._id}</h4>

               </div>
            </div>
           
            <div className="order-body">
            <div className='order-tilte-box'>
            {props.item.orders.map((i)=>{
                  return  <div style={{paddingTop:'10px'}}><img src={i.image} alt="Logo" width={100} /> <br/></div>
                 })}  
                 </div >
               <div className='order-tilte-box'>
                  <h2>{"product name"} </h2>   
                 {props.item.orders.map((i)=>{
                  return <li>{ i.catagoryName}   </li>
                 })}                                    
               </div >
               <div className='order-tilte-box'>
                  <h2>{"Quantity"} </h2>   
                  {props.item.orders[0].quantity !== undefined? props.item.orders.map((i)=>{
                  return <li>{ i.quantity} </li>
                 }): props.item.quantity}
   
               </div >
               <div>

                  <div className='flex ' style={{ marginTop: '1rem' }} >
                     <MdOutlineDeliveryDining size={25} className="order-icon" /><h4>Receiver:  {props.item.name} </h4>
                  </div>
                  <div class="flex order-subtitle-box ">
                     <p> Total Price:   {props.item.totalPrice !==0? 
                     props.item.totalPrice:
                     props.item.quantity*props.item.orders[0].price
                     }</p>

                  </div>
               </div>
               <div style={{ marginBottom: '20px', marginRight: '20px' }}>
                  <div style={{ margin: '20px 0' }}>
                     {nam !== 'Complete'?
                    ( <Button onClick={() => changeStatus(changeName())}> {nam || 'Pending'}</Button>):
                     (<BiCheck size={30} />)}
                  </div>
                 
               </div>
            </div>
            <div className='order-head' >
               <span style={{ backgroundColor: selectDynamicColor(), marginLeft:610}}>{nam  || 'Pending'}</span>
            </div>
         </div>
      </>
   )
}
export default OrdersCard;