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

      setReviews(data.reverse());
    } catch (error) {
      console.log(error);
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
      alert("Error submitting review");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        ⭐ Customer Reviews
      </h1>

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

        <label className="font-bold">Rating</label>

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