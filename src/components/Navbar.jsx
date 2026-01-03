import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("search") || "";
    const [inputValue, setInputValue] = useState(initialQuery);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const lastSearchRef = React.useRef(inputValue); // Track last searched value
    const { totalItems } = useCart();


    useEffect(() => {
        if (location.pathname === "/") {
            const queryFromUrl = searchParams.get("search") || "";
            if (queryFromUrl !== inputValue && queryFromUrl !== lastSearchRef.current) {
                setInputValue(queryFromUrl);
            }
        }
    }, [searchParams, location.pathname]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Only search if the value actually changed
            if (inputValue === lastSearchRef.current) {
                return;
            }
            lastSearchRef.current = inputValue; // Update ref

            // Check if input is ONLY numbers and at least 8 chars (Smart Barcode Detection)
            const isBarcode = /^\d{8,}$/.test(inputValue);

            if (isBarcode) {
                // If it looks like a barcode, go directly to Details Page!
                navigate(`/product/${inputValue}`);
            } else {

                // If we are NOT on home, navigate there with the search
                if (location.pathname !== '/') {
                    if (inputValue) {
                        navigate(`/?search=${inputValue}`);
                    }
                } else {
                    // Otherwise, currently on Home, just update params (replace history to avoid clutter)
                    setSearchParams(prev => {
                        if (inputValue) {
                            prev.set("search", inputValue);
                            prev.delete("category");
                        } else {
                            prev.delete("search");
                        }
                        return prev;
                    }, { replace: true });
                }
            }
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [inputValue, navigate, setSearchParams, location.pathname]);

    return (
        <nav className="bg-white/30 backdrop-blur-xl border-b border-white/30 shadow-lg sticky top-0 z-50 w-full px-6 py-3 transition-all">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer drop-shadow-sm" onClick={() => navigate('/')}>
                    FoodExplorer
                </h1>
                {/* Cart Icon */}

                <input
                    type="search"
                    placeholder="Search for coffee, nutella..."
                    className="glass-input max-w-md w-full rounded-full px-5 py-2.5 text-gray-800 shadow-inner placeholder:text-gray-500 text-sm border-white/40 focus:bg-white/80"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="relative cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/cart')}>
                    <span className="text-3xl">🛒</span>
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                            {totalItems}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;