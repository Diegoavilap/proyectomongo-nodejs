const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    id:{
        type: Number,
        require: true,
        unique: true
    },
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
        type: String
    },
    estado:{
        type: String,
            require: true
    },
});
const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;