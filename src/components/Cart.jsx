function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items added yet.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-4"
            >
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-2xl font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;