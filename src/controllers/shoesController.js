let Shoe = require("../models/shoe");

// Search for shoes
const search = (req, res) => {
  let query = req.query.query;
  if (query) {
    Shoe.find({ $text: { $search: query } })
      .then((shoes) => {
        if (!shoes) {
          res.status(400).send({ message: "Shoe not found!" });
        }

        res.send({ shoes: shoes });
      })
      .catch((err) => {
        res.send({ message: "There was an error" });
      });
  } else {
    res.send({ shoes: {} });
  }
};

// Get all shoes
const getAll = (req, res) => {
  Shoe.find()
    .then((shoes) => {
      res.send({
        shoes: shoes
      });
    })
    .catch((err) => {
      res.send({ message: "There was an error " + err });
    });
};

// Get one shoe
const getOne = (req, res) => {
  Shoe.findOne({_id: req.params.id})
    .then((shoe) => {
      res.send({
        shoe: shoe
      });
    })
    .catch((err) => {
      res.send({ message: "There was an error " + err });
    });
};

// Add a new shoe
const postNewShoe = (req, res) => {
  let { brand, model, type, gender, size, color, material, price, rating } = req.body;

  let newShoe = {
    brand: brand,
    model: model,
    type: type,
    gender: gender,
    size: size,
    color: color,
    material: material,
    price: price,
    rating: rating
  };

  Shoe.create(newShoe).then((shoe) => {
    res.send({ message: "Shoe added successfully in the database." });
  })
  .catch((err) => {
    res.send({ message: "There was an error " + err });
  });
}

// Update all shoes
const postUpdateShoe = async (req, res) => {
  let { brand, model, type, gender, size, color, material, price, rating } = req.body;

  let newShoe = {
    brand: brand,
    model: model,
    type: type,
    gender: gender,
    size: size,
    color: color,
    material: material,
    price: price,
    rating: rating
  };

  Shoe.findOneAndUpdate({_id: req.params.id}, newShoe).then((shoe) => {
    if (shoe) {
      res.send({ message: "Shoe updated." });
    } else {
      res.send({ message: "Shoe does not exist! "});
    }
    
  })
  .catch((err) => {
    res.send({ message: "There was an error " + err });
  });
};

// Delete a shoe
const deleteShoe = (req, res) => {
  if (req.params.id == undefined) {
    res.send({ message: "Error deleting shoe" });
    return;
  }

  Shoe.deleteOne({_id: req.params.id})
    .then((shoe) => {
      res.send({ message: "Shoe deleted successfully." });
    })
    .catch((err) => {
      res.send({ message: "Shoe does not exist!" });
    });
};

module.exports = {
  search,
  getAll,
  postNewShoe,
  postUpdateShoe,
  deleteShoe,
  getOne
};
