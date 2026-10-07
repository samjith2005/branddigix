const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { verifyAdmin } = require('../middleware/auth');

// POST /api/enquiries - Public user submits contact enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone number, and project message are required.'
      });
    }

    const result = await run(
      `INSERT INTO enquiries (name, email, phone, company, service, budget, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone,
        company || '',
        service || 'General Inquiry',
        budget || 'Not Specified',
        message,
        'New'
      ]
    );

    const created = await get('SELECT * FROM enquiries WHERE id = ?', [result.id]);
    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our BRANDDIGIX team will connect with you within 24 hours.',
      data: created
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/enquiries - Admin view enquiries
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM enquiries';
    const params = [];

    if (status && status !== 'All') {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY id DESC';
    const list = await all(query, params);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/enquiries/stats - Admin dashboard stats
router.get('/stats/summary', verifyAdmin, async (req, res) => {
  try {
    const totalEnquiries = await get('SELECT COUNT(*) as count FROM enquiries');
    const newEnquiries = await get("SELECT COUNT(*) as count FROM enquiries WHERE status = 'New'");
    const contactedEnquiries = await get("SELECT COUNT(*) as count FROM enquiries WHERE status = 'Contacted'");
    const convertedEnquiries = await get("SELECT COUNT(*) as count FROM enquiries WHERE status = 'Converted'");
    const closedEnquiries = await get("SELECT COUNT(*) as count FROM enquiries WHERE status = 'Closed'");

    const totalServices = await get('SELECT COUNT(*) as count FROM services');
    const totalPortfolio = await get('SELECT COUNT(*) as count FROM portfolio');
    const totalGallery = await get('SELECT COUNT(*) as count FROM gallery');
    const totalTestimonials = await get('SELECT COUNT(*) as count FROM testimonials');

    res.json({
      success: true,
      data: {
        enquiries: {
          total: totalEnquiries.count,
          new: newEnquiries.count,
          contacted: contactedEnquiries.count,
          converted: convertedEnquiries.count,
          closed: closedEnquiries.count
        },
        services: totalServices.count,
        portfolio: totalPortfolio.count,
        gallery: totalGallery.count,
        testimonials: totalTestimonials.count
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/enquiries/:id - Admin view single enquiry
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const enquiry = await get('SELECT * FROM enquiries WHERE id = ?', [req.params.id]);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    res.json({ success: true, data: enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/enquiries/:id/status - Admin update status
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['New', 'Contacted', 'Converted', 'Closed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    await run('UPDATE enquiries SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: `Enquiry status changed to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/enquiries/:id/notes - Admin save follow-up notes
router.patch('/:id/notes', verifyAdmin, async (req, res) => {
  try {
    const { notes } = req.body;
    await run('UPDATE enquiries SET notes = ? WHERE id = ?', [notes, req.params.id]);
    res.json({ success: true, message: 'Notes saved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/enquiries/:id - Admin delete enquiry
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await run('DELETE FROM enquiries WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
