import React from 'react'
import { CustomButton } from '../../components/customButton'
import CartCard from './cartCard'
import { useNavigate } from 'react-router-dom' 


function Cart({cart, setCart, itemPrice, setItemPrice, total }) {
  const navigate = useNavigate()

  const checkIfLogedIn=()=>{   
      navigate('/buy',  { state: cart });  
       setCart([])
    }
  return (
    <>
    <h1 style={{textAlign: 'center'}}> You have {cart.length} orders. </h1>
        <CartCard cart={cart} setCart={setCart} itemPrice={itemPrice} setItemPrice={setItemPrice} total={total} />
   
   <h1 style={{marginLeft: '30%'}}> 
    <CustomButton
        name="Buy"
        onClick={checkIfLogedIn}
        />
        </h1>
    </>
  )
}

export default Cart
