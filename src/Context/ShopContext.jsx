import React, { createContext, useState } from "react"
import all_product from '../Components/Assets/all_product'
export const ShopContext = createContext(null);
const getDefaultCart=()=>{
    let cart={}
    for(let index=0;index<all_product.length+1;index++)
    {
        cart[index]=0;
    }
    return cart;
}
const ShopContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState(getDefaultCart())
    
    const addToCart=(itemId)=>{
        //console.log(cartItems)
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
        console.log(setCartItems)
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        Object.keys(cartItems).forEach((key) => {
            if (cartItems[key] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(key));
                totalAmount += itemInfo.new_price * cartItems[key];
            }
            else
            {
                return null;
            }
        });
        return totalAmount;
    };
    
    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }
    
    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;