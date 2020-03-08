module.exports = (sequelize, DataTypes) =>
  sequelize.define('players', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: DataTypes.STRING,
    nationality: DataTypes.STRING,
    age: DataTypes.INTEGER(2),
    wage: DataTypes.INTEGER,
    score: DataTypes.INTEGER(3)
  })
