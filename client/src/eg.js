import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faBars,  } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Menu,  } from 'antd';

// problems in navbar hen putting it when thers isnt aperson logged in

const NavBa = () => {
  const { name, role } = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);


  const handleClick = (key) => {
    switch (key) {
    
        case 'img':
          navigate('/');
          break;
      case 'home':
        navigate('/');
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
     mode="vertical"
     style={{backgroundColor:role=='user'? 'teal' : 'gray', 
    color:'white', 
    fontSize: 24, 
    alignItems: "center",
  }}
    onClick={({ key }) => handleClick(key) }
    items={[
      {label:<FontAwesomeIcon icon={faBars} ></FontAwesomeIcon>, key: 'bar'},
      {label: <div >ho</div> , key: 'img',  },
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
   
    </div>
  );
};

export default NavBa;