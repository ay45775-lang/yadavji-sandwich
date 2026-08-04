import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      try {
        console.log("Current User:", user);

        const querySnapshot = await getDocs(collection(db, "orders"));

        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (order) =>
              order.uid === user.uid ||
              order.email === user.email
          );

        console.log("My Orders:", data);

        setOrders(data);
      } catch (error) {
        console.error("Firestore Error:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-2xl mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl">
          No Orders Found
        </h2>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl shadow-lg p-5 mb-5"
          >
            <h2 className="text-2xl font-bold mb-2">
              👤 {order.customerName}
            </h2>

            <p>📧 {order.email}</p>
            <p>📱 {order.mobile}</p>
            <p>📍 {order.address}</p>

            <p className="font-bold text-green-700 mt-2">
              💰 ₹{order.total}
            </p>

            <p className="font-bold text-blue-600 mt-2">
              📦 Status: {order.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;