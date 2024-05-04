const pool = require('../config/configDB');

let tabla = 'canciones';

async function todos(){
    const queryJson = {       
        text: `SELECT * FROM ${tabla}`
    };

    const { rows } = await pool.query(queryJson);

    return rows;
}

async function consultar(id){
    const queryJson = {
        text: `SELECT * FROM ${tabla} WHERE id = $1`,
        values: [id]
    };

    const { rows } = await pool.query(queryJson);

    return rows;
}

async function agregar(titulo, artista, tono) {
    const queryJson = {
        text: `INSERT INTO ${tabla} (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *`,
        values: [titulo, artista, tono]
    }

    const results = await pool.query(queryJson);

    return results[0];
}

async function modificar(id, titulo, artista, tono) {
    const queryJson = {
        text: `UPDATE ${tabla} SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *`,
        values: [titulo, artista, tono, id]
    }

    const { rows } = await pool.query(queryJson);

    return rows;
}

async function eliminar(id) {
    const queryJson = {
        text: `DELETE FROM ${tabla} WHERE id = $1 RETURNING *`,
        values: [id]
    }

    const { rows } = await pool.query(queryJson);

    return rows;
}

module.exports = {
    todos,
    consultar,
    agregar,
    modificar,
    eliminar
}