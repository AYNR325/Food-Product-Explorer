import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductDetails } from "../services/api";

function ProductDetails() {
    const { barcode } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getProductDetails(barcode);
                setProduct(data.product);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [barcode])

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="spinner"></div>
        </div>
    );
    if (!product) return <div className="text-center p-10">Product not found</div>;

    // Helper to safety check values
    const getNutrient = (name) => product.nutriments?.[name] || "--";

    // Helper to format tags (e.g., "en:milk" -> "Milk")
    const formatTag = (tag) => tag.replace(/^[a-z]{2}:/, "").replace(/-/g, " ");

    const getEcoScoreColor = (score) => {
        const colors = {
            a: "bg-green-500",
            b: "bg-teal-500",
            c: "bg-yellow-500",
            d: "bg-orange-500",
            e: "bg-red-500",
        };
        return colors[score] || "bg-gray-400";
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <Link to="/" className="text-gray-600 hover:text-orange-600 mb-6 inline-flex items-center gap-2 font-medium transition-colors">
                <span>←</span> Back to Search
            </Link>

            <div className="glass-panel p-8 rounded-3xl grid md:grid-cols-2 gap-10">
                {/* Image Section */}
                {/* Image Section */}
                <div className="bg-white/40 p-8 rounded-2xl flex items-center justify-center  relative border border-white/60 shadow-inner min-h-[300px]">
                    <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="max-h-80 w-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Info Section */}
                <div>
                    {/* Header: Barcode & Eco-Score */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs text-orange-600/80 font-mono tracking-widest bg-orange-100 px-2 py-1 rounded">BARCODE: {product.code}</span>

                        {product.ecoscore_grade && product.ecoscore_grade !== "unknown" && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm text-white ${getEcoScoreColor(product.ecoscore_grade)}`}>
                                Eco-Score {product.ecoscore_grade}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">{product.product_name}</h1>
                    <p className="text-xl text-gray-500 font-medium border-b border-gray-100 pb-4 mb-6">{product.brands}</p>


                    {/* Nutrition Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        <NutrientCard label="Energy" value={`${getNutrient('energy-kcal_100g')} kcal`} />
                        <NutrientCard label="Fat" value={`${getNutrient('fat_100g')} g`} />
                        <NutrientCard label="Carbs" value={`${getNutrient('carbohydrates_100g')} g`} />
                        <NutrientCard label="Proteins" value={`${getNutrient('proteins_100g')} g`} />
                    </div>

                    {/* Allergens & Additives Section */}
                    <div className="space-y-6 mb-8">
                        {/* Allergens */}
                        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                ⚠️ Allergens
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.allergens_tags?.length > 0 ? (
                                    product.allergens_tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-white text-red-600 text-sm rounded-lg font-semibold border border-red-100 shadow-sm">
                                            {formatTag(tag)}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-400 italic">No allergens listed ✅</span>
                                )}
                            </div>
                        </div>

                        {/* Additives */}
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                🧪 Additives
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.additives_tags?.length > 0 ? (
                                    product.additives_tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-white text-blue-600 text-sm rounded-lg font-semibold border border-blue-100 shadow-sm">
                                            {formatTag(tag)}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-400 italic">No additives found ✨</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Ingredients with backup text */}
                    <div className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-sm">
                        <h3 className="text-lg font-bold mb-3 text-gray-800">📝 Ingredients</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {product.ingredients_text ? product.ingredients_text : "No detailed ingredients found for this product."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Small helper component for the boxes
const NutrientCard = ({ label, value }) => (
    <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl text-center border border-white/50 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-1">{label}</h3>
        <p className="text-lg font-extrabold text-gray-800">{value}</p>
    </div>
);

export default ProductDetails;