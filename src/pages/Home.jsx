import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import this
import { fetchProducts, searchProductByName } from "../services/api";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); // Use URL params

    // Read params from URL
    const selectedCategory = searchParams.get("category") || "";
    const searchQuery = searchParams.get("search") || "";

    const [sortOption, setSortOption] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        // 1. Define the function we want to run
        const loadProducts = async () => {
            setLoading(true);
            setProducts([]); // Clear products to force spinner
            setPage(1); // Reset page

            try {
                let data;
                if (searchQuery) {
                    data = await searchProductByName(searchQuery, 1);
                } else {
                    data = await fetchProducts(1, selectedCategory, sortOption);
                }
                setProducts(data?.products || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();

    }, [searchQuery, selectedCategory, sortOption]); // Trigger on sort/category/search change

    // 2. Load More Logic
    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setLoading(true);
        try {
            let data;
            if (searchQuery) {
                data = await searchProductByName(searchQuery, nextPage);
            } else {
                data = await fetchProducts(nextPage, selectedCategory, sortOption);
            }

            if (data?.products && data.products.length > 0) {
                setProducts(prev => [...prev, ...data.products]); // Append data
                setPage(nextPage);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 pt-6 flex flex-col md:flex-row gap-6">
            {/* Sidebar - Compact on tablet */}
            <div className="w-full md:w-56 lg:w-64 shrink-0">
                <FilterPanel
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => {
                        // Update URL instead of local state
                        setSearchParams(prev => {
                            if (cat) prev.set("category", cat);
                            else prev.delete("category");
                            return prev;
                        });
                    }}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                {/* Show Loading ONLY if it's initial load (no products yet) */}
                {loading && products.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="spinner animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    // Combine code + index to ensure unique keys even with API duplicates
                                    <ProductCard key={`${product.code}-${index}`} product={product} />
                                ))
                            ) : (
                                <p className="text-center col-span-full">No products found.</p>
                            )}
                        </div>

                        {/* Load More Button - Only show if we have products */}
                        {products.length > 0 && (
                            <div className="flex justify-center pb-12 pt-8">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        "Load More Products"
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default Home;