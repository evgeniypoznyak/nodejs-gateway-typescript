const express = require('express');
const home = require('../routes/home');
const auth = require('../routes/auth');
const users = require('../routes/users');
const skills = require('../routes/skills');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use('/', home);
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/skills', skills);
  app.use(error); // must be after all routes and middleware(s)
};
