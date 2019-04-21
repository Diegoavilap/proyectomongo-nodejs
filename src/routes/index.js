const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const Curso = require('../models/curso');
const Inscripcion = require('../models/inscripcion');
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
    res.render('crear_cursos');
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
    Curso.findOne({
        id: curso.id
    }, (err, resultado) => {
        if (err) {
            return console.log("Error al listar el curso");
        }
        if (resultado != null) {
            res.render('crear_cursos', {
                success: "error",
                message: "No se pueden crear dos cursos con el mismo ID"
            })
        }
        curso.save((error, result) => {
            if (error) {
                res.render('crear_cursos', {
                    success: 'error',
                    message: error
                });
            }
            res.render('crear_cursos', {
                success: 'ok',
                message: 'Registro de Usuario exitoso'
            });
        })
    });   
});

app.get('/listarCursos', (req, res) => {
    Curso.find({estado: "disponible"}).exec((err, resultado) => {
        if (err) {
            return console.log('error al listar cursos' + err)
        }
        if (resultado.length == 0) {
            res.render('listar', {
                listadoCursos: "No se encontraron cursos"
            })
        }
        console.log(resultado);
        res.render('listar', {
            listadoCursos: resultado
        })
    })
});

app.get('/registro', (req, res) => {
    Curso.find({
        estado: "disponible"
    }).exec((err, resultado) => {
        if (err) {
            return console.log('error al listar cursos' + err)
        }
        if (resultado.length == 0) {
            res.render('registro', {
                listadoCursos: "No se encontraron cursos"
            })
        }
        res.render('registro', {
            listadoCursos: resultado
        });
    })
    
    
});

app.post('/registro', (req, res) => {
    let inscripcion = new Inscripcion({
        curso_id: req.body.curso_id,
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono
    });

    Curso.find({
        estado: "disponible"
    }).exec((err, resultado) => {
        if (err) {
            return console.log('error al listar cursos' + err)
        }
        if (resultado.length == 0) {
            res.render('registro', {
                success: "error",
                message: "No se encontraron cursos",
                listadoCursos: ""
            })
        }
        Inscripcion.findOne({
            curso_id: inscripcion.curso_id,
            cedula: inscripcion.cedula
        }, (err, resultadoInscripcion) => {
            if (err) {
                return console.log("Error al listar la inscripción");
            }
            if (resultadoInscripcion != null) {
                res.render('registro', {
                    success: "error",
                    message: "Ya se encuentra registrado en el curso",
                    listadoCursos: resultado
                });
            }else{
                inscripcion.save((error, result) => {
                    if (error) {
                        res.render('registro', {
                            success: 'error',
                            message: error,
                            listadoCursos: resultado
                        });
                    }
                    res.render('registro', {
                        success: 'ok',
                        message: 'Registro en el curso exitoso',
                        listadoCursos: resultado
                    });
                })
            }
            
        });
    })

    
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