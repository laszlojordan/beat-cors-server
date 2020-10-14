const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/tajine/imagelist', (req, res) => {
  request(
    // { url: 'https://tajine.ey.r.appspot.com/images/imagelist.json' },
    { url: 'https://localhost:3001/images/imagelist.json' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }
      try {
        res.json(JSON.parse(body));
      } catch( parseError ) {
        res.status(500).json({ type: 'error', message: parseError.message });
      }
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
