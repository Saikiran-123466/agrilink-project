const express = require('express');
const db = require('../db');

const router = express.Router();

// Place a new order
router.post('/', (req, res) => {
    const { consumer_id, items, total_price } = req.body;
    
    if (!consumer_id || !items || !items.length || !total_price) {
        return res.status(400).json({ error: 'Missing required order fields' });
    }

    // items should be an array of { product_id, quantity }
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        
        let hasError = false;
        
        const stmt = db.prepare(`INSERT INTO orders (consumer_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)`);
        const updateStock = db.prepare(`UPDATE products SET quantity = quantity - ? WHERE id = ?`);
        
        items.forEach(item => {
            // Provide individual item total_price or roughly split it for simplicity of mock. 
            // In a better design, total_price could be calculated per item, but here we just store the global or per item. 
            // Let's assume total_price in payload is the whole cart, but the schema has total_price per order row.
            // We'll store item's total price 
            stmt.run([consumer_id, item.product_id, item.quantity, item.price * item.quantity], function(err) {
                if (err) hasError = true;
            });
            updateStock.run([item.quantity, item.product_id], function(err) {
                if (err) hasError = true;
            });
        });

        stmt.finalize();
        updateStock.finalize();

        if (hasError) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: 'Transaction failed while placing order' });
        } else {
            db.run('COMMIT');
            res.status(201).json({ message: 'Order placed successfully' });
        }
    });
});

// Get orders for a specific consumer
router.get('/consumer/:id', (req, res) => {
    const consumerId = req.params.id;
    const query = `
        SELECT o.*, p.name as product_name, p.image, u.name as farmer_name
        FROM orders o
        JOIN products p ON o.product_id = p.id
        JOIN users u ON p.farmer_id = u.id
        WHERE o.consumer_id = ?
        ORDER BY o.order_date DESC
    `;
    db.all(query, [consumerId], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(rows);
    });
});

// Get orders for a farmer's products
router.get('/farmer/:id', (req, res) => {
    const farmerId = req.params.id;
    const query = `
        SELECT o.*, p.name as product_name, c.name as consumer_name, c.location as consumer_location
        FROM orders o
        JOIN products p ON o.product_id = p.id
        JOIN users c ON o.consumer_id = c.id
        WHERE p.farmer_id = ?
        ORDER BY o.order_date DESC
    `;
    db.all(query, [farmerId], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(rows);
    });
});

// Update order status
router.put('/:id/status', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, orderId], function(err) {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Order status updated' });
    });
});

module.exports = router;
