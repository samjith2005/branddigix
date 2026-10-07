const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/services - Public endpoint (only Published)
router.get('/', async (req, res) => {
  try {
    const services = await all(`SELECT * FROM services WHERE status = 'Published' ORDER BY featured DESC, id DESC`);
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/services/admin/all - Admin endpoint (all services)
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const services = await all(`SELECT * FROM services ORDER BY id DESC`);
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/services/:id - Single service
router.get('/:id', async (req, res) => {
  try {
    const service = await get('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/services - Admin add service
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, category, description, image, price, status, featured } = req.body;
    if (!name || !category || !description) {
      return res.status(400).json({ success: false, message: 'Name, category, and description are required.' });
    }

    const result = await run(
      `INSERT INTO services (name, category, description, image, price, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        description,
        image || '',
        price || '',
        status || 'Published',
        featured ? 1 : 0
      ]
    );

    const newService = await get('SELECT * FROM services WHERE id = ?', [result.id]);
    res.status(201).json({ success: true, message: 'Service created successfully', data: newService });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/services/:id - Admin update service
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, category, description, image, price, status, featured } = req.body;
    const existing = await get('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    await run(
      `UPDATE services SET name = ?, category = ?, description = ?, image = ?, price = ?, status = ?, featured = ? WHERE id = ?`,
      [
        name || existing.name,
        category || existing.category,
        description || existing.description,
        image !== undefined ? image : existing.image,
        price !== undefined ? price : existing.price,
        status || existing.status,
        featured !== undefined ? (featured ? 1 : 0) : existing.featured,
        req.params.id
      ]
    );

    const updated = await get('SELECT * FROM services WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Service updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/services/:id/status - Admin toggle publish status
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !['Published', 'Draft'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be Published or Draft.' });
    }

    await run('UPDATE services SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: `Service marked as ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/services/:id - Admin delete service
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const existing = await get('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    await run('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
