import React, { useEffect, useState } from 'react'
import { useUser } from '../context/context'
import { Button } from 'react-bootstrap'
const About = () => {
  const { cart,setCart } = useUser()
  const[price,setprice]=useState(0)
  const[amount,setAmount]=useState(1)
 
function cartTotalPrice(){
  let totalCost=0;
  cart.length>0?(
   cart.map(item => {
     totalCost+=amount*item.price;
     console.log(totalCost)
   })
  ):(
    console.log(0)
  )
   setprice(totalCost)
}

useEffect(()=>{
cartTotalPrice(price)
})

function removeCart(id){
     let err=cart.filter((item)=>item.itemid!=id)
     setCart(err)
     console.log("deleted")
  }

  function incrementItems(itemId) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.itemid === itemId ? { ...item, amount: item.amount + 1 } : item
      )
    );
  }

  function decrementItems(itemId) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.itemid === itemId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      )
    );
  }





  
  return (
   <div className='container'>
    
      <h3 className='mt-2'  style={{padding:'none',color:'white'}}>Total cart price :<span>sh {price}</span></h3>
    
    <div className='container' style={{ background: 'white' }}>
      {cart.map((item) => (
        <div className='row mt-2  bg-light' key={item.itemid}  style={{maxHeight:'100px',height:'100px'}}>
         <div className='col' 
         style={{maxWidth:'200px', width:'200px',maxHeight:'200px',height:'200px'}}
         >
         <img 
         src={`data:image/png;base64,${item.item}` }
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
             <Button 
              className='bg-success'
              onClick={incrementItems}
             >+</Button>
             <span>{amount}</span>
             <Button 
              className='bg-success'
              onClick={decrementItems}
             
             >-</Button>
           </div>
         </div>
         <div className='col'>
           <Button className='bg-danger' onClick={()=>removeCart(item.itemid)}>Del</Button>
         </div>
        </div>
      ))}
    </div>

    <Button className='mt-2' style={{}}>buy now</Button>
    </div> 
  )
}

export default About
