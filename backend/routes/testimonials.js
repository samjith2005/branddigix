const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/testimonials - Public
router.get('/', async (req, res) => {
  try {
    const list = await all(`SELECT * FROM testimonials WHERE status = 'Published' ORDER BY id DESC`);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/testimonials/admin/all - Admin
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const list = await all(`SELECT * FROM testimonials ORDER BY id DESC`);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/testimonials - Admin add
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { client_name, company, profile_image, testimonial, rating, status } = req.body;
    if (!client_name || !company || !testimonial) {
      return res.status(400).json({ success: false, message: 'Client name, company, and testimonial are required.' });
    }

    const result = await run(
      `INSERT INTO testimonials (client_name, company, profile_image, testimonial, rating, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        client_name,
        company,
        profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        testimonial,
        rating ? parseInt(rating) : 5,
        status || 'Published'
      ]
    );

    const created = await get('SELECT * FROM testimonials WHERE id = ?', [result.id]);
    res.status(201).json({ success: true, message: 'Testimonial added successfully', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/testimonials/:id - Admin update
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { client_name, company, profile_image, testimonial, rating, status } = req.body;
    const existing = await get('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    await run(
      `UPDATE testimonials SET client_name = ?, company = ?, profile_image = ?, testimonial = ?, rating = ?, status = ? WHERE id = ?`,
      [
        client_name || existing.client_name,
        company || existing.company,
        profile_image || existing.profile_image,
        testimonial || existing.testimonial,
        rating !== undefined ? parseInt(rating) : existing.rating,
        status || existing.status,
        req.params.id
      ]
    );

    const updated = await get('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Testimonial updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/testimonials/:id/status
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await run('UPDATE testimonials SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: `Testimonial set to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/testimonials/:id
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const existing = await get('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    await run('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
