// context.js
import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [sellerData, setSellerData] = useState({ name: '', email: '' });
  const[items,setItems]=useState([])
  const[cart,setCart]=useState([])

  const addItemsCart = (product) => {
    axios.get('http://localhost/online_shop_database/sell_products.php')
      .then(response => {
        setItems(response.data);
  let isAdded=false;
        response.data.forEach(item => {
          if (item.itemid === product.id) {
            console.log('Item already exists');
            isAdded = true;
          }
        });

        if (!isAdded) {
          setCart( [...cart, product]);
          console.log(cart);
          const itemid=product.id
          const sellerEmail=sellerData.email;
          axios.post('http://localhost/online_shop_database/cart.php', itemid,sellerEmail)

         // console.log(items);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  // const addItemsCart = (product) => {
  //   // Assuming that the response data is an array of objects
  //   axios.get('http://localhost/online_shop_database/sell_products.php')
  //     .then(response => {
  //       const updatedItems = response.data;
  
  //       // Check if the product with the same ID is already in the cart
  //       const isAdded = cart.some(item => item.itemId === product.id);
  
  //       if (!isAdded) {
  //         // Add the entire product object to the cart
  //         setCart(previous => [...previous, product]);
  //         console.log(cart);
  //       } else {
  //         console.log('Item already exists');
  //         console.log(cart.length);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // };
  




  return (
    <UserContext.Provider value={{ sellerData, setSellerData,addItemsCart , cart}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
