import React, { useState } from 'react'
import '../styles/contact.css'
const Contact = () => {
  const[describe,setDescripton]=useState('')
  
  return (
    <div className='mt-4  container-fluid '  style={{height:'auto',backgroundColor:'white'}} >
      <div className='row' style={{width:'100%',margin:'20px'}}>

      <div className='row  mt-3' style={{color:'black'}}>
               <p style={{fontFamily:'inherit',fontSize:'30px',textAlign:'left',fontWeight:'bold'}}>contact us</p>
               <div style={{width:'100%',backgroundColor:'black',height:'2px'}}>
               <div style={{width:'20%',backgroundColor:'red',height:'2px'}}></div>
              </div>
         </div>
          <div className='col'>
          
           <div className='row mt-4' style={{width:'100%',backgroundColor:'#b0b3af'}}>
                <p  style={{textAlign:'left'}}>use these form to contact us</p>
              </div>

           
              <div  className='row  mt-4'>
                <div className='col' style={{textAlign:'left'}}>
                   <label htmlFor='name' >Name <span style={{color:'red',fontSize:'20px'}}>*</span></label>
                   <input className='inputs' type='text' id='name' placeholder='firstName' />
                </div>
                <div className='col' style={{textAlign:'left'}}>
                   <label htmlFor='Lastname' ><span style={{color:'red',fontSize:'20px'}}>.</span></label>
                   <input className='inputs' type='text' id='Lastname' placeholder='Lastmame' />
                </div>
                
              </div>

              <div  className='row  mt-4'>
                <div className='col' style={{textAlign:'left'}}>
                   <label htmlFor='email' >Email <span style={{color:'red',fontSize:'20px'}}>*</span></label>
                   <input className='inputs' type='email' id='name' placeholder='abc@gmail.com' />
                </div>
                <div className='col' style={{textAlign:'left'}}>
                   <label htmlFor='phone' >Phone<span style={{color:'red',fontSize:'20px'}}>*</span></label>
                   <input className='inputs' type='text' id='phone' placeholder='728930159' />
                </div>
                
              </div>
              <div  className='row mt-4'>
              <div className='col' style={{textAlign:'left'}}>
                   <label htmlFor='subject' >Subject<span style={{color:'red',fontSize:'20px'}}>*</span></label>
                   <input className='inputs' type='text' id='subject' placeholder='728930159' />
                </div>
                
              </div>

              <div  className='row mt-4'>
              <div className='col' style={{textAlign:'left'}}>
                   <label htmlFor='subject' >Subject<span style={{color:'red',fontSize:'20px'}}>*</span></label>
                   <select className='inputs'  id='subject' >
                      <option value='register with us'>register with us</option> 
                      <option value={'selling with us'}> selling with us</option> 
                      <option  value={'buying from us'}> buying  from us</option> 
                      <option  value={'feedback'}>  feed back</option> 
                   </select>
                       
                  
              </div>
                
              </div>

              <div  className='row mt-4  '>
              <div className='col' style={{textAlign:'left'}} >
                   <label htmlFor='message' >Message<span style={{color:'red',fontSize:'20px'}}>*</span></label>
                   <textarea className='input' id='message' rows={40}  cols={30}>
                       
                   </textarea>
              </div>
            </div>

            <div  className='row mt-4  '>
              <div className='col' style={{textAlign:'center'}}>
                    <button className='m-5' style={{backgroundColor:'red',color:'white',width:'200px',height:'50px'}}>submit</button>
              </div>
            </div>


          </div>
          <div className='col'>
            email
           </div>
        </div>   

     </div>
    
  )
}

export default Contact
