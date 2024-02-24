const express = require('express');
const config = require('config');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = config.get('port');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
    try {
        fs.readFile(path.resolve(__dirname,'answers.json'), 'utf8', (error, content) => {
            if (error) {
                res.status(400).send(error)
            }

            const db = JSON.parse(content);

            if(req.body) {
                db.data.push(req.body);
            }

            fs.writeFile(
                path.resolve(__dirname,'answers.json'), 
                JSON.stringify(db,'', '    '), 
                (error, content) => {
                    if(error) {
                        res.status(400).send(error);
                    }
            })
            return res.status(200);
        })

        
    } catch(e) {
        res.status(400).send(e)
    }
})

const start = async () => {
    try {

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT} port`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();

