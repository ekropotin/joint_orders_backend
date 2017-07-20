module.exports = function (Model) {
  return {
    findAll(getQueryFunc) {
      return function (req, res) {
        Model.find(getQueryFunc(req), (err, results) => {
          if (err) {
            res.status(400).send(err.errmsg);
            return;
          }

          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(results);
        });
      };
    },

    findOne(getQueryFunc) {
      return function (req, res) {
        Model.findOne(getQueryFunc(req), (err, results) => {
          if (err) {
            res.status(400).send(err.errmsg);
            return;
          }

          if (!results) {
            res.status(404).send();
            return;
          }

          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(results);
        });
      };
    },

    create(getDataFunc) {
      return function (req, res) {
        const model = new Model(getDataFunc(req));
        model.save((err) => {
          if (err) {
            console.error(err);
            res.status(400).send(err.errmsg);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Location', `${req.originalUrl}/${model.id}`);
            res.status(201).json(model);
          }
        });
      };
    }
  };
};
