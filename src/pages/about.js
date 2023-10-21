import React from 'react'
import { useUser } from '../context/context'
import { Button } from 'react-bootstrap'
const About = () => {
  const { cart } = useUser()
  
  return (
   <div className='container'>
    
      <h3 className='mt-2'  style={{padding:'none',color:'white'}}>Total cart price :<span>sh {1000}</span></h3>
    
    <div className='container' style={{ background: 'white' }}>
      {cart.map((item) => (
        <div className='row mt-2  bg-light' key={item.itemid}  style={{maxHeight:'100px',height:'100px'}}>
         <div className='col' 
         style={{maxWidth:'200px', width:'200px',maxHeight:'200px',height:'200px'}}
         >
         <img 
         src={`data:image/png;base64,${item.item}`}
          alt={item.itemName} 
         style={{height:'100px',width:'100px'}} 

         />
         </div>
         <div className='col' style={{maxWidth:'200px',width:'200px'}}>
           <p>{item.itemName}</p>
         </div>
         <div className='col'>
           <p>{item.price}</p>
         </div>
         <div className='col'>
           <div className='col'>
             <Button className='bg-success'>+</Button>
             <span>{0}</span>
             <Button  className='bg-success'>-</Button>
           </div>
         </div>
         <div className='col'>
           <Button className='bg-danger'>Del</Button>
         </div>
        </div>
      ))}
    </div>

    <Button className='mt-2' style={{}}>buy now</Button>
    </div> 
  )
}

export default About
