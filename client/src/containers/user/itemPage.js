import React from 'react'
import { CustomButton } from '../../components/customButton'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ItemPage() {
  const {state} = useLocation();
  const { email }= useSelector(state=>state.user)
   const navigate = useNavigate()
  const checkIfLogedIn=()=>{
  if (email === '') {
    navigate('/login');
  } 
  else {
    navigate('/buy');  }
  }
  return (
    <>
    <div>
      {state.catagoryName} <br/>  
      {state.minimumDeliveryPrice}
    </div>
     
    <CustomButton
        name="Buy"
        onClick={checkIfLogedIn}
        
      />
    <CustomButton
        name="Add to Cart"
        onClick={null}
       
      />
    </>
  )
}

export default ItemPage
