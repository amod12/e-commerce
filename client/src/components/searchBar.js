import { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"
import { faSearch,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Search() {
  const [value, setValue] = useState("");
  const [validItems, setvalidItems] = useState([])
  const navigate = useNavigate()


  const onChange = (event) => {
    setTimeout(() => {
      setValue(event.target.value);
    }, 2000);
   
  };

  const fetchAvailableItems = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/item?qSearch=${value}`, ).then((response) => {
      setvalidItems(response.data.validItemOptions)
    });
  }
  useEffect(() => {
    fetchAvailableItems()
  }, [value]) 
  {console.log(validItems)}
  

  return (
    <div className="App">
      <div className="search-container">
      <div className='search' >
      <input type="search" className='search_box' placeholder='Search' style={{marginTop: -1}}
       onChange={onChange}
      />
      <FontAwesomeIcon icon={faSearch} className='search_icon' onClick={()=>navigate('/',{ state: { key: 'validItems', data: validItems }}) } />

    </div>
        { validItems.length !== 0 && value !== ''?
        <div className="dropdown" >
          {validItems        
            .map((item) => (
              <div
                onClick={() =>{navigate('/itemPage',  { state:item }); }  
              }
                className="dropdown-row"
                key={item.catagoryName}
              >
                {item.catagoryName}
              </div>
            ))}
        </div>: null}
      </div>
    </div>
  );
}


