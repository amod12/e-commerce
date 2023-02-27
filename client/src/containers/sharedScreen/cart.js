import React from 'react'
import { CustomButton } from '../../components/customButton'
import CartCard from './cartCard'
import { useNavigate } from 'react-router-dom' 


function Cart({cart, setCart, }) {
  const navigate = useNavigate()

  const checkIfLogedIn=()=>{   
      navigate('/buy',  { state: cart });  
    }
  return (
    <>
    <div>
        orders={cart.length}
        <CartCard cart={cart} setCart={setCart} />
    </div>
    <CustomButton
        name="Buy"
        onClick={checkIfLogedIn}
        />
    </>
  )
}

export default Cart
