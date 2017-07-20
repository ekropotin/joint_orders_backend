const router = require('express').Router();

const routeUsers = require('./users');
const routeSuppliers = require('./suppliers');

router.use('/users', routeUsers);
router.use('/suppliers', routeSuppliers);
// TODO: other first level routes here

module.exports = router;
