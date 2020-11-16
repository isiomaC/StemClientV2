const path = require('path');
const express = require('express');
const app = express();
// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
    // res.sendFile(path.join(publicPath, 'index.html'))
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
}) 

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
