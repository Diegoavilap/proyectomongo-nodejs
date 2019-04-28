const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bcrypt = require('bcrypt')

const Curso = require('../models/curso');
const Inscripcion = require('../models/inscripcion');
const Usuario = require('../models/usuario');

const dirViews = path.join(__dirname, '../../template/views');
const dirPartials = path.join(__dirname, '../../template/partials');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

require('./../helpers/helpers')

app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials);

app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Inicio',
    })
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
        } else {
            curso.save((error, result) => {
                if (error) {
                    res.render('crear_cursos', {
                        success: 'error',
                        message: error
                    });
                }
                res.render('crear_cursos', {
                    success: 'ok',
                    message: 'Registro del Curso ' + curso.nombre + ' exitoso'
                });
            });
        }

    });
});

app.get('/listarCursos', (req, res) => {
    let estadoCursos = {};
    if (req.session.tipo === 'aspirante') {
        estadoCursos = {
            estado: "disponible"
        };
    }
    Curso.find(estadoCursos).exec((err, resultado) => {
        if (err) {
            return console.log('error al listar cursos' + err)
        }
        if (resultado.length == 0) {
            res.render('listar', {
                listadoCursos: "No se encontraron cursos"
            })
        }
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
            } else {
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
    Curso.find({
        estado: "disponible"
    }).exec((err, resultado) => {
        if (err) {
            return console.log('error al listar cursos' + err)
        }
        if (resultado.length == 0) {
            res.render('inscritos', {
                success: "error",
                message: "No se encontraron cursos"
            })
        }

        Inscripcion.find()
            .exec((err, resultadoInscripcion) => {
                if (err) {
                    return console.log("Error al listar las inscripciones");
                }
                if (resultadoInscripcion.length == 0) {
                    res.render('inscritos', {
                        success: "error",
                        message: "No se encontraron Inscripciones"
                    })
                } else {
                    res.render('inscritos', {
                        listadoCursos: resultado,
                        inscripciones: resultadoInscripcion
                    });
                }

            });
    })
});

app.post('/cerrarCurso', (req, res) => {
    Curso.findOneAndUpdate({
        _id: req.body.id
    }, {
        estado: 'cerrado'
    }, {
        new: true
    }, (error, resultado) => {
        if (error) {
            return console.log(error);
        }
        console.log('hey');
        res.redirect('/verInscritos');
    });
});
app.post('/eliminarInscripcion', (req, res) => {
    Inscripcion.findOneAndDelete({
        _id: req.body.id
    }, (error, resultado) => {
        if (error) {
            return console.log(error);
        }
        console.log('hey' + req.body.id);
        res.redirect('/verInscritos');
    });
});

app.post('/login', (req, res) => {
    Usuario.findOne({
        cedula: req.body.cedula
    }, (error, resultado) => {
        if (error) {
            return console.log(error);
        }
        if (resultado == null) {
            res.render('login', {
                mensaje: "usuario no encontrado"
            });
        } else if (!bcrypt.compareSync(req.body.password, resultado.password)) {
            res.render('login', {
                mensaje: "Contraseña no coincide"
            });
        } else {
            req.session.usuario = resultado.id;
            req.session.nombre = resultado.nombre;
            req.session.tipo = resultado.tipo;
            res.render('login', {
                mensaje: "Bienvenid@ a la Jungla 🤘🏽, " + resultado.nombre + '!!',
                sesion: true,
                nombre: resultado.nombre,
                tipo: resultado.tipo
            });
        }
    })
});

app.get('/salir', (req, res) => {
    req.session.destroy((error) => {
        if (error) return console.log('destroy session error ' + error)
    })
    res.redirect('/')
});

app.post('/registroUsuario', (req, res) => {
    let usuario = new Usuario({
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: bcrypt.hashSync(req.body.password, 10),
        tipo: req.body.tipo
    });
    const msg = {
        to: req.body.correo,
        from: 'diegoavilapava@mongoprojecttdea.com',
        subject: 'Welcome to MongoProject Tdea - NodeJS',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong style="color: blue;">Welcome to the Jungle 🤟 ' + req.body.nombre + '!</strong>',
    };
    Usuario.findOne({
        cedula: usuario.cedula
    }, (err, resultadoInscripcion) => {
        if (err) {
            return console.log("Error al listar la inscripción");
        }
        if (resultadoInscripcion != null) {
            res.render('index', {
                success: "error",
                message: usuario.nombre + " ya se encuentra registrado!"
            });
        } else {
            usuario.save((error, result) => {
                if (error) {
                    res.render('index', {
                        success: 'error',
                        message: error
                    });
                } else {
                    console.log(process.env.SENDGRID_API_KEY);
                    sgMail.send(msg);
                    res.render('index', {
                        success: 'ok',
                        message: 'Registro exitoso del usuario ' + usuario.nombre + '!'
                    });
                }
            })
        }

    });
});

app.get('*', (req, res) => {
    res.render('error', {
        titulo: 'Error 404'
    });
});
module.exports = app