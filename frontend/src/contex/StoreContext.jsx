/*This React context setup is used to make food_list accessible to all components in your app without passing it manually as props.*/
import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFood_list] = useState([])
    const [cartItem, setCartItem] = useState({});

    const url = process.env.REACT_APP_BACKEND_URL;
    const [token, setToken] = useState(() => localStorage.getItem("Token") || "");


    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        try {
            if (token) {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
            }
        } catch (error) {
            console.log(error)
        }

    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFood_list(response.data.data)
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTocartTotal = () => {
        let totalAmount = 0;
        for (const item in cartItem) {  //item:key value
            if (cartItem[item] > 0) {
                // this is a function
                let iteminfo = food_list.find((product) => product._id === item)
                totalAmount += iteminfo.price * cartItem[item]
            }

        }
        return totalAmount
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItem((await response).data.cartData)
    }

    useEffect(() => {

        async function loadData() {
            await fetchFoodList()
            const savedToken = localStorage.getItem("Token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken)
            }
        }
        loadData()
    }, []);



    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTocartTotal,
        url,
        token,
        setToken
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;