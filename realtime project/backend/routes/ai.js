const express = require('express');

const router = express.Router();

// Mock AI Market Insights for Farmers
router.get('/insights/farmer/:id', (req, res) => {
    // In a real app, this would use a Python ML model or 3rd party API (e.g. Gemini/OpenAI) using current weather/market data
    const insights = {
        demand_trends: [
            { crop: 'Tomatoes', trend: 'High', predicted_price_increase: '15%' },
            { crop: 'Potatoes', trend: 'Stable', predicted_price_increase: '2%' }
        ],
        smart_advice: "Local weather patterns suggest a dry week ahead. Prioritize water-intensive crops. High demand expected for organic tomatoes in nearby urban centers."
    };
    
    res.json(insights);
});

// Mock AI Recommendations for Consumers
router.get('/recommendations/consumer/:id', (req, res) => {
    // Recommends based on purchase history and seasonal availability
    const recommendations = [
        { name: 'Fresh Organic Spinach', reasoning: 'Because it is currently in peak season locally.', price: 5.0, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80' },
        { name: 'Farm-Fresh Eggs', reasoning: 'Based on your previous frequent purchases.', price: 4.5, image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80' }
    ];
    
    res.json(recommendations);
});

// Mock NLP Chatbot for Support
router.post('/chat', (req, res) => {
    const { message } = req.body;
    let reply = "I'm sorry, I couldn't understand that. You can ask me about tracking orders, finding products, or farmer details.";
    
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('track') || lowerMessage.includes('order')) {
        reply = "To track your order, please go to your Dashboard and click on 'My Orders'. The status updates in real-time.";
    } else if (lowerMessage.includes('transparency') || lowerMessage.includes('price') || lowerMessage.includes('middlemen')) {
        reply = "We eliminate middlemen entirely. The price you see is set directly by the farmer. We only add a transparent standardized delivery fee!";
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('what should i buy')) {
        reply = "Based on local seasonal trends, I highly suggest organic tomatoes and fresh dairy. Check out the recommendation section on our Marketplace!";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        reply = "Hello! I am your AI assistant. How can I help you support our local farmers today?";
    }

    // Simulate network delay for AI realism
    setTimeout(() => {
        res.json({ reply });
    }, 600);
});

module.exports = router;
