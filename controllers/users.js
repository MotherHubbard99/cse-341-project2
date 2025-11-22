const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const lists = await mongodb.getDb().collection('cse341').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to find a user.');
  }
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().collection('cse341').find({ _id: userId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createUser = async (req, res) => {
  const user = {
    age: req.body.age,
    favoriteCandy: req.body.favoriteCandy,
    favoriteSoda: req.body.favoriteSoda,
    eyeColor: req.body.eyeColor,
    firstname: req.body.firstname,
    location: req.body.location,
  };
  try {
    const response = await mongodb.getDb().collection('cse341').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to update a user.');
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    age: req.body.age,
    favoriteCandy: req.body.favoriteCandy,
    favoriteSoda: req.body.favoriteSoda,
    eyeColor: req.body.eyeColor,
    location: req.body.location,
  };
  try {
    const response = await mongodb.getDb().collection('cse341').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(200).json({message: 'User updated successfully'});
    } else {
      res.status(404).json(response.error || 'User not found or no changes made.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to delete a user.');
  }
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().collection('cse341').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || 'User not found.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
