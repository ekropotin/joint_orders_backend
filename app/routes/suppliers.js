const router = require('express').Router();
const SupplierModel = require('../models/supplier');
const modelHelper = require('../middlewares/model_helper')(SupplierModel);
const menuItemsRoute = require('./menu_items');

router.get('/', modelHelper.findAll(() => ({})));

router.get('/:supplier_id', modelHelper.findOne(req => ({ _id: req.params.supplier_id })));

router.post('/', modelHelper.create(req => Object.assign({}, req.body)));

router.use('/:supplier_id/menu_items', menuItemsRoute);

module.exports = router;
