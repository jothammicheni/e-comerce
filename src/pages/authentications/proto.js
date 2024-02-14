
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useUser } from '../context/context';
import { motion } from 'framer-motion';
import { ref, get, onValue, getDownloadURL } from 'firebase/database';
import { database, storage } from '../firebase';

const Home = (e) => {
  const [data, setData] = useState([]);
  const [filterItem, setFilterItem] = useState('');
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [animate, setAnimate] = useState(false);

  const { addItemsCart } = useUser();

  // Filter items
  function filterItems(input) {
    const regex = new RegExp(`^${input}`, 'i');
    return data.filter(item => regex.test(item.itemName)); 
  }

  // Fetch data from Firebase Realtime Database
// Fetch image URLs from Firebase Storage based on product IDs
useEffect(() => {
    const fetchData = async () => {
      const promises = data.map(async (item) => {
        try {
          const imageURLRef = ref(storage, `itemImages/${item.id}`);
          const imageURL = await getDownloadURL(imageURLRef);
          console.log('Fetched image URL:', imageURL);
          return { ...item, imageURL };
        } catch (error) {
          console.error('Error fetching image URL:', error);
          return { ...item, imageURL: '' }; // Provide a default URL or handle error
        }
      });
  
      const updatedData = await Promise.all(promises);
      setData(updatedData);

      alert(data) .
    };
  
    fetchData();
  }, [data]);
  
  // Handle filtering when filterItem changes
  useEffect(() => {
    if (filterItem) {
      const filteredItems = filterItems(filterItem);
      setData(filteredItems);
    } else {
      const productsRef = ref(database, 'products');

      const fetchData = onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          console.log('Fetched data:', data);
          setData(Object.values(data));
        } else {
          console.log('No data available');
          setData([]);
        }
      });

      return () => {
        fetchData();
      };
    }
  }, [filterItem]);

  
  return (
    <div className='row' style={{ background: 'whit' }}>
       <div className='row bg-successs ' style={{background:''}}>
        <div className='col'>
          <input className='mt-3' type='text' 
           style={{height:'30px',width:'100%',outline:'none',borderRadius:'5px',textAlign:'center',border:'none'}}
            placeholder='Search for an Item here..'
            value={filterItem} 
            onChange={(e)=>setFilteItem(e.target.value)}
           />
        </div>
        <div className='col' style={{maxWidth:'200px',width:'200px'}}>
         <Button className='mt-2 ' style={{width:'100%'}}   onClick={()=>filterItems(filterItem)}>search</Button>
        </div>
      </div>

    <div className=' row mt-2' style={{ background: 'white'}}>   
     
      { data.length>=1?(
        data.map(item => (
        <div key={item.itemid}  className='col m-3' style={{maxWidth:'300px', width:'300px'}}>
        <motion.div
         className='row'
          style={{maxWidth:'200px', width:'200px',maxHeight:'200px',height:'200px'}}
           animate={{
            key:item.id,
            width:animate?  size.width: 200,
            height:animate? size.height: 200
           }}
            onMouseOver={()=>{
              setAnimate(true)
               setSize({width:size.width+20 ,  height:size.height+20})
              console.log(size.width)
            }}
            onMouseLeave={()=>{
              setAnimate(true)
              setSize({width:200 , height:200})
              

            }}
          >
          <img src={`data:image/png;base64,${item.item}`} alt={item.itemid} />
          </motion.div>

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
