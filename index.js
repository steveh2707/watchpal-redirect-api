const express = require('express');
const app = express();

app.get('/link', (req, res) => {
  const { action, id } = req.query;
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

app.get('/', (req, res) => {

  // Send an HTML page with Open Graph meta tags
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
          <p>Hello world</p>
      </body>
      </html>
  `);
})


app.get('/linkWithMetaData', (req, res) => {
  const { action, id } = req.query;
  const userAgent = req.get('User-Agent');

  if (action == null || id == null) {
    res.status(400).send('Invalid request');
  }

  const url = `https://www.themoviedb.org/${action}/${id}`;
  const deepLink = `watchpal://person?id=${id}`;

  // Send an HTML page with Open Graph meta tags
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta property="og:title" content="Watch this Person on WatchPal!">
          <meta property="og:description" content="Check out this person's profile on WatchPal or The Movie Database.">
          <meta property="og:image" content="https://image.tmdb.org/t/p/w500/sample.jpg"> 
          <meta property="og:url" content="${url}">
          <meta name="twitter:card" content="summary_large_image">
          <title>Redirecting...</title>
          <script>
              setTimeout(() => {
                  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                      window.location.href = '${deepLink}';
                  } else {
                      window.location.href = '${url}';
                  }
              }, 2000);
          </script>
      </head>
      <body>
          <p>Redirecting...</p>
      </body>
      </html>
  `);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
