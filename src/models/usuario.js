const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    cedula: {
        type: String,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        require: true,
        trim: true
    },
    telefono: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        default: 'aspirante',
        require: true,
        enum: {
            values: ['aspirante', 'coordinador']
        },

    }
});
const Usuario = mongoose.model('Usuario', usuariosSchema);
module.exports = Usuario;