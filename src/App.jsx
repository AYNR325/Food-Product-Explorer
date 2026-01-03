import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="bg-background min-h-screen text-text">
      {/* pass setter to navbar */}
      <Navbar />
      <Routes>
        {/* Pass query to Home */}
        <Route path="/" element={<Home />} />
        {/* The :barcode part acts as a variable we can read later */}
        <Route path="/product/:barcode" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App