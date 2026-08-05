import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import { db, auth } from "../firebase";
import { CartContext } from "../context/CartContext";

function Home() {
  const [sandwiches, setSandwiches] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const { cart, addToCart } = useContext(CartContext);

  const toggleWishlist = async (item) => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    if (wishlist.includes(item.id)) {
      alert("Already in Wishlist ❤️");
      return;
    }

    await addDoc(collection(db, "wishlist"), {
      uid: user.uid,
      email: user.email,
      sandwichId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      rating: item.rating,
    });

    setWishlist([...wishlist, item.id]);

    alert("❤️ Added to Wishlist");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

  useEffect(() => {
  const fetchSandwiches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sandwiches"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSandwiches(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchSandwiches();
}, []);

const filteredSandwiches = sandwiches
  .filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((item) => {
    if (category === "All") return true;
    return item.name
      .toLowerCase()
      .includes(category.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-5xl font-bold text-center mb-6">
  🥪 Yadavji Sandwich
</h1>

<HeroSlider />

{/* Hero Banner */}
<div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl text-white p-10 mb-10 shadow-xl">
        <h2 className="text-5xl font-bold">
          🥪 Fresh Sandwich Everyday
        </h2>

        <p className="mt-4 text-xl">
          Healthy • Fresh • Delicious
        </p>

        <p className="mt-2 text-lg">
          🎉 Flat 20% OFF on First Order
        </p>

        <Link
          to="/cart"
          className="inline-block mt-6 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100"
        >
          Order Now
        </Link>

      </div>

      <h2 className="text-3xl font-bold text-center mb-8">
        ⭐ Featured Sandwiches
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search Sandwich..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border-2 border-orange-500 rounded-lg p-3 outline-none"
        />
      </div>

      {/* Category */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">

        <button
          onClick={() => setCategory("All")}
          className={`px-5 py-2 rounded-lg text-white ${
            category === "All"
              ? "bg-orange-600"
              : "bg-orange-400"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("Paneer")}
          className={`px-5 py-2 rounded-lg text-white ${
            category === "Paneer"
              ? "bg-green-700"
              : "bg-green-500"
          }`}
        >
          Paneer
        </button>

        <button
          onClick={() => setCategory("Veg")}
          className={`px-5 py-2 rounded-lg text-white ${
            category === "Veg"
              ? "bg-green-700"
              : "bg-green-500"
          }`}
        >
          Veg
        </button>

        <button
          onClick={() => setCategory("Cheese")}
          className={`px-5 py-2 rounded-lg text-white ${
            category === "Cheese"
              ? "bg-yellow-600"
              : "bg-yellow-500"
          }`}
        >
          Cheese
        </button>

      </div>

      <div className="text-center text-2xl font-bold mb-8">
        🛒 Cart Items: {cart.length}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {filteredSandwiches.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-3xl shadow-xl p-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >

            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              🔥 Bestseller
            </div>

            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
            >
              {wishlist.includes(item.id) ? "❤️" : "🤍"}
            </button>

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover rounded-2xl"
            />
                        <h2 className="text-2xl font-bold mt-4">
              {item.name}
            </h2>

            <p className="text-orange-600 text-2xl font-bold mt-2">
              ₹{item.price}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                10% OFF
              </span>

              <span className="text-yellow-500 font-bold">
                ⭐ {item.rating}
              </span>
            </div>

            <button
              onClick={() => addToCart(item)}
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700"
            >
              🛒 Add to Cart
            </button>

            <Link
              to="/cart"
              className="block text-center bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700"
            >
              View Cart
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;