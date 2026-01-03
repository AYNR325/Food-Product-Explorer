import React, { createContext, useContext, useState, useEffect } from 'react';


const CartContext = createContext();

export function CartProvider({ children }) {
    //load initial cart from local storage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('foodExplorerCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //save to local storage whenever cart items changes
    useEffect(() => {
        localStorage.setItem('foodExplorerCart', JSON.stringify(cart));
    }, [cart])

    //Add to Cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            //check if item already exists
            const existing = prevCart.find((item) => item.code === product.code);
            if (existing) {
                //if exists increase the quantity
                return prevCart.map((item) =>
                    item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // if new , add it with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    //remove product from cart
    const removeFromCart = (productCode) => {
        setCart((prev) => prev.filter((item) => item.code != productCode));
    }

    //to calculate total items
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>
            {children}
        </CartContext.Provider>
    )
}
// Custom Hook to use the Cart
export const useCart = () => useContext(CartContext);