import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import MyOrders from "./pages/MyOrders";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/myorders" element={<MyOrders />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;