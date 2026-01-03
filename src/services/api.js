const BASE_URL = "https://world.openfoodfacts.org";

// Fetch products with pagination, category, and sorting
export const fetchProducts = async (page = 1, category = "", sort = "") => {
    let url;
    let sortParam = "";

    // Simple mapping for OpenFoodFacts sort_by
    if (sort === "name_asc") sortParam = "&sort_by=product_name";
    else if (sort === "name_desc") sortParam = "&sort_by=product_name&sort_order=desc"; // Attempt desc
    else if (sort === "grade_asc") sortParam = "&sort_by=nutrition_grades";

    if (category) {
        url = `${BASE_URL}/category/${category}.json?page=${page}${sortParam}`;
    } else {
        url = `${BASE_URL}/cgi/search.pl?search_simple=1&action=process&json=1&page=${page}&page_size=24${sortParam}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
}

// Search products by name (User types in search bar)
export const searchProductByName = async (query, page = 1) => {
    if (!query) return;
    const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=24`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to search products");
    return response.json();
}

//Get single product by Barcode (For details page)
export const getProductDetails = async (barcode) => {
    if (!barcode) return;
    const url = `${BASE_URL}/api/v0/product/${barcode}.json`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to get product");
    return response.json();

}

//Get Categories (Static list for simplicity as API returns thousands)
export const getCategories = () => {
    return [
        { id: "beverages", name: "Beverages" },
        { id: "dairies", name: "Dairy" },
        { id: "snacks", name: "Snacks" },
        { id: "chocolates", name: "Chocolates" },
        { id: "meats", name: "Meats" },
        { id: "plant-based-foods", name: "Plant Based" },
        { id: "breakfasts", name: "Breakfast" }
    ];
};