process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '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';

let urlDB
if (process.env.NODE_ENV === 'local') {
    urlDB = 'mongodb+srv://diegoavilap:m0ng0DB_@cluster0-jbcjx.mongodb.net/cursos?retryWrites=true';
} else {
    urlDB = 'mongodb+srv://diegoavilap:m0ng0DB_@cluster0-jbcjx.mongodb.net/cursos?retryWrites=true'
}

process.env.URLDB = urlDB