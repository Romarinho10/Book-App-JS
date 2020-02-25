//Para iniciar las variables de entorno por medio de dotenv
if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require ('express');
const morgan = require ('morgan');
const multer = require ('multer');
const path = require ('path');
const cors = require('cors');

//initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
//configuracion de localizacion y nombre de las imagenes a recibir
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false})); //interpreta los datos del formulario(frontend) como un json
app.use(express.json()); //para ver los json en la terminal cuando sea requerido
app.use(cors());

//routes
app.use('/api/books',require('./routes/books'));


//Static files
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});