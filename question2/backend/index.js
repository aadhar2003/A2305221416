const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];
    const minPrice = 1;
    const maxPrice = 10000;
    const topN = 10;
    
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIyMjQ0MzAxLCJpYXQiOjE3MjIyNDQwMDEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQzYzU4NjVmLTRjYmQtNDU0ZS05OWJjLWZlMjlhM2ZlZDg1YiIsInN1YiI6ImFhZGhhci5nb2VsQHMuYW1pdHkuZWR1In0sImNvbXBhbnlOYW1lIjoiQUZGT1JETUVEIiwiY2xpZW50SUQiOiI0M2M1ODY1Zi00Y2JkLTQ1NGUtOTliYy1mZTI5YTNmZWQ4NWIiLCJjbGllbnRTZWNyZXQiOiJPdU95bnFMS25RdE9xdGdDIiwib3duZXJOYW1lIjoiQWFkaGFyIEdvZWwiLCJvd25lckVtYWlsIjoiYWFkaGFyLmdvZWxAcy5hbWl0eS5lZHUiLCJyb2xsTm8iOiJBMjMwNTIyMTQxNiJ9.aZB93ihCjB-EtWF_p0CCOg9mQTVw6v1rExFhTqnvdNM';

    const requests = [];

    companies.forEach(company => {
      categories.forEach(category => {
        const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        requests.push(
          axios.get(url, {
            headers: {
              'Authorization': token,
            }
          }).then(response => ({
            company,
            category,
            products: response.data
          })).catch(error => {
            console.error(`Error fetching products for ${company} - ${category}:`, error);
            return { company, category, products: [] };
          })
        );
      });
    });

    const results = await Promise.all(requests);
    const aggregatedResults = results.reduce((acc, result) => {
      acc.push(...result.products);
      return acc;
    }, []);

    res.json(aggregatedResults);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
