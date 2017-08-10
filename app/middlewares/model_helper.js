const Errors = require('../utils/errors');
const ErrorCode = require('../constants/error_codes');

module.exports = function (Model) {
  return {
    findAll(getQueryFunc) {
      return function (req, res) {
        Model.find(getQueryFunc(req), (err, results) => {
          if (err) return res.status(500).send(Errors.makeError(ErrorCode.GENERAL_SERVER_ERROR, err.errmsg));

          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(results);
        });
      };
    },

    findOne(getQueryFunc) {
      return function (req, res) {
        console.log(JSON.stringify(getQueryFunc(req)));
        Model.findOne(getQueryFunc(req), (err, results) => {
          if (err) return res.status(500).send(Errors.makeError(ErrorCode.GENERAL_SERVER_ERROR, err.errmsg));

          if (!results) {
            res.status(404).send();
            return;
          }

          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(results);
        });
      };
    },

    checkRoute(idFieldName) {
      return function (req, res, next) {
        Model.findOne({ _id: req.params[idFieldName] }, (err, results) => {
          if (err) return res.status(500).send(Errors.makeError(ErrorCode.GENERAL_SERVER_ERROR, err.errmsg));

          if (!results) {
            res.status(404).send();
            return;
          }

          next();
        });
      };
    },

    create(getDataFunc) {
      return function (req, res) {
        const model = new Model(getDataFunc(req));
        model.save((err) => {
          if (err) return res.status(500).send(Errors.makeError(ErrorCode.GENERAL_SERVER_ERROR, err.errmsg));

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Location', `${req.originalUrl}/${model.id}`);
          res.status(201).json(model);
        });
      };
    }
  };
};
