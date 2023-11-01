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
        const isAdded = cart.some(item => item.itemid === product.itemid);
  
        if (isAdded) {
          console.log('item already exist');
        } else {
          setCart([...cart, product]);
          const itemid = product.itemid;
          const sellerEmail = sellerData.email;
  
          axios.post('http://localhost/online_shop_database/cart.php', { itemid, sellerEmail })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('Errorr:', error);
            });
        }
      });
  };

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
