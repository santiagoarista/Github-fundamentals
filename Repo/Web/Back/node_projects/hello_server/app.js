// Import the express library
import express from 'express'
import fs from 'fs'

// Create a new express application
const app = express()

// Define the port to listen up
const port = 3000

// Use the express.json() middleware to parse the body of the request
app.use(express.json())

app.get('/', (req, res) => {
    fs.readFile('./html/home.html', 'utf8',
        (err, html) => {
            if (err) {
                res.status(500).send('There was an error: ' + err)
                return
            }

            console.log("Sending page...")
            res.send(html)
            console.log("Page sent!")
        }
    )
})

app.get('/person', (req, res) => {

    console.log("Hello server") // Esto se muestra en la consola del servidor

    const person = {
        name: "Juan de Dios",
        email: "A01784523@tec.mx",
        message: "Hello world from server"
    }

    res.json(person)
})

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});