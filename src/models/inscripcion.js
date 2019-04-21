const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inscripcionesSchema = new Schema({
    curso_id: {
        type: Number,
        require: true
    },
    cedula: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
            require: true
    },
    correo: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    }
});
const Inscripcion = mongoose.model('Inscripcion', inscripcionesSchema);
module.exports = Inscripcion;