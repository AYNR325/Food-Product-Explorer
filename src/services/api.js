const BASE_URL = "https://world.openfoodfacts.org";

// Fields to fetch for list views (Reduces payload size significantly)
const FIELDS = "code,product_name,brands,image_url,nutrition_grades";

// Fetch products with pagination, category, and sorting
// Helper to get sort param
const getSortParam = (sort) => {
    if (sort === "name_asc") return "&sort_by=product_name";
    if (sort === "name_desc") return "&sort_by=product_name&sort_order=descending";
    if (sort === "grade_asc") return "&sort_by=nutrition_grades";
    return "";
};

// Helper to build robust query with tags
const buildTagParams = (category) => {
    let tags = "";
    let index = 0;

    // 1. Mandatory: Product Name must be completed
    tags += `&tagtype_${index}=states&tag_contains_${index}=contains&tag_${index}=product-name-completed`;
    index++;

    // 2. Mandatory: Photos must be validated (ensures image exists)
    tags += `&tagtype_${index}=states&tag_contains_${index}=contains&tag_${index}=photos-validated`;
    index++;

    // 3. Optional: Category
    if (category) {
        tags += `&tagtype_${index}=categories&tag_contains_${index}=contains&tag_${index}=${category}`;
        index++;
    }

    return tags;
};

// Fetch products with pagination, category, and sorting
export const fetchProducts = async (page = 1, category = "", sort = "") => {
    // Basic Search URL
    let url = `${BASE_URL}/cgi/search.pl?search_simple=1&action=process&json=1&page=${page}&page_size=24&fields=${FIELDS}`;

    // Note: Sorting is now done client-side for reliability
    // url += getSortParam(sort);

    // Add Server-Side Filters (Name + Image + Category)
    url += buildTagParams(category);

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");

    // We can still do a lightweight client-side safety check, but API should be good now
    const data = await response.json();
    if (data.products) {
        data.products = data.products.filter(p => p.product_name && p.image_url);
    }

    return data;
}

// Search products by name (User types in search bar)
export const searchProductByName = async (query, page = 1, sort = "") => {
    if (!query) return;
    let url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page=${page}&page_size=24&fields=${FIELDS}`;

    // Note: Sorting is now done client-side for reliability
    // url += getSortParam(sort);

    

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to search products");

    const data = await response.json();
    if (data.products) {
        data.products = data.products.filter(p => p.product_name && p.image_url);
    }

    return data;
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