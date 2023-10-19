import React, { useState } from 'react'
import '../../styles/auth.css'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SellerRegister = () => {
const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[phone,setPhone]=useState('')
const[password,setPassword]=useState('')
const[error,setError]=useState('')
const navigate=useNavigate();

const registerSeller = (e) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || password.trim() === '') {
      setError('All fields are required');
      return;
    }
  
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
      setError('Enter a valid email address');
      return;
    }
  
    if (!/^\d{10}$/.test(phone)) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
  
    //setError('');
  try{
          const fd = new FormData();
          fd.append('name', name);
          fd.append('email', email);
          fd.append('phone', phone);
          fd.append('password', password);
  
          axios.post('http://localhost/online_shop_database/seller_register.php', fd)
           .then(response=> {
              if(response.data==='Exist')
                setError('Email already registered')
               else{
                navigate('/sellerLogin')
               }
                console.log(response.data)
            })
          
        }catch(error){
            console.error('Error registering seller:', error);
          };
      
     
     // navigate('/sellerLogin')
      setError('');
  };
return (
    <div className='container mt-5'>
    <div className="row justify-content-center">
      <form id='form' autoComplete='off' >
        <h3 style={{textShadow: '3px'}}>Register to  seller account</h3>
        <div  className='mt-2'>
            <label htmlFor='name'>Enter your FullName </label>
            <input className='form-contrl' type='text' id='name' name='name' required placeholder='Eg  Henrik Ebsen' onChange={(e)=>setName(e.target.value)} />
            </div>
           <div  className='mt-2'>
            <label htmlFor='email'>Enter email </label>
            <input className='form-contrl' type='email' id='email' name='email' required placeholder='Eg  abc@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div  className='mt-2'>
            <label htmlFor='phone'>Enter phone (10 digits!) </label>
            <input className='form-contrl' type='tell' id='phone' required placeholder='Eg  0728930152' onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div className='mt-2'>
             <label htmlFor='password'>Enter password </label>
             <input className='form-contrl' type='password' id='password' name='password' required placeholder='Eg  abc@gmail.com' onChange={(e)=>setPassword(e.target.value)} />
            </div>
             <span variant='danger' style={{color:'red'}}>{error}</span>
            <div  className='mt-2'>
                 <button className='bg-primary'  style={{width: '300px', height:'50px'}} onClick={(e)=>registerSeller(e)}>Register</button>
            </div> 
            <div className='mt-2'>
             <p>Have an account??  <Nav.Link as={Link} to='/sellerLogin' style={{color:'blue'}}>Login</Nav.Link> </p>  
            </div>
          
        </form> 
       </div>
      </div>
  )
}

export default SellerRegister
