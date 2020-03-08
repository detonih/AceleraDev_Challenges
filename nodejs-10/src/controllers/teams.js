const teamsModel = require('../models')['teams']
const playersModel = require('../models')['players']

let Teams = {}

Teams.getAll = async (req, res, next) => {
  try {
    const data = await teamsModel.findAll({
      include: playersModel
    });

    res.status(200).json({
    "total": data.length,
    "data": data
    })
  } catch (err) {
    console.log(err)
  }
}

Teams.getById = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    
    const data = await teamsModel.findOne({
      where: {
        id: teamId
      },
      include: playersModel
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}

Teams.getTeamPlayers = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    
    const data = await teamsModel.findOne({
      where: {
        id: teamId
      },
      include: playersModel
    });
    
    res.status(200).json({
      "total": data.players.length,
      "data": data.players
    });
  } catch (err) {
    console.log(err);
  }
}

Teams.create = async (req, res, next) => {
  try {
    const team = req.body
    const data = await teamsModel.create(team)

    res.status(201).json(data)
  } catch (err) {
    console.log(err)
  }
}

Teams.update = async (req, res, next) => {
  const { teamId } = req.params
  const result = await teamsModel.update(req.body, {
    where: { id: teamId }
  })

  res.status(200).json({ result })
}

Teams.delete = async (req, res, next) => {
  const { teamId } = req.params
  const result = await teamsModel.destroy({
    where: { id: teamId }
  })

  res.status(204).json({ result })
}

module.exports = Teams
