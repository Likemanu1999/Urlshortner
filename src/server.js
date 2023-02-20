const express = require('express');
const bodyParser = require('body-parser');
const route = require("../src/routers/route");
const mongoose  = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://manish:iXN1zqLOlpx5PBN6@cluster0.cprui.mongodb.net/Urlshortner", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

// https://api.postman.com/collections/25739920-e48042bd-12b1-4679-9fd1-31aaf73f4624?access_key=PMAT-01GSPV6DTDE606SY1MTENT71KD
// Postman collection fill