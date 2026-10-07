const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/portfolio - Public projects
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = `SELECT * FROM portfolio WHERE status = 'Published'`;
    const params = [];

    if (category && category !== 'All') {
      query += ` AND category = ?`;
      params.push(category);
    }

    if (featured === 'true' || featured === '1') {
      query += ` AND featured = 1`;
    }

    query += ` ORDER BY id DESC`;

    const projects = await all(query, params);

    // Parse JSON project_images
    const formatted = projects.map(p => ({
      ...p,
      project_images: p.project_images ? (typeof p.project_images === 'string' ? JSON.parse(p.project_images) : p.project_images) : []
    }));

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/portfolio/admin/all - Admin projects
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const projects = await all(`SELECT * FROM portfolio ORDER BY id DESC`);
    const formatted = projects.map(p => ({
      ...p,
      project_images: p.project_images ? (typeof p.project_images === 'string' ? JSON.parse(p.project_images) : p.project_images) : []
    }));
    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/portfolio/:id - Single project
router.get('/:id', async (req, res) => {
  try {
    const project = await get('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    project.project_images = project.project_images ? (typeof project.project_images === 'string' ? JSON.parse(project.project_images) : project.project_images) : [];
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/portfolio - Admin add project
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const {
      project_name,
      category,
      project_type,
      short_description,
      full_description,
      challenge,
      solution,
      cover_image,
      project_images,
      technologies,
      services_provided,
      client_or_demo,
      live_url,
      completion_date,
      status,
      featured
    } = req.body;

    if (!project_name || !category || !short_description || !cover_image) {
      return res.status(400).json({
        success: false,
        message: 'Project name, category, short description, and cover image are required.'
      });
    }

    const imagesJson = Array.isArray(project_images) ? JSON.stringify(project_images) : (typeof project_images === 'string' ? project_images : '[]');

    const result = await run(
      `INSERT INTO portfolio (
        project_name, category, project_type, short_description, full_description,
        challenge, solution, cover_image, project_images, technologies,
        services_provided, client_or_demo, live_url, completion_date, status, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project_name,
        category,
        project_type || 'Client Project',
        short_description,
        full_description || short_description,
        challenge || '',
        solution || '',
        cover_image,
        imagesJson,
        technologies || '',
        services_provided || '',
        client_or_demo || (project_type || 'Client Project'),
        live_url || '',
        completion_date || '',
        status || 'Published',
        featured ? 1 : 0
      ]
    );

    const created = await get('SELECT * FROM portfolio WHERE id = ?', [result.id]);
    created.project_images = created.project_images ? JSON.parse(created.project_images) : [];
    res.status(201).json({ success: true, message: 'Project created successfully', data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/portfolio/:id - Admin update project
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const existing = await get('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const b = req.body;
    const imagesJson = b.project_images !== undefined
      ? (Array.isArray(b.project_images) ? JSON.stringify(b.project_images) : b.project_images)
      : existing.project_images;

    await run(
      `UPDATE portfolio SET
        project_name = ?, category = ?, project_type = ?, short_description = ?, full_description = ?,
        challenge = ?, solution = ?, cover_image = ?, project_images = ?, technologies = ?,
        services_provided = ?, client_or_demo = ?, live_url = ?, completion_date = ?, status = ?, featured = ?
      WHERE id = ?`,
      [
        b.project_name || existing.project_name,
        b.category || existing.category,
        b.project_type || existing.project_type,
        b.short_description || existing.short_description,
        b.full_description !== undefined ? b.full_description : existing.full_description,
        b.challenge !== undefined ? b.challenge : existing.challenge,
        b.solution !== undefined ? b.solution : existing.solution,
        b.cover_image || existing.cover_image,
        imagesJson,
        b.technologies !== undefined ? b.technologies : existing.technologies,
        b.services_provided !== undefined ? b.services_provided : existing.services_provided,
        b.client_or_demo !== undefined ? b.client_or_demo : existing.client_or_demo,
        b.live_url !== undefined ? b.live_url : existing.live_url,
        b.completion_date !== undefined ? b.completion_date : existing.completion_date,
        b.status || existing.status,
        b.featured !== undefined ? (b.featured ? 1 : 0) : existing.featured,
        req.params.id
      ]
    );

    const updated = await get('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    updated.project_images = updated.project_images ? JSON.parse(updated.project_images) : [];
    res.json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/portfolio/:id/status
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await run('UPDATE portfolio SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: `Project status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/portfolio/:id - Admin delete project
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const existing = await get('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    await run('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
