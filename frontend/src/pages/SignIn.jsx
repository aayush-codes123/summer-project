import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import background from '../images/background.jpg'

export const SignIn = () => {
    const [isSeller, setIsSeller] = useState(true);

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})`}} // Replace with your image
      >
        {/* Toggle Headers */}
        <div className="flex gap-6 mb-6">
          <button
            onClick={() => setIsSeller(true)}
            className={`text-xl font-semibold px-4 py-2 rounded-lg transition ${
              isSeller ? "text-white bg-purple-600" : "text-gray-300"
            }`}
          >
            For Seller
          </button>
          <button
            onClick={() => setIsSeller(false)}
            className={`text-xl font-semibold px-4 py-2 rounded-lg transition ${
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
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/40 shadow-lg max-w-sm w-full"
        >
          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            {isSeller ? "Seller Sign In" : "Buyer Sign In"}
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-xl font-bold text-white/80">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-xl font-bold text-white/80">Password</label>
              <input
                type="password"
                className="w-full p-3 mt-1 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your password"
              />
            </div>
            <button className="w-full bg-white/20 text-white py-3 rounded-lg hover:bg-gray-800/30 transition">
              Sign In
            </button>
          </form>
          <p className="text-white/70 text-center mt-4">
            Don't have an account? <a href="signup" className="underline">Sign up</a>
          </p>
        </motion.div>
      </div>
    );
}

export default SignIn
