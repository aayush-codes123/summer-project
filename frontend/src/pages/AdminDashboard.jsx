import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import background from "../images/background.jpg";

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard-stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else if (res.status === 403) {
          alert("Access denied. Admin privileges required.");
          navigate("/signin");
        } else if (res.status === 401) {
          navigate("/signin");
        } else {
          setError("Failed to load dashboard data");
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-indigo-900/90"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-md shadow-lg">
        <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-medium transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 p-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-white/70 text-sm font-medium">Total Sellers</h3>
            <p className="text-4xl font-bold text-purple-300 mt-2">{stats.totalSellers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-white/70 text-sm font-medium">Total Buyers</h3>
            <p className="text-4xl font-bold text-pink-300 mt-2">{stats.totalBuyers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-white/70 text-sm font-medium">Total Artworks</h3>
            <p className="text-4xl font-bold text-blue-300 mt-2">{stats.totalArtworks}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-white/70 text-sm font-medium">Total Sales</h3>
            <p className="text-4xl font-bold text-green-300 mt-2">{stats.totalSales}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-white/70 text-sm font-medium">Total Revenue</h3>
            <p className="text-4xl font-bold text-yellow-300 mt-2">Rs. {stats.totalRevenue.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-white/70 text-sm font-medium">Top Buyer</h3>
            {stats.topBuyer ? (
              <>
                <p className="text-2xl font-bold text-orange-300 mt-2">{stats.topBuyer.name}</p>
                <p className="text-white/60 text-sm mt-1">{stats.topBuyer.purchases} purchases</p>
              </>
            ) : (
              <p className="text-white/50 mt-2">No data</p>
            )}
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Over Time - Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">Sales Trend (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} name="Sales Count" />
                <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={2} name="Revenue (Rs.)" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Artworks by Category - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">Artworks by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.artworksByCategory}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.artworksByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                  itemStyle={{ color: '#ffffff' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Legend wrapperStyle={{ color: '#ffffff' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Selling Artworks - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-white mb-4">Top 5 Selling Artworks</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topSellingArtworks}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="title" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#10b981" name="Sales Count" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
