import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import OrdersCard from "./adminComponents/orderCard";
import { Pagination } from 'antd';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL);

const AdminOrder = (props) => {
  const { token, role } = useSelector(state => state.user)
  const [orders, setOrders] = useState([])
  const [ordersCount, setTotalOrdersCount] = useState(0)

  useEffect(() => {
    socket.on('connection');
  }, []);

  const fetchAvailableItems = (page, size) => {
    // setLoading(true)
    const requestOptions = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
    axios.get(`${process.env.REACT_APP_API_URL}/orders?page=${page || 1}&size=${size || 10}&role=${role || 'user'}`, requestOptions).then((response) => {
      setOrders(response.data.orders)
      setTotalOrdersCount(response.data.totalOrdersCount)
      
    });
  }
  useEffect(() => {
    fetchAvailableItems()
  }, [])

  return (
    <>
        <>
          <div className="order-list-box" >
            <h3 >Order List</h3>
            {orders.map((item, id) => {
              return <OrdersCard item={item} key={id}  />
            })}
            <Pagination className="pagination" total={ordersCount} onChange={(page, size) => fetchAvailableItems(page, size)} />
          </div>
        </>
    </>
  )
}
export default AdminOrder
