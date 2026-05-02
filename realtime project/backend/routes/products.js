const express = require('express');
const db = require('../db');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Get all products (Marketplace)
router.get('/', (req, res) => {
    let query = `
        SELECT p.*, u.name as farmer_name, u.location as farmer_location 
        FROM products p 
        JOIN users u ON p.farmer_id = u.id
    `;
    const params = [];

    // Simple filtering logic
    if (req.query.category) {
        query += ` WHERE p.category = ?`;
        params.push(req.query.category);
    }
    if (req.query.organic) {
        query += params.length > 0 ? ` AND` : ` WHERE`;
        query += ` p.organic = ?`;
        params.push(req.query.organic === 'true' ? 1 : 0);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Get product by farmer (Farmer Dashboard)
router.get('/farmer/:id', (req, res) => {
    const farmerId = req.params.id;
    db.all(`SELECT * FROM products WHERE farmer_id = ?`, [farmerId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Add a product
router.post('/', (req, res) => {
    const { farmer_id, name, category, price, quantity, unit, image, organic, cultivated_date } = req.body;
    
    if (!farmer_id || !name || !category || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare(`INSERT INTO products (farmer_id, name, category, price, quantity, unit, image, organic, cultivated_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run([farmer_id, name, category, price, quantity || 0, unit || 'kg', image || '', organic ? 1 : 0, cultivated_date || ''], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(201).json({ message: 'Product added successfully', productId: this.lastID });
    });
});

// Get single product details
router.get('/:id', (req, res) => {
    // We skip 'farmer' so it doesn't conflict with '/farmer/:id' if we place it after, but it's safer to place it at the end
    const productId = req.params.id;
    const query = `
        SELECT p.*, u.name as farmer_name, u.location as farmer_location 
        FROM products p 
        JOIN users u ON p.farmer_id = u.id
        WHERE p.id = ?
    `;
    db.get(query, [productId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(row);
    });
});

// Update a product
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const { name, category, price, quantity, unit, image, organic, cultivated_date } = req.body;
    
    const stmt = db.prepare(`UPDATE products SET name=?, category=?, price=?, quantity=?, unit=?, image=?, organic=?, cultivated_date=? WHERE id=?`);
    stmt.run([name, category, price, quantity, unit, image, organic ? 1 : 0, cultivated_date || '', productId], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json({ message: 'Product updated successfully' });
    });
});

// Image Upload
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

module.exports = router;
