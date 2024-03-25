const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 4001

app.get('/', (req, res) => {
    res.send('Welcome to nodejs-filesystem')
})

// endpoint to create a text file with the current timestamp
app.post('/createFile', (req, res) => {
    const timestamp = Date.now() //current timestamp in milliseconds since the Unix Epoch

    // name of the file
    const fileName = new Date().toISOString().replace(/[-:]/g, '_') + '.txt'
    // path of the file
    const filePath = path.join(__dirname, 'files', fileName)

    // write content of the file
    fs.writeFileSync(filePath, timestamp.toString())
    res.send('File created successfully')
})

// endpoint to retrieve all text files in the directory named 'files'
app.get('/all', (req, res) => {
    const directoryPath = path.join(__dirname, 'files')

    // read all the files in the directory named 'files'
    fs.readdir(directoryPath, (err, files) => {

        if (err) {
            res.status(500).send('Error reading the files!')
        }

        res.send(files)
    })
})

app.listen(PORT, () => {
    console.log(`Server is starting on port:${PORT}`)
})