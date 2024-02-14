import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useUser} from '../../context/context'
import { database} from '../../firebase'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as databaseRef, push, set } from 'firebase/database';

const SellProducts = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [error, setError] = useState('');
  const { sellerData } = useUser();

  const sellProducts = async (e) => {
    e.preventDefault();

    if (!itemName.trim() || !price.trim() || !desc.trim() || !category.trim() || !itemImage) {
      setError('Fill all the fields');
      return;
    }

    setError('');

    try {
      const storage = getStorage();
      const database = getDatabase();

      const productsRef = databaseRef(database, 'products');
      const newProductKey = push(productsRef).key;

      const storeRef = storageRef(storage, `itemImages/${newProductKey}`);
      await uploadBytes(storeRef, itemImage);


      const newProduct = {
        itemName: itemName,
        price: price,
        desc: desc,
        category: category,
        sellerName: sellerData.name,
      };

      await set(databaseRef(database, `products/${newProductKey}`), newProduct);
      alert('uploaded')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='container mt-5'>
    <div className="row justify-content-center">
      <form  className='bg-light' style={{width:'700px'}} >
        <h3 style={{textShadow: '3px'}}>Enter your Item details :</h3>
        
        <div  className='mt-2'>
            <label htmlFor='item-name'>Enter the Item Name :</label>
            <input className='form-contrl' type='text' id='item-name' name='item-name' required placeholder='Eg  cotton jacket' onChange={(e)=>setItemName(e.target.value)}/>
            </div>
           <div  className='mt-2'>
            <label htmlFor='price'>Enter item price:(Shillings only)</label>
            <input className='form-contrl' type='text' id='price' name='price' required placeholder='Eg  5000'  onChange={(e)=>setPrice(e.target.value) }/>
            </div>
            <div  className='mt-2'>
            <label htmlFor='category'>Choose Item category</label>
            <select id='category' required value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value={'option 1'} >option 1</option>
                  <option value='option 2'>option 2</option>
                  <option value='option 3'>option 3</option>
                  <option value='option 4'>option 4</option>
                  <option value='option 5'>option 5</option>
                  <option value='option 6'>option 6</option>
                  <option value='option 7'>option 7</option>
              </select>
            </div>
            <div className='mt-2'>
             <label htmlFor='password'>Enter Item description </label>
               <textarea required  placeholder='Describe the item you have aploaded' onChange={(e)=>setDesc(e.target.value)}>
           
               </textarea>
             </div>
             <div  className='mt-2'>
            <label htmlFor='price'>Upload your Item here:(png,npg and jpeg only)</label>
            <input className='form-contrl' type='file' id='item' name='item' required placeholder='Eg  android.png' onChange={(e)=>setItemImage(e.target.files[0])} />
            </div>
 
            <span style={{color:'red'}}>{error}</span>
            <div  className='mt-2  mb-5'>
                 <button className='bg-primary' type='submit' style={{width: '300px', height:'50px'}} onClick={(e)=>sellProducts(e)}>Add Item</button>
            </div> 
            <div  className='mt-2'>
               <h3 style={{color:'blue'}}>step 3 of 3</h3>
            </div>
        </form> 
       </div>

      </div>
  )
}

export default SellProducts
