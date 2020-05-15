const Container = require('../models/containerModel');
const APIFeatures = require('../utils/features');

const throwError = (e, r) => {
  return r.status(400).json({
    status: 'failed',
    message: e.message
  })
}

exports.aliasTopLayer = (req, res, next) => {
  req.query.parent = null;
  next();
}

exports.getAllContainers = async (req, res) => {
  try {
    const features = new APIFeatures(Container, req)
      .filter()
      .sort()
      .select()
      .pagination();
    const children = await features.query;
    res.status(200).json({
      status: 'success',
      results: children.length,
      data: {
        children
      }
    })
  }
  catch (err) {
    throwError(err, res); 
  }
};

exports.getContainer = async (req, res) => {
  try {
    console.log("REQUEST", req.params.id)
    const container = await Container.findById(req.params.id);
    const children = await Container.find({parent: req.params.id});
    res.status(200).json({
      status: 'success',
      data: {
        container,
        children
      }
    })
  }
  catch (err) {
    throwError(err, res);
  }
}

exports.updateContainer = async (req, res) => {
  try {
    const container = await Container.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        container
      }
    })
  }
  catch (err) {
    throwError(err, res);
  }
}

exports.deleteContainer = async (req, res) => {
  try {
    await Container.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    })
  }
  catch (err) {
    throwError(err, res);
  }
}

exports.newContainer = async (req, res) => {
  try {
    const newContainer = await Container.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        container: newContainer
      }
    });
  }
  catch (err) {
    throwError(err, res);
  }
}

