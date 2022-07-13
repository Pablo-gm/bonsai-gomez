import React, {createContext, useState} from 'react'

export const context = createContext();

function CartContext({children, emptyCart = []}) {
    const [cart, setCart] = useState(emptyCart);

    function clearCart(){
        setCart([])
    }

    function isInCart(id) {
        const foundItem = cart.find( i => i.item.id === id);
        if(foundItem){
            return true;
        }
        return false;
    }

    function addItem(item, quantity){
        if(isInCart(item.id)){
            console.log("already in cart");
        }else{
            setCart([...cart, {item, quantity}])
        }
    }

    function removeItem(id){
        const newCart = cart.filter( i => i.item.id !== id);
        setCart(newCart);
    }

    function numberOfItems(){
        let count = 0;
        cart.forEach(item => count += item.quantity)
        return count;
    }

    function getSubtotal(){
        let st = 0;
        cart.forEach(p => {
          st += p.item.price * p.quantity;
        });
        return st;
      }
    
    function getShipping(){
        let s = 0;
        cart.forEach(p => {
            s += p.item.price * p.quantity;
        });
        return s > 500 ? 0.00 : 120.00;
    }

    function getTotal(){
        let t = 0;
        cart.forEach(p => {
            t += p.item.price * p.quantity;
        });
        return t > 500 ? t : t + 120;
    }
    

  return (
    <context.Provider value={{cart, clearCart, isInCart, addItem, removeItem, numberOfItems, getSubtotal, getShipping, getTotal}}>
        {children}
    </context.Provider>
  )
}

export default CartContext