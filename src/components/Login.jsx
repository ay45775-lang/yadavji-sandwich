import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-orange-600 text-white py-3 rounded-lg"
      >
        Login
      </button>
    </div>
  );
}

export default Login;