"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//creating a middleware - not supposed to return anything from a middleware
function requireAuth(req, res, next) {
    // typeguard
    if (req.session && req.session.loggedIn) {
        //if user is logged in then allow to continue
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    if ( /* type guard */req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>You are logged in</div>\n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div>You are not logged in</div>\n        <a href=\"/login\">Login</a>\n      </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user');
});
