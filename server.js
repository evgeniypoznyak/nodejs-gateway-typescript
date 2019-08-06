/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var config = __webpack_require__(1);

var jwt = __webpack_require__(4);

var mongoose = __webpack_require__(5);

var Joi = __webpack_require__(6);

var bcrypt = __webpack_require__(7);

var secret = process.env.JWT_PRIVATE_KEY || config.get('JWT_PRIVATE_KEY');
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    unique: true
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    id: this._id,
    isAdmin: this.isAdmin
  }, // payload. Could be anything what we need store and pass via token
  secret);
};

var User = mongoose.model('Users', userSchema);

var validateUser = function validateUser(user) {
  var schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required() //joi-password-complexity

  };
  return Joi.validate(user, schema);
};

var hash =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(password) {
    var salt;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bcrypt.genSalt(10);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return bcrypt.hash(password, salt);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function hash(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.hash = hash;
exports.User = User;
exports.validate = validateUser;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(1);

var jwt = __webpack_require__(4);

var secret = process.env.JWT_PRIVATE_KEY || config.get('JWT_PRIVATE_KEY');

module.exports = function (req, res, next) {
  var token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided');

  try {
    // if its valid it will be decoded and return payload
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(400).send('Invalid token');
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var winston = __webpack_require__(21);

__webpack_require__(22);

var config = __webpack_require__(1);

var url = process.env.MONGO_LOGGING || config.get('MONGO_LOGGING');
module.exports = winston.createLogger({
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  format: winston.format.combine(winston.format.timestamp(), // winston.format.colorize(),
  // winston.format.prettyPrint(),
  winston.format.json()),
  transports: [new winston.transports.Console(), // new winston.transports.File({filename: 'logfile.log'}),
  // new winston.transports.File({filename: 'error.log', level: 'error'}),
  // new winston.transports.MongoDB({db: 'mongodb://localhost:6666/LoggingDb', level: 'error'}),
  new winston.transports.MongoDB({
    db: url,
    collection: 'log'
  })],
  exceptionHandlers: [new winston.transports.Console(), new winston.transports.File({
    filename: 'exceptions.log'
  })]
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
__webpack_require__(13);


var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

__webpack_require__(14)(app);

__webpack_require__(24)();

__webpack_require__(25)();

process.on('unhandledRejection', function (ex) {
  throw ex;
});
var port = process.env.PORT || 2222;
var host = process.env.HOST || 'http://localhost';
app.listen(port, function () {
  return console.log("Listening: ".concat(host, ":").concat(port));
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express-async-errors");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(0);

var home = __webpack_require__(15);

var auth = __webpack_require__(16);

var users = __webpack_require__(17);

var skills = __webpack_require__(18);

var error = __webpack_require__(23);

module.exports = function (app) {
  app.use(express.json());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/', home);
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/skills', skills);
  app.use(error); // must be after all routes and middleware(s)
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(0);

router = express.Router();
router.get('/', function (req, res) {
  return res.send('Hello World!');
});
module.exports = router;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = __webpack_require__(2);

var express = __webpack_require__(0);

var router = express.Router();

var _require = __webpack_require__(3),
    User = _require.User;

var Joi = __webpack_require__(6);

var bcrypt = __webpack_require__(7);

router.post('/',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _validate, error, user, validPassword, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _validate = validate(req.body), error = _validate.error;

            if (!error) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send(error.details.slice().shift().message));

          case 3:
            _context.next = 5;
            return User.findOne({
              email: req.body.email
            });

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Invalid email or password!'));

          case 8:
            _context.next = 10;
            return bcrypt.compare(req.body.password, user.password);

          case 10:
            validPassword = _context.sent;

            if (validPassword) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Invalid email or password.'));

          case 13:
            token = user.generateAuthToken();
            return _context.abrupt("return", res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var validate =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req) {
    var schema;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            schema = {
              email: Joi.string().min(5).max(255).required().email(),
              password: Joi.string().min(5).max(255).required() //joi-password-complexity

            };
            return _context2.abrupt("return", Joi.validate(req, schema));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validate(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = router;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ = __webpack_require__(2);

var _require = __webpack_require__(3),
    User = _require.User,
    validate = _require.validate,
    hash = _require.hash;

var express = __webpack_require__(0);

var router = express.Router();

var auth = __webpack_require__(8);

router.get('/me', auth,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findById(req.user.id).select({
              password: false
            });

          case 2:
            user = _context.sent;
            res.send(user);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _validate, error, user, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _validate = validate(req.body), error = _validate.error;

            if (!error) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send(error.details.slice().shift().message));

          case 3:
            _context2.next = 5;
            return User.findOne({
              email: req.body.email
            });

          case 5:
            user = _context2.sent;

            if (!user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('User already registered'));

          case 8:
            user = new User(_.pick(req.body, ['name', 'email', 'password']));
            _context2.next = 11;
            return hash(req.body.password);

          case 11:
            user.password = _context2.sent;
            _context2.next = 14;
            return user.save();

          case 14:
            token = user.generateAuthToken();
            return _context2.abrupt("return", res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = __webpack_require__(0);

var router = express.Router();

var https = __webpack_require__(19);

var axios = __webpack_require__(20);

var config = __webpack_require__(1);

var auth = __webpack_require__(8);

var logger = __webpack_require__(9);

var api = process.env.API_SKILLS || config.get('API_SKILLS');
router.get('/',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var headers, agent, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            headers = req.headers;
            logger.log({
              level: 'info',
              message: "Processing request: ",
              meta: headers
            });
            agent = new https.Agent({
              rejectUnauthorized: false
            });
            _context.next = 5;
            return axios.get(api, {
              httpsAgent: agent
            });

          case 5:
            result = _context.sent;

            if (!(result && result.data && result.data.skills)) {
              _context.next = 9;
              break;
            }

            logger.log({
              level: 'info',
              message: "WOW: Getting results from microservice:",
              meta: JSON.stringify(result.data)
            });
            return _context.abrupt("return", res.send(result.data));

          case 9:
            logger.error({
              level: 'error',
              message: "something went wrong..."
            });
            res.statusMessage = "Else: Content not found";
            res.status(401);
            res.send("Else: Content not found");

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/', auth,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var agent, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            agent = new https.Agent({
              rejectUnauthorized: false
            });
            _context2.next = 3;
            return axios.get(api, {
              httpsAgent: agent
            });

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", res.send(result.data));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("winston-mongodb");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (err, req, res, next) {
  // must be after all routes and middleware(s)
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

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var logger = __webpack_require__(9);

var mongoose = __webpack_require__(5);

var config = __webpack_require__(1);

var url = process.env.MONGO_USERS || config.get('MONGO_USERS');

module.exports = function () {
  mongoose.connect(url, {
    useNewUrlParser: true
  }).then(function () {
    logger.log({
      level: 'info',
      message: 'Mongo db Connected'
    });
  });
  mongoose.set('debug', true);
  mongoose.set('useCreateIndex', true);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(1);

module.exports = function () {
  if (!config.get('JWT_PRIVATE_KEY')) {
    throw new Error('FATAL ERROR: JWT_PRIVATE_KEY is not defined!');
  }

  if (!config.get('MONGO_USERS')) {
    throw new Error('FATAL ERROR: MONGO_USERS is not defined!');
  }

  if (!config.get('MONGO_LOGGING')) {
    throw new Error('FATAL ERROR: MONGO_LOGGING is not defined!');
  }

  if (!config.get('API_SKILLS')) {
    throw new Error('FATAL ERROR: API_SKILLS is not defined!');
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map