const express = require('express');
const app = express();

const querys = require('./consultas/query.js');
const errors = require('./errors/handleErrors');

app.use(express.json());

const PORT = process.env.SV_PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Variables globales de index.js
let status = "";
let message = "";

app.get('/canciones', async (req, res) => {
    try {

        const canciones = await querys.todos();

        res.json(canciones);

    } catch (err) {
        console.log("Error General: ", err)
        const final = errors(err.code, status, message);
        console.log("Codigo de Error: ", final.code);
        console.log("Status de Error: ", final.status);
        console.log("Mensaje de Error: ", final.message);
        console.log("Error Original: ", err.message);
    }
});

app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;

    try {
        if (!titulo || !artista || !tono) {
            return res.status(400).json({ error: 'Por favor, proporciona titulo, artista y tono' });
        }

        const agregarCancion = querys.agregar(titulo, artista, tono);

        res.status(201).json(
            {
                message: 'Cancion agregada correctamente.',
                cancion: agregarCancion
            }
        );

    } catch (err) {
        console.log("Error General: ", err)
        const final = errors(err.code, status, message);
        console.log("Codigo de Error: ", final.code);
        console.log("Status de Error: ", final.status);
        console.log("Mensaje de Error: ", final.message);
        console.log("Error Original: ", err.message);
    }

});

app.put('/cancion/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, artista, tono } = req.body;

    try {

        if (!titulo || !artista || !tono) {
            return res.status(400).json({ error: 'Por favor, proporciona titulo, artista y tono para actualizar la canción.' });
        }

        await querys.modificar(id, titulo, artista, tono);

        const cancionActualizada = await querys.consultar(id);

        if (cancionActualizada.length > 0) {
            res.json(
                {
                    message: 'Canción actualizada correctamente.',
                    cancion: cancionActualizada[0]
                }
            );
        } else {
            res.status(400).json(
                {
                    message: "El registro con id: " + id + " no existe."
                }
            )
        }

    } catch (err) {
        console.log("Error General: ", err)
        const final = errors(err.code, status, message);
        console.log("Codigo de Error: ", final.code);
        console.log("Status de Error: ", final.status);
        console.log("Mensaje de Error: ", final.message);
        console.log("Error Original: ", err.message);
    }
});

app.delete('/cancion', async (req, res) => {
    const { id } = req.query;
    try {

        const cancionEliminada = await querys.eliminar(id);

        res.json(
            {
                message: `Cancion con id ${id} eliminada correctamente`
            }
        );

    } catch (err) {
        console.log("Error General: ", err)
        const final = errors(err.code, status, message);
        console.log("Codigo de Error: ", final.code);
        console.log("Status de Error: ", final.status);
        console.log("Mensaje de Error: ", final.message);
        console.log("Error Original: ", err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.send('Esta página no existe...');
});