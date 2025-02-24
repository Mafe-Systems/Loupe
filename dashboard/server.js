app.get('/', (req, res) => {
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
  