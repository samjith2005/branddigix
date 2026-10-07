const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/gallery - Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `SELECT * FROM gallery WHERE status = 'Published'`;
    const params = [];

    if (category && category !== 'All') {
      query += ` AND category = ?`;
      params.push(category);
    }

    query += ` ORDER BY id DESC`;
    const items = await all(query, params);
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/gallery/admin/all - Admin
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const items = await all(`SELECT * FROM gallery ORDER BY id DESC`);
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/gallery - Admin add
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, category, image, description, status } = req.body;
    if (!title || !category || !image) {
      return res.status(400).json({ success: false, message: 'Title, category, and image are required.' });
    }

    const result = await run(
      `INSERT INTO gallery (title, category, image, description, status) VALUES (?, ?, ?, ?, ?)`,
      [title, category, image, description || '', status || 'Published']
    );

    const created = await get('SELECT * FROM gallery WHERE id = ?', [result.id]);
    res.status(201).json({ success: true, message: 'Gallery item uploaded successfully', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/gallery/:id - Admin update
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, category, image, description, status } = req.body;
    const existing = await get('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    await run(
      `UPDATE gallery SET title = ?, category = ?, image = ?, description = ?, status = ? WHERE id = ?`,
      [
        title || existing.title,
        category || existing.category,
        image || existing.image,
        description !== undefined ? description : existing.description,
        status || existing.status,
        req.params.id
      ]
    );

    const updated = await get('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Gallery item updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/gallery/:id/status
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await run('UPDATE gallery SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: `Gallery item set to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/gallery/:id
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const existing = await get('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    await run('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
