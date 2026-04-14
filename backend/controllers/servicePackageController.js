const Model = require("../models/servicePackageModel");

exports.getAll = (req, res) => {
  Model.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  Model.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Package created", id: result.insertId });
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
    res.json({ message: "Package updated" });
  });
};

exports.delete = (req, res) => {
  Model.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Package deleted" });
  });
};