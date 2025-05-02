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
      const rows = await runQuery('SELECT * FROM inventario');
      db.close();
      return {
        statusCode: 200,
        body: JSON.stringify(rows),
      };
    } else if (method === 'POST') {
      const data = JSON.parse(event.body);
      if (!data.nombre || data.precio_compra == null || data.precio_venta == null || !data.proveedor1) {
        db.close();
        return { statusCode: 400, body: 'Campos requeridos faltantes' };
      }
      const result = await runRun(
        'INSERT INTO inventario (nombre, precio_compra, precio_venta, proveedor1, proveedor2) VALUES (?, ?, ?, ?, ?)',
        [data.nombre, data.precio_compra, data.precio_venta, data.proveedor1, data.proveedor2 || null]
      );
      db.close();
      return {
        statusCode: 201,
        body: JSON.stringify({ id: result.lastID, ...data }),
      };
    } else if (method === 'PUT') {
      if (!id) {
        db.close();
        return { statusCode: 400, body: 'ID es requerido' };
      }
      const data = JSON.parse(event.body);
      if (!data.nombre || data.precio_compra == null || data.precio_venta == null || !data.proveedor1) {
        db.close();
        return { statusCode: 400, body: 'Campos requeridos faltantes' };
      }
      await runRun(
        'UPDATE inventario SET nombre = ?, precio_compra = ?, precio_venta = ?, proveedor1 = ?, proveedor2 = ? WHERE id = ?',
        [data.nombre, data.precio_compra, data.precio_venta, data.proveedor1, data.proveedor2 || null, id]
      );
      db.close();
      return {
        statusCode: 200,
        body: JSON.stringify({ id, ...data }),
      };
    } else if (method === 'DELETE') {
      if (!id) {
        db.close();
        return { statusCode: 400, body: 'ID es requerido' };
      }
      await runRun('DELETE FROM inventario WHERE id = ?', [id]);
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
