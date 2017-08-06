const router = require('express').Router({ mergeParams: true });
const MenuItemModel = require('../models/menu_item');
const modelHelper = require('../middlewares/model_helper')(MenuItemModel);

router.get('/', modelHelper.findAll(req => ({ supplier_id: req.params.supplier_id })));

router.get('/:menu_item_id', modelHelper.findOne(req => ({ supplier_id: req.params.supplier_id, _id: req.params.menu_item_id })));

router.post('/', modelHelper.create((req) => {
  const obj = Object.assign({}, req.body);
  obj.supplier_id = req.params.supplier_id;
  return obj;
}));

module.exports = router;
