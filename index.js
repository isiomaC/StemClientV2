const path = require('path');
const express = require('express');
const cors = require('cors')
const app = express();

require('dotenv').config()

app.use(cors())

// const allowedOrigins = [process.env.REACT_APP_CORS_LIST];

// app.use(cors({
//   origin: (origin, callback) => {
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
})

if (process.env.NODE_ENV === 'production'){ 
// app.use(express.static('client/build'))
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        // console.log(express.static(path.resolve(__dirname, 'client', 'build')))
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        // res.sendFile(path.join(__dirname+'/client/build/index.html'));
    }) 
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
