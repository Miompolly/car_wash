const Model = require("../models/serviceRecordModel");

exports.getAll = (req, res) => {
  Model.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  Model.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service created", id: result.insertId });
  });
};

exports.getOne = (req, res) => {
  Model.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

exports.update = (req, res) => {
  Model.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service updated" });
  });
};

exports.delete = (req, res) => {
  Model.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service deleted" });
  });
};