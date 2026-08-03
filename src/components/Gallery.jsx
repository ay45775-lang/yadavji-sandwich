function Gallery() {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">
        Food Gallery
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        <img
          src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600"
          alt="Sandwich 1"
          className="rounded-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=600"
          alt="Sandwich 2"
          className="rounded-xl"
        />

        <img
          src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600"
          alt="Sandwich 3"
          className="rounded-xl"
        />
      </div>
    </section>
  );
}

export default Gallery;