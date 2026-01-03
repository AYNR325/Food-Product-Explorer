import React, { useState, useEffect } from "react";
import { getCategories } from "../services/api";

function FilterPanel({ selectedCategory, onSelectCategory, sortOption, onSortChange }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Load categories (Function we made in api.js)
        const data = getCategories();
        setCategories(data);
    }, []);

    return (
        <div className="glass-panel p-4 rounded-2xl h-fit sticky top-20">
            <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                📂 Categories
            </h3>
            <div className="flex flex-col gap-1">
                <button
                    onClick={() => onSelectCategory("")}
                    className={`text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${selectedCategory === ""
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "hover:bg-white/50 text-gray-600 hover:text-orange-600"
                        }`}
                >
                    All Products
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${selectedCategory === cat.id
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                            : "hover:bg-white/50 text-gray-600 hover:text-orange-600"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="my-4 border-t border-gray-200/50"></div>

            <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                🔃 Sort By
            </h3>
            <div className="relative group">
                <select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full glass-input appearance-none px-4 py-2.5 rounded-xl text-gray-700 text-sm font-medium cursor-pointer shadow-sm focus:shadow-md transition-shadow pr-10 hover:bg-white/80"
                >
                    <option value="">Default Sorting</option>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="grade_asc">Nutrition Grade (Best First)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-orange-500 transition-transform group-hover:translate-y-0.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;