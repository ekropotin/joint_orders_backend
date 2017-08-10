const router = require('express').Router();

const routeUsers = require('./users');
const routeSuppliers = require('./suppliers');
const routeAuth = require('./auth');

router.use('/auth', routeAuth);
router.use('/users', routeUsers);
router.use('/suppliers', routeSuppliers);
// TODO: other first level routes here

module.exports = router;
