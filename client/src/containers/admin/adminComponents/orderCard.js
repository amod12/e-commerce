import React from 'react'
import '../../../App.css'
import { Button,  } from 'antd'
import { AiOutlineSend } from 'react-icons/ai';
import io from 'socket.io-client';
import { BsCalendar2Date } from 'react-icons/bs'
import { BiTime, BiMobileAlt } from 'react-icons/bi'
import { MdOutlineDeliveryDining } from 'react-icons/md'
import { useSelector } from 'react-redux';
const socket = io(process.env.REACT_APP_API_URL);



const OrdersCard = (props) => {
   const {role }= useSelector(state=>state.user)

   const selectDynamicColor = () => {

      if (props.item.orderStatus === "Pending") {
         return '#F29339'
      } else if (props.item.orderStatus === "Accepted") {
         return '#077E8C'
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
               <img src={props.item.image} alt="Logo" width={100} />
               <div className='order-tilte-box'>
                  <h2>{props.item.catagoryName ? props.item.catagoryName : "product name"} </h2>
                  <div className='flex ' style={{ marginTop: '1rem' }} >
                     <MdOutlineDeliveryDining size={25} className="order-icon" /><h4>Receiver {props.item.name} </h4>
                  </div>
               </div >
               <div>
                  <div className='flex order-subtitle-box'>
                     <p> Quantity:   {props.item.quantity}</p>
                  </div>
                  <div class="flex order-subtitle-box ">
                     <p> Total Price:   {props.item.minimumDeliveryPrice}</p>

                  </div>
               </div>
               <div style={{ marginBottom: '20px', marginRight: '20px' }}>
                  <div style={{ margin: '20px 0' }}>
                     {role ===  'admin'? (
                        <>
                          <Button onClick={() => changeStatus('Rider Accepted')}>Accept</Button>
                          <Button onClick={() => changeStatus('Picked Up')}>Picked Up</Button>
                          <Button onClick={() => changeStatus('Takeaway Success')}>Takeaway Success</Button>
                          </>
                     ) : (
                        <>  
                        <Button onClick={() => changeStatus('accept')}>Accept</Button>
                        <div><Button onClick={() => changeStatus('reject')} type="primary">Reject</Button></div>
                        </>
                     )} 
                  </div>
                 
               </div>
            </div>
            <div className='order-head' >
               <span style={{ backgroundColor: selectDynamicColor() }}>{props.item.orderStatus}</span>
            </div>
         </div>
      </>
   )
}
export default OrdersCard;