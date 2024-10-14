var express = require('express');
var router = express.Router();
var prisma = require('../db/prisma')
const { PrismaClient, Prisma } = require("@prisma/client");


//OBTENER TODOS LOS EVENTOS
router.get('/', async (req, res) => {
   const eventos = await prisma.evento.findMany({
      orderBy: {
         id: 'desc',
       },
   })
   res.send(eventos);
});

//OBTENER UN EVENTO POR ID
router.get('/:id', async (req, res) => {
   const {id} = req.params
   // By ID
   const evento = await prisma.evento.findUnique({
      where: {
        id: parseInt(id),
      },
   })
   res.send(evento);
});

//CREAR EVENTO
router.post('/', async (req, res) => {
   await prisma.evento.create({
      data : req.body
   })
   res.send('POST route on evento.');
});

//ACTUALIZAR UN ENVENTO POR ID
router.put('/:id', async (req, res) => {
   const {id} = req.params

   const eventoActualizado = await prisma.evento.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    })
   res.send(eventoActualizado);
});

//ELIMINAR UN ENVENTO POR ID
router.delete('/:id', async (req, res) => {
   try {
      const {id} = req.params

      const eventoEliminado = await prisma.evento.delete({
         where: {
           id: parseInt(id),
         }
       })
      res.send(eventoEliminado);
   } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
            let modelo = e.meta.modelName;
            let campo = e.meta.field_name;
            const message = `Error al eliminar el registro, Constraint en modelo ${modelo} en el campo ${campo}!`
            'There is a unique constraint violation, a new user cannot be created with this email'
          res.send(message);
        }
      }
   }
});

//export this router to use in our index.js
module.exports = router;