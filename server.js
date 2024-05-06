// Modulos requeridos
const express = require('express');
const app = express();
const querys = require('./consultas/query.js');
const errors = require('./errors/handleErrors');

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Puerto en el que se ejecutara el servidor
const PORT = process.env.SV_PORT || 3000;

// Ruta principal que sirve el archivo index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html") //cambiar archivo a Myindex.html para utilizar la version con mensajes del servidor.
})

// Variables globales de index.js
let status = "";
let message = "";

// Tonalidades musicales validas
const tonosValidos = [
    "do", "do#", "re", "re#", "mi", "fa", "fa#", "sol", "sol#", "la", "la#", "si",
    "reb", "mib", "solb", "lab", "sib"
];

// Ruta para obtener todas las canciones
app.get('/canciones', async (req, res) => {
    try {

        const canciones = await querys.todos();

        res.json(canciones);

    } catch (err) {
        // Manejo de errores
        console.log("Error General: ", err)
        const final = errors(err.code, status, message);
        console.log("Codigo de Error: ", final.code);
        console.log("Status de Error: ", final.status);
        console.log("Mensaje de Error: ", final.message);
        console.log("Error Original: ", err.message);
    }
});

// Ruta para agregar una nueva cancion
app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;

    try {

        // En caso de no ingresar cualquiera de los campos se enviara un mensaje por servidor
        if (!titulo || !artista || !tono) {
            return res.status(400).json({ error: 'Por favor, proporciona titulo, artista y tono' });

        }

        // En caso de ingresar un tono no valido se enviara un mensaje por servidor
        const tonoMinusculas = tono.toLowerCase();
        if (!tonosValidos.includes(tonoMinusculas)) {
            return res.status(400).json({ error: 'Por favor, proporciona un tono valido.' })
        }

        const agregarCancion = querys.agregar(titulo, artista, tonoMinusculas);

        // En caso de exito al agregar la cancion se enviara un mensaje por servidor
        res.status(201).json({
            message: 'Cancion agregada correctamente.',
            cancion: agregarCancion
        });

    } catch (err) {
        // Manejo de errores
        console.log("Error General: ", err)
        const final = errors(err.code, status, message);
        console.log("Codigo de Error: ", final.code);
        console.log("Status de Error: ", final.status);
        console.log("Mensaje de Error: ", final.message);
        console.log("Error Original: ", err.message);
    }

});

// Ruta para actualizar una cancion existente
app.put('/cancion/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, artista, tono } = req.body;

    try {

        // En caso de no ingresar cualquiera de los campos se enviara un mensaje por servidor
        if (!titulo || !artista || !tono) {
            return res.status(400).json({ error: 'Por favor, proporciona titulo, artista y tono para actualizar la canción.' });
        }

         // En caso de ingresar un tono no valido se enviara un mensaje por servidor
        const tonoMinusculas = tono.toLowerCase();
        if (!tonosValidos.includes(tonoMinusculas)) {
            return res.status(400).json({ error: 'Por favor, proporciona un tono valido.' });
        }

        await querys.modificar(id, titulo, artista, tonoMinusculas);

        const cancionActualizada = await querys.consultar(id);

        // En caso de exito al actualizar la cancion se enviara un mensaje por servidor
        if (cancionActualizada.length > 0) {
            res.json({
                message: 'Canción actualizada correctamente.',
                cancion: cancionActualizada[0]
            });

        // En caso de error al actualizar la cancion se enviara un mensaje por servidor (Esto puede ocurrir si se realizan pruebas por thunderclient)
        } else {
            res.status(400).json({
                message: "El registro con id: " + id + " no existe."
            });
        }

    } catch (err) {
        // Manejo de errores
        console.log("Error General: ", err)
        const final = errors(err.code, status, message);
        console.log("Codigo de Error: ", final.code);
        console.log("Status de Error: ", final.status);
        console.log("Mensaje de Error: ", final.message);
        console.log("Error Original: ", err.message);
    }
});

// Ruta para eliminar una cancion
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

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.send('Esta página no existe...');
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
