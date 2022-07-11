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
        console.log(cart);
    }

    function removeItem(id){
        const newCart = cart.filter( i => i.item.id !== id);
        setCart(newCart);
    }

    function numberOfItems(){
        return cart.length ? cart.length : 0;
    }

  return (
    <context.Provider value={{cart, clearCart, isInCart, addItem, removeItem, numberOfItems}}>
        {children}
    </context.Provider>
  )
}

export default CartContext