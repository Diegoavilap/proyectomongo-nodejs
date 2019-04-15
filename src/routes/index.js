const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const Curso = require('../models/curso');
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

app.get('/crearCursos', (req, res) => {
    res.render('crear_cursos', {
        success: 'false'
    });
});

app.post('/crearCursos', (req, res) => {
    let curso = new Curso({
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        modalidad: req.body.modalidad,
        intensidad_horaria: req.body.intensidad_horaria,
        estado: "disponible",
    });
    curso.save((error, result) => {
        if (error) {
            res.render('crear_cursos', {
                success: error
            });
        }
        res.render('crear_cursos', {
            success: 'ok'
        });
    })
    
});

app.get('/listarCursos', (req, res) => {
    Curso.find({estado: "disponible"}).exec((err, resultado) => {
        if (err) {
            return console.log('error al listar cursos' + err)
        }
        if (!resultado) {
            res.render('listar', {
                listado: "No se encontraron cursos"
            })
        }
        console.log(resultado);
        res.render('listar', {
            listadoCursos: resultado
        })
    })
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