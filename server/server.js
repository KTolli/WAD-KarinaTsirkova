const express = require('express');
const pool = require('./database');
const cors = require('cors')


const port = process.env.PORT || 3000;
const app = express();



app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

app.put('/api/mycourses/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const route = req.body;
        console.log("An update request has arrived");
        const updateroute = await pool.query(
            "UPDATE routes SET (id, departuretime, departuredate) = ($1, $2, $3) WHERE id = $1 RETURNING*", [id, route.departuretime, route.departuredate]
        );
        res.json(updateroute);
    } catch (err) {
        console.error(err.message);
    }
});


app.get('/api/mycourses', async(req, res) => {
    try {
        console.log("A get all request has arrived");
        const courses = await pool.query(
            "SELECT * FROM mycourses"
        );
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
    }
});