const hbs = require('hbs');


hbs.registerHelper('mostrar', (listado) => {
    let texto = "<form action='/eliminar' method='post'><table class='table table-striped table-hover'>" +
        "<thead class='thead-dark'>" +
        "<th>Nombre</th>" +
        "<th>Matematicas</th>" +
        "<th>ingles</th>" +
        "<th>programacion</th>" +
        "<th>Acciones</th>" +
        "</thead>" +
        "<tbody>";

    listado.forEach(estudiante => {
        texto += '<tr>' +
            '<td>' + estudiante.nombre + '</td>' +
            '<td>' + estudiante.matematicas + '</td>' +
            '<td>' + estudiante.ingles + '</td>' +
            '<td>' + estudiante.programacion + '</td>' +
            '<td><button class="btn btn-danger" name="nombre" value="'+ estudiante.nombre +'">Eliminar</button></td>' +
            '</tr>';
    });
    texto += '</tbody>' +
        '</table></form>';
    return texto;
});