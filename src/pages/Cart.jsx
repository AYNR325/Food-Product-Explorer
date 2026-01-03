import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
    const { cart, removeFromCart, addToCart, totalItems } = useCart();

    // Mock price calculation (since API doesn't allow purchasing)
    const totalPrice = cart.reduce((sum, item) => sum + (item.quantity * 4.99), 0).toFixed(2);

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
                <span className="text-6xl">🛒</span>
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                <Link to="/" className="btn-primary px-6 py-3 rounded-full mt-4">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <button
                onClick={() => window.history.back()}
                className="mb-6 text-gray-500 hover:text-orange-600 flex items-center gap-2 font-medium"
            >
                <span>←</span> Back
            </button>
            <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-2">
                Shopping Cart <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">{totalItems} items</span>
            </h1>

            <div className="glass-panel p-6 rounded-3xl">
                {cart.map((item) => (
                    <div key={item.code} className="flex flex-col md:flex-row items-center gap-4 border-b border-gray-100 py-6 last:border-0">
                        {/* Image */}
                        <img
                            src={item.image_url}
                            alt={item.product_name}
                            className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                        />

                        {/* Details */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-bold text-lg text-gray-800">{item.product_name}</h3>
                            <p className="text-sm text-gray-500">{item.brands}</p>
                            <p className="text-orange-600 font-bold mt-1">$4.99</p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">

                            <button onClick={() => removeFromCart(item.code)} className="px-3 py-1 text-red-500 font-bold hover:bg-red-50 rounded">-</button>
                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => addToCart(item)} className="px-3 py-1 text-green-600 font-bold hover:bg-green-50 rounded">+</button>
                        </div>

                        {/* Subtotal */}
                        <div className="font-bold text-lg w-24 text-right">
                            ${(item.quantity * 4.99).toFixed(2)}
                        </div>
                    </div>
                ))}

                {/* Footer Total */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-end gap-2">
                    <div className="text-gray-500">Estimated Total</div>
                    <div className="text-4xl font-extrabold text-gray-900">${totalPrice}</div>
                    <button className="btn-primary w-full md:w-auto px-8 py-4 rounded-xl mt-4 text-lg shadow-xl" onClick={() => alert("Checkout Feature coming soon! 🚧")}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;