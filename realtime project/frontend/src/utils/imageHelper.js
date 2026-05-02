export const getProductImage = (name, imageUrl = '') => {
    // Prioritize the farmer's custom uploaded image if it exists
    if (imageUrl && imageUrl.trim() !== '') {
        return imageUrl;
    }

    if (!name) return `https://ui-avatars.com/api/?name=Unknown&background=2e7d32&color=fff&size=400`;
    
    const lower = name.toLowerCase();
    
    const imageMap = [
        { keywords: ['tomato'], url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80' },
        { keywords: ['potato'], url: 'https://images.unsplash.com/photo-1518977622019-158bb3805ad4?w=500&q=80' },
        { keywords: ['spinach'], url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80' },
        { keywords: ['egg'], url: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80' },
        { keywords: ['mango'], url: 'https://images.unsplash.com/photo-1553284965-83fd3e742ff8?w=500&q=80' },
        { keywords: ['banana'], url: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=500&q=80' },
        { keywords: ['wheat', 'grain'], url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020d?w=500&q=80' },
        { keywords: ['brinjal', 'eggplant'], url: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=500&q=80' },
        { keywords: ['carrot'], url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80' },
        { keywords: ['onion'], url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80' },
        { keywords: ['milk', 'dairy'], url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80' },
        { keywords: ['apple'], url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?w=500&q=80' },
        { keywords: ['orange'], url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&q=80' },
        { keywords: ['cabbage'], url: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=500&q=80' },
        { keywords: ['lettuce'], url: 'https://images.unsplash.com/photo-1622204555811-1dafb67e3a6a?w=500&q=80' },
        { keywords: ['corn'], url: 'https://images.unsplash.com/photo-1550828553-3b6d27464010?w=500&q=80' }
    ];

    for (let item of imageMap) {
        if (item.keywords.some(kw => lower.includes(kw))) {
            return item.url;
        }
    }

    // Fallback if no custom image and no dynamic map hits
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2e7d32&color=fff&size=400`;
};
