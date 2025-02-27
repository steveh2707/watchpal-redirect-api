const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});

let linkRequestCounter = 0

app.get('/link', (req, res) => {
  linkRequestCounter++
  const { action, id } = req.query;
  console.log(`Link request ${linkRequestCounter}: Action=${action} id=${id}`)

  const userAgent = req.get('User-Agent');
  if (action == null || id == null) {
    res.status(400).send('Invalid request');
  }
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return res.redirect(`watchpal://${action}?id=${id}`);
  } else {
    return res.redirect(`https://www.themoviedb.org/${action}/${id}`);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
