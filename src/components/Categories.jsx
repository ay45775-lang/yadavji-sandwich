function Categories() {
  const items = [
    "🥪 Veg",
    "🧀 Cheese",
    "🍕 Pizza",
    "🌮 Mexican",
    "🌶️ Spicy",
    "🥗 Healthy",
  ];

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">
        Categories
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item, index) => (
          <button
            key={index}
            className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;