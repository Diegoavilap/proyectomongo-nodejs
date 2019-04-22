const hbs = require('hbs');


hbs.registerHelper('registroCursoExitoso', (success, message) => {
    if (success === 'ok') {
        let texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>${message}!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    } else if (success === 'error') {
        let texto = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>${message}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    }

});

hbs.registerHelper('listar', (listadoCursos, tipo) => {
    let texto = '';
    if (listadoCursos === 'No se encontraron cursos') {
        texto = listadoCursos;
    } else if (tipo === 'coordinador') {
        texto = `
        <div class="container">
            <h1>Ver Cursos Como Administrador</h1>
            <table class='table table-striped table-hover'>
                <thead class='thead-dark'>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Modalidad</th>
                    <th>Intensidad</th>
                    <th>Estado</th>
                </thead>
            <tbody>`;

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
        texto += `</tbody>
            </table>
        </div>`;
    }
    
    return texto;
});

hbs.registerHelper('listar_interesado', (listadoCursos, tipo) => {
    let texto = '';
    if (listadoCursos === 'No se encontraron cursos') {
        texto = listadoCursos;
    } else if(tipo === 'aspirante'){
        texto = `
        <div class="container">
            <h1>Ver Cursos Como Interesado</h1>
            <div class="accordion" id="accordionExample">`;
        listadoCursos.forEach(curso => {
            if (curso.estado === 'disponible') {
                texto += `<div class="card">
                            <div class="card-header" id="heading${curso.id}">
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${curso.id}" aria-expanded="true" aria-controls="collapseOne">
                                    <strong>Nombre del Curso: ${curso.nombre}</strong> - ${curso.descripcion} - $ ${curso.valor}
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
        texto += `</div>
        </div>`;
    }
    return texto;
});

hbs.registerHelper('opciones_cursos', (listadoCursos) => {
    let texto = '';
    listadoCursos.forEach(curso => {
        texto += `<option value="${curso.id}">${curso.nombre}</option>`;
    });
    return texto;
});

hbs.registerHelper('inscripcionExitosa', (success,message) => {
    if (success === 'ok') {
        let texto = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>${message}!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    } else if (success === 'error') {
        let texto = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>${message}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>`;
        return texto;
    } else {
        return '';
    }

});
hbs.registerHelper('listar_inscritos', (listadoCursos, inscripciones) => {
    let texto = '<div class="accordion" id="accordionExample">';

    listadoCursos.forEach(curso => {
        if (curso.estado === 'disponible') {
            texto += `<div class="card">
                        <div class="card-header" id="heading${curso.id}">
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${curso.id}" aria-expanded="true" aria-controls="collapseOne">
                                    <strong>Nombre del Curso: ${curso.nombre}</strong>
                                </button>
                                <div class="float-right">
                                    <form action="/cerrarCurso" method="post">
                                        <button class="btn btn-warning" name="id" value="${curso._id}">Cerrar Curso</button>
                                    </form>
                                </div>
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
                    texto += `<tr> 
                        <td> ${inscripcion.cedula} </td>
                        <td> ${inscripcion.nombre} </td>
                        <td> ${inscripcion.correo} </td>
                        <td> ${inscripcion.telefono} </td>
                        <td>
                            <form action="/eliminarInscripcion" method="post" >
                                <button class="btn btn-danger" name="id" value="${inscripcion._id}">Eliminar Inscripción</button>
                            </form>
                        </td>
                        </tr>`;
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

hbs.registerHelper('links_por_tipo_de_usuario', (tipo) =>{
    let texto = '';
    if (tipo === 'aspirante') {
        texto += `
            <li class="nav-item">
                <a class="nav-link" href="/listarCursos">Listar Cursos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/registro">Inscribirse</a>
            </li>
        `; 
    } else if (tipo === 'coordinador') {
        texto += `
            <li class="nav-item">
                <a class="nav-link" href="/listarCursos">Listar Cursos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/crearCursos">Crear Cursos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/verInscritos">Ver Inscritos</a>
            </li>
        `;
    }
    return texto;
});