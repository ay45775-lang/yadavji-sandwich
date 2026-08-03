import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        🛒 Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl mb-6">
            Your Cart is Empty
          </h2>

          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg"
          >
            Back to Menu
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4 mb-4"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-orange-600 font-bold">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  -
                </button>

                <span className="text-xl font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <h2 className="text-3xl font-bold">
              Total : ₹{total}
            </h2>

            <Link
              to="/checkout"
              className="inline-block mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;