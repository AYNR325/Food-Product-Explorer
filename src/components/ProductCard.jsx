import React from "react";
import { Link } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();
    return (
        <div className="glass-card p-4 flex flex-col gap-3 rounded-2xl h-full">
            <div className="h-48 w-full bg-white/50 rounded-xl overflow-hidden p-4 flex items-center justify-center relative group">
                <img
                    src={product?.image_url || "https://placehold.co/400?text=No+Image"}
                    alt={product.product_name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay Button */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/product/${product.code}`}>
                        <button className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold shadow-lg hover:bg-orange-50 transition-colors">
                            View Details
                        </button>
                    </Link>

                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-gray-800 line-clamp-1" title={product.product_name}>{product.product_name}</h2>
                <p className="text-sm text-gray-500 mb-2">{product.brands}</p>

                <div className="mt-auto flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase border ${product.nutrition_grades === 'a' ? 'bg-green-100 text-green-700 border-green-200' :
                        product.nutrition_grades === 'b' ? 'bg-teal-100 text-teal-700 border-teal-200' :
                            product.nutrition_grades === 'c' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                product.nutrition_grades === 'd' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                    product.nutrition_grades === 'e' ? 'bg-red-100 text-red-700 border-red-200' :
                                        'bg-gray-100 text-gray-500 border-gray-200'
                        }`}>
                        Grade {product.nutrition_grades?.toUpperCase() || "?"}
                    </span>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full bg-orange-100 text-orange-600 font-bold py-2 rounded-xl hover:bg-orange-200 transition-colors flex items-center justify-center gap-2"
                >
                    <span>+</span> Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;