import React, {useState} from 'react'
import { CustomButton } from '../../components/customButton'
import { useSelector } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom' 

function ItemPage({handleClick}) {
 

  const {state} = useLocation();
  const { email }= useSelector(state=>state.user)
   const navigate = useNavigate()
  const checkIfLogedIn=()=>{
  if (email === '') {
    navigate('/login'); 
  } 
  else {
    navigate('/buy',  { state: state });  }
  }
  return (
    <>
    <div>
      <img src={state.image} alt="Logo" width={400} /> <br/>  
      {state.catagoryName} <br/>  
      {state.price}<br/>
      {state.catagoryDescription}
    </div>
     
    <CustomButton
        name="Buy"
        onClick={checkIfLogedIn}
        
      />
    <CustomButton
        name="Add to Cart"
        onClick={()=>handleClick(state)}
              
      />
    </>
  )
}

export default ItemPage
