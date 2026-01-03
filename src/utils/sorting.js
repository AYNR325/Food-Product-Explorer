// Utility functions for filtering and sorting products

/**
 * Check if a product name is valid (has name and starts with a letter)
 * @param {string} name - Product name
 * @returns {boolean}
 */
export const isValidProductName = (name) => {
    if (!name || typeof name !== 'string') return false;
    const trimmedName = name.trim();
    if (trimmedName.length === 0) return false;
    
    // Check if first character is a letter (A-Z, a-z, including Unicode letters)
    // Remove any leading whitespace or invisible characters
    const firstChar = trimmedName.charAt(0);
    // Check for ASCII letters A-Z, a-z
    const isASCIILetter = /^[A-Za-z]/.test(firstChar);
    // Also check for Unicode letters (handles accented characters, etc.)
    const isUnicodeLetter = /^\p{L}/u.test(trimmedName);
    
    return isASCIILetter || isUnicodeLetter;
};

/**
 * Filter products that have valid names and start with letters
 * @param {Array} products - Array of products
 * @returns {Array} Filtered products
 */
export const filterValidProducts = (products) => {
    if (!Array.isArray(products)) return [];
    
    return products.filter(product => {
        // Must have product_name
        if (!product.product_name) return false;
        
        // Must have image_url
        if (!product.image_url) return false;
        
        // Name must start with a letter
        return isValidProductName(product.product_name);
    });
};

/**
 * Get grade priority for sorting (lower number = better grade)
 * @param {string} grade - Nutrition grade (a, b, c, d, e)
 * @returns {number} Priority number
 */
const getGradePriority = (grade) => {
    if (!grade || typeof grade !== 'string') return 999; // Unknown grades get highest number (sorted last)
    const normalizedGrade = grade.toLowerCase().trim();
    
    const gradeMap = {
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4,
        'e': 5
    };
    
    return gradeMap[normalizedGrade] || 999; // Unknown grades
};

/**
 * Check if grade is valid (A, B, C, D, or E)
 * @param {string} grade - Nutrition grade
 * @returns {boolean}
 */
export const isValidGrade = (grade) => {
    if (!grade || typeof grade !== 'string') return false;
    const normalizedGrade = grade.toLowerCase().trim();
    return ['a', 'b', 'c', 'd', 'e'].includes(normalizedGrade);
};

/**
 * Sort products by name (A-Z)
 * @param {Array} products - Array of products
 * @returns {Array} Sorted products
 */
export const sortByNameAsc = (products) => {
    if (!Array.isArray(products) || products.length === 0) return [];
    
    // Create a copy and filter out any invalid entries
    const validProducts = products.filter(p => p && p.product_name);
    if (validProducts.length === 0) return [];
    
    return [...validProducts].sort((a, b) => {
        const nameA = (a.product_name || '').trim().toLowerCase();
        const nameB = (b.product_name || '').trim().toLowerCase();
        if (!nameA && !nameB) return 0;
        if (!nameA) return 1;
        if (!nameB) return -1;
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base', numeric: true });
    });
};

/**
 * Sort products by name (Z-A)
 * @param {Array} products - Array of products
 * @returns {Array} Sorted products
 */
export const sortByNameDesc = (products) => {
    if (!Array.isArray(products) || products.length === 0) return [];
    
    // Create a copy and filter out any invalid entries
    const validProducts = products.filter(p => p && p.product_name);
    if (validProducts.length === 0) return [];
    
    return [...validProducts].sort((a, b) => {
        const nameA = (a.product_name || '').trim().toLowerCase();
        const nameB = (b.product_name || '').trim().toLowerCase();
        if (!nameA && !nameB) return 0;
        if (!nameA) return 1;
        if (!nameB) return -1;
        return nameB.localeCompare(nameA, undefined, { sensitivity: 'base', numeric: true });
    });
};

/**
 * Sort products by nutrition grade (Best first: A, B, C, D, E)
 * Filters out products with unknown/invalid grades
 * @param {Array} products - Array of products
 * @returns {Array} Sorted products with valid grades only
 */
export const sortByGradeAsc = (products) => {
    if (!Array.isArray(products)) return [];
    
    // First, filter out products with invalid/unknown grades
    const productsWithValidGrades = products.filter(product => 
        isValidGrade(product.nutrition_grades)
    );
    
    // Then sort by grade priority
    return productsWithValidGrades.sort((a, b) => {
        const priorityA = getGradePriority(a.nutrition_grades);
        const priorityB = getGradePriority(b.nutrition_grades);
        return priorityA - priorityB;
    });
};

/**
 * Filter products - basic requirements (name and image)
 * @param {Array} products - Array of products
 * @returns {Array} Filtered products
 */
const filterBasicProducts = (products) => {
    if (!Array.isArray(products)) return [];
    
    return products.filter(product => {
        // Must have product_name
        if (!product.product_name || typeof product.product_name !== 'string') return false;
        
        // Must have image_url
        if (!product.image_url) return false;
        
        // Name must not be empty after trimming
        const trimmedName = product.product_name.trim();
        if (trimmedName.length === 0) return false;
        
        return true;
    });
};

/**
 * Apply sorting to products based on sort option
 * @param {Array} products - Array of products
 * @param {string} sortOption - Sort option ('name_asc', 'name_desc', 'grade_asc', or '')
 * @returns {Array} Sorted and filtered products
 */
export const applySorting = (products, sortOption) => {
    if (!Array.isArray(products) || !products.length) return [];
    
    // First, apply basic filtering (name and image required)
    let filteredProducts = filterBasicProducts(products);
    
    if (filteredProducts.length === 0) return [];
    
    // Then apply sorting with specific filters
    switch (sortOption) {
        case 'name_asc':
            // For name sorting, filter out products starting with numbers/special chars
            // Use the same filter as default to ensure consistency
            filteredProducts = filterValidProducts(filteredProducts);
            if (filteredProducts.length === 0) return [];
            return sortByNameAsc(filteredProducts);
        case 'name_desc':
            // For name sorting, filter out products starting with numbers/special chars
            // Use the same filter as default to ensure consistency
            filteredProducts = filterValidProducts(filteredProducts);
            if (filteredProducts.length === 0) return [];
            return sortByNameDesc(filteredProducts);
        case 'grade_asc':
            // For grade sorting, use the full filter (name starting with letter + valid grade)
            filteredProducts = filterValidProducts(filteredProducts);
            if (filteredProducts.length === 0) return [];
            return sortByGradeAsc(filteredProducts);
        default:
            // Default: filter out products without names or starting with numbers/special chars
            return filterValidProducts(filteredProducts);
    }
};

