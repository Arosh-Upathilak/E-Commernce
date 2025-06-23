/*This React context setup is used to make food_list accessible to all components in your app without passing it manually as props.*/

import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});

    const addToCart = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTocartTotal = () => {
        let totalAmount = 0;
        for (const item in cartItem) {  //item:key value
            if (cartItem[item] > 0) {
                                        // this is a funcion
                let iteminfo = food_list.find((product) => product._id === item)
                totalAmount += iteminfo.price * cartItem[item]
            }

        }
        return totalAmount
    }


    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTocartTotal
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;