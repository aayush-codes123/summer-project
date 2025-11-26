const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: adminUsername, role: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = new User({
      fullName: 'Administrator',
      username: adminUsername,
      email: 'admin@artstore.com',
      password: hashedPassword,
      phoneNumber: '0000000000',
      address: 'Admin Office',
      role: 'admin',
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }
};

module.exports = createAdminUser;
