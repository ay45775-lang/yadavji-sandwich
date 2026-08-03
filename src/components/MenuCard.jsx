import { useState } from "react";

function MenuCard({ name, price, image, addToCart }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 duration-300">

      {/* Offer Badge */}
      <div className="absolute bg-red-600 text-white px-3 py-1 rounded-br-lg">
        20% OFF
      </div>
      <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
❤️
</button>

      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h3 className="text-2xl font-bold">{name}</h3>

        <p className="text-orange-600 text-xl font-bold mt-2">
          ₹{price}
        </p>

        <p className="text-yellow-500 text-lg mt-2">
          ⭐⭐⭐⭐⭐ 4.8
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="bg-gray-300 px-3 rounded"
          >
            -
          </button>

          <span className="text-xl">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="bg-gray-300 px-3 rounded"
          >
            +
          </button>
        </div>

        <button
          onClick={() => {
            for (let i = 0; i < qty; i++) {
              addToCart({ name, price });
            }
          }}
          className="w-full mt-5 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
        >
          🛒 Add {qty} Item
        </button>

      </div>

    </div>
  );
}

export default MenuCard;