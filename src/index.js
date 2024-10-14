const express = require('express');
const app = express();
const morgan=require('morgan');
const bodyParser = require('body-parser')


const rutasEvento = require("./routes/eventoRoute")
const rutasReserva = require("./routes/reservaRoute")

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
 

//Definicion de rutas
app.use("/eventos", rutasEvento)
app.use("/reservas", rutasReserva)

//Nuestro primer WS Get
app.get('/', (req, res) => {
    res.json(
        {
            "Title": "Hola mundo"
        }
    );
})
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});