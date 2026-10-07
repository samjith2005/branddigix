const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/settings - Public website settings
router.get('/', async (req, res) => {
  try {
    const rows = await all('SELECT key, value FROM website_settings');
    const settings = {};
    rows.forEach(r => {
      settings[r.key] = r.value;
    });
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/settings - Admin update batch settings
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      const existing = await get('SELECT * FROM website_settings WHERE key = ?', [key]);
      if (existing) {
        await run('UPDATE website_settings SET value = ? WHERE key = ?', [String(value), key]);
      } else {
        await run('INSERT INTO website_settings (key, value) VALUES (?, ?)', [key, String(value)]);
      }
    }

    const rows = await all('SELECT key, value FROM website_settings');
    const updated = {};
    rows.forEach(r => {
      updated[r.key] = r.value;
    });

    res.json({ success: true, message: 'Website settings saved successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
