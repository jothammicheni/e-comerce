import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useUser } from '../context/context';

const Home = () => {
  const [data, setData] = useState([]);
   const[filterItem,setFilteItem]=useState('')
   const{addItemsCart}=useUser()
//filter items//
   function filterItems(input) {
    const regex = new RegExp(`^${input}`, 'i');
    return data.filter(item => regex.test(item.itemName));
  }

  //console.log(filteredItems.length)

  //print items//
  useEffect(() => {
    try {
      axios.get('http://localhost/online_shop_database/sell_products.php')
        .then(response => {
          const result = response.data;
         // console.log(result);
           
            //setData(result);
          
          
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }, []);

  useEffect(() => {
    if (filterItem) {
      const filteredItems = filterItems(filterItem);
      setData(filteredItems);
    } else {
      // If filterItem is empty, reset data to original unfiltered state
      try {
        axios.get('http://localhost/online_shop_database/sell_products.php')
          .then(response => {
            const result = response.data;
            setData(result);
          })
          .catch(error => {
            console.error('Error fetching product data:', error);
          });
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  }, [filterItem]);

  
  return (
    <div className='row' style={{ background: 'whit' }}>
       <div className='row bg-successs ' style={{background:''}}>
        <div className='col'>
          <input className='mt-3' type='text' 
           style={{height:'30px',width:'100%',outline:'none',borderRadius:'5px',textAlign:'center',border:'none'}}
            placeholder='Search for an Item here'
            value={filterItem} 
            onChange={(e)=>setFilteItem(e.target.value)}
           />
        </div>
        <div className='col' style={{maxWidth:'200px',width:'200px'}}>
         <Button className='mt-2 ' style={{width:'100%'}}  onClick={()=>filterItems(filterItem)}>search</Button>
        </div>
      </div>

    <div className=' row mt-2' style={{ background: 'white' }}>   
     
      { data.length>=1?(
        data.map(item => (
        <div key={item.itemid}  className='col m-3' style={{maxWidth:'300px', width:'300px'}}>
        <div
         className='row'
          style={{maxWidth:'200px', width:'200px',maxHeight:'200px',height:'200px'}}
          >
          <img src={`data:image/png;base64,${item.item}`} alt={item.itemid} />
          </div>
         <h6>{item.itemName}</h6>
          
          <h6 variant='success'>Price:sh {item.price}</h6>    
          <div className='row mt-2' style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
          <Button className='primary' style={{width:'200px'}} onClick={()=>addItemsCart(item)}>add cart </Button>

          </div>
        </div>
      ))
      ):(
        <h1>Items not available at the moment</h1>
      )
      }
        
       
      </div>

    <div className='row mt-5'>
         <div className='col' style={{maxWidth:'300px', width:'300px',color:'white',textAlign:'start'}}>
          <h4>Contact us</h4>
          <ul>
             <li>twitter</li>
             <li>Gmail</li>
             <li>watsaap</li>
             <li>linkedin</li>
             <li>twitter</li>
             <li>Gmail</li>
             <li>watsaap</li>
             <li>linkedin</li>
          </ul>
         </div>
         <div className='col' style={{maxWidth:'300px', width:'300px',color:'white',textAlign:'start'}}>
          <h4>Contact us</h4>
          <ul>
             <li>twitter</li>
             <li>Gmail</li>
             <li>watsaap</li>
             <li>linkedin</li>
             <li>twitter</li>
             <li>Gmail</li>
             <li>watsaap</li>
             <li>linkedin</li>
          </ul>
         </div>
         <div className='col' style={{maxWidth:'300px', width:'300px',color:'white',textAlign:'start'}}>
          <h4>Contact us</h4>
          <ul>
             <li>twitter</li>
             <li>Gmail</li>
             <li>watsaap</li>
             <li>linkedin</li>
             <li>twitter</li>
             <li>Gmail</li>
             <li>watsaap</li>
             <li>linkedin</li>
          </ul>
         </div>

    </div>

    </div>
    
  );
}

export default Home;
