const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const Estudiante = require('./../models/estudiante');
const dirViews = path.join(__dirname, '../../template/views');
const dirPartials = path.join(__dirname, '../../template/partials');

require('./../helpers/helpers')

app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials);

app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Inicio',
    })
});

app.get('/', (req, res) =>{
    res.render('index');
});

app.post('/', (req, res) => {
    let estudiante = new Estudiante({
        nombre : req.body.nombre,
        matematicas : req.body.matematicas,
        ingles: req.body.ingles,
        programacion: req.body.programacion
    });
    estudiante.save( (error, result)=>{
        if (error) {
            res.render('indexpost', {
                mostrar: error
            });
        }
        res.render('indexpost', {
            mostrar: result
        });
    })
});

app.get('/vernotas', (re, res) =>{
    Estudiante.find({}).exec((err, resultado) =>{
        if (err) {
            return console.log(err)
        }
        if (!resultado) {
            res.render('vernotas',{
                listado: "Nombre no encontrado"
            })
        }
        res.render('vernotas',{
            listado: resultado
        })
    })
});

app.get('/actualizar', (req, res) =>{
    res.render('actualizar');
})
app.post('/actualizar', (req, res) =>{
    Estudiante.findOneAndUpdate({nombre: req.body.nombre}, req.body, {new: true}, (error, resultado) => {
        if (error) {
            return console.log(error);
        }
        res.render('actualizar', {
            nombre: resultado.nombre,
            matematicas: resultado.matematicas,
            ingles: resultado.ingles,
            programacion: resultado.programacion,

        });
    })
});
app.post('/eliminar', (req, res) =>{
    Estudiante.findOneAndDelete({nombre: req.body.nombre}, req.body, (error, resultado) => {
        if (error) {
            return console.log(error);
        }
        res.render('eliminar', {
            nombre: resultado.nombre

        });
    })
});
app.get('*', (req, res) => {
    res.render('error', {
        titulo: 'Error 404'
    });
});
module.exports = app