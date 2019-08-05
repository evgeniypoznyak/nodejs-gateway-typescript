module.exports = function (err, req, res, next) { // must be after all routes and middleware(s)
    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    console.log({
        level: 'error',
        message: err.message,
        meta: err
    });

    return res.status(500) // internal server error
        .send('Something failed');
};
