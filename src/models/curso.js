const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    nombre:{
        type: String,
        require: true
    },
    descripcion:{
        type: String,
            require: true
    },
    valor:{
        type: Number,
            require: true
    },
    modalidad:{
        type: String
    },
    intensidad_horaria:{
        type: String,
            require: true
    },
    estado:{
        type: String,
            require: true
    },
});
const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;