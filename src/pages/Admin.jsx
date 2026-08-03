import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "orders", id), {
        status: status,
      });

      setOrders(
        orders.map((order) =>
          order.id === id
            ? { ...order, status: status }
            : order
        )
      );

      alert("✅ Status Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("❌ Status Update Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        📦 Admin Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl">
          No Orders Found
        </h2>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl shadow-lg p-5 mb-6"
          >
            <h2 className="text-2xl font-bold mb-2">
              👤 {order.customerName}
            </h2>

            <p>📱 Mobile : {order.mobile}</p>

            <p>📍 Address : {order.address}</p>

            <p className="font-bold text-green-700 mt-2">
              💰 Total : ₹{order.total}
            </p>

            <p className="mt-2">
              📌 Status :
              <span className="font-bold text-orange-600">
                {" "}
                {order.status}
              </span>
            </p>

            <div className="mt-5 flex gap-3 flex-wrap">
              <button
                onClick={() =>
                  updateStatus(order.id, "Accepted")
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id, "Preparing")
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Preparing
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id, "Delivered")
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Delivered
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;