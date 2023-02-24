import React,{useEffect, useState} from 'react'
import axios from "axios";
import {  Modal, Button } from "antd";
import {useSelector} from 'react-redux';
import Card from '../../components/card';
import AddItems from '../../containers/admin/adminComponents/addItems';
import { useLocation } from 'react-router-dom' 
import Search from '../../components/searchBar';


function Items() {
  const location = useLocation();
  let items;
  let category;
  if (location.state && location.state.key === 'validItems') {
    items = location.state.data;
  }
  if (location.state && location.state.key === 'category') {
    category = location.state.data;
  }

  const {role} = useSelector(state=> state.user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  const [validItems, setvalidItems] = useState([])
    const fetchAvailableItems= ()=>{
      
        axios.get(`${process.env.REACT_APP_API_URL}/items/${category || ""}`).then((response) => {
            setvalidItems(response.data.validItemOptions)
           
          });      
    }
    console.log(items)
    console.log(category)
    useEffect(()=>{
      {items === undefined? 
        fetchAvailableItems(): setvalidItems(items)}
    }, [items, category])
  return (
    <>
    <Search/>
      <div>
         {role==="admin" ? <Button onClick={()=>showModal()} >Add Items</Button>:""}
      </div>

    <Modal
        title="Add Items"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <AddItems handleCancel={handleCancel}/>
      </Modal>

      <div class="flex-container">
    {validItems.map((item)=>{
       return(
         <Card item={item} role={role} fetchAvailableItems={fetchAvailableItems}/>
         )
    })}
    </div>
      </>
  )
}

export default Items
