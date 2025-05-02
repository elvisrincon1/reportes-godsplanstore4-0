const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../ventas.db');

function openDb() {
  return new sqlite3.Database(dbPath);
}

exports.handler = async function(event, context) {
  const db = openDb();

  const method = event.httpMethod;
  const id = event.queryStringParameters ? event.queryStringParameters.id : null;

  function runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  function runRun(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }

  try {
    if (method === 'GET') {
      const rows = await runQuery('SELECT * FROM proveedores');
      db.close();
      return {
        statusCode: 200,
        body: JSON.stringify(rows),
      };
    } else if (method === 'POST') {
      const data = JSON.parse(event.body);
      if (!data.nombre) {
        db.close();
        return { statusCode: 400, body: 'Nombre es requerido' };
      }
      const result = await runRun('INSERT INTO proveedores (nombre) VALUES (?)', [data.nombre]);
      db.close();
      return {
        statusCode: 201,
        body: JSON.stringify({ id: result.lastID, nombre: data.nombre }),
      };
    } else if (method === 'PUT') {
      if (!id) {
        db.close();
        return { statusCode: 400, body: 'ID es requerido' };
      }
      const data = JSON.parse(event.body);
      if (!data.nombre) {
        db.close();
        return { statusCode: 400, body: 'Nombre es requerido' };
      }
      await runRun('UPDATE proveedores SET nombre = ? WHERE id = ?', [data.nombre, id]);
      db.close();
      return {
        statusCode: 200,
        body: JSON.stringify({ id, nombre: data.nombre }),
      };
    } else if (method === 'DELETE') {
      if (!id) {
        db.close();
        return { statusCode: 400, body: 'ID es requerido' };
      }
      await runRun('DELETE FROM proveedores WHERE id = ?', [id]);
      db.close();
      return {
        statusCode: 204,
        body: '',
      };
    } else {
      db.close();
      return { statusCode: 405, body: 'Método no permitido' };
    }
  } catch (error) {
    db.close();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
