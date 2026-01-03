# 🍔 Food Product Explorer

## 📖 Project Overview
Food Product Explorer is a modern, responsive web application designed to help users discover and analyze food products from around the world. Built with **React** and **Tailwind CSS**, it leverages the **OpenFoodFacts API** to provide detailed insights into ingredients, nutrition grades, eco-scores, allergens, and more. The application features a premium "Glassmorphism" UI with a warm, appetite-stimulating color palette.

## ✨ Features

### 🛍️ Product Listing
- Browse a grid of food products with high-quality images.
- "Load More" pagination for seamless exploration
- Visual badges for Nutrition Grades (A-E).

### 🔍 Smart Search
- **Name Search**: Instantly find products by name (e.g., "Nutella", "Coffee").
- **Debouncing**: Optimized search input reduces API calls while typing.

### 📷 Barcode Search
- **Auto-Detection**: The search bar intelligently detects barcode inputs (8+ digits).
- **Direct Navigation**: Automatically redirects to the specific Product Details page when a valid barcode is entered.

### 📂 Category Filter
- Filter products by popular categories such as **Snacks, Dairies, Beverages, Cereals**, and more.
- Sidebar navigation for easy access to categories.

### 🔃 Sorting
- Sort products dynamically by:
  - **Name (A-Z)**
  - **Name (Z-A)**
  - **Nutrition Grade** (Healthiest first)

### 📄 Pagination
- Efficiently handles large datasets using page-based pagination.
- "Load More Products" button to fetch the next set of results.

### 🍎 Product Detail Page
- **Comprehensive Data**: View Brand, Generic Name, and Quantity.
- **Nutrient Cards**: dedicated cards for Energy, Fat, Carbs, and Proteins.
- **Eco-Score & Nutri-Score**: Visual indicators for environmental impact and nutritional quality.
- **Allergen & Additive Warnings**: Color-coded tags to easily spot allergens (Red) and additives (Blue).
- **Ingredients List**: Full ingredients text display.

### 🛒 Bonus: Shopping Cart & State Management
- **Cart Context**: Global state management using React Context API (`CartContext`), avoiding prop drilling.
- **Add to Cart**: Seamlessly add products from the home grid or details page.
- **Dynamic Badge**: Real-time cart count badge on the Navbar.
- **Cart Review**: Dedicated page to view items, adjust quantities, and see total estimates.
- **Persistence**: Cart data is saved to `localStorage`, so items remain after refreshing.

## 🛠️ Tech Stack

- **Frontend Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4 (Glassmorphism, Custom Gradients, Responsive Design)
- **Routing**: React Router DOM v6
- **State Management**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: Native Fetch API
- **Icons**: SVG & Emoji-based icons

## 🔗 API References

This project uses the public **OpenFoodFacts API**.

| Feature | Endpoint | Description |
| :--- | :--- | :--- |
| **Search Products** | `https://world.openfoodfacts.org/cgi/search.pl` | Search by name, category, or sort options. |
| **Product Details** | `https://world.openfoodfacts.org/api/v0/product/{barcode}.json` | Get full details for a specific product. |
| **Categories** | `https://world.openfoodfacts.org/categories.json` | Fetch list of food categories. |

---

## 🗓️ Development Timeline

### **Day 1 – Project Setup & Core Architecture**
- Initialized React project using Vite and configured Tailwind CSS.
- Designed folder structure following component-based architecture.
- Set up React Router for page navigation.
- Integrated OpenFoodFacts API and implemented base product fetching.
- Built initial product grid layout with loading and error states.

### **Day 2 – Homepage Features & API Enhancements**
- Implemented product listing with pagination using “Load More” functionality.
- Added smart product search with debouncing for optimized API usage.
- Integrated category-based filtering using API-driven categories.
- Implemented client-side sorting (Name A–Z, Z–A, Nutrition Grade).
- Improved UI with responsive grid and visual nutrition-grade indicators.

### **Day 3 – Product Detail Page & Advanced Features**
- Built dynamic Product Detail page using barcode-based routing.
- Integrated barcode search with auto-detection and direct navigation.
- Displayed detailed nutritional values, ingredients, allergens, and labels.
- Added eco-score and nutri-score visual indicators.
- Implemented responsive layouts for mobile and tablet views.

### **Day 4 – Polishing, Bonus Features & Deployment**
- Implemented optional cart functionality using React Context API.
- Added cart persistence using localStorage.
- Refined UI/UX (spacing, typography, glassmorphism effects).
- Deployed application on Vercel and performed final testing.
- Wrote comprehensive README documentation.

## ⏱️ Total Time Spent
**~24 hours across 4 days**

