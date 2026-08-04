import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-orange-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold">
          🥪 Yadavji Sandwich
        </h1>

        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-yellow-300"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="hover:text-yellow-300"
          >
            Cart
          </Link>

          <Link
            to="/wishlist"
            className="hover:text-red-300 font-semibold"
          >
            ❤️ Wishlist
          </Link>

          <Link
            to="/myorders"
            className="hover:text-yellow-300"
          >
            My Orders
          </Link>

          <Link
            to="/admin"
            className="hover:text-yellow-300"
          >
            Admin
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-300"
          >
            Contact
          </Link>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;