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
        const course = req.body;
        console.log("An update request has arrived");
        const updatecourse = await pool.query(
            "UPDATE routes SET (id, note) = ($1, $2) WHERE id = $1 RETURNING*", [id, course.note]
        );
        res.json(updatecourse);
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