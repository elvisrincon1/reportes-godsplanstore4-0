const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Inicializar base de datos SQLite
const db = new sqlite3.Database(path.resolve(__dirname, 'ventas.db'), (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Crear tablas si no existen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS proveedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS afiliados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS inventario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio_compra REAL NOT NULL,
    precio_venta REAL NOT NULL,
    proveedor1 TEXT NOT NULL,
    proveedor2 TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    afiliado TEXT NOT NULL,
    producto_id INTEGER NOT NULL,
    fecha TEXT NOT NULL,
    FOREIGN KEY(producto_id) REFERENCES inventario(id)
  )`);
});

// Rutas para Proveedores
app.get('/api/proveedores', (req, res) => {
  db.all('SELECT * FROM proveedores ORDER BY nombre', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/proveedores', (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  db.run('INSERT INTO proveedores(nombre) VALUES(?)', [nombre], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nombre });
  });
});

app.put('/api/proveedores/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  db.run('UPDATE proveedores SET nombre = ? WHERE id = ?', [nombre, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, nombre });
  });
});

app.delete('/api/proveedores/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM proveedores WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedId: id });
  });
});

// Rutas para Afiliados
app.get('/api/afiliados', (req, res) => {
  db.all('SELECT * FROM afiliados ORDER BY nombre', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/afiliados', (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  db.run('INSERT INTO afiliados(nombre) VALUES(?)', [nombre], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nombre });
  });
});

app.put('/api/afiliados/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });
  db.run('UPDATE afiliados SET nombre = ? WHERE id = ?', [nombre, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, nombre });
  });
});

app.delete('/api/afiliados/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM afiliados WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedId: id });
  });
});

// Rutas para Inventario
app.get('/api/inventario', (req, res) => {
  db.all('SELECT * FROM inventario ORDER BY nombre', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/inventario', (req, res) => {
  const { nombre, precio_compra, precio_venta, proveedor1, proveedor2 } = req.body;
  if (!nombre || precio_compra == null || precio_venta == null || !proveedor1) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  db.run(
    'INSERT INTO inventario(nombre, precio_compra, precio_venta, proveedor1, proveedor2) VALUES(?,?,?,?,?)',
    [nombre, precio_compra, precio_venta, proveedor1, proveedor2 || null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nombre, precio_compra, precio_venta, proveedor1, proveedor2 });
    }
  );
});

app.put('/api/inventario/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio_compra, precio_venta, proveedor1, proveedor2 } = req.body;
  if (!nombre || precio_compra == null || precio_venta == null || !proveedor1) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  db.run(
    'UPDATE inventario SET nombre = ?, precio_compra = ?, precio_venta = ?, proveedor1 = ?, proveedor2 = ? WHERE id = ?',
    [nombre, precio_compra, precio_venta, proveedor1, proveedor2 || null, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, nombre, precio_compra, precio_venta, proveedor1, proveedor2 });
    }
  );
});

app.delete('/api/inventario/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM inventario WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedId: id });
  });
});

// Rutas para Ventas
app.get('/api/ventas', (req, res) => {
  db.all('SELECT ventas.id, ventas.afiliado, ventas.fecha, inventario.* FROM ventas JOIN inventario ON ventas.producto_id = inventario.id ORDER BY ventas.fecha DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/ventas', (req, res) => {
  const { afiliado, producto_id, fecha } = req.body;
  if (!afiliado || !producto_id || !fecha) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  db.run('INSERT INTO ventas(afiliado, producto_id, fecha) VALUES(?,?,?)', [afiliado, producto_id, fecha], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, afiliado, producto_id, fecha });
  });
});

app.delete('/api/ventas/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM ventas WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedId: id });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
