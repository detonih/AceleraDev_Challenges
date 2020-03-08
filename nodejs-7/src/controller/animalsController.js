const { animals } = require('../model');

const getAll = async (req, res) => {
  try {
    const data = await animals.findAll({})

    res.status(200).send({
      total: data.length,
      data
    })
  } catch (err) {
    console.log(err)
  }
}

const getById = async (req, res) => {
  try {
    const { animalId } = req.params;
    const data = await animals.findOne({
      where: {
        id: animalId
      }
    });

    res.status(200).json(data)
  } catch (err) {

  }
}

const create = async (req, res) => {
  try {
    const data = await animals.create(req.body);
  
    res.status(201).json(data)
  } catch (err) {
    console.log(err)
  }
}

const update = async (req, res) => {
  try {
    const { animalId } = req.params;
    const data = await animals.update(req.body, {
      where: {
        id: animalId
      }
    });

    res.status(200).json({
      data: req.body
    })
  } catch (err) {
    console.log(err)
  }
}

const destroy = async (req, res) => {
  try {
    const { animalId } = req.params;
    const data = await animals.destroy({
      where: {
        id: animalId
      }
    })

    res.status(204).json({})
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
}