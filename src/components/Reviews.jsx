import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function Reviews() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [ratingCount, setRatingCount] = useState({
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
});

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "reviews"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.reverse();

      setReviews(data);

      const total = data.length;
      setTotalReviews(total);
      const counts = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};

data.forEach((item) => {
  if (counts[item.rating] !== undefined) {
    counts[item.rating]++;
  }
});

setRatingCount(counts);

      if (total > 0) {
        const sum = data.reduce(
          (acc, item) => acc + (item.rating || 0),
          0
        );

        setAverageRating((sum / total).toFixed(1));
      } else {
        setAverageRating(0);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!name || !review) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        name,
        review,
        rating,
        createdAt: serverTimestamp(),
      });

      alert("⭐ Review Submitted Successfully");

      setName("");
      setReview("");
      setRating(5);

      fetchReviews();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        ⭐ Customer Reviews
      </h1>

      {/* Review Form */}

      <form
        onSubmit={submitReview}
        className="bg-white shadow-lg rounded-xl p-6 mb-10"
      >

        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Write your review..."
          className="w-full border p-3 rounded mb-4"
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <label className="font-bold">
          Rating
        </label>

        <select
          className="w-full border p-3 rounded mt-2 mb-4"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Submit Review
        </button>

      </form>

      {/* Rating Summary */}

      <div className="bg-yellow-50 border rounded-xl shadow-md p-6 mb-8 text-center">

        <h2 className="text-4xl font-bold">
          ⭐ {averageRating} / 5
        </h2>

        <p className="text-yellow-500 text-3xl mt-2">
          ⭐⭐⭐⭐⭐
        </p>

        <p className="text-gray-700 font-semibold mt-2">
          Based on {totalReviews} Reviews
        </p>

        <div className="mt-6 space-y-3">

  {[5,4,3,2,1].map((star) => (

    <div
      key={star}
      className="flex items-center gap-3"
    >

      <span className="w-10">
        {star}⭐
      </span>

      <div className="flex-1 bg-gray-300 rounded-full h-3">

        <div
          className="bg-yellow-500 h-3 rounded-full"
          style={{
            width:
              totalReviews === 0
                ? "0%"
                : `${(ratingCount[star] / totalReviews) * 100}%`,
          }}
        ></div>

      </div>

      <span className="w-8 text-right">
        {ratingCount[star]}
      </span>

    </div>

  ))}

</div>

      </div>

      <h2 className="text-3xl font-bold mb-6">
        All Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No Reviews Yet
        </p>
      ) : (
        reviews.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl shadow-lg p-5 mb-5 bg-white"
          >
            <h3 className="text-2xl font-bold">
              👤 {item.name}
            </h3>

            <p className="text-yellow-500 text-xl mt-2">
              {"⭐".repeat(item.rating || 5)}
            </p>

            <p className="mt-3 text-gray-700">
              {item.review}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Reviews;