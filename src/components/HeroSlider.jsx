import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1553909489-cd47e0ef937f",
  "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-10">
      <img
        src={images[current]}
        alt="Hero"
        className="w-full h-80 object-cover rounded-3xl shadow-xl"
      />
    </div>
  );
}

export default HeroSlider;