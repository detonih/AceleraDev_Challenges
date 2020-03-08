const { NODE_ENV } = process.env
const table = `students_${NODE_ENV}`

// Deixamos esses helpers para ficar mais fácil escrever as queries e executálas de formas assíncrona. 🚀 
const { insertFormatter, queryHelper, updateFormatter, connection } = require('../../db/helper')

const getAll = async (request, response) => {
  try {

    const query = `SELECT * FROM ${table}`;
    const sendQuery = await queryHelper(query);
    
    response.status(200).json(await sendQuery)
  } catch (err) {
    console.log(err)
  }
}

const getById = async (request, response) => {
  try {
    const { studentId } = request.params
    //console.log(studentId)
  
    const query = `SELECT * FROM ${table} WHERE id = ${studentId}`;
    const sendQuery = await queryHelper(query);
    
    response.status(200).send(await sendQuery)
  } catch (err) {
    console.log(err)
  }
}

const create = async (request, response) => {
  try{
    const data = request.body;
    const formatRequest = insertFormatter(data);
    const query = `INSERT INTO ${table} (${formatRequest.columns}) VALUES (${formatRequest.values});`;
    const sendQuery = await queryHelper(query);
  
    response.status(201).send({
      success: 'A new record has been created.'
    });

  } catch(err) {
    console.log(err);
  }
}

const updateById = async (request, response) => {
  try {

    const data = request.body;
    const {studentId} = request.params
  
    const formatRequest = updateFormatter(data);
    const query = `UPDATE ${table} SET ${formatRequest} WHERE id = ${studentId}`;
    const sendQuery = await queryHelper(query);

    response.status(200).send({
      success: 'The record has been updated.'
    })
  } catch (err) {
    console.log(err)
  }
  

}

const deleteById = async (request, response) => {
  try {
    const {studentId} = request.params
    
    const query = `DELETE FROM ${table} WHERE id = ${studentId}`;
    const sendQuery = await queryHelper(query);
    //console.log(sendQuery)

    response.status(204).send('ok')
    
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
