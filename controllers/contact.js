const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const lists = await mongodb.getDb().collection('contact').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const contactId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().collection('contact').find({ _id: contactId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createContact = async (req, res) => {
  const contact = {
    parentFirstName: req.body.parentFirstName,
    parentLastName: req.body.parentLastName,
    cellNumber: req.body.cellNumber,
    relationship: req.body.relationship,
    allergies: req.body.allergies,
    vaccinationStatus: req.body.vaccinationStatus,
    weight: req.body.weight,
  };
  try {
    const response = await mongodb.getDb().collection('contact').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const contactId = new ObjectId(req.params.id);
  const contact = {
    parentFirstName: req.body.parentFirstName,
    parentLastName: req.body.parentLastName,
    cellNumber: req.body.cellNumber,
    relationship: req.body.relationship,
    allergies: req.body.allergies,
    vaccinationStatus: req.body.vaccinationStatus,
    weight: req.body.weight,
  };
  try {
    const response = await mongodb.getDb().collection('contact').updateOne({ _id: contactId }, { $set: contact });
    if (response.modifiedCount > 0) {
      res.status(200).json({message: 'Contact updated successfully'});
    } else {
      res.status(404).json(response.error || 'Contact not found or no changes made.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const contactId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().collection('contact').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json(response.error || 'Contact not found.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
