const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const Estudiante = require('../models/curso');
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

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/crearCursos', (req, res) => {
    res.render('crear_cursos', {
        success: 'false'
    });
});
app.post('/crearCursos', (req, res) => {

    res.render('crear_cursos', {
        success: funciones.crear(req.body)
    });
});

app.get('/listarCursos', (req, res) => {
    res.render('listar');
});

app.get('/registro', (req, res) => {
    res.render('registro', {
        success: 'false'
    });
});

app.post('/registro', (req, res) => {

    res.render('registro', {
        success: funciones.registrar(req.body)
    });
});

app.get('/verInscritos', (req, res) => {
    res.render('inscritos');
});


app.get('*', (req, res) => {
    res.render('error', {
        titulo: 'Error 404'
    });
});
module.exports = app