const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { getIsConnected } = require('../config/db');

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'atominstitute@perinthalmanna.com').toLowerCase().trim();
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'atominstitute@#perinthalmanna';

// Generate JWT Token
const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'atom_institute_secret_jwt_key_2026';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

// Seed default admin in MongoDB if connected and admin doesn't exist
const seedDefaultAdminIfConnected = async () => {
  if (!getIsConnected()) return;
  try {
    const existing = await Admin.findOne({ email: DEFAULT_ADMIN_EMAIL });
    if (!existing) {
      await Admin.create({
        name: 'Atom Admin',
        email: DEFAULT_ADMIN_EMAIL,
        password: DEFAULT_ADMIN_PASSWORD,
        role: 'superadmin',
      });
      console.log(`✨ Default Admin created in MongoDB: ${DEFAULT_ADMIN_EMAIL}`);
    }
  } catch (err) {
    console.warn('Could not seed admin in MongoDB:', err.message);
  }
};

/**
 * @desc Admin Login
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if MongoDB is connected
    if (getIsConnected()) {
      let admin = await Admin.findOne({ email: cleanEmail });

      // If database is empty and logging in with predefined credentials, seed it
      if (!admin && cleanEmail === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
        admin = await Admin.create({
          name: 'Atom Admin',
          email: DEFAULT_ADMIN_EMAIL,
          password: DEFAULT_ADMIN_PASSWORD,
          role: 'superadmin',
        });
      }

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const token = generateToken({
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      });

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    // Fallback mode when MongoDB is not yet connected
    if (cleanEmail === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      const token = generateToken({
        id: 'admin_local_fallback',
        email: DEFAULT_ADMIN_EMAIL,
        name: 'Atom Administrator',
        role: 'admin',
      });

      return res.json({
        success: true,
        message: 'Login successful (Running in resilient fallback mode until MongoDB is connected)',
        token,
        admin: {
          id: 'admin_local_fallback',
          name: 'Atom Administrator',
          email: DEFAULT_ADMIN_EMAIL,
          role: 'admin',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password. Default credentials: atominstitute@perinthalmanna.com',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication: ' + error.message,
    });
  }
};

/**
 * @desc Get Current Admin Profile
 * @route GET /api/auth/me
 */
const getMe = async (req, res) => {
  try {
    return res.json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin details',
    });
  }
};

module.exports = {
  login,
  getMe,
  seedDefaultAdminIfConnected,
};

