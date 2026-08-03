function Reviews() {
  const reviews = [
    {
      name: "Rahul",
      review: "Best Sandwich in Mumbai! ⭐⭐⭐⭐⭐",
    },
    {
      name: "Priya",
      review: "Very tasty and fresh. ⭐⭐⭐⭐⭐",
    },
    {
      name: "Aman",
      review: "Fast delivery and amazing taste. ⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">
        Customer Reviews
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-4">{item.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;