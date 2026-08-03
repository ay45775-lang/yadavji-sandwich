import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebase";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      const querySnapshot = await getDocs(collection(db, "orders"));

      const data = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((order) => order.email === user.email);

      setOrders(data);
    };

    fetchOrders();
  }, []);

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
            className="border rounded-xl shadow p-5 mb-5"
          >
            <h2 className="text-2xl font-bold">
              👤 {order.customerName}
            </h2>

            <p>📱 {order.mobile}</p>

            <p>📍 {order.address}</p>

            <p className="font-bold text-green-700">
              ₹{order.total}
            </p>

            <p className="font-bold text-blue-600">
              Status : {order.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;