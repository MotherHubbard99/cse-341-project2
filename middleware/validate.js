const Validator = require('validator');

const saveContact = (req, res, next) => {
    const validationRule = {
        age: 'required|numeric',
        favoriteCandy: 'string',
        favoriteSoda: 'required|string',
        EyeColor: 'string',
        firstname: 'required|string',
        location: 'required|string'
    };

    const validation = new Validator(req.body, validationRule);

  if (validation.passes()) {
    next();
  } else {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: validation.errors
    });
  }
};

module.exports = {
    saveContact
};
