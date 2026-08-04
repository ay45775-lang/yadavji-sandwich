function Wishlist() {
  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        ❤️ My Wishlist
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-10 text-center">

        <h2 className="text-2xl font-bold text-gray-700">
          Your Wishlist is Empty ❤️
        </h2>

        <p className="text-gray-500 mt-4">
          Add your favourite sandwiches to Wishlist.
        </p>

      </div>

    </div>
  );
}

export default Wishlist;