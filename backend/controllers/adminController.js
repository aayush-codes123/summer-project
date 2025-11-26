const User = require('../models/User');
const Artwork = require('../models/Artwork');
const Order = require('../models/Order');

exports.getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const totalBuyers = await User.countDocuments({ role: 'buyer' });
    const totalArtworks = await Artwork.countDocuments();
    const totalSales = await Order.countDocuments({ paymentStatus: 'Paid' });

    // Total revenue
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Top buyer
    const topBuyerResult = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: '$buyer', totalPurchases: { $sum: 1 }, totalSpent: { $sum: '$amount' } } },
      { $sort: { totalPurchases: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'buyerInfo'
        }
      },
      { $unwind: '$buyerInfo' }
    ]);

    const topBuyer = topBuyerResult.length > 0 ? {
      name: topBuyerResult[0].buyerInfo.fullName,
      purchases: topBuyerResult[0].totalPurchases,
      totalSpent: topBuyerResult[0].totalSpent
    } : null;

    // Sales by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const salesByMonth = await Order.aggregate([
      { $match: { paymentStatus: 'Paid', createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Format sales by month for frontend
    const formattedSalesByMonth = salesByMonth.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      sales: item.count,
      revenue: item.revenue
    }));

    // Artworks by category
    const artworksByCategory = await Artwork.aggregate([
      { $group: { _id: '$label', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const formattedArtworksByCategory = artworksByCategory.map(item => ({
      category: item._id || 'Uncategorized',
      count: item.count
    }));

    // Top 5 selling artworks
    const topSellingArtworks = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: '$artwork', salesCount: { $sum: 1 } } },
      { $sort: { salesCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'artworks',
          localField: '_id',
          foreignField: '_id',
          as: 'artworkInfo'
        }
      },
      { $unwind: '$artworkInfo' }
    ]);

    const formattedTopArtworks = topSellingArtworks.map(item => ({
      title: item.artworkInfo.title,
      sales: item.salesCount
    }));

    // Send response
    res.json({
      totalSellers,
      totalBuyers,
      totalArtworks,
      totalSales,
      totalRevenue,
      topBuyer,
      salesByMonth: formattedSalesByMonth,
      artworksByCategory: formattedArtworksByCategory,
      topSellingArtworks: formattedTopArtworks
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard statistics', error: error.message });
  }
};
