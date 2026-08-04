import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

function Checkout() {
  const { cart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (!name || !mobile || !address) {
      alert("Please fill all details");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    const options = {
      key: "rzp_test_TLIEGAbhzLKQ1S",
      amount: total * 100,
      currency: "INR",
      name: "Yadavji Sandwich",
      description: "Food Order",

      handler: async function (response) {
        try {
          await addDoc(collection(db, "orders"), {
            customerName: name,
            email: user.email,
            uid: user.uid,
            mobile: mobile,
            address: address,
            items: cart,
            total: total,
            paymentId: response.razorpay_payment_id,
            status: "Pending",
            createdAt: serverTimestamp(),
          });

          alert("✅ Payment Successful!");
          alert("✅ Order Saved Successfully!");

          window.location.href = "/myorders";
        } catch (error) {
          console.error(error);
          alert("❌ Order Save Failed");
        }
      },

      prefill: {
        name: name,
        email: user.email,
        contact: mobile,
      },

      theme: {
        color: "#16a34a",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl mb-6">
            Cart is Empty
          </h2>

          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded"
          >
            Back to Menu
          </Link>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full border p-3 rounded mb-4"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <textarea
            placeholder="Delivery Address"
            className="w-full border p-3 rounded mb-4"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <h2 className="text-2xl font-bold mb-6">
            Total Amount : ₹{total}
          </h2>

          <button
            onClick={placeOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            💳 Pay with Razorpay
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;