const model = require('../models')['players']
const { Op } = require('sequelize')

let Players = {}

Players.getAll = async (req, res, next) => {
  try {
    const { nationality, score } = req.query;

    if(nationality) {
      const dataNationality = await model.findAll({
        where: {
          nationality: {
            [Op.eq]: nationality
          }
        }
      });

      res.status(200).json({
        "total": dataNationality.length,
        "data": dataNationality
      });
    } else if (score) {
      const dataScore = await model.findAll({
        where: {
          score: {
            [Op.gte]: score
          }
        }
      });

      res.status(200).json({
        "total": dataScore.length,
        "data": dataScore
      });
    } else {
      const data = await model.findAll({})

      res.status(200).json({
        "total": data.length,
        "data": data
      })
    }
    
  } catch (err) {
    console.log(err)
  }
}

Players.getById = async (req, res, next) => {
  try {
    const { playerId } = req.params;
    
    const data = await model.findOne({
      where: {
        id: playerId
      }
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}

Players.create = async (req, res, next) => {
  try {
    const player = req.body
    const data = await model.create(player)

    res.status(201).json(data)
  } catch (err) {
    console.log(err)
  }
}

Players.update = async (req, res, next) => {
  const { playerId } = req.params
  const result = await model.update(req.body, {
    where: { id: playerId }
  })

  res.status(200).json({ result })
}

Players.delete = async (req, res, next) => {
  const { playerId } = req.params
  const result = await model.destroy({
    where: { id: playerId }
  })

  res.status(204).json({ result })
}

module.exports = Players
