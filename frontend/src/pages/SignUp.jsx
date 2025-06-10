import { useState } from "react";
import { motion } from "framer-motion";
import background from "../images/background.jpg";

export const SignUp = () => {
  const [isSeller, setIsSeller] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    age: "",
    category: isSeller ? "Modern" : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic Validations
  if (parseInt(formData.age) < 18) {
    alert("You must be 18 or older to sign up.");
    return;
  }
  if (!/^98\d{8}$/.test(formData.phone)) {
    alert("Phone number must start with 98 and be 10 digits long.");
    return;
  }

  const payload = {
    fullName: formData.name,
    username: formData.username,
    email: formData.email,
    password: formData.password,
    address: formData.address,
    phone: formData.phone,
    role: isSeller ? "seller" : "buyer",
    ...(isSeller && { artStyle: formData.category }),
  };

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! You can now log in.");
      console.log(data); // Optionally redirect
    } else {
      alert(data.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong.");
  }
};


  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Toggle Headers */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setIsSeller(true)}
          className={`text-xl font-semibold px-6 py-3 rounded-lg transition ${
            isSeller ? "text-white bg-purple-600" : "text-gray-300"
          }`}
        >
          For Seller
        </button>
        <button
          onClick={() => setIsSeller(false)}
          className={`text-xl font-semibold px-6 py-3 rounded-lg transition ${
            !isSeller ? "text-white bg-purple-600" : "text-gray-300"
          }`}
        >
          For Buyer
        </button>
      </div>

      {/* Form Container */}
      <motion.div
        key={isSeller ? "seller" : "buyer"}
        initial={{ x: isSeller ? -100 : 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isSeller ? 100 : -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/40 shadow-lg max-w-lg w-full"
      >
        <h2 className="text-white text-3xl font-semibold text-center mb-6">
          {isSeller ? "Seller Sign Up" : "Buyer Sign Up"}
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80">Full Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-white/80">Username</label>
              <input
                type="text"
                name="username"
                required
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Choose a username"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-white/80">Phone Number</label>
              <input
                type="text"
                name="phone"
                pattern="98\d{8}"
                required
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80">Address</label>
            <input
              type="text"
              name="address"
              required
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter your address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80">Age</label>
              <input
                type="number"
                name="age"
                min="18"
                required
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your age"
              />
            </div>

            {/* Seller-Only Category Selection */}
            {isSeller && (
              <div>
                <label className="block text-white/80">Category</label>
                <select
                  name="category"
                  required
                  onChange={handleChange}
                  className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option
                    className="bg-gray-600 backdrop-blur-lg "
                    value="Sketches"
                  >
                    Sketches
                  </option>
                  <option className="bg-gray-600 backdrop-blur-lg " value="Modern">
                    Modern
                  </option>
                  <option
                    className="bg-gray-600 backdrop-blur-lg "
                    value="Abstract"
                  >
                    Abstract
                  </option>
                  <option className="bg-gray-600 backdrop-blur-lg " value="Realism">
                    Realism
                  </option>
                  <option
                    className="bg-gray-600 backdrop-blur-lg "
                    value="Surrealism"
                  >
                    Surrealism
                  </option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-white/80">Password</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Choose a password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-white/70 text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="underline">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
