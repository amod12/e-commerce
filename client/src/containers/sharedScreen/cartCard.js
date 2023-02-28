import React,{useState} from 'react';
import { useEffect } from 'react';
import "../sharedScreen/cart.css";

const CartCard = ({cart, setCart,  itemPrice, setItemPrice, total}) => {
    const addCart=(id)=>{
        const tempProductList = [...cart]
        tempProductList[id]['quantity']++
        setCart(tempProductList)
      }
    
    const subCart=(id)=>{
        if(cart[id]['quantity']===1){
            return
        }
        else{
        const tempProductList = [...cart]
        tempProductList[id]['quantity']--
        setCart(tempProductList)
        }
      }

    
    
    const handleRemove = (d) => {
        const arr = cart.filter((item , id) => {
            console.log(id)
           if(id !== d){
            return true
           }
        });
        setCart(arr);
        total();
      };

    useEffect(()=>{
        total();
    }, [])

  return (
    <article>
        {
            cart?.map((item, id)=>(
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.image} />
                        <p>{item.catagoryName}</p>
                    </div>
                    <div>
                        <button onClick={()=>addCart(id)}> + </button>
                        <button>{item.quantity}</button>
                        <button onClick={()=>subCart(id)}> - </button>
                    </div>
                    <div>
                        <span>{item.price}</span>
                        <span>{item.price*item.quantity}</span>
                        <button onClick={() => handleRemove(id)} >Remove</button>
                    </div>
                </div>
))}
        <div className='total'>
            <span>Total Price </span>
            <span>Rs - {itemPrice}</span>
        </div>
    </article>
  )
}

export default CartCard