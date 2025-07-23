const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;
const AGENDA_URL = 'http://www.raydelto.org/agenda.php';

app.use(cors());
app.use(express.json());

app.get('/api/contactos', async (req, res) => {
  try {
    const response = await fetch(AGENDA_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
});

app.post('/api/contactos', async (req, res) => {
  try {
    const nuevoContacto = req.body;
    await fetch(AGENDA_URL, {
      method: 'POST',
      body: JSON.stringify(nuevoContacto),
    });
    res.status(201).json({ mensaje: 'Contacto agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el contacto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
