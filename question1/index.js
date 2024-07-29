const express = require('express');
var cors = require('cors')
const axios = require('axios');
const https = require('https');

const port = 9876;

const app = express();
app.use(express.json());
app.use(cors())

const windowsize = 10;
let window = [];

const agent = new https.Agent({  
    rejectUnauthorized: false
  });

app.get('/numbers/:id', async (req, res) => {

    const numberid = req.params.id;

    let reqid;
    if (numberid == 'p')
        reqid = 'primes';
    else if (numberid == 'f')
        reqid = 'fibo';
    else if (numberid == 'e')
        reqid = 'even';
    else if (numberid == 'r')
        reqid = 'rand';
    else {
        // return error that given numberId is not qualified
        res.status(400).send('Invalid numberId');
        return;
    }

    // hit the given api at the given url
    var options = {
        'method': 'GET',
        'url': `http://20.244.56.144/test/${reqid}`,
        'headers': {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIyMjQ0NjM1LCJpYXQiOjE3MjIyNDQzMzUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQzYzU4NjVmLTRjYmQtNDU0ZS05OWJjLWZlMjlhM2ZlZDg1YiIsInN1YiI6ImFhZGhhci5nb2VsQHMuYW1pdHkuZWR1In0sImNvbXBhbnlOYW1lIjoiQUZGT1JETUVEIiwiY2xpZW50SUQiOiI0M2M1ODY1Zi00Y2JkLTQ1NGUtOTliYy1mZTI5YTNmZWQ4NWIiLCJjbGllbnRTZWNyZXQiOiJPdU95bnFMS25RdE9xdGdDIiwib3duZXJOYW1lIjoiQWFkaGFyIEdvZWwiLCJvd25lckVtYWlsIjoiYWFkaGFyLmdvZWxAcy5hbWl0eS5lZHUiLCJyb2xsTm8iOiJBMjMwNTIyMTQxNiJ9._AJpa7RXroHXVTMuX1P067rdf7xP8PWi2rpvR4_Pqfk',
            'Content-Type': 'application/json'
        },
        timeout: 500,
        httpsAgent: agent
    };




    // call the api
    // if result not in 500 ms then return error
    try {
        const result = await axios(options);
        if (!result.data.numbers) {
            res.status(500).send('Invalid response from api');
            return;
        }

        const prevwindow = [...window];
        result.data.numbers.map((num) => {
            if (window.includes(num)) return;
            if (window.length >= windowsize) window.shift();
            window.push(num);
        });

        console.log(result.data);
        const calcAvg = window.reduce((a, b) => a + b, 0) / window.length;

        res.json({ windowPrevState: prevwindow, windowCurrState: window, numbers: result.data.numbers, avg: calcAvg });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Error fetching data from API');
    }

});

app.listen(port, function () {
    console.log("listening on port " + port);
});