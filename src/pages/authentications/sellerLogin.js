import React, { useContext, useState } from 'react'
import '../../styles/auth.css'
import { Button } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useUser} from '../../context/context'

const SellerLogin = () => {
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[error,setError]=useState('')
  const{setSellerData}=useUser()
    const navigate=useNavigate()

    const loginSeller=(e)=>{
         e.preventDefault();

         if(!email.trim()|| !password.trim()){
         setError('All fields required');
         }
         setError('')
         const fd = new FormData();
         fd.append('password',password);
         fd.append('email', email);
         axios.post('http://localhost/online_shop_database/seller_login.php',fd)
          //.then(response=>{
            // //console.log(response.data.name)
              

            //  if(response.data ==='Login successful!'){
            //     //alert('login successful')
            //    navigate('/sellProducts')
                 
            //  }else{
            //     setError(response.data);
            //  }
            .then(response => {
                const data = response.data;

                if (response.data==='invalid') {
                    setError('Wrong email or password');
                } else {
                    const { name, email } = data;
                    // Do something with name and email
                    console.log(data);
                    setSellerData({
                        'name':name,
                        'email':email
                    })
                    navigate('/sellProducts')
                     
                  
                }
            })

         

       
    }

  return (
    <div className='container mt-5'>
     <div className="row justify-content-center">
       <form id='form' autoComplete='off' >
         <h3 style={{textShadow: '3px'}}>Login to  seller account</h3>
         
            <div  className='mt-2'>
             <label htmlFor='email'>Enter email </label>
             <input className='form-contrl' type='email' id='email' required placeholder='Eg  abc@gmail.com' onChange={(e)=>setEmail(e.target.value)}/>
             </div>
             <div className='mt-2'>
              <label htmlFor='password'>Enter password </label>
              <input className='form-contrl' type='password' id='password' required placeholder='Eg  abc@gmail.com' onChange={(e)=>setPassword(e.target.value)} />
             </div>
             <span style={{color: 'red'}}>{error}</span>
             <div  className='mt-2'>
                  <button className='bg-primary' type='submit' style={{width: '300px', height:'50px'}} onClick={(e)=>loginSeller(e)}>Login</button>
             </div> 
             <div className='mt-2'>
              <p>Don't have an account??  <Nav.Link as={Link} to='/sellerRegister' style={{color:'blue'}}>Register</Nav.Link> </p>  
             </div>
           
         </form> 
        </div>
       </div>
    
  )
}

export default SellerLogin
