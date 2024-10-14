var express = require('express');
var router = express.Router();
var prisma = require('../db/prisma')

//OBTENER TODAS LAS RESERVAS
router.get('/', async (req, res) => {

   const reservas = await prisma.reserva.findMany({
      orderBy: {
         id: 'desc',
       },
   })
   res.send(reservas);
});

//OBTENER UNA RESERVA POR ID
router.get('/:id', async (req, res) => {   
   const {id} = req.params
   // By ID
   const reserva = await prisma.reserva.findUnique({
      where: {
        id: parseInt(id),
      },
   })
   res.send(reserva);
});

//CREAR RESERVA
router.post('/', async (req, res) => {

   const reserva = await prisma.reserva.create({
      data : {
         nombre_usuario: req.body.nombre_usuario,
         cantidad_boletos: parseInt(req.body.cantidad_boletos),
         evento_id: parseInt(req.body.evento_id)
      }
   })
   res.send(reserva);
});

//ACTUALIZAR UNA RESERVA POR ID
router.put('/:id', async (req, res) => {
   const {id} = req.params

   const reservaActualizada = await prisma.reserva.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    })
   res.send(reservaActualizada);
});

//ELIMINAR UNA RESERVA POR ID
router.delete('/:id', async (req, res) => {
   const {id} = req.params

   const reservaEliminada = await prisma.reserva.delete({
      where: {
        id: parseInt(id),
      }
    })
   res.send(reservaEliminada);
});

//export this router to use in our index.js
module.exports = router;