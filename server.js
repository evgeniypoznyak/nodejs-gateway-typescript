require('express-async-errors');
const app = require('express')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

process.on('unhandledRejection', (ex) => {
    throw ex;
});

const port = process.env.PORT || 2222;
const host = process.env.HOST || 'http://localhost';
app.listen(port, () => console.log(`Listening: ${host}:${port}`));
