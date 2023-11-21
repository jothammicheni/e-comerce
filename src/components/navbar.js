import React, { useEffect } from 'react'
import Logo from '../assets/logo.png'
import '../styles/nav.css'
import { Link } from 'react-router-dom';
//import Nav from 'react-bootstrap/Nav';mm
import Nav  from 'react-bootstrap/Nav';
import {useUser} from '../context/context'
const Navbar = () => {
 const{sellerData}=useUser();
 const{color,setColor}=useUser();

 

  let black='#0f0f0f'
  useEffect(() => {
    document.body.style.backgroundColor = color ? '#0f0f0f' : ''; // Set the desired color
  }, [color]);
  
 

 
  return (
    <div className='container-fluid  bg-light' style={{top:'0px', position:'sticky'}}>
         <div className='row  main-nav bg-light'
       

         >
            <div 
            className='col bg-light mr-5'
             style={{ maxWidth: '300px',maxHeight: '200px', width: '100%' }} 
             onClick={() => setColor(!color)}
            >
              <img src={Logo} className='img-fluid' alt='logo' style={{width: '100px' , height: '100px'}} />
            </div>
        <div className='col bg-light  d-flex flex-column justify-content-end' style={{background: 'white', display:'none'}}>
            <ul className='nav bg-light mt-5'  variant='secondary'>
               <li className='nav-item'>
                 <Nav.Link  as={Link} className='nav-link active  ' variant=" dark " style={{fontSize: '1.2',color: 'black'}} to='/'>Home</Nav.Link>
               </li>
               <li className='nav-item'>
                  <Nav.Link className='nav-link active' as={Link} to='/sellerLogin' style={{color: 'black'}}>sell</Nav.Link>
               </li>
               <li className='nav-item'>
                 <Nav.Link as={Link} className='nav-link active' to='/about'  style={{color: 'black'}}>About us</Nav.Link>
               </li>
               <li className='nav-item'>
                 <Nav.Link as={Link} className='nav-link active' to='/contact' style={{color: 'black'}}> contact</Nav.Link>
               </li>
               <li className='nav-item'>
                 <Nav.Link as={Link} className='nav-link active'  to='/' style={{color: 'black'}}>logout</Nav.Link>
                </li>

            </ul>
            </div>
            <div className='col bg-light' style={{maxWidth: '300px', width:'300px'}} >
                 <ul className='nav mt-5'>
                    <p>Logged in as <span style={{color:'blue',fontWeight:'bold'}}>{sellerData.name}</span></p>
                 </ul>
            </div>
            <div className='col bg-light ' id='toggle-btn' style={{display:''}}>
                <button>why</button>
                <i class="fa fa-th-list" aria-hidden="true"></i>
            </div>
         </div>
    </div>
  )
}

export default Navbar
