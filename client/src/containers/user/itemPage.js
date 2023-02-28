import React from 'react'
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
    navigate('/buy',  { state: [state] });  }
  }
  return (
    <>
    <div className='container'>
      <img src={state.image} alt="Logo" width={'500px'} height={'300px'} className='img_made' /> <br/>  
      
    </div>
    {/* <div className='container'> */}
      <div className='list'>

   <h1>{state.catagoryName}</h1>  
     <h2>{state.price}</h2> 
     <h3>{state.catagoryDescription}</h3> 
    </div>
      {/* </div> */}
     
    <CustomButton
        name="Buy"
        onClick={checkIfLogedIn}
        className="flex-container"
      />
    <CustomButton
        name="Add to Cart"
        onClick={()=>handleClick(state)}
              
      />
    </>
  )
}

export default ItemPage
