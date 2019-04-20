require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const directorioPublico = path.join(__dirname, '../public');

const dirNode_modules = path.join(__dirname, '../node_modules')


app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

app.use(express.static(directorioPublico));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, resultado) => {
	if (err){
		return console.log(err)
	}
	console.log("conectado")
	console.log(process.env.URLDB)
});

app.listen(process.env.PORT, () =>{
    console.log('servidor en el puerto '+ process.env.PORT);
});