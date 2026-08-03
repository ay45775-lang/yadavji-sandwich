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

        <div className="flex gap-6">

          <Link to="/">Home</Link>

          <Link to="/cart">Cart</Link>

          <Link to="/myorders">My Orders</Link>

          <Link to="/admin">Admin</Link>

          <Link to="/contact">Contact</Link>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-1 rounded"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;