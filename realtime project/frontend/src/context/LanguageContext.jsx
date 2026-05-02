import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navbar
    navMarketplace: "Marketplace",
    navOffers: "Offers",
    navConsumerDash: "Consumer Dashboard",
    navFarmerDash: "Farmer Dashboard",
    navAbout: "About",
    navLogin: "Login",
    navSearch: "Search...",
    navShopCategory: "Shop By Category",
    navAll: "All Produce",
    navVegetables: "Vegetables",
    navFruits: "Fruits",
    navGrains: "Grains",
    navBasket: "Basket",
    navItems: "Items",
    offersEmptyTitle: "No Offers Currently Available",
    offersEmptySub: "Please check back later for exciting discounts on fresh organic produce!",
    marketTitle: "Fresho Marketplace",
    marketSub: "Buy safe, organic, farm-fresh produce directly from local verified farmers.",
    
    // Home
    homeHeroTitle: "Fresh From Farm To Your Table",
    homeHeroSub: "Connect directly with local farmers. Get the freshest produce delivered straight to your door with AI-powered quality checks and zero middlemen.",
    homeShopNow: "Shop Now",
    homeJoinFarmer: "Join as Farmer",
    homeBestSellers: "Best Sellers",
    homeViewAll: "View All Explorer",
    homeHowItWorks: "How AgriLink Works",
    homeDirectConnect: "Direct Connection",
    homeDirectConnectSub: "No middlemen. Buy directly from verified local farmers.",
    homeAIQuality: "AI Quality Check",
    homeAIQualitySub: "Produce quality verified by advanced computer vision models.",
    homeFairPricing: "Fair Pricing",
    homeFairPricingSub: "Transparent pricing ensures farmers get what they deserve.",
    
    // Market & Cards
    addCart: "Add to Cart",
    fromParam: "From",
    stock: "in stock",
    priceRange: "Price Range",
    sortByPop: "Sort By: Popularity",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",

    // Farmer Dashboard
    farmerDash: "Farmer Dashboard",
    farmerDashSub: "Manage your crops and view AI insights.",
    addProduct: "Add Product",
    totalSales: "Total Sales",
    activeProducts: "Active Products",
    profileViews: "Profile Views",
    apiListings: "Your Listings",
    noProducts: "No products listed yet. Click 'Add Product' to start selling!",
    edit: "Edit",
    incomingOrders: "Incoming Orders",
    noOrders: "No orders have been placed yet.",
    buyer: "Buyer",
    shipTo: "Ship To",
    updateStatus: "Update Status",
    aiInsights: "AI Market Insights",
    loadingAi: "Loading AI insights...",
    predictedTrends: "Predicted Demand Trends",
    demand: "Demand",
    editProductParam: "Edit Product",
    addNewProductParam: "Add New Product",
    prodName: "Product Name",
    category: "Category",
    selectCategory: "Select a Category",
    vegetables: "Vegetables",
    fruits: "Fruits",
    grains: "Grains",
    dairy: "Dairy",
    price: "Price (₹)",
    quantity: "Quantity in Stock",
    unit: "Unit",
    organic: "Certified Organic 🌱",
    cultivatedDate: "Cultivated Date",
    image: "Image URL (Optional)",
    saveChanges: "Save Changes",
    publishProduct: "Publish Product Listing",
    placeholderTomato: "e.g. Heirloom Tomatoes",

    // Consumer Dashboard
    consDashWelcome: "Welcome back",
    consDashSub: "Here is your fresh produce overview.",
    orders: "Orders",
    pastOrders: "Past Orders",
    tracking: "Tracking",
    activeDel: "Active deliveries",
    favorites: "Favorites",
    savedItems: "Saved Items",
    subscriptions: "Subscriptions",
    manageRecur: "Manage recurring",
    orderHistory: "Your Order History",
    noConsOrders: "You haven't placed any orders yet. Visit the Marketplace to support local farmers!",
    noTracking: "You have no active deliveries.",
    orderPlaced: "Order Placed",
    preparingGoods: "We are preparing your fresh farm goods.",
    aiSuggested: "AI Suggested For You",
    personalized: "Personalized",
    qtyParam: "Qty",
    yourFavs: "Your Favorites",
    noFavs: "You haven't saved any items yet.",
    ancientMethodsTitle: "Ancient Organic Methods",
    ancientMethodsSub: "This product was cultivated using time-tested agricultural practices from the olden days:",
    jeevamrutham: "Jeevamrutham:",
    jeevamruthamDesc: "Fermented microbial culture providing vital nutrients.",
    panchagavya: "Panchagavya:",
    panchagavyaDesc: "A blend of cow-derived products used as a natural fertilizer.",
    cropRotation: "Crop Rotation:",
    cropRotationDesc: "Naturally maintaining soil fertility without synthetic chemicals.",
    neemExtracts: "Neem Extracts:",
    neemExtractsDesc: "Safe, traditional natural pest repellent.",
    farmerInfoSection: "Farmer Information",
    farmerNameLabel: "Name:",
    farmerLocationLabel: "Location:",
    farmerDirectPriceInfo: "100% of the product price goes directly to the farmer.",
    homeBannerTitle: "Fresh from the Farm. directly to you.",
    homeBannerSub: "Get the finest quality produce supported by AI insights.",
    homeBannerBtn: "Experience the Market",
    homeAIPricing: "AI Powered Pricing",
    homeAIPricingSub: "Smart machine learning algorithms that ensure you pay the most optimal price dynamically.",
    homeVerified: "Verified Farmers",
    homeVerifiedSub: "Complete transparency. You know exactly where your food comes from natively.",
    homeOrganic: "Organic Quality",
    homeOrganicSub: "Quality checked processes to deliver pure organic and healthy options to you."
  },
  te: {
    // Navbar
    navMarketplace: "మార్కెట్ ప్లేస్",
    navOffers: "ఆఫర్‌లు",
    navConsumerDash: "వినియోగదారుల డాష్‌బోర్డ్",
    navFarmerDash: "రైతు డాష్‌బోర్డ్",
    navAbout: "మా గురించి",
    navLogin: "లాగిన్",
    navSearch: "వెతకండి...",
    navShopCategory: "వర్గాల వారీగా కొనండి",
    navAll: "అన్ని",
    navVegetables: "కూరగాయలు",
    navFruits: "పండ్లు",
    navGrains: "ధాన్యాలు",
    navBasket: "బుట్ట",
    navItems: "వస్తువులు",
    offersEmptyTitle: "ప్రస్తుతం ఎటువంటి ఆఫర్‌లు అందుబాటులో లేవు",
    offersEmptySub: "తాజా సేంద్రీయ ఉత్పత్తులపై ఉత్తేజకరమైన డిస్కౌంట్‌ల కోసం దయచేసి తర్వాత తనిఖీ చేయండి!",
    marketTitle: "ఫ్రెషో మార్కెట్ ప్లేస్",
    marketSub: "సురక్షితమైన, సేంద్రీయ, వ్యవసాయ-తాజా ఉత్పత్తులను నేరుగా స్థానిక రైతుల నుండి కొనండి.",
    
    // Home
    homeHeroTitle: "పొలం నుండి నేరుగా మీ వరకు",
    homeHeroSub: "స్థానిక రైతులతో నేరుగా కనెక్ట్ అవ్వండి. AI నాణ్యత తనిఖీలతో తాజా ఉత్పత్తులను దళారులు లేకుండా పొందండి.",
    homeShopNow: "ఇప్పుడే కొనండి",
    homeJoinFarmer: "రైతుగా చేరండి",
    homeBestSellers: "ఎక్కువగా అమ్ముడైనవి",
    homeViewAll: "అన్నింటినీ చూడండి",
    homeHowItWorks: "AgriLink ఎలా పనిచేస్తుంది",
    homeDirectConnect: "నేరుగా కనెక్షన్",
    homeDirectConnectSub: "దళారులు లేరు. ప్రామాణీకరించబడిన రైతుల నుండి కొనండి.",
    homeAIQuality: "AI నాణ్యత తనిఖీ",
    homeAIQualitySub: "పురోగామి AI వారా నాణ్యత ధృవీకరించబడింది.",
    homeFairPricing: "న్యాయమైన ధర",
    homeFairPricingSub: "ధరలో పారదర్శకత రైతులకి సరైన ఆదాయం ఇస్తుంది.",
    
    // Market & Cards
    addCart: "కార్ట్‌కు జోడించు",
    fromParam: "నుండి",
    stock: "స్టాక్‌లో ఉంది",
    priceRange: "ధర పరిధి",
    sortByPop: "వడపోత: జనాదరణ పొందినవి",
    priceLowHigh: "ధర: తక్కువ నుండి ఎక్కువ",
    priceHighLow: "ధర: ఎక్కువ నుండి తక్కువ",

    // Farmer Dashboard
    farmerDash: "రైతు డాష్‌బోర్డ్",
    farmerDashSub: "మీ పంటలను నిర్వహించండి మరియు AI అంతర్దృష్టులను వీక్షించండి.",
    addProduct: "ఉత్పత్తిని జోడించండి",
    totalSales: "మొత్తం అమ్మకాలు",
    activeProducts: "క్రియాశీల ఉత్పత్తులు",
    profileViews: "ప్రొఫైల్ వీక్షణలు",
    apiListings: "మీ జాబితాలు",
    noProducts: "ఇంకా ఏ ఉత్పత్తులు లేవు. 'జోడించు' పై క్లిక్ చేయండి!",
    edit: "సవరించు",
    incomingOrders: "వచ్చే ఆర్డర్‌లు",
    noOrders: "ఇంకా ఏ ఆర్డర్‌లు రాలేదు.",
    buyer: "కొనుగోలుదారు",
    shipTo: "చిరునామా",
    updateStatus: "స్థితి నవీకరించండి",
    aiInsights: "AI మార్కెట్ అంతర్దృష్టులు",
    loadingAi: "AI అంతర్దృష్టులను లోడ్ చేస్తోంది...",
    predictedTrends: "అంచనా వేసిన డిమాండ్",
    demand: "డిమాండ్",
    editProductParam: "ఉత్పత్తిని సవరించండి",
    addNewProductParam: "కొత్త ఉత్పత్తిని జోడించండి",
    prodName: "ఉత్పత్తి పేరు",
    category: "వర్గం",
    selectCategory: "వర్గాన్ని ఎంచుకోండి",
    vegetables: "కూరగాయలు",
    fruits: "పండ్లు",
    grains: "ధాన్యాలు",
    dairy: "పాల ఉత్పత్తులు",
    price: "ధర (₹)",
    quantity: "స్టాక్‌లో ఉన్న పరిమాణం",
    unit: "యూనిట్",
    organic: "సర్టిఫైడ్ సేంద్రియ 🌱",
    cultivatedDate: "సాగు చేసిన తేదీ",
    image: "చిత్రం URL (ఐచ్ఛికం)",
    saveChanges: "మార్పులను సేవ్ చేయండి",
    publishProduct: "ఉత్పత్తి జాబితాను ప్రచురించండి",
    placeholderTomato: "ఉదాహరణకు. టొమాటోలు",

    // Consumer Dashboard
    consDashWelcome: "తిరిగి స్వాగతం",
    consDashSub: "మీ ఆర్డర్‌ల వివరాలు ఇక్కడ ఉన్నాయి.",
    orders: "ఆర్డర్‌లు",
    pastOrders: "గత ఆర్డర్‌లు",
    tracking: "ట్రాకింగ్",
    activeDel: "ప్రస్తుత డెలివరీలు",
    favorites: "ఇష్టమైనవి",
    savedItems: "సేవ్ చేసినవి",
    subscriptions: "సబ్‌స్క్రిప్షన్‌లు",
    manageRecur: "నిర్వహించండి",
    orderHistory: "మీ ఆర్డర్ చరిత్ర",
    noConsOrders: "మీరు ఇంకా ఏ ఆర్డర్‌లు చేయలేదు. మా మార్కెట్ ప్లేస్ తప్పక చూడండి!",
    noTracking: "మీకు ప్రస్తుత డెలివరీలు లేవు.",
    orderPlaced: "ఆర్డర్ చేయబడింది",
    preparingGoods: "మేము మీ తాజా ఉత్పత్తులను సిద్ధం చేస్తున్నాము.",
    aiSuggested: "AI మీకు సూచించినవి",
    personalized: "వ్యక్తిగతీకరించినది",
    qtyParam: "పరిమాణం",
    yourFavs: "మీ ఇష్టమైనవి",
    noFavs: "మీరు ఇంకా ఏమీ సేవ్ చేయలేదు.",
    ancientMethodsTitle: "ప్రాచీన సేంద్రియ పద్ధతులు",
    ancientMethodsSub: "ఈ ఉత్త్పత్తి ప్రాచీన వ్యవసాయ పద్ధతులను ఉపయోగించి పండించబడింది:",
    jeevamrutham: "జీవామృతం:",
    jeevamruthamDesc: "మొక్కలకు అవసరమైన పోషకాలను అందించే పులియబెట్టిన సూక్ష్మజీవుల మిశ్రమం.",
    panchagavya: "పంచగవ్య:",
    panchagavyaDesc: "సహజ ఎరువుగా ఉపయోగపడే ఆవు సంబంధిత ఐదు పదార్థాల మిశ్రమం.",
    cropRotation: "పంట మార్పిడి:",
    cropRotationDesc: "రసాయనాలు లేకుండా సహజంగా నేల సారాన్ని పెంచడం.",
    neemExtracts: "వేప తైలం:",
    neemExtractsDesc: "సురక్షితమైన, సాంప్రదాయ సహజ పురుగుమందు.",
    farmerInfoSection: "రైతు సమాచారం",
    farmerNameLabel: "పేరు:",
    farmerLocationLabel: "స్థలం:",
    farmerDirectPriceInfo: "ఉత్పత్తి ధరలో 100% నేరుగా రైతుకే చెందుతుంది.",
    homeBannerTitle: "పొలం నుండి నేరుగా మీకు.",
    homeBannerSub: "AI అంతర్దృష్టుల మద్దతుతో అత్యుత్తమ నాణ్యత గల ఉత్పత్తులను పొందండి.",
    homeBannerBtn: "మార్కెట్ అనుభవించండి",
    homeAIPricing: "AI ఆధారిత ధరలు",
    homeAIPricingSub: "స్మార్ట్ మెషిన్ లెర్నింగ్ అల్గారిథమ్స్, మీరు అత్యంత అనుకూలమైన ధర చెల్లించేలా చూస్తాయి.",
    homeVerified: "ధృవీకరించబడిన రైతులు",
    homeVerifiedSub: "సంపూర్ణ పారదర్శకత. మీ ఆహారం ఎక్కడ నుండి వస్తుందో మీకు కచ్చితంగా తెలుసు.",
    homeOrganic: "సేంద్రియ నాణ్యత",
    homeOrganicSub: "మీకు స్వచ్ఛమైన మరియు ఆరోగ్యకరమైన ఎంపికలను అందించడానికి నాణ్యత తనిఖీ చేసిన ప్రక్రియలు."
  }
};

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('appLang') || 'en';
    });

    const [dynamicTranslations, setDynamicTranslations] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('dynamicTranslations')) || {};
        } catch(e) {
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem('appLang', lang);
    }, [lang]);

    const t = translations[lang] || translations['en'];

    const translateProduct = (name) => {
        if (!name) return name;
        if (lang === 'en') return name;
        
        const map_te = {
            "tomato": "టొమాటో",
            "tomato updated": "టొమాటో (నవీకరించబడింది)",
            "mangoes": "మామిడికాయలు",
            "banana": "అరటికాయలు",
            "wheat": "గోధుమలు",
            "brinjal": "వంకాయ"
        };
        const lower = name.toLowerCase().trim();
        if (map_te[lower]) return map_te[lower];

        if (dynamicTranslations[lower]) return dynamicTranslations[lower];

        if (!dynamicTranslations[lower + "_loading"]) {
            // Fetch dynamically
            setTimeout(() => {
                setDynamicTranslations(prev => ({ ...prev, [lower + "_loading"]: true }));
                fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(name)}&langpair=en|te`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.responseData && data.responseData.translatedText) {
                            const translated = data.responseData.translatedText;
                            setDynamicTranslations(prev => {
                                const next = { ...prev, [lower]: translated };
                                localStorage.setItem('dynamicTranslations', JSON.stringify(next));
                                return next;
                            });
                        }
                    })
                    .catch(err => console.error(err));
            }, 0);
        }

        return name;
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, translateProduct }}>
            {children}
        </LanguageContext.Provider>
    );
};
