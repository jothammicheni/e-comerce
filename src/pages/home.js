import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get('http://localhost/online_shop_database/sell_products.php')
        .then(response => {
          const result = response.data;
          console.log(result);
          setData(result);
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }, []);

  return (
    <div className='row' style={{ background: 'whit' }}>
       <div className='row bg-successs ' style={{background:''}}>
        <div className='col'>
          <input className='mt-3' type='text' 
           style={{height:'30px',width:'100%',outline:'none',borderRadius:'5px',textAlign:'center',border:'none'}}
            placeholder='Search for an Item here'
           />
        </div>
        <div className='col' style={{maxWidth:'200px',width:'200px'}}>
         <Button className='mt-2 ' style={{width:'100%'}}>search</Button>
        </div>
      </div>

    <div className=' row mt-2' style={{ background: 'white' }}>   
     
      {data.map(item => (
        <div key={item.itemid}  className='col m-3' style={{maxWidth:'300px', width:'300px'}}>
        <div
         className='row'
          style={{maxWidth:'300px', width:'300px',maxHeight:'300px',height:'300px'}}
          >
          <img src={`data:image/png;base64,${item.item}`} alt={item.itemName} />
          </div>
         <h6>{item.itemName}</h6>
          
          <h6 variant='success'>Price:sh {item.price}</h6>    
          <div className='row mt-2' style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
          <Button className='primary' style={{width:'200px'}}>add cart </Button>

          </div>
        </div>
      ))}
        
       
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
