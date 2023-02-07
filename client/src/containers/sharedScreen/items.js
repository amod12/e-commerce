import React,{useEffect, useState} from 'react'
import axios from "axios";
import {  Modal, Button } from "antd";
import {useSelector} from 'react-redux';
import Card from '../../components/card';
import ReusableForm from '../../components/reuseableForm';

function Items() {
  const {role} = useSelector(state=> state.user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [validItems, setValidItems] = useState([])
    const fetchAvailableItems= ()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/items`).then((response) => {
            setValidItems(response.data.validItemOptions)
          });      
    }
    
    useEffect(()=>{
        fetchAvailableItems()
    }, [])
  return (
    <>
    <div>
         {role==="admin" ? <Button onClick={()=>showModal()} >Add Items</Button>:""}
      </div>

    <Modal
        title="Add Items"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <ReusableForm handleCancel={handleCancel}/>
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
