const hbs = require('hbs');


hbs.registerHelper('registroCursoExitoso', (success) => {
    if (success === 'ok') {
        let texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Registro de Usuario exitoso!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    } else if (success === 'ya_existe') {
        let texto = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Ya Existe un Curso con ese ID ingresado!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    } else {
        return '';
    }

});

hbs.registerHelper('listar', () => {
    listadoCursos = require('./cursos.json');
    let texto = "<table class='table table-striped table-hover'>" +
        "<thead class='thead-dark'>" +
        "<th>ID</th>" +
        "<th>Nombre</th>" +
        "<th>Descripción</th>" +
        "<th>Valor</th>" +
        "<th>Modalidad</th>" +
        "<th>Intensidad</th>" +
        "<th>Estado</th>" +
        "</thead>" +
        "<tbody>";

    listadoCursos.forEach(curso => {
        texto += '<tr>' +
            '<td>' + curso.id + '</td>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.descripcion + '</td>' +
            '<td>' + curso.valor + '</td>' +
            '<td>' + curso.modalidad + '</td>' +
            '<td>' + curso.intensidad_horaria + '</td>' +
            '<td>' + curso.estado + '</td>' +
            '</tr>';
    });
    texto += '</tbody>' +
        '</table>';
    return texto;
});

hbs.registerHelper('listar_interesado', () => {
    listadoCursos = require('./cursos.json');
    let texto = '<div class="accordion" id="accordionExample">';

    listadoCursos.forEach(curso => {
        if (curso.estado === 'disponible') {
            texto += `<div class="card">
                        <div class="card-header" id="heading${curso.id}">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${curso.id}" aria-expanded="true" aria-controls="collapseOne">
                                <strong>Nombre del Curso: ${curso.nombre}</strong> - $ ${curso.valor}
                            </button>
                        </h2>
                        </div>

                        <div id="collapse${curso.id}" class="collapse" aria-labelledby="heading${curso.id}" data-parent="#accordionExample">
                            <div class="card-body">
                                <strong>Nombre: </strong> ${curso.nombre} <br/>
                                <strong>Valor: </strong> $${curso.valor} <br/>
                                <strong>Descripción: </strong> ${curso.descripcion} <br/>
                                <strong>Modalidad: </strong>${curso.modalidad} <br/>
                                <strong>Intensidad Horaria: </strong>${curso.intensidad_horaria} <br/>
                            </div>
                        </div>
                     </div>`;
        }
    });
    texto += '</div>';
    return texto;
});

hbs.registerHelper('opciones_cursos', () => {
    listadoCursos = require('./cursos.json');
    let texto = '';
    listadoCursos.forEach(curso => {
        texto += `<option value="${curso.id}">${curso.nombre}</option>`;
    });
    return texto;
});

hbs.registerHelper('inscripcionExitosa', (success) => {
    console.log('helper', success);
    if (success === 'ok') {
        let texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Registro en el curso exitoso!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    } else if (success === 'ya_existe') {
        let texto = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Ya se encuentra registrado en el curso!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    } else {
        return '';
    }

});

hbs.registerHelper('listar_inscritos', () => {
    listadoCursos = require('./cursos.json');
    inscripciones = require('./inscripciones.json');
    let texto = '<div class="accordion" id="accordionExample">';

    listadoCursos.forEach(curso => {
        if (curso.estado === 'disponible') {
            texto += `<div class="card">
                        <div class="card-header" id="heading${curso.id}">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${curso.id}" aria-expanded="true" aria-controls="collapseOne">
                                <strong>Nombre del Curso: ${curso.nombre}</strong>
                            </button>
                        </h2>
                        </div>
                        <div id="collapse${curso.id}" class="collapse" aria-labelledby="heading${curso.id}" data-parent="#accordionExample">
                            <div class="card-body">

                                <table class='table table-striped table-hover'>
                                    <thead class='thead-dark'>
                                        <th>Cedula</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Telefono</th>
                                        <th>Opciones</th>
                                    </thead>
                                    <tbody>`;

            inscripciones.forEach(inscripcion => {
                if (curso.id === inscripcion.curso_id) {
                    texto += '<tr>' +
                        '<td>' + inscripcion.cedula + '</td>' +
                        '<td>' + inscripcion.nombre + '</td>' +
                        '<td>' + inscripcion.correo + '</td>' +
                        '<td>' + inscripcion.telefono + '</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-warning">Cerrar</button>' +
                        '<button type="button" class="btn btn-danger">Eliminar</button>' +
                        '</td>' +
                        '</tr>';
                }
            });
            texto += `</tbody>
                                </table>
                            </div>
                        </div>
                     </div>`;
        }
    });
    return texto;
});