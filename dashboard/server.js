const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const config = JSON.parse(fs.readFileSync('./config/config.json'));
  res.render('index', {
    prefix: config.prefix,
    adminID: config.adminID,
    ownerID: config.ownerID
  });
});

app.post('/update-config', (req, res) => {
  const updatedConfig = {
    token: req.body.token,
    prefix: req.body.prefix,
    adminID: req.body.adminID,
    ownerID: req.body.ownerID
  };

  fs.writeFileSync('./config/config.json', JSON.stringify(updatedConfig, null, 2));
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
