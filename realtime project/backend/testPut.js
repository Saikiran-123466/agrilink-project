const http = require('http');

const data = JSON.stringify({
  name: "Tomato Updated",
  category: "vegetables",
  price: 45,
  quantity: 30,
  unit: "kg",
  image: "",
  organic: true,
  cultivated_date: "2026-05-01"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/products/1',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let resData = '';
  res.on('data', d => {
    resData += d;
  });
  res.on('end', () => console.log('Status:', res.statusCode, resData));
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
