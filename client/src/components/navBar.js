import React, { useState } from "react";
import { Drawer, Button, Menu} from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faBars,  } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { logoutResetDetails } from "../redux/actions/userAction"
import navItems from '../json/navItems.json'
import image from "../images/sam2.png";

// problems in navbar hen putting it when thers isnt aperson logged in

const NavBar = () => {
  const { name, role } = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const triggerLogout = () => {
    dispatch(logoutResetDetails())
    navigate('/')
}
  const handleClick = (key) => {
    switch (key) {
      case 'bar':
        showDrawer();
        break;
        case 'img':
          navigate('/');
          break;
      case 'home':
        navigate('/');
        break;
      case 'logout':
        triggerLogout();
        break;
      case 'profile':
        navigate('/profile');
         break;
      case 'login':
        navigate('/login');
        break;
      case 'register':
        navigate('/register');
        break;
      default:
        break;
    }
  };
  
  return (
    <div >
    <Menu 
     defaultSelectedKeys={['1']}
     defaultOpenKeys={['sub1']}
     justify="end"
    mode='horizontal'
    style={{backgroundColor:role=='user'? 'teal' : 'gray', 
    color:'white', 
    fontSize: 24, 
    alignItems: "center",
  }}
    onClick={({ key }) => handleClick(key) }
    items={[
      {label:<FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>, key: 'bar'},
      {label: <div ><img src={image}  style={{height:50, paddingTop:10}} /></div> , key: 'img',  },
      {label: 'Home', key: 'home', },
      
      {label: 'Categories', key: 'categories', 
        children:[
          {label: 'Laptop', key: 'laptop',},
          {label: 'Food', key: 'food',}
        ]},

      {label: '   ', style:{width:'35vw'} },

      {label: 'Login', key: 'login', },
      {label: 'Register', key: 'register', },

      {label:<div> <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon>Profile</div> , key: 'profile',children:[
        {label: <div>{name }</div>, key: 'profile'},
        {label: 'Logout', key: 'logout'}, 
      ]},
      
    ]}>
      
    
    </Menu>
    <Drawer
      title= 'E-commerce'
      placement="left"
      width={200}
      closable={false} 
      onClose={onClose}
      open={open}
      >
      {navItems[role].map(item=> 
      <div>
      <Link to={item.link}><Button style={{ border: "none" }} onClick={()=>setOpen(false)}>{item.label}</Button></Link> <br/>
      </div>)}

    </Drawer>
    </div>
  );
};

export default NavBar;